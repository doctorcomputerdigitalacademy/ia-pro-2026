import { Calendar03Icon, Clock01Icon, Location01Icon, Tick02Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { CTA, PRICING } from "@/lib/landing/content.fr";
import { PRICE2 } from "@/lib/landing/content.v2";
import { TOTAL_VALUE, fcfa } from "@/lib/landing/pricing";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";

/**
 * PRIX — carte blanche avec l'étiquette « Prix de lancement » suspendue qui se balance
 * (façon ghostdesignco), et à côté la carte sombre « Quand et où ? » (cohortes, lieu).
 */
export function Price() {
  return (
    <section id="tarif" className="v2-section scroll-mt-24">
      <Container>
        <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal y={40}>
            <div className="v2-price">
              <div className="v2-hang" aria-hidden="true">
                <svg className="v2-hang__string" viewBox="0 0 120 50">
                  <path d="M60 2 L 18 48 M60 2 L 102 48" />
                </svg>
                <span className="v2-hang__tag">{PRICE2.tag}</span>
              </div>

              <p className="v2-kicker">{PRICE2.title}</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3">
                <span className="v2-price__amount">{PRICING.amount}</span>
                <span className="text-[26px] font-semibold text-ink">{PRICING.currency}</span>
              </p>
              <p className="mt-1 text-[15px] text-ink-soft">
                {PRICE2.valueLabel} : <s className="lp-strike font-bold">{fcfa(TOTAL_VALUE)}</s>
              </p>

              <ul className="mt-6 space-y-2.5">
                {PRICE2.includes.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15.5px] text-ink">
                    <span className="v2-ba__ico v2-ba__ico--blue">
                      <Icon icon={Tick02Icon} size={13} strokeWidth={2.6} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CTAButton label={CTA.pricing} sub="Réservez votre place sur WhatsApp" showPrice={false} className="w-full" />
              </div>
              <p className="mt-3 text-center text-[13.5px] text-ink-soft">{PRICE2.payNote}</p>
            </div>
          </Reveal>

          <Reveal y={40} delay={0.12}>
            <div id="horaires" className="v2-when scroll-mt-28">
              <h3 className="v2-title v2-title--md v2-title--light">{PRICE2.whenTitle}</h3>
              <dl className="mt-6 space-y-3">
                <div className="v2-when__row">
                  <dt>
                    <Icon icon={Calendar03Icon} size={18} />
                  </dt>
                  <dd>
                    {PRICE2.formulas.map((f) => (
                      <span key={f} className="block">
                        {f}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="v2-when__row">
                  <dt>
                    <Icon icon={Clock01Icon} size={18} />
                  </dt>
                  <dd>
                    {PRICE2.hours.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="v2-when__row">
                  <dt>
                    <Icon icon={Location01Icon} size={18} />
                  </dt>
                  <dd>{PRICE2.place}</dd>
                </div>
                <div className="v2-when__row">
                  <dt>
                    <Icon icon={UserGroupIcon} size={18} />
                  </dt>
                  <dd>{PRICE2.seats}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
