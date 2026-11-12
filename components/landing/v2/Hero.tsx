import Image from "next/image";
import { CTA } from "@/lib/landing/content.fr";
import { HERO2 } from "@/lib/landing/content.v2";
import { VSL_POSTER, VSL_SRC } from "@/lib/landing/config";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { HeroIn } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { VSLPlayer } from "../primitives/VSLPlayer";

/**
 * HERO (façon ghostdesignco) : fond uni clair, étiquettes inclinées qui flottent,
 * accroche simple en deux tons, les profils visés, le bouton en deux parties,
 * puis la vidéo dans un cadre d'écran.
 */
export function Hero() {

  return (
    <section id="top" aria-labelledby="hero-title" className="v2-hero relative isolate pt-[128px] md:pt-[184px]">
      <div className="v2-hero__bg" aria-hidden="true" />

      <Container className="flex flex-col items-center text-center">
        <HeroIn delay={0}>
          <span className="v2-badge">
            <Icon icon={Location01Icon} size={16} strokeWidth={2} />
            {HERO2.badge}
          </span>
        </HeroIn>

        <div className="relative mt-7 w-full max-w-[1000px]">

          <h1 id="hero-title" className="v2-title v2-title--hero">
            <HeroIn as="span" delay={0.05} className="block">
              {HERO2.line1}
            </HeroIn>
            <HeroIn as="span" delay={0.25} className="block text-v2-muted">
              {HERO2.line2Before}{" "}
              <span className="lp-select text-primary">
                {HERO2.highlight}
                <span className="lp-select__box" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="lp-select__cursor" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 1l5.2 13.5 2.1-5.3 5.3-2.1L1 1z" />
                  </svg>
                  <span>{HERO2.cursor}</span>
                </span>
              </span>
            </HeroIn>
          </h1>
        </div>

        <HeroIn delay={0.45}>
          <p className="mx-auto mt-8 max-w-[560px] text-[16.5px] text-ink-soft md:text-[18px]">{HERO2.sub}</p>
        </HeroIn>

        <HeroIn delay={0.55} className="mt-8">
          <p className="v2-targets">
            <span className="v2-targets__faces" aria-hidden="true">
              {HERO2.targets.map((t) => (
                <span key={t.label} className="v2-targets__face">
                  <Image src={t.photo} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </span>
            <span>
              {HERO2.targetsLead}{" "}
              {HERO2.targets.map((t, i) => (
                <span key={t.label}>
                  <b>{t.label}</b>
                  {i < HERO2.targets.length - 2 ? ", " : i === HERO2.targets.length - 2 ? " et " : "."}
                </span>
              ))}
            </span>
          </p>
        </HeroIn>

        <HeroIn delay={0.6} className="mt-10 flex w-full justify-center">
          <CTAButton label={CTA.hero} showPrice={false} />
        </HeroIn>
        <HeroIn delay={0.7}>
          <p className="mt-3.5 text-[13.5px] text-ink-soft">{HERO2.note}</p>
        </HeroIn>
      </Container>

      <HeroIn delay={0.8} className="v2-stage relative mt-14 md:mt-20">
        <Container className="relative z-10 flex justify-center">
          <div className="lp-device w-full max-w-[1000px]">
            <span className="lp-device__cam" aria-hidden="true" />
            <VSLPlayer src={VSL_SRC} poster={VSL_POSTER} title={HERO2.vslTitle} kicker="IA PRO 2026 · Présentation" />
          </div>
        </Container>
      </HeroIn>
    </section>
  );
}
