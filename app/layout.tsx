import type { Metadata, Viewport } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./landing.css";
import "./landing-bands.css";
import "./landing-v2.css";
import "./landing-v2-program.css";
import "./landing-v2-extra.css";

/* Police du texte courant et des boutons : DM Sans (reprise de oskool.site) */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* Police des surtitres (petites lignes au-dessus des grands titres) : Montserrat italique */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["italic"],
  display: "swap",
});

/* Police des titres et sous-titres : Satoshi (Indian Type Foundry, licence ITF Free Font) */
const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-900.woff2", weight: "900", style: "normal" },
  ],
});

/* Police des grands titres : Clash Display (Indian Type Foundry, licence ITF Free Font), comme ghostdesignco */
const clash = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "IA PRO 2026 | Formation en présentiel en intelligence artificielle à Calavi",
  description:
    "3 jours de formation pratique en présentiel à Calavi + 30 jours d'accompagnement pour maîtriser ChatGPT, Claude, Gemini et NotebookLM, et créer visuels et vidéos avec l'IA. 20 000 FCFA tout compris. Doctor Computer Digital Academy, Calavi.",
  openGraph: {
    title: "IA PRO 2026 | Doctor Computer Digital Academy",
    description: "Apprenez l'IA en 3 jours, en présentiel à Calavi. Et utilisez-la comme un pro.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d47a1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${satoshi.variable} ${montserrat.variable} ${clash.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
