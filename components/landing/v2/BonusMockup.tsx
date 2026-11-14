import Image from "next/image";
import { cn } from "@/lib/utils";

export type MockImages = {
  /** Image de l'écran de l'ordinateur (paysage) */
  screen: string;
  /** Image de la face de la boîte (portrait) */
  box: string;
  /** Image du téléphone (vertical) */
  phone: string;
  /** Vidéo jouée dans le téléphone (optionnel, muette, en boucle) */
  phoneVideo?: string;
};

type Props = {
  /** Texte de couverture (ex. « FILMS IA ») */
  cover: string;
  /** Petit libellé (ex. « Bonus 1 ») */
  kicker: string;
  tone: "blue" | "red" | "ink";
  images: MockImages;
  /** Taille des images servies (petites maquettes du récapitulatif) */
  small?: boolean;
  className?: string;
};

/**
 * Maquette « produit » d'un bonus : une boîte en 3D, un ordinateur portable et un
 * téléphone qui affichent de VRAIES créations réalisées avec l'IA (public/creations/),
 * avec le nom du bonus en bandeau.
 */
export function BonusMockup({ cover, kicker, tone, images, small, className }: Props) {
  const sz = small ? "160px" : "340px";
  return (
    <div className={cn("v2-mock", `v2-mock--${tone}`, className)} aria-hidden="true">
      <div className="v2-mock__laptop">
        <div className="v2-mock__screen">
          <Image src={images.screen} alt="" fill sizes={sz} className="object-cover" />
          <span className="v2-mock__band">
            <span className="v2-mock__kicker">{kicker}</span>
            <span className="v2-mock__title">{cover}</span>
          </span>
        </div>
        <div className="v2-mock__base" />
      </div>

      <div className="v2-mock__box">
        <div className="v2-mock__face">
          <Image src={images.box} alt="" fill sizes={small ? "90px" : "170px"} className="object-cover" />
          <span className="v2-mock__band is-box">
            <span className="v2-mock__title">{cover}</span>
            <span className="v2-mock__brand">IA PRO 2026</span>
          </span>
        </div>
        <div className="v2-mock__spine">
          <span>{cover}</span>
        </div>
      </div>

      <div className="v2-mock__phone">
        <div className="v2-mock__phone-screen">
          {images.phoneVideo && !small ? (
            <video src={images.phoneVideo} poster={images.phone} muted loop playsInline autoPlay preload="none" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Image src={images.phone} alt="" fill sizes={small ? "40px" : "90px"} className="object-cover" />
          )}
        </div>
      </div>
    </div>
  );
}
