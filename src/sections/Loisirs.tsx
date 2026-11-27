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

/* ---------- Jeux vidéo : une affiche par jeu, qui se soulève au survol ---------- */
function Games() {
  return (
    <div>
      <p className="max-w-2xl text-[1.15rem] leading-relaxed text-muted">{hobbies.games.text}</p>
      <motion.ul variants={stagger(0.07)} initial="hidden" animate="show" className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {hobbies.games.list.map((g) => (
          <motion.li key={g.title} variants={fadeUp} className="group">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_22px_40px_-24px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
              style={g.image ? undefined : { background: `linear-gradient(150deg, ${g.colors[0]}, ${g.colors[1]})` }}
            >
              {g.image ? (
                <img
                  src={g.image}
                  alt={`Affiche de ${g.title}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                // Pas d'affiche : titre sur dégradé
                <span className="absolute inset-0 flex items-end p-5 text-[1.6rem] leading-tight font-semibold text-white">{g.title}</span>
              )}
              {/* Reflet lumineux au survol */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 transition-colors duration-500 group-hover:via-white/10 group-hover:to-white/25"
              />
            </div>
            <h3 className="mt-3 text-[1.05rem] leading-tight font-medium">{g.title}</h3>
            <p className="text-[0.9rem] text-muted">
              {g.genre} · {g.studio}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ---------- Musique : la pochette de chaque morceau, avec un égaliseur qui s'anime au survol ---------- */
function Music() {
  return (
    <div>
      <p className="max-w-2xl text-[1.15rem] leading-relaxed text-muted">{hobbies.music.text}</p>
      <motion.ul variants={stagger(0.08)} initial="hidden" animate="show" className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
        {hobbies.music.list.map((m) => (
          <motion.li key={m.title} variants={fadeUp} className="group">
            <div
              className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_22px_40px_-24px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
              style={m.image ? undefined : { background: `radial-gradient(circle at 30% 25%, ${m.colors[1]}, ${m.colors[0]} 70%)` }}
            >
              {m.image && (
                <img
                  src={m.image}
                  alt={`Pochette de ${m.title}, ${m.artist}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              )}
              {/* Égaliseur dans une pastille, en bas à droite : il s'anime au survol */}
              <span aria-hidden="true" className="absolute right-3 bottom-3 flex h-10 items-end gap-1 rounded-full bg-black/55 px-3 py-2.5 backdrop-blur-sm">
                {[0.5, 0.9, 0.65, 1].map((h, i) => (
                  <span key={i} className="eq-bar w-1 rounded-full bg-white" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }} />
                ))}
              </span>
            </div>
            <h3 className="mt-4 text-[1.2rem] leading-tight font-medium">{m.title}</h3>
            <p className="text-muted">
              {m.artist} · {m.style}
            </p>
          </motion.li>
        ))}
      </motion.ul>
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
