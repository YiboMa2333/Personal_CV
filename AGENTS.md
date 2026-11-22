# Repository guidance

## Project purpose

Build Yibo Ma’s engineering portfolio for software engineering applications.

Prioritise project contributions, technical reasoning and demonstrated results. Make the website visually engaging, easy to navigate and straightforward to maintain.

## Sources of truth

- Use the latest user-designated CV in `reference/` as the primary content source.
- Use supplied project briefs to explain architecture and planned work.
- Preserve the distinction between completed features and ongoing development.
- Verify repository links and technical claims before adding them.
- Ask when sources materially conflict.
- Never invent achievements, metrics, employment, proficiency ratings or project outcomes.
- Clearly label simulated demos and illustrative data.
- Keep private reference documents outside the public build output.

## Technology

- Use Astro with static output and strict TypeScript.
- Use semantic HTML, modern CSS, Three.js and Motion.
- Use npm and commit the lockfile.
- Prefer existing dependencies and native browser capabilities.
- Add dependencies only when they serve a concrete requirement.
- Consult current official documentation when API behaviour is uncertain.
- Keep browser-only code safe during static builds.

## Structure and content

- Keep contact details, navigation and project content in a shared typed data layer.
- Reuse layouts, navigation, footers and project components.
- Preserve the requested routes and page grouping.
- Include Contact Information on its own page and in every page footer.
- Keep project dates hidden unless the user requests them.
- Use professional British English.
- Correct spelling and grammar while preserving factual meaning.

## Visual design

- Follow the established typography, palette and spacing variables.
- Use motion to explain relationships, reveal content and respond to interaction.
- Keep text readable throughout animations.
- Make projects visually distinctive within a consistent layout.
- Use genuine project assets where available and permitted.
- Record external asset attribution where required.
- Avoid decorative numbering, filler copy and invented skill scores.

## Accessibility

- Support keyboard navigation and visible focus indicators.
- Use links for navigation and buttons for actions.
- Give interactive controls accessible names.
- Support touch interactions alongside pointer interactions.
- Respect `prefers-reduced-motion`.
- Hide decorative graphics from assistive technology.
- Keep core content and navigation usable if graphics fail.
- Check contrast and responsive text sizing.

## Graphics and performance

- Keep graphics code isolated from content rendering.
- Avoid state updates on every pointer event.
- Use animation frames and interpolated pointer values.
- Limit device pixel ratio and scale graphics complexity.
- Pause animation when the page is hidden or the visual is offscreen.
- Clean up listeners, observers, timers and graphics resources.
- Avoid unnecessary WebGL contexts.
- Provide a static fallback for graphics failure.
- Keep navigation available while visual effects initialise.
- Never autoplay sound.

## Implementation discipline

- Inspect the repository and relevant existing code before editing.
- Preserve user changes and unrelated functionality.
- Prefer focused, readable changes.
- Avoid unused helpers, unnecessary abstractions and formatting churn.
- Do not commit credentials or secrets.
- Expose only deliberately public assets.
- Keep documentation aligned with actual commands and behaviour.

## Verification

- Run the available type checks and production build.
- Test changed interactions through their normal entry points.
- Verify direct route access and page refresh.
- Check desktop and mobile layouts.
- Check keyboard and reduced-motion behaviour.
- Verify contact links, downloads and project links.
- Add targeted tests for meaningful regressions.
- Fix observed failures before declaring completion.
- Report any verification that could not be performed.
- Never claim a check passed without running it.

## Git and deployment

- Work within the current repository.
- Inspect the working tree before making changes.
- Never overwrite unrelated user edits.
- Avoid destructive Git commands.
- Follow the user’s instructions for commits and pushes.
- Prepare the static site for GitHub Pages under `/Personal_CV/` using GitHub Actions.
- Use `npm run build` and the `dist` output directory.
- Publish or change hosting settings only when authorised.

## Completion report

Summarise:
- What changed.
- Which checks ran and their results.
- Any remaining content gaps or verification limits.
- Any action the user needs to take.
