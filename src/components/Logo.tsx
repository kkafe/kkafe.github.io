/*
 * Logos des langages et outils (bibliothèque Devicon, via le paquet devicons-react).
 * Pour ajouter un logo : importez-le ici (liste complète : https://devicon.dev),
 * ajoutez son nom à LogoName et à LOGOS, puis utilisez ce nom dans data/content.ts.
 */
import type { FunctionComponent, SVGProps } from 'react';
import JavaOriginal from 'devicons-react/icons/JavaOriginal';
import PythonOriginal from 'devicons-react/icons/PythonOriginal';
import CplusplusOriginal from 'devicons-react/icons/CplusplusOriginal';
import GodotOriginal from 'devicons-react/icons/GodotOriginal';
import Html5Original from 'devicons-react/icons/Html5Original';
import Css3Original from 'devicons-react/icons/Css3Original';
import PhpOriginal from 'devicons-react/icons/PhpOriginal';
import JavascriptOriginal from 'devicons-react/icons/JavascriptOriginal';
import Neo4jOriginal from 'devicons-react/icons/Neo4jOriginal';
import TypescriptOriginal from 'devicons-react/icons/TypescriptOriginal';
import ReactOriginal from 'devicons-react/icons/ReactOriginal';
import VuejsOriginal from 'devicons-react/icons/VuejsOriginal';
import MysqlOriginal from 'devicons-react/icons/MysqlOriginal';
import GitOriginal from 'devicons-react/icons/GitOriginal';

type IconProps = SVGProps<SVGElement> & { size?: number | string };

/** SQL n'a pas de logo officiel : une base de données dessinée au trait. */
const makeDatabase = (color: string): FunctionComponent<IconProps> => ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" aria-hidden>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
  </svg>
);

const Database = makeDatabase('#00758F');
// PL/SQL : même icône, en rouge Oracle
const OracleDatabase = makeDatabase('#C74634');

/** Vibe coding : une étincelle, symbole courant de l'IA. */
const Sparkle: FunctionComponent<IconProps> = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
    <defs>
      <linearGradient id="vibe" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path d="M12 2.5c.6 4.7 2.8 6.9 7.5 7.5-4.7.6-6.9 2.8-7.5 7.5-.6-4.7-2.8-6.9-7.5-7.5 4.7-.6 6.9-2.8 7.5-7.5Z" fill="url(#vibe)" />
    <path d="M19 15.5c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3Z" fill="url(#vibe)" />
  </svg>
);

const LOGOS = {
  Java: JavaOriginal,
  Python: PythonOriginal,
  'C++': CplusplusOriginal,
  Godot: GodotOriginal,
  HTML: Html5Original,
  CSS: Css3Original,
  PHP: PhpOriginal,
  JavaScript: JavascriptOriginal,
  SQL: Database,
  // PL/SQL : le langage d'Oracle (SQL Developer) ; Cypher : le langage de Neo4j
  'PL/SQL': OracleDatabase,
  Cypher: Neo4jOriginal,
  TypeScript: TypescriptOriginal,
  React: ReactOriginal,
  Vue: VuejsOriginal,
  Git: GitOriginal,
  Oracle: OracleDatabase,
  MySQL: MysqlOriginal,
  Neo4j: Neo4jOriginal,
  'Vibe coding': Sparkle,
} satisfies Record<string, FunctionComponent<IconProps>>;

export type LogoName = keyof typeof LOGOS;

export default function Logo({ name, size = 28 }: { name: LogoName; size?: number }) {
  const Icon = LOGOS[name] as FunctionComponent<IconProps>;
  return <Icon size={size} aria-hidden="true" focusable="false" />;
}
