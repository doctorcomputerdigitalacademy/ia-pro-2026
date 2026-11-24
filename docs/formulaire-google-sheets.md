# Copier les réponses du formulaire dans Google Sheets

Chaque fois qu'une personne valide le formulaire de réservation du site, une ligne s'ajoute dans une feuille Google Sheets. Comptez environ 5 minutes pour l'installer, une seule fois.

## 1. Créer la feuille
1. Ouvrez https://sheets.google.com et créez une feuille vide nommée « Réservations IA PRO 2026 ».
2. Laissez la ligne 1 vide : le script écrit lui-même les titres des colonnes.

## 2. Ajouter le script
1. Dans la feuille, ouvrez le menu **Extensions**, puis **Apps Script**.
2. Effacez tout le code affiché et collez le code ci-dessous.
3. Cliquez sur l'icône **Enregistrer**.

```javascript
const COLONNES = ["Date", "Nom et prénom", "Statut", "Horaire", "Jours", "Démarrage", "Paiement", "Pub d'origine"];

function doPost(e) {
  const feuille = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (feuille.getLastRow() === 0) feuille.appendRow(COLONNES);
  const d = JSON.parse(e.postData.contents);
  feuille.appendRow([
    new Date(), d.nom, d.statut, d.horaire, d.jours, d.demarrage, d.paiement, d.ref,
  ]);
  return ContentService.createTextOutput("ok");
}
```

## 3. Publier le script
1. En haut à droite, cliquez sur **Déployer**, puis **Nouveau déploiement**.
2. Cliquez sur l'engrenage à côté de « Sélectionner le type », puis choisissez **Application Web**.
3. Réglez **Exécuter en tant que** sur **Moi**, et **Qui a accès** sur **Tout le monde**.
4. Cliquez sur **Déployer**, puis acceptez les autorisations demandées par Google. Google affiche « Cette appli n'a pas été validée » : cliquez sur **Paramètres avancés**, puis **Accéder à… (non sécurisé)**. C'est normal, car c'est votre propre script.
5. Copiez l'**URL de l'application Web**. Elle se termine par `/exec`.

## 4. Brancher le site
Collez cette URL dans `lib/landing/config.ts`, à la ligne `SHEETS_WEBHOOK_URL = "..."`, puis publiez le site. Vous pouvez aussi la donner à Claude, qui s'en chargera.

## Bon à savoir
- La feuille ne contient pas le numéro de téléphone : il arrive avec le message WhatsApp. Une ligne sans message WhatsApp correspondant signifie que la personne a rempli le formulaire mais n'a pas envoyé le message.
- Si vous modifiez le script plus tard, refaites un déploiement en passant par **Déployer**, puis **Gérer les déploiements**, puis **Modifier**, et choisissez **Nouvelle version**. Sinon, le site continue d'utiliser l'ancienne version.
