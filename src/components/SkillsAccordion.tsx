/*
 * Mes six compétences, en accordéon.
 * Ordinateur : six colonnes côte à côte, la colonne survolée s'élargit pour présenter la compétence.
 * Téléphone : six lignes empilées, la ligne choisie s'ouvre.
 * Chaque compétence montre ma progression et ses preuves (liens vers les projets et les expériences).
 * Un lien « #competence-… » (depuis une carte de projet) ouvre directement la bonne compétence.
 */
import { m } from 'motion/react';
import { useEffect, useState } from 'react';
import { competences } from '../data/content';
import { ease } from '../animations/variants';

export const OPEN_COMPETENCE_EVENT = 'open-competence';

export default function SkillsAccordion() {
  const [active, setActive] = useState(0);

  // Ouvre la compétence demandée par un lien (#competence-…) ou par une carte de projet
  useEffect(() => {
    const openFromId = (id: string) => {
      const i = competences.findIndex((c) => c.id === id);
      if (i >= 0) setActive(i);
    };
    const fromHash = () => {
      const match = location.hash.match(/^#competence-(.+)$/);
      if (match) openFromId(match[1]);
    };
    const fromEvent = (e: Event) => openFromId((e as CustomEvent<string>).detail);
    fromHash();
    window.addEventListener('hashchange', fromHash);
    window.addEventListener(OPEN_COMPETENCE_EVENT, fromEvent);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      window.removeEventListener(OPEN_COMPETENCE_EVENT, fromEvent);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 md:h-[36rem] md:flex-row">
      {competences.map((c, i) => {
        const on = i === active;
        return (
          <div
            key={c.id}
            id={`competence-${c.id}`}
            // Ouverture au survol de la souris (le clic et le clavier marchent toujours, utiles sur téléphone)
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
            style={{ flexGrow: on ? 9 : 1 }}
            className={`relative min-w-0 scroll-mt-24 overflow-hidden rounded-2xl border transition-[flex-grow,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:basis-0 ${
              on ? 'border-accent bg-accent text-on-accent' : 'border-line bg-surface hover:bg-accent-soft'
            }`}
          >
            {/* En-tête cliquable */}
            <button
              type="button"
              id={`competence-btn-${c.id}`}
              aria-expanded={on}
              aria-controls={`competence-panel-${c.id}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left md:h-full md:flex-col md:items-start md:justify-end md:py-6 ${
                on ? 'md:pointer-events-none md:absolute md:inset-0 md:opacity-0' : ''
              }`}
            >
              <span className="text-[1.15rem] font-medium md:rotate-180 md:[writing-mode:vertical-rl]">{c.verb}</span>
            </button>

            {/* Contenu de la compétence ouverte */}
            {on && (
              <m.div
                id={`competence-panel-${c.id}`}
                role="region"
                aria-labelledby={`competence-btn-${c.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease }}
                className="flex flex-col gap-6 px-5 pb-6 md:h-full md:min-w-[30rem] md:overflow-y-auto md:px-8 md:py-7"
              >
                <div>
                  <h3 className="hidden text-[clamp(2.2rem,1.7rem+1.6vw,3rem)] leading-none font-semibold tracking-[-0.02em] md:block">{c.verb}</h3>
                  <p className="text-[1.2rem] leading-snug font-medium md:mt-3">{c.title}</p>
                  <p className="mt-1 max-w-lg opacity-85">{c.text}</p>
                </div>

                <div>
                  <h4 className="text-[0.95rem] font-semibold">Mon évolution</h4>
                  <dl className="mt-2 grid gap-2 text-[0.97rem] sm:grid-cols-2 sm:gap-4">
                    <div className="rounded-lg bg-on-accent/10 p-3">
                      <dt className="text-[0.85rem] font-medium opacity-75">Au départ</dt>
                      <dd className="mt-0.5 leading-snug">{c.before}</dd>
                    </div>
                    <div className="rounded-lg bg-on-accent/15 p-3">
                      <dt className="text-[0.85rem] font-medium opacity-75">Aujourd’hui</dt>
                      <dd className="mt-0.5 leading-snug">{c.now}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-[0.95rem] font-semibold">Ce qui le prouve</h4>
                  <ul className="mt-2 grid gap-2 text-[0.97rem]">
                    {c.proofs.map((p) => {
                      const external = p.href.startsWith('http');
                      return (
                        <li key={p.label + p.href} className="leading-snug">
                          <a
                            href={p.href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="font-semibold underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current"
                          >
                            {p.label}
                            {external && <span className="sr-only"> (nouvel onglet)</span>}
                          </a>
                          <span className="opacity-85"> : {p.comment}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {c.note && <p className="border-l-2 border-current/40 pl-3 text-[0.95rem] opacity-85">{c.note}</p>}
              </m.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
