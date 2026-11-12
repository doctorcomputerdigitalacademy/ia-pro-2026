import Image from "next/image";
import { TOOLS } from "@/lib/landing/content.v2";
import { cn } from "@/lib/utils";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

const INNER = TOOLS.words.slice(0, 3);
const OUTER = TOOLS.words.slice(3);

function Ring({ items, kind }: { items: typeof TOOLS.words; kind: "inner" | "outer" }) {
  return (
    <div className={cn("v2-orbit__ring", `v2-orbit__ring--${kind}`)}>
      {items.map((t, i) => (
        <div key={t.word} className="v2-orbit__slot" style={{ "--a": `${(360 / items.length) * i}deg` } as React.CSSProperties}>
          <span className="v2-orbit__upright">
            <span className={cn("v2-orbit__chip", kind === "inner" && "is-main")}>
              <b>{t.word.replace(/\.$/, "")}</b>
              <small>{t.tag}</small>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * LES OUTILS — système en orbite : au centre IA PRO 2026, autour les outils qui tournent
 * sur deux anneaux en sens opposés (les étiquettes restent droites). Pause au survol.
 */
export function Tools() {
  return (
    <section className="v2-section overflow-hidden">
      <Container>
        <Title line1={TOOLS.line1} line2={TOOLS.line2} className="text-center" />
        <Reveal y={30} className="mt-6 flex justify-center">
          <div className="v2-orbit" role="list" aria-label="Outils">
            <span className="v2-orbit__track v2-orbit__track--outer" aria-hidden="true" />
            <span className="v2-orbit__track v2-orbit__track--inner" aria-hidden="true" />
            <div className="v2-orbit__core">
              <Image src="/brand/mark.png" alt="" width={56} height={56} className="h-auto w-12" />
              <span>{TOOLS.center}</span>
            </div>
            <Ring items={OUTER} kind="outer" />
            <Ring items={INNER} kind="inner" />
            <ul className="sr-only">
              {TOOLS.words.map((t) => (
                <li key={t.word} role="listitem">
                  {t.word} {t.tag}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
