"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
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

/**
 * EXEMPLES — illustrations de « Voilà ce que vous saurez faire » :
 * onglets Affiches / Photoshoots produits / Vidéos publicitaires.
 */
export function Showcase() {
  const [tab, setTab] = useState(0);
  const current = SHOWCASE.tabs[tab];

  return (
    <div className="v2-show">
      <p className="mx-auto max-w-[560px] text-center text-[16px] text-ink-soft">{SHOWCASE.intro}</p>

      <div className="mt-6 flex justify-center">
        <LayoutGroup id="show-tabs">
          <div className="v2-tabs" role="tablist" aria-label="Types de créations">
            {SHOWCASE.tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={cn("v2-tab", tab === i && "is-active", i === 2 && "is-red")}
              >
                {tab === i ? <motion.span layoutId="show-pill" className="v2-tab__pill" transition={{ duration: 0.45, ease: EASE_OUT }} /> : null}
                <span className="relative">{t.label}</span>
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
