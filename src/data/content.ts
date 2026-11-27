/**
 * TOUT LE TEXTE DU SITE EST ICI.
 * Modifiez ce fichier pour changer une phrase, ajouter un projet, une compétence ou un voyage :
 * le site se met à jour tout seul (npm run dev).
 */
import type { TechLogoName } from '../components/TechLogo';

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
// id : ancre du lien depuis les compétences (#experience-…)
export type Job = { id: string; role: string; company: string; type: string; points: string[]; tech?: TechLogoName[] };

export const experiences: Job[] = [
  {
    id: 'experience-portail-rh',
    role: 'Développeur web',
    company: 'Assemblée Départementale de Mayotte',
    type: 'Stage',
    points: [
      "Développement d'un portail web interne de gestion des ressources humaines regroupant une FAQ RH, les actualités RH et un système de tickets d'assistance.",
      'Analyse des besoins des utilisateurs et gestion de la base de données.',
    ],
  },
  {
    id: 'experience-sogea',
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
 * tech : logos affichés sur la carte (noms de la liste TechLogoName dans components/TechLogo.tsx)
 * link : facultatif, par exemple le dépôt GitHub du projet
 * Les compétences affichées sur la carte sont déduites automatiquement des preuves listées dans « competences » plus bas.
 * image : facultatif, une capture d'écran du projet (dossier assets/images/projects)
 */
export type Project = {
  id: string;
  category: string;
  title: string;
  context?: string;
  description: string;
  highlights?: string[];
  tech?: TechLogoName[];
  link?: { label: string; href: string };
  image?: string;
};

export const projects: Project[] = [
  {
    id: 'projet-ecommerce',
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
    id: 'projet-besoin-client',
    category: 'Projet client',
    title: "Implémentation d'un besoin client",
    context: 'Projet en équipe',
    description: "Développement d'une application répondant au besoin exprimé par un client.",
    highlights: ['Collecte des besoins en entretien', 'Conception de la solution en équipe'],
  },
  {
    id: 'projet-bomberman',
    category: 'Jeu vidéo',
    title: 'Bomberman',
    context: 'Projet de formation',
    description: 'Conception et développement d’un jeu vidéo de type Bomberman avec le moteur de jeu Godot.',
    tech: ['Godot'],
  },
  {
    id: 'projet-jeu-de-la-vie',
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
// Les outils avec un logo (voir components/TechLogo.tsx pour la liste des logos disponibles)
export const toolGroups: { title: string; items: TechLogoName[] }[] = [
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

/* ---------- Compétences ----------
 * Six compétences présentées avec mes mots : ce que je sais faire, comment j'ai progressé, et les preuves.
 * proofs : liens vers un projet (#projet-…), une expérience (#experience-…) ou une page externe.
 */
export type CompetenceId = 'developper' | 'optimiser' | 'administrer' | 'donnees' | 'projet' | 'equipe';
export type Proof = { label: string; href: string; comment: string };
export type Competence = {
  id: CompetenceId;
  verb: string;
  title: string;
  text: string;
  before: string;
  now: string;
  proofs: Proof[];
  note?: string;
};

const portfolioRepo = 'https://github.com/kkafe/kkafe.github.io';

export const competences: Competence[] = [
  {
    id: 'developper',
    verb: 'Développer',
    title: 'Concevoir et coder des applications',
    text: 'Transformer un besoin en une application web ou un logiciel qui fonctionne.',
    before: 'De petits programmes pour apprendre les bases de la programmation.',
    now: 'Des applications web complètes, de l’interface à la base de données, utilisées par de vrais utilisateurs.',
    proofs: [
      { label: 'Portail RH (stage)', href: '#experience-portail-rh', comment: 'Portail interne utilisé par les agents de l’Assemblée départementale.' },
      { label: 'Site e-commerce', href: '#projet-ecommerce', comment: 'Produits, paniers et commandes, développés en équipe.' },
      { label: 'Bomberman', href: '#projet-bomberman', comment: 'Un jeu vidéo complet, réalisé avec le moteur Godot.' },
    ],
  },
  {
    id: 'optimiser',
    verb: 'Optimiser',
    title: 'Rendre un programme rapide et fiable',
    text: 'Choisir les bons algorithmes et repérer ce qui ralentit un programme.',
    before: 'Des programmes qui fonctionnaient, sans me soucier de leur rapidité.',
    now: 'Je mesure ce qui ralentit une application et je le corrige.',
    proofs: [
      { label: 'Jeu de la vie', href: '#projet-jeu-de-la-vie', comment: 'Calculer chaque génération d’une grande grille sans ralentissement.' },
      { label: 'Ce portfolio', href: portfolioRepo, comment: 'Chargement à la demande et animations allégées : une note de performance de 89/100 sur téléphone.' },
    ],
  },
  {
    id: 'administrer',
    verb: 'Administrer',
    title: 'Installer et maintenir un parc informatique',
    text: 'Installer, configurer et suivre le matériel, les logiciels et les mises en ligne.',
    before: 'Une découverte en cours : systèmes d’exploitation, réseaux et ligne de commande.',
    now: 'Une première expérience en entreprise, et la mise en ligne automatique de mes projets.',
    proofs: [
      { label: 'Sogéa', href: '#experience-sogea', comment: 'Mise à jour de l’inventaire du matériel et des logiciels.' },
      { label: 'Ce portfolio', href: portfolioRepo, comment: 'Mis en ligne automatiquement à chaque modification du code.' },
    ],
    note: 'C’est la compétence que j’ai le moins pratiquée : je souhaite la renforcer.',
  },
  {
    id: 'donnees',
    verb: 'Gérer',
    title: 'Concevoir et exploiter des bases de données',
    text: 'Organiser les données, écrire les requêtes et garder les informations fiables.',
    before: 'Des requêtes SQL simples sur des bases déjà prêtes.',
    now: 'Je conçois une base complète, du schéma aux requêtes, en SQL comme avec Neo4j.',
    proofs: [
      { label: 'Portail RH (stage)', href: '#experience-portail-rh', comment: 'Base de données des tickets, de la FAQ et des actualités.' },
      { label: 'Site e-commerce', href: '#projet-ecommerce', comment: 'Produits, utilisateurs, paniers et commandes.' },
    ],
  },
  {
    id: 'projet',
    verb: 'Conduire',
    title: 'Mener un projet, du besoin à la livraison',
    text: 'Comprendre ce que veut le client, organiser le travail, puis livrer.',
    before: 'Suivre un sujet déjà défini par les enseignants.',
    now: 'Je recueille moi-même les besoins en entretien et je les transforme en solution.',
    proofs: [
      { label: 'Besoin client', href: '#projet-besoin-client', comment: 'Besoins recueillis en entretien avec le client.' },
      { label: 'Portail RH (stage)', href: '#experience-portail-rh', comment: 'Analyse des besoins des utilisateurs du service RH.' },
      { label: 'Site e-commerce', href: '#projet-ecommerce', comment: 'Besoins du client analysés avant de concevoir la solution.' },
    ],
  },
  {
    id: 'equipe',
    verb: 'Collaborer',
    title: 'Travailler en équipe et avec des clients',
    text: 'Se répartir le travail, communiquer et s’adapter aux autres.',
    before: 'Des travaux de groupe entre étudiants.',
    now: 'Des projets en équipe pour de vrais clients, et le travail au sein d’une entreprise.',
    proofs: [
      { label: 'Site e-commerce', href: '#projet-ecommerce', comment: 'Projet mené en équipe pour un client.' },
      { label: 'Besoin client', href: '#projet-besoin-client', comment: 'Solution conçue en équipe avec le client.' },
      { label: 'Sogéa', href: '#experience-sogea', comment: 'Travail en équipe et en autonomie.' },
    ],
  },
];

// Loisirs : jeux vidéo et musique préférés.
// « image » : l'affiche ou la pochette (dossiers assets/images/games et assets/images/music). Sans image, un dégradé avec les deux « colors » la remplace.
import codImg from '../assets/images/games/call-of-duty.webp';
import gtaImg from '../assets/images/games/gta-6.webp';
import rocketImg from '../assets/images/games/rocket-league.webp';
import fortniteImg from '../assets/images/games/fortnite.webp';
import xxxImg from '../assets/images/music/before-i-close-my-eyes-xxxtentacion.webp';
import hamzaImg from '../assets/images/music/life-hamza.webp';
import werenoiImg from '../assets/images/music/jamal-werenoi.webp';
import fcImg from '../assets/images/games/fc-27.webp';

export type Game = { title: string; genre: string; studio: string; image?: string; colors: [string, string] };
export type Song = { title: string; artist: string; style: string; image?: string; colors: [string, string] };

export const hobbies = {
  games: {
    list: [
      { title: 'Fortnite', genre: 'Battle royale', studio: 'Epic Games', image: fortniteImg, colors: ['#7b3fe4', '#29b6f6'] },
      { title: 'Rocket League', genre: 'Football en voiture', studio: 'Psyonix', image: rocketImg, colors: ['#1565c0', '#ff7a18'] },
      { title: 'GTA VI', genre: 'Monde ouvert', studio: 'Rockstar Games', image: gtaImg, colors: ['#2e7d32', '#f9a825'] },
      { title: 'Call of Duty: Warzone', genre: 'Battle royale', studio: 'Activision', image: codImg, colors: ['#263238', '#8d6e63'] },
      { title: 'EA Sports FC 27', genre: 'Football', studio: 'EA Sports', image: fcImg, colors: ['#00796b', '#7cb342'] },
    ] satisfies Game[],
  },
  music: {
    list: [
      { title: 'Life', artist: 'Hamza', style: 'Rappeur belge', image: hamzaImg, colors: ['#3949ab', '#ec407a'] },
      { title: 'Jamal', artist: 'Werenoi', style: 'Rappeur français', image: werenoiImg, colors: ['#bf360c', '#ffb300'] },
      { title: 'Before I Close My Eyes', artist: 'XXXTentacion', style: 'Rappeur américain', image: xxxImg, colors: ['#212121', '#78909c'] },
    ] satisfies Song[],
  },
};

/** Compétences qui citent un projet ou une expérience comme preuve (liens dans les deux sens). */
export const competencesFor = (anchorId: string) => competences.filter((c) => c.proofs.some((p) => p.href === `#${anchorId}`));
