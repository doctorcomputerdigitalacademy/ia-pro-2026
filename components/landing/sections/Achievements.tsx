"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { ACHIEVEMENTS, CTA } from "@/lib/landing/content.fr";
import { CTAButton } from "../primitives/CTAButton";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

type Item = (typeof ACHIEVEMENTS.items)[number];

/** Une réalisation : se coche quand elle arrive à l'écran. */
function SkillRow({ item, index, onReach }: { item: Item; index: number; onReach: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (inView) onReach(index);
  }, [inView, index, onReach]);

  return (
    <li ref={ref} className="lp-skill pb-4" data-on={inView}>
      <span className="lp-skill__check" aria-hidden="true">
        <Icon icon={Tick02Icon} size={16} strokeWidth={2.6} />
      </span>
      <Reveal y={28}>
        <article className="lp-card grid items-center gap-5 p-5 md:grid-cols-[1.25fr_1fr] md:gap-8 md:p-7">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink-soft">
              Réalisation {String(index + 1).padStart(2, "0")} · {item.group}
            </span>
            <h3 className="lp-h3 mt-2 text-[20px] md:text-[23px]">{item.title}</h3>
            <p className="mt-2 text-[15.5px] text-ink-soft">{item.text}</p>
          </div>
          <div className="lp-skill__window" aria-hidden="true">
            <div className="lp-skill__bar">
              <i />
              <i />
              <i />
              <span className="ml-1.5 truncate">{item.file}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {item.chips.map((chip) => (
                <span key={chip} className="lp-skill__chip">
                  <Icon icon={Tick02Icon} size={14} strokeWidth={2.4} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
}

/**
 * SECTION 6 — CE QUE VOUS SAUREZ FAIRE À LA FIN
 * Inspiré de phantombuild : chaque réalisation se coche au défilement,
 * avec une mini-fenêtre illustrative ; barre de progression « x sur 7 ». Fond bleu uni.
 */
export function Achievements() {
  const total = ACHIEVEMENTS.items.length;
  const [reached, setReached] = useState<boolean[]>(() => Array(total).fill(false));
  const count = reached.filter(Boolean).length;
  const onReach = useCallback(
    (i: number) =>
      setReached((prev) => {
        if (prev[i]) return prev;
        const next = [...prev];
        next[i] = true;
        return next;
      }),
    [],
  );

  return (
    <section className="lp-section">
      <div className="lp-band">
        <Container narrow>
          <SectionHead eyebrow={ACHIEVEMENTS.eyebrow} title={ACHIEVEMENTS.title} text={ACHIEVEMENTS.text} />

          <ol className="mx-auto max-w-[860px]">
            {ACHIEVEMENTS.items.map((item, i) => (
              <SkillRow key={item.title} item={item} index={i} onReach={onReach} />
            ))}
          </ol>

          <Reveal y={24} className="mx-auto mt-6 max-w-[860px]">
            <div className="lp-card flex flex-col items-center gap-5 p-5 text-center md:flex-row md:justify-between md:p-6 md:text-left">
              <p className="text-[16px] text-ink-soft md:text-[17px]">
                <span className="font-semibold text-ink">{ACHIEVEMENTS.barLead}</span> {ACHIEVEMENTS.barText}
              </p>
              <CTAButton label={CTA.skills} size="sm" />
            </div>
          </Reveal>

          <div className="mt-5 flex justify-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-[13.5px] text-ink-soft">
              <span className="lp-progress-dashes" aria-hidden="true">
                {reached.map((on, i) => (
                  <i key={i} data-on={on} />
                ))}
              </span>
              <span>
                <span className="font-semibold text-ink">{count}</span> sur {total} {ACHIEVEMENTS.unlocked}
              </span>
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
