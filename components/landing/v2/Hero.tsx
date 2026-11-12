import Image from "next/image";
import { CTA, photos } from "@/lib/landing/content.fr";
import { HERO2 } from "@/lib/landing/content.v2";
import { VSL_POSTER, VSL_SRC } from "@/lib/landing/config";
import { TOTAL_VALUE } from "@/lib/landing/pricing";
import { cn } from "@/lib/utils";
import { CTAButton } from "../primitives/CTAButton";
import { DotGrid } from "../primitives/DotGrid";
import { HeroIn } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { VSLPlayer } from "../primitives/VSLPlayer";

type Photo = (typeof photos)[number];

function PhotoRow({ items, reverse }: { items: Photo[]; reverse?: boolean }) {
  return (
    <div className={cn("lp-marquee", reverse && "lp-marquee--reverse")} style={{ "--marquee-duration": "60s" } as React.CSSProperties}>
      {[0, 1].map((copy) => (
        <div key={copy} className="lp-marquee__track">
          {items.map((p, i) => (
            <span key={`${copy}-${i}`} className="v2-hero-photo">
              <Image src={p.src} alt="" fill sizes="230px" className="object-cover" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * HERO (façon ghostdesignco) : fond uni clair, étiquettes inclinées qui flottent,
 * titre en deux tons, bouton en deux parties, puis la vidéo dans un cadre d'écran
 * posé sur deux lignes de photos des séances qui défilent.
 */
export function Hero() {
  const anchor = TOTAL_VALUE.toLocaleString("fr-FR").replace(/\s/g, " ");
  const shift = Math.floor(photos.length / 2);
  const rowA = [...photos, ...photos];
  const rowB = [...photos.slice(shift), ...photos.slice(0, shift), ...photos.slice(shift), ...photos.slice(0, shift)];

  return (
    <section id="top" aria-labelledby="hero-title" className="v2-hero relative isolate pt-[112px] md:pt-[150px]">
      <div className="v2-hero__bg" aria-hidden="true">
        <DotGrid />
      </div>

      <Container className="flex flex-col items-center text-center">
        <div className="relative w-full max-w-[1000px]">
          <ul className="lp-hero-tags v2-tags" aria-label="Points clés">
            {HERO2.tags.map((t, i) => (
              <li key={t.label} className={cn("lp-hero-tag", `lp-hero-tag--${t.pos}`)}>
                <HeroIn as="span" delay={0.5 + i * 0.12} className="block">
                  <span className={cn("lp-hero-tag__pill v2-tag", t.tone === "red" && "is-red")}>{t.label}</span>
                </HeroIn>
              </li>
            ))}
          </ul>

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
          <p className="mx-auto mt-6 max-w-[600px] text-[16.5px] text-ink-soft md:text-[18px]">{HERO2.sub}</p>
        </HeroIn>

        <HeroIn delay={0.6} className="mt-8 flex w-full justify-center">
          <CTAButton label={CTA.hero} pulse anchor={anchor} className="pb-ai-button--split" />
        </HeroIn>
        <HeroIn delay={0.7}>
          <p className="mt-3.5 text-[13.5px] text-ink-soft">{HERO2.note}</p>
        </HeroIn>
      </Container>

      <HeroIn delay={0.8} className="v2-stage relative mt-12 md:mt-16">
        <div className="v2-stage__photos" aria-hidden="true">
          <PhotoRow items={rowA} />
          <PhotoRow items={rowB} reverse />
        </div>
        <Container className="relative z-10 flex justify-center">
          <div className="lp-device w-full max-w-[760px]">
            <span className="lp-device__cam" aria-hidden="true" />
            <VSLPlayer src={VSL_SRC} poster={VSL_POSTER} title={HERO2.vslTitle} kicker="IA PRO 2026 · Présentation" />
          </div>
        </Container>
      </HeroIn>
    </section>
  );
}
