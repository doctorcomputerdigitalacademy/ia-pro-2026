import { SUPPORT } from "@/lib/landing/content.fr";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/** Badge circulaire « 30 jours » avec texte tournant. */
function RingBadge() {
  return (
    <div className="relative mx-auto size-[180px] md:size-[210px]" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="lp-ring-text absolute inset-0 size-full text-surface">
        <defs>
          <path id="lp-ring-path" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        {/* textLength = circonférence (2π × 82) : le texte fait exactement le tour */}
        <text fill="currentColor" style={{ fontSize: 13, fontWeight: 700 }}>
          <textPath href="#lp-ring-path" textLength="512" lengthAdjust="spacing">
            {SUPPORT.ringText}
          </textPath>
        </text>
      </svg>
      <div className="lp-support__core absolute inset-[34px] flex flex-col items-center justify-center rounded-full">
        <span className="text-[54px] font-black leading-none tracking-[-0.05em] md:text-[64px]">30</span>
        <span className="mt-1 text-[13px] font-bold uppercase tracking-[0.14em]">jours</span>
      </div>
    </div>
  );
}

/** SECTION 7 — 30 JOURS D'ACCOMPAGNEMENT : carte rouge sur fond bleu uni. */
export function Support() {
  return (
    <section className="lp-section">
      <div className="lp-band">
        <Container narrow>
          <SectionHead eyebrow={SUPPORT.eyebrow} title={SUPPORT.title} />

          <Reveal>
            <div className="lp-support-card grid items-center gap-8 p-7 md:grid-cols-[220px_1fr] md:gap-12 md:p-12">
              <RingBadge />
              <div>
                <p className="text-[16.5px] md:text-lg">{SUPPORT.text}</p>
                <p className="mt-6 font-bold">{SUPPORT.listTitle}</p>
                <ul className="mt-4 space-y-3">
                  {SUPPORT.benefits.map((b, i) => (
                    <Reveal as="li" key={b.text} y={16} delay={0.08 * i} className="flex items-center gap-3.5">
                      <span className="lp-support__icon">
                        <Icon icon={b.icon} size={19} />
                      </span>
                      <span className="text-[16px] font-medium">{b.text}</span>
                    </Reveal>
                  ))}
                </ul>
                <p className="mt-6 text-[15.5px] opacity-85">{SUPPORT.after}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
