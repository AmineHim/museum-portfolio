// ─────────────────────────────────────────────────────────
//  artworks.js  —  Contenu du portfolio (facile à modifier)
// ─────────────────────────────────────────────────────────

export const ARTWORKS = [
  // ── 1. EXPÉRIENCE PROFESSIONNELLE ──────────────────────
  {
    id: 'experience',
    title: 'Expérience\nProfessionnelle',
    label: 'Expérience Professionnelle',
    eyebrow: 'Carrière',
    // Position dans la salle  [x,  y,   z]
    position: [-11.3, 2.3, -1.5],
    // Rotation du tableau (mur gauche → tourné à 90°)
    rotation: [0, Math.PI / 2, 0],
    // Taille [largeur, hauteur]
    size: [3.5, 2.5],
    // Couleur de l'œuvre abstraite sur le tableau
    artColor: '#2C4A6E',
    artAccent: '#5B8FB9',
    type: 'experience',
    content: {
      company: 'Airbus',
      location: 'Toulouse, France',
      contract: 'Contrat en alternance · 1 an 6 mois',
      roles: [
        {
          title: 'Data Analyst — Manufacturing Engineering',
          period: 'Sept. 2025 — Aujourd\'hui',
          tasks: [
            'Industrial data analysis to optimize manufacturing processes and engineering workflows.',
            'Development of Generative AI use cases: design and deployment of LLM-based chatbots for streamlined access to technical documentation.',
            'Implementation on Google Cloud Platform (GCP): leveraging cloud services for data processing and AI model hosting.',
            'User needs analysis and specification of requirements.',
            'Continuous testing and improvement of AI solutions to ensure high accuracy and reliability.',
            'Project execution using Agile methodology.',
          ],
          tools: ['GCP', 'Docker', 'Visual Studio Code', 'Palantir Skywise'],
        },
        {
          title: 'Data Analyst / Business Analyst — Supply Chain',
          period: 'Sept. 2024 — Sept. 2025',
          tasks: [
            'Business Analyst for various projects related to logistics flows (e.g., monitoring tools for warehouse fillrate, inbound forecasting with an ML model).',
            'User needs analysis & Specification of requirements.',
            'Development and testing (unit, functional, non-regression).',
            'Data visualizations and dashboard creation.',
            'Agile methodology.',
          ],
          tools: ['SAP Hana', 'SAP Logon', 'Qlik Sense', 'Palantir Skywise', 'VersionOne'],
        },
      ],
    },
  },

  // ── 2. PARCOURS ACADÉMIQUE ─────────────────────────────
  {
    id: 'education',
    title: 'Parcours\nAcadémique',
    label: 'Parcours Académique',
    eyebrow: 'Formation',
    position: [-3, 2.3, -11.3],
    rotation: [0, 0, 0],
    size: [3.5, 2.5],
    artColor: '#6E4C2C',
    artAccent: '#C48B50',
    type: 'education',
    content: {
      items: [
        {
          period: '2024 – 2026',
          school: 'Toulouse YNOV Campus',
          degree: 'Mastère Data Scientist (Data / IA)',
          skills: ['Intelligence Artificielle', 'Machine Learning', 'Science des données', 'Deep Learning'],
        },
        {
          period: '2020 – 2024',
          school: 'Université de Toulouse',
          degree: 'Licence — Computer Science',
          skills: ['Bases de données', 'SQL', 'SSIS', 'Algorithmique', 'Réseaux'],
        },
        {
          period: '2017 – 2020',
          school: 'Lycée Pierre Bourdieu',
          degree: 'Baccalauréat général Scientifique — Mention Assez Bien',
          skills: ['Python', 'Gestion de projet', 'Mathématiques'],
        },
      ],
    },
  },

  // ── 3. PROJETS PERSONNELS ──────────────────────────────
  {
    id: 'projects',
    title: 'Projets\nPersonnels',
    label: 'Projets Personnels',
    eyebrow: 'Réalisations',
    position: [3, 2.3, -11.3],
    rotation: [0, 0, 0],
    size: [3.5, 2.5],
    artColor: '#2C5E3A',
    artAccent: '#56A86A',
    type: 'projects',
    content: {
      projects: [
        {
          title: 'Véhicule Autonome',
          description:
            'Développement d\'un modèle de conduite autonome utilisant la vision par ordinateur et l\'apprentissage par renforcement. Entraînement d\'un réseau de neurones convolutifs (CNN) pour la détection de voie, de panneaux et d\'obstacles en temps réel. Simulation dans un environnement virtuel avant déploiement sur hardware embarqué.',
        },
        // ✏️  Ajoutez vos projets ici en suivant le même modèle
      ],
    },
  },

  // ── 4. CONTACT ─────────────────────────────────────────
  {
    id: 'contact',
    title: 'Contact\n& Liens',
    label: 'Me Contacter',
    eyebrow: 'Contact',
    position: [11.3, 2.3, -1.5],
    rotation: [0, -Math.PI / 2, 0],
    size: [3.5, 2.5],
    artColor: '#3D2C6E',
    artAccent: '#8060C4',
    type: 'contact',
    content: {
      intro:
        'Je suis ouvert aux opportunités en Data Science, IA générative et développement Full Stack. N\'hésitez pas à me contacter pour discuter d\'un projet ou d\'une collaboration.',
      links: [
        {
          label: 'LinkedIn',
          url: 'https://linkedin.com/in/votre-profil', // ✏️ Remplacez par votre URL LinkedIn
          icon: 'linkedin',
        },
        {
          label: 'GitHub',
          url: 'https://github.com/votre-profil', // ✏️ Remplacez par votre URL GitHub
          icon: 'github',
        },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────
//  Distance à partir de laquelle le prompt apparaît
// ─────────────────────────────────────────────────────────
export const PROXIMITY_THRESHOLD = 5.5;
