import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./landing.css";
import "./landing-bands.css";
import "./landing-v2.css";
import "./landing-v2-program.css";
import "./landing-v2-extra.css";
import "./landing-v2-hero.css";
import "./landing-v2-bonus.css";
import "./landing-legal.css";
import { CookieConsent } from "@/components/landing/primitives/CookieConsent";
import { SITE_URL } from "@/lib/landing/config";

/* Police du texte courant et des boutons : DM Sans (reprise de oskool.site) */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

const DESCRIPTION =
  "3 jours de formation pratique en présentiel à Calavi + 30 jours d'accompagnement pour maîtriser ChatGPT, Claude, Gemini et NotebookLM, et créer visuels et vidéos avec l'IA. 20 000 FCFA tout compris.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IA PRO 2026 | Formation IA en présentiel à Calavi",
    template: "%s | IA PRO 2026",
  },
  description: DESCRIPTION,
  applicationName: "IA PRO 2026",
  authors: [{ name: "Doctor Computer Digital Academy" }],
  keywords: [
    "formation intelligence artificielle",
    "formation IA Bénin",
    "formation IA Calavi",
    "formation ChatGPT Cotonou",
    "IA PRO 2026",
    "Doctor Computer Digital Academy",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "IA PRO 2026 | Formation IA en présentiel à Calavi",
    description: "Apprenez l'IA en 3 jours, en présentiel à Calavi. Et utilisez-la comme un pro. 20 000 FCFA tout compris.",
    url: "/",
    siteName: "IA PRO 2026 · Doctor Computer Digital Academy",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IA PRO 2026 | Formation IA en présentiel à Calavi",
    description: "Apprenez l'IA en 3 jours, en présentiel à Calavi. 20 000 FCFA tout compris.",
  },
  formatDetection: { telephone: false },
  /* Vérification du domaine dans Meta Business (Sécurité de la marque > Domaines) */
  other: {
    "facebook-domain-verification": "c0pabh7kw9xzgr5cha0my1kvpjbcxv",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d47a1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${satoshi.variable} ${clash.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        {/* Statistiques de visites Vercel (à activer dans l'onglet Analytics du projet) */}
        <Analytics />
        {/* Bandeau de consentement aux cookies (Pixel Meta) */}
        <CookieConsent />
      </body>
    </html>
  );
}
