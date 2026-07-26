import Link from "next/link";
import { site, contact, footer, nav, secondaryNav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-cream-deep">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-xl text-forest">{site.name}</p>
            <p className="mt-3 max-w-[22ch] font-body text-sm text-grey">
              {footer.locationNote}
            </p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              Explore
            </p>
            <ul className="mt-3 space-y-2">
              {[...nav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-charcoal/80 hover:text-forest">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              Nearby
            </p>
            <p className="mt-3 font-body text-sm text-grey">{footer.activitiesNote}</p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              Contact
            </p>
            <a href={`mailto:${contact.email}`} className="mt-3 block font-body text-sm text-charcoal/80 hover:text-forest">
              {contact.email}
            </a>
            <Link href="/privacy" className="mt-2 block font-body text-sm text-charcoal/80 hover:text-forest">
              {footer.privacyNote}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-charcoal/10 pt-6 font-body text-xs text-grey md:flex-row md:items-center md:justify-between">
          <p>{footer.registrationNote}</p>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
