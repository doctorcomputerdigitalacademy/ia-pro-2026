import Image from "next/image";
import { BRAND, NAV } from "@/lib/landing/content.fr";
import { FOOTER2 } from "@/lib/landing/content.v2";
import { CONTACT_URL } from "@/lib/landing/config";
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
        <p className="mt-12 border-t border-surface/10 pt-6 text-[13px] text-surface/50">
          © {BRAND.year} {BRAND.name}. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
