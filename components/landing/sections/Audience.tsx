import Image from "next/image";
import { AUDIENCE } from "@/lib/landing/content.fr";
import { Reveal } from "../primitives/Reveal";
import { Container, SectionHead } from "../primitives/SectionHead";

/** SECTION 9 — CETTE FORMATION EST FAITE POUR VOUS SI VOUS ÊTES… (une photo par profil) */
export function Audience() {
  return (
    <section className="lp-section">
      <Container>
        <SectionHead eyebrow={AUDIENCE.eyebrow} title={AUDIENCE.title} text={AUDIENCE.text} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.profiles.map((profile, i) => (
            <Reveal as="li" key={profile.title} delay={(i % 3) * 0.1}>
              <article className="lp-card lp-card--hover lp-profile h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={profile.photo}
                    alt={profile.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="lp-profile__img object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="lp-h3 text-[21px] font-bold">{profile.title}</h3>
                  <p className="mt-2 text-[15.5px] text-ink-soft">{profile.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
