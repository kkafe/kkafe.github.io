import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import portrait from '../assets/portrait.webp';
import { intro, person } from '../data/content';
import { ArrowIcon, DownloadIcon, PinIcon } from '../components/Icons';
import { GithubLogo, LinkedinLogo, MailLogo } from '../components/SocialIcons';
import { ease } from '../components/motion';

const appear = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Quadrillage discret qui descend un peu moins vite que la page */}
      <motion.div aria-hidden style={{ y: gridY }} className="grid-bg absolute inset-0" />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-14 px-5 pt-28 pb-20 sm:px-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <motion.p {...appear(0.1)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.88rem] text-muted">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {person.status}
          </motion.p>

          <motion.h1 {...appear(0.2)} id="hero-title" className="mt-6 text-[clamp(2.8rem,1.6rem+4.6vw,5.2rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
            {person.firstName} {person.lastName}
          </motion.h1>
          <motion.p {...appear(0.3)} className="mt-3 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium text-accent">
            {person.title}
          </motion.p>
          <motion.p {...appear(0.4)} className="mt-6 max-w-[46ch] text-[1.12rem] leading-relaxed text-muted">
            {intro}
          </motion.p>

          <motion.div {...appear(0.5)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projets" className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-on-accent shadow-sm transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90">
              Voir mes projets
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={person.cv} download className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 font-medium transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-ink/30">
              <DownloadIcon /> Télécharger mon CV
            </a>
          </motion.div>

          <motion.ul {...appear(0.6)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-muted">
            <li className="flex items-center gap-2"><PinIcon /> {person.location}</li>
            <li><a href={person.linkedin} className="flex items-center gap-2 transition-colors hover:text-ink"><LinkedinLogo /> LinkedIn</a></li>
            <li><a href={person.github} className="flex items-center gap-2 transition-colors hover:text-ink"><GithubLogo /> GitHub</a></li>
            <li><a href={`mailto:${person.email}`} className="flex items-center gap-2 transition-colors hover:text-ink"><MailLogo /> E-mail</a></li>
          </motion.ul>
        </div>

        <motion.div style={{ y: photoY }} className="relative mx-auto w-[78%] max-w-[380px] md:mr-0 md:w-full">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8% round 24px)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="overflow-hidden rounded-3xl border border-line bg-subtle shadow-[0_30px_60px_-30px_rgba(22,24,29,0.35)]"
          >
            <motion.img
              src={portrait}
              alt={`Portrait de ${person.firstName} ${person.lastName}`}
              width={337}
              height={411}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease, delay: 0.3 }}
              className="aspect-[337/411] w-full object-cover"
            />
          </motion.div>
          <motion.div {...appear(0.9)} className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-surface px-4 py-3 shadow-[0_16px_40px_-20px_rgba(22,24,29,0.4)] sm:-left-8">
            <p className="text-[0.8rem] text-muted">Formation</p>
            <p className="text-[0.98rem] font-medium">BUT Informatique, {person.school}</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#profil"
        aria-label="Descendre vers le profil"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.8 }, y: { delay: 1.4, duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted md:block"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
      </motion.a>
    </section>
  );
}
