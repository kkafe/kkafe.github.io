import { m } from 'motion/react';
import { useState } from 'react';
import { skillCards } from '../data/cards';
import InfoCard, { type InfoCardData } from '../components/InfoCard';
import { otherSkills, toolGroups } from '../data/content';
import Logo, { type LogoName } from '../components/Logo';
import SectionHeader from '../components/SectionHeader';
import ButCompetences from '../components/ButCompetences';
import { fadeUp, inView, stagger } from '../components/motion';

export default function Skills() {
  const [card, setCard] = useState<InfoCardData | null>(null);
  const open = (name: LogoName) => setCard({ title: name, visual: <Logo name={name} size={40} />, ...skillCards[name] });
  return (
    <section id="competences" data-mood="competences" aria-labelledby="skills-title" className="mood-panel">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeader id="skills-title" label="Compétences" title="Compétences du BUT" intro="Les six compétences du BUT Informatique, et où je les ai mises en pratique." />

        <div className="mt-14">
          <ButCompetences />
        </div>

        <h3 className="mt-28 text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] font-semibold tracking-[-0.01em]">Langages et outils</h3>

        <m.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toolGroups.map((group) => (
            <m.div key={group.title} variants={fadeUp} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-[0.82rem] font-medium tracking-[0.08em] text-muted uppercase">{group.title}</h3>
              <ul className="mt-4 grid gap-1">
                {group.items.map((item) => (
                  <li key={item} className="-mx-2">
                    <button
                      type="button"
                      onClick={() => open(item)}
                      aria-haspopup="dialog"
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors duration-200 hover:bg-accent-soft"
                    >
                      <span className="grid size-8 place-items-center transition-transform duration-300 group-hover:scale-110">
                        <Logo name={item} size={26} />
                      </span>
                      <span className="text-[1.02rem] whitespace-nowrap">{item}</span>
                      <span aria-hidden="true" className="ml-auto text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">+</span>
                    </button>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </m.div>

        <m.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="mt-6 grid gap-6 md:grid-cols-3">
          {otherSkills.map((g) => (
            <m.div key={g.title} variants={fadeUp} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-[0.82rem] font-medium tracking-[0.08em] text-muted uppercase">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it} className="rounded-md border border-line px-3 py-1 text-[0.97rem] transition-colors duration-200 hover:border-accent/50 hover:text-accent">
                    {it}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </m.div>
      </div>
      <InfoCard data={card} onClose={() => setCard(null)} />
    </section>
  );
}
