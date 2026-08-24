---
name: command-center-inauguration-frontend-engineering
description: Frontend architecture and implementation standards for the Command Center inauguration microsite using modern React/Next.js tooling, robust state management, accessibility, and maintainable components.
---

# Frontend Engineering

## Preferred Stack
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion and/or GSAP
- Lucide React or equivalent

Do not add dependencies without a clear benefit.

## Architecture
Suggested:
app/
components/
data/
lib/
public/
styles/

Components:
HeroVideo, InaugurationButton, AccessModal, PinPad, Authentication, AccessGranted, VoiceOver, SystemActivation, EventHero, EventInfo, Journey, Schedule, Guests, Gallery, Location, Closing.

## State Machine
Use explicit states instead of scattered booleans:
IDLE, LANDING, ACCESS_MODAL, ENTERING_PIN, VERIFYING, ACCESS_DENIED, ACCESS_GRANTED, VOICE_OVER, SYSTEM_ACTIVATION, TRANSITION, EVENT_HOME.

Prevent impossible state combinations.

## PIN
Exactly six digits. Support keypad, physical keyboard, Backspace, Enter, Escape, clear error state, duplicate-submission prevention, and reset after failure.

If PIN is real security: server-side validation, never expose secret in client JS, rate-limit, never log PIN.
If PIN is only an event gimmick, document that it is not a security boundary.

## Audio
Start from explicit user gesture, preferably RESMIKAN. Provide mute/unmute. Handle play() rejection gracefully. Missing audio must never freeze the site.

## Video
Use WebM, MP4 fallback, poster, mobile variant, compressed media, and lazy loading for nonhero video. Never block UI on video.

## Performance
Fast first contentful paint, minimal initial JS, lazy-load below-fold media, optimize images, avoid layout shift, dynamically import heavy optional components.

## SEO
Provide title, description, Open Graph image, favicon, and canonical URL where applicable.

## Accessibility
Semantic HTML, keyboard support, visible focus, aria labels, dialog semantics, focus trap, focus return, reduced motion, adequate contrast.

## Error Handling
Gracefully handle video/audio failure, missing images, API failure, invalid PIN, and slow connections.

## Code Quality
Strict TypeScript, reusable primitives, no duplicated logic, meaningful names, no dead code, no production console noise, content/data separated from presentation.
