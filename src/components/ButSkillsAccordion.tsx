/*
 * Les 6 compétences du BUT Informatique, en accordéon.
 * Ordinateur : six colonnes côte à côte, la colonne survolée s'élargit pour présenter la compétence.
 * Téléphone : six lignes empilées, la ligne choisie s'ouvre.
 */
import { m } from 'motion/react';
import { useState } from 'react';
import { butSkills } from '../data/content';
import { ease } from '../animations/variants';

export default function ButSkillsAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 md:h-[25rem] md:flex-row">
      {butSkills.map((s, i) => {
        const on = i === active;
        const num = s.code.split(' ')[0]; // « C1 »
        return (
          <div
            key={s.code}
            // Ouverture au survol de la souris (le clic et le clavier marchent toujours, utiles sur téléphone)
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
            style={{ flexGrow: on ? 7 : 1 }}
            className={`relative min-w-0 overflow-hidden rounded-2xl border transition-[flex-grow,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:basis-0 ${
              on ? 'border-accent bg-accent text-on-accent' : 'border-line bg-surface hover:bg-accent-soft'
            }`}
          >
            {/* En-tête cliquable */}
            <button
              type="button"
              id={`but-btn-${i}`}
              aria-expanded={on}
              aria-controls={`but-panel-${i}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left md:h-full md:flex-col md:items-start md:justify-between md:py-6 ${
                on ? 'md:pointer-events-none md:absolute md:inset-0 md:opacity-0' : ''
              }`}
            >
              <span className={`text-[0.85rem] font-medium tracking-[0.08em] ${on ? '' : 'text-accent'}`}>{num}</span>
              <span className="text-[1.15rem] font-medium md:rotate-180 md:[writing-mode:vertical-rl]">{s.verb}</span>
            </button>

            {/* Contenu de la compétence ouverte */}
            {on && (
              <m.div
                id={`but-panel-${i}`}
                role="region"
                aria-labelledby={`but-btn-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease }}
                className="flex flex-col px-5 pb-6 md:h-full md:min-w-[24rem] md:justify-between md:px-8 md:py-7"
              >
                <div>
                  <p className="hidden text-[0.85rem] font-medium tracking-[0.1em] opacity-80 md:block">{s.code}</p>
                  <h3 className="hidden text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] leading-none font-semibold tracking-[-0.02em] md:mt-3 md:block">
                    {s.verb}
                  </h3>
                  <p className="text-[0.9rem] opacity-75 md:mt-2">{s.official}</p>
                  <p className="mt-4 max-w-md text-[1.2rem] leading-snug md:mt-6 md:text-[1.35rem]">{s.text}</p>
                </div>
                <p className="mt-5 max-w-md border-l-2 border-current/40 pl-4 text-[0.98rem] opacity-85">{s.example}</p>
              </m.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
