import { motion } from 'motion/react';
import { ease, inView } from './motion';

/** En-tête de section : petite étiquette d'accent, titre, puis une phrase d'introduction facultative. */
export default function SectionHeader({ id, label, title, intro }: { id: string; label: string; title: string; intro?: string }) {
  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-2xl"
    >
      <motion.p
        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }}
        className="flex items-center gap-3 text-[0.85rem] font-medium tracking-[0.12em] text-accent uppercase"
      >
        <motion.span
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease } } }}
          className="block h-px w-8 origin-left bg-accent"
        />
        {label}
      </motion.p>
      <motion.h2
        id={id}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
        className="mt-4 text-[clamp(2rem,1.4rem+2vw,3rem)] leading-tight font-semibold tracking-[-0.015em]"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }} className="mt-4 text-[1.1rem] text-muted">
          {intro}
        </motion.p>
      )}
    </motion.header>
  );
}
