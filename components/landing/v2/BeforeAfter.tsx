import { ArrowRight01Icon, Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { BEFORE_AFTER } from "@/lib/landing/content.v2";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

function List({ items, after }: { items: string[]; after?: boolean }) {
  return (
    <ul className="v2-ba2__list">
      {items.map((t, i) => (
        <Reveal as="li" key={t} y={14} delay={0.15 + i * 0.08} className="v2-ba2__item">
          <span className={after ? "v2-ba__ico v2-ba__ico--after" : "v2-ba__ico"}>
            <Icon icon={after ? Tick02Icon : Cancel01Icon} size={12} strokeWidth={2.6} />
          </span>
          {t}
        </Reveal>
      ))}
    </ul>
  );
}

/**
 * AVANT / APRÈS — deux cartes côte à côte (aussi sur mobile), chacune dans sa partie :
 * « Avant » en blanc, « Après » en sombre, une flèche entre les deux.
 */
export function BeforeAfter() {
  return (
    <section className="v2-section">
      <Container>
        <Title line1={BEFORE_AFTER.line1} line2={BEFORE_AFTER.line2} className="text-center" />
        <div className="v2-ba2 mt-10 md:mt-14">
          <Reveal y={28} className="h-full">
            <div className="v2-ba2__card v2-ba2__card--before">
              <span className="v2-ba__tag">{BEFORE_AFTER.beforeTag}</span>
              <List items={BEFORE_AFTER.before} />
            </div>
          </Reveal>
          <span className="v2-ba2__arrow" aria-hidden="true">
            <Icon icon={ArrowRight01Icon} size={18} strokeWidth={2.4} />
          </span>
          <Reveal y={28} delay={0.12} className="h-full">
            <div className="v2-ba2__card v2-ba2__card--after">
              <span className="v2-ba__tag v2-ba__tag--after">{BEFORE_AFTER.afterTag}</span>
              <List items={BEFORE_AFTER.after} after />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
