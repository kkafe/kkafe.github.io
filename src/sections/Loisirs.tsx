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

/* ---------- Jeux vidéo : une affiche originale par jeu (dégradé + titre), qui se soulève au survol ---------- */
function Games() {
  return (
    <div>
      <p className="max-w-2xl text-[1.15rem] leading-relaxed text-muted">{hobbies.games.text}</p>
      <motion.ul variants={stagger(0.07)} initial="hidden" animate="show" className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {hobbies.games.list.map((g, i) => (
          <motion.li key={g.title} variants={fadeUp}>
            <article
              className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-[0_18px_40px_-22px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:rotate-[-1deg]"
              style={{ background: `linear-gradient(150deg, ${g.colors[0]}, ${g.colors[1]})` }}
            >
              {/* Motif de lignes, pour donner du relief à l'affiche */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundImage: 'repeating-linear-gradient(120deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px)' }}
              />
              <span aria-hidden="true" className="relative text-[0.8rem] font-medium tracking-[0.12em] opacity-80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative">
                <h3 className="text-[clamp(1.3rem,1rem+1vw,1.75rem)] leading-[1.05] font-semibold tracking-[-0.01em]">{g.title}</h3>
                <p className="mt-2 text-[0.88rem] opacity-90">{g.genre}</p>
                <p className="text-[0.8rem] opacity-70">{g.studio}</p>
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ---------- Musique : une pochette originale par morceau, avec un égaliseur qui s'anime au survol ---------- */
function Music() {
  return (
    <div>
      <p className="max-w-2xl text-[1.15rem] leading-relaxed text-muted">{hobbies.music.text}</p>
      <motion.ul variants={stagger(0.08)} initial="hidden" animate="show" className="mt-10 grid gap-6 sm:grid-cols-3">
        {hobbies.music.list.map((m) => (
          <motion.li key={m.title} variants={fadeUp} className="group">
            <div
              className="relative grid aspect-square place-items-center overflow-hidden rounded-2xl text-white shadow-[0_18px_40px_-22px_rgba(0,0,0,0.6)]"
              style={{ background: `radial-gradient(circle at 30% 25%, ${m.colors[1]}, ${m.colors[0]} 70%)` }}
              aria-hidden="true"
            >
              {/* Ondes concentriques */}
              <span className="absolute size-[70%] rounded-full border border-white/25" />
              <span className="absolute size-[48%] rounded-full border border-white/25" />
              <span className="absolute size-[26%] rounded-full border border-white/30" />
              {/* Égaliseur : immobile, il s'anime au survol */}
              <span className="relative flex h-14 items-end gap-1.5">
                {[0.5, 0.9, 0.65, 1, 0.75].map((h, i) => (
                  <span
                    key={i}
                    className="eq-bar w-2 rounded-full bg-white"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </span>
            </div>
            <h3 className="mt-4 text-[1.25rem] font-medium leading-tight">{m.title}</h3>
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
