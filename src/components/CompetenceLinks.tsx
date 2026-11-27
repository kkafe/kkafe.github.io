/* Liens d'un projet ou d'une expérience vers les compétences qu'il prouve (ouvre la bonne compétence). */
import { competencesFor } from '../data/content';
import { OPEN_COMPETENCE_EVENT } from './SkillsAccordion';

export default function CompetenceLinks({ anchorId }: { anchorId: string }) {
  const list = competencesFor(anchorId);
  if (!list.length) return null;
  return (
    <div className="mt-5">
      <p className="text-[0.85rem] font-medium text-muted">Compétences mobilisées</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {list.map((c) => (
          <li key={c.id}>
            <a
              href={`#competence-${c.id}`}
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COMPETENCE_EVENT, { detail: c.id }))}
              className="inline-flex rounded-full border border-accent/40 px-3 py-1 text-[0.88rem] font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-on-accent"
            >
              {c.verb}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
