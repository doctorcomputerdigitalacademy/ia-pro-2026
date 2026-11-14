import Image from "next/image";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";

type Props = {
  /** Texte de couverture (ex. « FILMS IA ») */
  cover: string;
  /** Petit libellé au-dessus (ex. « Bonus 1 ») */
  kicker: string;
  icon: IconSvgElement;
  tone: "blue" | "red" | "ink";
  className?: string;
};

function Cover({ cover, kicker, icon, compact }: { cover: string; kicker: string; icon: IconSvgElement; compact?: boolean }) {
  return (
    <div className={cn("v2-mock__cover", compact && "is-compact")}>
      <span className="v2-mock__kicker">{kicker}</span>
      <span className="v2-mock__icon">
        <Icon icon={icon} size={compact ? 16 : 22} strokeWidth={1.8} />
      </span>
      <span className="v2-mock__title">{cover}</span>
      <span className="v2-mock__brand">
        <Image src="/brand/mark.png" alt="" width={16} height={16} className="h-auto w-4" />
        IA PRO 2026
      </span>
    </div>
  );
}

/**
 * Maquette « produit » d'un bonus, 100 % CSS : une boîte en 3D, un ordinateur portable
 * et un téléphone qui affichent la même couverture (inspiré des mockups de scalingacademy.co).
 */
export function BonusMockup({ cover, kicker, icon, tone, className }: Props) {
  return (
    <div className={cn("v2-mock", `v2-mock--${tone}`, className)} aria-hidden="true">
      <div className="v2-mock__laptop">
        <div className="v2-mock__screen">
          <Cover cover={cover} kicker={kicker} icon={icon} />
        </div>
        <div className="v2-mock__base" />
      </div>

      <div className="v2-mock__box">
        <div className="v2-mock__face">
          <Cover cover={cover} kicker={kicker} icon={icon} />
        </div>
        <div className="v2-mock__spine">
          <span>{cover}</span>
        </div>
      </div>

      <div className="v2-mock__phone">
        <div className="v2-mock__phone-screen">
          <Cover cover={cover} kicker={kicker} icon={icon} compact />
        </div>
      </div>
    </div>
  );
}
