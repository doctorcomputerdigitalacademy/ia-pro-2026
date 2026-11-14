"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/landing/highlight";

const TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  p: motion.p,
  span: motion.span,
  section: motion.section,
} as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Décalage vertical de départ (référence : 48px) */
  y?: number;
  className?: string;
  as?: keyof typeof TAGS;
  amount?: number;
};

/**
 * Révélation au scroll, identique à la référence :
 * opacité 0→1, y→0, flou 14px→0, scale .97→1, easing expo-out, une seule fois.
 */
export function Reveal({ children, delay = 0, y = 48, className, as = "div", amount = 0.2 }: RevealProps) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(14px)", scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/** Apparition au chargement (Hero), séquencée par `delay`. */
export function HeroIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const Tag = as === "span" ? motion.span : as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}
