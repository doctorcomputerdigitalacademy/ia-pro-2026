import Image from "next/image";
import { REALISATIONS } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Container } from "../primitives/SectionHead";
import { Reveal } from "../primitives/Reveal";
import { Title } from "./Title";

/** CE QUE VOUS REPARTEZ AVEC — 7 réalisations en affiches qui défilent (façon galerie ghostdesignco). */
export function Realisations() {
  const items = [...REALISATIONS.items, ...REALISATIONS.items];
  return (
    <section className="v2-section">
      <Container>
        <Title line1={REALISATIONS.line1} line2={REALISATIONS.line2} />
      </Container>
      <Reveal y={30} className="mt-10">
        <div className="lp-marquee" style={{ "--marquee-duration": "70s", "--marquee-gap": "16px" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="lp-marquee__track" aria-hidden={copy === 1 ? true : undefined}>
              {items.map((it, i) => (
                <li key={`${copy}-${i}`} className="v2-poster-wrap">
                  <div className={cn("v2-poster", `v2-poster--${it.tone}`)}>
                    <span className="v2-poster__kicker">{it.kicker}</span>
                    <span className="v2-poster__big">{it.short}</span>
                    <span className="v2-poster__brand">
                      <Image src="/brand/mark.png" alt="" width={24} height={24} className="h-auto w-6" />
                      IA PRO 2026
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] font-semibold text-ink">{it.title}</p>
                  <p className="text-[13.5px] text-ink-soft">{it.group}</p>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
