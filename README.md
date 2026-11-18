# Portfolio de Kiliane Kafe

Site d'une page construit avec **React**, **TypeScript**, **Tailwind CSS** et **Motion** (animations), lancé avec **Vite**.
Logos des langages : **Devicon** (paquet `devicons-react`). Globe des voyages et jeu de la vie : dessinés en **canvas**.
Style : sobre et professionnel, fond clair et les couleurs du CV (blanc, gris clair, noir et taupe en accent), animations fluides au défilement. Mode clair par défaut, mode sombre avec le bouton en haut.

## Avant de commencer

Il faut **Node.js** (version 20 ou plus). Pour vérifier, tapez dans un terminal :

```bash
node -v
```

Si la commande n'est pas reconnue, installez la version LTS depuis https://nodejs.org puis redémarrez VS Code.

## Lancer le site

1. Dans VS Code : **Fichier > Ouvrir le dossier…** puis choisissez `portfolio-react`.
2. Ouvrez un terminal : **Terminal > Nouveau terminal**.
3. Installez les dépendances (une seule fois) :

   ```bash
   npm install
   ```

4. Lancez le site :

   ```bash
   npm run dev
   ```

5. Ouvrez l'adresse affichée (en général http://localhost:5173). Chaque fois que vous enregistrez un fichier, la page se met à jour.

VS Code propose d'installer l'extension **Tailwind CSS IntelliSense** : acceptez, elle complète les classes de style.

## Où modifier quoi

| Je veux changer…                                  | Fichier                          |
| ------------------------------------------------- | -------------------------------- |
| Un texte, une expérience, un projet, une formation, une compétence, un voyage | `src/data/content.ts` |
| Ajouter un lien GitHub ou des logos sur un projet | `src/data/content.ts`, champs `link` et `tech` du projet |
| Ajouter un logo de langage ou d'outil             | `src/components/Logo.tsx` (logos Devicon, liste sur https://devicon.dev) |
| Les couleurs                                      | `src/index.css`, bloc `@theme` (mode clair) et `.dark` (mode sombre) |
| La photo                                          | `src/assets/portrait.webp`       |
| Le CV téléchargeable                              | `public/cv/CV-Kiliane-Kafe.pdf`  |
| La mise en page d'une section                     | `src/sections/` (un fichier par section) |

Le globe des voyages est dessiné à partir de `src/data/land-dots.json` (les points des continents, déjà calculés) : il n'y a rien à y toucher. Pour ajouter un pays, ajoutez une ligne dans `travels` avec sa latitude et sa longitude.

Exemple : pour ajouter un projet, copiez un bloc `{ kind: 'Projet', … }` dans la liste `projects` de `src/data/content.ts` et modifiez-le. Pour un lien :

```ts
link: { label: 'Voir le code', href: 'https://github.com/kkafe/mon-projet' },
```

## Organisation du projet

```
portfolio-react/
├── public/                 fichiers copiés tels quels (favicon, CV)
├── src/
│   ├── data/content.ts     tout le texte du site
│   ├── sections/           Accueil, Profil, Expérience, Projets, Compétences, Formation, Voyages, Contact, pied de page
│   ├── components/         navigation, en-têtes de section, frise, globe, logos, signature, icônes
│   ├── hooks/              section active, couleurs du thème
│   ├── assets/             photo
│   ├── App.tsx             assemble les sections
│   └── index.css           couleurs, police, styles globaux
├── .github/workflows/      mise en ligne automatique sur GitHub Pages
└── index.html
```

## Mettre le site en ligne (GitHub Pages)

1. Sur GitHub, créez un dépôt public nommé `kkafe.github.io`.
2. Envoyez-y le contenu du dossier `portfolio-react` (dans VS Code : onglet **Contrôle de code source** puis **Publier sur GitHub**).
3. Dans le dépôt : **Settings > Pages > Source : GitHub Actions**.
4. À chaque envoi sur la branche `main`, le site est reconstruit et mis en ligne à l'adresse https://kkafe.github.io (onglet **Actions** pour suivre).

## Autres commandes

- `npm run build` : prépare la version finale dans `dist/`
- `npm run preview` : affiche cette version finale en local

