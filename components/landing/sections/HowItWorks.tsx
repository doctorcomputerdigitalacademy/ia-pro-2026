import { HOW_IT_WORKS } from "@/lib/landing/content.fr";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/**
 * COMMENT ÇA MARCHE ? — 3 cartes blanches numérotées sur fond bleu uni,
 * reliées par un trait en pointillés qui fait une boucle (inspiré de la capture fournie).
 */
export function HowItWorks() {
  return (
    <section className="lp-section">
      <div className="lp-band">
        <Container>
          <SectionHead eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title} className="lp-how-head mb-10 md:mb-14" />

          <div className="relative">
            {/* Trait en pointillés avec boucle (ordinateur) */}
            <svg
              className="lp-how__line pointer-events-none absolute inset-0 hidden size-full md:block"
              viewBox="0 0 1200 340"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 322 150 C 356 160, 398 192, 408 236 C 418 284, 380 316, 360 292 C 340 266, 368 222, 404 206 C 420 199, 432 196, 446 195"
                vectorEffect="non-scaling-stroke"
              />
              <path d="M 762 200 C 812 192, 832 128, 856 84 C 868 62, 876 50, 884 44" vectorEffect="non-scaling-stroke" />
            </svg>

            <ol className="relative grid gap-12 md:grid-cols-3 md:gap-[9%]">
              {HOW_IT_WORKS.steps.map((step, i) => (
                <Reveal as="li" key={step.title} y={30} delay={i * 0.12} className="lp-how__item">
                  <div className="lp-how__card">
                    <span className="lp-how__num">{i + 1}</span>
                    <h3 className="lp-h3 mt-5 text-[19px] font-bold md:text-[20px]">{step.title}</h3>
                    <p className="mt-3 text-[15.5px] leading-relaxed">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
