/* ==========================================================================
   CONFIGURATION — à modifier ici, nulle part ailleurs.
   ========================================================================== */

/**
 * Lien d'inscription utilisé par TOUS les boutons d'appel à l'action.
 * Numéro WhatsApp au format international, sans "+" ni espaces.
 */
const WHATSAPP_NUMBER = "2290144429963";
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
export const VSL_POSTER = "https://i.ytimg.com/vi/zy_oI6j_ENE/maxresdefault.jpg";

/**
 * Meta Pixel (publicités Facebook / Instagram).
 * Coller ici l'identifiant du Pixel (15-16 chiffres, Gestionnaire d'événements Meta).
 * Laisser vide ("") pour désactiver complètement le suivi.
 */
export const META_PIXEL_ID = "";

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
/** Délai avant d'afficher le lien discret « Afficher la suite sans la vidéo » (connexion lente, vidéo bloquée…). */
export const VSL_SKIP_AFTER_SECONDS = 25;
