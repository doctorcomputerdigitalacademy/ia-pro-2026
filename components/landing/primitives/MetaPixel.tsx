"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { CONTACT_URL, META_PIXEL_ID } from "@/lib/landing/config";
import { useConsent } from "@/lib/landing/consent";
import { useVideoGate } from "./VideoGate";

type Fbq = (...args: unknown[]) => void;

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
 * - InitiateCheckout : ouverture du formulaire de réservation (ReservationForm) ;
 * - Lead         : formulaire envoyé par une personne prête à s'inscrire (paiement complet ou acompte) ;
 * - Contact      : formulaire envoyé en « je me renseigne », ou clic sur « Écrivez-nous sur WhatsApp ».
 * Le Pixel est actif par défaut et s'arrête si le visiteur refuse (bandeau en bas de page).
 */
export function MetaPixel() {
  const { watched } = useVideoGate();
  const { consent, ready } = useConsent();
  const sent = useRef(false);

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

  /* Clic sur le WhatsApp de question : Contact. Les inscriptions (Lead) partent du formulaire. */
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='https://wa.me/']") as HTMLAnchorElement | null;
      if (a && a.getAttribute("href") === CONTACT_URL) track("Contact");
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
