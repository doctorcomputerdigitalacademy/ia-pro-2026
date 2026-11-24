/* Script Google Apps Script — feuille « Réservations IA PRO 2026 ».
   Reçoit chaque formulaire du site et l'écrit dans l'onglet « Réservations ».
   Une même personne (même ID) met à jour sa ligne au lieu d'en créer une nouvelle.
   La colonne « Suivi (vos notes) » n'est jamais écrasée. */

function doPost(e) {
  var verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    var feuille = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Réservations");
    var d = JSON.parse(e.postData.contents);
    if (!d.id) return reponse("id manquant");

    var ligne = [
      new Date(),
      texte(d.etat),
      texte(d.nom),
      d.whatsapp ? "'" + String(d.whatsapp).slice(0, 25) : "",
      texte(d.profil),
      texte(d.horaire),
      texte(d.jours),
      texte(d.demarrage),
      texte(d.paiement),
      texte(d.arret),
      texte(d.ref),
    ];

    var derniere = feuille.getLastRow();
    var rang = 0;
    if (derniere > 1) {
      var ids = feuille.getRange(2, 13, derniere - 1, 1).getValues();
      for (var i = ids.length - 1; i >= 0; i--) {
        if (ids[i][0] === d.id) { rang = i + 2; break; }
      }
    }
    if (rang === 0) {
      rang = derniere + 1;
      feuille.getRange(rang, 13).setValue(texte(d.id));
    } else if (feuille.getRange(rang, 2).getValue() === "Envoyé" && d.etat === "Abandon") {
      return reponse("ok"); /* une réservation envoyée ne redevient jamais un abandon */
    }
    feuille.getRange(rang, 1, 1, 11).setValues([ligne]);
    return reponse("ok");
  } finally {
    verrou.releaseLock();
  }
}

/* Texte court et sans formule (une valeur commençant par = + - @ reste du texte). */
function texte(v) {
  var s = String(v == null ? "" : v).slice(0, 120);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reponse(t) {
  return ContentService.createTextOutput(t);
}
