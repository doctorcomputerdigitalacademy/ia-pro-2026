"use client";

import { useCallback, useEffect, useState } from "react";
import { saveConsent, useConsent, useConsentOpen } from "@/lib/landing/consent";

/**
 * BANDEAU COOKIES — discret : il n'apparaît qu'une fois le visiteur arrivé en bas de page
 * (pied de page visible), pour ne pas freiner la lecture.
 * Le Pixel Meta est actif par défaut ; « Refuser » l'arrête, « Accepter » confirme.
 * Le choix peut être changé à tout moment depuis le pied de page.
 */
export function CookieConsent() {
  const { consent, ready } = useConsent();
  const [forced, setForced] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  useConsentOpen(useCallback(() => setForced(true), []));

  /* Affichage quand le pied de page entre dans l'écran */
  useEffect(() => {
    if (!ready || consent !== null || atBottom) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) setAtBottom(true);
    });
    const watch = () => document.querySelectorAll("footer").forEach((f) => io.observe(f));
    watch();
    /* le pied de page peut apparaître après coup (contenu chargé plus tard) */
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [ready, consent, atBottom]);

  if (!ready) return null;
  if (!forced && (consent !== null || !atBottom)) return null;

  const choose = (v: "granted" | "denied") => {
    saveConsent(v);
    setForced(false);
  };

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-text" className="lp-cookie">
      <p id="cookie-title" className="lp-cookie__title">
        Cookies et mesure d&apos;audience
      </p>
      <p id="cookie-text" className="lp-cookie__text">
        Nous utilisons le Pixel Meta (Facebook, Instagram) pour mesurer l&apos;efficacité de nos publicités. Vous pouvez l&apos;accepter ou le refuser. Les statistiques de visite du site, elles, sont anonymes et sans cookie.{" "}
        <a href="/politique-de-confidentialite#cookies">En savoir plus</a>
      </p>
      <div className="lp-cookie__actions">
        <button type="button" className="lp-cookie__btn" onClick={() => choose("denied")}>
          Refuser
        </button>
        <button type="button" className="lp-cookie__btn is-main" onClick={() => choose("granted")}>
          Accepter
        </button>
      </div>
    </div>
  );
}
