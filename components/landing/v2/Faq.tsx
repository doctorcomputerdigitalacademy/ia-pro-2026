"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Add01Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { FAQ2 } from "@/lib/landing/content.v2";
import { CONTACT_URL } from "@/lib/landing/config";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

/** FAQ — sobre, façon ghostdesignco : titre à gauche, questions séparées par des traits à droite. */
export function Faq() {
  const [open, setOpen] = useState<string | null>(FAQ2.items[0].id);
  const baseId = useId();
  return (
    <section id="faq" className="v2-section scroll-mt-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Title line1={FAQ2.line1} line2={FAQ2.line2} />
            <Reveal y={16} delay={0.2}>
              <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="v2-wa mt-6">
                <Icon icon={WhatsappIcon} size={18} strokeWidth={1.9} />
                {FAQ2.contact}
                <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
              </a>
            </Reveal>
          </div>
          <ul className="v2-faq">
            {FAQ2.items.map((item, i) => {
              const isOpen = open === item.id;
              return (
                <Reveal as="li" key={item.id} y={16} delay={Math.min(i, 4) * 0.04} className={cn("v2-faq__item", isOpen && "is-open")}>
                  <h3>
                    <button
                      id={`${baseId}-b${i}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${baseId}-p${i}`}
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-[17px] font-semibold text-ink md:text-[18px]">{item.question}</span>
                      <span className="v2-faq__plus" aria-hidden="true">
                        <Icon icon={Add01Icon} size={18} strokeWidth={2.2} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`${baseId}-p${i}`}
                        role="region"
                        aria-labelledby={`${baseId}-b${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      >
                        <p className="max-w-[620px] pb-5 text-[15.5px] leading-relaxed text-ink-soft">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
