"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import BookingCalendar, { formatDate, nightsBetween, type DateKey } from "./BookingCalendar";
import Slideshow from "./Slideshow";
import PhotoPlaceholder from "./PhotoPlaceholder";
import type { Room, SiteContent, StayOptionKey } from "@/content";

type BookingConfig = {
  minNights: number;
  options: Record<StayOptionKey, { bookable: boolean; maxGuests: number }>;
  blocked: { from: string; to: string }[];
};

type HouseRooms = { name: string; rooms: Room[] };

const inputClass =
  "rounded-sm border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow placeholder:text-charcoal/30 focus:border-forest focus:shadow-[0_0_0_3px_rgba(47,74,61,0.15)]";
const labelClass = "font-body text-xs uppercase tracking-[0.15em] text-charcoal/60";

export default function ReserveFlow({
  locale,
  initialStay,
  booking,
  t,
  slideshow,
  optionOrder,
  houses,
  bedroomCounts,
  roomLabels,
  houseMeta,
  purposes,
  contact,
}: {
  locale: string;
  initialStay: StayOptionKey;
  booking: BookingConfig;
  t: SiteContent["reserve"];
  slideshow: SiteContent["slideshow"];
  optionOrder: StayOptionKey[];
  /** Rooms shown for each option — the estate lists both houses. */
  houses: Record<StayOptionKey, HouseRooms[]>;
  bedroomCounts: Record<StayOptionKey, number>;
  roomLabels: SiteContent["stay"]["roomMeta"];
  /** Template: {bedrooms} {sleeps} */
  houseMeta: string;
  purposes: SiteContent["enquiryForm"]["purposes"];
  contact: SiteContent["contact"];
}) {
  const [stay, setStay] = useState<StayOptionKey>(initialStay);
  const [range, setRange] = useState<{ checkIn: DateKey | null; checkOut: DateKey | null }>({
    checkIn: null,
    checkOut: null,
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [purpose, setPurpose] = useState(purposes[0]?.value ?? "");
  const [status, setStatus] = useState<"idle" | "incomplete" | "sending" | "sent" | "error">("idle");

  const option = t.options[stay];
  const config = booking.options[stay];
  const maxGuests = config.maxGuests;
  const nights = range.checkIn && range.checkOut ? nightsBetween(range.checkIn, range.checkOut) : null;

  function chooseStay(key: StayOptionKey) {
    setStay(key);
    // Keep the party within the new option's limit.
    const max = booking.options[key].maxGuests;
    const nextAdults = Math.min(adults, max);
    setAdults(nextAdults);
    setChildren(Math.min(children, max - nextAdults));
    if (status === "incomplete") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!config.bookable || !range.checkIn || !range.checkOut) {
      setStatus("incomplete");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("stay", option.name);
    data.set("checkIn", range.checkIn);
    data.set("checkOut", range.checkOut);
    data.set("nights", String(nights));
    data.set("adults", String(adults));
    data.set("children", String(children));
    data.set("purpose", purpose);

    // Same delivery as EnquiryForm: Formspree when contact.formEndpoint is
    // set, otherwise a pre-filled email draft. A real booking backend would
    // replace only this block.
    if (!contact.formEndpoint) {
      const name = String(data.get("name") ?? "");
      const subject = encodeURIComponent(`Reservation request — ${option.name} — ${range.checkIn} → ${range.checkOut} — ${name}`);
      const body = encodeURIComponent(
        [
          `Stay: ${option.name}`,
          `Check-in: ${range.checkIn}`,
          `Check-out: ${range.checkOut}`,
          `Nights: ${nights}`,
          `Guests: ${adults} adults, ${children} children`,
          `Purpose: ${purpose}`,
          `Name: ${name}`,
          `Email: ${data.get("email") ?? ""}`,
          `Phone: ${data.get("phone") ?? ""}`,
          "",
          String(data.get("message") ?? ""),
        ].join("\n")
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const guestSummary = t.summary.guestsValue
    .replace("{adults}", String(adults))
    .replace("{children}", String(children));
  const dateSummary =
    range.checkIn && range.checkOut
      ? `${formatDate(range.checkIn, locale)} → ${formatDate(range.checkOut, locale)}`
      : range.checkIn
        ? `${formatDate(range.checkIn, locale)} → …`
        : t.summary.notSelected;

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <div className="min-w-0 space-y-14">
        {/* 1 — Stay */}
        <Step n={1} title={t.stepStay}>
          <div className="grid gap-4 md:grid-cols-3" role="radiogroup" aria-label={t.stepStay}>
            {optionOrder.map((key) => {
              const o = t.options[key];
              const selected = key === stay;
              const bookable = booking.options[key].bookable;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => chooseStay(key)}
                  className={`group flex flex-col overflow-hidden border text-left transition-all ${
                    selected ? "border-forest shadow-[0_0_0_1px_theme(colors.forest)]" : "border-charcoal/15 hover:border-forest/50"
                  }`}
                >
                  <div className="relative">
                    <PhotoPlaceholder label={o.photos[0]} tone={key === "farmhouse" ? "brass" : "cream"} aspect="aspect-[3/2]" />
                    {!bookable && (
                      <span className="absolute left-3 top-3 rounded-full bg-cream px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.15em] text-brass">
                        {t.comingSoon}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 bg-cream p-4">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-lg text-forest">{o.name}</span>
                      <span
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 rounded-full border ${selected ? "border-[5px] border-forest" : "border-charcoal/30"}`}
                      />
                    </span>
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-brass">
                      {houseMeta
                        .replace("{bedrooms}", String(bedroomCounts[key]))
                        .replace("{sleeps}", String(booking.options[key].maxGuests))}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {!config.bookable && (
            <p className="mt-4 border border-brass/30 bg-brass/[0.08] px-4 py-3 font-body text-sm leading-relaxed text-brass">
              {t.unavailableNote}
            </p>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-start">
            <Slideshow
              key={stay}
              slides={option.photos}
              labels={slideshow}
              tone={stay === "farmhouse" ? "brass" : "forest"}
              aspect="aspect-[3/2]"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
            <div>
              <h3 className="font-display text-2xl text-forest">{option.name}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-grey">{option.summary}</p>
            </div>
          </div>

          <details className="group mt-6 border-t border-charcoal/10">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-body text-xs uppercase tracking-[0.15em] text-forest">
              {t.roomsInThisStay} ({bedroomCounts[stay]})
              <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="space-y-8 pb-4">
              {houses[stay].map((house) => (
                <div key={house.name}>
                  {houses[stay].length > 1 && (
                    <p className="mb-4 font-body text-xs uppercase tracking-[0.15em] text-brass">{house.name}</p>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {house.rooms.map((room) => (
                      <div key={room.name} className="grid grid-cols-[7rem_1fr] gap-4">
                        <Slideshow slides={room.photos} labels={slideshow} aspect="aspect-square" sizes="112px" compact />
                        <div className="min-w-0">
                          <p className="font-display text-lg text-forest">{room.name}</p>
                          <p className="mt-1 font-body text-xs text-grey">
                            {roomLabels.beds}: {room.beds}
                          </p>
                          <p className="font-body text-xs text-grey">
                            {roomLabels.sleeps}: {room.sleeps} · {roomLabels.bathroom}: {room.bathroom}
                          </p>
                          <p className="mt-2 font-body text-xs leading-relaxed text-charcoal/50">{room.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </Step>

        {/* 2 — Dates */}
        <Step n={2} title={t.stepDates}>
          <BookingCalendar
            locale={locale}
            checkIn={range.checkIn}
            checkOut={range.checkOut}
            onChange={(r) => {
              setRange(r);
              if (status === "incomplete") setStatus("idle");
            }}
            minNights={booking.minNights}
            blocked={booking.blocked}
            labels={t.calendar}
          />
        </Step>

        {/* 3 — Guests */}
        <Step n={3} title={t.stepGuests}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Counter
              label={t.guests.adults}
              hint={t.guests.adultsHint}
              value={adults}
              min={1}
              max={maxGuests - children}
              onChange={setAdults}
              decrease={t.guests.decrease}
              increase={t.guests.increase}
            />
            <Counter
              label={t.guests.children}
              hint={t.guests.childrenHint}
              value={children}
              min={0}
              max={maxGuests - adults}
              onChange={setChildren}
              decrease={t.guests.decrease}
              increase={t.guests.increase}
            />
          </div>
          <p className="mt-3 font-body text-xs text-charcoal/50">{t.guests.max.replace("{n}", String(maxGuests))}</p>
        </Step>

        {/* 4 — Details */}
        <Step n={4} title={t.stepDetails}>
          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>{t.form.name}</span>
                <input required name="name" type="text" autoComplete="name" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>{t.form.email}</span>
                <input required name="email" type="email" autoComplete="email" className={inputClass} />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>{t.form.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
            </label>

            <div className="flex flex-col gap-2">
              <span className={labelClass}>{t.form.purpose}</span>
              <div className="flex flex-wrap gap-2">
                {purposes.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPurpose(p.value)}
                    aria-pressed={purpose === p.value}
                    className={`rounded-full border px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                      purpose === p.value
                        ? "border-forest bg-forest text-cream"
                        : "border-charcoal/20 text-charcoal/70 hover:border-forest/50 hover:text-forest"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>{t.form.message}</span>
              <textarea name="message" rows={4} placeholder={t.form.messagePlaceholder} className={inputClass} />
            </label>

            <div className="grid gap-px border border-charcoal/10 bg-charcoal/10 md:grid-cols-2">
              <PolicyList heading={t.rulesHeading} items={t.houseRules} />
              <PolicyList heading={t.termsHeading} items={t.terms} />
            </div>

            <label className="flex items-start gap-3 font-body text-sm text-charcoal/80">
              <input required type="checkbox" name="agreedToRules" className="mt-0.5 h-4 w-4 accent-forest" />
              {t.form.agreeRules}
            </label>
          </div>
        </Step>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-charcoal/10 bg-cream-deep">
          <PhotoPlaceholder label={option.photos[0]} tone={stay === "farmhouse" ? "brass" : "forest"} aspect="aspect-[16/9]" />
          <div className="p-6">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">{t.summary.heading}</p>
            <dl className="mt-4 divide-y divide-charcoal/10 font-body text-sm">
              <SummaryRow label={t.summary.stay} value={option.name} />
              <SummaryRow
                label={t.summary.dates}
                value={
                  <>
                    {dateSummary}
                    {nights !== null && (
                      <span className="block text-xs text-charcoal/50">{t.calendar.nights.replace("{n}", String(nights))}</span>
                    )}
                  </>
                }
              />
              <SummaryRow label={t.summary.guests} value={guestSummary} />
              <SummaryRow label={t.summary.price} value={<span className="font-display text-lg text-forest">{t.summary.priceOnRequest}</span>} />
            </dl>
            <p className="mt-3 font-body text-xs leading-relaxed text-charcoal/50">{t.summary.priceNote}</p>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-sm bg-forest px-6 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "sending" ? t.form.sending : t.form.submit}
            </button>
            <p className="mt-3 text-center font-body text-[11px] text-charcoal/50">{t.noPaymentNote}</p>

            <div aria-live="polite">
              {status === "incomplete" && (
                <p className="mt-4 border border-brass/30 bg-brass/[0.08] px-4 py-3 font-body text-sm text-brass">{t.form.incomplete}</p>
              )}
              {status === "sent" && (
                <p className="mt-4 border border-forest/25 bg-forest/[0.06] px-4 py-3 font-body text-sm text-forest">
                  {contact.formEndpoint ? t.form.sentWithEndpoint : t.form.sentMailto}
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 border border-brass/30 bg-brass/[0.08] px-4 py-3 font-body text-sm text-brass">
                  {t.form.error.replace("{email}", contact.email)}
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 flex items-baseline gap-3 border-b border-charcoal/10 pb-3 font-display text-2xl text-forest">
        <span className="font-body text-xs tracking-[0.2em] text-brass">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
  decrease,
  increase,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  decrease: string;
  increase: string;
}) {
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-forest transition-colors hover:border-forest disabled:opacity-25 disabled:hover:border-charcoal/20";
  return (
    <div className="flex items-center justify-between border border-charcoal/15 bg-cream px-5 py-4">
      <div>
        <p className="font-body text-sm text-charcoal">{label}</p>
        <p className="font-body text-xs text-charcoal/50">{hint}</p>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`${decrease} — ${label}`}>
          −
        </button>
        <span className="w-5 text-center font-display text-lg text-forest" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`${increase} — ${label}`}>
          +
        </button>
      </div>
    </div>
  );
}

function PolicyList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="bg-cream p-5">
      <p className="font-body text-xs uppercase tracking-[0.15em] text-forest">{heading}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 font-body text-xs leading-relaxed text-grey">
            <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="shrink-0 text-xs uppercase tracking-[0.15em] text-charcoal/50">{label}</dt>
      <dd className="text-right text-charcoal">{value}</dd>
    </div>
  );
}
