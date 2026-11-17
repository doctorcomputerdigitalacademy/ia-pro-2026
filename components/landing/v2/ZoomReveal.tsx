import type { CSSProperties } from "react";
import { ZOOM } from "@/lib/landing/content.v2";

/**
 * LE PROBLÈME — zoom au défilement (façon ghostdesignco) : un écran bleu grandit
 * jusqu'à remplir la page, puis le texte et les « objections » apparaissent.
 * Animation pilotée par le navigateur (CSS « scroll-driven », voir .v2-zoom dans landing-legal.css) :
 * aucun JavaScript au défilement. Navigateurs plus anciens : la section s'affiche directement.
 */
export function ZoomReveal() {
  return (
    <section className="v2-zoom" aria-labelledby="zoom-title">
      <div className="v2-zoom__sticky">
        <div className="v2-zoom__screen">
          <div className="v2-zoom__text">
            <h2 id="zoom-title" className="v2-title v2-title--light">
              {ZOOM.line1}
              <br />
              <span className="v2-zoom__muted">{ZOOM.line2}</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-[16px] text-surface/80 md:text-[18px]">{ZOOM.text}</p>
          </div>
          <div className="v2-zoom__cards">
            {ZOOM.cards.map((c, i) => (
              <div key={c.label} className={`v2-zoom__card v2-zoom__card--${i}`} style={{ "--r": i % 2 ? "1.5deg" : "-1.5deg" } as CSSProperties}>
                <span>{c.label}</span>
                <p>{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
