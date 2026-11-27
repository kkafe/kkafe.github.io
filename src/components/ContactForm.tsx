/*
 * Formulaire de contact. Le site est statique (GitHub Pages) : les messages sont transmis par e-mail
 * grâce au service gratuit FormSubmit. La toute première fois, FormSubmit envoie un e-mail d'activation
 * à l'adresse du site : il suffit de cliquer sur « Activate » pour recevoir les messages suivants.
 */
import { useState, type FormEvent } from 'react';
import { person } from '../data/content';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'mt-1.5 w-full rounded-lg border border-on-accent/30 bg-on-accent/10 px-4 py-3 text-on-accent placeholder:text-on-accent/55 transition-colors duration-200 focus:border-on-accent focus:bg-on-accent/15 focus:outline-none';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // champ invisible rempli : c'est un robot
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${person.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Portfolio : message de ${data.name}`, _template: 'table' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-on-accent/30 bg-on-accent/10 p-7">
        <p className="text-[1.3rem] font-semibold">Message envoyé</p>
        <p className="mt-2 opacity-85">Merci, je vous réponds dans les plus brefs délais.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-5 cursor-pointer font-medium underline underline-offset-4">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4" aria-label="Formulaire de contact">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-[0.95rem] font-medium">
          Nom
          <input name="name" required autoComplete="name" placeholder="Votre nom" className={field} />
        </label>
        <label className="block text-[0.95rem] font-medium">
          E-mail
          <input name="email" type="email" required autoComplete="email" placeholder="vous@exemple.fr" className={field} />
        </label>
      </div>
      <label className="block text-[0.95rem] font-medium">
        Message
        <textarea name="message" required rows={5} placeholder="Votre message" className={`${field} resize-y`} />
      </label>
      {/* Piège à robots : invisible pour les visiteurs */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex cursor-pointer items-center rounded-lg bg-on-accent px-6 py-3 font-medium text-accent transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>
        <p aria-live="polite" className="text-[0.95rem]">
          {status === 'error' && (
            <>
              L’envoi n’a pas fonctionné. Écrivez-moi directement à{' '}
              <a href={`mailto:${person.email}`} className="font-medium underline underline-offset-4">{person.email}</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
