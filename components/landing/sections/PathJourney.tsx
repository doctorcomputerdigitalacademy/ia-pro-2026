"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Flag02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { PROBLEM } from "@/lib/landing/content.fr";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";

/**
 * « Ce que vous pourriez accomplir » : les 8 cartes sont reliées par un chemin vert
 * qui serpente (aller sur la 1re rangée, demi-tour, retour sur la 2e rangée…)
 * jusqu'au point d'arrivée (bénéfices + valeurs).
 * Un repère avance sur le chemin au rythme du scroll et allume chaque étape franchie.
 *
 * Le tracé est calculé à partir de la position réelle des cartes (il s'adapte à
 * toutes les largeurs d'écran) : 4 colonnes sur ordinateur, 2 sur tablette,
 * 1 sur mobile (le chemin s'enroule alors autour de chaque carte).
 */

type Geometry = {
  d: string;
  width: number;
  height: number;
  start: { x: number; y: number };
  stubs: { index: number; x: number; y1: number; y2: number }[];
  /** position de chaque étape sur le chemin (0 → 1) */
  stops: number[];
};

const COLS = { sm: 2, lg: 4 };

/** Placement en serpentin : les rangées impaires se lisent de droite à gauche. */
function snakePlacement(i: number, cols: number) {
  const row = Math.floor(i / cols);
  const pos = i % cols;
  return { row: row + 1, col: (row % 2 === 0 ? pos : cols - 1 - pos) + 1 };
}

export function PathJourney() {
  const items = PROBLEM.possibilities;
  const wrapRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const [geo, setGeo] = useState<Geometry | null>(null);
  const [reached, setReached] = useState(0);
  const [arrived, setArrived] = useState(false);
  const reduced = useReducedMotion();

  const travelerX = useMotionValue(0);
  const travelerY = useMotionValue(0);

  /* ---------------------------------------------------------- calcul du tracé */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const arrival = arrivalRef.current;
    if (!wrap || !arrival) return;
    const base = wrap.getBoundingClientRect();
    const rects = cardRefs.current
      .map((el, index) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { index, left: r.left - base.left, right: r.right - base.left, top: r.top - base.top, bottom: r.bottom - base.top };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
    if (!rects.length) return;

    // Regroupe les cartes par rangée (même hauteur)
    const rows: (typeof rects)[] = [];
    [...rects]
      .sort((a, b) => a.top - b.top)
      .forEach((r) => {
        const row = rows.find((g) => Math.abs(g[0].top - r.top) < 8);
        if (row) row.push(r);
        else rows.push([r]);
      });

    const wide = base.width >= 640;
    const bulge = wide ? 62 : 28; // ampleur des demi-tours
    const rowGap = rows.length > 1 ? rows[1][0].top - rows[0].reduce((m, r) => Math.max(m, r.bottom), 0) : 64;
    const laneOffset = rowGap / 2;

    const a = arrival.getBoundingClientRect();
    const arr = { cx: (a.left + a.right) / 2 - base.left, top: a.top - base.top };

    const parts: string[] = [];
    const anchors: { index: number; x: number; y: number; top: number }[] = [];
    let start = { x: 0, y: 0 };

    rows.forEach((row, r) => {
      const dir = r % 2 === 0 ? 1 : -1; // 1 : gauche → droite
      const lane = row[0].top - laneOffset;
      const xL = Math.min(...row.map((c) => c.left));
      const xR = Math.max(...row.map((c) => c.right));
      const from = dir === 1 ? xL : xR;
      const to = dir === 1 ? xR : xL;
      if (r === 0) {
        start = { x: from, y: lane };
        parts.push(`M ${from} ${lane}`);
      }
      parts.push(`L ${to} ${lane}`);
      row.forEach((c) => anchors.push({ index: c.index, x: (c.left + c.right) / 2, y: lane, top: c.top }));

      // Demi-tour vers la voie suivante (ou la voie finale sous la dernière rangée)
      const next = rows[r + 1];
      const nextLane = next ? next[0].top - laneOffset : Math.max(...row.map((c) => c.bottom)) + laneOffset;
      const k = bulge / 0.75;
      parts.push(`C ${to + dir * k} ${lane} ${to + dir * k} ${nextLane} ${to} ${nextLane}`);

      if (!next) {
        // Voie finale : on rejoint le centre puis on descend vers le point d'arrivée
        const radius = Math.min(28, Math.abs(arr.top - nextLane) / 2);
        const turnDir = arr.cx > to ? 1 : -1;
        parts.push(`L ${arr.cx - turnDir * radius} ${nextLane}`);
        parts.push(`Q ${arr.cx} ${nextLane} ${arr.cx} ${nextLane + radius}`);
        parts.push(`L ${arr.cx} ${arr.top}`);
      }
    });

    const d = parts.join(" ");

    // Position de chaque étape sur le chemin (échantillonnage du tracé)
    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute("d", d);
    const total = probe.getTotalLength();
    const samples = 400;
    const pts = Array.from({ length: samples + 1 }, (_, s) => probe.getPointAtLength((s / samples) * total));
    const stops = items.map((_, index) => {
      const anchor = anchors.find((an) => an.index === index);
      if (!anchor) return 1;
      let best = 0;
      let bestDist = Infinity;
      pts.forEach((p, s) => {
        const dist = Math.hypot(p.x - anchor.x, p.y - anchor.y);
        if (dist < bestDist) {
          bestDist = dist;
          best = s / samples;
        }
      });
      return best;
    });

    setGeo({
      d,
      width: base.width,
      height: base.height,
      start,
      stubs: anchors.map((an) => ({ index: an.index, x: an.x, y1: an.y, y2: an.top })),
      stops,
    });
  }, [items]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* ---------------------------------------------------------- progression au scroll */
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.7", "end 0.85"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 });

  const place = useCallback(
    (p: number) => {
      const path = pathRef.current;
      if (!path || !geo) return;
      const total = path.getTotalLength();
      const pt = path.getPointAtLength(Math.min(1, Math.max(0, p)) * total);
      travelerX.set(pt.x);
      travelerY.set(pt.y);
      const count = geo.stops.filter((s) => p >= s - 0.004).length;
      setReached((prev) => (prev === count ? prev : count));
      const done = p >= 0.985;
      setArrived((prev) => (prev === done ? prev : done));
    },
    [geo, travelerX, travelerY],
  );

  useMotionValueEvent(progress, "change", (p) => {
    if (!reduced) place(p);
  });

  useEffect(() => {
    place(reduced ? 1 : progress.get());
  }, [geo, reduced, place, progress]);

  return (
    <div ref={wrapRef} className="lp-path relative">
      {/* Tracé du chemin (décoratif) */}
      {geo ? (
        <svg
          className="lp-path__svg"
          width={geo.width}
          height={geo.height}
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          aria-hidden="true"
        >
          <path d={geo.d} className="lp-path__road" />
          <path d={geo.d} className="lp-path__dash" />
          {geo.stubs.map((s) => (
            <line
              key={s.index}
              x1={s.x}
              y1={s.y1}
              x2={s.x}
              y2={s.y2}
              className={cn("lp-path__stub", reached > s.index && "is-on")}
            />
          ))}
          <motion.path
            ref={pathRef}
            d={geo.d}
            className="lp-path__trail"
            style={{ pathLength: reduced ? 1 : progress }}
          />
          <circle cx={geo.start.x} cy={geo.start.y} r={7} className="lp-path__start" />
        </svg>
      ) : null}

      {geo ? (
        <span
          className="lp-path__start-label"
          style={{ left: geo.start.x, top: geo.start.y }}
          aria-hidden="true"
        >
          {PROBLEM.pathStart}
        </span>
      ) : null}

      {/* Repère qui avance sur le chemin */}
      {geo ? (
        <motion.span className="lp-path__traveler" style={{ x: travelerX, y: travelerY }} aria-hidden="true">
          <span />
        </motion.span>
      ) : null}

      {/* Étapes */}
      <ol className="lp-path__grid">
        {items.map((item, i) => {
          const sm = snakePlacement(i, COLS.sm);
          const lg = snakePlacement(i, COLS.lg);
          const on = reached > i;
          return (
            <li
              key={item.text}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="lp-path__item"
              style={{ "--r2": sm.row, "--c2": sm.col, "--r4": lg.row, "--c4": lg.col } as CSSProperties}
              data-on={on}
            >
              <span className="lp-path__step" aria-hidden="true">
                {on ? <Icon icon={Tick02Icon} size={14} strokeWidth={2.6} /> : String(i + 1).padStart(2, "0")}
              </span>
              <div className="lp-card lp-path__card flex h-full items-start gap-4 p-5 sm:flex-col md:p-6">
                <span className="lp-icon-tile">
                  <Icon icon={item.icon} />
                </span>
                <p className="text-[16px] leading-snug text-ink">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {item.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Point d'arrivée : bénéfices et valeurs */}
      <div ref={arrivalRef} className="lp-path__arrival" data-on={arrived}>
        <span className="lp-path__flag" aria-hidden="true">
          <Icon icon={Flag02Icon} size={22} strokeWidth={2} />
        </span>
        <div className="lp-card relative overflow-hidden p-6 pt-10 md:p-10 md:pt-12">
          <div className="text-center">
            <span className="lp-eyebrow lp-eyebrow--path">{PROBLEM.arrival.eyebrow}</span>
            <h3 className="lp-h2 mx-auto mt-3 max-w-[640px] text-[clamp(26px,3.4vw,36px)]">{PROBLEM.arrival.title}</h3>
          </div>

          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
            <div className="rounded-[20px] border border-line bg-page p-5 md:p-7">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.12em] text-primary">{PROBLEM.arrival.benefitsTitle}</h4>
              <ul className="mt-4 space-y-3">
                {PROBLEM.arrival.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[16px] text-ink">
                    <span className="lp-icon-chip lp-icon-chip--sm lp-icon-chip--path mt-px">
                      <Icon icon={Tick02Icon} size={15} strokeWidth={2.2} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border border-line bg-page p-5 md:p-7">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.12em] text-secondary">{PROBLEM.arrival.valuesTitle}</h4>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {PROBLEM.arrival.values.map((v) => (
                  <li key={v.title} className="flex items-start gap-3">
                    <span className="lp-icon-chip">
                      <Icon icon={v.icon} size={16} strokeWidth={1.9} />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{v.title}</span>
                      <span className="block text-[14.5px] leading-snug text-ink-soft">{v.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
