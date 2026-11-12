import type { IlluKind } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";

/**
 * Petites illustrations animées, dessinées en code (aucune image), placées en bas
 * des cartes du programme. Couleurs : variables de la charte uniquement.
 */
export function Illu({ kind, tone = "blue" }: { kind: IlluKind; tone?: "blue" | "red" }) {
  return (
    <div className={cn("v2-illu", `v2-illu--${kind}`, tone === "red" && "is-red")} aria-hidden="true">
      {kind === "chat" && (
        <>
          <span className="b b--me">Résume ce rapport</span>
          <span className="b b--ai">
            <i />
            <i />
            <i />
          </span>
        </>
      )}
      {kind === "prompt" && (
        <div className="win">
          <span className="ln w80">
            <em>Rôle</em>
          </span>
          <span className="ln w60">
            <em>Contexte</em>
          </span>
          <span className="ln w90">
            <em>Format</em>
          </span>
          <span className="caret" />
        </div>
      )}
      {kind === "docs" && (
        <div className="stack">
          <span className="doc d1" />
          <span className="doc d2" />
          <span className="doc d3">
            <i />
            <i />
            <i />
          </span>
        </div>
      )}
      {kind === "slides" && (
        <div className="win bars">
          {[40, 62, 50, 78, 92].map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      )}
      {kind === "skill" && (
        <div className="grid4">
          <span />
          <span className="on" />
          <span />
          <span />
        </div>
      )}
      {kind === "project" && (
        <div className="folders">
          <span className="f f1" />
          <span className="f f2" />
          <span className="f f3" />
        </div>
      )}
      {kind === "image" && (
        <div className="gal">
          <span />
          <span className="on" />
          <span />
        </div>
      )}
      {kind === "poster" && (
        <div className="poster">
          <b>PROMO</b>
          <span />
        </div>
      )}
      {kind === "character" && (
        <div className="faces">
          <span />
          <span />
          <span />
        </div>
      )}
      {kind === "script" && (
        <div className="board">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      )}
      {kind === "video" && (
        <div className="win player">
          <span className="play" />
          <span className="prog" />
        </div>
      )}
      {kind === "voice" && (
        <div className="wave">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />
          ))}
        </div>
      )}
      {kind === "edit" && (
        <div className="tl">
          <span className="c1" />
          <span className="c2" />
          <span className="c3" />
          <span className="head" />
        </div>
      )}
    </div>
  );
}
