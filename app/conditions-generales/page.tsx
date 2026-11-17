import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/landing/LegalShell";
import { BRAND } from "@/lib/landing/content.fr";
import { CONTACT_URL, PRICE_LABEL } from "@/lib/landing/config";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: `Conditions générales d'inscription et de participation à la formation IA PRO 2026 de ${BRAND.name} à Calavi.`,
  alternates: { canonical: "/conditions-generales" },
};

/*
 * Les articles 4 (paiement), 5 (report et annulation) et 8 (photos) sont des propositions
 * à valider par l'académie avant de s'y engager.
 */
export default function TermsPage() {
  return (
    <LegalShell title="Conditions générales" updated="17 novembre 2026">
      <p>
        Les présentes conditions s&apos;appliquent à toute inscription à la formation <strong>IA PRO 2026</strong> proposée par <strong>{BRAND.name}</strong>, {BRAND.address}, Bénin. En réservant votre place, vous les acceptez.
      </p>

      <h2>1. La formation</h2>
      <ul>
        <li>
          <strong>3 jours de formation en présentiel</strong> à Calavi, dans les locaux de l&apos;académie, suivis de <strong>30 jours d&apos;accompagnement</strong>.
        </li>
        <li>Deux formules : du lundi au mercredi, ou du jeudi au samedi.</li>
        <li>Deux horaires : de 10h00 à 13h00, ou de 19h00 à 22h00.</li>
        <li>20 places maximum par cohorte.</li>
        <li>
          Des ordinateurs et une connexion Internet sont disponibles pour les ateliers pratiques, selon les équipements disponibles. Contactez l&apos;académie pour en connaître les modalités.
        </li>
      </ul>
      <p>Le contenu détaillé du programme est présenté sur la <Link href="/#programme">page de la formation</Link>.</p>

      <h2>2. Inscription</h2>
      <p>
        L&apos;inscription se fait en nous écrivant sur <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a> au +229 01 44 42 99 63. Vous y choisissez votre cohorte. Les places sont attribuées dans l&apos;ordre des inscriptions confirmées, dans la limite de 20 par cohorte.
      </p>

      <h2>3. Prix</h2>
      <p>
        Le prix de la formation est de <strong>{PRICE_LABEL}</strong> par personne, en un seul paiement. Il comprend les 3 jours de formation, les supports pédagogiques et les 30 jours d&apos;accompagnement. Aucun autre frais n&apos;est demandé pour suivre le programme.
      </p>
      <p>
        Les bonus annoncés sur le site sont réservés aux 10 premiers inscrits. Ils sont offerts en plus de la formation et ne peuvent pas être échangés contre de l&apos;argent.
      </p>

      <h2>4. Paiement</h2>
      <p>
        Les moyens et la date de paiement vous sont indiqués sur WhatsApp au moment de l&apos;inscription. Votre place est confirmée à réception du paiement.
      </p>

      <h2>5. Report et annulation</h2>
      <ul>
        <li>
          <strong>Par vous</strong> : si vous ne pouvez plus venir, prévenez-nous sur WhatsApp au moins 48 heures avant le début de votre cohorte. Votre inscription est alors reportée sur une cohorte suivante, dans la limite des places disponibles. Une fois la formation commencée, aucun remboursement n&apos;est possible.
        </li>
        <li>
          <strong>Par l&apos;académie</strong> : si une cohorte doit être reportée ou annulée, nous vous prévenons au plus tôt et vous proposons une autre date. Si aucune date ne vous convient, la somme versée vous est remboursée.
        </li>
      </ul>

      <h2>6. Engagements du participant</h2>
      <ul>
        <li>Arriver à l&apos;heure et respecter les autres participants, le formateur et le matériel mis à disposition.</li>
        <li>Utiliser les outils d&apos;intelligence artificielle de façon légale, sans porter atteinte aux droits ou à l&apos;image d&apos;autrui.</li>
      </ul>

      <h2>7. Supports et créations</h2>
      <p>
        Les supports remis pendant la formation sont réservés à votre usage personnel et professionnel. Ils ne peuvent pas être revendus ni diffusés publiquement sans notre accord. Les visuels, vidéos et documents que vous créez pendant la formation vous appartiennent, dans le respect des conditions d&apos;utilisation de chaque outil d&apos;IA.
      </p>

      <h2>8. Photos et vidéos des séances</h2>
      <p>
        Des photos ou vidéos peuvent être prises pendant les séances pour présenter la formation. Si vous ne souhaitez pas y apparaître, il suffit de le dire au formateur ou de nous l&apos;écrire sur WhatsApp. Nous retirerons aussi sur demande toute image publiée où vous apparaissez.
      </p>

      <h2>9. Responsabilité</h2>
      <p>
        Nous mettons tout en œuvre pour vous transmettre des compétences pratiques. Les résultats que vous obtiendrez ensuite dépendent de votre pratique et de votre activité : ils ne peuvent pas être garantis. Les outils d&apos;IA présentés appartiennent à leurs éditeurs, qui peuvent modifier leurs fonctionnalités ou leurs prix.
      </p>

      <h2>10. Données personnelles</h2>
      <p>
        L&apos;utilisation de vos données est décrite dans notre <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>11. Droit applicable</h2>
      <p>
        Ces conditions sont soumises au droit béninois. En cas de désaccord, nous cherchons d&apos;abord une solution à l&apos;amiable. À défaut, les tribunaux compétents du Bénin pourront être saisis.
      </p>
    </LegalShell>
  );
}
