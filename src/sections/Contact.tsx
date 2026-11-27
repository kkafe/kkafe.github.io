import { AnimatePresence, m } from 'motion/react';
import { useState } from 'react';
import { contact, person } from '../data/content';
import { CheckIcon, CopyIcon, PinIcon } from '../components/UiIcons';
import GithubOriginal from 'devicons-react/icons/GithubOriginal';
import { LinkedinLogo, MailLogo } from '../components/SocialLogos';
import { ease, fadeUp, inView, stagger } from '../animations/variants';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section id="contact" data-mood="base" aria-labelledby="contact-title" className="mood-panel px-5 pt-24 pb-24 sm:px-8 md:pt-32 md:pb-32">
      <m.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-accent px-7 py-16 text-on-accent sm:px-12 md:px-16 md:py-20"
      >
        <div aria-hidden className="grid-bg absolute inset-0 opacity-15" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <m.p variants={fadeUp} className="text-[0.85rem] font-medium tracking-[0.12em] uppercase opacity-80">
            Contact
          </m.p>
          <m.h2 variants={fadeUp} id="contact-title" className="mt-3 text-[clamp(2rem,1.4rem+2vw,3rem)] leading-tight font-semibold tracking-[-0.015em]">
            Travaillons ensemble
          </m.h2>
          <m.p variants={fadeUp} className="mt-4 text-[1.12rem] opacity-85">
            {contact.sentence}
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 rounded-lg bg-on-accent px-5 py-3 font-medium text-accent transition-transform duration-200 hover:-translate-y-0.5">
              <MailLogo size={20} /> {person.email}
            </a>
            <button type="button" onClick={copy} className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-on-accent/40 px-5 py-3 font-medium transition-colors duration-200 hover:bg-on-accent/10">
              <AnimatePresence mode="wait" initial={false}>
                <m.span key={copied ? 'ok' : 'copy'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease }} className="inline-flex items-center gap-2">
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Adresse copiée' : "Copier l'adresse"}
                </m.span>
              </AnimatePresence>
            </button>
          </m.div>
          <span className="sr-only" aria-live="polite">{copied ? 'Adresse e-mail copiée' : ''}</span>

          <m.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 opacity-90">
            <li><a href={person.linkedin} className="link-line inline-flex items-center gap-2 pb-0.5"><span className="grid size-7 place-items-center rounded-full bg-white"><LinkedinLogo size={16} /></span> LinkedIn</a></li>
            <li><a href={person.github} className="link-line inline-flex items-center gap-2 pb-0.5"><span className="grid size-7 place-items-center rounded-full bg-white"><span className="inline-flex"><GithubOriginal size={16} aria-hidden="true" /></span></span> GitHub</a></li>
            <li className="inline-flex items-center gap-2"><PinIcon /> {person.location}</li>
          </m.ul>
        </div>
        <m.div variants={fadeUp}>
          <ContactForm />
        </m.div>
        </div>
      </m.div>
    </section>
  );
}
