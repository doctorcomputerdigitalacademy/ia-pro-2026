import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/landing/content.fr";
import { CONTACT_URL } from "@/lib/landing/config";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

/** PAGE 404 personnalisée : retour à la formation ou question sur WhatsApp. */
export default function NotFound() {
  return (
    <main className="lp-404">
      <div>
        <Link href="/" aria-label={`${BRAND.name}, retour à l'accueil`} className="inline-block">
          <Image src="/brand/logo-doctor-computer.png" alt={BRAND.logoAlt} width={281} height={45} className="mx-auto h-auto w-[170px]" />
        </Link>
        <p className="lp-404__code mt-10" aria-hidden="true">
          4<span>0</span>4
        </p>
        <h1 className="lp-404__title">Cette page n&apos;existe pas.</h1>
        <p className="lp-404__text">
          Le lien est peut-être incomplet ou la page a été déplacée. La formation IA PRO 2026, elle, vous attend toujours à Calavi.
        </p>
        <div className="lp-404__actions">
          <Link href="/" className="lp-404__btn is-main">
            Découvrir la formation
          </Link>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="lp-404__btn">
            Poser une question sur WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
