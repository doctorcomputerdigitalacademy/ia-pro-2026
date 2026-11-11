"use client";

import { useEffect, useRef } from "react";

/**
 * Fond interactif du Hero : grille de points qui réagit au passage du curseur
 * (ou du doigt sur mobile). Les points sont poussés dans le sens du mouvement,
 * s'illuminent dans la couleur primaire puis reviennent en place avec un effet ressort.
 * Une onde part du centre au chargement. Reprise de l'effet de la page de référence,
 * réécrite en Canvas 2D. Couleurs lues dans les variables CSS (aucune couleur en dur).
 *
 * prefers-reduced-motion : grille statique, sans interaction.
 */

type Props = {
  /** Variables CSS des couleurs : points au repos / points activés */
  baseVar?: string;
  activeVar?: string;
  dotSize?: number;
  gap?: number;
  /** Rayon d'influence du pointeur (px) */
  proximity?: number;
  className?: string;
};

const smoother = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
};
const backOut = (t: number) => {
  const r = t - 1;
  return 1 + r * r * (2.9 * r + 1.9);
};

function readRgb(el: HTMLElement, cssVar: string): [number, number, number] {
  el.style.color = `var(${cssVar})`;
  const value = getComputedStyle(el).color;
  el.style.color = "";
  const m = value.match(/[\d.]+/g);
  if (!m || m.length < 3) return [128, 128, 128];
  const nums = m.slice(0, 3).map(Number);
  // color(srgb r g b) renvoie des valeurs entre 0 et 1
  return value.startsWith("color(") ? [nums[0] * 255, nums[1] * 255, nums[2] * 255] : [nums[0], nums[1], nums[2]];
}

export function DotGrid({
  baseVar = "--color-ink-soft",
  activeVar = "--color-primary",
  dotSize = 3,
  gap = 24,
  proximity = 150,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = readRgb(canvas, baseVar);
    const active = readRgb(canvas, activeVar);

    // Paramètres physiques (identiques à la référence)
    const BOUNCE = 0.6;
    const RETURN = 0.8;
    const SWELL = 0.6;
    const STRETCH = 0.5;
    const GLOW = 0.5;
    const FADE = 0.6;
    const BASE_ALPHA = 0.26;
    const zeta = 1 - 0.85 * BOUNCE;
    const omega = 4 / (zeta * RETURN);
    const K = omega * omega;
    const C = 2 * zeta * omega;

    const view = { w: 1, h: 1, ratio: 1, cell: dotSize + gap, reach: 1 };
    let count = 0;
    let homeX = new Float32Array(0);
    let homeY = new Float32Array(0);
    let offX = new Float32Array(0);
    let offY = new Float32Array(0);
    let velX = new Float32Array(0);
    let velY = new Float32Array(0);
    let fade = new Float32Array(0);
    let bucket = new Uint8Array(0);
    const BUCKETS = 8;

    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, time: 0, inside: false, presence: 0 };
    let introStart: number | null = reduced ? null : -1;
    let raf = 0;
    let last = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      view.w = Math.max(1, Math.round(rect.width));
      view.h = Math.max(1, Math.round(rect.height));
      view.ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(view.w * view.ratio);
      canvas.height = Math.round(view.h * view.ratio);

      const cell = Math.max(2, dotSize + gap);
      const cols = Math.max(1, Math.floor((view.w + gap) / cell));
      const rows = Math.max(1, Math.floor((view.h + gap) / cell));
      const x0 = (view.w - (cols * cell - gap)) / 2 + dotSize / 2;
      const y0 = (view.h - (rows * cell - gap)) / 2 + dotSize / 2;
      count = cols * rows;
      homeX = new Float32Array(count);
      homeY = new Float32Array(count);
      offX = new Float32Array(count);
      offY = new Float32Array(count);
      velX = new Float32Array(count);
      velY = new Float32Array(count);
      fade = new Float32Array(count);
      bucket = new Uint8Array(count);
      const edgeBase = FADE * 0.4 * Math.min(view.w, view.h);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = x0 + c * cell;
          const y = y0 + r * cell;
          homeX[i] = x;
          homeY[i] = y;
          const f = smoother(Math.min(x, view.w - x) / edgeBase) * smoother(Math.min(y, view.h - y) / edgeBase);
          fade[i] = f;
          bucket[i] = Math.min(BUCKETS - 1, Math.round(f * (BUCKETS - 1)));
        }
      }
      view.cell = cell;
      view.reach = Math.hypot(view.w, view.h) / 2;
    };

    const step = (dt: number) => {
      const speed = Math.hypot(pointer.vx, pointer.vy);
      const push = pointer.inside ? 6500 * Math.tanh(speed / 900) : 0;
      const dirX = speed > 0.001 ? pointer.vx / speed : 0;
      const dirY = speed > 0.001 ? pointer.vy / speed : 0;
      const sub = Math.min(6, Math.max(1, Math.ceil(dt / (1 / 120))));
      const h = dt / sub;

      for (let i = 0; i < count; i++) {
        let fx = 0;
        let fy = 0;
        if (push > 0) {
          const dx = homeX[i] + offX[i] - pointer.x;
          const dy = homeY[i] + offY[i] - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < proximity) {
            const f = smoother(1 - d / proximity) * push;
            const rx = d > 0.001 ? dx / d : 0;
            const ry = d > 0.001 ? dy / d : 0;
            fx = f * (dirX + rx * 0.6);
            fy = f * (dirY + ry * 0.6);
          }
        }
        for (let s = 0; s < sub; s++) {
          velX[i] += (fx - K * offX[i] - C * velX[i]) * h;
          velY[i] += (fy - K * offY[i] - C * velY[i]) * h;
          offX[i] += velX[i] * h;
          offY[i] += velY[i] * h;
        }
      }
      const decay = 1 - Math.exp(-dt / 0.08);
      pointer.vx -= pointer.vx * decay;
      pointer.vy -= pointer.vy * decay;
      pointer.presence += ((pointer.inside ? 1 : 0) - pointer.presence) * (1 - Math.exp(-dt / 0.2));
    };

    const draw = (now: number) => {
      ctx.setTransform(view.ratio, 0, 0, view.ratio, 0, 0);
      ctx.clearRect(0, 0, view.w, view.h);
      const baseR = dotSize / 2;
      const front = introStart === null ? Infinity : introStart < 0 ? 0 : ((now - introStart) / 1000) * view.reach * 1.25;
      const band = view.cell * 4;

      // Points au repos : regroupés par niveau d'opacité (rapide)
      const resting: number[][] = Array.from({ length: BUCKETS }, () => []);
      const lit: number[] = [];
      const energy = new Float32Array(count);
      const scale = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        let e = Math.min(
          1,
          (Math.hypot(velX[i], velY[i]) / 380) * 0.85 + (Math.hypot(offX[i], offY[i]) / (view.cell * 2.2)) * 0.35,
        );
        if (pointer.presence > 0.001) {
          const d = Math.hypot(homeX[i] + offX[i] - pointer.x, homeY[i] + offY[i] - pointer.y);
          if (d < proximity) e = Math.max(e, smoother(1 - d / proximity) * 0.4 * pointer.presence);
        }
        let sc = 1;
        if (front !== Infinity) {
          const dc = Math.hypot(homeX[i] - view.w / 2, homeY[i] - view.h / 2);
          const p = Math.min(1, Math.max(0, (front - dc) / band));
          sc = p >= 1 ? 1 : Math.max(0, backOut(p));
          e = Math.max(e, Math.sin(p * Math.PI) * 0.6);
        }
        energy[i] = e;
        scale[i] = sc;
        if (e < 0.015 && sc === 1) resting[bucket[i]].push(i);
        else if (sc > 0) lit.push(i);
      }

      for (let b = 0; b < BUCKETS; b++) {
        const list = resting[b];
        if (!list.length) continue;
        const a = BASE_ALPHA * (b / (BUCKETS - 1));
        if (a <= 0.003) continue;
        ctx.fillStyle = `rgba(${base[0]},${base[1]},${base[2]},${a})`;
        ctx.beginPath();
        for (const i of list) {
          const x = homeX[i] + offX[i];
          const y = homeY[i] + offY[i];
          ctx.moveTo(x + baseR, y);
          ctx.arc(x, y, baseR, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      ctx.lineCap = "round";
      for (const i of lit) {
        const e = energy[i];
        const t = Math.min(1, e * 1.2);
        const r = Math.round(base[0] + (active[0] - base[0]) * t);
        const g = Math.round(base[1] + (active[1] - base[1]) * t);
        const bl = Math.round(base[2] + (active[2] - base[2]) * t);
        const alpha = (BASE_ALPHA + (1 - BASE_ALPHA) * t) * fade[i];
        if (alpha <= 0.003) continue;
        const radius = baseR * (1 + SWELL * e) * scale[i];
        const x = homeX[i] + offX[i];
        const y = homeY[i] + offY[i];

        if (e > 0.12) {
          ctx.fillStyle = `rgba(${r},${g},${bl},${alpha * GLOW * e * 0.35})`;
          ctx.beginPath();
          ctx.arc(x, y, radius * (1 + GLOW * e * 2.5), 0, Math.PI * 2);
          ctx.fill();
        }

        const sp = Math.hypot(velX[i], velY[i]);
        const half = Math.min(dotSize * 2, sp * STRETCH * 0.02);
        const color = `rgba(${r},${g},${bl},${alpha})`;
        if (half > 0.4) {
          const dx = (velX[i] / sp) * half;
          const dy = (velY[i] / sp) * half;
          ctx.strokeStyle = color;
          ctx.lineWidth = radius * 2;
          ctx.beginPath();
          ctx.moveTo(x - dx, y - dy);
          ctx.lineTo(x + dx, y + dy);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const settled = (now: number) => {
      if (introStart !== null) {
        if (introStart < 0 || (now - introStart) / 1000 < 1.6) return false;
        introStart = null;
      }
      if (Math.abs(pointer.vx) + Math.abs(pointer.vy) > 1) return false;
      if (Math.abs((pointer.inside ? 1 : 0) - pointer.presence) > 0.002) return false;
      for (let i = 0; i < count; i++) {
        if (Math.abs(offX[i]) > 0.02 || Math.abs(offY[i]) > 0.02 || Math.abs(velX[i]) > 0.5 || Math.abs(velY[i]) > 0.5)
          return false;
      }
      return true;
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (introStart !== null && introStart < 0) introStart = now;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      step(dt);
      draw(now);
      if (!settled(now)) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const track = (clientX: number, clientY: number, stamp: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= view.w && y <= view.h;
      if (inside && pointer.inside && pointer.time) {
        const dt = Math.max(4, stamp - pointer.time) / 1000;
        pointer.vx += ((x - pointer.x) / dt - pointer.vx) * 0.6;
        pointer.vy += ((y - pointer.y) / dt - pointer.vy) * 0.6;
      } else {
        pointer.vx = 0;
        pointer.vy = 0;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.time = stamp;
      if (inside !== pointer.inside || inside) {
        pointer.inside = inside;
        kick();
      }
    };
    const leave = () => {
      pointer.inside = false;
      pointer.time = 0;
      kick();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // le tactile passe par touchmove
      track(e.clientX, e.clientY, e.timeStamp || performance.now());
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) leave();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) track(t.clientX, t.clientY, e.timeStamp || performance.now());
    };

    build();
    draw(performance.now());

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
      kick();
    });
    ro.observe(canvas);

    if (reduced) {
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else kick();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", leave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", leave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", leave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", leave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [baseVar, activeVar, dotSize, gap, proximity]);

  return (
    <div className={className ?? "lp-hero-bg"} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
