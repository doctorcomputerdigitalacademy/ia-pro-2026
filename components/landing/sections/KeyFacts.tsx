import { KEY_FACTS } from "@/lib/landing/content.fr";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { InViewCounter } from "../primitives/ScrollEffects";
import { Container } from "../primitives/SectionHead";

/** Chiffres clés du programme (compteurs animés, comme le bandeau de stats de la référence). */
export function KeyFacts() {
  return (
    <section aria-label="Le programme en chiffres" className="pt-16 md:pt-24">
      <Container>
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {KEY_FACTS.map((fact, i) => (
            <Reveal as="li" key={fact.label} delay={i * 0.08}>
              <div className="lp-card lp-card--hover flex h-full flex-col gap-4 p-5 md:p-7">
                <span className="lp-icon-tile size-11 rounded-xl">
                  <Icon icon={fact.icon} size={20} />
                </span>
                <div>
                  <InViewCounter
                    value={fact.value}
                    suffix={fact.suffix ? <span className="ml-1 text-[0.42em] font-medium tracking-normal text-primary">{fact.suffix.trim()}</span> : undefined}
                    className="block text-[clamp(32px,4.6vw,52px)] font-normal leading-none tracking-[-0.04em] text-ink"
                  />
                  <p className="mt-2 text-[14.5px] leading-snug text-ink-soft md:text-[15.5px]">{fact.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
