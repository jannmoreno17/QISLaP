# QISLaP Website

Public website for the **Quantum and Intelligent Systems Laboratory for Power Engineering (QISLaP)**, T.I.P. · TechnoCoRe · DOST-PCIEERD.

Next.js 16 (App Router) + Tailwind CSS 4, exported as a fully static site for GitHub Pages. No backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Editing content

All content lives in `src/data/`. You don't need to touch layout code.

| File | What's in it |
| --- | --- |
| `site.ts` | Lab name, tagline, address, **email**, **social links**, map, optional form endpoint |
| `team.ts` | Team members. Each role has `status: "current" \| "former"` and `start`/`end` dates (`"YYYY-MM"`) |
| `events.ts` | Engagements & events timeline, with photo galleries |
| `partners.ts` | Partner logos, grouped by project |
| `projects.ts` | Q-RIEnTe and SICAT: overview, objectives, milestones, SDGs, logo |
| `lab.ts` | Lab profile from the QISLaP brochure: mission, vision, hybrid workflow, roadmap, infrastructure |

**Move someone to Past Members:** in `team.ts`, change their role's `status` to `"former"` and add an `end` date:

```ts
{ project: "q-riente", position: "Project Staff L2", status: "former", start: "2024-10", end: "2026-09" }
```

Search the code for `TODO` to find placeholders that still need real content (social links, SICAT title and description and Dr. Estrada's credentials and start month).

## Images

Raw photos live in `../QISLaP_Raw_Images`. `npm run images` resizes them to WebP in `public/images/` (member photos are trimmed and square-cropped; events get a full-size version plus a `-sm` thumbnail). It also generates `public/og.jpg` (the social share image) and `public/images/hero.webp`.

To add photos to an event, drop them into a new folder in the raw images directory, run `npm run images`, then add an entry in `src/data/events.ts`. Leave out `photo` for a member (or `logo` for a partner) and a placeholder is shown instead.

## Brand

Official logos live in `public/brand/` (from the QISLaP trademark files): `qislap-logo.svg`, a white-stroke `qislap-logo-light.svg` for dark backgrounds, and `qriente-logo.svg`. Trademark colours: deep yellow `#FFCC29`, dark gray `#595959`, white. To add a SICAT logo, drop it in `public/brand/` and set `logo` in `projects.ts`.

## Contact form

The site is static, so by default the form opens the visitor's email app with the message pre-filled. To receive submissions directly, create a free [Formspree](https://formspree.io) form and paste its URL into `formEndpoint` in `src/data/site.ts`.

## Deploy to GitHub Pages (qislap.com)

The site is served at **https://qislap.com**. `public/CNAME` tells GitHub Pages the domain, and the workflow builds with `NEXT_PUBLIC_SITE_URL=https://qislap.com` and no base path.

1. Push this folder to a GitHub repository (branch `main`).
2. In the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Under **Settings → Pages → Custom domain**, enter `qislap.com` and save.
4. At your domain registrar / DNS host, add these records (keep your existing MX/TXT records for email):

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `raymond2330.github.io` |

5. Once the DNS check passes on the Pages settings screen, tick **Enforce HTTPS**.

Every push to `main` builds and deploys the site through `.github/workflows/deploy.yml`.

`scripts/flatten-segments.mjs` runs after every build. It works around a Next 16 static-export quirk: prefetch files are written as nested folders, but the browser requests them by flat file names. Without it, visitors would see harmless 404s on prefetch.
