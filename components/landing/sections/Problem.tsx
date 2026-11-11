import { PROBLEM } from "@/lib/landing/content.fr";
import { Reveal } from "../primitives/Reveal";
import { Rich } from "../primitives/Rich";
import { ScrollRevealText } from "../primitives/ScrollEffects";
import { Container, SectionHead } from "../primitives/SectionHead";
import { ProblemCompare } from "./ProblemCompare";

/** SECTION 2 — LE PROBLÈME */
export function Problem() {
  return (
    <section className="lp-section">
      <Container>
        <SectionHead eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} text={PROBLEM.lead} />

        {/* Comparatif visuel : usage basique vs usage maîtrisé */}
        <ProblemCompare />

        {/* Manifeste encadré : mots révélés au scroll, conclusion en bandeau */}
        <Reveal y={28} className="mt-10 md:mt-14">
          <div className="lp-manifesto">
            <span className="lp-manifesto__quote" aria-hidden="true">
              &ldquo;
            </span>
            <ScrollRevealText
              text={PROBLEM.manifesto}
              className="relative text-[clamp(24px,3.4vw,40px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink"
            />
            <div className="lp-manifesto__end">
              <p className="lp-sub text-[19px] font-bold md:text-[23px]">
                <Rich text={PROBLEM.conclusion} />
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
