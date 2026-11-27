/*
 * Loisirs : trois onglets (Voyages, Jeux vidéo, Musique).
 * Les voyages gardent le globe ; les jeux vidéo et la musique ont chacun un petit visuel animé.
 * Textes et préférés à modifier dans data/content.ts (hobbies).
 */
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { hobbies, homes, travels, type Trip } from '../data/content';
import { countryCards } from '../data/cards';
import InfoCard, { type InfoCardData } from '../components/InfoCard';
import { PinIcon } from '../components/Icons';
import Globe from '../components/Globe';
import SectionHeader from '../components/SectionHeader';
import { ease, fadeUp, inView, stagger } from '../components/motion';

const TABS = ['Voyages', 'Jeux vidéo', 'Musique'] as const;
type Tab = (typeof TABS)[number];

function Favorites({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((f) => (
        <li key={f} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.95rem]">
          {f}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Voyages : liste des pays + globe ---------- */
function Voyages() {
  const [focus, setFocus] = useState<Trip | null>(null);
  const [card, setCard] = useState<InfoCardData | null>(null);
  const open = (t: Trip) => {
    setFocus(t);
    setCard({ title: t.name, visual: <PinIcon width={34} height={34} className="text-[#58554c]" />, ...countryCards[t.name] });
  };
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <p className="max-w-md text-[1.1rem] leading-relaxed text-muted">
          Huit destinations, de l’Afrique de l’Ouest à l’océan Indien et à l’Europe. Sélectionnez une destination pour la situer sur le globe et la découvrir.
        </p>
        <motion.ul variants={stagger(0.05)} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-2">
          {travels.map((t) => {
            const on = focus?.name === t.name;
            return (
              <motion.li key={t.name} variants={fadeUp}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-haspopup="dialog"
                  onClick={() => open(t)}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-[0.98rem] transition-colors duration-200 ${on ? 'border-accent bg-accent text-on-accent' : 'border-line bg-surface hover:border-accent/50'}`}
                >
                  {t.name}
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
        <div className="mt-4 min-h-[1.6rem] text-[0.95rem] text-muted" aria-live="polite">
          <AnimatePresence mode="wait">
            {focus && (
              <motion.p key={focus.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                {focus.name}, {focus.region}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <figure className="mx-auto w-full max-w-[480px]">
        <Globe trips={travels} homes={homes} focus={focus} />
      </figure>
      <InfoCard data={card} onClose={() => setCard(null)} />
    </div>
  );
}

/* ---------- Jeux vidéo : manette dessinée qui flotte doucement ---------- */
function Games() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <p className="max-w-md text-[1.2rem] leading-relaxed">{hobbies.games.text}</p>
        <Favorites items={hobbies.games.favorites} />
        <a href="#projets" className="link-line mt-8 inline-block pb-0.5 font-medium text-accent">
          Voir le projet Bomberman
        </a>
      </div>
      <div className="grid aspect-[4/3] place-items-center rounded-3xl border border-line bg-subtle">
        <motion.svg
          viewBox="0 0 200 120"
          className="w-3/5 text-accent"
          aria-hidden="true"
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M55 20h90c22 0 32 14 38 38l8 34c4 18-12 28-26 16l-20-18H55L35 108c-14 12-30 2-26-16l8-34c6-24 16-38 38-38Z"
            fill="currentColor"
          />
          {/* Croix directionnelle */}
          <path d="M52 48h10v10h10v10H62v10H52V68H42V58h10Z" className="fill-paper" />
          {/* Boutons */}
          <circle cx="142" cy="52" r="7" className="fill-paper" />
          <circle cx="158" cy="66" r="7" className="fill-paper" />
          <circle cx="126" cy="66" r="7" className="fill-paper" />
          <circle cx="142" cy="80" r="7" className="fill-paper" />
        </motion.svg>
      </div>
    </div>
  );
}

/* ---------- Musique : égaliseur animé ---------- */
const BARS = [0.45, 0.8, 0.6, 1, 0.7, 0.9, 0.5, 0.75, 0.55, 0.85, 0.4, 0.65];
function Music() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <p className="max-w-md text-[1.2rem] leading-relaxed">{hobbies.music.text}</p>
        <Favorites items={hobbies.music.favorites} />
      </div>
      <div className="flex aspect-[4/3] items-end justify-center gap-2 rounded-3xl border border-line bg-subtle px-10 pb-14 pt-16" aria-hidden="true">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-full max-w-4 origin-bottom rounded-full bg-accent"
            style={{ height: '100%' }}
            animate={{ scaleY: [h * 0.35, h, h * 0.55, h * 0.9, h * 0.35] }}
            transition={{ duration: 1.6 + (i % 4) * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Loisirs() {
  const [tab, setTab] = useState<Tab>('Voyages');

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = TABS[(TABS.indexOf(tab) + step + TABS.length) % TABS.length];
    setTab(next);
    document.getElementById(`loisirs-tab-${TABS.indexOf(next)}`)?.focus();
  };

  return (
    <section id="loisirs" aria-labelledby="loisirs-title">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeader id="loisirs-title" label="Centres d'intérêt" title="Loisirs" intro="Ce qui m’anime en dehors du code." />

        {/* Onglets */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease }}>
          <div role="tablist" aria-label="Loisirs" onKeyDown={onKey} className="mt-10 inline-flex gap-1 rounded-xl border border-line bg-subtle p-1">
            {TABS.map((t, i) => {
              const on = t === tab;
              return (
                <button
                  key={t}
                  id={`loisirs-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="loisirs-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setTab(t)}
                  className="relative cursor-pointer rounded-lg px-4 py-2 text-[0.98rem] font-medium sm:px-5"
                >
                  {on && <motion.span layoutId="loisirs-pill" className="absolute inset-0 rounded-lg bg-accent" transition={{ duration: 0.4, ease }} />}
                  <span className={`relative transition-colors ${on ? 'text-on-accent' : 'text-muted hover:text-ink'}`}>{t}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div id="loisirs-panel" role="tabpanel" aria-labelledby={`loisirs-tab-${TABS.indexOf(tab)}`} className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
              {tab === 'Voyages' && <Voyages />}
              {tab === 'Jeux vidéo' && <Games />}
              {tab === 'Musique' && <Music />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
