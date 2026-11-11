import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { PRO_AI } from "@/lib/landing/content.fr";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";
import { ModulesStack } from "./ModulesStack";

/** SECTION 4 — LE CŒUR DE LA FORMATION : IA PROFESSIONNELLE (6 modules en cartes image) */
export function ProfessionalAI() {
  return (
    <section id="programme" className="lp-section scroll-mt-24">
      <Container>
        <SectionHead eyebrow={PRO_AI.eyebrow} title={PRO_AI.title} text={PRO_AI.text} />

        {/* 6 modules : cartes image empilées au défilement */}
        <ModulesStack />

        <Reveal y={24} className="mx-auto mt-6 max-w-[880px]">
          <div className="lp-card flex items-center gap-4 border-primary-line p-5 md:gap-5 md:p-7">
            <span className="lp-icon-tile">
              <Icon icon={CheckmarkBadge01Icon} />
            </span>
            <p className="text-[16.5px] font-medium text-ink md:text-lg">{PRO_AI.outcome}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
