import { howItWorks } from "@/content/site";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-brass">How it works</p>
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        {howItWorks.map((step) => (
          <div key={step.step}>
            <p className="font-display text-sm text-charcoal/40">{step.step}</p>
            <h3 className="mt-2 font-display text-2xl text-forest md:text-3xl">{step.title}</h3>
            <p className="mt-4 font-body text-sm leading-relaxed text-grey">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
