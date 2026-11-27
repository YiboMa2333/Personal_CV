# Yibo Ma · Engineering portfolio

Static Astro portfolio with strict TypeScript, one Three.js WebGL 2 hero canvas, Motion interface animation and self-hosted fonts. Four primary routes: `/`, `/projects/`, `/background/`, `/contact/`, plus seven statically generated detail pages under `/projects/<id>/` and a static 404 page. The Projects gallery uses linked explanatory posters; each project page presents media, technical detail and a verified repository/demo link when available.

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

The user-designated [Yibo_Ma_CV_Updated.docx](reference/Yibo_Ma_CV_Updated.docx) is the authoritative content source, retained in ignored `reference/`. Text and hyperlinks were extracted using .NET ZIP/XML reading of the DOCX. The site includes all 15 listed UCL modules, AP subjects and scores, the six academic award entries, detailed activities, technical skills and both additional-experience entries. Contact details and project hyperlinks match the CV. Project outcomes and ongoing status remain consistent with the source and supplied project brief.

AP results retain the CV’s exact subject labels, including “Physics C” and “Calculus AB/BC”, without inferring separate examinations. Scores use the five-point scale; A-level equivalence and subject-percentile claims are omitted. The approximate AP award-recipient percentage is omitted because it has not been verified as a 2025 comparison. The Australian Mathematics Competition result retains “Second award” rather than interpreting it as second place.

A deliberately public, unchanged copy is available at [public/downloads/Yibo_Ma_CV.docx](public/downloads/Yibo_Ma_CV.docx), linked from Home and Contact Information. Its original wording is preserved; the web presentation follows the content rules above. No PDF is supplied or generated. When replacing the CV, update both the private reference and deliberate public download, reconcile typed content, then rerun checks. Canonical and Open Graph URLs use the production domain `https://yiboma.com.de`; no sitemap or robots file is currently configured.

Keep private source documents under ignored `reference/`, never `public/`. When authorised for download, place only a deliberately public CV in `public/downloads/`, add its typed record and use an accurately labelled DOCX/PDF link. Do not copy the entire reference folder. Project dates are omitted. Ongoing work and all synthetic diagrams are labelled. Project posters are code-drawn illustrations. The Tetris detail page includes the user-supplied gameplay video and leaderboard photograph. Fontsource packages include font licence files; npm dependencies retain their own licences.

## Project media

Add project videos and images to the matching folder under [media/](media/):

- [Super-Happy-Space-2.0](media/Super-Happy-Space-2.0/)
- [MultiPlay-SDK](media/MultiPlay-SDK/)
- [Language-Model-Based-Label-and-Value-Matcher](media/Language-Model-Based-Label-and-Value-Matcher/)
- [Input-Overlay-Desktop](media/Input-Overlay-Desktop/)
- [Tetris-AI](media/Tetris-AI/)
- [Automated-Bioreactor-Control-System](media/Automated-Bioreactor-Control-System/)
- [Sun-Glare-Detection-Model](media/Sun-Glare-Detection-Model/)

Add each upload to the optional typed `media` array on its project in [src/data/portfolio.ts](src/data/portfolio.ts). Images need `kind: 'image'`, a `src` path such as `/media/Tetris-AI/2nd_Place.jpg`, descriptive `alt` text and a visible `caption`. Videos need `kind: 'video'`, `src`, `poster`, intrinsic `width` and `height`, and a visible `caption`. Use a real frame from the recording as its poster, at the same dimensions as the video. The Tetris poster is an authentic frame extracted at three seconds from the supplied recording.

Video records optionally accept `transcript` (a `.txt` path) and `captions` (`{ src: '/media/.../captions.vtt', language: 'en', label: 'English' }`). These render as a nearby transcript link and a native caption track. None have been supplied for the current recordings. Use descriptive filenames and browser-compatible MP4/WebM encoding. Restart development or rebuild after adding or registering files.

Media under this folder is deliberately public: Vite imports supported images (PNG/JPEG/WebP/AVIF), videos (MP4/WebM), caption files (VTT) and transcripts (TXT) with hashed URLs into the build. Only include material intended for sharing. Notes in Markdown and `.gitkeep` placeholders are not imported. Registering a nonexistent asset fails the build with its path. Projects without media retain their explanatory visual and technical content.

Asset resolution and image optimisation live in [src/data/media.ts](src/data/media.ts). Optional `mediaGroups` define titled groups and layouts (`three`, `two`, `compact`, `showcase`, `photos` or `single`); each media record's `group` selects its group and optional `title` labels the item. Groups appear in definition order and items in record order within each group. Unassigned groups fail the build. Input Overlay pairs a row of three modes with a row of three settings screens and a compact tray menu; Tetris pairs gameplay and ranking; bioreactor pairs system/results and circuit sketches; Sun-Glare pairs a detection example with a source-photo grid. Layouts reflow on small screens. Adding a file alone does not add it to a page.

Images retain their intrinsic dimensions, are lazy-loaded and use high-quality WebP (PNG diagrams use quality 100; photographs use quality 90). Videos reserve their recorded aspect ratio, show a static poster and use native controls with `preload="none"`. Playback starts only after user interaction; starting another video, hiding the tab or leaving the page pauses playback. Reduced motion does not prevent deliberate playback. Gallery order follows the `projects` array in the shared data layer.

Images use the browser?s normal page zoom without additional enlargement controls. A `notes.md` may record proposed captions or attribution but is not parsed automatically. No project source links are invented; Tetris links to its public gameplay-demo repository, where coursework source is intentionally unavailable.

The Sun-Glare Detection page links to Yibo Ma’s paper through [DOI 10.56028/aetr.12.1.1222.2024](https://doi.org/10.56028/aetr.12.1.1222.2024). Authorship, title and the qualitative findings were checked against the [publisher’s abstract](https://madison-proceedings.com/index.php/aetr/article/view/2968). Its media records include a supplied detector-output image and four source photographs; the visible detection confidence is not presented as model accuracy. The abstract pipeline remains clearly labelled as an illustration.

## Production hosting: Cloudflare

Production origin: https://yiboma.com.de. Astro keeps static output, base `/` and trailing slashes. Canonical and Open Graph URLs point to production; navigation, media and downloads remain relative to the current host so Cloudflare preview URLs stay usable.

GitHub reports a successful **Cloudflare Pages** check for the existing `personal-cv` project, confirming the external Pages integration. This checkout has no Wrangler configuration or Cloudflare upload workflow. Keep that existing Git-connected Pages project, deployment method and secrets; its dashboard settings are managed outside this repository. The obsolete GitHub Pages deployment has been replaced by a checks-only GitHub Actions workflow; it does not publish files or require deployment credentials.

In the existing Cloudflare dashboard project, confirm:

- The connected repository is `YiboMa2333/Personal_CV` and production branch is `main`, if using Git integration. Keep any existing Direct Upload process if that is the active method.
- For Pages Git builds: framework Astro, build command `npm run build`, output directory `dist`, repository root, Node `24` (matching `.node-version`). Keep existing preview builds and secrets. Remove any obsolete production URL/base override pointing to the former host; this code does not use a production URL environment variable.
- Under **Workers & Pages ? existing Pages project ? Custom domains**, add or confirm `yiboma.com.de` and wait for DNS and TLS activation. If the existing project uses Workers instead, retain that deployment and attach the custom domain there rather than creating a second Pages project.
- Follow the dashboard's DNS instructions for the existing project; do not create competing records. For Pages, associate the domain with the project before changing DNS. Verify HTTPS, nested pages and downloads after deployment. No SPA fallback is needed because every route has its own HTML file.

Run `npm ci`, `npm run check`, `npm run build`, `npm test` and `npm run test:browser` locally. Preview at http://127.0.0.1:4321/. Local builds do not publish anything. Use `sitePath` from [src/utils/paths.ts](src/utils/paths.ts) for hand-written internal URLs; imported media, bundled scripts and fonts are handled by Astro/Vite.

Official references: [Cloudflare Astro deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Pages custom domains and DNS](https://developers.cloudflare.com/pages/configuration/custom-domains/). Cloudflare dashboard settings, domain activation and automatic deployment must be checked in the hosting account.

## Design and API references

Original code-drawn diagrams use no Lusion assets. [Lusion](https://lusion.co/) informed the interaction direction. Implementation references: [Astro islands](https://docs.astro.build/en/concepts/islands/), [Astro TypeScript](https://docs.astro.build/en/guides/typescript/), [Three.js](https://threejs.org/docs/), [Motion JavaScript](https://motion.dev/docs/quick-start), [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), and [Cloudflare Astro deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

The public READMEs of the [document matcher](https://github.com/YiboMa2333/Language-Model-Based-Label-and-Value-Matcher), [Input Overlay Desktop](https://github.com/YiboMa2333/Input_Overlay_on_desktop) and [Tetris AI](https://github.com/YiboMa2333/TetrisAI) were reviewed. Tetris provides a gameplay video, not assessed coursework source. Input Overlay is an independent adaptation of [univrsal/input-overlay](https://github.com/univrsal/input-overlay), with its GPL-2.0-only status documented upstream; no upstream code or assets are bundled here. Document-matcher sample company records are not public and are not included.

The Input Overlay page also follows its [customisation guide](https://github.com/YiboMa2333/Input_Overlay_on_desktop/blob/main/docs/CUSTOMIZATION.md), [tray documentation](https://github.com/YiboMa2333/Input_Overlay_on_desktop/blob/main/docs/TRAY_RELEASE.md) and [Windows CI configuration](https://github.com/YiboMa2333/Input_Overlay_on_desktop/blob/main/.github/workflows/windows-x64.yml). Its three supplied native recordings cover Compact gaming, WASD + modifiers and Single row; four screenshots show tray, Appearance, Layout and Behavior controls. Poster frames were extracted from those recordings at two seconds and retain their intrinsic dimensions. The published [v0.1.0-preview.1 release](https://github.com/YiboMa2333/Input_Overlay_on_desktop/releases/tag/v0.1.0-preview.1) is labelled as a preview, without claiming stable-release readiness or independent validation of its binaries. CI behaviour is described from the workflow configuration; the portfolio checks do not build or test the native application.

Browser checks target Chromium at mobile (390px), tablet (820px) and desktop (1440px) widths. They cover the gallery and all seven detail routes with refresh, missing assets and console errors, keyboard card navigation, menu and skip-link use, copy success/failure, focused keyboard input, event stepping, disclosures, real Tetris media loading, the CV download, reduced motion, a single graphics canvas and fallback after context loss. Native email/telephone app launches and real LinkedIn sign-in are outside these local automated checks. Vite reports the Three.js graphics chunk above 500kB; it is only included on the home page and content/navigation do not depend on it.
