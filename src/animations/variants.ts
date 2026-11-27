/* Réglages communs des animations : fluides et discrètes */
export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

// Les éléments s'animent une seule fois, un peu avant d'être entièrement visibles
export const inView = { once: true, margin: '0px 0px -10% 0px' } as const;
