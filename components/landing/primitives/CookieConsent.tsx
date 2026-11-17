"use client";

import { useCallback, useState } from "react";
import { saveConsent, useConsent, useConsentOpen } from "@/lib/landing/consent";

/**
 * BANDEAU COOKIES — s'affiche tant que le visiteur n'a pas choisi.
 * Accepter : le Pixel Meta est chargé (mesure des publicités).
 * Refuser : aucun cookie publicitaire. Le choix peut être changé depuis le pied de page.
 */
export function CookieConsent() {
  const { consent, ready } = useConsent();
  const [forced, setForced] = useState(false);
  useConsentOpen(useCallback(() => setForced(true), []));

  if (!ready || (consent !== null && !forced)) return null;

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
        Avec votre accord, nous utilisons le Pixel Meta (Facebook, Instagram) pour mesurer l&apos;efficacité de nos publicités. Les statistiques de visite du site, elles, sont anonymes et sans cookie.{" "}
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
