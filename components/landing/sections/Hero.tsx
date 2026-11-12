import Image from "next/image";
import { CTA, HERO, photos } from "@/lib/landing/content.fr";
import { VSL_POSTER, VSL_SRC } from "@/lib/landing/config";
import { TOTAL_VALUE } from "@/lib/landing/pricing";
import { cn } from "@/lib/utils";
import { CTAButton } from "../primitives/CTAButton";
import { DotGrid } from "../primitives/DotGrid";
import { HeroIn } from "../primitives/Reveal";
import { RotatingText } from "../primitives/ScrollEffects";
import { Container } from "../primitives/SectionHead";
import { VSLPlayer } from "../primitives/VSLPlayer";

/**
 * SECTION 1 — HERO (fusion de notre Hero et de celui de motion.ghostdesignco.com)
 * - Gardé : panneau bleu uni, grille de points interactive, cadre de sélection + curseur
 *   « Vous », mot rotatif, ordre titre → description → vidéo → bouton.
 * - Emprunté : étiquettes inclinées qui flottent autour du titre, titre en deux tons,
 *   quadrillage discret, vidéo dans un cadre d'écran devant un mur de photos qui défile,
 *   bouton en deux parties (réservation | prix + valeur barrée).
 */

type HeroPhoto = (typeof photos)[number];

function HeroPhotoRow({ items, reverse }: { items: HeroPhoto[]; reverse?: boolean }) {
  return (
    <div className={cn("lp-marquee", reverse && "lp-marquee--reverse")} style={{ "--marquee-duration": "55s" } as React.CSSProperties}>
      {[0, 1].map((copy) => (
        <div key={copy} className="lp-marquee__track">
          {items.map((p, i) => (
            <span key={`${copy}-${i}`} className="lp-hero-photo">
              <Image src={p.src} alt="" fill sizes="190px" className="object-cover" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Deux lignes de photos de nos séances qui défilent derrière l'écran de la vidéo. */
function HeroPhotoRows() {
  if (photos.length === 0) return null;
  const rowA = [...photos, ...photos];
  const shift = Math.floor(photos.length / 2);
  const rotated = [...photos.slice(shift), ...photos.slice(0, shift)];
  const rowB = [...rotated, ...rotated];
  return (
    <div className="lp-hero-photos" aria-hidden="true">
      <HeroPhotoRow items={rowA} />
      <HeroPhotoRow items={rowB} reverse />
    </div>
  );
}

export function Hero() {
  const anchor = TOTAL_VALUE.toLocaleString("fr-FR").replace(/\s/g, " ");

  return (
    <section id="top" aria-labelledby="hero-title" className="lp-hero relative isolate pb-14 pt-[104px] md:pb-20 md:pt-[128px]">
      {/* Panneau bleu uni + quadrillage discret + grille de points interactive */}
      <div className="lp-hero-panel lp-hero-panel--grid" aria-hidden="true">
        <DotGrid baseVar="--color-surface" activeVar="--color-surface" />
      </div>

      <Container className="flex flex-col items-center text-center">
        {/* 1. Titre en deux tons, entouré d'étiquettes flottantes */}
        <div className="lp-hero-title relative w-full max-w-[1040px]">
          <ul className="lp-hero-tags" aria-label="Points clés de la formation">
            {HERO.tags.map((tag, i) => (
              <li key={tag.label} className={cn("lp-hero-tag", `lp-hero-tag--${tag.pos}`)}>
                <HeroIn as="span" delay={0.55 + i * 0.12} className="block">
                  <span className={cn("lp-hero-tag__pill", tag.tone === "red" && "is-red")}>{tag.label}</span>
                </HeroIn>
              </li>
            ))}
          </ul>

          <h1 id="hero-title" className="lp-h1 lp-h1--hero lp-h1--ghost relative z-10 text-surface">
            <HeroIn as="span" delay={0.1} className="block">
              {HERO.titleLine1}
            </HeroIn>
            <HeroIn as="span" delay={0.3} className="lp-hero-accent lp-hero-accent--ghost mt-1 block">
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
        </div>

        {/* 2. Description */}
        <HeroIn
          delay={0.45}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[clamp(17px,2.1vw,22px)] text-surface/90 max-[400px]:gap-x-1.5 md:mt-7"
        >
          <span>{HERO.rotatingPrefix}</span>
          <RotatingText words={HERO.rotatingWords} />
          <span>{HERO.rotatingSuffix}</span>
        </HeroIn>
        <HeroIn delay={0.55}>
          <p className="mx-auto mt-2.5 max-w-[720px] text-[16px] text-surface/75 md:text-[18px]">{HERO.description}</p>
        </HeroIn>
      </Container>

      {/* 3. Vidéo dans un cadre d'écran, devant le mur de photos qui défile */}
      <HeroIn delay={0.7} className="lp-hero-stage relative mt-9 md:mt-12">
        <HeroPhotoRows />
        <Container className="relative z-10 flex justify-center">
          <div className="lp-device w-full max-w-[760px]">
            <span className="lp-device__cam" aria-hidden="true" />
            <VSLPlayer src={VSL_SRC} poster={VSL_POSTER} title={HERO.vslLabel} kicker="IA PRO 2026 · Présentation" />
          </div>
        </Container>
      </HeroIn>

      {/* 4. Bouton en deux parties : réservation | prix + valeur barrée */}
      <Container className="flex flex-col items-center text-center">
        <HeroIn delay={0.85} className="mt-9 flex w-full justify-center md:mt-11">
          <CTAButton label={CTA.hero} pulse anchor={anchor} className="pb-ai-button--split" />
        </HeroIn>
        <HeroIn delay={0.95}>
          <p className="mt-4 text-[14px] text-surface/70 md:text-[15px]">{HERO.ctaNote}</p>
        </HeroIn>
      </Container>
    </section>
  );
}
