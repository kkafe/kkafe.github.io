import { useEffect, useState } from 'react';

/** Renvoie l'id de la section affichée au milieu de l'écran (pour surligner le menu). */
export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    let mid: string | null = null;
    let atTop = scrollY < 80;
    let atBottom = false;
    const update = () => setActive(atTop ? null : atBottom ? ids[ids.length - 1] : mid);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && (mid = e.target.id));
        update();
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => observer.observe(el));

    // Haut et bas de page détectés sans mesurer la page à chaque défilement (plus fluide)
    const top = new IntersectionObserver(([e]) => {
      atTop = e.isIntersecting;
      update();
    });
    const topEl = document.getElementById('top');
    if (topEl) top.observe(topEl);
    const footer = document.querySelector('footer');
    const bottom = new IntersectionObserver(([e]) => {
      atBottom = e.isIntersecting;
      update();
    }, { threshold: 0.6 });
    if (footer) bottom.observe(footer);

    return () => {
      observer.disconnect();
      top.disconnect();
      bottom.disconnect();
    };
  }, [ids]);
  return active;
}
