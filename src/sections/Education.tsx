import { education } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import Timeline from '../components/Timeline';

export default function Education() {
  return (
    <section id="formation" data-mood="formation" aria-labelledby="formation-title" className="border-t border-line bg-subtle">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-32">
        <SectionHeader id="formation-title" label="Formation" title="Formation et engagement" />
        <Timeline
          items={education.map((s) => ({
            key: s.title,
            current: s.current,
            meta: <span className="tabular-nums">{s.years}</span>,
            content: (
              <>
                <h3 className="text-[1.25rem] leading-snug font-semibold">{s.title}</h3>
                <p className="text-muted">{s.place}</p>
                {s.text && <p className="mt-1.5">{s.text}</p>}
              </>
            ),
          }))}
        />
      </div>
    </section>
  );
}
