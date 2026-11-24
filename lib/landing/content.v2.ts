/* ==========================================================================
   CONTENU — VERSION 2 (page refaite façon motion.ghostdesignco.com)
   Peu de texte, uniquement l'essentiel. Les informations factuelles (modules,
   compétences, réalisations, bonus, prix, horaires, FAQ, photos, témoignages)
   sont reprises de content.fr.ts pour n'avoir qu'une seule source.
   Titres en deux tons : `line1` foncé, `line2` atténué.
   ========================================================================== */

import { Edit02Icon, File01Icon, Film01Icon, FolderLibraryIcon, Image01Icon, PuzzleIcon, Video01Icon } from "@hugeicons/core-free-icons";
import { ACHIEVEMENTS, BONUS, FAQ, PRO_AI, SCHEDULE, VISUAL_AI } from "./content.fr";

export const HERO2 = {
  tags: [
    { label: "ChatGPT · Claude · Gemini", tone: "blue" as const, pos: "tl" as const },
    { label: "Images & vidéos IA", tone: "red" as const, pos: "tr" as const },
    { label: "100 % pratique", tone: "blue" as const, pos: "br" as const },
  ],
  /** Pastille au-dessus du titre */
  badge: "Formation en présentiel · Calavi",
  /** Accroche simple */
  line1: "Apprends l'IA en 3 jours.",
  line2Before: "Et utilise-la",
  highlight: "comme un pro.",
  cursor: "Toi",
  sub: "Une formation pratique en présentiel, en salle à Calavi : ChatGPT, Claude, Gemini, images et vidéos IA.",
  /** Les cibles (avec leurs photos) */
  targetsLead: "Pour les",
  targets: [
    { label: "étudiants", photo: "/profils/etudiant.jpg" },
    { label: "entrepreneurs", photo: "/profils/entrepreneur.jpg" },
    { label: "commerçants", photo: "/profils/commercant.jpg" },
    { label: "salariés", photo: "/profils/salarie.jpg" },
    { label: "créateurs de contenu", photo: "/profils/createur.jpg" },
  ],
  vslTitle: "Regarder la présentation de IA PRO 2026",
  /** Invitation au-dessus de la vidéo */
  watch: "À regarder : la formation en vidéo",
};

export const ZOOM = {
  line1: "Tu connais ChatGPT.",
  line2: "Mais tu l'utilises comme tout le monde.",
  text: "Des réponses génériques, des heures perdues, des visuels qui font « IA ». Le problème n'est pas l'outil : c'est la méthode.",
  cards: [
    { label: "Ton rapport", value: "Encore à refaire." },
    { label: "Tes visuels", value: "Ils font « IA »." },
    { label: "Ton temps", value: "Perdu sur des tâches répétitives." },
  ],
};

export const BEFORE_AFTER = {
  line1: "Avant IA PRO 2026.",
  line2: "Après IA PRO 2026.",
  beforeTag: "Avant",
  afterTag: "Après",
  before: [
    "Tu poses des questions à ChatGPT, sans plus.",
    "Tes documents te prennent des heures.",
    "Tu paies quelqu'un pour tes visuels.",
    "Tu ne sais pas quel outil choisir.",
  ],
  after: [
    "Tu donnes des instructions précises et structurées.",
    "Tes rapports et présentations sortent plus vite.",
    "Tu crées toi-même images, pubs et vidéos.",
    "Tu as ton propre assistant IA configuré.",
  ],
};

export const METHOD = {
  line1: "Pas de théorie.",
  line2: "Une méthode pratiquée en salle, étape par étape.",
  steps: [
    { title: "Le besoin", text: "Tu pars d'un vrai besoin : un rapport, une pub, une présentation." },
    { title: "Le bon prompt", text: "Tu donnes à l'IA des instructions claires et structurées." },
    { title: "Le premier jet", text: "L'IA produit une première version de ton travail." },
    { title: "Les corrections", text: "Tu l'améliores grâce à nos retours et nos exercices." },
    { title: "Le résultat", text: "Tu repars avec une réalisation prête à utiliser." },
  ],
};

export const SPECIALTIES = {
  line1: "Une formation en présentiel.",
  line2: "Deux spécialités.",
  pro: {
    tag: "Spécialité 1",
    title: "IA Professionnelle",
    text: "Travaille plus vite, exploite tes documents et construis tes propres assistants IA.",
    photo: "/preuves/salle-formation-ia.jpg",
  },
  visual: {
    tag: "Spécialité 2",
    title: "IA Visuelle et Cinématographique",
    text: "Images, publicités, voix off, vidéos : passe de l'idée à la création.",
  },
  support: {
    tag: "Inclus",
    title: "30 jours de suivi",
    text: "Groupe WhatsApp privé, exercices, corrections et aide pour finaliser ton projet.",
  },
};

const PRO_ILLU = ["chat", "prompt", "docs", "slides", "skill", "project"] as const;
const VISUAL_ILLU = ["image", "poster", "character", "script", "video", "voice", "edit"] as const;
export type IlluKind = (typeof PRO_ILLU)[number] | (typeof VISUAL_ILLU)[number];

/** Programme : 6 modules (IA professionnelle) et 7 compétences (IA visuelle), en onglets. */
export const PROGRAM = {
  line1: "Le programme.",
  line2: "Deux spécialités, 13 étapes, en salle.",
  tabs: [
    {
      label: "IA professionnelle",
      count: "6 modules",
      tone: "blue" as const,
      items: PRO_AI.modules.map((m, i) => ({
        kicker: `Module ${i + 1}`,
        title: m.title,
        text: m.lead,
        illu: PRO_ILLU[i] as IlluKind,
      })),
    },
    {
      label: "IA visuelle",
      count: "7 compétences",
      tone: "red" as const,
      items: VISUAL_AI.skills.map((sk, i) => ({
        kicker: `Compétence ${i + 1}`,
        title: sk.title,
        text: sk.text,
        illu: VISUAL_ILLU[i] as IlluKind,
      })),
    },
  ],
};

const REAL_ICON = [File01Icon, PuzzleIcon, FolderLibraryIcon, Image01Icon, Edit02Icon, Video01Icon, Film01Icon];
const REAL_FILE = ["dossier.docx", "mon-skill", "mon-project", "visuels.png", "storyboard.pdf", "pub-video.mp4", "sequence-ia.mp4"];
const REAL_SHORT = ["Dossier pro", "Skill Claude", "Project IA", "3 visuels pub", "Script + storyboard", "Pub vidéo", "Séquence cinéma"];
const REAL_TONE = ["blue", "ink", "blue", "red", "ink", "red", "ink"] as const;

export const REALISATIONS = {
  line1: "Voilà ce que tu sauras faire.",
  line2: "Des créations réalisées avec l'IA.",
  items: ACHIEVEMENTS.items.map((it, i) => ({
    kicker: `Réalisation ${String(i + 1).padStart(2, "0")}`,
    short: REAL_SHORT[i] ?? it.title,
    title: it.title,
    group: it.group,
    tone: REAL_TONE[i % REAL_TONE.length],
    icon: REAL_ICON[i],
    file: REAL_FILE[i],
  })),
};

export const PROOF = {
  line1: "Ils se sont formés.",
  line2: "Ils en parlent.",
};

/** NOS SÉANCES PRATIQUES — photos réelles des séances (public/preuves/) */
export const SESSIONS = {
  line1: "Nos séances pratiques.",
  line2: "En salle, à Calavi, sur tes propres projets.",
  chips: ["Séances de 3 heures", "20 places maximum", "Un formateur présent en salle"],
  photos: [
    "/preuves/salle-formation-ia.jpg",
    "/preuves/formation-04.jpg",
    "/preuves/formation-01.jpg",
    "/preuves/formation-05.jpg",
    "/preuves/formation-03.jpg",
    "/preuves/formation-06.jpg",
  ],
};

export const FOR_WHO = {
  yesTitle: "C'est pour toi si",
  yes: [
    "Tu es étudiant, salarié, entrepreneur ou commerçant.",
    "Tu veux gagner du temps sur tes documents.",
    "Tu veux créer tes propres visuels et vidéos.",
    "Tu débutes : aucun niveau en IA n'est exigé.",
    "Tu peux venir à Calavi pendant 3 jours.",
  ],
  noTitle: "Ce n'est pas pour toi si",
  no: [
    "Tu cherches une formation en ligne, à distance.",
    "Tu cherches un bouton magique, sans pratiquer.",
    "Tu n'es pas prêt à consacrer 3 jours à apprendre.",
  ],
};

export const TOOLS = {
  line1: "Les outils",
  line2: "que tu vas maîtriser.",
  center: "IA PRO 2026",
  words: [
    { word: "ChatGPT.", tag: "Rédiger" },
    { word: "Claude.", tag: "Skills & Projects" },
    { word: "Gemini.", tag: "Analyser" },
    { word: "NotebookLM.", tag: "Tes documents" },
    { word: "Google Flow.", tag: "Images & vidéos" },
    { word: "Kling AI.", tag: "Vidéo IA" },
    { word: "ElevenLabs.", tag: "Voix off" },
    { word: "CapCut.", tag: "Montage" },
  ],
};

export const BONUS2 = {
  line1: "Bonus.",
  line2: "Pour les 10 premiers inscrits.",
  free: "OFFERT",
  normal: "Prix normal",
  items: BONUS.items,
  /** Maquettes de chaque bonus : image de la boîte 3D + contenu de l'écran du PC (vraies créations, public/creations/) */
  mocks: [
    {
      box: "/creations/affiches/4.webp",
      boxMosaic: ["/creations/photoshoot/5.webp", "/creations/affiches/5.webp", "/creations/videos/pub-01.webp", "/creations/photoshoot/2.webp", "/creations/affiches/2.webp", "/creations/videos/pub-06.webp"],
      screen: {
        kind: "library" as const,
        thumbs: ["/creations/affiches/1.webp", "/creations/photoshoot/2.webp", "/creations/affiches/5.webp", "/creations/videos/pub-04.webp", "/creations/affiches/2.webp", "/creations/photoshoot/4.webp"],
      },
    },
    {
      box: "/creations/photoshoot/3.webp",
      screen: {
        kind: "gallery" as const,
        photos: ["/creations/photoshoot/1.webp", "/creations/photoshoot/2.webp", "/creations/photoshoot/4.webp", "/creations/photoshoot/5.webp", "/creations/photoshoot/6.webp"],
      },
    },
    {
      box: "/creations/videos/pub-05.webp",
      screen: { kind: "video" as const, src: "/creations/videos/pub-02.mp4", poster: "/creations/videos/pub-02.webp" },
    },
  ],
};

export const PRICE2 = {
  tag: "Prix de lancement",
  title: "Toute la formation IA PRO 2026",
  valueLabel: "Valeur totale",
  includes: [
    "3 jours de formation en présentiel",
    "Les 2 spécialités",
    "Supports pédagogiques",
    "30 jours de suivi",
    "3 bonus offerts (10 premiers inscrits)",
  ],
  payNote: "En une fois ou dès 5 000 FCFA · Tout compris",
  whenTitle: "Quand et où ?",
  formulas: Array.from(new Set(SCHEDULE.cohorts.map((c) => c.days))),
  hours: ["10h00 – 13h00", "19h00 – 22h00"],
  place: "Centre Baha'i de Calavi, Bidossessi, après le carrefour de l'ORTB",
  seats: "20 places maximum par cohorte",
};

export const FAQ2 = {
  line1: "Tu as",
  line2: "des questions ?",
  contact: "Écris-nous sur WhatsApp",
  items: FAQ.items,
};

export const FINAL2 = {
  line1: "Ton prochain projet mérite un niveau pro.",
  line2: "Commence aujourd'hui.",
  note: "Formation en présentiel à Calavi · 20 places maximum par cohorte.",
};

export const FOOTER2 = {
  tagline: "Formations pratiques en intelligence artificielle, en présentiel à Calavi.",
  linksTitle: "La formation",
  contactTitle: "Contact",
};

/* ==========================================================================
   EXEMPLES ILLUSTRANT « CE QUE VOUS SAUREZ FAIRE »
   Fichiers dans public/creations/ (issus du dossier « LANDIGE PAGE 1 » du Bureau).
   ========================================================================== */
export const SHOWCASE = {
  tabs: [
    {
      label: "Vidéos publicitaires",
      short: "Vidéos",
      kind: "video" as const,
      items: [1, 2, 3, 4, 5, 6].map((n) => ({
        src: `/creations/videos/pub-0${n}.mp4`,
        poster: `/creations/videos/pub-0${n}.webp`,
        alt: `Extrait de publicité vidéo créée avec l'IA, exemple ${n}`,
      })),
    },
    {
      label: "Affiches publicitaires",
      short: "Affiches",
      kind: "image" as const,
      items: [
        [1, 900, 600],
        [2, 771, 900],
        [3, 720, 900],
        [4, 600, 900],
        [5, 900, 900],
      ].map(([n, w, h]) => ({ src: `/creations/affiches/${n}.webp`, w, h, alt: `Affiche publicitaire créée avec l'IA, exemple ${n}` })),
    },
    {
      label: "Photoshoots produits",
      short: "Photos",
      kind: "image" as const,
      items: [
        [1, 900, 900],
        [2, 900, 900],
        [3, 720, 900],
        [4, 721, 900],
        [5, 720, 900],
        [6, 503, 900],
      ].map(([n, w, h]) => ({ src: `/creations/photoshoot/${n}.webp`, w, h, alt: `Photo produit générée avec l'IA, exemple ${n}` })),
    },
  ],
};

/* Comment venir : vidéo du trajet + adresse + itinéraire */
export const ACCESS = {
  line1: "Comment venir.",
  line2: "Le trajet en vidéo, de l'entrée à la salle.",
  venue: "Centre Baha'i de la Communauté de Calavi",
  area: "Bidossessi, après le carrefour de l'ORTB, Abomey-Calavi",
  steps: [
    "Direction Bidossessi, à Calavi.",
    "Passe le carrefour de l'ORTB.",
    "Repère l'enseigne « Centre Baha'i de la Communauté de Calavi ».",
    "Entre : la salle de formation t'attend.",
  ],
  video: "/videos/adresse.mp4",
  poster: "/videos/adresse-poster.webp",
  /* Point GPS envoyé par l'académie (Google Maps) */
  lat: 6.42933891,
  lng: 2.34481219,
};
