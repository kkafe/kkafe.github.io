import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { homes, travels, type Trip } from '../data/content';
import { countryCards } from '../data/cards';
import InfoCard, { type InfoCardData } from '../components/InfoCard';
import { PinIcon } from '../components/Icons';
import Globe from '../components/Globe';
import SectionHeader from '../components/SectionHeader';
import { ease, fadeUp, inView, stagger } from '../components/motion';

/** Centres d'intérêt : les voyages, avec le globe qui tourne vers la destination choisie. */
export default function Voyages() {
  const [focus, setFocus] = useState<Trip | null>(null);
  const [card, setCard] = useState<InfoCardData | null>(null);
  // Un clic tourne le globe vers le pays et ouvre sa carte de présentation
  const open = (t: Trip) => {
    setFocus(t);
    setCard({ title: t.name, visual: <PinIcon width={34} height={34} className="text-[#58554c]" />, ...countryCards[t.name] });
  };
  return (
    <section id="voyages" aria-labelledby="voyages-title">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:gap-16 md:py-32">
        <div>
          <SectionHeader id="voyages-title" label="Centres d'intérêt" title="Voyages" intro="Huit destinations, de l’Afrique de l’Ouest à l’océan Indien et à l’Europe. Sélectionnez une destination pour la situer sur le globe et la découvrir." />
          <motion.ul variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={inView} className="mt-8 flex flex-wrap gap-2">
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
        <motion.figure initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={inView} transition={{ duration: 1, ease }} className="mx-auto w-full max-w-[480px]">
          <Globe trips={travels} homes={homes} focus={focus} />
        </motion.figure>
      </div>
      <InfoCard data={card} onClose={() => setCard(null)} />
    </section>
  );
}
