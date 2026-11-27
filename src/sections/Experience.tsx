import { experiences } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import Timeline from '../components/Timeline';

export default function Experience() {
  return (
    <section id="experience" data-mood="experience" aria-labelledby="experience-title" className="mood-panel">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-32">
        <SectionHeader id="experience-title" label="Expérience" title="Expérience professionnelle" intro="Un stage en développement web et un emploi d'été en informatique." />
        <Timeline
          items={experiences.map((job, i) => ({
            key: job.role,
            current: i === 0,
            meta: <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.82rem] font-medium text-accent">{job.type}</span>,
            content: (
              <div className="rounded-xl border border-line bg-surface p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-24px_rgba(22,24,29,0.35)]">
                <h3 className="text-[1.3rem] leading-snug font-semibold">{job.role}</h3>
                <p className="text-muted">{job.company}</p>
                <ul className="mt-4 grid gap-2.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="relative pl-5 leading-relaxed">
                      <span aria-hidden className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}
