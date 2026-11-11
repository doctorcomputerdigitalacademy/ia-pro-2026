"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_POWER4, parseHighlight, plainText, toneClass } from "@/lib/landing/highlight";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.018 } },
};

const char: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -70 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: EASE_POWER4 } },
};

type SplitTitleProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Titre animé lettre par lettre (comme la référence : y 60, rotateX -70°, stagger 18 ms).
 * Les mots restent insécables ; le texte complet est lu par les lecteurs d'écran.
 */
export function SplitTitle({ text, as = "h2", className }: SplitTitleProps) {
  const Tag = as;
  const segments = parseHighlight(text);

  return (
    <Tag className={cn("lp-split-parent", className)}>
      <span className="sr-only">{plainText(text)}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {segments.map((segment, s) =>
          segment.text.split(/(\s+)/).map((word, w) =>
            /^\s+$/.test(word) || word === "" ? (
              word ? " " : null
            ) : (
              <span key={`${s}-${w}`} className={cn("inline-block whitespace-nowrap", toneClass[segment.tone])}>
                {Array.from(word).map((c, i) => (
                  <motion.span key={i} className="lp-split-char" variants={char}>
                    {c}
                  </motion.span>
                ))}
              </span>
            ),
          ),
        )}
      </motion.span>
    </Tag>
  );
}
