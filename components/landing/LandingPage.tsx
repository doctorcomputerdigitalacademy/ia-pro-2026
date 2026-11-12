import { MotionRoot, ScrollProgressBar } from "./primitives/ScrollEffects";
import { StickyCTA } from "./primitives/StickyCTA";
import { Achievements } from "./sections/Achievements";
import { Audience } from "./sections/Audience";
import { Bonus } from "./sections/Bonus";
import { HowItWorks } from "./sections/HowItWorks";
import { FaqSection } from "./sections/FaqSection";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Pricing } from "./sections/Pricing";
import { Problem } from "./sections/Problem";
import { ProfessionalAI } from "./sections/ProfessionalAI";
import { Schedule } from "./sections/Schedule";
import { Solution } from "./sections/Solution";
import { Trust } from "./sections/Trust";
import { VisualAI } from "./sections/VisualAI";

/** Landing page IA PRO 2026 — Doctor Computer Digital Academy */
export function LandingPage() {
  return (
    <MotionRoot>
      <div className="lp-root">
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
          <Problem />
          <Solution />
          <ProfessionalAI />
          <VisualAI />
          <Achievements />
          <Trust />
          <Audience />
          <Bonus />
          <Pricing />
          <HowItWorks />
          <Schedule />
          <FaqSection />
          <FinalCta />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </MotionRoot>
  );
}
