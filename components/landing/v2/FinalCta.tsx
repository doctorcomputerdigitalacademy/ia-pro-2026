"use client";

import { motion } from "motion/react";
import { CTA } from "@/lib/landing/content.fr";
import { FINAL2 } from "@/lib/landing/content.v2";
import { CTAButton } from "../primitives/CTAButton";
import { Container } from "../primitives/SectionHead";
import { Title } from "./Title";

/** DERNIER APPEL — titre en deux tons, trait en pointillés qui se dessine jusqu'au bouton. */
export function FinalCta() {
  return (
    <section id="inscription" className="v2-section v2-final scroll-mt-24">
      <Container className="text-center">
        <Title line1={FINAL2.line1} line2={FINAL2.line2} className="mx-auto max-w-[860px]" />
        <div className="relative mt-10 flex justify-center">
          <svg className="v2-final__line" viewBox="0 0 400 80" fill="none" aria-hidden="true">
            <motion.path
              d="M4 70 C 80 70, 90 20, 160 30 S 260 70, 330 40"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <circle cx="4" cy="70" r="5" />
          </svg>
          <div className="relative">
            <CTAButton label={CTA.final} pulse />
          </div>
        </div>
        <p className="mt-4 text-[14px] text-ink-soft">{FINAL2.note}</p>
      </Container>
    </section>
  );
}
