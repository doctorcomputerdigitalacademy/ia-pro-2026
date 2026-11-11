import Image from "next/image";
import { SITUATIONS } from "@/lib/landing/content.fr";
import { cn } from "@/lib/utils";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/**
 * DEUX SITUATIONS — illustrées par de vraies photos (aucune icône, aucun emoji).
 * Situation 1 : sans méthode (photo désaturée) · Situation 2 : avec IA PRO 2026.
 */
export function Situations() {
  return (
    <section className="lp-section">
      <Container>
        <SectionHead eyebrow={SITUATIONS.eyebrow} title={SITUATIONS.title} />

        <div className="grid gap-5 md:grid-cols-2">
          {SITUATIONS.items.map((item, i) => {
            const good = i === 1;
            return (
              <Reveal key={item.tag} y={32} delay={i * 0.1}>
                <article className={cn("lp-card lp-situation h-full overflow-hidden", good && "lp-situation--good")}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.photo}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className={cn("lp-situation__tag", good ? "bg-primary" : "bg-secondary")}>{item.tag}</span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className={cn("lp-h3 text-[23px] font-bold md:text-[27px]", good ? "text-primary" : "text-secondary")}>
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[16px] text-ink-soft">{item.text}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {item.points.map((pt) => (
                        <li key={pt} className="lp-situation__point text-[15.5px] font-medium text-ink">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
