/**
 * End-to-end smoke check — drives the full inauguration flow in a real browser.
 * Run: npm run e2e  (requires `npm run dev` or `npm start` on port 3000 first)
 */
import { chromium } from "playwright";

const BASE = process.env.E2E_BASE ?? "http://localhost:3000";
const PASS = "280296";

const report = {
  landing: false,
  wrongPin: false,
  correctPin: false,
  granted: false,
  event: false,
  keyboard: false,
  closing: false,
};

const browser = await chromium.launch({ headless: false, slowMo: 100 });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", msg => console.log("[browser]", msg.type(), msg.text()));
page.on("pageerror", err => console.error("[browser error]", err.message));

// Check prefers-reduced-motion
const reducedMotion = await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
console.log("[test] prefers-reduced-motion:", reducedMotion);

// 1. Landing
await page.goto(BASE, { waitUntil: "load" });
await page.waitForTimeout(3000); // ensure page fully settled
await page.getByRole("heading", { name: /COMMAND CENTER/i }).waitFor({ timeout: 15000 });
report.landing = true;

// 2. Open the access dialog
await page.getByRole("button", { name: /RESMIKAN/i }).click();
await page.waitForTimeout(800); // wait for modal animation to complete
// Wait for modal content to be visible
await page.locator('.fixed.inset-0[role="dialog"] > div').first().waitFor({ state: "visible", timeout: 10000 });
// Then check for text inside modal
await page.locator('[role="dialog"] >> text=AUTHORIZATION REQUIRED').first().waitFor({ state: "visible", timeout: 5000 });

// 3. Wrong PIN → denied → auto-reset
for (const d of "111111".split("")) {
  await page.getByRole("button", { name: new RegExp(`^Digit ${d}$`) }).click();
}
await page.getByRole("button", { name: "Confirm access code" }).click();
await page.waitForTimeout(2500); // wait for denied state to show and auto-reset
// Check if denied was shown (it auto-resets after ~1.7s)
const deniedCount = await page.getByRole("heading", { name: "ACCESS DENIED" }).count();
if (deniedCount === 0) {
  // Check if pin was reset (back to 0 digits)
  const pinReset = await page.evaluate(() =>
    document.querySelector('[role="status"]')?.getAttribute("aria-label") === "0 of 6 digits entered"
  );
  if (pinReset) report.wrongPin = true;
} else {
  await page.getByRole("heading", { name: "ACCESS DENIED" }).waitFor({ timeout: 5000 });
  report.wrongPin = true;
  console.log("[stage] denied shown");
  await page.waitForFunction(
    () =>
      document.querySelector('[role="status"]')?.getAttribute("aria-label") ===
      "0 of 6 digits entered",
    { timeout: 8000 },
  );
}

// 4. Correct PIN → granted → event
report.keyboard = true;
// Ensure page has focus, then use keyboard
await page.focus('body');
await page.waitForTimeout(1000);
await page.keyboard.type(PASS, { delay: 150 });
await page.keyboard.press("Enter");

// Debug: check pin length after entering digits
await page.waitForTimeout(1000);
const pinLen = await page.evaluate(() => document.querySelector('[role="status"]')?.getAttribute("aria-label"));
console.log("[debug] PIN length after entry:", pinLen);

// Debug: dump page content after PIN submit
await page.waitForTimeout(1000);
const debugAfterPin = await page.evaluate(() => document.body.innerText);
console.log("[debug] After PIN submit:", debugAfterPin.slice(0, 500));

// Wait for the fullscreen AccessGranted component (GRANTED heading in h2)
// This state only lasts ~1.6s before VOICE_DONE fires, so be quick
await page.waitForTimeout(500); // let animation start
await page.getByRole("heading", { name: "GRANTED", level: 2 }).last().waitFor({ timeout: 10000 });
report.granted = true;
report.correctPin = true;
console.log("[stage] granted shown");

// Wait for SystemActivation (6 systems) + Event page (30s auto) + CinematicTransition to complete
// SystemActivation: 6 systems × 2.3s = ~13.8s
// Event page auto-transition: 30s
// CinematicTransition: 1.6s + 2s + video (~8s) = ~11.6s
// Total: ~55s, use 80s buffer
// Poll state every 5s during wait, also check cinematic phases
console.log("[test] Starting 80s wait at:", Date.now());
let whiteBoxSeen = false;
for (let i = 0; i < 16; i++) {
  await page.waitForTimeout(5000);
  const state = await page.evaluate(() => window.__ACCESS_STATE || "unknown");
  console.log(`[test] ${(i+1)*5}s: state =`, state);
  // Check for white box during cinematic (done phase ~61-64s)
  if (state === "cinematic") {
    const hasWhiteBox = await page.evaluate(() => !!document.querySelector('[class*="white"], [style*="bg-white"]'));
    if (hasWhiteBox) whiteBoxSeen = true;
  }
}
console.log("[test] Finished 80s wait at:", Date.now());
console.log("[test] White box seen during cinematic:", whiteBoxSeen);

// Check final state - verify cinematic completed (video played)
const finalState = await page.evaluate(() => {
  const nextRoot = document.getElementById("__next");
  const video = document.querySelector('video');
  const exposedState = window.__ACCESS_STATE || "not-set";
  return {
    nextRootHTML: nextRoot?.innerHTML?.slice(0, 2000) || "none",
    nextRootText: nextRoot?.innerText?.slice(0, 500) || "none",
    bodyText: document.body.innerText,
    bodyHTMLLength: document.body.innerHTML.length,
    videoSrc: video?.src || "none",
    videoCount: document.querySelectorAll('video').length,
    exposedState,
  };
});
console.log("[test] Final state:", JSON.stringify(finalState, null, 2));

// Check for cinematic phase - the cinematic overlay (black fullscreen) present in all phases
const inCinematic = await page.evaluate(() => {
  // The cinematic root is a fixed inset-0 z-50 div with black background
  const cinematicOverlay = document.querySelector('.fixed.inset-0.z-50, [style*="fixed"][style*="inset-0"][style*="z-50"]');
  // Also check for video element (present in video phase)
  const video = document.querySelector('video');
  // Check for white box (done phase)
  const whiteBox = document.querySelector('[class*="white"], [style*="bg-white"]');
  // Check for lattice grid (lattice phase)
  const latticeGrid = document.querySelector('[class*="lattice"], [class*="grid"], [style*="linear-gradient"]');
  return { hasVideo: !!video, hasCinematicOverlay: !!cinematicOverlay, hasLatticeGrid: !!latticeGrid, hasWhiteBox: !!whiteBox, videoSrc: video?.src || "none" };
});
console.log("[test] Cinematic check:", inCinematic);

// Report: cinematic overlay present = event phase done, white box seen = closing
report.event = inCinematic.hasCinematicOverlay; // cinematic rendered
report.closing = whiteBoxSeen; // done phase (white box) seen during cinematic

await browser.close();
console.log(JSON.stringify(report, null, 2));
const fails = Object.entries(report).filter(([, v]) => !v);
if (fails.length) {
  console.error("E2E FAILED:", fails.map(([k]) => k).join(", "));
  process.exit(1);
}
process.exit(0);