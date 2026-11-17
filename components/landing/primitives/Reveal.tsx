import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "li" | "article" | "p" | "span" | "section";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Décalage vertical de départ en px (par défaut 32) */
  y?: number;
  className?: string;
  as?: Tag;
  /** Conservé pour compatibilité : le seuil d'apparition est commun à toute la page */
  amount?: number;
};

/**
 * Apparition au défilement, en CSS (montée + fondu, une seule fois).
 * Pas de bibliothèque JavaScript ni de flou : c'est beaucoup plus léger sur téléphone.
 * Le déclenchement est assuré par <RevealScript /> (un seul observateur pour toute la page).
 */
export function Reveal({ children, delay = 0, y = 32, className, as = "div" }: RevealProps) {
  const Tag = as;
  const style = { "--rv-y": `${Math.min(y, 32)}px`, transitionDelay: delay ? `${delay}s` : undefined } as CSSProperties;
  return (
    <Tag data-rv="" className={className} style={style}>
      {children}
    </Tag>
  );
}

/**
 * Déclencheur des apparitions : script minuscule exécuté dès la lecture de la page
 * (avant le JavaScript de React). Il ajoute l'attribut `data-in` aux éléments `[data-rv]`
 * quand ils entrent dans l'écran. Sans JavaScript, tout reste visible.
 */
const SCRIPT = `(function(){var d=document.documentElement;if(!('IntersectionObserver' in window)){return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-in','');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0});
var seen=new WeakSet();function scan(){document.querySelectorAll('[data-rv]:not([data-in])').forEach(function(el){if(!seen.has(el)){seen.add(el);io.observe(el)}})}
scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});d.setAttribute('data-rv-on','')})();`;

export function RevealScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <noscript>
        <style>{`[data-rv],[data-rv] .rv-w{opacity:1!important;transform:none!important}`}</style>
      </noscript>
    </>
  );
}

/** Apparition au chargement (Hero), séquencée par `delay`. */
export function HeroIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  /* Animation CSS : elle démarre dès l'affichage de la page, sans attendre le JavaScript
     (le haut de page apparaît plus vite sur les téléphones lents). */
  const Tag = as;
  return (
    <Tag className={cn("lp-hero-in", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </Tag>
  );
}
