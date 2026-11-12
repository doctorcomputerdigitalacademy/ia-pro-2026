"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ArrowLeftRightIcon, Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { BEFORE_AFTER } from "@/lib/landing/content.v2";
import { Icon } from "../primitives/Icon";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

function List({ items, after }: { items: string[]; after?: boolean }) {
  return (
    <ul className="space-y-3.5">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[15.5px] leading-snug md:text-[16.5px]">
          <span className={after ? "v2-ba__ico v2-ba__ico--after" : "v2-ba__ico"}>
            <Icon icon={after ? Tick02Icon : Cancel01Icon} size={13} strokeWidth={2.6} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * AVANT / APRÈS (façon ghostdesignco) : une carte coupée en deux, avec une poignée
 * à faire glisser (souris, doigt ou flèches du clavier). Sur mobile : deux cartes empilées.
 */
export function BeforeAfter() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  // Petite démonstration à l'arrivée : la poignée glisse pour montrer l'effet
  useEffect(() => {
    if (!inView || reduced) return;
    const ctrl = animate(50, [50, 78, 30, 50], {
      duration: 2.4,
      ease: "easeInOut",
      delay: 0.3,
      onUpdate: (v) => {
        if (!dragging.current) setPos(v);
      },
    });
    return () => ctrl.stop();
  }, [inView, reduced]);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="v2-section">
      <Container>
        <Title line1={BEFORE_AFTER.line1} line2={BEFORE_AFTER.line2} className="text-center" />

        {/* Ordinateur / tablette : carte coupée avec poignée */}
        <div
          ref={box}
          className="v2-ba mt-10 hidden md:block"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            move(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && move(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <div className="v2-ba__pane v2-ba__pane--before">
            <div className="v2-ba__half">
              <span className="v2-ba__tag">{BEFORE_AFTER.beforeTag}</span>
              <List items={BEFORE_AFTER.before} />
            </div>
          </div>
          <div className="v2-ba__pane v2-ba__pane--after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <div className="v2-ba__half v2-ba__half--right">
              <span className="v2-ba__tag v2-ba__tag--after">{BEFORE_AFTER.afterTag}</span>
              <List items={BEFORE_AFTER.after} after />
            </div>
          </div>
          <button
            type="button"
            role="slider"
            aria-label="Comparer avant et après"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            className="v2-ba__handle"
            style={{ left: `${pos}%` }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(8, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(92, p + 5));
            }}
          >
            <Icon icon={ArrowLeftRightIcon} size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* Mobile : deux cartes */}
        <div className="mt-8 grid gap-3 md:hidden">
          <div className="v2-ba__pane--before rounded-[22px] p-6">
            <span className="v2-ba__tag">{BEFORE_AFTER.beforeTag}</span>
            <List items={BEFORE_AFTER.before} />
          </div>
          <div className="v2-ba__pane--after rounded-[22px] p-6">
            <span className="v2-ba__tag v2-ba__tag--after">{BEFORE_AFTER.afterTag}</span>
            <List items={BEFORE_AFTER.after} after />
          </div>
        </div>
      </Container>
    </section>
  );
}
