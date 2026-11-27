import { useEffect } from 'react';

/*
 * Ambiance de couleurs selon la section au centre de l'écran.
 * Chaque section porte son ambiance dans l'attribut data-mood (couleurs définies dans index.css) ;
 * on la recopie sur <html>, et toute la page change de couleurs en fondu.
 * Une section sans data-mood (accueil, contact) garde les couleurs du CV.
 */
export default function useMood() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    let active: HTMLElement | null = null;

    const apply = () => {
      const mood = active?.dataset.mood;
      if (mood) root.dataset.mood = mood;
      else delete root.dataset.mood;
    };

    // La section qui traverse la bande centrale de l'écran devient la section active
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active = e.target as HTMLElement;
        apply();
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((s) => io.observe(s));

    // Une section peut changer d'ambiance (onglets des Loisirs)
    const mo = new MutationObserver(apply);
    sections.forEach((s) => mo.observe(s, { attributes: true, attributeFilter: ['data-mood'] }));

    return () => {
      io.disconnect();
      mo.disconnect();
      delete root.dataset.mood;
    };
  }, []);
}
