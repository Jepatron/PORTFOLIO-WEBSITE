// Everything editable about the site lives here. Swap copy, facts, photo
// labels, and contact details in this one file — no page component needs to
// change. Anything wrapped in [PLACEHOLDER: ...] is a fact we don't have a
// confirmed source for yet (the Informatieblad / Plan van Aanpak / Compleet
// Overzicht documents) — replace it once confirmed, don't publish it as-is.

export const site = {
  name: "Domaine de Saman",
  region: "Haute-Garonne, France",
  nearestTown: "near Boulogne-sur-Gesse",
  tagline:
    "A private 5-hectare estate in the Pyrenees — for families, weddings, and retreats.",
  intro:
    "Domaine de Saman is a private country estate at the foot of the Pyrenees, rented as a whole for the duration of your stay. There's no programme, no staff running your day, and nothing organised on our end — just a well-equipped property, five hectares of grounds, and space for up to fifteen guests to shape the stay themselves.",
};

export const contact = {
  email: "hello@domainedesaman.com", // [PLACEHOLDER: confirm the real enquiry inbox]
  formEndpoint: "", // [PLACEHOLDER: paste a Formspree endpoint (https://formspree.io/f/xxxxx) here to go live — until then the form falls back to a mailto: link]
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "The Estate", href: "/the-estate" },
  { label: "Weddings", href: "/weddings" },
  { label: "Retreats", href: "/retreats" },
  { label: "Gallery", href: "/gallery" },
  { label: "Availability", href: "/availability" },
];

export const ctaLabel = "Check availability";

export const highlights = [
  { value: "5", label: "hectares" },
  { value: "15", label: "guests" },
  { value: "1", label: "private pool" },
  { value: "1", label: "yoga deck" },
  { value: "1", label: "gym / sport room" },
];

export const howItWorks = [
  {
    step: "01",
    title: "You book the whole property",
    body: "One reservation covers the house, the grounds, the pool, the yoga deck, and the gym — exclusively for your group. There's no shared use and nothing else happening on the estate during your stay.",
  },
  {
    step: "02",
    title: "You run your own stay",
    body: "We don't organise activities, classes, or events. Families self-cater or book outside caterers; wedding parties bring their own planner or celebrant; retreat groups bring their own instructor. The estate is the setting — you (or the professionals you bring) run the programme.",
  },
];

export const audiences = [
  {
    key: "families",
    title: "Families & Groups",
    href: "/the-estate",
    blurb:
      "The whole house, pool, and grounds for a group holiday — up to fifteen guests, no programme attached.",
    photoLabel: "Group of guests around the pool terrace, late afternoon light",
  },
  {
    key: "weddings",
    title: "Weddings",
    href: "/weddings",
    blurb:
      "An intimate, private alternative to a commercial wedding venue — exclusive use of the house and grounds for your celebration.",
    photoLabel: "Ceremony seating laid out on the lawn, estate house in the background",
  },
  {
    key: "retreats",
    title: "Retreats",
    href: "/retreats",
    blurb:
      "A private yoga deck and gym/movement space for YTT schools and retreat organisers who bring their own instructor.",
    photoLabel: "Yoga deck at sunrise, mats laid out, mountains beyond",
  },
];

export const estate = {
  description:
    "Set on five hectares at the foot of the Pyrenees, Domaine de Saman is a private estate built for groups who want space, quiet, and a base to explore the surrounding countryside from. The main house sleeps fifteen across six bedrooms; outside, the grounds hold a private pool, a covered outdoor yoga deck, and a gym / sport room, alongside open lawns and mature trees.",
  bedroomCount: 6,
  sleeps: 15,
  // [PLACEHOLDER: room-by-room breakdown — bed configuration, en-suite/shared
  // bathrooms, and ground/first-floor location should come from the
  // Informatieblad. Structure mirrors what that document lists; numbers below
  // are placeholders only.]
  rooms: [
    { name: "Room 1", beds: "[PLACEHOLDER: bed configuration]", sleeps: 2, bathroom: "[PLACEHOLDER]" },
    { name: "Room 2", beds: "[PLACEHOLDER: bed configuration]", sleeps: 2, bathroom: "[PLACEHOLDER]" },
    { name: "Room 3", beds: "[PLACEHOLDER: bed configuration]", sleeps: 3, bathroom: "[PLACEHOLDER]" },
    { name: "Room 4", beds: "[PLACEHOLDER: bed configuration]", sleeps: 2, bathroom: "[PLACEHOLDER]" },
    { name: "Room 5", beds: "[PLACEHOLDER: bed configuration]", sleeps: 3, bathroom: "[PLACEHOLDER]" },
    { name: "Room 6", beds: "[PLACEHOLDER: bed configuration]", sleeps: 3, bathroom: "[PLACEHOLDER]" },
  ],
  amenities: [
    {
      title: "Private pool",
      body: "Outdoor pool on the terrace, exclusively for the group in-house — no shared access.",
      photoLabel: "Private pool, view towards the terrace and lawn",
    },
    {
      title: "Yoga deck",
      body: "A covered outdoor deck with a view towards the Pyrenees, set up for movement practice — bring your own mats and instructor.",
      photoLabel: "Covered yoga deck, mountain view",
    },
    {
      title: "Gym / sport room",
      body: "An indoor movement space with room for basic strength training and light sport (including badminton).",
      photoLabel: "Gym and sport room interior",
    },
    {
      title: "Kitchen",
      body: "A full kitchen for self-catering, sized for a group. [PLACEHOLDER: confirm equipment list / capacity from the Informatieblad.]",
      photoLabel: "Kitchen, group-sized",
    },
    {
      title: "Grounds",
      body: "Five hectares of lawns, mature trees, and open countryside surrounding the house — space to spread out.",
      photoLabel: "Grounds and lawn, aerial or wide shot",
    },
  ],
  galleryPhotos: [
    "Estate house, front facade",
    "Estate house, aerial view of the full 5-hectare grounds",
    "Private pool and terrace",
    "Yoga deck, mountain backdrop",
    "Gym / sport room interior",
    "Living room / communal indoor space",
    "Kitchen, group-sized",
    "Bedroom, example 1",
    "Bedroom, example 2",
    "Dining area, set for a group",
    "Grounds at golden hour",
    "Driveway and approach to the house",
  ],
};

export const weddings = {
  intro:
    "Domaine de Saman is offered as an intimate, private alternative to a commercial wedding venue — a getaway wedding, with exclusive use of the house and grounds for your group and the days around your celebration, rather than a single-day hire on a packed events calendar.",
  ceremony: {
    body:
      "Ceremonies are held outdoors in the grounds, with the house as backdrop. [PLACEHOLDER: confirm preferred ceremony location(s), any marquee/shelter option, and rain-plan from the Compleet Overzicht.]",
    photoLabel: "Ceremony setup on the lawn",
  },
  capacity:
    "The house itself sleeps up to fifteen guests overnight. Numbers for a ceremony or reception on the grounds during the day can be larger — get in touch with your guest count and we'll confirm whether it's a fit for the space.",
  catering:
    "There's no in-house catering team. Groups either self-cater from the estate's kitchen or bring in an outside caterer of their choice. [PLACEHOLDER: confirm whether outside caterers need prior approval / a list of caterers who already know the property, per the Informatieblad.]",
  noise:
    "As the estate sits in a quiet rural area, amplified music and outdoor celebrations are asked to wind down by a set time in the evening. [PLACEHOLDER: confirm the exact curfew / noise policy from the Informatieblad — we don't want to publish a time we haven't verified.]",
  approachNote:
    "Our approach: we open Domaine de Saman for a small number of private weddings a year, as an occasional and personal offering rather than a standing commercial events venue. We're not set up as a full-time wedding venue, and the formal classification for regular wedding hosting is still being confirmed. If you have questions about this, just ask us directly.",
};

export const retreats = {
  intro:
    "Domaine de Saman is well suited to YTT schools and retreat organisers looking for a private property to run their own programme — we provide the space; you (or your instructor) run the practice.",
  yogaDeck: {
    body:
      "A covered outdoor deck with a view towards the Pyrenees, usable for daily practice in most weather. [PLACEHOLDER: confirm deck dimensions / max mat count from the Informatieblad.]",
    photoLabel: "Yoga deck, group practice",
  },
  gym: {
    body: "An indoor gym / movement space for strength or alternative-weather practice, alongside the outdoor deck.",
    photoLabel: "Gym / movement space",
  },
  disclaimer:
    "We don't organise retreats, teach classes, or provide instructors ourselves — you bring your own teacher, and the group runs its own schedule. We simply rent out a private, well-equipped property for the duration of your retreat.",
  selfCatering:
    "Groups self-cater from the estate's kitchen, or arrange outside catering. [PLACEHOLDER: confirm any catering restrictions specific to larger retreat groups.]",
  groupRates:
    "Rates for retreat-length bookings are quoted on enquiry, based on group size and dates — get in touch and we'll come back to you.",
};

export const faqs = [
  {
    q: "How many guests does the property sleep?",
    a: "Up to fifteen guests across six bedrooms in the main house.",
  },
  {
    q: "What are check-in and check-out times?",
    a: "[PLACEHOLDER: confirm standard check-in/check-out times from the Informatieblad.]",
  },
  {
    q: "Is catering provided?",
    a: "No — there's no in-house catering. Guests self-cater from the estate's kitchen, or arrange their own outside caterer.",
  },
  {
    q: "Do you organise activities, retreats, or wedding services?",
    a: "No. We rent the property; guests (or the instructor/planner/caterer they bring) run their own programme. We don't host or run activities ourselves.",
  },
  {
    q: "Is there a noise curfew or house rules for events?",
    a: "The estate is in a quiet rural setting, so amplified music and outdoor celebrations are asked to wind down in the evening. [PLACEHOLDER: confirm the exact curfew and any further house rules from the Informatieblad.]",
  },
  {
    q: "Can we bring our own yoga instructor or wedding planner?",
    a: "Yes — that's the expected setup. We provide the property and facilities; you bring whoever runs your programme.",
  },
];

export const nearbyActivities = [
  "Canyoning",
  "White-water rafting",
  "Hiking",
  "Via ferrata",
];

export const footer = {
  locationNote:
    "Haute-Garonne, France — near Boulogne-sur-Gesse, at the foot of the Pyrenees. Exact address shared on booking.",
  activitiesNote: `Nearby, within around two hours: ${["canyoning", "white-water rafting", "hiking", "via ferrata"].join(", ")}.`,
  registrationNote:
    "Tourism registration number (NER): to be added once obtained.",
  privacyNote: "Privacy policy",
};

export const privacyPolicy = {
  intro:
    "This is a short, plain-language summary of how we handle enquiry data — not a full legal privacy policy. [PLACEHOLDER: replace with a reviewed GDPR privacy notice before this site is public.]",
  points: [
    "When you submit the enquiry/availability form, we collect what you enter — name, contact details, dates, group size, purpose of stay, and any message — solely to respond to your enquiry.",
    "We don't sell or share this data with third parties, and we don't use it for marketing unless you separately opt in.",
    "We keep enquiry data only as long as needed to handle your request and any resulting booking.",
    "You can ask us to see, correct, or delete the data we hold on you at any time by emailing us.",
  ],
};
