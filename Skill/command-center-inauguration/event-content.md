---
name: command-center-inauguration-event-content
description: Official event content and configurable data for the PT Krakatau Tirta Industri Command Center Grand Inauguration on 29 August 2026. Contains event identity, access experience copy, voice-over script, official inauguration text, schedule, location, and closing copy. Use this file as the single source of truth for event-specific content.
---

# PT Krakatau Tirta Industri — Command Center Grand Inauguration

## 1. Event Identity

```yaml
event:
  title: "Grand Inauguration"
  subtitle: "Command Center"
  full_title: "Grand Inauguration Command Center"
  company: "PT Krakatau Tirta Industri"
  date: "29 Agustus 2026"
  date_iso: "2026-08-29"
  location: "Jl. Ir. Sutami, Command Center Building"
  city: ""
  country: "Indonesia"

leadership:
  role: "Direktur Utama PT Krakatau Steel"
  name: ""
```

### Content Rule

Do not invent the name of the Director/CEO.

If the name is not supplied, display only:

> Direktur Utama PT Krakatau Steel

Do not create a fake person name.

---

# 2. Access Experience

The access interaction is a cinematic event experience and is not intended to represent real cybersecurity.

```yaml
access:
  enabled: true
  code_length: 6
  code: "280296"
  label: "Secure Access"
  system_name: "Command Center"
```

### Security Note

The PIN `280296` is an event interaction code.

It must not be represented as an actual production security credential.

If the website is publicly deployed, developers should understand that a client-side PIN can be discovered. For a genuine security mechanism, validation must be performed server-side.

---

# 3. Opening Copy

## Primary

```text
GRAND INAUGURATION

COMMAND CENTER

A New Chapter of Integrated Excellence

29 AGUSTUS 2026
```

## Secondary

```text
PT KRAKATAU TIRTA INDUSTRI
```

## Primary CTA

```text
RESMIKAN
```

### CTA Intent

The RESMIKAN button represents the user's entry into the inauguration experience.

It should not be presented as a generic "Learn More" or "Enter Website" button.

---

# 4. Secure Access Copy

When the user clicks RESMIKAN:

```text
SECURE ACCESS

COMMAND CENTER

AUTHORIZATION REQUIRED

ENTER 6-DIGIT ACCESS CODE
```

PIN placeholders:

```text
● ● ● ● ● ●
```

Keypad labels:

```text
1  2  3
4  5  6
7  8  9
←  0  ✓
```

---

# 5. Invalid Access

If the entered PIN is incorrect:

```text
ACCESS DENIED

INVALID AUTHORIZATION CODE

PLEASE TRY AGAIN
```

Do not use aggressive wording such as:

```text
INTRUSION DETECTED
SYSTEM LOCKED
SECURITY BREACH
```

The experience is ceremonial, not a real security system.

---

# 6. Authentication Sequence

After the correct PIN is entered:

```text
AUTHENTICATING...
```

Optional progress labels:

```text
VERIFYING ACCESS...
ESTABLISHING CONNECTION...
AUTHENTICATING COMMAND CENTER...
```

Keep the sequence short and cinematic.

Recommended duration:

```yaml
authentication:
  duration_ms: 1400
```

---

# 7. Access Granted

Primary success message:

```text
ACCESS GRANTED
```

Voice-over:

```text
Access granted.

Welcome to Command Center.
```

Optional final voice line:

```text
The future starts here.
```

### Recommended Voice Timing

```yaml
voice_over:
  access_granted:
    text: "Access granted."
    delay_after_text_ms: 500

  welcome:
    text: "Welcome to Command Center."
    delay_after_text_ms: 900

  closing:
    text: "The future starts here."
```

The final line is optional and should only be used if the transition needs additional dramatic emphasis.

---

# 8. System Activation

After the voice-over:

```text
INITIALIZING COMMAND CENTER
```

Then reveal:

```text
NETWORK ................. ONLINE
SECURITY ................ ONLINE
MONITORING .............. ONLINE
COMMUNICATION ........... ONLINE
SYSTEM .................. ONLINE
```

Final status:

```text
ALL SYSTEMS READY
```

### Animation Rule

Each system line should appear sequentially.

Do not make this look like a technical monitoring dashboard.

It is a cinematic representation of the inauguration experience.

---

# 9. Main Event Hero

After activation:

```text
GRAND INAUGURATION

COMMAND CENTER

PT KRAKATAU TIRTA INDUSTRI

29 AGUSTUS 2026
```

Supporting statement:

```text
A New Chapter of Integrated Excellence
```

---

# 10. Official Event Introduction

Use the following official-style copy:

> Hari ini menandai sebuah langkah baru dalam perjalanan PT Krakatau Tirta Industri melalui hadirnya Gedung Command Center sebagai bagian dari penguatan integrasi, koordinasi, dan pengelolaan informasi secara terpadu.

Alternative shorter version for mobile:

> Sebuah langkah baru bagi PT Krakatau Tirta Industri melalui hadirnya Gedung Command Center untuk mendukung integrasi, koordinasi, dan pengelolaan informasi secara terpadu.

---

# 11. Inauguration Statement

Primary version:

> Dengan semangat transformasi dan peningkatan keunggulan operasional, PT Krakatau Tirta Industri meresmikan Gedung Command Center sebagai salah satu langkah strategis dalam mendukung koordinasi, monitoring, dan pengambilan keputusan yang lebih terintegrasi.

Short version:

> Peresmian Gedung Command Center menjadi langkah strategis PT Krakatau Tirta Industri dalam memperkuat integrasi, koordinasi, monitoring, dan pengambilan keputusan.

---

# 12. Event Information

```yaml
event_information:
  event_name: "Grand Inauguration Command Center"
  organizer: "PT Krakatau Tirta Industri"
  date: "29 Agustus 2026"
  location: "Jl. Ir. Sutami, Command Center Building"
  agenda: "Peresmian Gedung Command Center"
```

Display format:

```text
DATE
29 AGUSTUS 2026

LOCATION
JL. IR. SUTAMI
COMMAND CENTER BUILDING

AGENDA
PERESMIAN GEDUNG COMMAND CENTER
```

---

# 13. Event Schedule

The event currently has only one primary agenda.

Do not invent additional activities, speeches, tours, luncheon, entertainment, or guest sessions.

```yaml
schedule:
  - title: "Peresmian Gedung Command Center"
    date: "29 Agustus 2026"
    time: ""
    location: "Command Center Building"
```

### Important

The exact time has not been provided.

Do not display a fabricated time.

If a time is required by the UI, use a configurable placeholder or hide the time field.

---

# 14. Leadership

Current official information:

```yaml
leadership:
  - role: "Direktur Utama PT Krakatau Steel"
    name: ""
```

### Display Rule

Until the name is supplied:

```text
DIREKTUR UTAMA
PT KRAKATAU STEEL
```

Do not display a fictional name.

---

# 15. Project Story

Recommended section title:

```text
MORE THAN A BUILDING
```

Body:

> Gedung Command Center hadir sebagai bagian dari langkah PT Krakatau Tirta Industri dalam memperkuat integrasi informasi, koordinasi, dan pemantauan untuk mendukung operasional yang semakin terarah dan terintegrasi.

Alternative:

> Bukan sekadar sebuah gedung, Command Center menjadi simbol langkah menuju koordinasi dan pengelolaan informasi yang semakin terintegrasi.

---

# 16. Milestone Section

Because exact project milestones have not been supplied, do not fabricate dates.

Use conceptual milestones only if corresponding photos/content are available:

```yaml
milestones:
  - title: "Concept"
    date: ""
  - title: "Design"
    date: ""
  - title: "Construction"
    date: ""
  - title: "Installation"
    date: ""
  - title: "Integration"
    date: ""
  - title: "Commissioning"
    date: ""
  - title: "Inauguration"
    date: "29 Agustus 2026"
```

### Rule

Only show a milestone when there is real supporting content or documentation.

---

# 17. Inauguration Highlight

Section title:

```text
THE INAUGURATION
```

Copy:

> Sebuah momentum yang menandai hadirnya Gedung Command Center sebagai bagian dari perjalanan PT Krakatau Tirta Industri menuju integrasi operasional dan pengelolaan informasi yang semakin baik.

Short version:

> Sebuah momentum penting dalam perjalanan menuju operasional yang semakin terintegrasi.

---

# 18. Location

```yaml
location:
  address: "Jl. Ir. Sutami"
  building: "Command Center Building"
  city: ""
  country: "Indonesia"
```

Display:

```text
VISIT THE MOMENT

COMMAND CENTER BUILDING

JL. IR. SUTAMI
INDONESIA
```

### Map Rule

Do not fabricate GPS coordinates.

If coordinates or a verified map URL are later provided, add them here.

---

# 19. Gallery

Gallery content should be provided by the project owner.

Expected categories:

```yaml
gallery:
  - category: "Command Center"
    images: []

  - category: "Building"
    images: []

  - category: "Preparation"
    images: []

  - category: "Inauguration"
    images: []
```

Do not use random stock photography when official company photography is expected.

---

# 20. Closing Experience

Primary:

```text
THE FUTURE
STARTS HERE.
```

Then:

```text
COMMAND CENTER

PT KRAKATAU TIRTA INDUSTRI

29 AGUSTUS 2026
```

Final line:

```text
A New Chapter of Integrated Excellence
```

---

# 21. Footer

```text
© 2026 PT Krakatau Tirta Industri

GRAND INAUGURATION
COMMAND CENTER
```

Keep footer minimal.

---

# 22. Content Tone

All copy must be:

- formal
- corporate
- confident
- concise
- inspirational
- technologically modern
- appropriate for an industrial company
- suitable for an official inauguration

Avoid:

- slang
- excessive marketing language
- exaggerated claims
- unverified statistics
- invented achievements
- invented project milestones
- invented executive names
- invented event activities

---

# 23. Language

Primary website language:

```yaml
language:
  primary: "id-ID"
  secondary: "en-US"
```

Use Indonesian for formal event information.

English may be used for cinematic system phrases:

- GRAND INAUGURATION
- SECURE ACCESS
- ACCESS GRANTED
- AUTHENTICATING
- SYSTEM READY
- THE INAUGURATION
- THE FUTURE STARTS HERE

Do not translate these system phrases into awkward literal Indonesian unless requested.

---

# 24. Content Governance

This file is the single source of truth for event-specific content.

Developers must not:
- invent missing data
- change official dates
- change the company name
- invent executive names
- invent schedules
- invent statistics
- invent project achievements

If information is missing, keep it configurable and hide the corresponding UI element when appropriate.

---

# 25. Current Event Configuration

```yaml
event:
  company: "PT Krakatau Tirta Industri"
  title: "Grand Inauguration Command Center"
  date: "29 Agustus 2026"
  location: "Jl. Ir. Sutami, Command Center Building"
  agenda: "Peresmian Gedung Command Center"

access:
  pin: "280296"

leadership:
  role: "Direktur Utama PT Krakatau Steel"
  name: ""

schedule:
  time: ""
  title: "Peresmian Gedung Command Center"

voice:
  line_1: "Access granted."
  line_2: "Welcome to Command Center."
  line_3: "The future starts here."
```

# Final Content Principle

The website should make the visitor feel:

> “Saya bukan sekadar membuka website. Saya sedang memasuki sebuah momen penting.”

The PIN is the trigger.
The voice-over is the confirmation.
The system activation is the ceremony.
The event page is the story.
The closing message is the legacy.