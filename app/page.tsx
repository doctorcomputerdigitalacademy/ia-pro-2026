import { LandingPage } from "@/components/landing/LandingPage";
import { BRAND } from "@/lib/landing/content.fr";
import { PRICE_VALUE, SITE_URL } from "@/lib/landing/config";

/* Données structurées (Google) : la formation, son organisme et son prix. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IA PRO 2026",
  description:
    "Formation pratique en intelligence artificielle : 3 jours en présentiel à Calavi + 30 jours d'accompagnement. ChatGPT, Claude, Gemini, NotebookLM, création de visuels et de vidéos avec l'IA.",
  url: SITE_URL,
  inLanguage: "fr",
  image: `${SITE_URL}/opengraph-image.jpg`,
  provider: {
    "@type": "EducationalOrganization",
    name: BRAND.name,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Centre Baha'i de la Communauté de Calavi, Bidossessi, après le carrefour de l'ORTB",
      addressLocality: "Abomey-Calavi",
      addressCountry: "BJ",
    },
    geo: { "@type": "GeoCoordinates", latitude: 6.42933891, longitude: 2.34481219 },
  },
  offers: {
    "@type": "Offer",
    price: PRICE_VALUE,
    priceCurrency: "XOF",
    availability: "https://schema.org/InStock",
    url: SITE_URL,
    category: "Formation",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: { "@type": "Place", name: BRAND.name, address: BRAND.address },
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
      <LandingPage />
    </>
  );
}
