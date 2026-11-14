"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

/** Durée d'affichage de chaque onglet avant de passer au suivant (ms) */
const DUR = { video: 12000, image: 8000 } as const;

/**
 * EXEMPLES — illustrations de « Voilà ce que vous saurez faire » :
 * onglets Vidéos / Affiches / Photoshoots qui défilent tout seuls
 * (barre de progression dans l'onglet actif, pause au survol, clic possible).
 */
export function Showcase() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.3 });
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
    <div ref={root} className="v2-show" onMouseEnter={() => pause(true)} onMouseLeave={() => pause(false)}>
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
                <span className="relative">{t.label}</span>
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
            {current.kind === "image" ? (
              <ul className="v2-show__grid">
                {current.items.map((it) => (
                  <li key={it.src} className="v2-show__img">
                    <Image src={it.src} alt={it.alt} width={900} height={900} sizes="(min-width: 1024px) 30vw, 50vw" className="h-auto w-full" />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="v2-show__clips">
                {(current.items as VideoItem[]).map((it) => (
                  <li key={it.src}>
                    <ClipCard item={it} />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
