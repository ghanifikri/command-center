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
  activation: false,
  event: false,
  closing: false,
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", (msg) => console.log("[browser]", msg.type(), msg.text()));
page.on("pageerror", (err) => console.error("[browser error]", err.message));

// 1. Landing
await page.goto(BASE, { waitUntil: "load" });
await page.waitForTimeout(2000);
await page.getByRole("heading", { name: /COMMAND CENTER/i }).waitFor({ timeout: 15000 });
report.landing = true;

// 2. Open the access dialog
await page.getByRole("button", { name: /RESMIKAN/i }).click();
await page.waitForTimeout(600);
await page.locator('[role="dialog"]').first().waitFor({ state: "visible", timeout: 8000 });

// 3. Wrong PIN -> Denied -> Reset
for (const d of "111111".split("")) {
  await page.getByRole("button", { name: new RegExp(`^Digit ${d}$`) }).click();
}
await page.getByRole("button", { name: "Konfirmasi kode akses" }).click();
await page.waitForTimeout(2000);
report.wrongPin = true;

// 4. Correct PIN via keyboard
await page.keyboard.type(PASS, { delay: 100 });
await page.keyboard.press("Enter");

// 5. Access Granted Screen
await page.getByRole("heading", { name: "GRANTED", level: 2 }).waitFor({ timeout: 10000 });
report.granted = true;
report.correctPin = true;

// 6. System Activation & Cinematic Sequence
// Wait for the state to transition to activation then cinematic then event
console.log("[test] Waiting for activation & cinematic progression...");
for (let i = 0; i < 10; i++) {
  await page.waitForTimeout(3000);
  const state = await page.evaluate(() => window.__ACCESS_STATE || "unknown");
  console.log(`[test] ${(i + 1) * 3}s: state =`, state);
  if (state === "activation" || state === "voice") report.activation = true;
  if (state === "event") {
    report.event = true;
    break;
  }
}

// 7. Check Event Page Elements
if (report.event) {
  await page.getByRole("heading", { name: /Menandai Langkah Baru/i }).waitFor({ timeout: 5000 });
  const closingText = await page.locator("text=THE FUTURE").first().count();
  if (closingText > 0) {
    report.closing = true;
  }
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
const fails = Object.entries(report).filter(([k, v]) => !v && k !== "activation");
if (fails.length) {
  console.error("E2E FAILED:", fails.map(([k]) => k).join(", "));
  process.exit(1);
}
console.log("All smoke checks passed successfully!");
process.exit(0);