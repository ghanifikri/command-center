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
for (const d of "111111".split("")) await page.keyboard.press(`Digit${d}`);
await page.keyboard.press("Enter");
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
for (const d of PASS.split("")) await page.keyboard.press(`Digit${d}`);
await page.keyboard.press("Enter");
// Wait for the fullscreen AccessGranted component (GRANTED heading in h2)
await page.getByRole("heading", { name: "GRANTED", level: 2 }).last().waitFor({ timeout: 30000 });
report.granted = true;
report.correctPin = true;
console.log("[stage] granted shown");

// Wait for SystemActivation + CinematicTransition + Video to complete and transition to event
// SystemActivation: 6 systems × 2.3s = ~13.8s
// CinematicTransition: 1.6s + 2s + video (~8s) = ~11.6s
// Total: ~25.4s, use 30s buffer
await page.waitForTimeout(30000);

// Check final state - look at #__next
const finalState = await page.evaluate(() => {
  const nextRoot = document.getElementById("__next");
  return {
    nextRootHTML: nextRoot?.innerHTML?.slice(0, 2000) || "none",
    nextRootText: nextRoot?.innerText?.slice(0, 500) || "none",
    bodyText: document.body.innerText,
    bodyHTMLLength: document.body.innerHTML.length,
    reactRoot: document.querySelector("#__next > div")?.innerHTML?.slice(0, 500) || "none",
  };
});
console.log("[test] Final state:", JSON.stringify(finalState, null, 2));

// Also check for any React error boundary
const errorBoundary = await page.evaluate(() => {
  const el = document.querySelector('[class*="ErrorBoundary"], [class*="error-boundary"], pre');
  return el ? el.innerText : "none";
});
console.log("[test] Error boundary:", errorBoundary);

report.event = finalState.bodyText.includes("A New Chapter of Integrated Excellence");
report.closing = finalState.bodyText.includes("STARTS HERE") || finalState.bodyText.includes("THE FUTURE");

await browser.close();
console.log(JSON.stringify(report, null, 2));
const fails = Object.entries(report).filter(([, v]) => !v);
if (fails.length) {
  console.error("E2E FAILED:", fails.map(([k]) => k).join(", "));
  process.exit(1);
}
process.exit(0);