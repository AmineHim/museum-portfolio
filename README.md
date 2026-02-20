# 🏛️ Portfolio — Musée Virtuel Interactif

> Un portfolio personnel immersif sous la forme d'un musée 3D navigable à la première personne, construit avec React et React Three Fiber.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r158-000000?logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table des matières

1. [Description du projet](#-description-du-projet)
2. [Fonctionnalités](#-fonctionnalités)
3. [Architecture du projet](#-architecture-du-projet)
4. [Lancer le projet localement](#-lancer-le-projet-localement)
5. [Personnaliser le contenu](#-personnaliser-le-contenu)
6. [Déployer gratuitement](#-déployer-gratuitement)
7. [Ajouter un nouveau tableau](#-ajouter-un-nouveau-tableau)
8. [Stack technique](#-stack-technique)

---

## 🎨 Description du projet

Ce portfolio prend la forme d'un **musée virtuel interactif** en 3D. L'utilisateur incarne un visiteur en vue à la première personne (FPS) qui déambule dans une galerie d'art minimaliste et contemporaine.

Chaque **tableau accroché aux murs** représente une section du portfolio :

| Tableau | Contenu | Mur |
|---------|---------|-----|
| 🔵 Expérience Professionnelle | Airbus — Data Analyst | Gauche |
| 🟠 Parcours Académique | YNOV, Université de Toulouse, Lycée | Fond gauche |
| 🟢 Projets Personnels | Véhicule autonome, etc. | Fond droit |
| 🟣 Contact | LinkedIn, GitHub | Droit |

### Contrôles
| Action | Touches |
|--------|---------|
| Avancer | `Z` ou `↑` |
| Reculer | `S` ou `↓` |
| Gauche | `Q` ou `←` |
| Droite | `D` ou `→` |
| Regarder | Souris (après clic pour verrouiller) |
| Interagir | `E` ou clic sur le tableau |
| Déverrouiller | `Échap` |

---

## ✨ Fonctionnalités

- **Navigation FPS complète** avec Pointer Lock API (souris libre pour regarder)
- **4 tableaux interactifs** avec œuvres abstraites générées procéduralement (canvas 2D)
- **Détection de proximité** : prompt contextuel qui apparaît quand on s'approche d'un tableau
- **Modales de contenu élégantes** avec animations, scrollables, fermables par `Échap` ou clic extérieur
- **Éclairage dynamique** : spots de galerie au-dessus de chaque tableau, variation de lumière à l'approche
- **Salle réaliste** : parquet procédural, plinthes, brouillard atmosphérique
- **Design typographique** : Cormorant Garamond (titres) + DM Sans (corps)
- **Architecture modulaire** : tout le contenu est dans un seul fichier de données

---

## 📁 Architecture du projet

```
museum-portfolio/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── main.jsx              # Point d'entrée React
│   ├── App.jsx               # Orchestrateur principal (machine à états)
│   ├── index.css             # Styles globaux (CSS variables + composants UI)
│   │
│   ├── data/
│   │   └── artworks.js       # ✏️  TOUT LE CONTENU est ici — facile à modifier
│   │
│   └── components/
│       ├── Scene.jsx         # Canvas R3F — composition de la scène 3D
│       ├── Room.jsx          # Géométrie : murs, sol, plafond, éclairage
│       ├── Artwork.jsx       # Tableau 3D : cadre + texture canvas abstraite
│       ├── PlayerControls.jsx # Mouvement FPS + détection proximité
│       ├── HUD.jsx           # Interface 2D : viseur, prompt, aide contrôles
│       └── Modal.jsx         # Panneau de contenu portfolio (4 types)
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Lancer le projet localement

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18 ou supérieure → [Télécharger Node.js](https://nodejs.org/)
- **npm** (inclus avec Node.js) ou **pnpm** / **yarn**

Pour vérifier votre version de Node :
```bash
node --version   # doit afficher v18.x.x ou supérieur
```

---

### Étape 1 — Récupérer le projet

**Option A — depuis GitHub (recommandé) :**
```bash
git clone https://github.com/VOTRE_NOM/museum-portfolio.git
cd museum-portfolio
```

**Option B — décompresser l'archive :**
```bash
unzip museum-portfolio.zip
cd museum-portfolio
```

---

### Étape 2 — Installer les dépendances

```bash
npm install
```

> ☕ Cette opération télécharge Three.js, React Three Fiber et toutes les dépendances (~120 MB). Elle ne dure qu'une fois.

---

### Étape 3 — Lancer le serveur de développement

```bash
npm run dev
```

Vous verrez dans le terminal :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Ouvrez **http://localhost:5173** dans votre navigateur.

> ⚠️ **Note** : le Pointer Lock API (verrouillage de la souris) requiert un contexte sécurisé. Il fonctionne parfaitement sur `localhost`. Sur un réseau local (`192.168.x.x`), il peut être bloqué selon le navigateur.

---

### Étape 4 — Construire pour la production

```bash
npm run build
```

Le dossier `dist/` contient les fichiers optimisés prêts à être déployés.

Pour prévisualiser le build localement :
```bash
npm run preview
```

---

## ✏️ Personnaliser le contenu

**Tout le contenu du portfolio se trouve dans un seul fichier :**

```
src/data/artworks.js
```

### Modifier vos informations

Ouvrez `artworks.js` et cherchez les commentaires `// ✏️` pour identifier les champs à modifier :

```js
// Exemple : changer les liens de contact
links: [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/VOTRE-PROFIL',  // ✏️ Votre URL
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/VOTRE-PROFIL',       // ✏️ Votre URL
    icon: 'github',
  },
],
```

---

## 🌐 Déployer gratuitement

### Option A — Vercel (recommandé, le plus simple)

**Vercel** détecte automatiquement les projets Vite/React et les déploie en quelques secondes.

#### Méthode 1 — Via l'interface web

1. **Créer un compte** sur [vercel.com](https://vercel.com) (gratuit, avec votre GitHub)
2. **Pousser votre code sur GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_NOM/museum-portfolio.git
   git push -u origin main
   ```
3. Sur Vercel → **"Add New Project"** → **"Import Git Repository"**
4. Sélectionnez votre dépôt `museum-portfolio`
5. Vercel détecte Vite automatiquement. Cliquez **"Deploy"**
6. Votre site est en ligne à `https://museum-portfolio-xxx.vercel.app` 🎉

#### Méthode 2 — Via la CLI Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Suivez les instructions. Choisissez `Yes` pour "Link to existing project?" si vous en avez un, sinon `No` pour en créer un nouveau.

---

### Option B — Netlify

1. **Créer un compte** sur [netlify.com](https://netlify.com) (gratuit)
2. **Construire le projet** :
   ```bash
   npm run build
   ```
3. Sur Netlify → **"Add new site"** → **"Deploy manually"**
4. **Glissez-déposez le dossier `dist/`** sur la zone de dépôt Netlify
5. Votre site est instantanément en ligne 🎉

**OU** via GitHub (déploiement automatique à chaque push) :
1. Netlify → **"Add new site"** → **"Import an existing project"**
2. Connectez GitHub → choisissez votre dépôt
3. Build command : `npm run build`
4. Publish directory : `dist`
5. Cliquez **"Deploy site"**

---

### Option C — GitHub Pages

GitHub Pages ne supporte pas nativement les Single Page Apps avec routing côté client, mais avec Vite c'est simple :

1. **Modifier `vite.config.js`** pour ajouter le `base` :
   ```js
   // vite.config.js
   export default defineConfig({
     plugins: [react()],
     base: '/museum-portfolio/',   // ← nom de votre dépôt GitHub
   })
   ```

2. **Installer le plugin de déploiement** :
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Ajouter les scripts dans `package.json`** :
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Déployer** :
   ```bash
   npm run deploy
   ```

5. Sur GitHub → Settings → Pages → Source : branche `gh-pages`
6. Votre site sera disponible à `https://VOTRE_NOM.github.io/museum-portfolio/`

---

## 🖼️ Ajouter un nouveau tableau

1. **Ouvrir `src/data/artworks.js`**

2. **Copier-coller ce template** à la fin du tableau `ARTWORKS` :

```js
{
  id: 'mon-nouveau-tableau',          // identifiant unique (lettres/tirets)
  title: 'Mon Nouveau\nTableau',      // titre affiché sur le tableau (retour à la ligne avec \n)
  label: 'Mon Nouveau Tableau',       // titre affiché dans les prompts HUD
  eyebrow: 'Catégorie',               // petit label en haut de la modale
  
  // ── Position dans la salle [x, y, z] ─────────────────────────
  // Mur gauche  :  x ≈ -11.3,  rotation: [0, Math.PI/2, 0]
  // Mur droit   :  x ≈  11.3,  rotation: [0, -Math.PI/2, 0]
  // Mur du fond :  z ≈ -11.3,  rotation: [0, 0, 0]
  position: [0, 2.3, -11.3],
  rotation: [0, 0, 0],
  
  size: [3.5, 2.5],                  // [largeur, hauteur] en unités 3D
  artColor: '#2C4A6E',               // couleur principale de l'œuvre abstraite
  artAccent: '#5B8FB9',              // couleur d'accent
  
  type: 'projects',                   // 'experience' | 'education' | 'projects' | 'contact'
  content: {
    // Contenu selon le type choisi (voir exemples dans le fichier)
  },
},
```

3. **Sauvegarder** → Vite recharge automatiquement 🔄

> 💡 Pour un nouveau type de contenu entièrement personnalisé, ajoutez un `case` dans le switch de `src/components/Modal.jsx` et créez le composant de rendu correspondant.

---

## 🛠️ Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 18.2 | UI et gestion d'état |
| **React Three Fiber** | 8.15 | Pont React ↔ Three.js |
| **@react-three/drei** | 9.88 | PointerLockControls, helpers 3D |
| **Three.js** | 0.158 | Moteur 3D WebGL |
| **Vite** | 5 | Bundler ultra-rapide |
| **CSS pur** | — | Styles (variables, animations) |
| **Canvas 2D** | Natif | Génération de textures procédurales |

### Choix d'architecture

- **Pas de librairie d'état externe** (Redux, Zustand) : l'état est minimal et géré localement avec `useState` dans `App.jsx`
- **Textures procédurales** : les œuvres abstraites sont générées côté client via Canvas 2D — aucune image à héberger
- **Données séparées** : tout le contenu portfolio est dans `artworks.js`, découplé des composants 3D et des modales
- **CSS natif** : pas de Tailwind ni Styled Components — du CSS vanilla avec des custom properties pour la cohérence

---

## 📝 Licence

MIT — Libre d'utilisation, de modification et de distribution.

---

*Conçu avec ❤️ et Three.js*
