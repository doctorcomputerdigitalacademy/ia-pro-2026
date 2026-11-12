import Image from "next/image";
import { SPECIALTIES } from "@/lib/landing/content.v2";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

/** UNE FORMATION, DEUX SPÉCIALITÉS — grille « bento » (façon ghostdesignco). */
export function Specialties() {
  const { pro, visual, support } = SPECIALTIES;
  return (
    <section className="v2-section">
      <Container>
        <Title line1={SPECIALTIES.line1} line2={SPECIALTIES.line2} />

        <div className="mt-10 grid gap-4 md:grid-cols-[1.35fr_1fr] md:grid-rows-2">
          <Reveal className="md:row-span-2">
            <article className="v2-bento v2-bento--photo h-full">
              <Image src={pro.photo} alt="Apprenants en séance pratique" fill sizes="(min-width: 768px) 58vw, 100vw" className="v2-bento__img object-cover" />
              <div className="v2-bento__shade" aria-hidden="true" />
              <div className="relative mt-auto">
                <span className="v2-pill">{pro.tag}</span>
                <h3 className="v2-bento__title mt-3">{pro.title}</h3>
                <p className="mt-2 max-w-[440px] text-[15.5px] text-surface/85">{pro.text}</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="v2-bento v2-bento--red h-full">
              <span className="v2-pill v2-pill--light">{visual.tag}</span>
              <h3 className="v2-bento__title mt-auto">{visual.title}</h3>
              <p className="mt-2 text-[15px] text-surface/85">{visual.text}</p>
            </article>
          </Reveal>
          <Reveal delay={0.18}>
            <article className="v2-bento v2-bento--blue h-full">
              <span className="v2-pill v2-pill--light">{support.tag}</span>
              <h3 className="v2-bento__title mt-auto">{support.title}</h3>
              <p className="mt-2 text-[15px] text-surface/85">{support.text}</p>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
