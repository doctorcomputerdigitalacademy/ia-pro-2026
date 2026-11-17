"use client";

import { openConsent } from "@/lib/landing/consent";

/** Rouvre le bandeau cookies pour changer son choix. */
export function ManageCookies({ className, label = "Gérer mes cookies" }: { className?: string; label?: string }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      {label}
    </button>
  );
}
