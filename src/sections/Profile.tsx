import { m } from 'motion/react';
import { about } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import { fadeUp, inView, stagger } from '../animations/variants';

export default function Profile() {
  return (
    <section id="profil" data-mood="profil" aria-labelledby="profil-title" className="mood-panel">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-32">
        <SectionHeader id="profil-title" label="Profil" title="Partir du besoin, livrer une solution" />
        <m.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={inView}>
          {about.paragraphs.map((p) => (
            <m.p key={p} variants={fadeUp} className="mb-5 text-[1.12rem] leading-relaxed">
              {p}
            </m.p>
          ))}
          <m.dl variants={stagger(0.08)} className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.facts.map((f) => (
              <m.div key={f.label} variants={fadeUp} className="rounded-xl border border-line bg-surface p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40">
                <dt className="text-[0.82rem] font-medium tracking-[0.06em] text-muted uppercase">{f.label}</dt>
                <dd className="mt-1.5 text-[1.08rem] font-medium">{f.value}</dd>
                {f.detail && <dd className="text-[0.93rem] text-muted">{f.detail}</dd>}
              </m.div>
            ))}
          </m.dl>
        </m.div>
      </div>
    </section>
  );
}
