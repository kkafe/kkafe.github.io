import { useEffect } from 'react';

/*
 * La barre du haut (et la barre de progression) prennent l'ambiance de couleurs de la section
 * au centre de l'écran. Les sections, elles, portent déjà leurs propres couleurs (index.css) :
 * rien d'autre ne change pendant le défilement, ce qui garde la page fluide.
 */
export default function useMood() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[data-mood]'));
    let active: HTMLElement | null = null;
    let current = '';

    const apply = () => {
      const mood = active?.dataset.mood ?? 'base';
      if (mood === current) return;
      current = mood;
      document.querySelectorAll<HTMLElement>('[data-mood-follow]').forEach((el) => (el.dataset.mood = mood));
    };

    // La section qui traverse le haut de l'écran (sous la barre) devient la section active
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active = e.target as HTMLElement;
        apply();
      },
      { rootMargin: '-70px 0px -85% 0px' },
    );
    sections.forEach((s) => io.observe(s));

    // Une section peut changer d'ambiance (onglets des Loisirs)
    const mo = new MutationObserver(() => {
      current = '';
      apply();
    });
    sections.forEach((s) => mo.observe(s, { attributes: true, attributeFilter: ['data-mood'] }));

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
