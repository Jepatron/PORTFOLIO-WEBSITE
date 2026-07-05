import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — Jep Parker",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-32 pb-24">

        <div className="max-w-3xl">
          <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">
            Contact
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-ink tracking-tightest leading-[0.94]">
            Let&apos;s talk.
          </h1>
          <p className="mt-8 font-body text-ink-dim leading-relaxed max-w-md">
            {/* Update this line with your own pitch */}
            For commissions, collaborations, or questions — reach out directly.
          </p>
        </div>

        <div className="mt-20 border-t border-ink/10" />

        <div className="mt-16 grid gap-12 md:grid-cols-2">

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Email</p>
            {/* Replace with your real email address */}
            <a
              href="mailto:you@example.com"
              data-cursor="hover"
              className="font-display text-2xl md:text-3xl text-ink tracking-tightest hover:text-accent transition-colors"
            >
              you@example.com
            </a>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Socials</p>
            <div className="flex flex-col gap-3">
              {/* Update the handle and URL */}
              <a
                href="https://instagram.com/jep_parker"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-body text-ink hover:text-accent transition-colors"
              >
                Instagram — @jep_parker
              </a>
              {/* Add more links here, e.g. LinkedIn, Vimeo */}
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
