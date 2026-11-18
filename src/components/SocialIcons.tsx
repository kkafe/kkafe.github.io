/* Logos en couleur de LinkedIn, GitHub et de l'e-mail (bibliothèque Devicon pour LinkedIn et GitHub). */
import LinkedinOriginal from 'devicons-react/icons/LinkedinOriginal';
import GithubOriginal from 'devicons-react/icons/GithubOriginal';

export function LinkedinLogo({ size = 18 }: { size?: number }) {
  return <LinkedinOriginal size={size} aria-hidden="true" focusable="false" />;
}

// Le logo GitHub est noir : on l'inverse en blanc en mode sombre
export function GithubLogo({ size = 18 }: { size?: number }) {
  return (
    <span className="inline-flex dark:invert">
      <GithubOriginal size={size} aria-hidden="true" focusable="false" />
    </span>
  );
}

// Enveloppe en rouge (couleur de Gmail)
export function MailLogo({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="#ffffff" stroke="#EA4335" strokeWidth="1.6" />
      <path d="m3.5 7 8.5 6.5L20.5 7" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
