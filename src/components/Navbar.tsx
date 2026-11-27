import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { nav, person } from '../data/content';
import useActiveSection from '../hooks/useActiveSection';
import { CloseIcon, MenuIcon } from './Icons';
import Signature from './Signature';
import ThemeToggle from './ThemeToggle';
import { ease } from './motion';

const ids = nav.map((n) => n.id);

/** Barre de navigation fixe : signature à gauche, rubriques, bouton de contact et thème à droite. */
export default function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  return (
    <m.header
      data-mood-follow
      data-mood="base"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-line bg-paper/95 md:bg-paper/85 md:backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" aria-label={`${person.firstName} ${person.lastName}, retour en haut`} className="text-[1.9rem] text-ink" onClick={() => setOpen(false)}>
          <Signature />
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`block px-3 py-2 text-[0.95rem] transition-colors duration-200 ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    {item.label}
                  </a>
                  {on && <m.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 36 }} />}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="hidden rounded-lg bg-accent px-4 py-2 text-[0.92rem] font-medium text-on-accent transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90 sm:inline-block">
            Me contacter
          </a>
          <button
            type="button"
            className="grid size-10 cursor-pointer place-items-center rounded-lg border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav id="menu-mobile" aria-label="Sections" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden lg:hidden">
            <ul className="mx-auto max-w-6xl px-5 pt-1 pb-5">
              {nav.map((item, i) => (
                <m.li key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.08, duration: 0.35, ease }}>
                  <a href={`#${item.id}`} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-[1.05rem]">
                    {item.label}
                  </a>
                </m.li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
