import Image from "next/image";
import { CTA } from "@/lib/landing/content.fr";
import { HERO2 } from "@/lib/landing/content.v2";
import { VSL_POSTER, VSL_SRC } from "@/lib/landing/config";
import { ArrowDown01Icon, Location01Icon, PlayIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { HeroIn } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { VSLPlayer } from "../primitives/VSLPlayer";
import { GateHint, Gated } from "../primitives/VideoGate";

/** Branche de laurier (carte « 3 jours ») */
function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 40 80" className="v2-laurel" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
      <path d="M30 76 C 10 62, 6 34, 18 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {[
        [21, 66, -50],
        [14, 55, -30],
        [11, 43, -14],
        [11, 31, 4],
        [14, 19, 22],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="3.4" ry="7.5" transform={`rotate(${r} ${x} ${y}) translate(-5 0)`} fill="currentColor" />
          <ellipse cx={x} cy={y} rx="3.4" ry="7.5" transform={`rotate(${r + 70} ${x} ${y}) translate(5 -2)`} fill="currentColor" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/**
 * HERO — inspiré de notion-secrets.com :
 * à gauche le titre, 3 bénéfices cochés et le bouton ; à droite la vidéo.
 * Dessous, 3 cartes de preuve (faits uniquement). Sur mobile : titre, bénéfices, vidéo, bouton.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="v2-hero relative isolate pt-[118px] md:pt-[150px]">
      <div className="v2-hero__bg" aria-hidden="true" />

      <Container>
        <div className="v2-hero2">
          {/* Texte */}
          <div className="v2-hero2__copy">
            <HeroIn delay={0}>
              <span className="v2-badge">
                <Icon icon={Location01Icon} size={16} strokeWidth={2} />
                {HERO2.badge}
              </span>
            </HeroIn>

            <h1 id="hero-title" className="v2-title v2-title--hero2 mt-6">
              <HeroIn as="span" delay={0.05} className="block">
                {HERO2.line1}
              </HeroIn>
              <HeroIn as="span" delay={0.25} className="block text-v2-muted">
                <span className="whitespace-nowrap">{HERO2.line2Before}</span>{" "}
                <span className="lp-select whitespace-nowrap text-primary">
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

            <ul className="v2-checks mt-7">
              {HERO2.checks.map((c, i) => (
                <HeroIn as="li" key={c} delay={0.4 + i * 0.08} className="v2-checks__item">
                  <span className="v2-checks__ico" aria-hidden="true">
                    <Icon icon={Tick02Icon} size={13} strokeWidth={2.8} />
                  </span>
                  {c}
                </HeroIn>
              ))}
            </ul>

            <HeroIn delay={0.65} className="mt-9 hidden lg:block">
              <Gated>
                <CTAButton label={CTA.hero} sub="Inscription sur WhatsApp · 20 places par cohorte" showPrice={false} />
              </Gated>
            </HeroIn>

            <HeroIn delay={0.75} className="mt-8">
              <p className="v2-targets v2-targets--left">
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
          </div>

          {/* Vidéo */}
          <HeroIn delay={0.5} className="v2-hero2__media">
            <p className="v2-watch">
              <span className="v2-watch__dot" aria-hidden="true">
                <Icon icon={PlayIcon} size={14} strokeWidth={2.4} />
              </span>
              {HERO2.watch}
              <Icon icon={ArrowDown01Icon} size={16} strokeWidth={2.2} className="v2-watch__arrow" />
            </p>
            <div className="lp-device mt-4 w-full">
              <span className="lp-device__cam" aria-hidden="true" />
              <VSLPlayer src={VSL_SRC} poster={VSL_POSTER} title={HERO2.vslTitle} kicker="IA PRO 2026 · Présentation" />
            </div>
            <GateHint />
            <Gated className="lg:hidden">
              <div className="mt-8 flex justify-center">
                <CTAButton label={CTA.hero} sub="Inscription sur WhatsApp · 20 places par cohorte" showPrice={false} />
              </div>
            </Gated>
          </HeroIn>
        </div>

        {/* Cartes de preuve */}
        <ul className="v2-proofcards">
          {HERO2.cards.map((c, i) => (
            <HeroIn as="li" key={c.big} delay={0.85 + i * 0.1} className="v2-proofcard">
              {i === 0 ? (
                <>
                  <Laurel />
                  <Laurel flip />
                </>
              ) : null}
              {i === 1 ? (
                <div className="v2-proofcard__faces lp-marquee" aria-hidden="true">
                  {[0, 1].map((k) => (
                    <div key={k} className="lp-marquee__track">
                      {HERO2.targets.concat(HERO2.targets).map((t, j) => (
                        <span key={`${k}-${j}`} className="v2-proofcard__face">
                          <Image src={t.photo} alt="" fill sizes="44px" className="object-cover" />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
              {i === 2 ? (
                <svg viewBox="0 0 120 60" className="v2-proofcard__arrow" aria-hidden="true">
                  <path d="M4 44 C 40 44, 52 16, 104 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M92 6 L106 16 L92 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
              <p className="v2-proofcard__text">
                <span className="v2-proofcard__big">{c.big}</span>
                <span className={i === 1 ? "v2-proofcard__accent is-red" : "v2-proofcard__accent"}>{c.accent}</span>
                <span className="v2-proofcard__small">{c.small}</span>
              </p>
            </HeroIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
