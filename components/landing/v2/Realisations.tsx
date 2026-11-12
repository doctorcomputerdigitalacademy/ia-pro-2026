import { REALISATIONS } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

/**
 * VOILÀ CE QUE VOUS SAUREZ FAIRE — les 7 réalisations, sans défilement :
 * deux colonnes (une par spécialité), chaque réalisation sur une ligne numérotée.
 */
export function Realisations() {
  const groups = Array.from(new Set(REALISATIONS.items.map((it) => it.group)));
  let n = 0;
  return (
    <section className="v2-section">
      <Container>
        <Title line1={REALISATIONS.line1} line2={REALISATIONS.line2} />
        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          {groups.map((g, gi) => (
            <div key={g}>
              <p className={cn("v2-kicker", gi === 1 && "is-red")}>{g}</p>
              <ol className="v2-index mt-5">
                {REALISATIONS.items
                  .filter((it) => it.group === g)
                  .map((it) => {
                    n += 1;
                    return (
                      <Reveal as="li" key={it.title} y={18} delay={0.05 * (n % 4)} className={cn("v2-index__row", gi === 1 && "is-red")}>
                        <span className="v2-index__num">{String(n).padStart(2, "0")}</span>
                        <span className="v2-index__title">{it.title}</span>
                      </Reveal>
                    );
                  })}
              </ol>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
