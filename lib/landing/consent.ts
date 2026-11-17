"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY } from "./config";

/**
 * Consentement aux cookies publicitaires (Meta Pixel).
 * - "granted" : le visiteur accepte, le Pixel est chargé ;
 * - "denied"  : le visiteur refuse, aucun cookie publicitaire ;
 * - null      : pas encore de choix, le bandeau s'affiche.
 * Les statistiques Vercel n'utilisent pas de cookies : elles ne dépendent pas de ce choix.
 */
export type Consent = "granted" | "denied" | null;

const CHANGE = "iapro:consent-change";
const OPEN = "iapro:consent-open";

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(v: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* navigation privée : le choix vaut pour cette visite seulement */
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE, { detail: v }));
}

/** Rouvre le bandeau (lien « Gérer mes cookies » du pied de page). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN));
}

/** Choix actuel du visiteur ; `ready` passe à true une fois le choix lu sur l'appareil. */
export function useConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CHANGE, onChange);
    return () => window.removeEventListener(CHANGE, onChange);
  }, []);
  return { consent, ready };
}

export function useConsentOpen(cb: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN, cb);
    return () => window.removeEventListener(OPEN, cb);
  }, [cb]);
}
