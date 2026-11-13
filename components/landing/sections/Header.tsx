"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BRAND, CTA, NAV } from "@/lib/landing/content.fr";
import { EASE_OUT } from "@/lib/landing/highlight";
import { CTAButton } from "../primitives/CTAButton";
import { useVideoGate } from "../primitives/VideoGate";

export function Header() {
  // Menu et bouton masqués tant que la vidéo n'a pas été regardée
  const { unlocked } = useVideoGate();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="fixed inset-x-0 top-3 z-50 mx-auto w-[min(1120px,calc(100%-24px))] md:top-4"
    >
      <nav
        aria-label="Navigation principale"
        className="flex min-h-[60px] items-center justify-between gap-3 rounded-full border border-line bg-surface/85 py-2 pl-4 pr-2 shadow-[0_10px_30px_-18px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] backdrop-blur-md md:pl-6"
      >
        <a href="#top" aria-label={`${BRAND.name} — retour en haut`} className="shrink-0 rounded-md">
          <Image
            src="/brand/logo-doctor-computer.png"
            alt={BRAND.logoAlt}
            width={281}
            height={45}
            priority
            className="h-auto w-[148px] sm:w-[190px]"
          />
        </a>

        <ul className={unlocked ? "hidden items-center gap-7 lg:flex" : "hidden"}>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-[15px] font-medium text-ink-soft transition-colors hover:text-primary">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sur mobile, la barre fixe en bas d'écran prend le relais */}
        <CTAButton label={CTA.header} size="sm" showPrice={false} className={unlocked ? "hidden sm:inline-flex" : "hidden"} />
      </nav>
    </motion.header>
  );
}
