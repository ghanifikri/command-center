/**
 * Single source of truth for event content.
 * Mirrors event-content.md — do not invent data here.
 */
export const event = {
  title: "Grand Inauguration",
  subtitle: "Command Center",
  fullTitle: "Grand Inauguration Command Center",
  company: "PT Krakatau Tirta Industri",
  companyShort: "PT KTI",
  date: "29 Agustus 2026",
  dateISO: "2026-08-29",
  location: "Jl. Ir. Sutami, Command Center Building",
  agenda: "Peresmian Gedung Command Center",
  tagline: "A New Chapter of Integrated Excellence",
} as const;

export const ACCESS_PIN = "111111";

export const access = {
  enabled: true,
  codeLength: ACCESS_PIN.length,
  code: ACCESS_PIN,
  label: "Secure Access",
  system: "Command Center",
  /** Not a real security boundary — documented per event-content.md. */
} as const;

export const branding = {
  monogram: "KT",
  brandNameLines: ["PT", "KRAKATAU", "TIRTA", "INDUSTRI"],
} as const;

export const landing = {
  label: "GRAND INAUGURATION",
  title: "COMMAND CENTER",
  tagline: event.tagline,
  date: event.date,
  cta: "RESMIKAN",
  secondary: event.company,
} as const;

export const secureAccess = {
  status: access.label,
  system: access.system,
  heading: "AUTHORIZATION REQUIRED",
  prompt: `ENTER ${access.code.length}-DIGIT ACCESS CODE`,
  placeholders: access.code.length,
  keypad: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "ok"],
  wrongPin: {
    title: "ACCESS DENIED",
    message: "INVALID AUTHORIZATION CODE",
    retry: "PLEASE TRY AGAIN",
  },
} as const;

export const authSeq = {
  authenticating: "AUTHENTICATING…",
  progress1: "VERIFYING ACCESS…",
  progress2: "ESTABLISHING CONNECTION…",
  progress3: "AUTHENTICATING COMMAND CENTER…",
  granted: "ACCESS",
  grantedState: "GRANTED",
  durationMs: 2000,
  /** Durasi tampilan layar ACCESS GRANTED sebelum beralih ke aktivasi sistem (2000 = 2 detik) */
  grantedDurationMs: 3700,
} as const;

export const voice = {
  granted: "Access granted.",
  welcome: "Welcome to Command Center PT Krakatau Tirta Industri.",
  moment:
    "Hari ini menandai sebuah langkah baru dalam perjalanan PT Krakatau Tirta Industri melalui hadirnya Gedung Command Center sebagai bagian dari penguatan integrasi, koordinasi, dan pengelolaan informasi secara terpadu.",
  closing: "The future starts here.",
  /** Visible text equivalent so voice content is never audio-only. */
  visible:
    "“Access granted. Welcome to Command Center PT Krakatau Tirta Industri. Hari ini menandai langkah baru dalam perjalanan PT Krakatau Tirta Industri. The future starts here.”",
} as const;

// =========================================================================
// CONFIG: SYSTEM ACTIVATION DURATION (Atur Durasi Animasi Aktivasi di sini)
// =========================================================================
export const activationConfig = {
  /** Durasi animasi progress per baris sistem (dalam milidetik, 2000 = 2 detik) */
  stepDurationMs: 2000,
  /** Jeda jeda setelah baris selesai (100%) sebelum lanjut ke baris berikutnya (ms) */
  stepBufferMs: 300,
  /** Jeda tampilan 'ALL SYSTEMS READY' sebelum beralih ke halaman utama (ms) */
  readyDelayMs: 2000,
} as const;

export const activation = {
  init: "INITIALIZING COMMAND CENTER",
  config: activationConfig,
  systems: [
    { label: "NETWORK", dots: 5, status: "ONLINE", durationMs: 1100 },
    { label: "SECURITY", dots: 16, status: "ONLINE", durationMs: 1400 },
    { label: "MONITORING", dots: 14, status: "ONLINE", durationMs: 1100 },
    { label: "COMMUNICATION", dots: 12, status: "ONLINE", durationMs: 1100 },
    { label: "SYSTEM", dots: 16, status: "ONLINE", durationMs: 1100 },
    { label: "AI", dots: 10, status: "ONLINE", durationMs: 1100 },
  ] as const,
  ready: "ALL SYSTEMS READY", 
} as const;

export const eventHero = {
  label: "GRAND INAUGURATION",
  title: "COMMAND CENTER",
  company: event.company,
  date: event.date,
  tagline: event.tagline,
} as const;

export const intro = {
  eyebrow: "THE MOMENT",
  title: "Menandai Langkah Baru",
  long: "Hari ini menandai sebuah langkah baru dalam perjalanan PT Krakatau Tirta Industri melalui hadirnya Gedung Command Center sebagai bagian dari penguatan integrasi, koordinasi, dan pengelolaan informasi secara terpadu.",
  short:
    "Sebuah langkah baru bagi PT Krakatau Tirta Industri melalui hadirnya Gedung Command Center untuk mendukung integrasi, koordinasi, dan pengelolaan informasi secara terpadu.",
} as const;

export const details = {
  date: event.date,
  locationLine1: "JL. IR. SUTAMI",
  locationLine2: "COMMAND CENTER BUILDING",
  agenda: event.agenda,
} as const;

export const story = {
  eyebrow: "MORE THAN A BUILDING",
  title: "Integrasi, Koordinasi, Informasi",
  body: "Gedung Command Center hadir sebagai bagian dari langkah PT Krakatau Tirta Industri dalam memperkuat integrasi informasi, koordinasi, dan pemantauan untuk mendukung operasional yang semakin terarah dan terintegrasi.",
  emphasis:
    "Bukan sekadar sebuah gedung, Command Center menjadi simbol langkah menuju koordinasi dan pengelolaan informasi yang semakin terintegrasi.",
} as const;

export const journey = {
  eyebrow: "PROJECT JOURNEY",
  title: "Dari Gagasan Menjadi Kenyataan",
  steps: [
    { title: "Concept", date: "", desc: "Penyusunan gagasan dan kebutuhan" },
    { title: "Design", date: "", desc: "Perancangan arsitektural dan teknis" },
    { title: "Construction", date: "", desc: "Pembangunan gedung" },
    { title: "Installation", date: "", desc: "Pemasangan infrastruktur" },
    { title: "Integration", date: "", desc: "Integrasi sistem" },
    { title: "Commissioning", date: "", desc: "Uji fungsi dan kesiapan" },
    { title: "Inauguration", date: event.date, desc: "Peresmian Gedung Command Center" },
  ],
} as const;

export const inauguration = {
  eyebrow: "THE INAUGURATION",
  title: "Sebuah Momentum Baru",
  body: "Sebuah momentum yang menandai hadirnya Gedung Command Center sebagai bagian dari perjalanan PT Krakatau Tirta Industri menuju integrasi operasional dan pengelolaan informasi yang semakin baik.",
  leadershipRole: "DIREKTUR UTAMA",
  leadershipCompany: "PT KRAKATAU STEEL",
} as const;

export const schedule = {
  eyebrow: "EVENT SCHEDULE",
  title: "Agenda Peresmian",
  items: [
    {
      title: event.agenda,
      date: event.date,
      time: "", // kosong → dihidden sampai waktu tersedia
      place: "Command Center Building",
    },
  ] as const,
} as const;

export const locationData = {
  eyebrow: "LOCATION",
  title: "Visit the Moment",
  building: "COMMAND CENTER BUILDING",
  address: "JL. IR. SUTAMI",
  country: "INDONESIA",
  /** Diisi saat koordinat/URL map terverifikasi. */
  mapUrl: "",
} as const;

export const closing = {
  line1: "THE FUTURE",
  line2: "STARTS HERE.",
  after: ["COMMAND CENTER", event.company, event.date] as const,
  final: event.tagline,
} as const;

export const footer = {
  copyright: `© 2026 ${event.company}`,
  title: "GRAND INAUGURATION",
  subtitle: "COMMAND CENTER",
} as const;

/** Section order — sections without data are simply omitted. */
export const eventSections = [
  "intro",
  "details",
  "story",
  "journey",
  "inauguration",
  "schedule",
  "location",
  "closing",
] as const;
