/*
 * Contenu des cartes de présentation (fenêtres qui s'ouvrent au clic
 * sur un langage dans « Compétences » ou sur un pays dans « Voyages »).
 * « usage » : votre propre expérience, à compléter ou modifier librement.
 */
import type { LogoName } from '../components/Logo';

export type Fact = { label: string; value: string };
/** Photo du monument (hébergée par Wikimedia Commons, avec son auteur et sa licence). */
export type Photo = {
  src: string;
  monument: string;
  /** Auteur de la photo */
  credit: string;
  /** Nom de la licence Creative Commons et lien vers son texte */
  license: string;
  licenseUrl: string;
  /** Page de la photo sur Wikimedia Commons */
  source: string;
  position?: string;
};
export type Card = { kind: string; summary: string; facts: Fact[]; usage?: string; photo?: Photo };

export const skillCards: Record<LogoName, Card> = {
  Java: {
    kind: 'Langage de programmation',
    summary: 'Langage orienté objet, compilé pour la machine virtuelle Java : le même programme fonctionne sur tous les systèmes.',
    facts: [
      { label: 'Créé en', value: '1995' },
      { label: 'Auteur', value: 'Sun Microsystems' },
      { label: 'Usages', value: 'Applications, back-end, Android' },
    ],
    usage: 'Programmation orientée objet en BUT Informatique.',
  },
  Python: {
    kind: 'Langage de programmation',
    summary: 'Langage interprété réputé pour sa syntaxe lisible, très utilisé pour les scripts, l’analyse de données et l’intelligence artificielle.',
    facts: [
      { label: 'Créé en', value: '1991' },
      { label: 'Auteur', value: 'Guido van Rossum' },
      { label: 'Usages', value: 'Scripts, données, IA' },
    ],
    usage: 'Algorithmique et scripts en BUT Informatique.',
  },
  'C++': {
    kind: 'Langage de programmation',
    summary: 'Langage compilé proche de la machine, conçu pour la performance : on le retrouve dans les logiciels système et les jeux vidéo.',
    facts: [
      { label: 'Créé en', value: '1985' },
      { label: 'Auteur', value: 'Bjarne Stroustrup' },
      { label: 'Usages', value: 'Systèmes, jeux, embarqué' },
    ],
    usage: 'Programmation compilée en BUT Informatique.',
  },
  HTML: {
    kind: 'Langage de balisage',
    summary: 'Le langage qui structure les pages web : titres, paragraphes, liens, images et formulaires.',
    facts: [
      { label: 'Créé en', value: '1991' },
      { label: 'Auteur', value: 'Tim Berners-Lee' },
      { label: 'Rôle', value: 'Structure des pages' },
    ],
    usage: 'Structure des pages de mes applications web, dont le portail RH réalisé en stage.',
  },
  CSS: {
    kind: 'Langage de style',
    summary: 'Le langage qui met en forme les pages web : couleurs, typographie, mise en page et adaptation aux écrans.',
    facts: [
      { label: 'Créé en', value: '1996' },
      { label: 'Normalisé par', value: 'le W3C' },
      { label: 'Rôle', value: 'Apparence des pages' },
    ],
    usage: 'Mise en forme et adaptation mobile de mes applications web.',
  },
  PHP: {
    kind: 'Langage serveur',
    summary: 'Langage exécuté côté serveur pour générer des pages dynamiques et dialoguer avec une base de données.',
    facts: [
      { label: 'Créé en', value: '1995' },
      { label: 'Auteur', value: 'Rasmus Lerdorf' },
      { label: 'Rôle', value: 'Logique côté serveur' },
    ],
    usage: 'Développement côté serveur de mes applications web.',
  },
  JavaScript: {
    kind: 'Langage de programmation',
    summary: 'Le langage du navigateur : il rend les pages interactives et s’utilise aussi côté serveur.',
    facts: [
      { label: 'Créé en', value: '1995' },
      { label: 'Auteur', value: 'Brendan Eich' },
      { label: 'Rôle', value: 'Interactivité web' },
    ],
    usage: 'Interactions et comportements dynamiques de mes interfaces web.',
  },
  SQL: {
    kind: 'Langage de requête',
    summary: 'Le langage standard des bases de données relationnelles : créer des tables, interroger et mettre à jour les données.',
    facts: [
      { label: 'Créé en', value: '1974' },
      { label: 'Origine', value: 'IBM' },
      { label: 'Outil utilisé', value: 'MySQL' },
    ],
    usage: 'Gestion de la base de données du portail RH pendant mon stage.',
  },
  'PL/SQL': {
    kind: 'Langage procédural',
    summary: 'L’extension d’Oracle qui ajoute à SQL des variables, des conditions et des boucles, pour écrire procédures, fonctions et déclencheurs.',
    facts: [
      { label: 'Éditeur', value: 'Oracle' },
      { label: 'Base de', value: 'SQL' },
      { label: 'Outil utilisé', value: 'SQL Developer' },
    ],
    usage: 'Requêtes et procédures sur des bases Oracle avec SQL Developer.',
  },
  Cypher: {
    kind: 'Langage de requête',
    summary: 'Le langage des bases de données orientées graphe : les données y sont des nœuds reliés par des relations.',
    facts: [
      { label: 'Créé en', value: '2011' },
      { label: 'Éditeur', value: 'Neo4j' },
      { label: 'Modèle', value: 'Graphe' },
    ],
    usage: 'Modélisation et interrogation de données en graphe en BUT Informatique.',
  },
  TypeScript: {
    kind: 'Langage de programmation',
    summary: 'JavaScript avec des types : les erreurs sont repérées avant même de lancer le programme.',
    facts: [
      { label: 'Créé en', value: '2012' },
      { label: 'Éditeur', value: 'Microsoft' },
      { label: 'Base de', value: 'JavaScript' },
    ],
    usage: 'Le code de ce portfolio est écrit en TypeScript.',
  },
  React: {
    kind: 'Bibliothèque web',
    summary: 'Bibliothèque JavaScript pour construire des interfaces à partir de composants réutilisables.',
    facts: [
      { label: 'Créé en', value: '2013' },
      { label: 'Éditeur', value: 'Meta' },
      { label: 'Rôle', value: 'Interfaces web' },
    ],
    usage: 'Ce portfolio est développé avec React.',
  },
  Vue: {
    kind: 'Framework web',
    summary: 'Framework JavaScript progressif pour créer des interfaces web réactives.',
    facts: [
      { label: 'Créé en', value: '2014' },
      { label: 'Auteur', value: 'Evan You' },
      { label: 'Rôle', value: 'Interfaces web' },
    ],
    usage: 'Création d’interfaces web dynamiques.',
  },
  Git: {
    kind: 'Gestion de versions',
    summary: 'Outil qui garde l’historique de chaque modification du code et permet de travailler à plusieurs.',
    facts: [
      { label: 'Créé en', value: '2005' },
      { label: 'Auteur', value: 'Linus Torvalds' },
      { label: 'Plateforme', value: 'GitHub' },
    ],
    usage: 'Suivi de mes projets, dont ce portfolio publié sur GitHub.',
  },
  Oracle: {
    kind: 'Base de données',
    summary: 'Système de base de données relationnelle très utilisé en entreprise.',
    facts: [
      { label: 'Créé en', value: '1979' },
      { label: 'Éditeur', value: 'Oracle' },
      { label: 'Langage', value: 'SQL, PL/SQL' },
    ],
    usage: 'Bases de données en BUT Informatique, avec SQL Developer.',
  },
  MySQL: {
    kind: 'Base de données',
    summary: 'Base de données relationnelle open source, très répandue sur le web.',
    facts: [
      { label: 'Créé en', value: '1995' },
      { label: 'Licence', value: 'Open source' },
      { label: 'Langage', value: 'SQL' },
    ],
    usage: 'Base de données du portail RH réalisé en stage.',
  },
  Neo4j: {
    kind: 'Base de données',
    summary: 'Base de données orientée graphe : les données sont des nœuds reliés par des relations.',
    facts: [
      { label: 'Créé en', value: '2007' },
      { label: 'Modèle', value: 'Graphe' },
      { label: 'Langage', value: 'Cypher' },
    ],
    usage: 'Bases de données en graphe en BUT Informatique.',
  },
  'Vibe coding': {
    kind: 'Développement avec l’IA',
    summary: 'Développer en décrivant à une IA ce que l’on veut construire, puis relire, tester et corriger le code qu’elle propose.',
    facts: [
      { label: 'Apparu en', value: '2025' },
      { label: 'Outil', value: 'Claude' },
      { label: 'Atout', value: 'Prototyper vite' },
    ],
    usage: 'Prototypage rapide avec Claude, en gardant la main sur la relecture et les tests.',
  },
  Godot: {
    kind: 'Moteur de jeu',
    summary: 'Moteur de jeu libre et open source pour créer des jeux 2D et 3D, avec son propre langage de script, le GDScript.',
    facts: [
      { label: 'Sorti en', value: '2014' },
      { label: 'Licence', value: 'Libre (MIT)' },
      { label: 'Langage', value: 'GDScript' },
    ],
    usage: 'Conception et développement du jeu Bomberman.',
  },
};

export const countryCards: Record<string, Card> = {
  France: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Eiffel_tower_at_dawn_horizontal.jpg/960px-Eiffel_tower_at_dawn_horizontal.jpg',
      monument: 'Tour Eiffel, Paris',
      credit: 'Nitot',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Eiffel_tower_at_dawn_horizontal.jpg',
      position: 'center 0%',
    },
    kind: 'Europe',
    summary: 'Pays d’Europe de l’Ouest, première destination touristique au monde, où je poursuis mes études à Toulouse.',
    facts: [
      { label: 'Capitale', value: 'Paris' },
      { label: 'Langue', value: 'Français' },
      { label: 'Monnaie', value: 'Euro' },
    ],
    usage: 'Études en BUT Informatique à l’IUT de Blagnac, près de Toulouse.',
  },
  Sénégal: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Monument_renaissance.jpg/960px-Monument_renaissance.jpg',
      monument: 'Monument de la Renaissance africaine, Dakar',
      credit: 'Tafsir207',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Monument_renaissance.jpg',
      position: 'center 35%',
    },
    kind: 'Afrique de l’Ouest',
    summary: 'Pays de la côte atlantique, connu pour la ville de Dakar, l’île de Gorée et le lac Rose.',
    facts: [
      { label: 'Capitale', value: 'Dakar' },
      { label: 'Langues', value: 'Français, wolof' },
      { label: 'Monnaie', value: 'Franc CFA' },
    ],
  },
  Mayotte: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tsingoni_minaret.jpg/960px-Tsingoni_minaret.jpg',
      monument: 'Mosquée de Tsingoni, la plus ancienne mosquée de France',
      credit: 'Ornella Lamberti',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Tsingoni_minaret.jpg',
      position: 'center 40%',
    },
    kind: 'Océan Indien',
    summary: 'Département français de l’archipel des Comores, entouré de l’un des plus grands lagons du monde.',
    facts: [
      { label: 'Chef-lieu', value: 'Mamoudzou' },
      { label: 'Langues', value: 'Français, shimaoré' },
      { label: 'Monnaie', value: 'Euro' },
    ],
    usage: 'Stage à l’Assemblée Départementale et engagement au Conseil Municipal des Jeunes de Mamoudzou.',
  },
  Comores: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flickr_-_Woodlouse_-_Old_Friday_Mosque_and_harbour%2C_Moroni.jpg/960px-Flickr_-_Woodlouse_-_Old_Friday_Mosque_and_harbour%2C_Moroni.jpg',
      monument: 'Ancienne mosquée du Vendredi, Moroni',
      credit: 'Woodlouse',
      license: 'CC BY-SA 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Woodlouse_-_Old_Friday_Mosque_and_harbour%2C_Moroni.jpg',
      position: 'center 30%',
    },
    kind: 'Océan Indien',
    summary: 'Archipel volcanique entre Madagascar et le Mozambique, réputé pour la vanille et l’ylang-ylang.',
    facts: [
      { label: 'Capitale', value: 'Moroni' },
      { label: 'Langues', value: 'Comorien, français, arabe' },
      { label: 'Monnaie', value: 'Franc comorien' },
    ],
  },
  Maurice: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Le_Morne_Peninsula_in_Mauritius_%2853697779236%29.jpg/960px-Le_Morne_Peninsula_in_Mauritius_%2853697779236%29.jpg',
      monument: 'Le Morne Brabant, patrimoine mondial de l’UNESCO',
      credit: 'dronepicr',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Le_Morne_Peninsula_in_Mauritius_%2853697779236%29.jpg',
      position: 'center',
    },
    kind: 'Océan Indien',
    summary: 'Île des Mascareignes aux plages bordées de lagons, au carrefour des cultures africaine, indienne, européenne et chinoise.',
    facts: [
      { label: 'Capitale', value: 'Port-Louis' },
      { label: 'Langues', value: 'Anglais, français, créole' },
      { label: 'Monnaie', value: 'Roupie mauricienne' },
    ],
  },
  'La Réunion': {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Piton_de_la_Fournaise%2C_R%C3%A9union_Island_%28High_Resolution%29.jpg/960px-Piton_de_la_Fournaise%2C_R%C3%A9union_Island_%28High_Resolution%29.jpg',
      monument: 'Piton de la Fournaise',
      credit: 'Brian Iannone',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Piton_de_la_Fournaise%2C_R%C3%A9union_Island_%28High_Resolution%29.jpg',
      position: 'center',
    },
    kind: 'Océan Indien',
    summary: 'Département français volcanique, connu pour le Piton de la Fournaise et ses cirques classés au patrimoine mondial.',
    facts: [
      { label: 'Chef-lieu', value: 'Saint-Denis' },
      { label: 'Langues', value: 'Français, créole' },
      { label: 'Monnaie', value: 'Euro' },
    ],
  },
  Belgique: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Atomium_Belgium_1.jpg/960px-Atomium_Belgium_1.jpg',
      monument: 'Atomium, Bruxelles',
      credit: 'o palsson',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Atomium_Belgium_1.jpg',
      position: 'center 45%',
    },
    kind: 'Europe',
    summary: 'Pays au cœur de l’Europe, siège des principales institutions de l’Union européenne.',
    facts: [
      { label: 'Capitale', value: 'Bruxelles' },
      { label: 'Langues', value: 'Néerlandais, français, allemand' },
      { label: 'Monnaie', value: 'Euro' },
    ],
  },
  Espagne: {
    photo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sagrada_Familia_01.jpg/960px-Sagrada_Familia_01.jpg',
      monument: 'Sagrada Família, Barcelone',
      credit: 'Bernard Gagnon',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/deed.fr',
      source: 'https://commons.wikimedia.org/wiki/File:Sagrada_Familia_01.jpg',
      position: 'center',
    },
    kind: 'Europe',
    summary: 'Pays de la péninsule Ibérique, entre Méditerranée et Atlantique, riche d’un patrimoine historique très varié.',
    facts: [
      { label: 'Capitale', value: 'Madrid' },
      { label: 'Langue', value: 'Espagnol' },
      { label: 'Monnaie', value: 'Euro' },
    ],
  },
};
