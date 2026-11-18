import { useState } from 'react';
import { person } from '../data/content';
import LegalNotice from '../components/LegalNotice';

export default function Footer() {
  const [legal, setLegal] = useState(false);
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-8 text-[0.9rem] text-muted sm:px-8">
        <div className="grid gap-1">
          <p>
            © {new Date().getFullYear()} {person.firstName} {person.lastName}. Textes, photo de profil et code : tous droits réservés.
          </p>
          <p className="text-[0.82rem]">Photos des monuments sous licences Creative Commons. Logos : marques de leurs propriétaires.</p>
        </div>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => setLegal(true)} aria-haspopup="dialog" className="link-line cursor-pointer pb-0.5 transition-colors hover:text-ink">
            Mentions légales
          </button>
          <a href="#top" className="link-line pb-0.5 transition-colors hover:text-ink">Retour en haut</a>
        </div>
      </div>
      <LegalNotice open={legal} onClose={() => setLegal(false)} />
    </footer>
  );
}
