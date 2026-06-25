# andrey.dev — personal site

A bento-grid personal site for Andrey Esipov, principal PM at Microsoft.
Cream + warm-orange palette, four day-cycle themes (sunrise, day, sunset,
night), live Strava integration, and project detail pages for OneDrive,
Rallo, and Droplet.

## Stack

- Next.js 14 (App Router, static export → GitHub Pages)
- React 18 + TypeScript
- Tailwind CSS 3 with CSS-variable-driven semantic tokens
- Framer Motion for entrance animations + tilt
- `next/font/google` for Instrument Serif + Inter Tight
- Strava integration via a daily GitHub Action
- `@mapbox/polyline` to render the latest activity's route as SVG

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

To produce the static export shipped to GitHub Pages:

```bash
npm run build    # writes ./out
npx serve out    # smoke-test the static bundle
```

## Command palette

Press `⌘K` on Mac or `Ctrl+K` on Windows/Linux to open the command palette.
Use it to navigate between pages, switch themes, open social links, email, or
copy the email address.

## Strava integration

The "Out and about" card reads `public/data/strava-latest.json`, which is
refreshed nightly by a GitHub Action.

One-time setup:

1. At <https://www.strava.com/settings/api>, create an app. Set the
   Authorization Callback Domain to `localhost`.
2. Run `STRAVA_CLIENT_ID=… STRAVA_CLIENT_SECRET=… node scripts/strava-auth.mjs`
   and follow the prompts to get a long-lived refresh token.
3. In repo Settings → Secrets → Actions, add:
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
   - `STRAVA_REFRESH_TOKEN`

The `Strava sync` workflow fires daily at noon UTC and on manual dispatch.
It writes `public/data/strava-latest.json` and commits if the latest
activity changed.

If the JSON is missing or the latest activity is older than 30 days, the
card shows a graceful "Lacing up" empty state.

## Theme system

Four day-cycle themes: `sunrise` (orange-dominant, peach cream — the 6am
long-run mood), `day` (cream + orange), `sunset` (warm amber dusk), and
`night` (warm ink). All themes share the same token names (`--bg`,
`--surface`, `--accent`, `--sage`, etc.); values shift per `data-theme`
attribute on `<html>`.

The user's choice persists in `localStorage` under `andrey-theme`. First
visits respect `prefers-color-scheme`. A pre-hydration script applies the
saved theme synchronously to avoid a flash of the wrong palette.

## Project pages

- `/` — bento home
- `/work/` — OneDrive (work) detail page
- `/rallo/` — Rallo (personal AI tennis coach) detail page
- `/droplet/` — Droplet (water-saving Rain Bird controller) detail page

These detail pages use a shared `<ProjectDetail>` layout in
`components/ProjectDetail.tsx`.

## Deployment

GitHub Pages, deployed from GitHub Actions (`.github/workflows/deploy.yml`).
Pushes to `main` build the static export and publish via `actions/deploy-pages`.

To enable Pages with the Actions source for the first time:

```bash
gh api repos/andrey-esipov/andrey-esipov.github.io/pages \
  -X POST -f build_type=workflow
```

## Project structure

```
app/
  layout.tsx           root layout (fonts, theme, metadata)
  page.tsx             home → <Site />
  droplet/page.tsx     Droplet detail page
  rallo/page.tsx       Rallo detail page
  work/page.tsx        OneDrive detail page
  globals.css          CSS variables for 4 day-cycle themes + base
  fonts.ts             Instrument Serif + Inter Tight
components/
  Site.tsx             top-level: TopNav + draggable BentoGrid
  TopNav.tsx           pill nav with All / About / Projects / Activity
  BentoGrid.tsx        responsive bento grid (1 / 6 / 4 cols)
  ThemeProvider.tsx    4-theme day-cycle context + bootstrap script
  command/             command palette components
  ProjectDetail.tsx    shared detail-page layout
  MouseSpotlight.tsx   soft cursor-following glow
  TileSounds.tsx       optional tile interaction sounds
  ui/
    Card.tsx           shared card primitive
    PillToggle.tsx     segmented pill (used by nav + ThemeCard)
    ProjectButton.tsx  animated learn-more pill on project tiles
  cards/
    BioCard.tsx        avatar, intro, wave-hello easter egg
    WorkCard.tsx       OneDrive, links to /work
    RalloCard.tsx      Rallo, links to /rallo
    DropletCard.tsx    Droplet, links to /droplet
    StravaCard.tsx     latest activity, route polyline
    LocationCard.tsx   Nashville map tile
    LinkedInCard.tsx   dedicated LinkedIn card with career highlights
    EducationCard.tsx  schools / "always studying"
    NowCard.tsx        what I'm building / reading / listening
    HotTakesCard.tsx   rotating one-line opinions
    CoffeeCard.tsx     espresso counter easter egg
    NewsletterCard.tsx "hands on" newsletter teaser
    ThemeCard.tsx      day-cycle theme slider
  visuals/
    DropletGlyph.tsx       bespoke Droplet teardrop brand mark
    RalloPhoneSVG.tsx      iPhone-frame mockup with tennis court
    RoutePolyline.tsx      decoded Strava polyline → SVG
    MapPolylineOverlay.tsx route overlay for the location map
public/
  avatar.png           the 3D portrait
  data/
    strava-latest.json refreshed by GitHub Action
scripts/
  fetch-strava.mjs     daily fetch via refresh token
  strava-auth.mjs      one-time OAuth helper
.github/workflows/
  deploy.yml           build + deploy to Pages
  strava-sync.yml      daily Strava refresh
```
