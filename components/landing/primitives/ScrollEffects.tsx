"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

/**
 * prefers-reduced-motion, appliqué seulement après l'hydratation :
 * le premier rendu client reste identique au rendu serveur (pas d'erreur d'hydratation).
 */
function useReducedMotionSafe() {
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return hydrated && !!reduced;
}

/** Racine : respecte prefers-reduced-motion pour toutes les animations motion. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Barre de progression de lecture (2-3px en haut de page, comme la référence). */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="lp-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ mot rotatif */
const wordVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
  exit: { transition: { staggerChildren: 0.012 } },
};
const letterVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { y: "-120%", opacity: 0, transition: { duration: 0.18 } },
};

export function RotatingText({ words, interval = 2200, className }: { words: string[]; interval?: number; className?: string }) {
  const reduced = useReducedMotionSafe();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, interval, words.length]);

  return (
    <span className={cn("lp-rotating", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="inline-flex"
          variants={wordVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {Array.from(words[index]).map((c, i) => (
            <motion.span key={i} className="inline-block" variants={letterVariants}>
              {c}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------- texte révélé mot à mot au scroll */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  return (
    <motion.span className="inline-block" style={{ opacity, filter }}>
      {children}
    </motion.span>
  );
}

/**
 * Manifeste : chaque mot s'éclaire et se défloute au rythme du scroll,
 * le bloc se redresse légèrement (rotation 3° → 0), comme sur la référence.
 */
export function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const rotate = useTransform(scrollYProgress, [0, 0.6], [3, 0]);
  const words = text.split(" ");

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <motion.p ref={ref} className={className} style={{ rotate, transformOrigin: "0% 50%" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 1.5 / words.length);
          return (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>{" "}
            </span>
          );
        })}
      </span>
    </motion.p>
  );
}

/** Carte qui se redresse en perspective en entrant dans l'écran (carte de prix de la référence). */
export function TiltOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const rotateX = useTransform(progress, [0, 1], [14, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { scale, rotateX, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

/** Ligne verticale de timeline qui se dessine au rythme du scroll. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div ref={ref} aria-hidden="true" className={cn("bg-line", className)}>
      <motion.div
        className="size-full origin-top"
        style={{
          scaleY: reduced ? 1 : scaleY,
          background:
            "linear-gradient(180deg, var(--color-primary), color-mix(in srgb, var(--color-primary), var(--color-surface) 45%))",
        }}
      />
    </div>
  );
}

/** Compteur animé (Rare UI AnimatedCounter) qui démarre quand il devient visible. */
export function InViewCounter({
  value,
  suffix,
  prefix,
  className,
  duration = 1.2,
}: {
  value: number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("fr-FR")}
        {suffix}
      </span>
      <AnimatedCounter
        aria-hidden="true"
        value={inView ? value : 0}
        duration={duration}
        separator={" "}
        prefix={prefix}
        suffix={suffix}
      />
    </span>
  );
}
