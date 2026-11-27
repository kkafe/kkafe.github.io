import { m } from 'motion/react';
import { ease } from './motion';

/** Le logo : le prénom écrit à la main, qui se dessine de gauche à droite, avec un trait dessous. */
export default function Signature({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-block font-hand leading-none ${className}`}>
      <m.span
        className="block"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
      >
        kiliane
      </m.span>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden className="absolute -bottom-1 left-0 h-2 w-full overflow-visible">
        <m.path
          d="M2 6 C 30 2, 60 9, 98 4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.3 }}
        />
      </svg>
    </span>
  );
}
