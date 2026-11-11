import { cn } from "@/lib/utils";
import { parseHighlight, toneClass } from "@/lib/landing/highlight";

/** Affiche un texte avec mises en valeur [[primaire]] / {{secondaire}}. */
export function Rich({ text, strong = true }: { text: string; strong?: boolean }) {
  return (
    <>
      {parseHighlight(text).map((segment, i) =>
        segment.tone === "ink" ? (
          <span key={i}>{segment.text}</span>
        ) : (
          <span key={i} className={cn(toneClass[segment.tone], strong && "font-medium")}>
            {segment.text}
          </span>
        ),
      )}
    </>
  );
}
