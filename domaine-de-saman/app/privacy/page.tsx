import type { Metadata } from "next";
import { privacyPolicy } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy — Domaine de Saman",
  description: "How Domaine de Saman handles enquiry data.",
};

export default function Privacy() {
  return (
    <main>
      <section className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <h1 className="font-display text-3xl text-forest">Privacy</h1>
        <p className="mt-6 font-body text-sm leading-relaxed text-grey">{privacyPolicy.intro}</p>
        <ul className="mt-6 space-y-4">
          {privacyPolicy.points.map((point) => (
            <li key={point} className="font-body text-sm leading-relaxed text-grey">
              — {point}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
