"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Activity, SiteContent } from "@/content";

// Raw Leaflet (not react-leaflet) loaded dynamically inside useEffect —
// keeps this entirely client-side and sidesteps react-leaflet's React 19
// peer-dependency gap. Custom DivIcon markers avoid the classic
// broken-default-marker-icon issue Leaflet has in bundled apps.
function markerIcon(L: typeof import("leaflet"), tone: "forest" | "brass", size: number) {
  const color = tone === "forest" ? "#2F4A3D" : "#9C7A3C";
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:${size}px;
      height:${size}px;
      border-radius:9999px;
      background:${color};
      border:2px solid #FAF7F0;
      box-shadow:0 1px 3px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

export default function RegionMap({
  activities,
  estateLocation,
  siteName,
  mapAriaLabel,
  mapPopupNote,
  mapLegendActivities,
  openInGoogleMaps,
}: {
  activities: Activity[];
  estateLocation: SiteContent["estateLocation"];
  siteName: string;
  mapAriaLabel: string;
  mapPopupNote: string;
  mapLegendActivities: string;
  openInGoogleMaps: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18,
      }).addTo(map);

      const estateMarker = L.marker([estateLocation.lat, estateLocation.lng], {
        icon: markerIcon(L, "forest", 18),
      })
        .addTo(map)
        .bindPopup(`<strong>${siteName}</strong><br/>${mapPopupNote}`);

      const activityMarkers = activities.map((a) => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`;
        return L.marker([a.lat, a.lng], { icon: markerIcon(L, "brass", 13) })
          .addTo(map!)
          .bindPopup(
            `<strong>${a.name}</strong><br/>${a.description}<br/><em>${a.distance}</em><br/><a href="${mapsUrl}" target="_blank" rel="noopener">${openInGoogleMaps}</a>`
          );
      });

      const group = L.featureGroup([estateMarker, ...activityMarkers]);
      map.fitBounds(group.getBounds(), { padding: [32, 32] });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [activities, estateLocation, siteName, mapPopupNote, openInGoogleMaps]);

  return (
    <div>
      <div
        ref={containerRef}
        className="h-[420px] w-full border border-charcoal/10 md:h-[520px]"
        role="img"
        aria-label={mapAriaLabel}
      />
      <div className="mt-3 flex items-center gap-5 font-body text-xs text-charcoal/60">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border border-cream bg-forest" />
          {siteName}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-cream bg-brass" />
          {mapLegendActivities}
        </span>
      </div>
    </div>
  );
}
