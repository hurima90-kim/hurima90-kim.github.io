# Copilot / AI Agent Instructions for this repo

Short, actionable guidance to help an AI coding agent be productive in this Gatsby + TypeScript site.

- **Project type:** Gatsby v5 site using TypeScript (see [gatsby-config.ts](gatsby-config.ts)).
- **Entry points:** pages live under [src/pages](src/pages/index.tsx) and [src/pages/404.tsx].
- **Styling:** `styled-components` is used (see dependencies in [package.json](package.json)).
- **Image handling:** `gatsby-source-filesystem` is configured for `./src/images/` in [gatsby-config.ts](gatsby-config.ts).

Key developer workflows
- Start local dev server: `npm run develop` (aka `npm start`).
- Build production: `npm run build`.
- Preview a build locally: `npm run serve`.
- Clean caches: `npm run clean`.
- Typecheck only: `npm run typecheck` (runs `tsc --noEmit`).

Important repository patterns & conventions
- This is a minimal Gatsby TypeScript starter — prefer editing or adding React pages under `src/pages/` for route-driven pages.
- GraphQL type generation is enabled (`graphqlTypegen: true` in [gatsby-config.ts](gatsby-config.ts)). Use generated types in page queries when possible.
- Plugins are declared in [gatsby-config.ts](gatsby-config.ts). When adding data sources, update `plugins` and run a full `npm run develop` after `gatsby clean` if schema changes.
- Styling and components: project uses `styled-components` + `gatsby-plugin-styled-components`. Use that pattern for shared components.

Integration points & external dependencies
- Contentful: `gatsby-source-contentful` is configured in [gatsby-config.ts](gatsby-config.ts) with `spaceId` and `accessToken` present. Treat these as secrets — avoid committing new secrets; if you must change them, prefer environment variables and `.env` (Gatsby env pattern).
- Gatsby image processing: `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp` are present — use Gatsby Image components for optimized images.

Agent-specific guidance (what you can/should do)
- When modifying site config, update [gatsby-config.ts](gatsby-config.ts) and note plugin order matters for some transformers.
- For content/data work: inspect the Contentful config in [gatsby-config.ts](gatsby-config.ts) and verify queries via GraphiQL at `http://localhost:8000/___graphql`.
- If introducing new npm packages, add to `dependencies` in [package.json](package.json) and prefer versions compatible with Gatsby v5 / React 18.
- If you update TypeScript code, run `npm run typecheck` and ensure no `tsc` errors; run `npm run develop` to validate runtime behavior.

Files to inspect when making changes
- Site config and plugins: [gatsby-config.ts](gatsby-config.ts)
- Project scripts & deps: [package.json](package.json)
- Page examples: [src/pages/index.tsx](src/pages/index.tsx), [src/pages/404.tsx](src/pages/404.tsx)

Notes and cautions
- No tests or CI config detected — changes will not be auto-verified here.
- A Contentful access token is currently in `gatsby-config.ts`; consider migrating to environment variables and adding a `.env` pattern. Do not publish new secrets.

If anything above is unclear or you want this extended (e.g., add examples for common code edits, or a PR checklist), tell me which areas to expand.
