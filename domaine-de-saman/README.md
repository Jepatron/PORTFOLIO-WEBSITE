# Domaine de Saman — marketing site

A standalone Next.js + Tailwind site for Domaine de Saman, a private estate
in the Pyrenees rented to families/groups, weddings, and yoga retreats. This
lives inside the portfolio repo but is a fully separate project — its own
`package.json`, own dependencies, deployed on its own.

## 1. Install & run

```
cd domaine-de-saman
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Editing content

Every piece of copy — taglines, room details, FAQ answers, nearby
activities, contact email — lives in **`content/site.ts`**. No page or
component needs to change to update text.

Anything wrapped in `[PLACEHOLDER: ...]` is a fact that couldn't be sourced
yet (this needs the Informatieblad / Plan van Aanpak / Compleet Overzicht
documents referenced in the project brief). Replace those before treating
the site as launch-ready — don't publish a placeholder as if it were a
confirmed fact.

## 3. Visual identity

- **Colors / fonts**: forest green, brass, cream, charcoal — defined in
  `tailwind.config.ts`. Headings use Playfair Display, body text uses Inter
  (`app/layout.tsx`).
- **Smooth scroll**: `components/SmoothScroll.tsx` wraps the app in Lenis for
  weighted, non-jumpy scrolling, wired to keep GSAP's ScrollTrigger in sync.
- **Scroll reveals**: `components/Reveal.tsx` fades/slides content up as it
  enters the viewport. Wrap any block in `<Reveal>` to get this for free.
- **Floating nav**: `components/Nav.tsx` is transparent over each page's
  hero and solidifies once you scroll past it (see `SOLID_FROM_TOP` for the
  pages, like `/privacy`, that skip this and stay solid).
- **Immersive hero pattern**: `components/PageHero.tsx` is the full-bleed
  hero used at the top of every page (title + short body + CTA buttons over
  a photo). `components/ImmersiveBreak.tsx` is the same full-bleed treatment
  used as a mid-page photo break between sections.

## 4. Photos

There's no real photography yet. Every image/video slot renders as a
gradient color block with a `[Photo: description]` label and a slow ambient
"Ken Burns" drift (stands in for a looping background video) instead of
stock photography — see `components/PhotoPlaceholder.tsx` (`animated` prop
controls the drift, used on hero-scale blocks). Once real footage exists:

1. Drop files into `public/media/`.
2. For a still: replace the relevant `<PhotoPlaceholder label="..." />` with
   a Next.js `<Image />` pointed at the file.
3. For the home hero video: swap the placeholder in
   `components/HomeHero.tsx` for a
   `<video autoPlay muted loop playsInline poster="...">`, kept to desktop
   only (`hidden md:block`) with a static image fallback on mobile — per the
   project brief, no autoplay video hero on mobile.

## 5. Enquiry form / booking

There's no backend yet. `components/EnquiryForm.tsx` posts to a Formspree
endpoint if you set one in `content/site.ts` (`contact.formEndpoint`);
otherwise it falls back to building a `mailto:` draft. To go live:

1. Create a form at https://formspree.io (or similar), get the endpoint URL.
2. Paste it into `contact.formEndpoint` in `content/site.ts`.

Swapping in a real booking backend later only touches this one component.

## 6. Before this goes public

- Replace all `[PLACEHOLDER: ...]` facts with confirmed details.
- Get a real photo set in and swap out the placeholder blocks.
- Confirm the wedding-hosting "our approach" note on the Weddings page still
  reflects the current legal/ERP status before publishing more assertive
  wedding-venue language.
- No pricing or financial figures are on the site by design — keep it that
  way unless that decision changes.
- Add the tourism registration number (NER) to the footer once obtained.
- Replace the privacy page stub with a reviewed GDPR notice.

## 7. Deploying

Push to GitHub, then import this repo at vercel.com with **Root Directory**
set to `domaine-de-saman` — Vercel will detect Next.js and deploy on every
push to this path.
