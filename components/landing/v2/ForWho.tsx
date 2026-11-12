"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { FOR_WHO } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

/** Phrase barrée d'un trait rouge qui se dessine (sur chaque ligne) à l'entrée dans l'écran. */
function Struck({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span ref={ref} className={cn("v2-strike-text", inView && "is-on")} style={{ transitionDelay: `${delay}s` }}>
      {text}
    </span>
  );
}

/** POUR QUI — « C'est pour vous si » / « Ce n'est pas pour vous si » (façon ghostdesignco). */
export function ForWho() {
  return (
    <section className="v2-section">
      <Container>
        <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="v2-who v2-who--yes h-full">
              <Title as="h2" line1={FOR_WHO.yesTitle} className="v2-title--md" />
              <ul className="mt-6 space-y-3.5">
                {FOR_WHO.yes.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[16px] text-ink">
                    <span className="v2-ba__ico v2-ba__ico--blue">
                      <Icon icon={Tick02Icon} size={13} strokeWidth={2.6} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="v2-who v2-who--no h-full">
              <h3 className="v2-title v2-title--md text-v2-muted">{FOR_WHO.noTitle}</h3>
              <ul className="mt-6 space-y-4">
                {FOR_WHO.no.map((t, i) => (
                  <li key={t} className="text-[16px] text-ink-soft">
                    <Struck text={t} delay={0.3 + i * 0.35} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
