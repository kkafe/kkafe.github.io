import { useEffect, useState, type RefObject } from 'react';

export type ThemeColors = { paper: string; surface: string; ink: string; muted: string; line: string; accent: string; onAccent: string; dark: boolean };

const read = (el?: Element | null): ThemeColors => {
  const cs = getComputedStyle(el ?? document.documentElement);
  const v = (n: string) => cs.getPropertyValue(n).trim();
  return {
    paper: v('--color-paper'), surface: v('--color-surface'), ink: v('--color-ink'), muted: v('--color-muted'), line: v('--color-line'),
    accent: v('--color-accent'), onAccent: v('--color-on-accent'),
    dark: document.documentElement.classList.contains('dark'),
  };
};

/**
 * Couleurs du thème à l'endroit d'un élément (pour le globe en canvas, qui prend l'ambiance de sa section),
 * relues au changement clair/sombre, une fois le fondu des couleurs terminé.
 */
export default function useThemeColors(ref?: RefObject<Element | null>) {
  const [colors, setColors] = useState<ThemeColors>(() => read(ref?.current));
  useEffect(() => {
    let t: number | undefined;
    const refresh = () => {
      clearTimeout(t);
      t = window.setTimeout(() => setColors(read(ref?.current)), 650);
    };
    setColors(read(ref?.current));
    const obs = new MutationObserver(refresh);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, [ref]);
  return colors;
}

/** '#2e5a88' ou 'rgb(46, 90, 136)' -> 'rgba(46,90,136,0.4)' */
export function rgba(color: string, a: number) {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b] = m[1].split(/[ ,/]+/).map(Number);
    return `rgba(${r},${g},${b},${a})`;
  }
  const h = color.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
