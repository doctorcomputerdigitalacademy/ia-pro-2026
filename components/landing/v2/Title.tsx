import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

function Words({ text, className, start }: { text: string; className?: string; start: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={cn("rv-w whitespace-pre", className)} style={{ "--i": start + i } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </>
  );
}

/**
 * Titre en deux tons (façon ghostdesignco) : 1re phrase foncée, 2e atténuée.
 * Les mots montent un à un à l'entrée dans l'écran (en CSS, voir [data-rv] .rv-w).
 */
export function Title({
  line1,
  line2,
  as = "h2",
  className,
  muted = "text-v2-muted",
  after,
  breakLine = true,
}: {
  line1: string;
  line2?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  muted?: string;
  after?: ReactNode;
  breakLine?: boolean;
}) {
  const Tag = as;
  const n1 = line1.split(" ").length;
  return (
    <Tag data-rv="" className={cn("v2-title", className)}>
      <Words text={line1} start={0} />
      {line2 ? (
        <>
          {breakLine ? <br /> : null}
          <Words text={line2} className={muted} start={n1} />
        </>
      ) : null}
      {after}
    </Tag>
  );
}
