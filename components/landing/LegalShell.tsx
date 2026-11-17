import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND } from "@/lib/landing/content.fr";

/** Gabarit commun des pages légales : barre avec logo et retour, texte, pied de page. */
export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="lp-legal">
      <header className="lp-legal__bar">
        <div className="lp-legal__bar-in">
          <Link href="/" aria-label={`${BRAND.name}, retour à l'accueil`}>
            <Image src="/brand/logo-doctor-computer.png" alt={BRAND.logoAlt} width={281} height={45} priority className="h-auto w-[150px] sm:w-[180px]" />
          </Link>
          <Link href="/" className="lp-legal__back">
            Retour au site
          </Link>
        </div>
      </header>
      <main className="lp-legal__body">
        <h1>{title}</h1>
        <p className="lp-legal__updated">Dernière mise à jour : {updated}</p>
        {children}
      </main>
      <footer className="lp-legal__foot">
        <p>
          © {BRAND.year} {BRAND.name}
          <Link href="/politique-de-confidentialite">Confidentialité</Link>
          <Link href="/conditions-generales">Conditions générales</Link>
        </p>
      </footer>
    </div>
  );
}
