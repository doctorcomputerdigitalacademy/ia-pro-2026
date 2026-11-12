"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BONUS2 } from "@/lib/landing/content.v2";
import { fcfa } from "@/lib/landing/pricing";
import { cn } from "@/lib/utils";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const FAN = [
  { rotate: -5, x: 0, y: 22 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 5, x: 0, y: 22 },
];

/** BONUS — 3 cartes empilées qui s'ouvrent en éventail à l'arrivée (façon ghostdesignco). */
export function BonusFan() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();

  return (
    <section id="bonus" className="v2-section scroll-mt-24">
      <Container>
        <Title line1={BONUS2.line1} line2={BONUS2.line2} className="text-center" />
        <div ref={ref} className="v2-fan mt-12">
          {BONUS2.items.map((b, i) => {
            const f = FAN[i % FAN.length];
            return (
              <motion.article
                key={b.title}
                className="v2-fan__card"
                initial={reduced ? false : { rotate: 0, x: (1 - i) * 260, y: 40, opacity: 0 }}
                animate={inView || reduced ? { rotate: f.rotate, x: f.x, y: f.y, opacity: 1 } : undefined}
                whileHover={{ rotate: 0, y: -14, zIndex: 5 }}
                transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.08 }}
              >
                <div className={cn("v2-poster v2-poster--fan", `v2-poster--${b.cover.tone}`)}>
                  <span className="v2-poster__kicker">Bonus {i + 1}</span>
                  <span className="v2-poster__big">{b.cover.text}</span>
                  <span className="v2-poster__brand">
                    <Image src="/brand/mark.png" alt="" width={24} height={24} className="h-auto w-6" />
                    IA PRO 2026
                  </span>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-[18px] font-bold leading-snug text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-[14.5px] text-ink-soft">{b.text}</p>
                  <p className="mt-4 text-[14px] font-semibold">
                    <s className="lp-strike">
                      {BONUS2.normal} : {fcfa(b.value)}
                    </s>
                  </p>
                  <p className="mt-1 text-[16px] font-extrabold tracking-wide text-primary">{BONUS2.free}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
