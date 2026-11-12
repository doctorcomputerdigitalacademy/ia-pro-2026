"use client";

import { motion } from "motion/react";
import { TOOLS } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Container } from "../primitives/SectionHead";

/**
 * LES OUTILS — typographie géante, une ligne par outil, avec une étiquette
 * inclinée qui vient se coller en fin de mot (façon ghostdesignco).
 */
export function Tools() {
  return (
    <section className="v2-section overflow-hidden">
      <Container>
        <p className="v2-kicker">{TOOLS.line1}</p>
        <ul className="mt-6" aria-label={TOOLS.line1}>
          {TOOLS.words.map((w, i) => (
            <motion.li
              key={w.word}
              className="v2-tool"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <span className="v2-tool__word">{w.word}</span>
              <motion.span
                className={cn("v2-tool__tag", i % 3 === 1 && "is-red")}
                initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 6 : -5 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.35 }}
              >
                {w.tag}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
