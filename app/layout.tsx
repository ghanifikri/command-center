import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ProviderTree from "@/components/ProviderTree";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peresmian-command-center.vercel.app"),
  title: "Grand Inauguration Command Center — PT Krakatau Tirta Industri",
  description:
    "Peresmian Gedung Command Center PT Krakatau Tirta Industri — 29 Agustus 2026, Jl. Ir. Sutami. A New Chapter of Integrated Excellence.",
  openGraph: {
    title: "Grand Inauguration Command Center",
    description:
      "PT Krakatau Tirta Industri — Peresmian Gedung Command Center, 29 Agustus 2026.",
    type: "website",
    locale: "id_ID",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full bg-[#050A0F] text-[#F5F7FA]">
        <ProviderTree>{children}</ProviderTree>
      </body>
    </html>
  );
}