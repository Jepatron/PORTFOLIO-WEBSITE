// Shared shape for every locale's content module. Structural/factual fields
// (numbers, coordinates, hrefs, category keys) stay identical across
// locales — only human-readable prose differs between content/en.ts,
// content/fr.ts, and content/de.ts.

// Kept as fixed English internal values across all locales, purely for
// filtering logic — translated display text lives in `seasonLabels`.
export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export interface Activity {
  name: string;
  description: string;
  seasons: Season[];
  distance: string;
  category: "hiking" | "winter-sports" | "water" | "markets" | "day-trip";
  lat: number;
  lng: number;
}

export interface Room {
  name: string;
  beds: string;
  sleeps: number;
  bathroom: string;
  description: string;
  /** Slideshow slides — placeholder labels until real photos exist. */
  photos: string[];
}

// Keys for the bookable units on /reserve. Which ones are actually
// bookable (and their guest limits) lives in content/booking.ts.
export type StayOptionKey = "estate" | "villa" | "farmhouse";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteContent {
  site: {
    name: string;
    url: string;
    region: string;
    nearestTown: string;
    tagline: string;
    heroSubline: string;
    intro: string;
    introPhotoLabel: string;
    exploreCta: string;
    metaTagline: string;
  };
  theView: { body: string; photoLabel: string };
  morningPiece: { body: string; photoLabel: string };
  contact: { email: string; formEndpoint: string; newsletterFormEndpoint: string };
  newsletter: {
    heading: string;
    body: string;
    emailLabel: string;
    submit: string;
    sending: string;
    sentWithEndpoint: string;
    sentMailto: string;
    error: string;
  };
  nav: NavItem[];
  secondaryNav: NavItem[];
  ctaLabel: string;
  /** Nav button label — links to /reserve. */
  reserveLabel: string;
  highlights: { value: string; label: string }[];
  howItWorks: { step: string; title: string; body: string }[];
  audiences: { key: string; title: string; href: string; blurb: string; photoLabel: string }[];
  estate: {
    description: string;
    poolFeature: { body: string; photoLabel: string };
    hectares: number;
    bedroomCount: number;
    sleeps: number;
    villa: {
      name: string;
      tagline: string;
      sleeps: number;
      bedroomCount: number;
      description: string;
      rooms: Room[];
      photoLabel: string;
    };
    farmhouse: {
      name: string;
      tagline: string;
      built: string;
      sleeps: number;
      bedroomCount: number;
      description: string;
      rentalNote: string;
      rooms: Room[];
      photoLabel: string;
      galleryPhotos: string[];
    };
    amenities: { title: string; body: string; photoLabel: string }[];
    galleryPhotos: string[];
  };
  weddings: {
    intro: string;
    ceremony: { body: string; photoLabel: string };
    capacity: string;
    catering: string;
    noise: string;
    approachNote: string;
  };
  retreats: {
    intro: string;
    longerSection: string;
    yogaDeck: { body: string; photoLabel: string };
    gym: { body: string; photoLabel: string };
    disclaimer: string;
    selfCatering: string;
    groupRates: string;
  };
  faqs: { q: string; a: string }[];
  footer: {
    tagline: string;
    locationNote: string;
    activitiesNote: string;
    registrationNote: string;
    privacyNote: string;
    exploreLabel: string;
    nearbyLabel: string;
    contactLabel: string;
  };
  region: {
    intro: string;
    gettingHere: string;
    allSeasonsLabel: string;
    filterAriaLabel: string;
    mapAriaLabel: string;
    mapPopupNote: string;
    mapLegendActivities: string;
  };
  estateLocation: { lat: number; lng: number };
  seasonLabels: Record<Season, string>;
  activities: Activity[];
  ourStory: {
    eyebrow: string;
    title: string;
    body: string[];
    /** One photo per body paragraph — rendered alternating left/right. */
    photoLabels: string[];
    statement: string;
    essence: { heading: string; items: { title: string; body: string; photoLabel: string }[] };
  };
  stay: {
    eyebrow: string;
    title: string;
    heroBody: string;
    heroPhotoLabel: string;
    intro: string;
    roomsHeading: string;
    houseMeta: string; // template: {bedrooms} {sleeps}
    roomMeta: { beds: string; sleeps: string; bathroom: string };
    reserveHouseCta: string;
    moreAboutHouse: string;
    sharedHeading: string;
    sharedIntro: string;
    sharedPhotos: string[];
    includesHeading: string;
    includes: string[];
    exclusiveHeading: string;
    exclusiveBody: string;
    exclusiveCta: string;
  };
  slideshow: { previous: string; next: string; goTo: string /* template: {n} */ };
  reserve: {
    eyebrow: string;
    title: string;
    intro: string;
    stepStay: string;
    stepDates: string;
    stepGuests: string;
    stepDetails: string;
    options: Record<StayOptionKey, { name: string; summary: string; photos: string[] }>;
    comingSoon: string;
    unavailableNote: string;
    roomsInThisStay: string;
    calendar: {
      previousMonth: string;
      nextMonth: string;
      checkIn: string;
      checkOut: string;
      selectCheckIn: string;
      selectCheckOut: string;
      minNights: string; // template: {n}
      unavailable: string;
      clear: string;
      nights: string; // template: {n}
    };
    guests: { adults: string; adultsHint: string; children: string; childrenHint: string; max: string /* template: {n} */; decrease: string; increase: string };
    form: {
      name: string;
      email: string;
      phone: string;
      purpose: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      sentWithEndpoint: string;
      sentMailto: string;
      error: string;
      incomplete: string;
      agreeRules: string;
    };
    summary: {
      heading: string;
      stay: string;
      dates: string;
      guests: string;
      guestsValue: string; // template: {adults} {children}
      notSelected: string;
      price: string;
      priceOnRequest: string;
      priceNote: string;
    };
    rulesHeading: string;
    houseRules: string[];
    termsHeading: string;
    terms: string[];
    noPaymentNote: string;
  };
  galleryIntro: string;
  privacyPolicy: { intro: string; points: string[] };
  enquiryForm: {
    purposes: { value: string; label: string }[];
    labels: {
      name: string;
      email: string;
      dates: string;
      datesPlaceholder: string;
      groupSize: string;
      purpose: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      sentWithEndpoint: string;
      sentMailto: string;
      error: string;
    };
  };
  languageSwitcherLabel: string;
  pages: {
    home: { ctaHeading: string };
    estate: {
      eyebrow: string;
      title: string;
      heroPhotoLabel: string;
      secondaryCtaLabel: string;
      enquireCta: string;
      twoHousesHeading: string;
      villaHeading: string; // template: {name} {bedrooms} {sleeps}
      amenitiesHeading: string;
      insideVillaHeading: string;
      livingRoomLabel: string;
      galleryPreviewHeading: string;
    };
    farmhouse: {
      eyebrow: string;
      title: string;
      secondaryCtaLabel: string;
      datingBackBody: string; // template: {built}
      roomsHeading: string; // template: {bedrooms} {sleeps}
      immersiveLabel: string;
      bookingHeading: string;
      seeEstateLink: string;
      galleryPreviewHeading: string;
      ctaHeading: string;
      ctaBody: string;
    };
    weddings: {
      eyebrow: string;
      title: string;
      heroPhotoLabel: string;
      primaryCtaLabel: string;
      secondaryCtaLabel: string;
      ceremonyHeading: string;
      capacityHeading: string;
      cateringHeading: string;
      noiseHeading: string;
      immersiveLabel: string;
      enquireHeading: string;
      enquireBody: string;
    };
    retreats: {
      eyebrow: string;
      title: string;
      heroPhotoLabel: string;
      primaryCtaLabel: string;
      secondaryCtaLabel: string;
      yogaDeckHeading: string;
      gymHeading: string;
      immersiveLabel: string;
      selfCateringHeading: string;
      groupRatesHeading: string;
      enquireHeading: string;
      enquireBody: string;
    };
    region: {
      eyebrow: string;
      title: string;
      heroPhotoLabel: string;
      whereLiesHeading: string;
      whereLiesBody: string;
      nearbyHeading: string;
      nearbyBody: string;
      immersiveLabel: string;
      gettingHereHeading: string;
      ctaHeading: string;
      ctaBody: string;
    };
    gallery: { eyebrow: string; title: string; heroBody: string; heroPhotoLabel: string };
    availability: {
      eyebrow: string;
      title: string;
      heroBody: string;
      heroPhotoLabel: string;
      preferEmailBody: string;
      glanceHeading: string; // template: {site}
      replyNote: string;
      faqEyebrow: string;
      faqHeading: string;
    };
    ourStory: { heroPhotoLabel: string; ctaHeading: string; ctaBody: string };
    privacy: { heading: string };
    journal: {
      eyebrow: string;
      title: string;
      intro: string;
      heroPhotoLabel: string;
      readMoreCta: string;
      backCta: string;
    };
    notFound: { title: string; body: string; backHome: string };
  };
  ui: {
    howItWorksEyebrow: string;
    learnMoreCta: string;
    exploreHouseCta: string;
    viewFullGalleryCta: string;
    sleepsAndBedrooms: string; // template: "{sleeps}" and "{bedrooms}" placeholders
    openInGoogleMaps: string;
    roomTable: { room: string; beds: string; sleeps: string; bathroom: string; caption: string };
    defaultCtaHeading: string;
    defaultCtaBody: string;
  };
}
