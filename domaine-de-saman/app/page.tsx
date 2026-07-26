import HomeHero from "@/components/HomeHero";
import AudienceCards from "@/components/AudienceCards";
import HighlightsStrip from "@/components/HighlightsStrip";
import HowItWorks from "@/components/HowItWorks";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <Reveal className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10">
        <p className="font-body text-base leading-relaxed text-grey">{site.intro}</p>
      </Reveal>
      <AudienceCards />
      <HighlightsStrip />
      <HowItWorks />
      <CTABanner />
    </main>
  );
}
