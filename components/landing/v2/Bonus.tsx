"use client";

import { motion, useReducedMotion } from "motion/react";
import { GiftIcon } from "@hugeicons/core-free-icons";
import { CTA } from "@/lib/landing/content.fr";
import { BONUS2 } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { fcfa } from "@/lib/landing/pricing";
import { cn } from "@/lib/utils";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { BonusMockup } from "./BonusMockup";
import { Title } from "./Title";

/**
 * BONUS — une rangée par bonus, en alternance gauche / droite :
 * texte (titre, valeur barrée, « offert ») d'un côté, maquette produit de l'autre.
 * Puis le récapitulatif de la valeur offerte et le bouton.
 */
export function Bonus() {
  const reduced = useReducedMotion();
  const total = BONUS2.items.reduce((s, b) => s + b.value, 0);

  return (
    <section id="bonus" className="v2-section scroll-mt-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <span className="v2-tst__mark v2-bonus__mark" aria-hidden="true">
            <Icon icon={GiftIcon} size={24} strokeWidth={2} />
          </span>
          <Title line1={BONUS2.line1} line2={BONUS2.line2} className="mt-5 text-center" />
        </div>

        <ol className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {BONUS2.items.map((b, i) => (
            <li key={b.title} className={cn("v2-bonus__row", i % 2 === 1 && "is-flip")}>
              <Reveal y={30} className="v2-bonus__text">
                <p className={cn("v2-kicker", b.cover.tone === "red" && "is-red")}>Bonus {i + 1}</p>
                <h3 className="v2-bonus__title">{b.title}</h3>
                <p className="v2-bonus__value">
                  <s>
                    Valeur : {fcfa(b.value)}
                  </s>
                  <span className="v2-bonus__free">{BONUS2.free}</span>
                </p>
                <p className="v2-bonus__desc">{b.text}</p>
              </Reveal>

              <motion.div
                className="v2-bonus__visual"
                initial={reduced ? false : { opacity: 0, y: 50, scale: 0.92, rotate: i % 2 === 1 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
              >
                <BonusMockup cover={b.cover.text} kicker={`Bonus ${i + 1}`} tone={b.cover.tone} images={BONUS2.mocks[i]} className="v2-mock--float" />
              </motion.div>
            </li>
          ))}
        </ol>

        {/* Récapitulatif + bouton */}
        <Reveal y={30} className="mt-20 md:mt-28">
          <div className="v2-bonus__recap">
            <div className="v2-bonus__stack" aria-hidden="true">
              {BONUS2.items.map((b, i) => (
                <BonusMockup key={b.title} cover={b.cover.text} kicker={`Bonus ${i + 1}`} tone={b.cover.tone} images={BONUS2.mocks[i]} small className={cn("v2-mock--mini", `v2-mock--pos${i}`)} />
              ))}
            </div>
            <p className="v2-bonus__recap-label">Valeur totale des 3 bonus</p>
            <p className="v2-bonus__recap-total">
              <s>{fcfa(total)}</s>
              <span>{BONUS2.free}</span>
            </p>
            <p className="v2-bonus__recap-note">Réservés aux 10 premiers inscrits, en plus de la formation.</p>
            <div className="mt-7 flex justify-center">
              <CTAButton label={CTA.hero} sub="Inscription sur WhatsApp · bonus pour les 10 premiers" showPrice={false} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
