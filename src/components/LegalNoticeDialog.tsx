/*
 * Mentions légales, crédits et données personnelles (fenêtre ouverte depuis le pied de page).
 * Obligation de la loi pour la confiance dans l'économie numérique (LCEN) : identifier l'éditeur et l'hébergeur.
 */
import { m } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { person } from '../data/content';
import { CloseIcon } from './UiIcons';
import { ease } from '../animations/variants';

const link = 'underline underline-offset-2 hover:text-accent';

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-5">
      <h3 className="text-[1.05rem] font-medium">{title}</h3>
      <div className="mt-2 grid gap-2 text-[0.95rem] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function LegalNoticeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const name = `${person.firstName} ${person.lastName}`;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="legal-title"
      className="info-card m-auto max-h-[88vh] w-[calc(100%-2rem)] max-w-[34rem] overflow-visible bg-transparent p-0 text-ink"
    >
      {open && (
        <m.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="relative max-h-[88vh] overflow-y-auto rounded-2xl border border-line bg-surface px-6 py-7 shadow-[0_24px_60px_-20px_rgba(29,28,26,0.45)] sm:px-8"
        >
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Fermer"
            className="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-accent-soft"
          >
            <CloseIcon width={18} height={18} />
          </button>
          <h2 id="legal-title" className="text-[1.6rem] font-medium">Mentions légales</h2>

          <div className="mt-5 grid gap-5">
            <Part title="Éditeur">
              <p>
                {name}, étudiant.{' '}
                <a href={`mailto:${person.email}`} className={link}>
                  {person.email}
                </a>
              </p>
            </Part>

            <Part title="Hébergeur">
              <p>GitHub, Inc., 88 Colin P Kelly Jr Street, San Francisco, CA 94107, États-Unis. +1 877 448 4820.</p>
            </Part>

            <Part title="Droits">
              <p>
                Les textes, la photo de profil et le CV m’appartiennent. Les photos des monuments sont sous licences Creative
                Commons : leur auteur est cité sur chaque carte de pays. Les logos, les affiches de jeux et les pochettes d’albums appartiennent à leurs éditeurs et à leurs artistes.
              </p>
            </Part>

            <Part title="Vos données">
              <p>Ce site n’utilise aucun cookie et je ne collecte aucune donnée personnelle.</p>
            </Part>
          </div>
        </m.article>
      )}
    </dialog>
  );
}
