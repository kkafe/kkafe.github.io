import { m, useScroll, useSpring } from 'motion/react';

const cssScroll = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');

/** Fine barre d'accent en haut de l'écran qui indique la progression dans la page. */
export default function ScrollProgress() {
  // Navigateurs récents : animation gérée par le navigateur lui-même (index.css), sans JavaScript
  if (cssScroll) return <div aria-hidden data-mood-follow data-mood="base" className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px] bg-accent" />;
  return <JsProgress />;
}

function JsProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <m.div aria-hidden data-mood-follow data-mood="base" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" style={{ scaleX }} />;
}
