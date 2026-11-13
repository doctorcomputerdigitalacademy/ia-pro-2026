import { Tick02Icon } from "@hugeicons/core-free-icons";
import { REALISATIONS } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Showcase } from "./Showcase";
import { Title } from "./Title";

/**
 * VOILÀ CE QUE VOUS SAUREZ FAIRE — les 7 réalisations en « livrables » :
 * une rangée par spécialité, chaque carte = icône, nom du fichier produit, titre,
 * et la mention « Réalisé en salle ». Pas de défilement.
 */
export function Realisations() {
  const groups = Array.from(new Set(REALISATIONS.items.map((it) => it.group)));
  return (
    <section className="v2-section">
      <Container>
        <Title line1={REALISATIONS.line1} line2={REALISATIONS.line2} className="text-center" />

        {/* Exemples en images et vidéos */}
        <div className="mt-10 md:mt-12">
          <Showcase />
        </div>

        <div className="mt-20 space-y-12 md:mt-24">
          {groups.map((g, gi) => {
            const items = REALISATIONS.items.filter((it) => it.group === g);
            const offset = REALISATIONS.items.findIndex((it) => it.group === g);
            return (
              <div key={g}>
                <div className="flex items-center gap-4">
                  <p className={cn("v2-kicker", gi === 1 && "is-red")}>{g}</p>
                  <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
                  <span className="text-[13px] font-semibold text-ink-soft">{items.length} réalisations</span>
                </div>
                <ol className={cn("v2-deliv mt-5", items.length === 4 ? "v2-deliv--4" : "v2-deliv--3")}>
                  {items.map((it, i) => (
                    <Reveal as="li" key={it.title} y={24} delay={i * 0.07}>
                      <article className={cn("v2-deliv__card", gi === 1 && "is-red")}>
                        <div className="flex items-start justify-between">
                          <span className="v2-deliv__icon">
                            <Icon icon={it.icon} size={22} strokeWidth={1.8} />
                          </span>
                          <span className="v2-deliv__num">{String(offset + i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="v2-deliv__file">{it.file}</p>
                        <h3 className="v2-deliv__title">{it.title}</h3>
                        <p className="v2-deliv__done">
                          <Icon icon={Tick02Icon} size={14} strokeWidth={2.6} />
                          Réalisé en salle
                        </p>
                      </article>
                    </Reveal>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
