---
name: command-center-inauguration
description: Build a premium cinematic interactive microsite for a Command Center grand inauguration, centered on a profile video, RESMIKAN CTA, six-digit access PIN, access-granted voice-over, system activation sequence, and polished event storytelling.
---

# Command Center Inauguration — Master Skill

## Mission
Build an unforgettable digital inauguration experience, not a generic corporate landing page and not an operational Command Center dashboard.

Core narrative:
VIDEO PROFILE → RESMIKAN → SECURE ACCESS → 6-DIGIT PIN → AUTHENTICATING → ACCESS GRANTED → VOICE OVER → SYSTEM ACTIVATION → GRAND INAUGURATION → EVENT EXPERIENCE.

The first 10 seconds are the highest-priority experience.

## Creative Direction
- Style: cinematic corporate technology.
- Mood: premium, formal, confident, modern, memorable.
- Avoid cyberpunk, gaming UI, excessive neon, generic SaaS cards, noisy gradients, and dashboard aesthetics.
- Use dark navy/black foundations with restrained cyan/green technology accents and a very limited champagne-gold inauguration accent.
- Prefer large typography, generous whitespace, cinematic imagery, subtle glass surfaces, restrained glow, and precise motion.

## Color Tokens
- Background: #050A0F
- Surface: #0B141C
- Primary Cyan: #00D4FF
- Success Green: #00E5A0
- White: #F5F7FA
- Muted: #8B98A5
- Champagne Gold: #C9A96E
- Error: #FF4D5A

## Core Experience
1. Fullscreen Command Center profile video with dark overlay.
2. Minimal event title and RESMIKAN button.
3. Clicking RESMIKAN opens Secure Access modal.
4. User enters a six-digit PIN through a custom keypad.
5. Correct PIN triggers authentication.
6. Show ACCESS GRANTED.
7. Play: “Access granted. Welcome to Command Center.”
8. Run a system activation sequence.
9. Execute cinematic transition into the inauguration experience.
10. Present event story, schedule, journey, gallery, location, and optional RSVP.
11. End with: “THE FUTURE STARTS HERE.”

## UX Rules
- Never make the PIN flow look like a normal login form.
- RESMIKAN is part of the story, not merely a CTA.
- Give clear feedback for every interaction.
- Keyboard: digits, Backspace, Enter, Escape.
- Mobile receives equal design attention.
- Provide sound controls.
- Respect prefers-reduced-motion.
- Never hide essential event information behind animation.

## Engineering Rules
- Prefer Next.js + TypeScript + Tailwind CSS.
- Use Framer Motion and/or GSAP only where useful.
- Componentize major interactions.
- Use a clear state machine.
- Keep event content separate from UI logic.
- Never expose a real secret PIN in client code.
- Optimize video/audio aggressively.
- Provide poster/fallback media.
- Lazy-load noncritical gallery media.
- Avoid layout shift.
- Preserve accessibility.

## State Machine
IDLE → LANDING → ACCESS_MODAL → ENTERING_PIN → VERIFYING
VERIFYING → ENTERING_PIN on failure
VERIFYING → ACCESS_GRANTED on success
ACCESS_GRANTED → VOICE_OVER → SYSTEM_ACTIVATION → TRANSITION → EVENT_HOME → EVENT_EXPERIENCE

## Quality Bar
Test desktop 1440×900, tablet, mobile 390×844, reduced motion, muted audio, slow network, wrong PIN, correct PIN, keyboard-only interaction, and repeated modal open/close.

## Anti-Generic Rule
Do not produce generic hero + three cards, default gradients, random glassmorphism, excessive neon, meaningless counters, stock dashboard widgets, or random scroll animations.

Every visual element must support the inauguration story.
