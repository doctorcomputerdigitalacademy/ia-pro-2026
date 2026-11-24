/* ==========================================================================
   CONFIGURATION — à modifier ici, nulle part ailleurs.
   ========================================================================== */

/**
 * Lien d'inscription utilisé par TOUS les boutons d'appel à l'action.
 * Numéro WhatsApp au format international, sans "+" ni espaces.
 */
export const WHATSAPP_NUMBER = "2290144429963";
const WHATSAPP_MESSAGE =
  "Bonjour Doctor Computer Digital Academy, je souhaite réserver ma place pour la formation IA PRO 2026.";

export const REGISTRATION_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

/** Lien de contact WhatsApp (carte « Vous avez une question précise ? » de la FAQ). */
export const CONTACT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Bonjour Doctor Computer Digital Academy, j'ai une question sur la formation IA PRO 2026.",
)}`;

/**
 * Vidéo de présentation (VSL) du Hero.
 * Accepte : un lien YouTube, un lien Vimeo ou un fichier .mp4
 * (ex. "/videos/presentation.mp4" placé dans le dossier public/).
 * Laisser vide ("") pour afficher le placeholder.
 */
export const VSL_SRC = "https://youtu.be/zy_oI6j_ENE";

/** Image d'aperçu optionnelle de la vidéo (ex. "/images/vsl-poster.jpg"). */
export const VSL_POSTER = "/videos/vsl-poster.webp";

/**
 * Meta Pixel (publicités Facebook / Instagram).
 * Coller ici l'identifiant du Pixel (15-16 chiffres, Gestionnaire d'événements Meta).
 * Laisser vide ("") pour désactiver complètement le suivi.
 */
export const META_PIXEL_ID = "1478490317553651";

/**
 * Formulaire de réservation : copie de chaque réponse dans Google Sheets.
 * Coller ici l'adresse de l'application web Google Apps Script
 * (voir docs/formulaire-google-sheets.md). Laisser vide ("") pour ne rien copier.
 */
export const SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwOUxoXKicYxZfWYNsyzSKbJEq16f539z-6g5mhHIm2Sk5nVPQvBbxuaQDMA5UBCt9L/exec";

/** Acompte pour réserver une place (le solde est réglé sur place le premier jour). */
export const DEPOSIT_VALUE = 5000;

/** Prix affiché sur tous les boutons d'appel à l'action. */
export const PRICE_LABEL = "20 000 FCFA";
/** Prix en nombre (sert au calcul « Vous économisez »). */
export const PRICE_VALUE = 20000;

/**
 * Verrou vidéo : au chargement, seule la vidéo est visible. Le bouton et la suite
 * de la page s'affichent quand le visiteur a regardé ce nombre de secondes
 * (ou la vidéo jusqu'à la fin). Mettre 0 pour désactiver le verrou.
 * Une fois débloquée, la page reste ouverte pour ce visiteur (mémorisé sur son appareil).
 */
export const VSL_UNLOCK_SECONDS = 45;
/**
 * Activer le verrou vidéo (true) ou laisser le visiteur libre de faire défiler la page (false).
 * Même désactivé, VSL_UNLOCK_SECONDS sert à savoir quand la vidéo est « regardée » (Pixel ViewContent).
 */
export const VIDEO_GATE = false;
/** Délai avant d'afficher le lien discret « Afficher la suite sans la vidéo » (connexion lente, vidéo bloquée…). */
export const VSL_SKIP_AFTER_SECONDS = 25;

/** Adresse publique du site (sert aux balises méta, au sitemap et aux aperçus réseaux sociaux). */
export const SITE_URL = "https://ia-pro-2026.vercel.app";

/** Clé de stockage du choix cookies du visiteur (bandeau de consentement). */
export const CONSENT_KEY = "iapro-cookie-consent-v1";
