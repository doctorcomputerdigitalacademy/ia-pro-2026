"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PROGRAM } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const clips = PROGRAM.clips;
const total = clips.length;
const firstOf = (chapter: number) => clips.findIndex((c) => c.chapter === chapter);
const countOf = (chapter: number) => clips.filter((c) => c.chapter === chapter).length;

/**
 * LE PROGRAMME — présenté comme la ligne de temps d'un logiciel de montage
 * (façon ghostdesignco). Sur ordinateur, la section reste fixe pendant le défilement :
 * la tête de lecture parcourt les 13 étapes et le détail de l'étape s'affiche dessous.
 * Sur mobile : liste verticale animée.
 */
export function ProgramTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const left = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const t = Math.min(0.9999, Math.max(0, (p - 0.05) / 0.9));
    const i = Math.floor(t * total);
    setActive((prev) => (prev === i ? prev : i));
  });

  const clip = clips[active];

  return (
    <section id="programme" className="scroll-mt-24">
      {/* Ordinateur : section épinglée */}
      <div ref={ref} className="v2-prog hidden md:block">
        <div className="v2-prog__sticky">
          <Container>
            <Title line1={PROGRAM.line1} line2={PROGRAM.line2} />

            <div className="v2-editor mt-8" aria-hidden="true">
              <div className="v2-editor__bar">
                <i />
                <i />
                <i />
                <span>{PROGRAM.file}</span>
                <b>
                  {String(active + 1).padStart(2, "0")} / {total}
                </b>
              </div>
              <div className="v2-editor__body">
                <div className="v2-editor__ruler">
                  {Array.from({ length: total * 2 + 1 }, (_, i) => (
                    <span key={i} className={i % 2 ? "" : "is-major"} />
                  ))}
                </div>
                <div className="v2-editor__track">
                  {clips.map((c, i) => (
                    <div
                      key={c.title}
                      className={cn("v2-clip", c.chapter === 1 && "v2-clip--red", i === active && "is-active", i < active && "is-done")}
                    >
                      <span>{c.short}</span>
                    </div>
                  ))}
                </div>
                <div className="v2-editor__chapters">
                  {PROGRAM.chapters.map((ch, k) => (
                    <div
                      key={ch.label}
                      className={cn("v2-chapter", ch.tone === "red" && "v2-chapter--red")}
                      style={{ width: `${(countOf(k) / total) * 100}%`, marginLeft: k === 0 ? `${(firstOf(k) / total) * 100}%` : 0 }}
                    >
                      <i />
                      {ch.label}
                    </div>
                  ))}
                </div>
                <div className="v2-playhead-lane">
                  <motion.div className="v2-playhead" style={{ left: reduced ? "0%" : left }}>
                    <span />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="v2-prog__detail" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <span className={cn("v2-kicker", clip.chapter === 1 && "is-red")}>
                    {clip.kicker} · {PROGRAM.chapters[clip.chapter].label}
                  </span>
                  <h3 className="v2-prog__title">{clip.title}</h3>
                  <p className="mt-1.5 max-w-[640px] text-[16.5px] text-ink-soft">{clip.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile : liste verticale */}
      <div className="v2-section md:hidden">
        <Container>
          <Title line1={PROGRAM.line1} line2={PROGRAM.line2} />
          {PROGRAM.chapters.map((ch, k) => (
            <div key={ch.label} className="mt-8">
              <span className={cn("v2-kicker", k === 1 && "is-red")}>{ch.label}</span>
              <ol className="v2-mlist mt-3">
                {clips
                  .filter((c) => c.chapter === k)
                  .map((c, i) => (
                    <Reveal as="li" key={c.title} y={18} delay={Math.min(i, 3) * 0.05} className={cn("v2-mlist__item", k === 1 && "is-red")}>
                      <span className="v2-mlist__num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="font-semibold text-ink">{c.title}</p>
                        <p className="mt-0.5 text-[14.5px] text-ink-soft">{c.text}</p>
                      </div>
                    </Reveal>
                  ))}
              </ol>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
