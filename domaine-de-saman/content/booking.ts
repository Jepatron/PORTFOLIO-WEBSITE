import type { StayOptionKey } from "./types";

// Structural booking settings shared by every locale — the /reserve page
// reads these. Translated copy lives in content/{en,fr,de}.ts under `reserve`.
//
// Everything here is a [PLACEHOLDER] until confirmed: no booking backend
// exists yet, so "blocked" dates are hand-maintained and a reservation is
// sent as a request (Formspree or mailto), never charged.

export const booking = {
  // [PLACEHOLDER: confirm minimum stay. Copy elsewhere talks about "a week
  // at a time", so this defaults to 7.]
  minNights: 7,

  options: {
    // Only whole-estate stays are taken today — see estate.farmhouse.rentalNote.
    // Flip `bookable` to true once villa-only / farmhouse-only stays open.
    estate: { bookable: true, maxGuests: 15 },
    villa: { bookable: false, maxGuests: 9 },
    farmhouse: { bookable: false, maxGuests: 6 },
  } satisfies Record<StayOptionKey, { bookable: boolean; maxGuests: number }>,

  // [PLACEHOLDER: example booked periods so the calendar shows how blocked
  // dates look. Replace with real bookings (check-in inclusive, check-out
  // exclusive, YYYY-MM-DD) or wire up a calendar feed later.]
  blocked: [
    { from: "2027-07-10", to: "2027-07-24" },
    { from: "2027-08-07", to: "2027-08-21" },
  ] as { from: string; to: string }[],
};

export const stayOptionKeys: StayOptionKey[] = ["estate", "villa", "farmhouse"];
