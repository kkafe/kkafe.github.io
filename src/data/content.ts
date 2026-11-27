/**
 * TOUT LE TEXTE DU SITE EST ICI.
 * Modifiez ce fichier pour changer une phrase, ajouter un projet, une compétence ou un voyage :
 * le site se met à jour tout seul (npm run dev).
 */
import type { LogoName } from '../components/Logo';

export const person = {
  firstName: 'Kiliane',
  lastName: 'Kafe',
  title: 'Stagiaire développeur',
  status: 'Étudiant en 3e année de BUT Informatique',
  school: 'IUT de Blagnac',
  location: 'Toulouse, Beauzelle',
  email: 'k.kiliane976@gmail.com',
  github: 'https://github.com/kkafe',
  linkedin: 'https://www.linkedin.com/in/kiliane-kafe/',
  // Fichier placé dans public/cv/
  cv: 'cv/CV-Kiliane-Kafe.pdf',
};

export const nav = [
  { id: 'profil', label: 'Profil' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formation', label: 'Formation' },
  { id: 'loisirs', label: 'Loisirs' },
  { id: 'contact', label: 'Contact' },
];

// Le paragraphe d'accroche de l'accueil
export const intro =
  "Étudiant en troisième année de BUT Informatique à l'IUT de Blagnac, je conçois et développe des applications web et des bases de données, de l'analyse des besoins jusqu'à la mise en œuvre.";

export const about = {
  paragraphs: [
    "Mon approche part toujours du besoin des utilisateurs. Je mène des entretiens pour recueillir leurs attentes, je conçois la solution en équipe, puis je la développe, de l'interface web jusqu'à la base de données.",
    "Dans le cadre de ma formation, j'ai également réalisé des projets qui m'ont permis d'explorer d'autres domaines, notamment un jeu de type Bomberman avec le moteur Godot et une simulation du jeu de la vie.",
  ],
  facts: [
    { label: 'Formation', value: 'BUT Informatique', detail: 'IUT de Blagnac, 2024–2027' },
    { label: 'Baccalauréat', value: 'Mention Bien', detail: 'Mathématiques, physique-chimie' },
    { label: 'Langues', value: 'Français, anglais' },
    { label: 'Localisation', value: 'Toulouse, Beauzelle' },
  ] as { label: string; value: string; detail?: string }[],
};

/* ---------- Expérience professionnelle ---------- */
export type Job = { role: string; company: string; type: string; points: string[]; tech?: LogoName[] };

export const experiences: Job[] = [
  {
    role: 'Développeur web',
    company: 'Assemblée Départementale de Mayotte',
    type: 'Stage',
    points: [
      "Développement d'un portail web interne de gestion des ressources humaines regroupant une FAQ RH, les actualités RH et un système de tickets d'assistance.",
      'Analyse des besoins des utilisateurs et gestion de la base de données.',
    ],
  },
  {
    role: 'Assistant informatique',
    company: 'Sogéa',
    type: "Emploi d'été",
    points: [
      "Mise à jour de l'inventaire du matériel et des logiciels informatiques.",
      "Développement de compétences en organisation, en autonomie et en travail d'équipe.",
    ],
  },
];

/* ---------- Projets ----------
 * tech : logos affichés sur la carte (noms de la liste LogoName dans components/Logo.tsx)
 * link : facultatif, par exemple le dépôt GitHub du projet
 */
export type Project = {
  category: string;
  title: string;
  context?: string;
  description: string;
  highlights?: string[];
  tech?: LogoName[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    category: 'Application web',
    title: 'Site e-commerce',
    context: 'Projet en équipe, pour un client',
    description: "Conception et développement d'une application e-commerce complète.",
    highlights: [
      'Gestion des produits, des utilisateurs, des paniers et des commandes',
      'Recueil et analyse des besoins du client lors d’entretiens',
      'Conception et réalisation de la solution en équipe',
    ],
  },
  {
    category: 'Projet client',
    title: "Implémentation d'un besoin client",
    context: 'Projet en équipe',
    description: "Développement d'une application répondant au besoin exprimé par un client.",
    highlights: ['Collecte des besoins en entretien', 'Conception de la solution en équipe'],
  },
  {
    category: 'Jeu vidéo',
    title: 'Bomberman',
    context: 'Projet de formation',
    description: 'Conception et développement d’un jeu vidéo de type Bomberman avec le moteur de jeu Godot.',
    tech: ['Godot'],
  },
  {
    category: 'Simulation',
    title: 'Jeu de la vie',
    context: 'Projet de formation',
    description:
      "Implémentation de l'automate cellulaire de John Conway : une grille de cellules qui évolue à chaque génération selon des règles de voisinage.",
  },
];

/* ---------- Formation et engagement : du plus récent au plus ancien ---------- */
export type Step = { years: string; title: string; place: string; text?: string; current?: boolean };

export const education: Step[] = [
  { years: '2024 – 2027', title: 'BUT Informatique', place: 'IUT de Blagnac', text: 'Troisième année en cours.', current: true },
  { years: '2024', title: 'Baccalauréat, mention Bien', place: 'Spécialités mathématiques et physique-chimie' },
  { years: '2022 – 2024', title: 'Conseil Municipal des Jeunes', place: 'Mamoudzou, Mayotte', text: 'Engagement citoyen en politique locale.' },
];

/* ---------- Compétences ---------- */
// Les outils avec un logo (voir components/Logo.tsx pour la liste des logos disponibles)
export const toolGroups: { title: string; items: LogoName[] }[] = [
  { title: 'Langages', items: ['Java', 'Python', 'C++', 'TypeScript'] },
  { title: 'Développement web', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'React', 'Vue'] },
  { title: 'Bases de données', items: ['SQL', 'PL/SQL', 'Cypher'] },
  { title: 'Outils', items: ['Git', 'Oracle', 'MySQL', 'Neo4j', 'Godot', 'Vibe coding'] },
];

// Les compétences sans logo
export const otherSkills = [
  { title: 'Méthodes', items: ['Gestion de projet', 'Analyse des besoins', 'Travail en équipe'] },
  { title: 'Savoir-être', items: ['Communication', "Capacité d'adaptation", 'Autonomie'] },
  { title: 'Autres', items: ['Économie', 'Français', 'Anglais'] },
];

/* ---------- Voyages ----------
 * lat / lon : position du point sur le globe (latitude, longitude en degrés).
 */
export type Trip = { name: string; region: string; lat: number; lon: number; photo?: string };

export const travels: Trip[] = [
  { name: 'Sénégal', region: 'Afrique de l’Ouest', lat: 14.5, lon: -14.5 },
  { name: 'Mayotte', region: 'Océan Indien', lat: -12.8, lon: 45.15 },
  { name: 'Comores', region: 'Océan Indien', lat: -11.7, lon: 43.3 },
  { name: 'Maurice', region: 'Océan Indien', lat: -20.25, lon: 57.55 },
  { name: 'La Réunion', region: 'Océan Indien', lat: -21.1, lon: 55.5 },
  { name: 'France', region: 'Europe', lat: 46.6, lon: 2.4 },
  { name: 'Belgique', region: 'Europe', lat: 50.6, lon: 4.7 },
  { name: 'Espagne', region: 'Europe', lat: 40.2, lon: -3.6 },
];

export const homes: Trip[] = [
  { name: 'Toulouse', region: 'Europe', lat: 43.6, lon: 1.44 },
];

export const contact = {
  sentence: 'Pour une opportunité de stage, un projet ou une question, n’hésitez pas à me contacter.',
};

// Les 6 compétences du BUT Informatique : verbe, intitulé officiel, phrase courte et exemple concret
export type ButSkill = { code: string; verb: string; official: string; text: string; example: string };
export const butSkills: ButSkill[] = [
  {
    code: 'C1 · DEV',
    verb: 'Réaliser',
    official: 'Réaliser un développement d’application',
    text: 'Transformer un besoin en application qui fonctionne.',
    example: 'Le site e-commerce en équipe et le portail RH développé en stage.',
  },
  {
    code: 'C2 · OPT',
    verb: 'Optimiser',
    official: 'Optimiser des applications informatiques',
    text: 'Rendre un programme plus rapide et plus fiable.',
    example: 'Les algorithmes de la simulation du Jeu de la vie.',
  },
  {
    code: 'C3 · ADM',
    verb: 'Administrer',
    official: 'Administrer des systèmes informatiques communicants complexes',
    text: 'Installer, configurer et maintenir des systèmes et des réseaux.',
    example: 'L’inventaire du matériel et des logiciels informatiques chez Sogéa.',
  },
  {
    code: 'C4 · BD',
    verb: 'Gérer',
    official: 'Gérer des données de l’information',
    text: 'Concevoir des bases de données et exploiter leurs données.',
    example: 'La base de données du portail RH, avec SQL, PL/SQL et Neo4j.',
  },
  {
    code: 'C5 · PRJ',
    verb: 'Conduire',
    official: 'Conduire un projet',
    text: 'Mener un projet, de l’analyse du besoin jusqu’à la livraison.',
    example: 'L’analyse des besoins du client pour le site e-commerce.',
  },
  {
    code: 'C6 · EQP',
    verb: 'Collaborer',
    official: 'Travailler dans une équipe informatique',
    text: 'Travailler efficacement avec une équipe et des clients.',
    example: 'Les projets menés en équipe pour de vrais clients.',
  },
];

// Loisirs : jeux vidéo et musique préférés.
// « colors » : les deux couleurs du dégradé de chaque affiche (visuels originaux, sans image protégée).
export type Game = { title: string; genre: string; studio: string; colors: [string, string] };
export type Song = { title: string; artist: string; style: string; colors: [string, string] };

export const hobbies = {
  games: {
    text: 'Passionné de jeux vidéo, j’aime autant y jouer que comprendre comment ils sont conçus. Cette curiosité m’a poussé à développer mon propre jeu : un Bomberman réalisé avec Godot.',
    list: [
      { title: 'Fortnite', genre: 'Battle royale', studio: 'Epic Games', colors: ['#7b3fe4', '#29b6f6'] },
      { title: 'Rocket League', genre: 'Football en voiture', studio: 'Psyonix', colors: ['#1565c0', '#ff7a18'] },
      { title: 'GTA V', genre: 'Monde ouvert', studio: 'Rockstar Games', colors: ['#2e7d32', '#f9a825'] },
      { title: 'Call of Duty', genre: 'Jeu de tir', studio: 'Activision', colors: ['#263238', '#8d6e63'] },
      { title: 'FIFA', genre: 'Football', studio: 'EA Sports', colors: ['#00796b', '#7cb342'] },
    ] satisfies Game[],
  },
  music: {
    text: 'Surtout du rap, français, belge et américain : les morceaux que j’écoute en boucle.',
    list: [
      { title: 'Life', artist: 'Hamza', style: 'Rap belge', colors: ['#3949ab', '#ec407a'] },
      { title: 'Jamal', artist: 'Werenoi', style: 'Rap français', colors: ['#bf360c', '#ffb300'] },
      { title: 'Before I Close My Eyes', artist: 'XXXTentacion', style: 'Rap américain', colors: ['#212121', '#78909c'] },
    ] satisfies Song[],
  },
};
