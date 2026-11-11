import Image from "next/image";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { BRAND } from "@/lib/landing/content.fr";
import { Icon } from "../primitives/Icon";
import { Container } from "../primitives/SectionHead";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-line pb-32 pt-10 sm:pb-10 md:mt-20 md:py-12">
      <Container className="flex flex-col items-center text-center">
        <Image src="/brand/logo-doctor-computer.png" alt={BRAND.logoAlt} width={281} height={45} className="h-auto w-[200px]" />
        <p className="mt-6 font-medium text-ink">{BRAND.name}.</p>
        <p className="mt-2 max-w-[560px] text-[15.5px] text-ink-soft">{BRAND.slogan}</p>
        <p className="mt-6 inline-flex items-center gap-2.5 text-left text-[15px] text-ink-soft">
          <span className="lp-icon-chip lp-icon-chip--sm">
            <Icon icon={Location01Icon} size={15} strokeWidth={1.9} />
          </span>
          {BRAND.address}
        </p>
        <p className="mt-8 text-[13.5px] text-ink-soft">
          © {BRAND.year} {BRAND.name}. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
