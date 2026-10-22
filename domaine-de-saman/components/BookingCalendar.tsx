"use client";

import { useEffect, useMemo, useState } from "react";
import type { SiteContent } from "@/content";

// Dates are handled as plain "YYYY-MM-DD" keys throughout, so a stay never
// shifts by a day because of the visitor's timezone.
export type DateKey = string;

const pad = (n: number) => String(n).padStart(2, "0");
export const toKey = (y: number, m: number, d: number): DateKey => `${y}-${pad(m + 1)}-${pad(d)}`;

function fromKey(key: DateKey) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function addDays(key: DateKey, days: number): DateKey {
  const date = fromKey(key);
  date.setUTCDate(date.getUTCDate() + days);
  return toKey(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function nightsBetween(from: DateKey, to: DateKey) {
  return Math.round((fromKey(to).getTime() - fromKey(from).getTime()) / 86_400_000);
}

export function formatDate(key: DateKey, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(fromKey(key));
}

function localToday(): DateKey {
  const now = new Date();
  return toKey(now.getFullYear(), now.getMonth(), now.getDate());
}

// A night is blocked when it falls inside a booked range (check-in
// inclusive, check-out exclusive) — so a new stay may start on the day a
// previous one ends.
function isNightBlocked(night: DateKey, blocked: { from: string; to: string }[]) {
  return blocked.some((b) => night >= b.from && night < b.to);
}

export default function BookingCalendar({
  locale,
  checkIn,
  checkOut,
  onChange,
  minNights,
  blocked,
  labels,
}: {
  locale: string;
  checkIn: DateKey | null;
  checkOut: DateKey | null;
  onChange: (range: { checkIn: DateKey | null; checkOut: DateKey | null }) => void;
  minNights: number;
  blocked: { from: string; to: string }[];
  labels: SiteContent["reserve"]["calendar"];
}) {
  // "Today" is only known on the client — rendering the grid before mount
  // would risk a server/client mismatch around midnight or across timezones.
  const [today, setToday] = useState<DateKey | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [hover, setHover] = useState<DateKey | null>(null);

  useEffect(() => {
    const t = localToday();
    setToday(t);
    const start = checkIn ?? t;
    setView({ y: Number(start.slice(0, 4)), m: Number(start.slice(5, 7)) - 1 });
    // Only on mount — later navigation is the visitor's.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
    // 2024-01-01 was a Monday — weeks start on Monday across all three locales.
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 1 + i))));
  }, [locale]);

  if (!today || !view) {
    return <div className="h-[22rem]" aria-hidden="true" />;
  }

  const atFirstMonth = view.y === Number(today.slice(0, 4)) && view.m === Number(today.slice(5, 7)) - 1;
  const shift = (delta: number) => {
    const d = new Date(Date.UTC(view.y, view.m + delta, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };

  // Valid check-out: at least `minNights` after check-in, with every night
  // in between free.
  function validCheckOut(key: DateKey) {
    if (!checkIn || key <= checkIn) return false;
    if (nightsBetween(checkIn, key) < minNights) return false;
    for (let n = checkIn; n < key; n = addDays(n, 1)) {
      if (isNightBlocked(n, blocked)) return false;
    }
    return true;
  }
  const validCheckIn = (key: DateKey) => key >= today! && !isNightBlocked(key, blocked);
  const choosingCheckOut = checkIn !== null && checkOut === null;

  function select(key: DateKey) {
    if (choosingCheckOut && validCheckOut(key)) {
      onChange({ checkIn, checkOut: key });
    } else if (validCheckIn(key)) {
      onChange({ checkIn: key, checkOut: null });
    }
  }

  const rangeEnd = checkOut ?? (choosingCheckOut && hover && validCheckOut(hover) ? hover : null);

  const months = [0, 1].map((offset) => {
    const first = new Date(Date.UTC(view.y, view.m + offset, 1));
    const y = first.getUTCFullYear();
    const m = first.getUTCMonth();
    const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    const lead = (first.getUTCDay() + 6) % 7; // Monday-first offset
    const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(first);
    return { y, m, daysInMonth, lead, title, offset };
  });

  return (
    <div>
      <div className="grid gap-10 md:grid-cols-2">
        {months.map(({ y, m, daysInMonth, lead, title, offset }) => (
          <div key={`${y}-${m}`} className={offset === 1 ? "hidden md:block" : ""}>
            <div className="mb-4 flex h-9 items-center justify-between">
              <button
                type="button"
                onClick={() => shift(-1)}
                disabled={atFirstMonth}
                aria-label={labels.previousMonth}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-forest transition-colors hover:border-forest disabled:opacity-25 disabled:hover:border-charcoal/15 ${offset === 1 ? "md:invisible" : ""}`}
              >
                ‹
              </button>
              <p className="font-display text-lg capitalize text-forest">{title}</p>
              <button
                type="button"
                onClick={() => shift(1)}
                aria-label={labels.nextMonth}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-forest transition-colors hover:border-forest ${offset === 0 ? "md:invisible" : ""}`}
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 text-center">
              {weekdays.map((w) => (
                <span key={w} className="pb-2 font-body text-[10px] uppercase tracking-[0.15em] text-charcoal/45">
                  {w}
                </span>
              ))}
              {Array.from({ length: lead }, (_, i) => (
                <span key={`lead-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const key = toKey(y, m, i + 1);
                const isStart = key === checkIn;
                const isEnd = key === rangeEnd;
                const inRange = checkIn && rangeEnd && key > checkIn && key < rangeEnd;
                const past = key < today;
                const blockedNight = isNightBlocked(key, blocked);
                // Inside the minimum-stay window after a chosen check-in.
                const tooShort =
                  choosingCheckOut && key > checkIn! && nightsBetween(checkIn!, key) < minNights && !blockedNight;
                // While choosing check-out, any other free date restarts the
                // selection — except the too-short window, which is disabled.
                const selectable = choosingCheckOut
                  ? validCheckOut(key) || (validCheckIn(key) && !tooShort)
                  : validCheckIn(key);

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!selectable}
                    onClick={() => select(key)}
                    onMouseEnter={() => setHover(key)}
                    onMouseLeave={() => setHover(null)}
                    aria-pressed={isStart || isEnd}
                    aria-label={`${formatDate(key, locale)}${blockedNight && !past ? ` — ${labels.unavailable}` : ""}`}
                    className={`relative my-0.5 flex h-10 items-center justify-center font-body text-sm transition-colors
                      ${inRange ? "bg-forest/10" : ""}
                      ${isStart && rangeEnd ? "rounded-l-full bg-forest/10" : ""}
                      ${isEnd ? "rounded-r-full bg-forest/10" : ""}
                      ${!selectable ? "cursor-default" : ""}
                      ${past ? "text-charcoal/20" : blockedNight ? "text-charcoal/30 line-through" : tooShort ? "text-charcoal/30" : "text-charcoal"}`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isStart || isEnd
                          ? "bg-forest text-cream"
                          : selectable
                            ? "hover:border hover:border-forest"
                            : ""
                      }`}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/10 pt-4 font-body text-xs text-grey">
        <p aria-live="polite">
          {checkIn && checkOut
            ? labels.nights.replace("{n}", String(nightsBetween(checkIn, checkOut)))
            : checkIn
              ? labels.selectCheckOut
              : labels.selectCheckIn}
          <span className="ml-3 text-charcoal/40">{labels.minNights.replace("{n}", String(minNights))}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-charcoal/40">
            <span className="line-through">12</span> {labels.unavailable}
          </span>
          {checkIn && (
            <button
              type="button"
              onClick={() => onChange({ checkIn: null, checkOut: null })}
              className="uppercase tracking-[0.15em] text-brass underline-offset-4 hover:underline"
            >
              {labels.clear}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
