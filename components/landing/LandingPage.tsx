import { MotionRoot, ScrollProgressBar } from "./primitives/ScrollEffects";
import { StickyCTA } from "./primitives/StickyCTA";
import { Gated, VideoGateProvider } from "./primitives/VideoGate";
import { Header } from "./sections/Header";
import { BeforeAfter } from "./v2/BeforeAfter";
import { BonusFan } from "./v2/BonusFan";
import { Faq } from "./v2/Faq";
import { FinalCta } from "./v2/FinalCta";
import { Footer } from "./v2/Footer";
import { ForWho } from "./v2/ForWho";
import { Hero } from "./v2/Hero";
import { Method } from "./v2/Method";
import { Price } from "./v2/Price";
import { ProgramTimeline } from "./v2/ProgramTimeline";
import { Proof } from "./v2/Proof";
import { Realisations } from "./v2/Realisations";
import { Specialties } from "./v2/Specialties";
import { Tools } from "./v2/Tools";
import { ZoomReveal } from "./v2/ZoomReveal";

/**
 * Landing page IA PRO 2026 — version 2, refaite façon motion.ghostdesignco.com :
 * fond uni clair, peu de texte, beaucoup d'animation.
 */
export function LandingPage() {
  return (
    <MotionRoot>
      <VideoGateProvider>
      <div className="lp-root v2-root">
        <a
          href="#contenu"
          className="sr-only z-[70] rounded-full bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <ScrollProgressBar />
        <Header />
        <main id="contenu">
          <Hero />
          <Gated>
            <ZoomReveal />
            <BeforeAfter />
            <Method />
            <Specialties />
            <ProgramTimeline />
            <Realisations />
            <Tools />
            <Proof />
            <ForWho />
            <BonusFan />
            <Price />
            <Faq />
            <FinalCta />
          </Gated>
        </main>
        <Gated>
          <Footer />
        </Gated>
        <StickyCTA />
      </div>
      </VideoGateProvider>
    </MotionRoot>
  );
}
