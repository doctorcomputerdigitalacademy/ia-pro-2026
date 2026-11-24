import type { Metadata } from "next";
import { LegalShell } from "@/components/landing/LegalShell";
import { ManageCookies } from "@/components/landing/primitives/ManageCookies";
import { BRAND } from "@/lib/landing/content.fr";
import { CONTACT_URL } from "@/lib/landing/config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${BRAND.name} collecte, utilise et protège vos données personnelles sur le site IA PRO 2026 et lors de votre inscription sur WhatsApp.`,
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Politique de confidentialité" updated="24 novembre 2026">
      <p>
        Cette page explique quelles données personnelles nous recueillons quand vous visitez le site de la formation <strong>IA PRO 2026</strong> ou quand vous nous écrivez sur WhatsApp, pourquoi nous les utilisons et quels sont vos droits. Elle s&apos;appuie sur la loi n° 2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin.
      </p>

      <h2>1. Qui est responsable de vos données</h2>
      <div className="lp-legal__card">
        <p>
          <strong>{BRAND.name}</strong>
          <br />
          {BRAND.address}, Bénin
          <br />
          Contact : WhatsApp au <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">+229 01 44 42 99 63</a>
        </p>
      </div>

      <h2>2. Les données que nous recueillons</h2>
      <p>Le site ne demande ni mot de passe ni paiement en ligne. Nous recueillons uniquement :</p>
      <ul>
        <li>
          <strong>Les réponses au formulaire de réservation</strong> : votre nom et prénom, votre numéro WhatsApp, votre situation (salarié, entrepreneur, étudiant…), l&apos;horaire, les jours et la cohorte choisis, et le mode de paiement choisi. Ces réponses composent le message WhatsApp que vous nous envoyez, et une copie est enregistrée dans notre tableau de suivi des réservations (Google Sheets). Si vous commencez le formulaire sans l&apos;envoyer, les réponses déjà remplies sont aussi enregistrées dès que vous avez indiqué votre nom ou votre numéro, afin que nous puissions vous recontacter pour finaliser votre inscription. Le formulaire vous l&apos;indique sous le champ du numéro.
        </li>
        <li>
          <strong>Les messages que vous nous envoyez sur WhatsApp</strong> : votre nom, votre numéro de téléphone, la cohorte choisie et le contenu de vos échanges avec nous.
        </li>
        <li>
          <strong>Des statistiques de visite anonymes</strong> (Vercel Web Analytics) : page consultée, site d&apos;origine (par exemple Facebook), type d&apos;appareil, navigateur et pays. Ces statistiques n&apos;utilisent aucun cookie et ne permettent pas de vous identifier.
        </li>
        <li>
          <strong>Des données de mesure publicitaire</strong> (Pixel Meta) : votre visite, l&apos;ouverture et l&apos;envoi du formulaire et vos clics vers WhatsApp, associés aux cookies de Meta. Vous pouvez les refuser à tout moment : voir la partie « Cookies » ci-dessous.
        </li>
      </ul>

      <h2>3. Pourquoi nous les utilisons</h2>
      <ul>
        <li>Répondre à vos questions et gérer votre inscription à une cohorte, y compris le suivi des réservations faites par le formulaire (exécution de votre demande).</li>
        <li>Assurer l&apos;accompagnement de 30 jours qui suit la formation (exécution de la formation).</li>
        <li>Savoir combien de personnes visitent le site et d&apos;où elles viennent, pour l&apos;améliorer (intérêt légitime, données anonymes).</li>
        <li>Mesurer l&apos;efficacité de nos publicités Facebook et Instagram (intérêt légitime, sauf si vous refusez).</li>
      </ul>
      <p>Nous ne vendons pas vos données et nous ne les utilisons pas pour d&apos;autres finalités que celles-ci.</p>

      <h2>4. Qui peut y accéder</h2>
      <ul>
        <li>L&apos;équipe de {BRAND.name}, pour répondre à vos messages et organiser la formation.</li>
        <li>
          <strong>Meta</strong> (WhatsApp, Facebook, Instagram), qui fournit la messagerie et la mesure publicitaire, sauf si vous la refusez.
        </li>
        <li>
          <strong>Vercel</strong>, qui héberge le site et produit les statistiques de visite anonymes.
        </li>
        <li>
          <strong>Google</strong>, qui héberge notre tableau de suivi des réservations (Google Sheets).
        </li>
      </ul>
      <p>
        Ces prestataires peuvent traiter des données en dehors du Bénin, notamment aux États-Unis et dans l&apos;Union européenne. Ils s&apos;engagent à les protéger dans leurs propres conditions d&apos;utilisation et politiques de confidentialité.
      </p>

      <h2 id="cookies">5. Cookies</h2>
      <p>
        Le site utilise le Pixel Meta. Il dépose des cookies (par exemple <em>_fbp</em>) qui permettent à Meta de savoir qu&apos;une personne venue d&apos;une publicité a consulté la page, ouvert ou envoyé le formulaire de réservation, ou cliqué vers WhatsApp. Un bandeau en bas de page, ainsi que le lien « Gérer mes cookies » du pied de page, vous laissent le choix :
      </p>
      <ul>
        <li>
          <strong>Accepter</strong> : la mesure publicitaire continue.
        </li>
        <li>
          <strong>Refuser</strong> : le Pixel Meta s&apos;arrête et n&apos;est plus chargé lors de vos prochaines visites. Le site fonctionne exactement de la même façon.
        </li>
      </ul>
      <p>
        Votre choix est enregistré sur votre appareil pour ne pas vous reposer la question à chaque visite. La vidéo de présentation est hébergée sur YouTube : le lecteur ne se charge que si vous cliquez sur le bouton de lecture, et YouTube applique alors ses propres règles.
      </p>
      <ManageCookies className="lp-legal__btn" label="Modifier mon choix de cookies" />

      <h2>6. Combien de temps nous les gardons</h2>
      <ul>
        <li>Échanges WhatsApp, réponses au formulaire et informations d&apos;inscription : pendant la formation et l&apos;accompagnement, puis au maximum 3 ans après votre dernier échange avec nous.</li>
        <li>Statistiques de visite : données anonymes, conservées selon les règles de Vercel.</li>
        <li>Cookies Meta : au maximum 13 mois. Votre choix sur le bandeau : jusqu&apos;à ce que vous le changiez ou effaciez les données de votre navigateur.</li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>
        Vous pouvez à tout moment demander à <strong>consulter</strong>, <strong>corriger</strong> ou <strong>supprimer</strong> vos données, ou vous <strong>opposer</strong> à leur utilisation. Il suffit de nous écrire sur{" "}
        <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>. Nous vous répondons dans un délai d&apos;un mois au plus.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l&apos;Autorité de Protection des Données à caractère Personnel (APDP) du Bénin.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Le site est servi uniquement en connexion sécurisée (HTTPS). Nous limitons l&apos;accès à vos informations aux seules personnes qui en ont besoin pour organiser la formation.
      </p>

      <h2>9. Modifications</h2>
      <p>
        Nous pouvons mettre à jour cette politique, par exemple si nous ajoutons un nouvel outil. La date de dernière mise à jour figure en haut de la page.
      </p>
    </LegalShell>
  );
}
