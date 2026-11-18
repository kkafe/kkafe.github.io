/*
 * Carte de présentation : fenêtre (élément <dialog> natif, accessible au clavier, fermeture avec Échap)
 * qui présente un langage ou un pays.
 */
import { motion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import type { Card } from '../data/cards';
import { CloseIcon } from './Icons';
import { ease } from './motion';

export type InfoCardData = Card & { title: string; visual: ReactNode };

export default function InfoCard({ data, onClose }: { data: InfoCardData | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (data && !d.open) d.showModal();
    if (!data && d.open) d.close();
  }, [data]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Un clic en dehors de la carte (sur le fond) ferme la fenêtre
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="info-card-title"
      className="info-card m-auto w-[calc(100%-2rem)] max-w-[30rem] overflow-visible bg-transparent p-0 text-ink"
    >
      {data && (
        <motion.article
          key={data.title}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease }}
          className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgba(29,28,26,0.45)]"
        >
          {data.photo ? (
            <header className="relative h-56 overflow-hidden bg-accent text-white sm:h-60">
              <img
                src={data.photo.src}
                alt={data.photo.monument}
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: data.photo.position }}
                referrerPolicy="no-referrer"
              />
              {/* Dégradé pour que le texte reste lisible sur la photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
                <p className="text-[0.8rem] tracking-[0.06em] opacity-85">{data.kind}</p>
                <h3 id="info-card-title" className="text-[1.9rem] leading-tight font-medium">
                  {data.title}
                </h3>
                <p className="mt-1 text-[0.85rem] opacity-90">{data.photo.monument}</p>
              </div>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                aria-label="Fermer"
                className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full bg-black/35 backdrop-blur-sm transition-colors hover:bg-black/55"
              >
                <CloseIcon width={18} height={18} />
              </button>
            </header>
          ) : (
          <header className="relative flex items-center gap-4 bg-accent px-6 py-6 text-on-accent">
            <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-white shadow-sm">{data.visual}</div>
            <div className="min-w-0">
              <p className="text-[0.8rem] tracking-[0.06em] opacity-80">{data.kind}</p>
              <h3 id="info-card-title" className="text-[1.7rem] leading-tight font-medium">
                {data.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Fermer"
              className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/15"
            >
              <CloseIcon width={18} height={18} />
            </button>
          </header>
          )}

          <div className="px-6 pt-5 pb-6">
            <p className="text-[1.02rem] leading-relaxed">{data.summary}</p>

            <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
              {data.facts.map((f) => (
                <div key={f.label} className="min-w-0">
                  <dt className="text-[0.78rem] text-muted">{f.label}</dt>
                  <dd className="mt-0.5 text-[0.95rem] leading-snug font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>

            {data.usage && (
              <div className="mt-4 rounded-lg bg-accent-soft px-4 py-3">
                <p className="text-[0.78rem] text-muted">Dans mon parcours</p>
                <p className="mt-0.5 text-[0.97rem]">{data.usage}</p>
              </div>
            )}

            {data.photo && (
              <p className="mt-4 text-[0.75rem] text-muted">
                Photo :{' '}
                <a href={data.photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                  {data.photo.credit}, Wikimedia Commons
                </a>
                , licence{' '}
                <a href={data.photo.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2 hover:text-ink">
                  {data.photo.license}
                </a>
                . Image recadrée.
              </p>
            )}
          </div>
        </motion.article>
      )}
    </dialog>
  );
}
