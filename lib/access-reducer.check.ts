/**
 * Runnable self-check for the access state machine.
 * Run: npx tsx lib/access-reducer.check.ts
 */
import { accessReducer, initialAccessState, type AccessAction } from "./access-reducer";

function drive(actions: AccessAction[]) {
  return actions.reduce(accessReducer, initialAccessState);
}

let failed = 0;
function check(name: string, cond: boolean) {
  if (cond) return;
  failed += 1;
  console.error(`FAIL: ${name}`);
}

const code = "280296".split("");

// Happy path: open → type code → verify → grant → ceremony → event → cinematic.
const happy = drive([
  { type: "OPEN_MODAL" },
  { type: "SET_PIN", pin: code.join("") },
  { type: "VERIFY" },
  { type: "GRANTED" },
  { type: "VOICE_DONE" },
  { type: "ACTIVATION_DONE" },
  { type: "TO_EVENT" },
  { type: "TO_CINEMATIC" },
]);
check("happy path reaches cinematic", happy.state === "cinematic" && happy.dialogOpen === false);

// Wrong PIN: verify → denied → auto-retry clears pin back to 'pin'.
const wrong = drive([
  { type: "OPEN_MODAL" },
  { type: "SET_PIN", pin: "111111" },
  { type: "VERIFY" },
  { type: "DENIED" },
  { type: "RETRY" },
]);
check(
  "wrong pin resets to pin entry with cleared pin",
  wrong.state === "pin" && wrong.pin === "" && wrong.dialogOpen === true,
);

// Guards hold: impossible transitions are no-ops.
const noop1 = drive([{ type: "OPEN_MODAL" }, { type: "TO_EVENT" }]);
check("cannot skip to event from pin", noop1.state === "pin");
const noop2 = drive([{ type: "GRANTED" }]);
check("cannot grant before verifying", noop2.state === "landing");
const noop3 = driverOpenThenClose();
function driverOpenThenClose() {
  return drive([{ type: "OPEN_MODAL" }, { type: "CLOSE_MODAL" }]);
}
check("close returns to landing", noop3.state === "landing" && noop3.dialogOpen === false);
const noop4 = drive([{ type: "OPEN_MODAL" }, { type: "SET_PIN", pin: "123456789" }]);
check("pin is capped at six digits", noop4.pin === "");
const noop5 = drive([
  { type: "OPEN_MODAL" },
  { type: "SET_PIN", pin: "1234" },
  { type: "VERIFY" },
]);
check("verify requires six digits", noop5.state === "pin");
const noop6 = drive([
  { type: "OPEN_MODAL" },
  { type: "SET_PIN", pin: code.join("") },
  { type: "VERIFY" },
  { type: "TO_EVENT" },
]);
check("cannot enter event before activation", noop6.state === "verifying");
const noop7 = drive([
  { type: "OPEN_MODAL" },
  { type: "SET_PIN", pin: code.join("") },
  { type: "VERIFY" },
  { type: "GRANTED" },
  { type: "VOICE_DONE" },
  { type: "TO_CINEMATIC" },
]);
check("cannot skip to cinematic before event", noop7.state === "voice");

if (failed === 0) {
  console.log("access machine: all checks passed");
} else {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}