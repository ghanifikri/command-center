---
name: command-center-inauguration-ui-ux
description: UI/UX system for the Command Center grand inauguration microsite, including visual system, layouts, secure access modal, event storytelling, and responsive behavior.
---

# UI/UX System

## Design Principle
Create a premium event experience rather than a conventional website.

Hierarchy:
1. Video
2. Event identity
3. RESMIKAN
4. Secure access
5. Access success
6. Inauguration story
7. Practical event information

## Typography
Preferred display fonts: Space Grotesk, Sora, or equivalent.
Preferred body fonts: Inter, Manrope, or equivalent.
Use large display typography, high contrast, and no more than two font families.

## Landing
Fullscreen 100svh. Background video uses object-fit: cover with a dark cinematic overlay. Company logo sits top-left. Event identity is centered. RESMIKAN sits below the title.

Hierarchy:
COMMAND CENTER
GRAND INAUGURATION
DATE
[ RESMIKAN ]

## RESMIKAN
Thin border, subtle cyan glow, dark/transparent surface, directional arrow. Hover is restrained. Active state uses short compression feedback. Avoid oversized pill styling.

## Secure Access Modal
Centered card over blurred/dimmed video. Include status indicator, SECURE ACCESS, COMMAND CENTER, ENTER AUTHORIZATION CODE, six PIN indicators, custom keypad, and close control. It should feel like an elegant access terminal.

## PIN Keypad
3×4 layout, large touch targets, clear focus/active state, backspace and confirm, keyboard mirroring, generous mobile spacing.

## Feedback
Entering: indicators fill.
Verifying: status/progress.
Error: brief shake + red status + reset.
Success: green/cyan status + ACCESS GRANTED.

## Event Navigation
After activation: EVENT / JOURNEY / MOMENTS / SCHEDULE / LOCATION / optional RSVP. Transparent header becomes subtle glass on scroll.

## Event Sections
1. Event Hero
2. Event Introduction
3. Event Details
4. Project Journey
5. Building Story
6. Inauguration Highlights
7. Schedule
8. Distinguished Guests
9. Gallery
10. Location
11. Closing

Do not force sections if content is unavailable.

## Timeline
Desktop horizontal; mobile vertical.
CONCEPT → DESIGN → CONSTRUCTION → INSTALLATION → INTEGRATION → COMMISSIONING → INAUGURATION

## Gallery
Prefer editorial/masonry composition over equal cards. Desktop hover reveal; mobile tap.

## Responsive
Desktop: cinematic layouts and horizontal timeline.
Tablet: reduced type scale.
Mobile: 100svh, simplified overlays, thumb-friendly keypad, vertical timeline, limited parallax.

## Accessibility
Semantic headings, visible focus, comfortable touch targets, keyboard navigation, aria labels, reduced motion, captions/transcript for voice-over, and status not conveyed by color alone.
