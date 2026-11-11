"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Add01Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { FAQ } from "@/lib/landing/content.fr";
import { CONTACT_URL } from "@/lib/landing/config";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Rich } from "../primitives/Rich";
import { Container } from "../primitives/SectionHead";

/**
 * SECTION 12 — FAQ
 * Grand cadre : en-tête + onglets de thèmes ; à gauche la carte d'aide (infos pratiques
 * + bouton WhatsApp vert) ; à droite les questions. La question ouverte passe en bleu
 * et la réponse s'affiche comme un message de l'académie.
 */
export function FaqSection() {
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState<string | null>(FAQ.items[0].id);
  const baseId = useId();
  const items = FAQ.items.filter((it) => category === "all" || it.category === category);

  return (
    <section id="faq" className="lp-section scroll-mt-24">
      <Container>
        <div className="lp-faq">
          {/* En-tête */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal y={20}>
                <span className="lp-eyebrow">{FAQ.eyebrow}</span>
              </Reveal>
              <Reveal y={24} delay={0.05}>
                <h2 className="lp-h2 mt-3">
                  <Rich text={FAQ.title} strong={false} />
                </h2>
              </Reveal>
              <Reveal y={24} delay={0.1}>
                <p className="mt-3 max-w-[460px] text-[16.5px] text-ink-soft">{FAQ.text}</p>
              </Reveal>
            </div>

            <Reveal y={20} delay={0.1}>
              <LayoutGroup id="faq-tabs">
                <div className="lp-faq__tabs" role="tablist" aria-label="Thèmes des questions">
                  {FAQ.categories.map((c) => {
                    const active = c.id === category;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setCategory(c.id)}
                        className={cn("lp-faq__tab", active && "is-active")}
                      >
                        {active ? (
                          <motion.span layoutId="faq-tab-pill" className="lp-faq__tab-pill" transition={{ duration: 0.4, ease: EASE_OUT }} />
                        ) : null}
                        <span className="relative">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
            {/* Carte d'aide */}
            <Reveal y={24} className="order-2 lg:sticky lg:top-28 lg:order-1 lg:self-start">
              <aside className="lp-faq__help">
                <div className="flex items-center gap-3">
                  <span className="lp-faq__avatar">
                    <Image src="/brand/mark.png" alt="" width={40} height={40} className="h-auto w-9 object-contain" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-surface">{FAQ.contactBadge}</p>
                    <p className="flex items-center gap-2 text-[13px] text-surface/75">
                      <span className="lp-faq__online" aria-hidden="true" />
                      Disponible sur WhatsApp
                    </p>
                  </div>
                </div>

                <h3 className="lp-sub mt-6 text-[24px] font-bold leading-tight text-surface">{FAQ.contactTitle}</h3>
                <p className="mt-2 text-[15.5px] text-surface/80">{FAQ.contactText}</p>

                <dl className="mt-6 grid gap-2">
                  {FAQ.helpFacts.map((f) => (
                    <div key={f.label} className="lp-faq__fact">
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="lp-faq__wa">
                  <Icon icon={WhatsappIcon} size={20} strokeWidth={1.9} />
                  {FAQ.contactLabel}
                  <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
                </a>
              </aside>
            </Reveal>

            {/* Questions */}
            <motion.ul layout className="order-1 space-y-3 lg:order-2" role="tabpanel">
              <AnimatePresence initial={false} mode="popLayout">
                {items.map((item) => {
                  const isOpen = open === item.id;
                  const index = FAQ.items.findIndex((it) => it.id === item.id);
                  const panelId = `${baseId}-faq-${item.id}`;
                  const buttonId = `${baseId}-btn-${item.id}`;
                  return (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    >
                      <div className={cn("lp-faq__item", isOpen && "is-open")}>
                        <h3>
                          <button
                            id={buttonId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpen(isOpen ? null : item.id)}
                            className="flex w-full items-center gap-4 px-4 py-4 text-left md:px-6 md:py-5"
                          >
                            <span className="lp-faq__num">{String(index + 1).padStart(2, "0")}</span>
                            <span className="lp-faq__q flex-1">{item.question}</span>
                            <span className="lp-faq__toggle" aria-hidden="true">
                              <Icon icon={Add01Icon} size={18} strokeWidth={2.2} />
                            </span>
                          </button>
                        </h3>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              id={panelId}
                              role="region"
                              aria-labelledby={buttonId}
                              key="answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE_OUT }}
                            >
                              <div className="flex items-start gap-3 px-4 pb-5 md:px-6 md:pb-6">
                                <span className="lp-faq__avatar lp-faq__avatar--sm">
                                  <Image src="/brand/mark.png" alt="" width={28} height={28} className="h-auto w-6 object-contain" />
                                </span>
                                <div className="lp-faq__bubble">
                                  <span className="lp-faq__from">{FAQ.answerFrom}</span>
                                  <p>{item.answer}</p>
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
