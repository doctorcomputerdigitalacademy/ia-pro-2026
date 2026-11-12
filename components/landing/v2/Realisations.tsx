"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { REALISATIONS } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

function Card({ it, index }: { it: (typeof REALISATIONS.items)[number]; index: number }) {
  return (
    <li className="v2-sf__item">
      <div className={cn("v2-poster v2-sf__poster", `v2-poster--${it.tone}`)}>
        <span className="v2-sf__num">{String(index + 1).padStart(2, "0")}</span>
        <span className="v2-poster__kicker">{it.group}</span>
        <span className="v2-poster__big">{it.short}</span>
        <span className="v2-poster__brand">
          <Image src="/brand/mark.png" alt="" width={24} height={24} className="h-auto w-6" />
          IA PRO 2026
        </span>
      </div>
      <p className="mt-3 text-[15.5px] font-semibold leading-snug text-ink">{it.title}</p>
    </li>
  );
}

/**
 * VOILÀ CE QUE VOUS SAUREZ FAIRE — les 7 réalisations.
 * Ordinateur : la section reste fixe et les affiches défilent horizontalement au rythme du scroll.
 * Mobile : défilement horizontal au doigt (aimanté).
 */
export function Realisations() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="v2-sf-section">
      {/* Ordinateur */}
      <div ref={wrap} className="v2-sf hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="v2-sf__sticky">
          <Container>
            <Title line1={REALISATIONS.line1} line2={REALISATIONS.line2} />
          </Container>
          <motion.ol ref={track} className="v2-sf__track" style={{ x: reduced ? 0 : x }}>
            {REALISATIONS.items.map((it, i) => (
              <Card key={it.title} it={it} index={i} />
            ))}
          </motion.ol>
        </div>
      </div>

      {/* Mobile */}
      <div className="v2-section md:hidden">
        <Container>
          <Title line1={REALISATIONS.line1} line2={REALISATIONS.line2} />
        </Container>
        <ol className="v2-sf__swipe">
          {REALISATIONS.items.map((it, i) => (
            <Card key={it.title} it={it} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
