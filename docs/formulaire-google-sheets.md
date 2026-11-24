# Relier le formulaire du site à Google Sheets

La feuille « Réservations IA PRO 2026 » existe déjà dans le Google Drive de l'académie. Elle contient trois onglets :
- **Réservations** : une ligne par personne. L'état vaut « Envoyé » quand le formulaire a été envoyé vers WhatsApp, ou « Abandon » quand la personne a commencé le formulaire sans le finir. La colonne « Arrêté à » indique alors l'étape où elle s'est arrêtée.
- **Résumé** : les totaux, mis à jour automatiquement.
- **Installation** : un lien vers le document qui explique comment relier le site à la feuille.

Pour l'installation, collez le code de `docs/formulaire-apps-script.js` dans Extensions > Apps Script, puis faites Déployer > Nouveau déploiement > Application Web, avec « Exécuter en tant que : Moi » et « Qui a accès : Tout le monde ». Collez ensuite l'URL qui se termine par `/exec` dans `lib/landing/config.ts`, à la ligne `SHEETS_WEBHOOK_URL`.

Une ligne « Abandon » n'est créée que si la personne a donné au moins son nom ou son numéro. Une ligne « Envoyé » ne redevient jamais « Abandon ».
