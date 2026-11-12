"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ZOOM } from "@/lib/landing/content.v2";

function FloatCard({ card, index, progress }: { card: (typeof ZOOM.cards)[number]; index: number; progress: MotionValue<number> }) {
  const start = 0.3 + index * 0.08;
  const x = useTransform(progress, [start, start + 0.14], [90, 0]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  return (
    <motion.div className="v2-zoom__card" style={{ x, opacity, rotate: index % 2 ? 1.5 : -1.5 }}>
      <span>{card.label}</span>
      <p>{card.value}</p>
    </motion.div>
  );
}

/**
 * LE PROBLÈME — zoom au défilement (façon ghostdesignco) : un écran sombre grandit
 * jusqu'à remplir la page en bleu, puis le texte et les « objections » apparaissent.
 */
export function ZoomReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.38], [0.78, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.38], [40, 28]);
  const border = useTransform(scrollYProgress, [0, 0.3], [12, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.14, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.14, 0.3], [40, 0]);

  return (
    <section ref={ref} className="v2-zoom" aria-labelledby="zoom-title">
      <div className="v2-zoom__sticky">
        <motion.div
          className="v2-zoom__screen"
          style={reduced ? undefined : { scale, borderRadius: radius, borderWidth: border }}
        >
          <motion.div className="v2-zoom__text" style={reduced ? undefined : { opacity: textOpacity, y: textY }}>
            <h2 id="zoom-title" className="v2-title v2-title--light">
              {ZOOM.line1}
              <br />
              <span className="v2-zoom__muted">{ZOOM.line2}</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-[16px] text-surface/80 md:text-[18px]">{ZOOM.text}</p>
          </motion.div>
          <div className="v2-zoom__cards">
            {ZOOM.cards.map((c, i) =>
              reduced ? (
                <div key={c.label} className="v2-zoom__card">
                  <span>{c.label}</span>
                  <p>{c.value}</p>
                </div>
              ) : (
                <FloatCard key={c.label} card={c} index={i} progress={scrollYProgress} />
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
