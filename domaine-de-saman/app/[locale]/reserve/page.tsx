import type { Metadata } from "next";
import ReserveFlow from "@/components/ReserveFlow";
import { getContent, localizedPath, type StayOptionKey } from "@/content";
import { booking, stayOptionKeys } from "@/content/booking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { reserve } = getContent(locale);
  const title = reserve.title;
  const description = reserve.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/reserve") },
    openGraph: { title, description, url: localizedPath(locale, "/reserve") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Reserve({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ stay?: string }>;
}) {
  const { locale } = await params;
  const { stay: requested } = await searchParams;
  const content = getContent(locale);
  const { reserve, estate, stay, slideshow, enquiryForm, contact } = content;

  // ?stay=villa etc. preselects an option (links from /stay); anything
  // unknown falls back to the whole estate.
  const initialStay: StayOptionKey = stayOptionKeys.includes(requested as StayOptionKey)
    ? (requested as StayOptionKey)
    : "estate";

  const villa = { name: estate.villa.name, rooms: estate.villa.rooms };
  const farmhouse = { name: estate.farmhouse.name, rooms: estate.farmhouse.rooms };

  return (
    <main className="px-6 pb-24 pt-32 md:px-10 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">{reserve.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] tracking-tight text-forest md:text-5xl">
            {reserve.title}
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-grey">{reserve.intro}</p>
        </header>

        <div className="mt-14">
          <ReserveFlow
            locale={locale}
            initialStay={initialStay}
            booking={booking}
            t={reserve}
            slideshow={slideshow}
            optionOrder={stayOptionKeys}
            houses={{ estate: [villa, farmhouse], villa: [villa], farmhouse: [farmhouse] }}
            bedroomCounts={{
              estate: estate.bedroomCount,
              villa: estate.villa.bedroomCount,
              farmhouse: estate.farmhouse.bedroomCount,
            }}
            roomLabels={stay.roomMeta}
            houseMeta={stay.houseMeta}
            purposes={enquiryForm.purposes}
            contact={contact}
          />
        </div>
      </div>
    </main>
  );
}
