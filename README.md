# Portfolio — setup guide

## 1. Install & run

```
npm install
npm run dev
```

Open http://localhost:3000. Open this whole `portfolio` folder in Claude Code
(or VS Code) to keep editing.

## 2. Adding your own footage, stills, and articles

Everything content-related lives in **`content/projects.ts`**. To add a new
project, copy an existing entry in the `projects` array and edit it — no
other file needs to change.

**Stills / photos**
Drop image files into `public/media/stills/`. Reference them in
`projects.ts` as `/media/stills/your-file.jpg`.

**Video**
Don't upload raw video files to this project — they're too large and will
kill load times. Instead:
1. Upload the finished export to Vimeo (unlisted is fine).
2. Copy the numeric ID from the Vimeo URL (e.g. `vimeo.com/1023456789` → `1023456789`).
3. Paste it into that project's `vimeoId` field in `projects.ts`.

**Articles**
Either paste the text into the `body` field, or — if it's published
somewhere like Het Parool — set `externalUrl` instead and the project page
will link out.

**Hero background**
Replace `public/media/stills/hero-still.jpg` with a still pulled from your
own footage (a frame grab from DaVinci Resolve works well — export a still
at the moment you want).

## 3. Making it actually yours (not a template)

The current color palette (`tailwind.config.ts`) and accent color are
placeholders. Before shipping:

1. Pick a still from your own footage.
2. Run it through Coolors.co's image-to-palette tool.
3. Replace the `bg`, `bg-raised`, `ink`, `ink-dim`, and `accent` values in
   `tailwind.config.ts` with what you pulled.

This one step is what turns "dark cinematic template" into "looks like your
work."

## 4. Deploying

Push this to a GitHub repo, then import it at vercel.com — it will detect
Next.js automatically and deploy on every push. Free tier is enough for a
personal portfolio.

## 5. What's already wired in

- **Tailwind CSS** — utility classes, custom palette in `tailwind.config.ts`
- **Lenis** (`components/SmoothScroll.tsx`) — smooth scroll, wraps the app
- **GSAP** (`components/Hero.tsx`) — scroll/load-triggered reveals
- **Custom cursor** (`components/CustomCursor.tsx`) — desktop only, grows on
  hover over anything with `data-cursor="hover"`
- **Film grain overlay** (`.grain` in `globals.css`) — subtle texture across
  the whole site
- Reduced-motion and keyboard-focus support are already handled
