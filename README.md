# Yibo Ma · Engineering portfolio

Static Astro portfolio with strict TypeScript, one Three.js WebGL 2 hero canvas, Motion interface animation and self-hosted fonts. Four primary routes: `/`, `/projects/`, `/background/`, `/contact/`. Includes a static 404 page.

## Local development

Use Node 24 LTS (the selected Astro version requires Node >=22.23.4) and npm. On PowerShell systems that block npm scripts, use `npm.cmd` instead of `npm`.

```sh
npm ci
npm run dev
npm run check
npm run build
npm test
npm run preview
```

Production files are written to `dist/`. Browser regression checks run against the production preview:

```sh
npx playwright install chromium
npx playwright test
```

## Content and source boundaries

Edit shared typed records in [src/data/portfolio.ts](src/data/portfolio.ts). Page structure is in [src/pages/](src/pages/), reusable components in [src/components/](src/components/), and colours, typography and responsive layout in [src/styles/global.css](src/styles/global.css). Browser graphics are isolated in [src/scripts/particles.ts](src/scripts/particles.ts); ordinary interactions are in [src/scripts/interface.ts](src/scripts/interface.ts).

The designated `reference/Yibo_Ma_CV_Updated(3).docx` was absent during implementation. The site uses the supplied brief. Exact UCL modules, AP subjects and scores, the complete award list (including any USACO result), detailed activity contributions and further experience await the CV. These gaps are not replaced with invented content. A CV download is intentionally absent until a genuine file is supplied.

Keep private source documents under ignored `reference/`, never `public/`. When authorised for download, place only a deliberately public CV in `public/downloads/`, add its typed record and use an accurately labelled DOCX/PDF link. Do not copy the entire reference folder. Project dates are omitted. Ongoing work and all synthetic diagrams are labelled. No real project imagery was reused, so no third-party image attribution is needed. Fontsource packages include font licence files; npm dependencies retain their own licences.

## Cloudflare Pages

1. Commit the source and `package-lock.json`, then push to your GitHub repository when ready.
2. Connect the repository to Cloudflare Pages.
3. Set production branch `main`, build command `npm run build`, output directory `dist`, and Node version `24` (also declared in `.node-version`).
4. Deploy through Cloudflare. This project needs no adapter, functions, credentials or runtime bindings.

Do not use SPA redirects: Astro emits a separate HTML file for every route, allowing direct access and refresh. No canonical domain or sitemap is configured until the production URL is known. Nothing is published by local build commands.

## Design and API references

Original code-drawn diagrams use no Lusion assets. [Lusion](https://lusion.co/) informed the interaction direction. Implementation references: [Astro islands](https://docs.astro.build/en/concepts/islands/), [Astro TypeScript](https://docs.astro.build/en/guides/typescript/), [Three.js](https://threejs.org/docs/), [Motion JavaScript](https://motion.dev/docs/quick-start), [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), and [Cloudflare Astro deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

The public READMEs of the [document matcher](https://github.com/YiboMa2333/Language-Model-Based-Label-and-Value-Matcher), [Input Overlay Desktop](https://github.com/YiboMa2333/Input_Overlay_on_desktop) and [Tetris AI](https://github.com/YiboMa2333/TetrisAI) were reviewed. Tetris provides a gameplay video, not assessed coursework source. Input Overlay is an independent adaptation of [univrsal/input-overlay](https://github.com/univrsal/input-overlay), with its GPL-2.0-only status documented upstream; no upstream code or assets are bundled here. Document-matcher sample company records are not public and are not included.

Browser checks target Chromium at mobile (390px), tablet (820px) and desktop (1440px) widths. They cover direct routes and refresh, missing assets and console errors, menu and skip-link keyboard use, copy success/failure, focused keyboard input, event stepping, disclosures, reduced motion, a single graphics canvas and fallback after context loss. Native email/telephone app launches and real LinkedIn sign-in are outside these local automated checks. Vite reports the Three.js graphics chunk above 500kB; it is only included on the home page and content/navigation do not depend on it.
