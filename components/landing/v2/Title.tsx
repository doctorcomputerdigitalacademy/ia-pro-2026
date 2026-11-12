"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/landing/highlight";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_OUT } },
};

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className={cn("inline-block whitespace-pre", className)}>
          {w}{" "}
        </motion.span>
      ))}
    </>
  );
}

/**
 * Titre en deux tons (façon ghostdesignco) : 1re phrase foncée, 2e atténuée.
 * Les mots apparaissent un à un (montée + défloutage) à l'entrée dans l'écran.
 */
export function Title({
  line1,
  line2,
  as = "h2",
  className,
  muted = "text-v2-muted",
  after,
  breakLine = true,
}: {
  line1: string;
  line2?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  muted?: string;
  after?: ReactNode;
  breakLine?: boolean;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn("v2-title", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      <Words text={line1} />
      {line2 ? (
        <>
          {breakLine ? <br /> : null}
          <Words text={line2} className={muted} />
        </>
      ) : null}
      {after}
    </Tag>
  );
}
