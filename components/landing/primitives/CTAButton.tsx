import { cn } from "@/lib/utils";
import { PRICE_LABEL, REGISTRATION_URL } from "@/lib/landing/config";

type CTAButtonProps = {
  label: string;
  /** Libellé plus court affiché sur petit écran (optionnel) */
  shortLabel?: string;
  /** md : bouton principal · sm : header · bar : barre fixe mobile */
  size?: "md" | "sm" | "bar";
  /** Pulsation subtile pour les CTA principaux */
  pulse?: boolean;
  /** Affiche le prix dans le bouton (activé par défaut sur tous les CTA) */
  showPrice?: boolean;
  /** Valeur barrée affichée après le prix (ancrage), ex. « 200 000 » */
  anchor?: string;
  href?: string;
  className?: string;
};

/**
 * Bouton d'appel à l'action unique, utilisé partout sur la page.
 * Style : classe .pb-ai-button dans app/landing.css (modifier le style à cet endroit).
 * Lien et prix : REGISTRATION_URL et PRICE_LABEL dans lib/landing/config.ts.
 */
export function CTAButton({
  label,
  shortLabel,
  size = "md",
  pulse = false,
  showPrice = true,
  anchor,
  href = REGISTRATION_URL,
  className,
}: CTAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "pb-ai-button",
        size === "sm" && "pb-ai-button--sm",
        size === "bar" && "pb-ai-button--bar",
        showPrice && "pb-ai-button--priced",
        pulse && "pb-ai-button--pulse",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2">
        <span>
          {shortLabel ? (
            <>
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </>
          ) : (
            label
          )}
        </span>
      </span>
      {showPrice ? (
        <span className="pb-ai-price">
          <span className="sr-only"> — </span>
          {PRICE_LABEL}
          {anchor ? (
            <s className="pb-ai-anchor">
              <span className="sr-only"> au lieu de </span>
              {anchor}
            </s>
          ) : null}
        </span>
      ) : null}
      <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
    </a>
  );
}
