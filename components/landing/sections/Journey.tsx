import { PROBLEM } from "@/lib/landing/content.fr";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { PathJourney } from "./PathJourney";

/**
 * « Imaginez tout ce que vous pourriez accomplir… » : le chemin vert jusqu'au point
 * d'arrivée (bénéfices et valeurs). Placé après les témoignages écrits.
 */
export function Journey() {
  return (
    <section className="lp-section">
      <Container>
        <Reveal y={24} className="mx-auto max-w-[760px] text-center">
          <h2 className="lp-h2 text-[clamp(26px,3.6vw,40px)]">{PROBLEM.listIntro}</h2>
        </Reveal>
        <div className="mt-8 md:mt-10">
          <PathJourney />
        </div>
      </Container>
    </section>
  );
}
