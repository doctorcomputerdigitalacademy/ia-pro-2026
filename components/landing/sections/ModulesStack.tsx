"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { PRO_AI } from "@/lib/landing/content.fr";
import { OfferCard } from "../primitives/OfferCard";

/**
 * Modules en cartes empilées au défilement (animation inspirée de fluxity,
 * « One technology. Built for the long run ») : chaque carte reste collée en haut,
 * la suivante vient la recouvrir et la précédente recule légèrement.
 * Sur mobile, les cartes se suivent simplement (lecture plus confortable).
 */
type Module = (typeof PRO_AI.modules)[number];

function StackItem({ mod, index, total, progress }: { mod: Module; index: number; total: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.04]);
  const dim = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [0, index === total - 1 ? 0 : 0.18]);

  return (
    <li className="lp-stack__item" style={{ "--i": index } as React.CSSProperties}>
      <motion.div className="lp-stack__card" style={reduced ? undefined : { scale }}>
        <OfferCard
          layout="row"
          counter={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          kicker={`Module ${index + 1}`}
          title={mod.title}
          text={`${mod.lead} ${mod.text}`}
          image={mod.image}
          cover={mod.cover}
          footer={PRO_AI.includedLabel}
        />
        <motion.span className="lp-stack__shade" style={{ opacity: reduced ? 0 : dim }} aria-hidden="true" />
      </motion.div>
    </li>
  );
}

export function ModulesStack() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 120px", "end end"] });
  const total = PRO_AI.modules.length;
  return (
    <ol ref={ref} className="lp-stack">
      {PRO_AI.modules.map((mod, i) => (
        <StackItem key={mod.title} mod={mod} index={i} total={total} progress={scrollYProgress} />
      ))}
    </ol>
  );
}
