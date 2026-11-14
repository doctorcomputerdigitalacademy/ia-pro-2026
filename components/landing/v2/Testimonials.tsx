"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { QuoteUpIcon } from "@hugeicons/core-free-icons";
import { testimonials } from "@/lib/landing/content.fr";
import { PROOF } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .replace(/[^A-Za-zÀ-ÿ]/g, "")
    .slice(0, 2)
    .toUpperCase();

/**
 * TÉMOIGNAGES — inspiré de notion-secrets.com : la liste des noms reste fixe à gauche
 * pendant que les témoignages défilent à droite ; le nom du témoignage lu est mis en avant.
 * Cliquer un nom fait défiler jusqu'à son témoignage. Sur mobile : cartes empilées.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section className="v2-section">
      <Container>
        <div className="flex flex-col items-center text-center">
          <span className="v2-tst__mark" aria-hidden="true">
            <Icon icon={QuoteUpIcon} size={24} strokeWidth={2} />
          </span>
          <Title line1={PROOF.line1} line2={PROOF.line2} className="mt-5 text-center" />
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          {/* Liste fixe des noms (ordinateur) */}
          <aside className="hidden lg:block">
            <ul className="v2-tst__list">
              {testimonials.map((t, i) => (
                <li key={t.name}>
                  <button type="button" onClick={() => go(i)} className={cn("v2-tst__who", active === i && "is-active")} aria-current={active === i || undefined}>
                    {active === i ? <motion.span layoutId="tst-active" className="v2-tst__who-bg" transition={{ duration: 0.45, ease: EASE_OUT }} /> : null}
                    <span className="v2-tst__avatar">{initials(t.name)}</span>
                    <span className="relative min-w-0 text-left">
                      <span className="v2-tst__name">{t.name}</span>
                      <span className="v2-tst__role">{t.role}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Témoignages qui défilent */}
          <div className="space-y-5 md:space-y-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} y={30}>
                <article
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-index={i}
                  className={cn("v2-tst__card", active === i && "is-active")}
                >
                  <header className="flex items-center gap-3 lg:hidden">
                    <span className="v2-tst__avatar">{initials(t.name)}</span>
                    <span className="min-w-0">
                      <span className="v2-tst__name">{t.name}</span>
                      <span className="v2-tst__role">{t.role}</span>
                    </span>
                  </header>
                  <h3 className="v2-tst__title">{t.title}</h3>
                  <Icon icon={QuoteUpIcon} size={30} className="mt-6 text-primary" />
                  <blockquote className="v2-tst__quote">{t.quote}</blockquote>
                  <p className="v2-tst__tag">Formation en présentiel · Calavi</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
