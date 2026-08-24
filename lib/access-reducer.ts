import { access } from "../data/event";

/** Explicit states — prevents impossible combinations (see frontend-engineering.md). */
export type AccessState =
  | "idle"
  | "landing"
  | "pin"
  | "verifying"
  | "denied"
  | "granted"
  | "voice"
  | "activation"
  | "event"
  | "cinematic";

export type AccessAction =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_PIN"; pin: string }
  | { type: "VERIFY" }
  | { type: "DENIED" }
  | { type: "RETRY" }
  | { type: "GRANTED" }
  | { type: "VOICE_DONE" }
  | { type: "ACTIVATION_DONE" }
  | { type: "TO_EVENT" }
  | { type: "TO_CINEMATIC" };

export interface AccessStateShape {
  state: AccessState;
  dialogOpen: boolean;
  pin: string;
}

export const initialAccessState: AccessStateShape = {
  state: "landing",
  dialogOpen: false,
  pin: "",
};

export function accessReducer(
  prev: AccessStateShape,
  action: AccessAction,
): AccessStateShape {
  switch (action.type) {
    case "OPEN_MODAL":
      if (prev.state !== "landing") return prev;
      return { ...prev, state: "pin", dialogOpen: true, pin: "" };
    case "CLOSE_MODAL":
      if (prev.state !== "pin" && prev.state !== "denied") return prev;
      return { ...prev, state: "landing", dialogOpen: false, pin: "" };
    case "SET_PIN":
      if (action.pin.length > access.codeLength) return prev;
      return { ...prev, pin: action.pin };
    case "VERIFY":
      if (prev.state !== "pin" || prev.pin.length !== access.codeLength)
        return prev;
      return { ...prev, state: "verifying" };
    case "DENIED":
      if (prev.state !== "verifying") return prev;
      return { ...prev, state: "denied", pin: "" };
    case "RETRY":
      if (prev.state !== "denied") return prev;
      return { ...prev, state: "pin", pin: "" };
    case "GRANTED":
      if (prev.state !== "verifying") return prev;
      return { ...prev, state: "granted", dialogOpen: false };
    case "VOICE_DONE":
      if (prev.state !== "granted" && prev.state !== "voice") return prev;
      return { ...prev, state: "voice" };
    case "ACTIVATION_DONE":
      if (prev.state !== "voice" && prev.state !== "activation") return prev;
      return { ...prev, state: "event" };
    case "TO_EVENT":
      if (prev.state !== "activation") return prev;
      return { ...prev, state: "event" };
    case "TO_CINEMATIC":
      if (prev.state !== "event") return prev;
      return { ...prev, state: "cinematic" };
    default:
      return prev;
  }
}