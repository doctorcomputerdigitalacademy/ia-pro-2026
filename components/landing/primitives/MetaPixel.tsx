"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { CONTACT_URL, META_PIXEL_ID, PRICE_VALUE, REGISTRATION_URL } from "@/lib/landing/config";
import { useConsent } from "@/lib/landing/consent";
import { useVideoGate } from "./VideoGate";

type Fbq = (...args: unknown[]) => void;
const REF_KEY = "iapro-ref";

/** Référence de la pub d'origine : ?ref=… ou ?utm_content=… (gardée pendant la visite). */
function readRef(): string {
  try {
    const q = new URLSearchParams(window.location.search);
    const fromUrl = (q.get("ref") || q.get("utm_content") || "").slice(0, 60);
    if (fromUrl) sessionStorage.setItem(REF_KEY, fromUrl);
    return fromUrl || sessionStorage.getItem(REF_KEY) || "";
  } catch {
    return "";
  }
}

/** Envoie un événement au Pixel (sans effet si le Pixel n'est pas configuré). */
export function track(event: string, params?: Record<string, unknown>) {
  if (!META_PIXEL_ID || typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq("track", event, params);
}

/**
 * META PIXEL — événements suivis :
 * - PageView     : chaque visite de la page ;
 * - ViewContent  : la vidéo de présentation est regardée 45 s ou jusqu'au bout ;
 * - Lead         : clic sur un bouton « Réserver ma place » (ouvre WhatsApp directement), une fois par visite.
 *                  C'est l'événement sur lequel la campagne optimise : ne pas le déplacer sans changer la campagne ;
 * - Contact      : clic sur « Écrivez-nous sur WhatsApp » (question).
 * Le Pixel est actif par défaut et s'arrête si le visiteur refuse (bandeau en bas de page).
 */
export function MetaPixel() {
  const { watched } = useVideoGate();
  const { consent, ready } = useConsent();
  const sent = useRef(false);
  const leadSent = useRef(false);

  /* Le visiteur change d'avis après coup : le Pixel déjà chargé suit son choix. */
  useEffect(() => {
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (fbq && consent) fbq("consent", consent === "granted" ? "grant" : "revoke");
  }, [consent]);

  /* ViewContent : une fois par visite, quand la vidéo a été regardée 45 s (ou jusqu'au bout). */
  useEffect(() => {
    if (!watched || sent.current || consent === "denied") return;
    sent.current = true;
    track("ViewContent", { content_name: "Vidéo IA PRO 2026", content_category: "VSL" });
  }, [watched, consent]);

  /* Clics vers WhatsApp : Lead (réservation, une fois par visite) ou Contact (question).
     Si la pub porte une référence (?ref=… ou ?utm_content=…), elle est ajoutée au message WhatsApp. */
  useEffect(() => {
    readRef();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='https://wa.me/']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === CONTACT_URL) {
        track("Contact");
        return;
      }
      if (href !== REGISTRATION_URL && !a.dataset.reg) return;
      a.dataset.reg = "1";
      const ref = readRef();
      if (ref) a.href = `${REGISTRATION_URL}${encodeURIComponent(`\n(réf. ${ref})`)}`;
      if (!leadSent.current) {
        leadSent.current = true;
        track("Lead", { value: PRICE_VALUE, currency: "XOF", content_name: "Réservation IA PRO 2026" });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!META_PIXEL_ID || !ready || consent === "denied") return null;
  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
