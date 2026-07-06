import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "About — Jep Parker" };

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-12 pt-36 pb-28">

        <div className="max-w-4xl">
          <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-14">About</p>
          <h1 className="font-display text-6xl md:text-8xl text-ink tracking-tightest leading-[0.9]">
            Journalist &amp;<br />filmmaker.
          </h1>
          <p className="mt-12 font-body text-ink-dim leading-relaxed max-w-2xl text-base">
            Jep Parker is a journalism student in Amsterdam, currently on placement at Het Parool. He works across written reportage, documentary film, and long-form photography — always with the same question underneath: what does this feel like from the inside?
          </p>
          <p className="mt-5 font-body text-ink-dim leading-relaxed max-w-2xl text-base">
            Before journalism, he spent two years making short documentaries independently. That way of looking — slow, close, without commentary — still runs through everything he writes.
          </p>
        </div>

        <div className="mt-28 border-t border-ink/10" />

        <div className="mt-20 grid gap-16 md:grid-cols-3">

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Focus</p>
            <ul className="space-y-3 font-body text-ink">
              <li>Documentary film</li>
              <li>Written reportage</li>
              <li>Long-form photography</li>
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Currently</p>
            <ul className="space-y-3 font-body text-ink">
              <li>Hogeschool Utrecht — Journalism</li>
              <li>Het Parool — placement</li>
              <li>Amsterdam</li>
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Published in</p>
            <ul className="space-y-3 font-body text-ink">
              <li>Het Parool</li>
              <li>Focus Magazine</li>
            </ul>
          </div>

        </div>

        <div className="mt-28 border-t border-ink/10 pt-14">
          <Link
            href="/contact"
            className="font-display text-3xl md:text-5xl text-ink tracking-tightest hover:text-accent transition-colors duration-300"
          >
            Get in touch →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
