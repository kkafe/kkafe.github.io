import { AnimatePresence, m } from 'motion/react';
import { useState } from 'react';
import { MoonIcon, SunIcon } from './Icons';

/** Bouton clair / sombre. Le choix est retenu par le navigateur. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* stockage indisponible : le thème vaut pour cette visite */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="grid size-10 cursor-pointer place-items-center rounded-lg border border-line text-muted transition-colors duration-200 hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={dark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {dark ? <MoonIcon /> : <SunIcon />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
