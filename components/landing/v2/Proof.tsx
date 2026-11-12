"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft01Icon, ArrowRight01Icon, QuoteUpIcon } from "@hugeicons/core-free-icons";
import { photos, testimonials } from "@/lib/landing/content.fr";
import { PROOF } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const DURATION = 6000;
const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .replace(/[^A-Za-zÀ-ÿ]/g, "")
    .slice(0, 2)
    .toUpperCase();

/**
 * ILS SE SONT FORMÉS — à gauche une pile de photos « polaroïd » qui se mélange
 * (la photo du dessus passe derrière) ; à droite un témoignage à la fois,
 * avec barres de progression façon « stories » et flèches.
 */
export function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const t = testimonials[i % n];
  const order = photos.map((_, k) => photos[(i + k) % photos.length]);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), DURATION);
    return () => window.clearTimeout(id);
  }, [i, inView, paused, reduced, n]);

  return (
    <section className="v2-section">
      <Container>
        <Title line1={PROOF.line1} line2={PROOF.line2} className="text-center" />
        <div ref={ref} className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Pile de photos */}
          <Reveal y={30}>
            <div className="v2-pile" aria-hidden="true">
              {order
                .slice(0, 4)
                .reverse()
                .map((p, k, arr) => {
                  const depth = arr.length - 1 - k;
                  return (
                    <motion.figure
                      key={p.src}
                      className="v2-pile__photo"
                      layout
                      initial={false}
                      animate={{
                        rotate: [-4, 5, -7, 3][depth],
                        x: [0, 18, -16, 10][depth],
                        y: depth * 8,
                        scale: 1 - depth * 0.04,
                        zIndex: 10 - depth,
                      }}
                      transition={{ duration: 0.7, ease: EASE_OUT }}
                    >
                      <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                      <figcaption>Séance pratique · Calavi</figcaption>
                    </motion.figure>
                  );
                })}
            </div>
          </Reveal>

          {/* Témoignage */}
          <Reveal y={30} delay={0.1}>
            <div className="v2-quote" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="v2-quote__bars" aria-hidden="true">
                {testimonials.map((_, k) => (
                  <span key={k} className="v2-quote__bar">
                    <i
                      className={k < i ? "is-full" : k === i && !paused && inView && !reduced ? "is-run" : k === i ? "is-half" : ""}
                      style={{ animationDuration: `${DURATION}ms` }}
                      key={`${k}-${i}`}
                    />
                  </span>
                ))}
              </div>
              <Icon icon={QuoteUpIcon} size={36} className="mt-6 text-primary" />
              <div className="v2-quote__body" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <blockquote className="v2-quote__text">« {t.quote} »</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="v2-quote__avatar">{initials(t.name)}</span>
                      <span>
                        <span className="block font-semibold text-ink">{t.name}</span>
                        <span className="block text-[14px] text-ink-soft">{t.role}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" className="v2-quote__nav" onClick={() => setI((v) => (v - 1 + n) % n)} aria-label="Témoignage précédent">
                  <Icon icon={ArrowLeft01Icon} size={18} strokeWidth={2.2} />
                </button>
                <button type="button" className="v2-quote__nav" onClick={() => setI((v) => (v + 1) % n)} aria-label="Témoignage suivant">
                  <Icon icon={ArrowRight01Icon} size={18} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
