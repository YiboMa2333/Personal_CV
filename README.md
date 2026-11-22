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

A deliberately public, unchanged copy is available at [public/downloads/Yibo_Ma_CV.docx](public/downloads/Yibo_Ma_CV.docx), linked from Home and Contact Information. Its original wording is preserved; the web presentation follows the content rules above. No PDF is supplied or generated. When replacing the CV, update both the private reference and deliberate public download, reconcile typed content, then rerun checks. The production domain remains unknown, so canonical URLs and a sitemap remain unset.

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

Asset resolution and image optimisation live in [src/data/media.ts](src/data/media.ts). Media is displayed in record order; adding a file alone does not add it to a page. Images retain their intrinsic dimensions, are lazy-loaded and use high-quality WebP (PNG diagrams use quality 100; photographs use quality 90). The original full-resolution file is retained for the enlarged viewer. Videos reserve their recorded aspect ratio, show a static poster and use native controls with `preload="none"`. Playback starts only after user interaction; starting another video, opening an enlarged image, hiding the tab or leaving the page pauses playback. Reduced motion does not prevent deliberate playback.

The image viewer uses native `<dialog>` for focus trapping and Escape dismissal, restores focus to the opening button, and provides a keyboard-scrollable full-resolution image. With JavaScript disabled, original-image links are available below the thumbnails. A `notes.md` may record proposed captions or attribution but is not parsed automatically. No project source links are invented; Tetris links to its public gameplay-demo repository, where coursework source is intentionally unavailable.

## Cloudflare Pages

1. Commit the source and `package-lock.json`, then push to your GitHub repository when ready.
2. Connect the repository to Cloudflare Pages.
3. Set production branch `main`, build command `npm run build`, output directory `dist`, and Node version `24` (also declared in `.node-version`).
4. Deploy through Cloudflare. This project needs no adapter, functions, credentials or runtime bindings.

Do not use SPA redirects: Astro emits a separate HTML file for every route, allowing direct access and refresh. No canonical domain or sitemap is configured until the production URL is known. Nothing is published by local build commands.

## Design and API references

Original code-drawn diagrams use no Lusion assets. [Lusion](https://lusion.co/) informed the interaction direction. Implementation references: [Astro islands](https://docs.astro.build/en/concepts/islands/), [Astro TypeScript](https://docs.astro.build/en/guides/typescript/), [Three.js](https://threejs.org/docs/), [Motion JavaScript](https://motion.dev/docs/quick-start), [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), and [Cloudflare Astro deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

The public READMEs of the [document matcher](https://github.com/YiboMa2333/Language-Model-Based-Label-and-Value-Matcher), [Input Overlay Desktop](https://github.com/YiboMa2333/Input_Overlay_on_desktop) and [Tetris AI](https://github.com/YiboMa2333/TetrisAI) were reviewed. Tetris provides a gameplay video, not assessed coursework source. Input Overlay is an independent adaptation of [univrsal/input-overlay](https://github.com/univrsal/input-overlay), with its GPL-2.0-only status documented upstream; no upstream code or assets are bundled here. Document-matcher sample company records are not public and are not included.

Browser checks target Chromium at mobile (390px), tablet (820px) and desktop (1440px) widths. They cover the gallery and all seven detail routes with refresh, missing assets and console errors, keyboard card navigation, menu and skip-link use, copy success/failure, focused keyboard input, event stepping, disclosures, real Tetris media loading, the CV download, reduced motion, a single graphics canvas and fallback after context loss. Native email/telephone app launches and real LinkedIn sign-in are outside these local automated checks. Vite reports the Three.js graphics chunk above 500kB; it is only included on the home page and content/navigation do not depend on it.
