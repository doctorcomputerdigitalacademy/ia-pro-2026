import { CTA } from "@/lib/landing/content.fr";
import { CTAButton } from "../primitives/CTAButton";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";

/** SECTION 13 — DERNIER BOUTON DE RÉSERVATION (fond bleu uni), juste avant le pied de page. */
export function FinalCta() {
  return (
    <section id="inscription" className="lp-section scroll-mt-24">
      <div className="lp-band">
        <Container narrow className="text-center">
          <Reveal y={24} className="flex justify-center">
            <CTAButton label={CTA.final} pulse />
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
