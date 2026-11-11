import { Tick02Icon } from "@hugeicons/core-free-icons";
import { CTA, PRICING } from "@/lib/landing/content.fr";
import { TOTAL_VALUE, VALUE_ROWS, fcfa } from "@/lib/landing/pricing";
import { PRICE_VALUE } from "@/lib/landing/config";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { TiltOnScroll } from "../primitives/ScrollEffects";
import { Container } from "../primitives/SectionHead";

/**
 * SECTION 10 — VOTRE INVESTISSEMENT
 * Inspiré de phantombuild : à gauche, le tableau de tout ce qui est compris ;
 * à droite, le prix, le bouton et les précisions ; dessous, les garanties. Fond bleu uni.
 * Valeurs barrées : PRICING.includes et BONUS.items (content.fr.ts), total calculé automatiquement.
 */

export function Pricing() {
  const rows = VALUE_ROWS;
  const totalValue = TOTAL_VALUE;

  return (
    <section id="tarif" className="lp-section scroll-mt-24">
      <div className="lp-band">
        <Container>
          <Reveal y={24} className="mx-auto mb-10 max-w-[820px] text-center md:mb-12">
            <h2 className="lp-h2">{PRICING.offerHeading}</h2>
          </Reveal>

          <TiltOnScroll className="mx-auto max-w-[1000px]">
            <article className="lp-price-panel grid lg:grid-cols-[1.25fr_1fr]">
              {/* Ce que vous recevez : chaque élément avec sa valeur barrée en rouge */}
              <div className="p-6 md:p-9">
                <div className="flex items-center justify-between border-b border-line pb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                  <span>{PRICING.receiveTitle}</span>
                  <span>{PRICING.receiveCol}</span>
                </div>
                <ul>
                  {rows.map((row) => (
                    <li key={row.label} className="lp-price-row flex items-start justify-between gap-4 py-3">
                      <span className="flex items-start gap-3 text-[15px] text-ink">
                        <span className="lp-icon-chip lp-icon-chip--sm lp-icon--red mt-px">
                          <Icon icon={Tick02Icon} size={15} strokeWidth={2.4} />
                        </span>
                        <span>
                          {row.bonus ? <span className="font-bold text-secondary">Bonus : </span> : null}
                          {row.label}
                        </span>
                      </span>
                      <span className="lp-strike mt-0.5 whitespace-nowrap text-[14.5px]">{fcfa(row.value)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-center justify-between border-t-2 border-line pt-4">
                  <span className="text-[16px] font-bold text-ink">{PRICING.totalValueLabel}</span>
                  <span className="lp-strike text-[20px] font-bold">{fcfa(totalValue)}</span>
                </div>
              </div>

              {/* Prix */}
              <div className="lp-price-panel__side flex flex-col justify-start border-t border-line p-6 md:p-9 lg:border-l lg:border-t-0">
                <p className="text-[15px] text-ink-soft">
                  {PRICING.totalValueLabel} : <span className="lp-strike font-bold">{fcfa(totalValue)}</span>
                </p>
                <p className="mt-3 text-[15px] text-ink-soft">{PRICING.youPayLabel}</p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[60px] font-bold leading-none tracking-[-0.05em] text-ink md:text-[76px]">
                    {PRICING.amount}
                  </span>
                  <span className="text-2xl font-semibold text-ink md:text-3xl">{PRICING.currency}</span>
                </p>
                <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-[14px] font-bold text-surface">
                  {PRICING.saveLabel} {fcfa(totalValue - PRICE_VALUE)}
                </p>

                <div className="mt-7">
                  <CTAButton label={CTA.pricing} pulse className="pb-ai-button--stack w-full" />
                </div>
                <p className="mt-3 text-center text-[13.5px] text-ink-soft">{PRICING.payNote}</p>

                <ul className="mt-6 space-y-3 rounded-[18px] border border-line p-4">
                  {PRICING.notes.map((note) => (
                    <li key={note.text} className="flex items-start gap-3 text-[14px] text-ink-soft">
                      <span className="lp-icon-chip lp-icon-chip--sm lp-icon--red">
                        <Icon icon={note.icon} size={14} strokeWidth={1.9} />
                      </span>
                      {note.text}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </TiltOnScroll>

          <Reveal y={20} className="mt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {PRICING.trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                  <span className="lp-icon-chip lp-icon-chip--sm lp-icon--red">
                    <Icon icon={Tick02Icon} size={14} strokeWidth={2.4} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
