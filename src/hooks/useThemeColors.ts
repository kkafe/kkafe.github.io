import { useEffect, useState } from 'react';

export type ThemeColors = { paper: string; surface: string; ink: string; muted: string; line: string; accent: string; onAccent: string; dark: boolean };

const read = (): ThemeColors => {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string) => cs.getPropertyValue(n).trim();
  return {
    paper: v('--color-paper'), surface: v('--color-surface'), ink: v('--color-ink'), muted: v('--color-muted'), line: v('--color-line'),
    accent: v('--color-accent'), onAccent: v('--color-on-accent'),
    dark: document.documentElement.classList.contains('dark'),
  };
};

/** Couleurs du thème courant (pour le globe en canvas), mises à jour au changement clair/sombre. */
export default function useThemeColors() {
  const [colors, setColors] = useState<ThemeColors>(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setColors(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return colors;
}

/** '#2e5a88' -> 'rgba(46,90,136,0.4)' */
export function rgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
