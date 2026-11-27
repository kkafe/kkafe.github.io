import { useEffect, useRef } from 'react';
import landDots from '../data/globe-land-dots.json';
import type { Trip } from '../data/content';
import useThemeColors, { rgba } from '../hooks/useThemeColors';

const RAD = Math.PI / 180;
// Points des continents, précalculés (longitude, latitude) : on garde le sinus/cosinus de la latitude
const DOTS = (landDots as [number, number][]).map(([lon, lat]) => ({ l: lon * RAD, sp: Math.sin(lat * RAD), cp: Math.cos(lat * RAD) }));

type Props = { trips: Trip[]; homes: Trip[]; focus: Trip | null };

/**
 * Globe en points qui tourne sur lui-même (projection orthographique dessinée en canvas).
 * Glisser pour le faire tourner. Quand une destination est choisie, il pivote pour la centrer.
 */
export default function TravelGlobe({ trips, homes, focus }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const colors = useThemeColors(ref);
  const state = useRef({ lon: 20, lat: 10, target: null as null | { lon: number; lat: number }, drag: null as null | { x: number; y: number; lon: number; lat: number }, idle: 0 });

  // Nouvelle destination choisie : on vise son centre
  useEffect(() => {
    state.current.target = focus ? { lon: focus.lon, lat: Math.max(-35, Math.min(35, focus.lat * 0.85)) } : null;
  }, [focus]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let size = 0, raf = 0, running = true;
    const s = state.current;

    const resize = () => {
      size = canvas.getBoundingClientRect().width;
      canvas.width = canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (lonDeg: number, latDeg: number, R: number) => {
      const l0 = s.lon * RAD, p0 = s.lat * RAD;
      const l = lonDeg * RAD, p = latDeg * RAD;
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l - l0);
      return {
        x: R * Math.cos(p) * Math.sin(l - l0),
        y: -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l - l0)),
        front: cosc,
      };
    };

    const draw = (t: number) => {
      // Rotation : vers la destination choisie, sinon lente rotation automatique
      if (!s.drag) {
        if (s.target) {
          let d = s.target.lon - s.lon;
          d = ((d + 540) % 360) - 180; // le plus court chemin
          s.lon += d * (reduce ? 1 : 0.06);
          s.lat += (s.target.lat - s.lat) * (reduce ? 1 : 0.06);
        } else if (!reduce) {
          s.lon -= 0.06;
          s.lat += (12 - s.lat) * 0.01;
        }
      }

      const c = size / 2;
      const R = size * 0.42;
      ctx.clearRect(0, 0, size, size);

      // Ombre portée douce, puis la sphère aux couleurs de la section
      const shadow = ctx.createRadialGradient(c + R * 0.06, c + R * 0.08, R * 0.9, c + R * 0.06, c + R * 0.08, R * 1.1);
      shadow.addColorStop(0, rgba(colors.dark ? '#000000' : '#1b1b1b', colors.dark ? 0.35 : 0.12));
      shadow.addColorStop(1, rgba('#1b1b1b', 0));
      ctx.fillStyle = shadow;
      ctx.fillRect(0, 0, size, size);
      const sphere = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      sphere.addColorStop(0, colors.surface);
      sphere.addColorStop(1, colors.paper);
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = rgba(colors.ink, 0.15);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Continents en points, plus pâles sur les bords
      const l0 = s.lon * RAD, p0 = s.lat * RAD, sp0 = Math.sin(p0), cp0 = Math.cos(p0);
      const buckets: number[][] = [[], [], [], []];
      for (const d of DOTS) {
        const cl = Math.cos(d.l - l0);
        const cosc = sp0 * d.sp + cp0 * d.cp * cl;
        if (cosc <= 0) continue;
        const x = c + R * d.cp * Math.sin(d.l - l0);
        const y = c - R * (cp0 * d.sp - sp0 * d.cp * cl);
        buckets[Math.min(3, (cosc * 4) | 0)].push(x, y);
      }
      const dot = Math.max(1.4, size / 300);
      buckets.forEach((b, i) => {
        ctx.fillStyle = rgba(colors.ink, 0.18 + i * 0.2);
        for (let k = 0; k < b.length; k += 2) ctx.fillRect(b[k] - dot / 2, b[k + 1] - dot / 2, dot, dot);
      });

      // Repères (Mayotte, Toulouse) : petits cercles
      for (const hm of homes) {
        const p = project(hm.lon, hm.lat, R);
        if (p.front <= 0) continue;
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = 2;
        ctx.fillStyle = colors.paper;
        ctx.beginPath();
        ctx.arc(c + p.x, c + p.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Destinations : carré noir, avec une onde grise qui s'élargit doucement
      const pulse = reduce ? 0.5 : (t / 1800) % 1;
      for (const tr of trips) {
        const p = project(tr.lon, tr.lat, R);
        if (p.front <= 0) continue;
        const x = c + p.x, y = c + p.y;
        const on = focus?.name === tr.name;
        ctx.strokeStyle = rgba(colors.accent, (1 - pulse) * 0.7);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 5 + pulse * (on ? 22 : 13), 0, Math.PI * 2);
        ctx.stroke();
        const sq = on ? 11 : 8;
        ctx.fillStyle = colors.paper;
        ctx.fillRect(x - sq / 2 - 2, y - sq / 2 - 2, sq + 4, sq + 4);
        ctx.fillStyle = colors.accent;
        ctx.fillRect(x - sq / 2, y - sq / 2, sq, sq);

        // Étiquette de la destination choisie : un cartouche noir, comme une légende de magazine
        if (on && p.front > 0.2) {
          const fs = Math.max(13, size / 34);
          ctx.font = `400 ${fs}px "Jost Variable", Jost, sans-serif`;
          const w = ctx.measureText(tr.name).width + fs * 1.4;
          const h = fs * 2;
          const lx = Math.min(size - w - 4, x + 16), ly = y - h - 16;
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x + 4, y - 4);
          ctx.lineTo(lx, ly + h);
          ctx.stroke();
          ctx.fillStyle = colors.accent;
          ctx.fillRect(lx, ly, w, h);
          ctx.fillStyle = colors.onAccent;
          ctx.fillText(tr.name, lx + fs * 0.7, ly + h / 2 + fs * 0.36);
        }
      }

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    // Glisser pour tourner
    const down = (e: PointerEvent) => {
      s.drag = { x: e.clientX, y: e.clientY, lon: s.lon, lat: s.lat };
      s.target = null;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!s.drag) return;
      s.lon = s.drag.lon - (e.clientX - s.drag.x) * 0.35;
      s.lat = Math.max(-60, Math.min(60, s.drag.lat + (e.clientY - s.drag.y) * 0.35));
      if (reduce) draw(0);
    };
    const up = () => {
      s.drag = null;
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    });
    resize();
    io.observe(canvas);
    addEventListener('resize', resize);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, [colors, trips, homes, focus]);

  return <canvas ref={ref} aria-hidden className="aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing" />;
}
