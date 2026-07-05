import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact — Jep Parker" };

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-12 pt-36 pb-28">

        <div className="max-w-4xl">
          <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-14">Contact</p>
          <h1 className="font-display text-6xl md:text-8xl text-ink tracking-tightest leading-[0.9]">
            Let&apos;s talk.
          </h1>
          <p className="mt-12 font-body text-ink-dim leading-relaxed max-w-lg text-base">
            For commissions, collaborations, or questions — reach out directly.
          </p>
        </div>

        <div className="mt-28 border-t border-ink/10" />

        <div className="mt-20 grid gap-16 md:grid-cols-2">

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-8">Email</p>
            <a
              href="mailto:Jepvanzomeren@gmail.com"
              className="font-display text-3xl md:text-4xl text-ink tracking-tightest hover:text-accent transition-colors duration-300 break-all"
            >
              Jepvanzomeren@gmail.com
            </a>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-8">Socials</p>
            <div className="flex flex-col gap-4">
              <a
                href="https://instagram.com/jep_parker"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-ink hover:text-accent transition-colors duration-300"
              >
                Instagram — @jep_parker
              </a>
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
