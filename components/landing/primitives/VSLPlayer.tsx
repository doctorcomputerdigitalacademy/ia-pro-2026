"use client";

import { useState } from "react";
import { PlayIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type VSLPlayerProps = {
  /** Lien YouTube, Vimeo ou fichier .mp4. Vide = placeholder. */
  src?: string;
  /** Image d'aperçu optionnelle */
  poster?: string;
  /** Texte affiché sur le lecteur */
  title: string;
  /** Petit libellé en haut à gauche */
  kicker?: string;
  className?: string;
};

type Source =
  | { kind: "youtube"; embed: string }
  | { kind: "vimeo"; embed: string }
  | { kind: "file"; url: string }
  | { kind: "none" };

function resolve(src?: string): Source {
  if (!src) return { kind: "none" };
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube", embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1` };
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "vimeo", embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  return { kind: "file", url: src };
}

/**
 * Lecteur vidéo 16:9. La vidéo n'est chargée qu'au clic (performance mobile).
 */
export function VSLPlayer({ src, poster, title, kicker = "Présentation vidéo", className }: VSLPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const source = resolve(src);
  const hasVideo = source.kind !== "none";

  return (
    <div className={cn("lp-card lp-vsl relative aspect-video w-full overflow-hidden rounded-[22px] p-0 md:rounded-[28px]", className)}>
      {playing && source.kind === "file" ? (
        <video className="absolute inset-0 size-full bg-black object-contain" src={source.url} poster={poster || undefined} controls autoPlay playsInline>
          <track kind="captions" />
        </video>
      ) : playing && (source.kind === "youtube" || source.kind === "vimeo") ? (
        <iframe
          className="absolute inset-0 size-full"
          src={source.embed}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      ) : (
        <>
          {/* Fond décoratif */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--color-primary) 20%, transparent), transparent 55%), radial-gradient(circle at 85% 90%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 50%), var(--color-surface)",
            }}
          />
          <div aria-hidden="true" className="lp-vsl__grid absolute inset-0" />
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          ) : null}

          <span className="absolute left-3 top-3 hidden items-center sm:inline-flex gap-2 rounded-full border border-line bg-surface/90 px-3 py-1 text-[12px] font-medium tracking-wide text-ink-soft backdrop-blur md:left-5 md:top-5 md:text-[13px]">
            <span className="lp-dot" aria-hidden="true" />
            {kicker}
          </span>

          {hasVideo ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6"
              aria-label={`Lire la vidéo : ${title}`}
            >
              <span className="lp-play">
                <Icon icon={PlayIcon} size={34} strokeWidth={2} className="translate-x-[2px]" />
              </span>
              <span className="px-6 text-center text-[15px] font-medium text-ink md:text-xl">{title}</span>
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6" role="img" aria-label={`${title} (vidéo bientôt disponible)`}>
              <span className="lp-play" aria-hidden="true">
                <Icon icon={PlayIcon} size={34} strokeWidth={2} className="translate-x-[2px]" />
              </span>
              <span className="px-6 text-center text-[15px] font-medium text-ink md:text-xl">{title}</span>
              <span className="-mt-2 text-[13px] text-ink-soft">Vidéo bientôt disponible</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
