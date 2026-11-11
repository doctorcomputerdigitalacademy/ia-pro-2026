import { BONUS } from "@/lib/landing/content.fr";
import { fcfa } from "@/lib/landing/pricing";
import { OfferCard } from "../primitives/OfferCard";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/** BONUS EXCLUSIF — réservé aux 10 premiers inscrits : cartes image + prix normal barré + GRATUIT. */
export function Bonus() {
  return (
    <section id="bonus" className="lp-section scroll-mt-24">
      <Container>
        <SectionHead eyebrow={BONUS.eyebrow} title={BONUS.title} text={BONUS.text} />

        <ol className="grid gap-5 sm:grid-cols-2">
          {BONUS.items.map((b, i) => (
            <Reveal as="li" key={b.title} y={28} delay={(i % 2) * 0.08}>
              <OfferCard
                kicker={`Bonus ${i + 1}`}
                title={b.title}
                text={b.text}
                image={b.image}
                cover={b.cover}
                strike={`${BONUS.normalPrice} : ${fcfa(b.value)}`}
                footer={BONUS.free}
              />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
