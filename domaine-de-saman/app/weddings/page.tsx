import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import EnquiryForm from "@/components/EnquiryForm";
import { weddings } from "@/content/site";

export const metadata: Metadata = {
  title: "Weddings — Domaine de Saman",
  description: "An intimate, private wedding setting in the Pyrenees — exclusive use of the house and grounds.",
};

export default function Weddings() {
  return (
    <main>
      <PhotoPlaceholder
        label="Wedding party on the lawn at golden hour, estate house behind"
        tone="brass"
        aspect="aspect-[21/9]"
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <h1 className="font-display text-3xl text-forest md:text-4xl">Weddings</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-grey">{weddings.intro}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-2 md:px-10">
        <PhotoPlaceholder label={weddings.ceremony.photoLabel} tone="cream" aspect="aspect-[4/3]" />
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-2xl text-forest">Ceremony &amp; grounds</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.ceremony.body}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-3 md:px-10">
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
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="border-l-2 border-brass/60 bg-cream-deep px-6 py-5">
          <p className="font-body text-sm leading-relaxed text-charcoal/70">{weddings.approachNote}</p>
        </div>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl text-forest">Enquire about your date</h2>
          <p className="mt-2 font-body text-sm text-grey">
            Tell us your dates and rough guest numbers and we'll get back to you.
          </p>
          <div className="mt-8">
            <EnquiryForm defaultPurpose="wedding" />
          </div>
        </div>
      </section>
    </main>
  );
}
