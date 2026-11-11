import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  text?: ReactNode;
  className?: string;
};

/** En-tête de section : surtitre, titre lettre par lettre, puis texte (séquence de la référence). */
export function SectionHead({ eyebrow, title, text, className }: SectionHeadProps) {
  return (
    <div className={cn("mx-auto mb-10 max-w-[760px] text-center md:mb-12", className)}>
      <Reveal y={20}>
        <span className="lp-eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitTitle text={title} className="lp-h2 mt-3.5" />
      {text ? (
        <Reveal delay={0.15} y={24}>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] text-ink-soft md:text-lg">{text}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Conteneur centré (largeur max de la référence : 1160px). */
export function Container({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6", narrow ? "max-w-[960px]" : "max-w-[1160px]", className)}>
      {children}
    </div>
  );
}
