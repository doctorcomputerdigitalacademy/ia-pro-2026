"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { METHOD } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const steps = METHOD.steps;
/** Position des étapes sur le tracé (ordinateur), en % de la largeur / hauteur */
const POS = [
  { x: 6, y: 22 },
  { x: 28, y: 74 },
  { x: 50, y: 26 },
  { x: 72, y: 76 },
  { x: 94, y: 24 },
];
const PATH = "M 60 88 C 170 88, 170 296, 280 296 S 390 104, 500 104 S 610 304, 720 304 S 830 96, 940 96";

/**
 * LA MÉTHODE (façon ghostdesignco « Pas des théories ») : un tracé en pointillés
 * se dessine au défilement et allume les 5 étapes une à une.
 * Mobile : même principe en vertical.
 */
export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const [reached, setReached] = useState(reduced ? steps.length : 0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const n = Math.min(steps.length, Math.floor(p * steps.length + 0.35));
    setReached((prev) => (prev === n ? prev : n));
  });

  return (
    <section className="v2-section">
      <Container>
        <Title line1={METHOD.line1} line2={METHOD.line2} className="text-center" />

        <div ref={ref}>
          {/* Ordinateur */}
          <div className="v2-method mt-10 hidden md:block">
            <svg className="v2-method__svg" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
              <path d={PATH} className="v2-method__base" />
              <motion.path d={PATH} className="v2-method__trail" style={{ pathLength: reduced ? 1 : scrollYProgress }} />
            </svg>
            <ol>
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn("v2-method__step", i < reached && "is-on", POS[i].y > 50 ? "is-low" : "is-high")}
                  style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                >
                  <span className="v2-method__dot" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="v2-method__card">
                    <p className="v2-method__title">{s.title}</p>
                    <p className="v2-method__text">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Mobile */}
          <ol className="v2-method-m mt-8 md:hidden">
            <motion.span className="v2-method-m__line" style={{ scaleY: reduced ? 1 : scrollYProgress }} aria-hidden="true" />
            {steps.map((s, i) => (
              <li key={s.title} className={cn("v2-method-m__step", i < reached && "is-on")}>
                <span className="v2-method__dot" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="v2-method__title">{s.title}</p>
                  <p className="v2-method__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
