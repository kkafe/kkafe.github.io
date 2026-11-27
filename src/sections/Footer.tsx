import { useState } from 'react';
import { nav, person } from '../data/content';
import LegalNotice from '../components/LegalNotice';
import { DownloadIcon } from '../components/Icons';

const linkCls = 'link-line pb-0.5 text-[1.05rem] text-white/85 transition-colors hover:text-white';

/** Une colonne de liens, avec son petit titre. */
function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.85rem] text-white/50">{title}</h2>
      <ul className="mt-4 grid gap-2.5">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const [legal, setLegal] = useState(false);
  const name = `${person.firstName} ${person.lastName}`;

  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      {/* Bloc sombre arrondi, dans le noir du CV */}
      <div className="rounded-[1.75rem] bg-[#1d1c1a] text-white dark:border dark:border-line dark:bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pt-14 pb-10 sm:px-8 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          {/* Nom et actions */}
          <div>
            <p className="text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-none font-semibold tracking-[-0.025em]">{name}</p>
            <p className="mt-3 text-white/60">{person.title}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={person.cv}
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#1d1c1a] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <DownloadIcon /> Télécharger mon CV
              </a>
              <a href={`mailto:${person.email}`} className={linkCls}>
                M’écrire
              </a>
            </div>
          </div>

          {/* Colonnes de liens */}
          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <Column title="Le site">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className={linkCls}>
                    {n.label}
                  </a>
                </li>
              ))}
            </Column>
            <Column title="Me trouver">
              <li>
                <a href={`mailto:${person.email}`} className={linkCls}>
                  E-mail
                </a>
              </li>
              <li>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={person.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  GitHub
                </a>
              </li>
            </Column>
            <Column title="Infos">
              <li>
                <button type="button" onClick={() => setLegal(true)} aria-haspopup="dialog" className={`${linkCls} cursor-pointer text-left`}>
                  Mentions légales
                </button>
              </li>
              <li>
                <a href="#top" className={linkCls}>
                  Retour en haut
                </a>
              </li>
            </Column>
          </nav>
        </div>

        {/* Droits */}
        <div className="mx-auto w-full max-w-6xl border-t border-white/10 px-6 py-6 text-[0.82rem] text-white/50 sm:px-8">
          © {new Date().getFullYear()} {name}. Textes, photo de profil et code : tous droits réservés. Photos des monuments sous
          licences Creative Commons. Logos : marques de leurs propriétaires.
        </div>
      </div>
      <LegalNotice open={legal} onClose={() => setLegal(false)} />
    </footer>
  );
}
