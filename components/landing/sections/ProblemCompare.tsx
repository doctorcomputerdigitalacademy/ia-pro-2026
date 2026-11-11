"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { AiStatus } from "@/components/ui/ai-status";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { PROBLEM } from "@/lib/landing/content.fr";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";

/**
 * Comparatif visuel de la section « Le problème » (au lieu de simples paragraphes) :
 * à gauche, un usage basique de ChatGPT (réponse générique) ;
 * à droite, un assistant IA qui travaille vraiment (composant Rare UI « AiStatus »
 * qui enchaîne les étapes, livrables qui se cochent).
 */
export function ProblemCompare() {
  const { basic, pro } = PROBLEM.compare;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % (pro.steps.length + 1)), 1900);
    return () => window.clearInterval(id);
  }, [inView, pro.steps.length]);

  const current = pro.steps[Math.min(step, pro.steps.length - 1)];
  const doneCount = Math.min(step, pro.outputs.length);

  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-2">
      {/* Usage basique */}
      <Reveal y={28}>
        <div className="lp-compare lp-compare--basic h-full">
          <span className="lp-compare__tag bg-secondary">{basic.tag}</span>
          <p className="mt-4 text-[16px] text-ink-soft">{PROBLEM.paragraphs[0]}</p>

          <div className="lp-chat mt-5" aria-hidden="true">
            <div className="lp-chat__bar">
              <i />
              <i />
              <i />
              <span>chat</span>
            </div>
            <div className="space-y-3 p-4">
              <p className="lp-chat__user">{basic.prompt}</p>
              <div className="lp-chat__bot">
                <p>{basic.reply}</p>
                <span className="lp-chat__line w-[92%]" />
                <span className="lp-chat__line w-[78%]" />
                <span className="lp-chat__line w-[64%]" />
              </div>
            </div>
          </div>

          <p className="mt-5 flex items-center gap-2.5 text-[15.5px] font-semibold text-secondary">
            <span className="size-2.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
            {basic.verdict}
          </p>
        </div>
      </Reveal>

      {/* Usage maîtrisé */}
      <Reveal y={28} delay={0.1}>
        <div className="lp-compare lp-compare--pro h-full">
          <span className="lp-compare__tag bg-surface text-primary">{pro.tag}</span>
          <p className="mt-4 text-[16px] text-surface/85">{PROBLEM.paragraphs[1]}</p>

          <div className="lp-agent mt-5" aria-hidden="true">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-[13px] font-bold text-ink">{pro.assistant}</span>
              <span className="lp-dot" />
            </div>
            <div className="px-4 py-3">
              <AiStatus state={current.state} label={current.label} timer={false} />
            </div>
            <ul className="grid grid-cols-2 gap-2 px-4 pb-4">
              {pro.outputs.map((o, i) => (
                <li key={o} className={cn("lp-agent__out", i < doneCount && "is-done")}>
                  <Icon icon={Tick02Icon} size={14} strokeWidth={2.4} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 flex items-center gap-2.5 text-[15.5px] font-semibold text-surface">
            <span className="size-2.5 shrink-0 rounded-full bg-path" aria-hidden="true" />
            {pro.verdict}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
