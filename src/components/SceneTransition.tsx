/*
 * Transition entre les sections au défilement : chaque section monte, grandit légèrement
 * et apparaît à mesure qu'elle entre dans l'écran. Désactivée si le visiteur réduit les animations.
 */
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

export default function SceneTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // 0 quand le haut de la section touche le bas de l'écran, 1 quand il arrive aux deux tiers
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  if (reduce) return <div ref={ref}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ opacity, y, scale, transformOrigin: '50% 0%' }}>
      {children}
    </motion.div>
  );
}
