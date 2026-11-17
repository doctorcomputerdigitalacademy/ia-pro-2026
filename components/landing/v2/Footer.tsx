import Image from "next/image";
import { BRAND, NAV } from "@/lib/landing/content.fr";
import { FOOTER2 } from "@/lib/landing/content.v2";
import { CONTACT_URL } from "@/lib/landing/config";
import { ManageCookies } from "../primitives/ManageCookies";
import { Container } from "../primitives/SectionHead";

/** PIED DE PAGE sombre (façon ghostdesignco). */
export function Footer() {
  return (
    <footer className="v2-footer">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo-white.png" alt={BRAND.logoAlt} width={946} height={177} className="h-auto w-[190px]" />
            <p className="mt-4 max-w-[340px] text-[14.5px] text-surface/65">{FOOTER2.tagline}</p>
          </div>
          <div>
            <p className="v2-footer__head">{FOOTER2.linksTitle}</p>
            <ul className="mt-3 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="v2-footer__link">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="v2-footer__head">{FOOTER2.contactTitle}</p>
            <ul className="mt-3 space-y-2 text-[14.5px] text-surface/75">
              <li>
                <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="v2-footer__link">
                  WhatsApp
                </a>
              </li>
              <li>{BRAND.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-surface/10 pt-6 text-[13px] text-surface/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {BRAND.year} {BRAND.name}. Tous droits réservés.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/conditions-generales" className="v2-footer__link">
              Conditions générales
            </a>
            <a href="/politique-de-confidentialite" className="v2-footer__link">
              Politique de confidentialité
            </a>
            <ManageCookies className="v2-footer__link cursor-pointer" />
          </p>
        </div>
      </Container>
    </footer>
  );
}
