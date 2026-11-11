import { VISUAL_AI } from "@/lib/landing/content.fr";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/**
 * SECTION 5 — IA VISUELLE : les 7 compétences, dans l'ordre.
 * Inspiré de « Les 7 étapes » de phantombuild : fiches en quinconce légèrement
 * inclinées, punaise rouge, flèches en pointillés d'une fiche à l'autre. Fond bleu uni.
 */
export function VisualAI() {
  return (
    <section className="lp-section">
      <div className="lp-band">
        <Container narrow>
          <SectionHead eyebrow={VISUAL_AI.eyebrow} title={VISUAL_AI.title} text={VISUAL_AI.text} />

          <ol className="lp-steps">
            {VISUAL_AI.skills.map((skill, i) => (
              <Reveal as="li" key={skill.title} y={36} className="lp-step">
                <div className="lp-step__card">
                  <span className="lp-step__pin" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="lp-step__num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="lp-icon-tile size-11 rounded-[14px]">
                      <Icon icon={skill.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="lp-h3 mt-3 text-[20px] md:text-[21px]">
                    <span className="sr-only">Compétence {i + 1} : </span>
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink-soft">{skill.text}</p>
                </div>

                {i < VISUAL_AI.skills.length - 1 ? (
                  <svg className="lp-step__link" viewBox="0 0 100 96" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M2 4 C 55 4, 70 60, 92 86"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="5 6"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M80 84 L 93 88 L 92 74"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                ) : null}
              </Reveal>
            ))}
          </ol>

          <Reveal y={24} className="mx-auto mt-14 max-w-[760px] text-center">
            <p className="text-lg text-ink md:text-xl">{VISUAL_AI.conclusion}</p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
