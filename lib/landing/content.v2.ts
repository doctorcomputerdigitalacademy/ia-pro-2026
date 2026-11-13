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
  line1: "Apprenez l'IA en 3 jours.",
  line2Before: "Et utilisez-la",
  highlight: "comme un pro.",
  cursor: "Vous",
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
  note: "Présentiel à Calavi · 20 places maximum par cohorte",
  vslTitle: "Regarder la présentation de IA PRO 2026",
};

export const ZOOM = {
  line1: "Vous connaissez ChatGPT.",
  line2: "Mais vous l'utilisez comme tout le monde.",
  text: "Des réponses génériques, des heures perdues, des visuels qui font « IA ». Le problème n'est pas l'outil : c'est la méthode.",
  cards: [
    { label: "Votre rapport", value: "Encore à refaire." },
    { label: "Vos visuels", value: "Ils font « IA »." },
    { label: "Votre temps", value: "Perdu sur des tâches répétitives." },
  ],
};

export const BEFORE_AFTER = {
  line1: "Avant IA PRO 2026.",
  line2: "Après IA PRO 2026.",
  beforeTag: "Avant",
  afterTag: "Après",
  before: [
    "Vous posez des questions à ChatGPT, sans plus.",
    "Vos documents vous prennent des heures.",
    "Vous payez quelqu'un pour vos visuels.",
    "Vous ne savez pas quel outil choisir.",
  ],
  after: [
    "Vous donnez des instructions précises et structurées.",
    "Vos rapports et présentations sortent plus vite.",
    "Vous créez vous-même images, pubs et vidéos.",
    "Vous avez votre propre assistant IA configuré.",
  ],
};

export const METHOD = {
  line1: "Pas de théorie.",
  line2: "Une méthode pratiquée en salle, étape par étape.",
  steps: [
    { title: "Le besoin", text: "Vous partez d'un vrai besoin : un rapport, une pub, une présentation." },
    { title: "Le bon prompt", text: "Vous donnez à l'IA des instructions claires et structurées." },
    { title: "Le premier jet", text: "L'IA produit une première version de votre travail." },
    { title: "Les corrections", text: "Vous l'améliorez grâce à nos retours et nos exercices." },
    { title: "Le résultat", text: "Vous repartez avec une réalisation prête à utiliser." },
  ],
};

export const SPECIALTIES = {
  line1: "Une formation en présentiel.",
  line2: "Deux spécialités.",
  pro: {
    tag: "Spécialité 1",
    title: "IA Professionnelle",
    text: "Travaillez plus vite, exploitez vos documents et construisez vos propres assistants IA.",
    photo: "/preuves/formation-05.jpg",
  },
  visual: {
    tag: "Spécialité 2",
    title: "IA Visuelle et Cinématographique",
    text: "Images, publicités, voix off, vidéos : passez de l'idée à la création.",
  },
  support: {
    tag: "Inclus",
    title: "30 jours de suivi",
    text: "Groupe WhatsApp privé, exercices, corrections et aide pour finaliser votre projet.",
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
  line1: "Voilà ce que vous saurez faire.",
  line2: "7 réalisations, faites en salle pendant la formation.",
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

export const FOR_WHO = {
  yesTitle: "C'est pour vous si",
  yes: [
    "Vous êtes étudiant, salarié, entrepreneur ou commerçant.",
    "Vous voulez gagner du temps sur vos documents.",
    "Vous voulez créer vos propres visuels et vidéos.",
    "Vous débutez : aucun niveau en IA n'est exigé.",
    "Vous pouvez venir à Calavi pendant 3 jours.",
  ],
  noTitle: "Ce n'est pas pour vous si",
  no: [
    "Vous cherchez une formation en ligne, à distance.",
    "Vous cherchez un bouton magique, sans pratiquer.",
    "Vous n'êtes pas prêt à consacrer 3 jours à apprendre.",
  ],
};

export const TOOLS = {
  line1: "Les outils",
  line2: "que vous allez maîtriser.",
  center: "IA PRO 2026",
  words: [
    { word: "ChatGPT.", tag: "Rédiger" },
    { word: "Claude.", tag: "Skills & Projects" },
    { word: "Gemini.", tag: "Analyser" },
    { word: "NotebookLM.", tag: "Vos documents" },
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
  payNote: "Paiement unique · Tout compris",
  whenTitle: "Quand et où ?",
  formulas: Array.from(new Set(SCHEDULE.cohorts.map((c) => c.days))),
  hours: ["10h00 – 13h00", "19h00 – 22h00"],
  place: "Calavi, Bidossessi, après le carrefour de l'ORTB",
  seats: "20 places maximum par cohorte",
};

export const FAQ2 = {
  line1: "Vous avez",
  line2: "des questions ?",
  contact: "Écrivez-nous sur WhatsApp",
  items: FAQ.items,
};

export const FINAL2 = {
  line1: "Votre prochain projet mérite un niveau pro.",
  line2: "Commencez aujourd'hui.",
  note: "Formation en présentiel à Calavi · 20 places maximum par cohorte.",
};

export const FOOTER2 = {
  tagline: "Formations pratiques en intelligence artificielle, en présentiel à Calavi.",
  linksTitle: "La formation",
  contactTitle: "Contact",
};
