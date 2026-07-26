import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { weddings } from "@/content/site";

export const metadata: Metadata = {
  title: "Weddings — Domaine de Saman",
  description: "An intimate, private wedding setting in the Pyrenees — exclusive use of the house and grounds.",
};

export default function Weddings() {
  return (
    <main>
      <PageHero
        eyebrow="Weddings"
        title="An intimate wedding, entirely private."
        body={weddings.intro}
        photoLabel="Wedding party on the lawn at golden hour, estate house behind"
        tone="brass"
        primaryCta={{ label: "Enquire about your date", href: "#enquire" }}
        secondaryCta={{ label: "See the estate", href: "/the-estate" }}
      />

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:px-10">
        <PhotoPlaceholder label={weddings.ceremony.photoLabel} tone="cream" aspect="aspect-[4/3]" />
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-2xl text-forest">Ceremony &amp; grounds</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.ceremony.body}</p>
        </div>
      </Reveal>

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-3 md:px-10">
        <div>
          <h3 className="font-display text-xl text-forest">Capacity</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.capacity}</p>
        </div>
        <div>
          <h3 className="font-display text-xl text-forest">Catering</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.catering}</p>
        </div>
        <div>
          <h3 className="font-display text-xl text-forest">Noise &amp; curfew</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.noise}</p>
        </div>
      </Reveal>

      <ImmersiveBreak label="Table setting for an outdoor wedding dinner, string lights overhead" tone="brass" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="border-l-2 border-brass/60 bg-cream-deep px-6 py-5">
          <p className="font-body text-sm leading-relaxed text-charcoal/70">{weddings.approachNote}</p>
        </div>
      </section>

      <section id="enquire" className="bg-cream-deep">
        <Reveal className="mx-auto max-w-2xl px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl text-forest">Enquire about your date</h2>
          <p className="mt-2 font-body text-sm text-grey">
            Tell us your dates and rough guest numbers and we'll get back to you.
          </p>
          <div className="mt-8">
            <EnquiryForm defaultPurpose="wedding" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
