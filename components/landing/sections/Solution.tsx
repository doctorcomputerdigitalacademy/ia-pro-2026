import { CTA, SOLUTION } from "@/lib/landing/content.fr";
import { cn } from "@/lib/utils";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/** SECTION 3 — LA SOLUTION : IA PRO 2026 */
export function Solution() {
  return (
    <section className="lp-section">
      <Container>
        <SectionHead eyebrow={SOLUTION.eyebrow} title={SOLUTION.title} text={SOLUTION.text} />

        {/* Les deux spécialités, centrées, sur fond rouge uni */}
        <Reveal y={28}>
          <div className="lp-redband">
            <p className="lp-sub mx-auto max-w-[620px] text-center text-[19px] font-bold text-surface md:text-[22px]">{SOLUTION.intro}</p>
            <div className="mx-auto mt-7 grid max-w-[900px] gap-4 md:mt-9 md:grid-cols-2 md:gap-5">
              {SOLUTION.specialties.map((spec, i) => (
                <article key={spec.title} className="lp-card flex h-full flex-col items-center p-7 text-center md:p-9">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3.5 py-1 text-[12.5px] font-bold uppercase tracking-[0.12em]",
                      i === 0 ? "bg-primary-soft text-primary" : "bg-secondary-soft text-secondary",
                    )}
                  >
                    {spec.tag}
                  </span>
                  <span className={cn("lp-icon-tile mt-6 flex size-16 rounded-[20px]", i === 1 && "lp-icon-tile--secondary")}>
                    <Icon icon={spec.icon} size={30} />
                  </span>
                  <h3 className={cn("lp-h3 mt-5 text-[25px] font-bold md:text-[28px]", i === 0 ? "text-primary" : "text-secondary")}>
                    {spec.title}
                  </h3>
                  <p className="mt-3 text-[16px] font-medium text-ink">{spec.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal y={24} className="mt-10 flex justify-center">
          <CTAButton label={CTA.solution} pulse />
        </Reveal>
      </Container>
    </section>
  );
}
