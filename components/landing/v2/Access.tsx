"use client";

import { useEffect, useRef, useState } from "react";
import { Location01Icon, Navigation03Icon, VolumeOffIcon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { ACCESS } from "@/lib/landing/content.v2";
import { CONTACT_URL } from "@/lib/landing/config";
import { Icon } from "../primitives/Icon";
import { Reveal } from "../primitives/Reveal";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

/** Lien d'itinéraire Google Maps vers le point GPS du lieu de formation. */
const ROUTE_URL = `https://www.google.com/maps/dir/?api=1&destination=${ACCESS.lat},${ACCESS.lng}`;

/**
 * COMMENT VENIR — la vidéo du trajet (entrée du Centre Baha'i jusqu'à la salle),
 * l'adresse, les repères et le bouton d'itinéraire Google Maps.
 * La vidéo ne se charge et ne se lance qu'une fois visible à l'écran (sans le son).
 */
export function Access() {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  /* La source n'est attachée qu'à la première apparition : on lance alors la lecture. */
  useEffect(() => {
    if (visible) ref.current?.play().catch(() => {});
  }, [visible]);

  return (
    <section id="acces" className="v2-section scroll-mt-24" aria-label="Comment venir à la formation">
      <Container>
        <div className="v2-access">
          <div className="v2-access__text">
            <p className="v2-kicker is-red">Adresse</p>
            <Title as="h2" line1={ACCESS.line1} line2={ACCESS.line2} className="mt-3" />

            <Reveal y={24} className="v2-access__card">
              <span className="v2-access__pin" aria-hidden="true">
                <Icon icon={Location01Icon} size={22} strokeWidth={2} />
              </span>
              <div>
                <p className="v2-access__venue">{ACCESS.venue}</p>
                <p className="v2-access__area">{ACCESS.area}</p>
              </div>
            </Reveal>

            <Reveal as="div" y={24} delay={0.08}>
              <ol className="v2-access__steps">
                {ACCESS.steps.map((s, i) => (
                  <li key={s}>
                    <span aria-hidden="true">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal y={24} delay={0.12} className="v2-access__actions">
              <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer" className="v2-access__btn is-main">
                <Icon icon={Navigation03Icon} size={18} strokeWidth={2.2} />
                Itinéraire Google Maps
              </a>
              <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="v2-access__btn">
                <Icon icon={WhatsappIcon} size={18} strokeWidth={2} />
                Besoin d&apos;aide ? WhatsApp
              </a>
            </Reveal>
          </div>

          <Reveal y={32} className="v2-access__media">
            <div className="v2-access__phone">
              <video
                ref={ref}
                src={visible ? ACCESS.video : undefined}
                poster={ACCESS.poster}
                muted
                loop
                playsInline
                controls
                preload="none"
                aria-label="Vidéo du trajet : de l'entrée du Centre Baha'i de Calavi jusqu'à la salle de formation"
              />
              <span className="v2-access__badge" aria-hidden="true">
                <Icon icon={VolumeOffIcon} size={14} strokeWidth={2.2} />
                Vidéo du trajet
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
