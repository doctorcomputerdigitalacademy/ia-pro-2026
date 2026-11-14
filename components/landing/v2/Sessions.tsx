import Image from "next/image";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { SESSIONS } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

function Row({ photos, reverse }: { photos: string[]; reverse?: boolean }) {
  return (
    <div className={cn("lp-marquee v2-sess__row", reverse && "lp-marquee--reverse")}>
      {[0, 1].map((k) => (
        <div key={k} className="lp-marquee__track" aria-hidden={k === 1 || undefined}>
          {photos.map((src, i) => (
            <figure key={`${k}-${src}`} className={cn("v2-sess__photo", i % 3 === 1 && "is-wide")}>
              <Image src={src} alt={k === 0 ? "Apprenants en séance pratique, en salle à Calavi" : ""} fill sizes="(min-width: 768px) 460px, 300px" quality={90} className="object-cover" />
              {i % 2 === 0 ? <figcaption>Séance en présentiel · Calavi</figcaption> : null}
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * NOS SÉANCES PRATIQUES — vraies photos des séances, sur deux rubans qui défilent
 * en sens inverse (pause au survol), puis 3 repères factuels.
 */
export function Sessions() {
  const a = SESSIONS.photos;
  const b = [...a.slice(3), ...a.slice(0, 3)];
  return (
    <section className="v2-section v2-sess">
      <Container>
        <Title line1={SESSIONS.line1} line2={SESSIONS.line2} className="text-center" />
      </Container>
      <Reveal y={30} className="mt-12 space-y-4 md:mt-14 md:space-y-5">
        <Row photos={a} />
        <Row photos={b} reverse />
      </Reveal>
      <Container>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {SESSIONS.chips.map((c, i) => (
            <Reveal as="li" key={c} y={14} delay={i * 0.08} className="v2-sess__chip">
              <Icon icon={Tick02Icon} size={14} strokeWidth={2.6} />
              {c}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
