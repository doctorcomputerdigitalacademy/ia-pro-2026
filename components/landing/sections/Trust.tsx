import { TRUST } from "@/lib/landing/content.fr";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";
import { PhotoWall, TestimonialsMarquee } from "./SocialProof";

/** SECTION 8 — NOS SÉANCES PRATIQUES (photos) + TÉMOIGNAGES */
export function Trust() {
  return (
    <section className="lp-section">
      <Container>
        <SectionHead eyebrow={TRUST.photosEyebrow} title={TRUST.photosTitle} className="mb-8 md:mb-10" />
      </Container>

      {/* Mur de photos des anciens apprenants (à remplir dans content.fr.ts → photos[]) */}
      <Reveal y={24} className="mx-auto max-w-[1600px]">
        <PhotoWall />
      </Reveal>

      <Container>
        <Reveal y={24} className="mt-14 text-center">
          <h3 className="lp-h3 text-[22px] md:text-[26px]">{TRUST.testimonialsTitle}</h3>
        </Reveal>
      </Container>

      {/* Carrousel pleine largeur, deux lignes en sens opposés */}
      <Reveal y={24} className="mx-auto mt-8 max-w-[1600px]">
        <TestimonialsMarquee />
      </Reveal>

    </section>
  );
}
