import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Slideshow from "@/components/Slideshow";
import Reveal from "@/components/Reveal";
import CTABanner from "@/components/CTABanner";
import { getContent, localizedPath, type Room, type StayOptionKey } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { stay } = getContent(locale);
  const title = `${stay.title} — ${stay.eyebrow}`;
  const description = stay.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/stay") },
    openGraph: { title, description, url: localizedPath(locale, "/stay") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Stay({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { stay, estate, slideshow, reserveLabel, ui } = content;

  const houses: {
    key: StayOptionKey;
    name: string;
    tagline: string;
    bedroomCount: number;
    sleeps: number;
    rooms: Room[];
    href: string;
  }[] = [
    { key: "villa", ...estate.villa, href: "/the-estate" },
    { key: "farmhouse", ...estate.farmhouse, href: "/the-farmhouse" },
  ];

  return (
    <main>
      <PageHero
        eyebrow={stay.eyebrow}
        title={stay.title}
        body={stay.heroBody}
        photoLabel={stay.heroPhotoLabel}
        tone="forest"
        primaryCta={{ label: reserveLabel, href: "/reserve" }}
      />

      <Reveal className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10 md:py-24">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">{stay.roomsHeading}</p>
        <p className="mt-5 font-display text-xl leading-relaxed text-forest md:text-2xl">{stay.intro}</p>
      </Reveal>

      {houses.map((house, h) => (
        <section
          key={house.key}
          className={`${h % 2 === 1 ? "bg-cream-deep" : ""} px-6 py-16 md:px-10 md:py-20`}
        >
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl text-forest md:text-4xl">{house.name}</h2>
                <p className="mt-2 font-body text-xs uppercase tracking-[0.15em] text-brass">
                  {stay.houseMeta
                    .replace("{bedrooms}", String(house.bedroomCount))
                    .replace("{sleeps}", String(house.sleeps))}
                </p>
                <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-grey">{house.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href={{ pathname: "/reserve", query: { stay: house.key } }}
                  className="inline-block rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg"
                >
                  {stay.reserveHouseCta}
                </Link>
                <Link
                  href={house.href}
                  className="font-body text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:text-brass/70"
                >
                  {stay.moreAboutHouse}
                </Link>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {house.rooms.map((room, i) => (
                <Reveal key={room.name} delay={(i % 3) * 0.08}>
                  <article>
                    <Slideshow slides={room.photos} labels={slideshow} tone={house.key === "farmhouse" ? "brass" : "cream"} />
                    <h3 className="mt-5 font-display text-2xl text-forest">{room.name}</h3>
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-body text-sm">
                      <dt className="text-xs uppercase tracking-[0.15em] leading-5 text-charcoal/50">{stay.roomMeta.beds}</dt>
                      <dd className="text-grey">{room.beds}</dd>
                      <dt className="text-xs uppercase tracking-[0.15em] leading-5 text-charcoal/50">{stay.roomMeta.sleeps}</dt>
                      <dd className="text-grey">{room.sleeps}</dd>
                      <dt className="text-xs uppercase tracking-[0.15em] leading-5 text-charcoal/50">{stay.roomMeta.bathroom}</dt>
                      <dd className="text-grey">{room.bathroom}</dd>
                    </dl>
                    <p className="mt-4 font-body text-sm leading-relaxed text-grey">{room.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-forest">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:items-center md:px-10 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-cream md:text-4xl">{stay.sharedHeading}</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-cream/80">{stay.sharedIntro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Slideshow
              slides={stay.sharedPhotos}
              labels={slideshow}
              tone="forest"
              aspect="aspect-[3/2]"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{stay.includesHeading}</h2>
          <ul className="mt-6 space-y-3">
            {stay.includes.map((item) => (
              <li key={item} className="flex gap-3 font-body text-sm leading-relaxed text-grey">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full border border-brass/30 bg-cream-deep p-8">
            <h2 className="font-display text-2xl text-forest">{stay.exclusiveHeading}</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-grey">{stay.exclusiveBody}</p>
            <Link
              href="/availability"
              className="mt-6 inline-block font-body text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:text-brass/70"
            >
              {stay.exclusiveCta} →
            </Link>
          </div>
        </Reveal>
      </section>

      <CTABanner heading={ui.defaultCtaHeading} body={ui.defaultCtaBody} ctaLabel={reserveLabel} href="/reserve" />
    </main>
  );
}
