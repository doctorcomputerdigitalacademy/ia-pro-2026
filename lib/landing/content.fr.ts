/* ==========================================================================
   CONTENU DE LA LANDING PAGE — IA PRO 2026 (français)
   Tout le texte de la page est ici. Modifiez librement les textes.

   Mise en valeur dans les titres :
     [[mot]]  -> couleur primaire (bleu)
     {{mot}}  -> couleur secondaire (rouge)
   ========================================================================== */

import {
  AiBrain01Icon,
  AiChat02Icon,
  Analytics01Icon,
  Book02Icon,
  Briefcase01Icon,
  Calendar03Icon,
  CheckListIcon,
  ClapperboardIcon,
  Clock01Icon,
  ComputerIcon,
  Edit02Icon,
  File01Icon,
  FolderLibraryIcon,
  Idea01Icon,
  Image01Icon,
  MagicWand01Icon,
  Megaphone01Icon,
  Mic01Icon,
  Mortarboard01Icon,
  NotebookIcon,
  PaintBoardIcon,
  Plant01Icon,
  PresentationBarChart01Icon,
  PuzzleIcon,
  Rocket01Icon,
  ScissorIcon,
  Search01Icon,
  Store01Icon,
  Target02Icon,
  Task01Icon,
  AiUserIcon,
  UserGroupIcon,
  Video01Icon,
  VideoCameraAiIcon,
  WhatsappIcon,
  HandHelpingIcon,
  Wallet01Icon,
  Camera01Icon,
  Film01Icon,
} from "@hugeicons/core-free-icons";

/* Libellés des boutons d'appel à l'action (gardés tels quels) */
export const CTA = {
  hero: "JE RÉSERVE MA PLACE MAINTENANT",
  solution: "JE VEUX REJOINDRE IA PRO 2026",
  skills: "JE RÉSERVE MA PLACE POUR IA PRO 2026",
  pricing: "OUI, JE VEUX INTÉGRER LA PROCHAINE COHORTE",
  schedule: "JE CHOISIS MA COHORTE ET JE M'INSCRIS",
  final: "JE RÉSERVE MA PLACE MAINTENANT",
  header: "Réserver ma place",
  /** Barre fixe en bas d'écran sur mobile */
  sticky: "JE RÉSERVE MA PLACE",
};

export const BRAND = {
  name: "Doctor Computer Digital Academy",
  program: "IA PRO 2026",
  logoAlt: "Doctor Computer Digital Academy",
  slogan:
    "Ne vous contentez pas de découvrir l'IA. Apprenez à l'utiliser pour produire, créer et développer vos compétences professionnelles.",
  address: "Calavi, Bidossessi, après le carrefour de l'ORTB",
  year: 2026,
};

/* Liens d'ancrage du header */
export const NAV = [
  { label: "Programme", href: "#programme" },
  { label: "Tarif", href: "#tarif" },
  { label: "Horaires", href: "#horaires" },
  { label: "FAQ", href: "#faq" },
];

/* ------------------------------------------------------------- SECTION 1 */
export const HERO = {
  badge: "Formation pratique en intelligence artificielle – Calavi",
  titleLine1: "Ne soyez plus un simple utilisateur de l'IA.",
  titleLine2Before: "Apprenez à en faire votre véritable",
  titleHighlight: "assistant professionnel.",
  cursorLabel: "Vous",
  rotatingPrefix: "Avec l'IA,",
  rotatingWords: ["rédigez", "analysez", "présentez", "organisez", "créez"],
  rotatingSuffix: "plus intelligemment.",
  description:
    "En 3 jours de pratique, maîtrisez ChatGPT, Claude, Gemini et NotebookLM, et créez vos visuels et vidéos avec l'IA.",
  vslLabel: "Regarder la présentation de IA PRO 2026",
  notes: ["Formation 100 % en présentiel à Calavi, Bidossessi.", "20 places maximum par cohorte."],
  /** Étiquettes inclinées qui flottent autour du titre (inspiré de ghostdesignco) */
  tags: [
    { label: "Formation 100 % pratique", tone: "light" as const, pos: "tl" as const },
    { label: "ChatGPT · Claude · Gemini", tone: "red" as const, pos: "tr" as const },
    { label: "Images & vidéos IA", tone: "light" as const, pos: "br" as const },
  ],
  /** Ligne sous le bouton */
  ctaNote: "Présentiel à Calavi, Bidossessi · 20 places maximum par cohorte",
};

/* Bandeau de chiffres clés (uniquement des informations factuelles du programme) */
export const KEY_FACTS = [
  { value: 3, suffix: "", label: "jours de formation pratique", icon: Calendar03Icon },
  { value: 30, suffix: "", label: "jours d'accompagnement offerts", icon: WhatsappIcon },
  { value: 20, suffix: "", label: "places maximum par cohorte", icon: UserGroupIcon },
  { value: 20000, suffix: "", label: "FCFA, tout compris", icon: Target02Icon },
];

/* ------------------------------------------------------------- SECTION 2 */
export const PROBLEM = {
  eyebrow: "Le problème",
  title: "Vous passez à côté du véritable [[potentiel de l'IA]]",
  lead: "Vous connaissez ChatGPT. Mais savez-vous vraiment tout ce que ces outils peuvent faire pour vous ?",
  paragraphs: [
    "Aujourd'hui, beaucoup de personnes utilisent ChatGPT pour poser des questions, demander des rédactions ou obtenir quelques informations.",
    "Très peu savent en tirer parti dans leur travail de tous les jours.",
  ],
  listIntro: "Imaginez tout ce que vous pourriez accomplir si vous saviez réellement utiliser ces outils :",
  possibilities: [
    { text: "Préparer un rapport professionnel sans partir de zéro.", icon: File01Icon },
    { text: "Analyser rapidement des documents et des informations complexes.", icon: Analytics01Icon },
    { text: "Créer des présentations structurées et convaincantes.", icon: PresentationBarChart01Icon },
    { text: "Effectuer des recherches approfondies pour vos études ou votre entreprise.", icon: Search01Icon },
    { text: "Organiser vos projets avec des assistants IA personnalisés.", icon: AiBrain01Icon },
    { text: "Développer des stratégies commerciales et marketing.", icon: Target02Icon },
    { text: "Gagner du temps sur certaines tâches répétitives.", icon: Clock01Icon },
    { text: "Transformer vos idées en projets concrets.", icon: Idea01Icon },
  ],
  /** Comparatif visuel « usage basique » / « usage maîtrisé » */
  compare: {
    basic: {
      tag: "La plupart des utilisateurs",
      prompt: "Écris-moi un texte pour présenter mon entreprise.",
      reply: "Voici un texte de présentation pour votre entreprise…",
      verdict: "Une réponse générique, à refaire.",
    },
    pro: {
      tag: "Ceux qui maîtrisent l'IA",
      assistant: "Votre assistant IA",
      steps: [
        { state: "analyzing", label: "Analyse de vos documents" },
        { state: "researching", label: "Recherche de sources fiables" },
        { state: "thinking", label: "Construction du plan" },
        { state: "writing", label: "Rédaction du rapport" },
        { state: "done", label: "Rapport professionnel prêt" },
      ],
      outputs: ["Documents analysés", "Sources vérifiées", "Plan structuré", "Rapport rédigé"],
      verdict: "Un travail précis, prêt à être utilisé.",
    },
  },
  pathStart: "Départ",
  /** Point d'arrivée du chemin : bénéfices et valeurs */
  arrival: {
    eyebrow: "Point d'arrivée",
    title: "Ce que vous gagnez au bout du chemin",
    benefitsTitle: "Vos bénéfices",
    benefits: [
      "Vous gagnez du temps sur vos tâches de tous les jours.",
      "Vous produisez des documents et des présentations de qualité professionnelle.",
      "Vous créez vous-même vos visuels et vos vidéos.",
      "Vous repartez avec des réalisations concrètes à montrer.",
    ],
    valuesTitle: "Nos valeurs",
    values: [
      { title: "Pratique", text: "On apprend en faisant, sur de vrais projets.", icon: Task01Icon },
      { title: "Proximité", text: "20 places maximum par cohorte, pour un vrai suivi.", icon: UserGroupIcon },
      { title: "Accompagnement", text: "30 jours de suivi après la formation.", icon: HandHelpingIcon },
      { title: "Accessibilité", text: "Une formation complète à 20 000 FCFA.", icon: Wallet01Icon },
    ],
  },
  manifesto:
    "Le véritable avantage ne consiste pas simplement à connaître ChatGPT. Il consiste à savoir comment utiliser intelligemment l'IA pour produire de meilleurs résultats.",
  conclusion: "Et c'est précisément ce que vous allez apprendre avec [[IA PRO 2026]].",
};

/* ------------------------------------------- DEUX SITUATIONS (après la section 2) */
export const SITUATIONS = {
  eyebrow: "Deux situations",
  title: "Dans laquelle vous [[reconnaissez-vous]] ?",
  items: [
    {
      tag: "Situation 1",
      title: "Vous avancez seul, sans méthode.",
      text: "Rapports, présentations, recherches : tout vous prend des heures. Vous ouvrez ChatGPT de temps en temps, mais les réponses restent moyennes et vous ne savez pas comment faire mieux.",
      points: ["Des heures perdues sur des tâches répétitives", "Des résultats moyens, faute de bonnes instructions", "L'impression de passer à côté de quelque chose"],
      photo: "/situations/situation-1-fatigue.jpg",
      // Photo : Oladimeji Ajegbile sur Pexels (licence Pexels, usage commercial gratuit)
      alt: "Homme fatigué, la tête dans les mains devant son ordinateur portable",
    },
    {
      tag: "Situation 2",
      title: "Vous travaillez avec l'IA comme un pro.",
      text: "Vous savez quel outil choisir, comment le guider et comment vérifier ce qu'il produit. Vos documents sortent plus vite, vos visuels aussi, et vous gagnez en assurance.",
      points: ["Le bon outil pour chaque tâche", "Des documents et visuels de qualité, plus vite", "Des réalisations concrètes à montrer"],
      photo: "/situations/situation-avec-methode.jpg",
      alt: "Apprenants de Doctor Computer Digital Academy en atelier sur ordinateur",
    },
  ],
};

/* --------------------------------------------- COMMENT ÇA MARCHE (après la section 3) */
export const HOW_IT_WORKS = {
  eyebrow: "Le déroulement",
  title: "COMMENT ÇA MARCHE ?",
  steps: [
    {
      title: "Réservez votre place",
      text: "Écrivez-nous sur WhatsApp et choisissez votre cohorte : début ou fin de semaine, en journée ou en soirée.",
    },
    {
      title: "Pratiquez en présentiel",
      text: "Trois jours d'ateliers à Calavi : vous manipulez les outils et fabriquez vos propres réalisations.",
    },
    {
      title: "Progressez avec le groupe",
      text: "Pendant un mois, exercices, corrections et conseils dans le groupe privé pour finaliser votre projet.",
    },
  ],
};

/* ------------------------------------------------------- BONUS (avant la section 10) */
export const BONUS = {
  eyebrow: "Bonus exclusif",
  title: "Pour les [[10 premiers inscrits]]",
  text: "Ces bonus sont réservés aux dix premières personnes qui s'inscrivent.",
  tag: "Offert",
  normalPrice: "Prix normal",
  free: "GRATUIT",
  items: [
    { title: "Plus de 1 650 ressources IA", text: "Prompts, outils et templates prêts à l'emploi.", icon: FolderLibraryIcon, value: 20000, cover: { text: "+1 650 RESSOURCES IA", tone: "blue" as const }, image: "" },
    { title: "Création de photo-shootings avec l'IA", text: "Réalisez des séances photo professionnelles sans studio : portraits, photos produits et visuels de marque générés par l'IA.", icon: Camera01Icon, value: 15000, cover: { text: "PHOTO-SHOOTING IA", tone: "red" as const }, image: "" },
    { title: "Création de publicités vidéo IA", text: "Écrivez, générez et montez vos propres publicités vidéo réalisées avec l'intelligence artificielle.", icon: Film01Icon, value: 20000, cover: { text: "PUBLICITÉS VIDÉO IA", tone: "ink" as const }, image: "" },
  ],
};

/* ------------------------------------------------------------- SECTION 3 */
export const SOLUTION = {
  eyebrow: "La solution",
  title: "Passez de la simple utilisation de l'IA à une véritable [[maîtrise professionnelle]]",
  text: "IA PRO 2026 est une formation intensive pensée pour une chose : vous rendre efficace avec l'IA, au travail, dans vos études et dans vos projets.",
  intro: "Deux spécialités complémentaires, un seul programme.",
  specialties: [
    {
      tag: "Spécialité 1",
      title: "IA Professionnelle",
      text: "Travaillez plus vite, exploitez vos documents et construisez vos propres assistants IA.",
      icon: Briefcase01Icon,
      tone: "primary" as const,
    },
    {
      tag: "Spécialité 2",
      title: "IA Visuelle et Cinématographique",
      text: "Transformez vos idées en visuels publicitaires, en vidéos et en séquences de style cinéma.",
      icon: ClapperboardIcon,
      tone: "primary" as const,
    },
  ],
  support:
    "Et la formation ne s'arrête pas au dernier jour : un mois de suivi vous attend ensuite.",
  statement:
    "Ce n'est pas seulement une formation pour découvrir des outils. [[C'est une formation pour apprendre à les utiliser concrètement.]]",
};

/* ------------------------------------------------------------- SECTION 4 */
export const PRO_AI = {
  eyebrow: "Le cœur de la formation · IA Professionnelle",
  title: "Faites de l'IA votre véritable [[assistant de travail]]",
  text: "C'est la priorité du programme : maîtriser les meilleurs assistants du moment pour mieux travailler, étudier, entreprendre et gérer vos projets.",
  modules: [
    {
      title: "ChatGPT, Claude et Gemini",
      cover: { text: "CHATGPT CLAUDE GEMINI", tone: "blue" as const },
      /** Image de la carte (ex. "/modules/module-01.jpg"). Vide = couverture générée. */
      image: "",
      lead: "Maîtrisez les trois assistants IA incontournables.",
      text: "Utilisez-les pour rédiger, analyser, organiser, réfléchir, résoudre des problèmes et accomplir vos tâches professionnelles, bien au-delà des simples questions-réponses.",
      icon: AiChat02Icon,
    },
    {
      title: "Prompt Engineering avancé",
      cover: { text: "PROMPT ENGINEERING", tone: "ink" as const },
      /** Image de la carte (ex. "/modules/module-01.jpg"). Vide = couverture générée. */
      image: "",
      lead: "Donnez les bonnes instructions pour obtenir de meilleurs résultats.",
      text: "Construisez des prompts précis, structurés et adaptés aux tâches complexes, et guidez l'IA vers des réponses réellement exploitables.",
      icon: MagicWand01Icon,
    },
    {
      title: "NotebookLM",
      cover: { text: "NOTEBOOK LM", tone: "red" as const },
      /** Image de la carte (ex. "/modules/module-01.jpg"). Vide = couverture générée. */
      image: "",
      lead: "Transformez vos documents en véritables sources de connaissance.",
      text: "Effectuez des recherches approfondies, exploitez vos documents et organisez les informations pour vos études, vos analyses et vos projets.",
      icon: NotebookIcon,
    },
    {
      title: "Rapports et présentations professionnels",
      cover: { text: "RAPPORTS & PRÉSENTATIONS", tone: "ink" as const },
      /** Image de la carte (ex. "/modules/module-01.jpg"). Vide = couverture générée. */
      image: "",
      lead: "Gagnez du temps dans la production de vos documents.",
      text: "Utilisez l'IA pour structurer des informations, rédiger des rapports et préparer des présentations professionnelles.",
      icon: PresentationBarChart01Icon,
    },
    {
      title: "Claude Skills",
      cover: { text: "CLAUDE SKILLS", tone: "blue" as const },
      /** Image de la carte (ex. "/modules/module-01.jpg"). Vide = couverture générée. */
      image: "",
      lead: "Créez vos propres compétences personnalisées dans Claude.",
      text: "Construisez des Skills pour adapter Claude à vos tâches, vos méthodes de travail et vos besoins spécifiques.",
      icon: PuzzleIcon,
    },
    {
      title: "Projects personnalisés",
      cover: { text: "PROJECTS IA", tone: "red" as const },
      /** Image de la carte (ex. "/modules/module-01.jpg"). Vide = couverture générée. */
      image: "",
      lead: "Organisez vos assistants IA autour de vos propres objectifs.",
      text: "Configurez des Projects pour centraliser vos instructions, vos ressources et vos travaux : un environnement IA adapté à votre entreprise, vos études ou votre métier.",
      icon: FolderLibraryIcon,
    },
  ],
  includedLabel: "Inclus dans la formation",
  outcome:
    "À la fin de cette spécialité, vous saurez mieux intégrer l'IA dans votre quotidien professionnel.",
};

/* ------------------------------------------------------------- SECTION 5 */
export const VISUAL_AI = {
  eyebrow: "Un avantage supplémentaire · IA Visuelle et Cinématographique",
  title: "Ne vous limitez pas à travailler avec l'IA. Apprenez aussi à [[créer avec elle]]",
  text: "Images, affiches, voix off, vidéos : passez de l'idée à la création, étape par étape.",
  skills: [
    { title: "Générer des images professionnelles", text: "Créez des images réalistes et créatives avec Google Flow et Kling AI.", icon: Image01Icon },
    { title: "Concevoir des visuels publicitaires avec Google Flow et Kling AI", text: "Réalisez des affiches et supports de communication pour votre activité.", icon: PaintBoardIcon },
    { title: "Créer des personnages IA cohérents", text: "Développez des personnages utilisables dans vos projets créatifs.", icon: AiUserIcon },
    { title: "Écrire des scripts et storyboards", text: "Structurez vos idées avant la production de vos contenus.", icon: Edit02Icon },
    { title: "Réaliser des publicités vidéo avec Google Flow et Kling AI", text: "Transformez vos concepts en séquences vidéo grâce à l'IA.", icon: VideoCameraAiIcon },
    { title: "Générer des voix off avec ElevenLabs", text: "Donnez une identité vocale à vos productions.", icon: Mic01Icon },
    { title: "Monter vos vidéos avec CapCut", text: "Assemblez et finalisez vos créations.", icon: ScissorIcon },
  ],
  conclusion:
    "Que vous soyez entrepreneur, communicant ou créateur de contenu, ces compétences constituent un véritable complément à votre maîtrise de l'IA professionnelle.",
};

/* ------------------------------------------------------------- SECTION 6 */
export const ACHIEVEMENTS = {
  eyebrow: "Des compétences concrètes",
  title: "Ce que vous saurez [[faire à la fin]]",
  text: "Pas seulement des notions : des livrables que vous fabriquez vous-même, en atelier.",
  items: [
    {
      group: "IA professionnelle",
      title: "Un dossier professionnel réalisé avec l'IA.",
      text: "Structuré, rédigé et mis en forme avec ChatGPT, Claude ou Gemini.",
      file: "dossier-professionnel.docx",
      chips: ["Plan", "Rédaction", "Mise en forme", "Relecture"],
    },
    {
      group: "IA professionnelle",
      title: "Un Skill Claude personnalisé.",
      text: "Une compétence sur mesure qui adapte Claude à vos tâches et à votre méthode de travail.",
      file: "mon-skill-claude",
      chips: ["Instructions", "Méthode", "Exemples", "Prêt à l'emploi"],
    },
    {
      group: "IA professionnelle",
      title: "Un Project IA configuré.",
      text: "Vos instructions et vos ressources réunies dans un espace IA dédié à votre activité.",
      file: "mon-project-ia",
      chips: ["Instructions", "Documents", "Ressources", "Objectifs"],
    },
    {
      group: "IA visuelle",
      title: "Trois visuels publicitaires.",
      text: "Des affiches et supports de communication pour votre activité, conçus avec Google Flow et Kling AI.",
      file: "visuels-publicitaires",
      chips: ["Visuel 1", "Visuel 2", "Google Flow", "Kling AI"],
    },
    {
      group: "IA visuelle",
      title: "Un script publicitaire et son storyboard.",
      text: "Votre idée structurée scène par scène, avant la production.",
      file: "storyboard",
      chips: ["Accroche", "Scènes", "Voix off", "Appel à l'action"],
    },
    {
      group: "IA visuelle",
      title: "Une publicité vidéo générée avec Google Flow et Kling AI.",
      text: "Votre concept transformé en séquence vidéo, prête à être diffusée.",
      file: "publicite-video.mp4",
      chips: ["Script", "Génération", "Voix off", "Montage"],
    },
    {
      group: "IA visuelle",
      title: "Une séquence cinématographique IA.",
      text: "Une création vidéo de style cinéma, du personnage jusqu'au montage final.",
      file: "sequence-ia.mp4",
      chips: ["Personnage", "Plans", "Son", "Export"],
    },
  ],
  unlocked: "réalisations débloquées",
  barLead: "7 réalisations.",
  barText: "Apprendre, pratiquer et repartir avec du concret.",
};

/* ------------------------------------------------------------- SECTION 7 */
export const SUPPORT = {
  eyebrow: "30 jours d'accompagnement offerts",
  title: "Votre progression continue [[après la formation]]",
  text: "Une formation pratique est encore plus efficace lorsqu'elle est suivie d'un accompagnement. C'est pourquoi nous avons prévu 30 jours supplémentaires pour vous aider à consolider vos compétences.",
  ringText: "30 JOURS D'ACCOMPAGNEMENT • OFFERTS • ",
  listTitle: "Pendant cette période, vous bénéficierez de :",
  benefits: [
    { text: "Un groupe privé WhatsApp.", icon: WhatsappIcon },
    { text: "Des exercices pratiques.", icon: Task01Icon },
    { text: "Des corrections de vos réalisations.", icon: CheckListIcon },
    { text: "Des conseils et ressources complémentaires.", icon: Book02Icon },
    { text: "Un accompagnement pour finaliser votre projet personnel.", icon: Rocket01Icon },
  ],
  after: "Vous pourrez continuer à pratiquer, poser vos questions et améliorer vos productions.",
  slogan: "3 jours pour apprendre. [[30 jours pour continuer à progresser.]]",
};

/* ------------------------------------------------------------- SECTION 8 */
export const TRUST = {
  eyebrow: "Ils nous ont déjà fait confiance",
  title: "Et si vous étiez les [[prochains]] ?",
  count: 20,
  countLabel: "personnes déjà formées",
  paragraphs: [
    "Doctor Computer Digital Academy a déjà formé 20 personnes à ces nouveaux outils.",
    "Nous poursuivons aujourd'hui cette mission en ouvrant de nouvelles cohortes pour permettre à davantage de personnes de découvrir et de maîtriser ces technologies.",
    "Notre conviction : l'IA ne doit pas rester l'affaire de quelques spécialistes. Chacun peut s'en servir dans son propre métier.",
  ],
  photosEyebrow: "En images",
  photosTitle: "Nos séances [[pratiques]]",
  testimonialsTitle: "Ce que disent nos anciens apprenants",
};

/* ==========================================================================
   MUR DE PHOTOS des anciens apprenants (section 8, façon oskool).
   Placez les photos dans public/preuves/ puis ajoutez-les ici, par exemple :
     { src: "/preuves/apprenant-01.jpg", alt: "Apprenant de la cohorte de mars" },
   Tant que la liste est vide, des emplacements « Photo à venir » s'affichent.
   ========================================================================== */
export const photos: { src: string; alt: string }[] = [
  { src: "/preuves/formation-01.jpg", alt: "Apprenants de Doctor Computer Digital Academy en séance pratique" },
  { src: "/preuves/formation-02.jpg", alt: "Apprenants de Doctor Computer Digital Academy en séance pratique" },
  { src: "/preuves/formation-03.jpg", alt: "Apprenants de Doctor Computer Digital Academy en séance pratique" },
  { src: "/preuves/formation-04.jpg", alt: "Apprenants de Doctor Computer Digital Academy en séance pratique" },
  { src: "/preuves/formation-05.jpg", alt: "Apprenants de Doctor Computer Digital Academy en séance pratique" },
  { src: "/preuves/formation-06.jpg", alt: "Apprenants de Doctor Computer Digital Academy en séance pratique" },
];
export const PHOTO_BADGE = "Séance pratique";

/* ==========================================================================
   TÉMOIGNAGES — carrousel défilant sur deux lignes (section 8)
   ATTENTION : textes d'exemple rédigés pour la mise en page : remplacez-les par les
   témoignages réels de vos apprenants (avec leur accord) avant la mise en ligne.
   Les 10 premiers défilent sur la ligne 1, les suivants sur la ligne 2.
   ========================================================================== */
export const testimonials: { name: string; role: string; title: string; quote: string }[] = [
  // <!-- À CONFIRMER : témoignage réel ? -->
  {
    name: "Fifamè A.",
    title: "Mon mémoire avance enfin sereinement.",
    role: "Étudiante en gestion, Abomey-Calavi",
    quote: "Je pensais connaître ChatGPT. J'ai découvert qu'on peut lui donner de vraies méthodes de travail. Mon mémoire avance beaucoup plus sereinement.",
  },
  // <!-- À CONFIRMER : témoignage réel ? -->
  {
    name: "Rodrigue H.",
    title: "Un assistant IA qui connaît mon activité.",
    role: "Entrepreneur, Cotonou",
    quote: "Le module sur les Projects m'a ouvert les yeux : j'ai maintenant un assistant qui connaît mon activité et m'aide à préparer mes devis.",
  },
  // <!-- À CONFIRMER : témoignage réel ? -->
  {
    name: "Ornella K.",
    title: "Mes premières affiches pub, faites avec l'IA.",
    role: "Commerçante, Calavi",
    quote: "J'ai réalisé mes premières affiches publicitaires avec Google Flow et Kling AI pendant la formation. Mes clientes les ont remarquées sur mon statut WhatsApp.",
  },
  // <!-- À CONFIRMER : témoignage réel ? -->
  {
    name: "Gildas D.",
    title: "Je lis les longs documents en quelques minutes.",
    role: "Comptable",
    quote: "NotebookLM a changé ma façon de lire les documents longs. Je retrouve les informations importantes en quelques minutes.",
  },
  // <!-- À CONFIRMER : témoignage réel ? -->
  {
    name: "Prisca S.",
    title: "Mes rapports ne me prennent plus des heures.",
    role: "Secrétaire de direction",
    quote: "Les rapports me prenaient des heures. Avec les bons prompts, j'ai une première structure solide que je n'ai plus qu'à ajuster.",
  },
  // <!-- À CONFIRMER : témoignage réel ? -->
  {
    name: "Hermann T.",
    title: "J'ai compris toute la chaîne de production vidéo.",
    role: "Créateur de contenu",
    quote: "La partie vidéo m'a bluffé : script, storyboard, voix off, montage CapCut… J'ai compris toute la chaîne de production.",
  },
];

/* ------------------------------------------------------------- SECTION 9 */
export const AUDIENCE = {
  eyebrow: "Pour qui ?",
  title: "Cette formation est [[faite pour vous]] si vous êtes :",
  text: "Peu importe votre métier ou votre niveau : ce programme s'adapte à vos objectifs.",
  profiles: [
    {
      title: "Étudiant",
      photo: "/profils/etudiant.jpg", // Pexels : Yan Krukau
      alt: "Étudiant travaillant sur son ordinateur portable en amphithéâtre",
      text: "Recherches, analyse de documents, exposés et présentations : gagnez en qualité et en temps.",
      icon: Mortarboard01Icon,
    },
    {
      title: "Entrepreneur",
      photo: "/profils/entrepreneur.jpg", // Pexels : Mikhail Nilov
      alt: "Entrepreneur souriant dans ses bureaux",
      text: "Utilisez l'IA pour organiser vos activités, préparer vos documents, développer vos stratégies et améliorer votre communication.",
      icon: Rocket01Icon,
    },
    {
      title: "Commerçant",
      photo: "/profils/commercant.jpg", // Pexels : Hakim LEVEL
      alt: "Commerçante sur son étal de fruits au marché",
      text: "Découvrez comment exploiter l'IA pour développer vos idées commerciales et créer des publicités pour vos produits.",
      icon: Store01Icon,
    },
    {
      title: "Salarié ou professionnel",
      photo: "/profils/salarie.jpg", // Pexels : Gustavo Fring
      alt: "Professionnelle à son poste de travail informatique",
      text: "Intégrez les outils IA à vos méthodes de travail et devenez la personne ressource de votre équipe.",
      icon: Briefcase01Icon,
    },
    {
      title: "Créateur de contenu",
      photo: "/profils/createur.jpg", // Pexels : Kyle Loftus
      alt: "Créateur de contenu avec sa caméra",
      text: "Visuels, scripts, voix off, vidéos : produisez plus de contenus, sans tout sous-traiter.",
      icon: Megaphone01Icon,
    },
    {
      title: "Grand débutant",
      photo: "/profils/debutant.jpg", // Pexels : Roberto Hund
      alt: "Personne pensive qui découvre un nouveau sujet",
      text: "Aucun niveau avancé en IA n'est exigé. La formation vous fait découvrir les outils et progresser à travers des exercices pratiques.",
      icon: Plant01Icon,
    },
  ],
};

/* ------------------------------------------------------------ SECTION 10 */
export const PRICING = {
  eyebrow: "Votre investissement",
  title: "Toute cette formation pour seulement {{20 000 FCFA}}",
  text: "Imaginez tout ce que vous allez découvrir, apprendre et réaliser pendant cette formation.",
  includesTitle: "Ce qui est compris dans votre inscription",
  /**
   * Valeur affichée (barrée) pour chaque élément, en FCFA.
   * ATTENTION : valeurs proposées par défaut, à ajuster selon vos tarifs réels.
   */
  includes: [
    { label: "3 jours de formation pratique en présentiel.", value: 30000 },
    { label: "La spécialité IA professionnelle.", value: 25000 },
    { label: "La spécialité IA visuelle et cinématographique.", value: 25000 },
    { label: "Les supports pédagogiques.", value: 10000 },
    { label: "Un mois de suivi après la formation : groupe WhatsApp privé, exercices, corrections et aide pour finaliser votre projet.", value: 15000 },
    { label: "Un groupe privé WhatsApp.", value: 10000 },
    { label: "Des exercices pratiques et corrections.", value: 10000 },
    { label: "Des conseils et ressources complémentaires.", value: 5000 },
    { label: "Un accompagnement sur votre projet personnel.", value: 15000 },
  ],
  totalValueLabel: "Valeur totale",
  youPayLabel: "Vous payez seulement",
  saveLabel: "Vous économisez",
  offerHeading: "Si vous vous inscrivez aujourd'hui, vous recevrez :",
  receiveTitle: "Ce que vous recevez",
  receiveCol: "Valeur",
  includedTag: "Inclus",
  todayLabel: "Aujourd'hui, toute la formation pour",
  payNote: "Un seul paiement. Les deux spécialités et l'accompagnement sont compris.",
  trust: ["Formation en présentiel", "Petits groupes", "Suivi d'un mois", "Paiement unique", "Supports inclus"],
  totalLabel: "Votre investissement total",
  amount: "20 000",
  currency: "FCFA",
  allIncluded: "Tout compris.",
  notes: [
    { text: "Pas besoin de payer séparément pour les deux spécialités : les deux font partie du programme IA PRO 2026.", icon: Video01Icon },
    { text: "Des ordinateurs et une connexion Internet sont disponibles pour les ateliers pratiques, selon les équipements disponibles.", icon: ComputerIcon },
  ],
};

/* ------------------------------------------------------------ SECTION 11 */
export const SCHEDULE = {
  eyebrow: "Choisissez votre horaire",
  title: "Quatre cohortes, selon votre [[disponibilité]]",
  text: "Début de semaine ou fin de semaine, en journée ou en soirée : choisissez ce qui vous convient.",
  cohorts: [
    {
      name: "Cohorte Jour",
      days: "Lundi, mardi et mercredi",
      hours: "De 10h00 à 13h00",
      text: "Pour les personnes disponibles pendant la journée.",
      variant: "day" as const,
    },
    {
      name: "Cohorte Soir",
      days: "Lundi, mardi et mercredi",
      hours: "De 19h00 à 22h00",
      text: "Pour les personnes qui ont des occupations pendant la journée.",
      variant: "evening" as const,
    },
    {
      name: "Cohorte Jour",
      days: "Jeudi, vendredi et samedi",
      hours: "De 10h00 à 13h00",
      text: "Pour les personnes disponibles pendant la journée.",
      variant: "day" as const,
    },
    {
      name: "Cohorte Soir",
      days: "Jeudi, vendredi et samedi",
      hours: "De 19h00 à 22h00",
      text: "Pour les personnes qui ont des occupations pendant la journée.",
      variant: "evening" as const,
    },
  ],
  locationTitle: "Lieu de formation",
  locationMode: "Formation 100 % en présentiel.",
  location: "Calavi, Bidossessi, après le carrefour de l'ORTB.",
  alertTitle: "Attention : places limitées",
  alertLines: [
    "Chaque cohorte accueille seulement 20 participants maximum.",
    "Ce nombre limité permet de favoriser les ateliers pratiques et le suivi des apprenants.",
    "Ne tardez pas à réserver votre place.",
  ],
};

/* ------------------------------------------------------------ SECTION 12 */
export const FAQ = {
  eyebrow: "FAQ",
  title: "Vos questions, [[nos réponses]].",
  text: "Tout est transparent : programme, horaires, tarif et accompagnement.",
  contactTitle: "Vous avez une question précise ?",
  contactText: "Vous hésitez sur la cohorte ou sur votre niveau ? Écrivez-nous directement sur WhatsApp.",
  contactLabel: "Nous écrire sur WhatsApp",
  contactBadge: "Doctor Computer Digital Academy",
  categories: [
    { id: "all", label: "Toutes" },
    { id: "formation", label: "La formation" },
    { id: "pratique", label: "Infos pratiques" },
    { id: "tarif", label: "Tarif" },
  ],
  answerFrom: "Réponse de l'académie",
  helpFacts: [
    { label: "Lieu", value: "Calavi, Bidossessi" },
    { label: "Horaires", value: "10h–13h ou 19h–22h" },
    { label: "Places", value: "20 maximum par cohorte" },
  ],
  items: [
    {
      id: "niveau", category: "formation",
      question: "Est-ce que je dois déjà connaître l'intelligence artificielle ?",
      answer: "Non. La formation est accessible aux débutants comme aux personnes qui utilisent déjà certains outils IA et souhaitent aller plus loin.",
    },
    {
      id: "ordinateur", category: "pratique",
      question: "Est-ce que je dois avoir mon propre ordinateur ?",
      answer: "Les ordinateurs et la connexion Internet sont disponibles pour les ateliers pratiques, selon les équipements disponibles. Vous pouvez contacter l'académie pour connaître les modalités.",
    },
    {
      id: "presentiel", category: "pratique",
      question: "La formation se fait-elle en ligne ?",
      answer: "Non. IA PRO 2026 est une formation 100 % en présentiel, en salle à Calavi. Seul le suivi de 30 jours qui suit la formation se fait à distance, dans le groupe WhatsApp privé.",
    },
    {
      id: "duree", category: "pratique",
      question: "Combien de temps dure la formation ?",
      answer: "Trois jours consécutifs : du lundi au mercredi, ou du jeudi au samedi. Pour chaque formule, deux horaires possibles : 10h à 13h ou 19h à 22h.",
    },
    {
      id: "specialites", category: "tarif",
      question: "Est-ce que les deux spécialités sont incluses dans les 20 000 FCFA ?",
      answer: "Oui. Le tarif comprend la formation en IA professionnelle et la formation en IA visuelle et cinématographique.",
    },
    {
      id: "accompagnement", category: "formation",
      question: "Que comprend l'accompagnement de 30 jours ?",
      answer: "Un groupe privé WhatsApp, des exercices pratiques, des corrections de vos réalisations, des conseils, des ressources complémentaires et un accompagnement pour finaliser votre projet personnel.",
    },
    {
      id: "lieu", category: "pratique",
      question: "Où se déroule la formation ?",
      answer: "En présentiel, en salle, à Calavi, Bidossessi, après le carrefour de l'ORTB.",
    },
    {
      id: "prix", category: "tarif",
      question: "Quel est le prix de la formation ?",
      answer: "20 000 FCFA, en un seul paiement. Ce montant couvre la formation, les supports pédagogiques et le mois de suivi.",
    },
  ],
};

/* ------------------------------------------------------------ SECTION 13 */
export const FINAL_CTA = {
  proof: "personnes déjà formées",
  titleLine1: "Vous avez tout vu.",
  titleLine2: "Maintenant, c'est à vous de choisir.",
  choices: [
    {
      tag: "Choix 1",
      title: "Vous fermez la page.",
      points: [
        "Vous vous dites que vous reviendrez plus tard.",
        "Vous continuez à utiliser l'IA pour poser quelques questions.",
        "Et vous regardez les autres prendre de l'avance.",
      ],
    },
    {
      tag: "Choix 2",
      title: "Vous rejoignez la prochaine cohorte.",
      points: [
        "3 jours de formation pratique, en présentiel à Calavi.",
        "Vous repartez avec vos propres réalisations.",
        "Un mois de suivi pour continuer à avancer.",
      ],
    },
  ],
  priceNote: "Tout compris. Un seul paiement.",
};
