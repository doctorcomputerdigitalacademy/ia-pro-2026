"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { PROGRAM } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Illu } from "./Illu";
import { Title } from "./Title";

/**
 * LE PROGRAMME — deux onglets (IA professionnelle / IA visuelle). Chaque module est une
 * carte au texte centré, avec une petite illustration animée en bas.
 * Les cartes se redistribuent en douceur au changement d'onglet.
 */
export function ProgramTimeline() {
  const [tab, setTab] = useState(0);
  const current = PROGRAM.tabs[tab];

  return (
    <section id="programme" className="v2-section scroll-mt-24">
      <Container>
        <Title line1={PROGRAM.line1} line2={PROGRAM.line2} className="text-center" />

        <Reveal y={16} className="mt-8 flex justify-center">
          <LayoutGroup id="prog-tabs">
            <div className="v2-tabs" role="tablist" aria-label="Spécialités">
              {PROGRAM.tabs.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={cn("v2-tab", tab === i && "is-active", t.tone === "red" && "is-red")}
                >
                  {tab === i ? <motion.span layoutId="prog-pill" className="v2-tab__pill" transition={{ duration: 0.45, ease: EASE_OUT }} /> : null}
                  <span className="relative">
                    {t.label} <small>{t.count}</small>
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <div role="tabpanel" className="mt-8">
          <AnimatePresence mode="wait">
            <motion.ol
              key={tab}
              className="v2-mods"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{ show: { transition: { staggerChildren: 0.06 } }, exit: { opacity: 0, transition: { duration: 0.2 } } }}
            >
              {current.items.map((m) => (
                <motion.li
                  key={m.title}
                  className="v2-mod"
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.97 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
                  }}
                >
                  <span className={cn("v2-mod__kicker", current.tone === "red" && "is-red")}>{m.kicker}</span>
                  <h3 className="v2-mod__title">{m.title}</h3>
                  <p className="v2-mod__text">{m.text}</p>
                  <Illu kind={m.illu} tone={current.tone} />
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
