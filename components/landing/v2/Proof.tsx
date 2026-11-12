import { PROOF } from "@/lib/landing/content.v2";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { PhotoWall, TestimonialsMarquee } from "../sections/SocialProof";
import { Title } from "./Title";

/** ILS SE SONT FORMÉS — photos des séances + témoignages, en bandes qui défilent. */
export function Proof() {
  return (
    <section className="v2-section">
      <Container>
        <Title line1={PROOF.line1} line2={PROOF.line2} className="text-center" />
      </Container>
      <Reveal y={30} className="mx-auto mt-10 max-w-[1600px]">
        <PhotoWall />
      </Reveal>
      <Reveal y={30} className="mx-auto mt-6 max-w-[1600px]">
        <TestimonialsMarquee />
      </Reveal>
    </section>
  );
}
