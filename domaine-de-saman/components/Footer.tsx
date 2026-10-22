import { Link } from "@/i18n/navigation";
import LogoMark from "./LogoMark";
import type { SiteContent } from "@/content";

export default function Footer({
  site,
  contact,
  footer,
  nav,
  secondaryNav,
}: {
  site: SiteContent["site"];
  contact: SiteContent["contact"];
  footer: SiteContent["footer"];
  nav: SiteContent["nav"];
  secondaryNav: SiteContent["secondaryNav"];
}) {
  return (
    <footer className="border-t border-charcoal/10 bg-cream-deep">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-display text-xl text-forest">
              <LogoMark className="h-5 w-5 shrink-0" />
              {site.name}
            </p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.1em] text-brass">{footer.tagline}</p>
            <p className="mt-3 max-w-[22ch] font-body text-sm text-grey">
              {footer.locationNote}
            </p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              {footer.exploreLabel}
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
              {footer.nearbyLabel}
            </p>
            <p className="mt-3 font-body text-sm text-grey">{footer.activitiesNote}</p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              {footer.contactLabel}
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
