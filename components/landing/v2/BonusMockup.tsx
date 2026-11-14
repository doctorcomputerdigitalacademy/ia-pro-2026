import Image from "next/image";
import { cn } from "@/lib/utils";

/** Ce qu'affiche l'écran du PC, adapté à chaque bonus */
export type MockScreen =
  | { kind: "library"; thumbs: string[] }
  | { kind: "gallery"; photos: string[] }
  | { kind: "video"; src: string; poster: string };

export type MockData = {
  /** Image de la face de la boîte 3D */
  box: string;
  /** Ou une mosaïque de vraies créations sur la face de la boîte */
  boxMosaic?: string[];
  screen: MockScreen;
};

type Props = {
  /** Nom du bonus sur la boîte (ex. « PUBLICITÉS VIDÉO IA ») */
  cover: string;
  kicker: string;
  tone: "blue" | "red" | "ink";
  data: MockData;
  /** Petite maquette (récapitulatif) : pas de vidéo, images plus légères */
  small?: boolean;
  className?: string;
};

/** Écran « bibliothèque » : catégories + vignettes de modèles (bonus ressources IA) */
function Library({ thumbs, small }: { thumbs: string[]; small?: boolean }) {
  const cats = ["Prompts", "Outils IA", "Templates", "Visuels"];
  return (
    <div className="v2-scr v2-scr--lib">
      <div className="v2-scr__side">
        <span className="v2-scr__logo">IA PRO</span>
        {cats.map((c, i) => (
          <span key={c} className={cn("v2-scr__cat", i === 0 && "is-on")}>
            {c}
          </span>
        ))}
      </div>
      <div className="v2-scr__main">
        <div className="v2-scr__head">
          <span className="v2-scr__h">Ressources IA</span>
          <span className="v2-scr__count">+1 650</span>
        </div>
        <div className="v2-scr__search" />
        <div className="v2-scr__grid">
          {thumbs.slice(0, 6).map((src) => (
            <span key={src} className="v2-scr__thumb">
              <Image src={src} alt="" fill sizes={small ? "40px" : "90px"} className="object-cover" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Écran « galerie photo » : une grande photo + une bande de miniatures (bonus photo-shooting) */
function Gallery({ photos, small }: { photos: string[]; small?: boolean }) {
  return (
    <div className="v2-scr v2-scr--gal">
      <span className="v2-scr__big">
        <Image src={photos[0]} alt="" fill sizes={small ? "120px" : "260px"} className="object-cover" />
        <span className="v2-scr__badge">Généré par IA</span>
      </span>
      <span className="v2-scr__strip">
        {photos.slice(1, 5).map((src) => (
          <span key={src} className="v2-scr__mini">
            <Image src={src} alt="" fill sizes={small ? "30px" : "70px"} className="object-cover" />
          </span>
        ))}
      </span>
    </div>
  );
}

/** Écran « lecteur vidéo » : la vraie pub qui tourne + barre de lecture (bonus publicités vidéo IA) */
function Player({ src, poster, small }: { src: string; poster: string; small?: boolean }) {
  return (
    <div className="v2-scr v2-scr--vid">
      <span className="v2-scr__blur">
        <Image src={poster} alt="" fill sizes="60px" className="object-cover" />
      </span>
      <span className="v2-scr__frame">
        {small ? (
          <Image src={poster} alt="" fill sizes="60px" className="object-cover" />
        ) : (
          <video src={src} poster={poster} muted loop playsInline autoPlay preload="none" className="absolute inset-0 h-full w-full object-cover" />
        )}
      </span>
      <span className="v2-scr__bar">
        <span className="v2-scr__play" />
        <span className="v2-scr__line">
          <i />
        </span>
        <span className="v2-scr__time">0:06</span>
      </span>
    </div>
  );
}

/**
 * Maquette « produit » d'un bonus : une boîte en 3D et un ordinateur portable.
 * La boîte porte le nom du bonus sur une vraie création ; l'écran montre un contenu
 * adapté au bonus (bibliothèque de ressources, galerie photo ou lecteur vidéo).
 */
export function BonusMockup({ cover, kicker, tone, data, small, className }: Props) {
  const s = data.screen;
  return (
    <div className={cn("v2-mock", `v2-mock--${tone}`, className)} aria-hidden="true">
      <div className="v2-mock__laptop">
        <div className="v2-mock__screen">
          {s.kind === "library" ? <Library thumbs={s.thumbs} small={small} /> : null}
          {s.kind === "gallery" ? <Gallery photos={s.photos} small={small} /> : null}
          {s.kind === "video" ? <Player src={s.src} poster={s.poster} small={small} /> : null}
        </div>
        <div className="v2-mock__base" />
      </div>

      <div className="v2-mock__box">
        <div className="v2-mock__face">
          {data.boxMosaic ? (
            <span className="v2-mock__mosaic">
              {data.boxMosaic.slice(0, 6).map((src) => (
                <span key={src}>
                  <Image src={src} alt="" fill sizes={small ? "40px" : "90px"} className="object-cover" />
                </span>
              ))}
            </span>
          ) : (
            <Image src={data.box} alt="" fill sizes={small ? "90px" : "190px"} className="object-cover" />
          )}
          <span className="v2-mock__band is-box">
            <span className="v2-mock__kicker">{kicker}</span>
            <span className="v2-mock__title">{cover}</span>
            <span className="v2-mock__brand">IA PRO 2026</span>
          </span>
        </div>
        <div className="v2-mock__spine">
          <span>{cover}</span>
        </div>
      </div>
    </div>
  );
}
