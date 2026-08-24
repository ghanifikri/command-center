---
name: command-center-inauguration-performance
description: Performance, media optimization, resilience, and loading standards for a cinematic Command Center inauguration microsite with fullscreen video, audio, animation, and gallery content.
---

# Performance & Media

## Priority
The site must feel premium without feeling slow.
Priority: usable UI → event identity → hero media → cinematic effects → below-fold media.

## Hero Video
Provide WebM where supported, MP4 fallback, poster image, desktop/mobile variants where possible, compressed bitrate, and no unnecessary audio track. Use object-fit: cover.

Poster must be ready for slow networks, autoplay restrictions, video failure, and reduced motion.

## Mobile
Use a dedicated lighter video where possible. Do not force a large desktop video onto small devices.
If bandwidth is poor, use the poster while keeping the event experience fully usable.

## Images
Use WebP/AVIF where practical, responsive srcset, lazy-load gallery, explicit dimensions/aspect ratios, and compressed assets.

## Audio
Keep voice-over/effects small. Preload only first-interaction audio. Lazy-load noncritical music.

## Animation
Prefer transform and opacity. Avoid expensive layout animations. Do not continuously animate large fullscreen layers. Stop unnecessary offscreen animation.

## Third-Party Scripts
Minimize analytics and external scripts. Do not block initial usability.

## Loading
Initial: HTML, critical CSS, logo, hero poster, essential JS.
After interaction: hero video if needed, access audio, noncritical animation code.
Below fold: gallery, maps, RSVP integrations.

## Resilience
Site must remain usable if video, audio, gallery image, map, or external integration fails.

## Quality Checks
Test Chrome desktop, Edge desktop, Safari/iOS where possible, Android Chrome, slow network, reduced motion, muted environment, and low-end mobile.

## Anti-Patterns
Avoid uncompressed 4K video, giant PNG galleries, loading all images immediately, heavy 3D before interaction, duplicate animation libraries, blocking fonts, and unnecessary full-page JavaScript.
