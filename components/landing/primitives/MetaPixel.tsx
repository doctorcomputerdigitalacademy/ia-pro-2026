"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { CONTACT_URL, META_PIXEL_ID, PRICE_VALUE } from "@/lib/landing/config";
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
 * - Lead         : clic sur un bouton « Réserver ma place » (WhatsApp d'inscription) ;
 * - Contact      : clic sur « Écrivez-nous sur WhatsApp » (question).
 */
export function MetaPixel() {
  const { watched } = useVideoGate();
  const sent = useRef(false);

  /* ViewContent : une fois par visite, quand la vidéo a été regardée 45 s (ou jusqu'au bout). */
  useEffect(() => {
    if (!watched || sent.current) return;
    sent.current = true;
    track("ViewContent", { content_name: "Vidéo IA PRO 2026", content_category: "VSL" });
  }, [watched]);

  /* Clics vers WhatsApp : Lead (inscription) ou Contact (question). */
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='https://wa.me/']") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.getAttribute("href") === CONTACT_URL) track("Contact");
      else track("Lead", { value: PRICE_VALUE, currency: "XOF", content_name: "Inscription IA PRO 2026" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!META_PIXEL_ID) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
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
