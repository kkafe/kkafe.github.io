import { useEffect, useState } from 'react';

/** Renvoie l'id de la section affichée au milieu de l'écran (pour surligner le menu). */
export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    const onScroll = () => {
      // Tout en haut : rien n'est surligné. Tout en bas : la dernière section.
      if (scrollY < 80) setActive(null);
      else if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) setActive(ids[ids.length - 1]);
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, [ids]);
  return active;
}
