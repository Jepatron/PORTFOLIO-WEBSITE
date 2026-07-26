import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import EnquiryForm from "@/components/EnquiryForm";
import { retreats } from "@/content/site";

export const metadata: Metadata = {
  title: "Retreats — Domaine de Saman",
  description: "A private yoga deck and gym/movement space for YTT schools and retreat organisers — bring your own instructor.",
};

export default function Retreats() {
  return (
    <main>
      <PhotoPlaceholder
        label="Yoga practice on the deck, mountain view at sunrise"
        tone="forest"
        aspect="aspect-[21/9]"
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <h1 className="font-display text-3xl text-forest md:text-4xl">Retreats</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-grey">{retreats.intro}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-8 md:grid-cols-2 md:px-10">
        <PhotoPlaceholder label={retreats.yogaDeck.photoLabel} tone="cream" aspect="aspect-[4/3]" />
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-2xl text-forest">Yoga deck</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.yogaDeck.body}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-2 md:px-10">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <h2 className="font-display text-2xl text-forest">Gym / movement space</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.gym.body}</p>
        </div>
        <PhotoPlaceholder label={retreats.gym.photoLabel} tone="cream" aspect="aspect-[4/3]" className="order-1 md:order-2" />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="border-l-2 border-brass/60 bg-cream-deep px-6 py-5">
          <p className="font-body text-sm leading-relaxed text-charcoal/70">{retreats.disclaimer}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-2 md:px-10">
        <div>
          <h3 className="font-display text-xl text-forest">Self-catering</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.selfCatering}</p>
        </div>
        <div>
          <h3 className="font-display text-xl text-forest">Group rates</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.groupRates}</p>
        </div>
      </section>

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl text-forest">Enquire about your retreat</h2>
          <p className="mt-2 font-body text-sm text-grey">
            Tell us your dates and group size and we'll confirm availability and rates.
          </p>
          <div className="mt-8">
            <EnquiryForm defaultPurpose="retreat" />
          </div>
        </div>
      </section>
    </main>
  );
}
