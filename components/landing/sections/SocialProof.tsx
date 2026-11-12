import Image from "next/image";
import { Image01Icon, QuoteUpIcon } from "@hugeicons/core-free-icons";
import { PHOTO_BADGE, photos, testimonials } from "@/lib/landing/content.fr";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";

/* ==========================================================================
   TÉMOIGNAGES — carrousel défilant en boucle infinie sur deux lignes.
   Ligne 1 : de droite à gauche · Ligne 2 : de gauche à droite.
   Données : testimonials[] dans lib/landing/content.fr.ts.
   Chaque ligne est dupliquée (copie masquée aux lecteurs d'écran) pour une boucle sans coupure.
   Pause au survol ; défilement manuel si l'utilisateur réduit les animations.
   ========================================================================== */

type Testimonial = (typeof testimonials)[number];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .replace(/[^A-Za-zÀ-ÿ]/g, "")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="lp-card lp-testimonial flex h-full flex-col p-6">
      <span className="lp-icon-chip">
        <Icon icon={QuoteUpIcon} size={16} strokeWidth={1.9} />
      </span>
      <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-ink">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          aria-hidden="true"
          className="lp-icon-tile size-10 rounded-full text-[14px] font-semibold tracking-wide"
        >
          <span className="relative z-[1]">{initials(t.name)}</span>
        </span>
        <span className="min-w-0">
          <span className="block font-medium leading-tight text-ink">{t.name}</span>
          <span className="block truncate text-[13.5px] text-ink-soft">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ items, reverse, duration }: { items: Testimonial[]; reverse?: boolean; duration: string }) {
  return (
    <div
      className={cn("lp-marquee", reverse && "lp-marquee--reverse")}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <ul className="lp-marquee__track">
        {items.map((t, i) => (
          <li key={`${t.name}-${i}`} className="flex">
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
      <ul className="lp-marquee__track" aria-hidden="true">
        {items.map((t, i) => (
          <li key={`${t.name}-${i}`} className="flex">
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TestimonialsMarquee() {
  if (testimonials.length === 0) return null;
  const half = Math.ceil(testimonials.length / 2);
  // Avec peu de témoignages, chaque ligne répète sa série pour rester plus large que l'écran (boucle sans trou)
  const fill = (list: Testimonial[]) => Array.from({ length: Math.max(1, Math.ceil(8 / Math.max(1, list.length))) }, () => list).flat();
  const rowA = fill(testimonials.slice(0, half));
  const rowB = fill(testimonials.slice(half));

  return (
    <div className="space-y-4 md:space-y-5" role="region" aria-label="Témoignages des anciens apprenants">
      <MarqueeRow items={rowA} duration="80s" />
      {rowB.length ? <MarqueeRow items={rowB} reverse duration="90s" /> : null}
    </div>
  );
}

/* ==========================================================================
   MUR DE PHOTOS — deux lignes qui défilent en sens opposés (façon oskool).
   Données : photos[] dans lib/landing/content.fr.ts. Vide = emplacements à remplir.
   ========================================================================== */
type Photo = { src: string; alt: string } | null;

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  return (
    <figure className="lp-photo">
      {photo ? (
        <Image src={photo.src} alt={photo.alt} fill sizes="200px" className="object-cover" />
      ) : (
        <div className="lp-photo__empty">
          <Icon icon={Image01Icon} size={26} />
          <span>Photo à venir n°{index + 1}</span>
        </div>
      )}
      <figcaption className="lp-photo__badge">
        <span className="lp-dot" aria-hidden="true" />
        {PHOTO_BADGE}
      </figcaption>
    </figure>
  );
}

function PhotoRow({ items, reverse, offset }: { items: Photo[]; reverse?: boolean; offset: number }) {
  return (
    <div className={cn("lp-marquee", reverse && "lp-marquee--reverse")} style={{ "--marquee-duration": "60s" } as React.CSSProperties}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="lp-marquee__track" aria-hidden={copy === 1 ? true : undefined}>
          {items.map((p, i) => (
            <li key={i} className="flex">
              <PhotoCard photo={p} index={offset + i} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function PhotoWall() {
  if (photos.length === 0) return null;
  // Chaque ligne affiche toutes les photos (ordre décalé sur la 2e ligne) : aucun vide
  // La série est répétée pour que chaque ligne soit plus large que l'écran (boucle sans trou)
  const repeat = Math.max(2, Math.ceil(12 / photos.length));
  const rowA: Photo[] = Array.from({ length: repeat }, () => photos).flat();
  const shift = Math.floor(photos.length / 2);
  const rotated = [...photos.slice(shift), ...photos.slice(0, shift)];
  const rowB: Photo[] = Array.from({ length: repeat }, () => rotated).flat();
  return (
    <div className="space-y-3 md:space-y-4" role="region" aria-label="Photos de nos anciens apprenants">
      <PhotoRow items={rowA} offset={0} />
      <PhotoRow items={rowB} reverse offset={0} />
    </div>
  );
}
