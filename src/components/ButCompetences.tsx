/*
 * Les 6 compétences du BUT Informatique.
 * À gauche, une pile de touches inclinées en 3D (une par compétence) ; à droite, la compétence choisie.
 */
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { butSkills } from '../data/content';
import { ease } from './motion';

export default function ButCompetences() {
  const [active, setActive] = useState(0);
  const skill = butSkills[active];

  // Flèches du clavier pour passer d'une compétence à l'autre (comportement standard des onglets)
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + butSkills.length) % butSkills.length;
    setActive(next);
    document.getElementById(`but-tab-${next}`)?.focus();
  };

  return (
    <div className="grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16">
      {/* Pile de touches inclinée */}
      <div className="[perspective:1100px]">
        <div
          role="tablist"
          aria-label="Compétences du BUT"
          aria-orientation="vertical"
          onKeyDown={onKey}
          className="mx-auto grid max-w-[18rem] gap-3 sm:max-w-[22rem] rounded-[1.6rem] border border-line bg-subtle p-4 shadow-[0_40px_60px_-30px_rgba(29,28,26,0.35)] [transform:rotateX(18deg)_rotateZ(-7deg)] dark:bg-surface"
        >
          {butSkills.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.code}
                id={`but-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="but-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`cursor-pointer rounded-xl px-5 py-3 text-[1.05rem] font-medium tracking-[0.02em] transition-all duration-200 ${
                  on
                    ? 'translate-y-[3px] bg-accent text-on-accent shadow-[0_3px_0_0_rgba(0,0,0,0.35)]'
                    : 'bg-surface text-ink shadow-[0_6px_0_0_var(--color-line)] hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_var(--color-line)] dark:bg-paper'
                }`}
              >
                {s.verb}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compétence choisie */}
      <div id="but-panel" role="tabpanel" aria-labelledby={`but-tab-${active}`} aria-live="polite" className="min-h-[17rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={skill.code}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
          >
            <p className="text-[0.85rem] font-medium tracking-[0.1em] text-accent">{skill.code}</p>
            <h3 className="mt-2 text-[clamp(2.4rem,1.8rem+2.4vw,3.6rem)] leading-none font-semibold tracking-[-0.02em]">{skill.verb}</h3>
            <p className="mt-2 text-[0.95rem] text-muted">{skill.official}</p>
            <p className="mt-6 max-w-md text-[1.3rem] leading-snug">{skill.text}</p>
            <p className="mt-6 max-w-md border-l-2 border-accent pl-4 text-[1rem] text-muted">{skill.example}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
