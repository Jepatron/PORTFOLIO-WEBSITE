import type { SiteContent } from "@/content";

export default function FAQ({ faqs }: { faqs: SiteContent["faqs"] }) {
  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {faqs.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-forest">
            {item.q}
            <span className="ml-4 font-body text-xl text-brass transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-grey">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
