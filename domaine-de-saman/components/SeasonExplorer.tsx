"use client";

import { useState } from "react";
import type { Activity, Season, SiteContent } from "@/content";

const SEASONS: Season[] = ["Spring", "Summer", "Autumn", "Winter"];

function ActivityCard({
  activity,
  seasonLabels,
  openInGoogleMaps,
}: {
  activity: Activity;
  seasonLabels: Record<Season, string>;
  openInGoogleMaps: string;
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${activity.lat},${activity.lng}`;
  return (
    <div className="border border-charcoal/10 p-6 transition-shadow duration-300 hover:shadow-lg">
      <h4 className="font-display text-lg text-forest">{activity.name}</h4>
      <p className="mt-2 font-body text-sm leading-relaxed text-grey">{activity.description}</p>
      <p className="mt-3 font-body text-xs uppercase tracking-[0.1em] text-brass">{activity.distance}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {activity.seasons.map((season) => (
          <span
            key={season}
            className="rounded-full border border-charcoal/15 px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.08em] text-charcoal/60"
          >
            {seasonLabels[season]}
          </span>
        ))}
      </div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-block font-body text-xs uppercase tracking-[0.12em] text-charcoal/50 underline-offset-4 transition-colors hover:text-forest hover:underline"
      >
        {openInGoogleMaps}
      </a>
    </div>
  );
}

export default function SeasonExplorer({
  activities,
  seasonLabels,
  allSeasonsLabel,
  filterAriaLabel,
  openInGoogleMaps,
}: {
  activities: Activity[];
  seasonLabels: SiteContent["seasonLabels"];
  allSeasonsLabel: string;
  filterAriaLabel: string;
  openInGoogleMaps: string;
}) {
  const [selected, setSelected] = useState<Season | null>(null);

  function toggle(season: Season) {
    setSelected((current) => (current === season ? null : season));
  }

  const filtered = selected ? activities.filter((a) => a.seasons.includes(selected)) : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={filterAriaLabel}>
        {SEASONS.map((season) => (
          <button
            key={season}
            type="button"
            onClick={() => toggle(season)}
            aria-pressed={selected === season}
            className={`rounded-full border px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
              selected === season
                ? "border-forest bg-forest text-cream"
                : "border-charcoal/20 text-charcoal/70 hover:border-forest/50 hover:text-forest"
            }`}
          >
            {seasonLabels[season]}
          </button>
        ))}
        {selected && (
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="rounded-full border border-charcoal/20 px-4 py-2 font-body text-xs uppercase tracking-[0.15em] text-charcoal/70 transition-colors hover:border-forest/50 hover:text-forest"
          >
            {allSeasonsLabel}
          </button>
        )}
      </div>

      {filtered ? (
        <div
          key={selected}
          className="animate-filter-fade-in mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((activity) => (
            <ActivityCard
              key={activity.name}
              activity={activity}
              seasonLabels={seasonLabels}
              openInGoogleMaps={openInGoogleMaps}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {SEASONS.map((season) => {
            const inSeason = activities.filter((a) => a.seasons.includes(season));
            if (inSeason.length === 0) return null;
            return (
              <div key={season}>
                <h3 className="font-display text-lg text-forest">{seasonLabels[season]}</h3>
                <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {inSeason.map((activity) => (
                    <ActivityCard
                      key={activity.name}
                      activity={activity}
                      seasonLabels={seasonLabels}
                      openInGoogleMaps={openInGoogleMaps}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
