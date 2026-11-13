"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlayIcon } from "@hugeicons/core-free-icons";
import { VIDEO_GATE, VSL_SKIP_AFTER_SECONDS, VSL_SRC, VSL_UNLOCK_SECONDS } from "@/lib/landing/config";
import { EASE_OUT } from "@/lib/landing/highlight";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * VERROU VIDÉO — au chargement, seule la vidéo est visible.
 * Le bouton et la suite de la page s'affichent quand le visiteur a regardé
 * VSL_UNLOCK_SECONDS secondes (ou la vidéo jusqu'au bout). Débloqué une fois = débloqué
 * pour ce visiteur (mémorisé dans son navigateur).
 */

const KEY = "iapro2026-video-unlocked";
const ENABLED = VIDEO_GATE && Boolean(VSL_SRC) && VSL_UNLOCK_SECONDS > 0;

type Gate = {
  unlocked: boolean;
  /** La vidéo a été regardée VSL_UNLOCK_SECONDS secondes (ou jusqu'au bout) pendant cette visite. */
  watched: boolean;
  progress: number; // 0 → 1
  started: boolean;
  report: (seconds: number) => void;
  markStarted: () => void;
  unlock: () => void;
  onEnded: () => void;
};

const GateContext = createContext<Gate>({
  unlocked: true,
  watched: false,
  progress: 1,
  started: true,
  report: () => {},
  markStarted: () => {},
  unlock: () => {},
  onEnded: () => {},
});

export const useVideoGate = () => useContext(GateContext);

const subscribe = () => () => {};
const readStored = () => {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

export function VideoGateProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, readStored, () => false);
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [watched, setWatched] = useState(false);

  const unlock = useCallback(() => {
    setOpened(true);
    setProgress(1);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* stockage indisponible : la page reste ouverte pour cette visite */
    }
  }, []);

  const report = useCallback(
    (seconds: number) => {
      setProgress((p) => Math.max(p, Math.min(1, seconds / VSL_UNLOCK_SECONDS)));
      if (seconds >= VSL_UNLOCK_SECONDS) {
        setWatched(true);
        unlock();
      }
    },
    [unlock],
  );

  const onEnded = useCallback(() => {
    setWatched(true);
    unlock();
  }, [unlock]);

  const markStarted = useCallback(() => setStarted(true), []);

  const value = useMemo<Gate>(
    () => ({ unlocked: !ENABLED || stored || opened, watched, progress, started, report, markStarted, unlock, onEnded }),
    [stored, opened, watched, progress, started, report, markStarted, unlock, onEnded],
  );

  return <GateContext.Provider value={value}>{children}</GateContext.Provider>;
}

/** Contenu masqué tant que la vidéo n'a pas été regardée, puis révélé en fondu. */
export function Gated({ children, className }: { children: ReactNode; className?: string }) {
  const { unlocked } = useVideoGate();
  return (
    <div className={cn("v2-gate", unlocked && "is-open", className)} aria-hidden={!unlocked || undefined} inert={!unlocked}>
      {children}
    </div>
  );
}

/** Message sous la vidéo tant que la suite est verrouillée : invitation + progression + lien discret. */
export function GateHint() {
  const { unlocked, progress, started, unlock } = useVideoGate();
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (unlocked) return;
    const id = window.setTimeout(() => setCanSkip(true), VSL_SKIP_AFTER_SECONDS * 1000);
    return () => window.clearTimeout(id);
  }, [unlocked]);

  return (
    <AnimatePresence>
      {!unlocked ? (
        <motion.div
          key="hint"
          className="v2-gate-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="v2-gate-hint__text">
            <Icon icon={PlayIcon} size={16} strokeWidth={2.2} />
            {started ? "Continuez la vidéo : la suite s'affiche dans un instant." : "Lancez la vidéo pour découvrir la formation."}
          </p>
          <span className="v2-gate-hint__bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${progress})` }} />
          </span>
          {canSkip ? (
            <button type="button" className="v2-gate-hint__skip" onClick={unlock}>
              Afficher la suite sans la vidéo
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
