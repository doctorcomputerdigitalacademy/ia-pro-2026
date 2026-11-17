"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { SHOWCASE } from "@/lib/landing/content.v2";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";

type VideoItem = { src: string; poster: string; alt: string };

/** Vidéo verticale : ne se charge et ne joue (en boucle, sans son) que lorsqu'elle est visible. */
function ClipCard({ item }: { item: VideoItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);
  return (
    <figure className="v2-clipcard">
      <video ref={ref} src={item.src} poster={item.poster} muted loop playsInline preload="none" aria-label={item.alt} />
      <span className="v2-clipcard__tag">Vidéo IA</span>
    </figure>
  );
}

/** Rangée d'un onglet : glisse doucement jusqu'au bout pendant que l'onglet est affiché. */
function GlideRow({ glide, delay, restart, children }: { glide: boolean; delay: number; restart: number; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !glide) return;
    const id = window.setTimeout(() => el.scrollTo({ left: el.scrollWidth, behavior: "smooth" }), delay);
    return () => window.clearTimeout(id);
  }, [glide, delay, restart]);
  return (
    <ul ref={ref} className="v2-show__row">
      {children}
    </ul>
  );
}

/** Durée d'affichage de chaque onglet avant de passer au suivant (ms) */
const DUR = { video: 8000, image: 7000 } as const;

/**
 * EXEMPLES — illustrations de « Voilà ce que vous saurez faire » :
 * onglets Vidéos → Affiches → Photoshoots qui s'enchaînent tout seuls.
 * Chaque onglet est une rangée de hauteur fixe (pas de saut de page) qui glisse
 * d'elle-même vers la droite pendant l'affichage ; on peut aussi la faire glisser au doigt.
 * Pause au survol de la souris (pas au toucher, pour ne pas bloquer le défilement sur mobile).
 */
export function Showcase() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  /* Actif dès que la section est bien à l'écran, quelle que soit sa hauteur */
  const inView = useInView(root, { margin: "-25% 0px -25% 0px" });
  const reducedMotion = useReducedMotion();
  const current = SHOWCASE.tabs[tab];
  const n = SHOWCASE.tabs.length;
  const dur = DUR[current.kind];
  const auto = inView && !paused && !reducedMotion;

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setTab((v) => (v + 1) % n), dur);
    return () => window.clearTimeout(id);
  }, [auto, tab, dur, n, run]);

  const pause = (v: boolean) => {
    setPaused(v);
    if (!v) setRun((r) => r + 1);
  };

  return (
    <div
      ref={root}
      className="v2-show"
      onPointerEnter={(e) => e.pointerType === "mouse" && pause(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && pause(false)}
    >
      <div className="flex justify-center">
        <LayoutGroup id="show-tabs">
          <div className="v2-tabs" role="tablist" aria-label="Types de créations">
            {SHOWCASE.tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                onClick={() => {
                  setTab(i);
                  setRun((r) => r + 1);
                }}
                className={cn("v2-tab", tab === i && "is-active", t.kind === "video" && "is-red")}
              >
                {tab === i ? <motion.span layoutId="show-pill" className="v2-tab__pill" transition={{ duration: 0.45, ease: EASE_OUT }} /> : null}
                <span className="relative hidden sm:inline">{t.label}</span>
                <span className="relative sm:hidden">{t.short}</span>
                {tab === i && !reducedMotion ? (
                  <span className="v2-tab__progress" aria-hidden="true">
                    <i key={`${i}-${run}`} className={auto ? "is-run" : ""} style={{ animationDuration: `${dur}ms` }} />
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div role="tabpanel" className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <GlideRow glide={auto} delay={dur * 0.35} restart={run}>
              {current.kind === "image"
                ? current.items.map((it) => (
                    <li key={it.src} className="v2-show__img" style={{ aspectRatio: `${it.w} / ${it.h}` }}>
                      <Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 360px, 260px" className="object-cover" />
                    </li>
                  ))
                : (current.items as VideoItem[]).map((it) => (
                    <li key={it.src} className="v2-show__clip">
                      <ClipCard item={it} />
                    </li>
                  ))}
            </GlideRow>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
