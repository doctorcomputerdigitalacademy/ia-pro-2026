"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CTA } from "@/lib/landing/content.fr";
import { EASE_OUT } from "@/lib/landing/highlight";
import { CTAButton } from "./CTAButton";
import { useVideoGate } from "./VideoGate";

/**
 * Barre d'action fixe en bas de l'écran, uniquement sur mobile (< 640px).
 * Elle apparaît dès que le visiteur a dépassé le Hero et se masque
 * quand le dernier appel à l'action (#inscription) est visible, pour éviter un doublon.
 */
export function StickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("inscription");
    const io = target
      ? new IntersectionObserver(([entry]) => setFinalVisible(entry.isIntersecting), { threshold: 0.25 })
      : null;
    if (target && io) io.observe(target);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const { unlocked } = useVideoGate();
  const show = unlocked && pastHero && !finalVisible;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="sticky-cta"
          className="lp-sticky-cta sm:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <CTAButton label={CTA.sticky} size="bar" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
