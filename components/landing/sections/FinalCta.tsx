import { Cancel01Icon, Tick02Icon, UserIcon } from "@hugeicons/core-free-icons";
import { CTA, FINAL_CTA, PRICING, TRUST } from "@/lib/landing/content.fr";
import { cn } from "@/lib/utils";
import { TOTAL_VALUE, fcfa } from "@/lib/landing/pricing";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";

/**
 * SECTION 13 — DERNIER APPEL : « Vous avez tout vu. Maintenant, c'est à vous de choisir. »
 * Inspiré de phantombuild : deux choix côte à côte (le premier estompé), puis le prix
 * et le bouton. Fond bleu uni.
 */
export function FinalCta() {
  return (
    <section id="inscription" className="lp-section scroll-mt-24">
      <div className="lp-band">
        <Container narrow className="text-center">
          <Reveal y={20}>
            <span className="inline-flex items-center gap-3 rounded-full border border-line px-3 py-1.5 text-[14px] text-ink-soft">
              <span className="lp-band-avatars" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i}>
                    <Icon icon={UserIcon} size={14} strokeWidth={2} />
                  </span>
                ))}
              </span>
              <span>
                <span className="font-semibold text-ink">{TRUST.count}</span> {FINAL_CTA.proof}
              </span>
            </span>
          </Reveal>

          <Reveal y={28} className="mt-6">
            <h2 className="lp-h2 text-[clamp(32px,5vw,54px)]">
              <span className="block">{FINAL_CTA.titleLine1}</span>
              <span className="block text-ink-soft">{FINAL_CTA.titleLine2}</span>
            </h2>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-[820px] gap-4 text-left md:grid-cols-2 md:gap-5">
            {FINAL_CTA.choices.map((choice, c) => {
              const on = c === 1;
              return (
                <Reveal key={choice.tag} y={28} delay={c * 0.1}>
                  <div className={cn("lp-choice h-full", on ? "lp-choice--on" : "lp-choice--off")}>
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-soft">{choice.tag}</span>
                    <h3 className="lp-h3 mt-2 text-[22px] md:text-[24px]">{choice.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {choice.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-[15.5px] text-ink-soft">
                          {on ? (
                            <span className="lp-icon-chip lp-icon-chip--sm mt-px">
                              <Icon icon={Tick02Icon} size={14} strokeWidth={2.4} />
                            </span>
                          ) : (
                            <Icon icon={Cancel01Icon} size={16} strokeWidth={2} className="mt-1 shrink-0" />
                          )}
                          <span className={on ? "text-ink" : undefined}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal y={24} className="mt-12">
            <p className="mb-2 text-[16px] text-ink-soft">
              {PRICING.totalValueLabel} : <span className="lp-strike font-bold">{fcfa(TOTAL_VALUE)}</span>
            </p>
            <p className="flex items-baseline justify-center gap-3">
              <span className="text-[56px] font-bold leading-none tracking-[-0.05em] text-ink md:text-[68px]">
                {PRICING.amount}
              </span>
              <span className="text-2xl font-semibold text-ink">{PRICING.currency}</span>
            </p>
            <p className="mt-2 text-[15px] text-ink-soft">{FINAL_CTA.priceNote}</p>
          </Reveal>

          <Reveal y={24} className="mt-8 flex justify-center">
            <CTAButton label={CTA.final} pulse />
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
