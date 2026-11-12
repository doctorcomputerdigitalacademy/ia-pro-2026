/* ==========================================================================
   CONTENU — VERSION 2 (page refaite façon motion.ghostdesignco.com)
   Peu de texte, uniquement l'essentiel. Les informations factuelles (modules,
   compétences, réalisations, bonus, prix, horaires, FAQ, photos, témoignages)
   sont reprises de content.fr.ts pour n'avoir qu'une seule source.
   Titres en deux tons : `line1` foncé, `line2` atténué.
   ========================================================================== */

import { ACHIEVEMENTS, BONUS, FAQ, PRO_AI, SCHEDULE, VISUAL_AI } from "./content.fr";

export const HERO2 = {
  tags: [
    { label: "ChatGPT · Claude · Gemini", tone: "blue" as const, pos: "tl" as const },
    { label: "Images & vidéos IA", tone: "red" as const, pos: "tr" as const },
    { label: "100 % pratique", tone: "blue" as const, pos: "br" as const },
  ],
  line1: "Ne soyez plus un simple utilisateur de l'IA.",
  line2Before: "Faites-en votre",
  highlight: "assistant professionnel.",
  cursor: "Vous",
  sub: "3 jours de pratique à Calavi pour maîtriser les meilleurs outils d'IA, au travail comme en création.",
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

export const SPECIALTIES = {
  line1: "Une formation.",
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

const VISUAL_SHORT = [
  "Images IA",
  "Visuels publicitaires",
  "Personnages IA",
  "Scripts & storyboards",
  "Pubs vidéo",
  "Voix off",
  "Montage CapCut",
];

/** Programme : 6 modules (IA professionnelle) puis 7 compétences (IA visuelle). */
export const PROGRAM = {
  line1: "Le programme.",
  line2: "De l'idée au résultat, étape par étape.",
  file: "IA_PRO_2026.projet",
  chapters: [
    { label: "IA professionnelle", tone: "blue" as const },
    { label: "IA visuelle et cinématographique", tone: "red" as const },
  ],
  clips: [
    ...PRO_AI.modules.map((m, i) => ({
      chapter: 0,
      kicker: `Module ${i + 1}`,
      short: m.title,
      title: m.title,
      text: m.lead,
    })),
    ...VISUAL_AI.skills.map((s, i) => ({
      chapter: 1,
      kicker: `Compétence ${i + 1}`,
      short: VISUAL_SHORT[i] ?? s.title,
      title: s.title,
      text: s.text,
    })),
  ],
};

const REAL_SHORT = ["Dossier pro", "Skill Claude", "Project IA", "3 visuels pub", "Script + storyboard", "Pub vidéo", "Séquence cinéma"];
const REAL_TONE = ["blue", "ink", "blue", "red", "ink", "red", "ink"] as const;

export const REALISATIONS = {
  line1: "Ce que vous repartez avec.",
  line2: "7 réalisations concrètes.",
  items: ACHIEVEMENTS.items.map((it, i) => ({
    kicker: `Réalisation ${String(i + 1).padStart(2, "0")}`,
    short: REAL_SHORT[i] ?? it.title,
    title: it.title,
    group: it.group,
    tone: REAL_TONE[i % REAL_TONE.length],
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
  ],
  noTitle: "Ce n'est pas pour vous si",
  no: ["Vous cherchez un bouton magique, sans pratiquer.", "Vous n'êtes pas prêt à consacrer 3 jours à apprendre."],
};

export const TOOLS = {
  line1: "Les outils que vous allez maîtriser.",
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
  note: "20 places maximum par cohorte.",
};

export const FOOTER2 = {
  tagline: "Formations pratiques en intelligence artificielle, à Calavi.",
  linksTitle: "La formation",
  contactTitle: "Contact",
};
