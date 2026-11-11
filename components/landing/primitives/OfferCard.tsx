import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CoverTone = "blue" | "red" | "ink";

type OfferCardProps = {
  /** Ex. « Bonus 1 » ou « Module 1 » */
  kicker: string;
  title: string;
  text: string;
  /** Image de couverture (public/…). Vide = couverture générée (texte en grand). */
  image?: string;
  cover: { text: string; tone: CoverTone };
  /** Ligne barrée (ex. « Prix normal : 20 000 FCFA ») */
  strike?: string;
  /** Mention finale (ex. « GRATUIT ») */
  footer?: ReactNode;
  /** « row » : image à gauche, texte à droite (cartes empilées des modules) */
  layout?: "stack" | "row";
  /** Compteur affiché en haut du texte, ex. « 01 / 06 » */
  counter?: string;
  className?: string;
};

/**
 * Carte d'offre (modules et bonus) : grande image en haut, titre centré en gras,
 * description, prix normal barré et mention finale.
 */
export function OfferCard({ kicker, title, text, image, cover, strike, footer, layout = "stack", counter, className }: OfferCardProps) {
  return (
    <article className={cn("lp-offer", layout === "row" && "lp-offer--row", className)}>
      <div className="lp-offer__media">
        {image ? (
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          <div className={cn("lp-offer__cover", `lp-offer__cover--${cover.tone}`)} aria-hidden="true">
            <span className="lp-offer__cover-kicker">{kicker}</span>
            <span className="lp-offer__cover-text">{cover.text}</span>
            <span className="lp-offer__cover-brand">
              <Image src="/brand/mark.png" alt="" width={28} height={28} className="h-auto w-7" />
              IA PRO 2026
            </span>
          </div>
        )}
      </div>
      <div className="lp-offer__body">
        {counter ? <span className="lp-offer__counter">{counter}</span> : null}
        <h3 className="lp-offer__title">
          {kicker} : {title}
        </h3>
        <p className="lp-offer__text">{text}</p>
        {strike ? <p className="lp-offer__strike">{strike}</p> : null}
        {footer ? <p className="lp-offer__footer">{footer}</p> : null}
      </div>
    </article>
  );
}
