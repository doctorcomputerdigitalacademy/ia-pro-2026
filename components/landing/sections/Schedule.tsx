import { Alert02Icon, Calendar03Icon, Clock01Icon, Location01Icon, Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { CTA, SCHEDULE } from "@/lib/landing/content.fr";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/** SECTION 11 — CHOISISSEZ VOTRE HORAIRE */
export function Schedule() {
  return (
    <section id="horaires" className="lp-section scroll-mt-24">
      <Container narrow>
        <SectionHead eyebrow={SCHEDULE.eyebrow} title={SCHEDULE.title} text={SCHEDULE.text} />

        {/* 4 cohortes, regroupées par formule (lundi–mercredi / jeudi–samedi) */}
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from(new Set(SCHEDULE.cohorts.map((c) => c.days))).map((days, g) => (
            <Reveal key={days} delay={g * 0.12}>
              <div className="h-full rounded-[28px] border border-line bg-surface/60 p-3 md:p-4">
                <p className="flex items-center gap-2.5 px-2 pb-3 pt-1 text-[15px] font-semibold text-ink">
                  <span className="lp-icon-chip lp-icon-chip--sm">
                    <Icon icon={Calendar03Icon} size={15} strokeWidth={1.9} />
                  </span>
                  {days}
                </p>
                <div className="grid gap-3">
                  {SCHEDULE.cohorts
                    .filter((c) => c.days === days)
                    .map((cohort, i) => {
                      const evening = cohort.variant === "evening";
                      return (
                        <article key={i} className="lp-card lp-card--hover p-5 md:p-6">
                          <div className="flex items-center gap-4">
                            <span className="lp-icon-tile">
                              <Icon icon={evening ? Moon02Icon : Sun01Icon} />
                            </span>
                            <div>
                              <h3 className="lp-h3 text-[19px] md:text-[21px]">{cohort.name}</h3>
                              <p className="mt-0.5 flex items-center gap-2 whitespace-nowrap text-[20px] font-bold tracking-[-0.04em] text-ink sm:text-[24px] md:text-[27px]">
                                <Icon icon={Clock01Icon} size={18} strokeWidth={2} className="text-primary" />
                                {cohort.hours}
                              </p>
                            </div>
                          </div>
                          <p className="mt-3 text-[15px] text-ink-soft">{cohort.text}</p>
                        </article>
                      );
                    })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal y={24} className="mt-4">
          <div className="lp-card flex items-start gap-4 p-6 md:items-center md:gap-5 md:p-8">
            <span className="lp-icon-tile">
              <Icon icon={Location01Icon} />
            </span>
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-primary">{SCHEDULE.locationTitle}</h3>
              <p className="mt-1 text-[15.5px] text-ink-soft">{SCHEDULE.locationMode}</p>
              <p className="text-[17px] font-medium text-ink md:text-lg">{SCHEDULE.location}</p>
            </div>
          </div>
        </Reveal>

        <Reveal y={24} className="mt-4">
          <div role="note" className="lp-attention flex items-start gap-4 rounded-[20px] border border-secondary-line bg-secondary-soft p-6 md:gap-5 md:p-8">
            <span className="lp-icon-tile lp-icon-tile--secondary">
              <Icon icon={Alert02Icon} />
            </span>
            <div>
              <h3 className="flex items-center gap-2.5 text-[15px] font-semibold uppercase tracking-[0.12em] text-secondary">
                <span className="lp-dot" aria-hidden="true" />
                {SCHEDULE.alertTitle}
              </h3>
              <p className="mt-2 text-[17px] font-medium text-ink">{SCHEDULE.alertLines[0]}</p>
              <p className="mt-1 text-[15.5px] text-ink-soft">{SCHEDULE.alertLines[1]}</p>
              <p className="mt-1 text-[15.5px] font-medium text-ink">{SCHEDULE.alertLines[2]}</p>
            </div>
          </div>
        </Reveal>

        <Reveal y={24} className="mt-10 flex justify-center">
          <CTAButton label={CTA.schedule} pulse />
        </Reveal>
      </Container>
    </section>
  );
}
