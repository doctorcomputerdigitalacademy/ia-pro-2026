import { QuoteUpIcon } from "@hugeicons/core-free-icons";
import { testimonials } from "@/lib/landing/content.fr";
import { PROOF } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .replace(/[^A-Za-zÀ-ÿ]/g, "")
    .slice(0, 2)
    .toUpperCase();

/** Ordre des témoignages dans chaque colonne (décalé pour ne pas voir les mêmes côte à côte) */
const COLUMNS = [
  { order: [0, 1, 2, 3, 4, 5], duration: 46, reverse: false },
  { order: [3, 4, 5, 0, 1, 2], duration: 54, reverse: true },
  { order: [1, 5, 2, 4, 0, 3], duration: 50, reverse: false },
];

function Card({ i }: { i: number }) {
  const t = testimonials[i % testimonials.length];
  return (
    <figure className="v2-wall__card">
      <figcaption className="flex items-center gap-3">
        <span className="v2-tst__avatar">{initials(t.name)}</span>
        <span className="min-w-0">
          <span className="v2-tst__name">{t.name}</span>
          <span className="v2-tst__role">{t.role}</span>
        </span>
      </figcaption>
      <blockquote className="v2-wall__quote">{t.quote}</blockquote>
    </figure>
  );
}

/**
 * TÉMOIGNAGES — mur de cartes en 3 colonnes qui défilent toutes seules, verticalement,
 * à des vitesses différentes (la colonne du milieu en sens inverse), comme sur
 * notion-secrets.com. Pause au survol. 1 colonne sur mobile, 2 sur tablette.
 */
export function Testimonials() {
  return (
    <section className="v2-section">
      <Container>
        <div className="flex flex-col items-center text-center">
          <span className="v2-tst__mark" aria-hidden="true">
            <Icon icon={QuoteUpIcon} size={24} strokeWidth={2} />
          </span>
          <Title line1={PROOF.line1} line2={PROOF.line2} className="mt-5 text-center" />
        </div>

        <Reveal y={30} className="mt-12 md:mt-16">
          <div className="v2-wall">
            {COLUMNS.map((col, c) => (
              <div
                key={c}
                className={cn("v2-wall__col", col.reverse && "is-reverse", c === 1 && "is-md", c === 2 && "is-lg")}
                style={{ ["--wall-dur" as string]: `${col.duration}s` }}
                aria-hidden={c > 0 || undefined}
              >
                {[0, 1].map((k) => (
                  <div key={k} className="v2-wall__track" aria-hidden={k === 1 || undefined}>
                    {col.order.map((i) => (
                      <Card key={`${k}-${i}`} i={i} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
