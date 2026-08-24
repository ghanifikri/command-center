---
name: command-center-inauguration-cinematic-motion
description: Motion direction for the Command Center inauguration microsite, covering access interactions, cinematic transitions, scroll behavior, and reduced-motion behavior.
---

# Cinematic Motion System

## Philosophy
Motion communicates state, importance, and progression. Never animate merely because an element can move.

Character: precise, ceremonial where appropriate, fast for system feedback, restrained, cinematic.

## Timing
- micro interaction: 120–220ms
- button/modal: 250–450ms
- section reveal: 500–900ms
- ceremonial transition: 900–1800ms

Avoid excessive bounce and elastic effects.

## Landing
On load: video fades in, logo settles, title reveals, date appears, RESMIKAN becomes active. Do not force a long preloader.

## RESMIKAN
Click: button compresses → UI dims → video receives blur/darkening → access modal fades/scales in.

## PIN
Each digit gets keypad feedback, subtle beep, and indicator fill. No large bouncing animation.
Error: 250–350ms horizontal shake, error state, reset.

## Authentication
After six digits: AUTHENTICATING → progress indicator → subtle scan/glow → success. Keep around 1–1.5 seconds unless specified otherwise.

## Access Granted
Sequence: modal fades down → screen darkens → ACCESS appears → GRANTED appears → voice-over begins → system activation starts.

## System Activation
Show:
NETWORK — ONLINE
SECURITY — ONLINE
MONITORING — ONLINE
COMMUNICATION — ONLINE
SYSTEM — ONLINE

Finish: ALL SYSTEMS READY.

## Main Transition
Recommended: subtle video/camera zoom, layered grid reveal, light sweep, controlled brightness flash if appropriate, dissolve into event hero. Avoid aggressive glitch effects.

## Scroll
Use fade, translate, scale, clip-path, and restrained parallax. Do not animate every element independently.

## Gallery
Desktop hover: scale 1.02–1.04, overlay fade, VIEW MOMENT label.

## Closing
Slow ceremonial reveal: background → THE FUTURE → STARTS HERE → logo → event title.

## Reduced Motion
When enabled: remove parallax, remove large transforms, shorten transitions, avoid unnecessary video motion, retain logical state feedback.
