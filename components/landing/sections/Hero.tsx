import { Location01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { CTA, HERO } from "@/lib/landing/content.fr";
import { VSL_POSTER, VSL_SRC } from "@/lib/landing/config";
import { CTAButton } from "../primitives/CTAButton";
import { DotGrid } from "../primitives/DotGrid";
import { Icon } from "../primitives/Icon";
import { HeroIn } from "../primitives/Reveal";
import { RotatingText } from "../primitives/ScrollEffects";
import { Container } from "../primitives/SectionHead";
import { VSLPlayer } from "../primitives/VSLPlayer";

/**
 * SECTION 1 — HERO. Ordre imposé : titre → description → VSL → appel à l'action.
 * Espacements resserrés pour que la vidéo soit visible dès l'arrivée sur la page.
 * Fond : grille de points interactive qui réagit au curseur / au doigt.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="lp-hero relative isolate pb-14 pt-[104px] md:pb-20 md:pt-[124px]">
      {/* Panneau bleu uni (façon oskool), avec la grille de points interactive */}
      <div className="lp-hero-panel" aria-hidden="true">
        <DotGrid baseVar="--color-surface" activeVar="--color-surface" />
      </div>

      <Container className="flex flex-col items-center text-center">
        <HeroIn delay={0}>
          <span className="lp-badge lp-badge--glass">
            <span className="lp-dot" aria-hidden="true" />
            <span className="uppercase">{HERO.badge}</span>
          </span>
        </HeroIn>

        {/* 1. Titre */}
        <h1 id="hero-title" className="lp-h1 lp-h1--hero relative z-10 mt-5 max-w-[1000px] text-surface md:mt-6">
          <HeroIn as="span" delay={0.1} className="block">
            {HERO.titleLine1}
          </HeroIn>
          <HeroIn as="span" delay={0.3} className="lp-hero-accent mt-1 block">
            {HERO.titleLine2Before}{" "}
            <span className="lp-select">
              {HERO.titleHighlight}
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
                <span>{HERO.cursorLabel}</span>
              </span>
            </span>
          </HeroIn>
        </h1>

        {/* 2. Description (2 lignes maximum sur tablette et ordinateur) */}
        <HeroIn
          delay={0.45}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 md:mt-4 gap-y-1 text-[clamp(17px,2.1vw,22px)] text-surface/90 max-[400px]:gap-x-1.5"
        >
          <span>{HERO.rotatingPrefix}</span>
          <RotatingText words={HERO.rotatingWords} />
          <span>{HERO.rotatingSuffix}</span>
        </HeroIn>

        <HeroIn delay={0.55}>
          <p className="mx-auto mt-2.5 max-w-[760px] text-[16px] text-surface/80 md:text-[18px]">{HERO.description}</p>
        </HeroIn>

        {/* 3. VSL */}
        <HeroIn delay={0.7} className="mt-7 w-full max-w-[780px]">
          <VSLPlayer src={VSL_SRC} poster={VSL_POSTER} title={HERO.vslLabel} kicker="IA PRO 2026 · Présentation" />
        </HeroIn>

        {/* 4. Appel à l'action */}
        <HeroIn delay={0.85} className="mt-8 flex w-full justify-center md:mt-10">
          <CTAButton label={CTA.hero} pulse />
        </HeroIn>

        <HeroIn delay={0.95} className="mt-6 flex flex-col items-center gap-3 text-[15px] text-surface/85 sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2.5 text-left">
            <span className="lp-icon-chip lp-icon-chip--sm">
              <Icon icon={Location01Icon} size={15} strokeWidth={1.9} />
            </span>
            {HERO.notes[0]}
          </span>
          <span className="inline-flex items-center gap-2.5 text-left font-medium text-surface">
            <span className="lp-icon-chip lp-icon-chip--sm">
              <Icon icon={UserGroupIcon} size={15} strokeWidth={1.9} />
            </span>
            {HERO.notes[1]}
          </span>
        </HeroIn>
      </Container>
    </section>
  );
}
