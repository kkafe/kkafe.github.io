/*
 * Loisirs : trois onglets (Voyages, Jeux vidéo, Musique).
 * Les voyages gardent le globe ; les jeux vidéo et la musique ont chacun un petit visuel animé.
 * Textes et préférés à modifier dans data/content.ts (hobbies).
 */
import { AnimatePresence, m } from 'motion/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { hobbies, homes, travels, type Trip } from '../data/content';
import { countryCards } from '../data/cards';
import InfoCard, { type InfoCardData } from '../components/InfoCard';
import { PinIcon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';
import { ease, fadeUp, inView, stagger } from '../components/motion';

// Le globe (et ses milliers de points) n'est chargé qu'à l'approche de la section : la page s'ouvre plus vite
const Globe = lazy(() => import('../components/Globe'));
function LazyGlobe(props: { trips: Trip[]; homes: Trip[]; focus: Trip | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '800px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="aspect-square w-full">
      {near && (
        <Suspense fallback={null}>
          <Globe {...props} />
        </Suspense>
      )}
    </div>
  );
}

const TABS = ['Voyages', 'Jeux vidéo', 'Musique'] as const;
type Tab = (typeof TABS)[number];
// Ambiance de couleurs de chaque onglet (définie dans index.css)
const MOODS: Record<Tab, string> = { Voyages: 'voyages', 'Jeux vidéo': 'jeux', Musique: 'musique' };

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
        <m.ul variants={stagger(0.05)} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-2">
          {travels.map((t) => {
            const on = focus?.name === t.name;
            return (
              <m.li key={t.name} variants={fadeUp}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-haspopup="dialog"
                  onClick={() => open(t)}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-[0.98rem] transition-colors duration-200 ${on ? 'border-accent bg-accent text-on-accent' : 'border-line bg-surface hover:border-accent/50'}`}
                >
                  {t.name}
                </button>
              </m.li>
            );
          })}
        </m.ul>
        <div className="mt-4 min-h-[1.6rem] text-[0.95rem] text-muted" aria-live="polite">
          <AnimatePresence mode="wait">
            {focus && (
              <m.p key={focus.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                {focus.name}, {focus.region}
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <figure className="mx-auto w-full max-w-[480px]">
        <LazyGlobe trips={travels} homes={homes} focus={focus} />
      </figure>
      <InfoCard data={card} onClose={() => setCard(null)} />
    </div>
  );
}

/* ---------- Jeux vidéo : une affiche par jeu, qui se soulève au survol ---------- */
function Games() {
  return (
    <div>
      <m.ul variants={stagger(0.07)} initial="hidden" animate="show" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {hobbies.games.list.map((g) => (
          <m.li key={g.title} variants={fadeUp} className="group">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_22px_40px_-24px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
              style={g.image ? undefined : { background: `linear-gradient(150deg, ${g.colors[0]}, ${g.colors[1]})` }}
            >
              {g.image ? (
                <img
                  src={g.image}
                  alt={`Affiche de ${g.title}`}
                  loading="lazy"
                  decoding="async"
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
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

/* ---------- Musique : cartes façon lecteur de musique, avec un bouton lecture vert qui apparaît au survol ---------- */
function Music() {
  return (
    <m.ul variants={stagger(0.08)} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-3">
      {hobbies.music.list.map((song) => (
        <m.li
          key={song.title}
          variants={fadeUp}
          className="group rounded-xl bg-surface p-4 transition-colors duration-300 hover:bg-subtle"
        >
          <div
            className="relative aspect-square overflow-hidden rounded-lg shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]"
            style={song.image ? undefined : { background: `radial-gradient(circle at 30% 25%, ${song.colors[1]}, ${song.colors[0]} 70%)` }}
          >
            {song.image && <img src={song.image} alt={`Pochette de ${song.title}, ${song.artist}`} loading="lazy" decoding="async" className="size-full object-cover" />}
            {/* Bouton lecture : glisse vers le haut au survol */}
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-3 grid size-12 translate-y-2 place-items-center rounded-full bg-accent text-on-accent opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
          </div>
          <h3 className="mt-4 truncate text-[1.1rem] font-semibold">{song.title}</h3>
          <p className="mt-0.5 flex items-center gap-2 text-[0.95rem] text-muted">
            {/* Petit égaliseur vert, animé au survol */}
            <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
              {[0.6, 1, 0.75].map((h, i) => (
                <span key={i} className="eq-bar w-[3px] rounded-full bg-accent" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
            {song.artist} · {song.style}
          </p>
        </m.li>
      ))}
    </m.ul>
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
    <section id="loisirs" data-mood={MOODS[tab]} aria-labelledby="loisirs-title" className="mood-panel">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeader id="loisirs-title" label="Centres d'intérêt" title="Loisirs" intro="Ce qui m’anime en dehors du code." />

        {/* Onglets */}
        <m.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease }}>
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
                  {on && <m.span layoutId="loisirs-pill" className="absolute inset-0 rounded-lg bg-accent" transition={{ duration: 0.4, ease }} />}
                  <span className={`relative transition-colors ${on ? 'text-on-accent' : 'text-muted hover:text-ink'}`}>{t}</span>
                </button>
              );
            })}
          </div>
        </m.div>

        <div id="loisirs-panel" role="tabpanel" aria-labelledby={`loisirs-tab-${TABS.indexOf(tab)}`} className="mt-12">
          <AnimatePresence mode="wait">
            <m.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
              {tab === 'Voyages' && <Voyages />}
              {tab === 'Jeux vidéo' && <Games />}
              {tab === 'Musique' && <Music />}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
