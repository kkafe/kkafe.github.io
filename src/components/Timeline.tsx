import { motion, useScroll } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { ease, inView } from './motion';

/** Frise verticale : la ligne d'accent se remplit au défilement, chaque étape apparaît en glissant. */
export default function Timeline({ items }: { items: { key: string; meta: ReactNode; content: ReactNode; current?: boolean }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  return (
    <ol ref={ref} className="relative pl-9">
      <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
      <motion.span aria-hidden style={{ scaleY: scrollYProgress }} className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent" />
      {items.map((it, i) => (
        <motion.li
          key={it.key}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease, delay: i * 0.06 }}
          className="relative pb-10 last:pb-0"
        >
          <span aria-hidden className={`absolute top-1.5 -left-9 size-[15px] rounded-full border-2 border-accent ${it.current ? 'bg-accent ring-4 ring-accent-soft' : 'bg-paper'}`} />
          <div className="text-[0.9rem] text-muted">{it.meta}</div>
          <div className="mt-1">{it.content}</div>
        </motion.li>
      ))}
    </ol>
  );
}
