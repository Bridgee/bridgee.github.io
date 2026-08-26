# Zhouqiao (Bridge) Zhao — Personal Website

Source for [bridgee.github.io](https://bridgee.github.io), the personal academic and creative website of Zhouqiao (Bridge) Zhao, Assistant Professor of Electrical and Computer Engineering at Loyola Marymount University and lead of the HAITS Lab.

The site has two connected experiences:

- **Portfolio Mode** presents the academic profile, HAITS Lab, research agenda, publications, projects, photography, and music.
- **Interactive Mode** presents the same core content as an explorable 8-bit world.

Both modes are generated from shared content modules so identity and research updates remain consistent across the site.

## Local setup

The repository is pinned to Node.js 24.19.0 in `.nvmrc`. Node 22.12 or newer is supported.

```bash
nvm install
nvm use
npm ci
npm run validate
npm run dev
```

Useful commands:

```bash
npm run check     # Astro and TypeScript diagnostics
npm run build     # Production build in dist/
npm run preview   # Preview the production build
npm run validate  # Check, then build
```

To check the live status of every external URL rendered by the production build:

```bash
npm run build
npm run validate:external
```

The external check is intentionally separate because third-party login walls, bot protection, and rate limits can make network results inconclusive even when a link works in a browser.

Astro telemetry can be disabled in restricted environments with `ASTRO_TELEMETRY_DISABLED=1`.

## Content architecture

- `docs/MAINTENANCE_CONTEXT.md` — consolidated career timeline, HAITS identity, research agenda, and wording rules
- `docs/CONTENT_SOURCE_AUDIT.md` — cross-source fact reconciliation, external-profile drift, and link-review decisions
- `src/data/content/personal.js` — current role, contact details, institutional links, CV, photography, and music
- `src/data/content/research.js` — HAITS research agenda and multi-scale research chain
- `src/data/content/publications.js` — selected publications shown in both site modes
- `src/data/content/projects.js` — detailed research project records
- `src/data/config/modes.js` — labels, routes, icons, and descriptions for the two site presentations
- `src/data/config/game.js` — Interactive Mode areas and NPC dialogue
- `src/pages/blog.astro` — Portfolio Mode narrative and section structure
- `src/layouts/BlogLayout.astro` — shared academic header, contact links, metadata, and footer
- `public/doc/Zhouqiao_Zhao_CV.pdf` — stable public path for the current CV

The research project archive intentionally preserves historical MIT and UC Riverside affiliations where they describe work completed at those institutions.

## Deployment

GitHub Pages serves the generated site from the `gh-pages` branch. The `main` branch contains source code.

Deployment changes remote state and should be run intentionally only after review:

```bash
npm run validate
npm run deploy
```

`deploy-script.js` builds the site and publishes `dist/` with the local `gh-pages` dependency. It is cross-platform and does not use the former Windows-only `rmdir` or `xcopy` workflow.

## Workspace migration note

`/Users/zzhao11/Workspace/website` is the maintained working copy. During the August 2026 migration, it was compared with the former OneDrive copy. Their tracked content matched; the apparent differences were CRLF line endings and ignored build/dependency caches in OneDrive.
