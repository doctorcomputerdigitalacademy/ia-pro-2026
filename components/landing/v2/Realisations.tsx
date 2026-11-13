import { REALISATIONS } from "@/lib/landing/content.v2";
import { Container } from "../primitives/SectionHead";
import { Showcase } from "./Showcase";
import { Title } from "./Title";

/**
 * VOILÀ CE QUE VOUS SAUREZ FAIRE — exemples de créations IA (affiches, photoshoots, vidéos).
 * Les cartes « livrables » ont été retirées : elles répétaient le programme.
 */
export function Realisations() {
  return (
    <section className="v2-section">
      <Container>
        <Title line1={REALISATIONS.line1} line2={REALISATIONS.line2} className="text-center" />
        <div className="mt-10 md:mt-12">
          <Showcase />
        </div>
      </Container>
    </section>
  );
}
