import { motion } from 'motion/react';
import type { PointerEvent } from 'react';
import { projects, type Project } from '../data/content';
import Logo from '../components/Logo';
import SectionHeader from '../components/SectionHeader';
import { ArrowIcon } from '../components/Icons';
import { fadeUp, inView, stagger } from '../components/motion';

/** Carte de projet : se soulève au survol, un léger halo suit la souris et un trait d'accent se trace en haut. */
function ProjectCard({ p, n }: { p: Project; n: number }) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <article
      onPointerMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-28px_rgba(22,24,29,0.4)]"
      style={{ backgroundImage: 'radial-gradient(320px circle at var(--x, -200px) var(--y, -200px), color-mix(in oklab, var(--color-accent) 7%, transparent), transparent 70%)' }}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.82rem] font-medium text-accent">{p.category}</span>
        <span className="text-[0.85rem] text-muted tabular-nums">{String(n).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-5 text-[1.45rem] leading-snug font-semibold tracking-[-0.01em]">{p.title}</h3>
      {p.context && <p className="mt-1 text-[0.95rem] text-muted">{p.context}</p>}
      <p className="mt-4 leading-relaxed">{p.description}</p>
      {p.highlights && (
        <ul className="mt-4 grid gap-2 text-[0.97rem] text-muted">
          {p.highlights.map((h) => (
            <li key={h} className="relative pl-5">
              <span aria-hidden className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}
      {(p.tech || p.link) && (
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="flex flex-wrap gap-2">
            {p.tech?.map((name) => (
              <span key={name} className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[0.85rem]">
                <Logo name={name} size={16} /> {name}
              </span>
            ))}
          </span>
          {p.link && (
            <a href={p.link.href} className="inline-flex items-center gap-1.5 font-medium text-accent">
              {p.link.label} <ArrowIcon />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projets" data-mood="projets" aria-labelledby="projets-title" className="border-y border-line bg-subtle">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeader id="projets-title" label="Projets" title="Projets réalisés" intro="Des projets réalisés dans le cadre de ma formation : des applications menées en équipe avec des clients, un jeu vidéo et une simulation." />
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView} className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp} className="h-full">
              <ProjectCard p={p} n={i + 1} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
