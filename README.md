# Telar project website

The bilingual documentation and project website for [Telar](https://telar.org), built with Hugo Extended and Pagefind. This repository publishes the manuals, exhibition-planning guides, teaching resources, showcase and landing pages. Telar exhibitions themselves still use the separate Telar framework and its Jekyll build.

## Install and preview

Requires Node.js 22 or later. Regression checks additionally use Python 3, with no Python packages required.

```sh
npm ci
npm run build:preview
npm run preview
```

Open <http://127.0.0.1:4004/> for English, <http://127.0.0.1:4004/es/> for Spanish, or `/docs/` and `/guia/` for the guides. Existing `?lang=en` and `?lang=es` homepage links forward to the appropriate language's canonical homepage.

For live content/layout rebuilding, run `npm run dev` after the initial preview build. Rebuild with `npm run build:preview` after content changes when checking search results: Pagefind indexes the generated HTML.

### Previewing forms and the showcase

The production site uses the separate `telar-showcase` Cloudflare Worker. The local preview points both forms and the gallery to port 8790 instead. To run the local integration harness, use a checkout of that Worker containing the teaching-request endpoint and its installed dependencies:

```sh
node scripts/preview-api.mjs --worker /path/to/telar-showcase
```

The harness copies only Worker source and migrations into a temporary directory, creates a separate local database, loads a public showcase fixture and uses Cloudflare's test Turnstile keys. It does not copy credentials, notification destinations or existing records. Submitted test data remains in that temporary database; Slack delivery is disabled. Stop the API with Ctrl-C. The temporary path is printed at startup.

The pages can be browsed without this API. Forms then show their existing connection error; the gallery shows its existing fallback. Production service configuration is in `hugo.json`, and local overrides are in `hugo.preview.json`.

## Edit the site

- `content/en/` and `content/es/` contain the content. Paths mirror the published routes. An `_index.md` is a page that also has child pages.
- Each page's `url` retains its published address. Keep its `translationKey` aligned with its counterpart; Hugo supplies the translation links.
- `data/guides.json` contains shared guide/quick-guide copy. `data/docs_navigation.json` controls the editorial grouping and order. Page titles and translation pairing live in front matter rather than a second page registry.
- `data/teaching_contact.json` contains the approved teaching form copy. `data/docs_media.json` supplies screenshot captions and optional animations.
- `layouts/_partials/docs-shell.html`, `section-shell.html` and `home.html` are the three shared page shells. Metadata lives in `meta.html`.
- `layouts/_shortcodes/` contains media, callout, diagram and shared-content components. Larger interactive tools use source templates in `layouts/_partials/pages/`.
- `static/` contains the existing styles, browser scripts and media. Hugo does not rewrite Telar framework examples in the documentation.

Preserve explicit heading IDs and alias spans when changing headings. They keep existing links and workshop references working. The approved design and wording carry over; the remaining Spanish editorial review is a separate task.

## Build and verify

```sh
npm run build
npm test
```

The production build writes `public/` and indexes the guides in English and Spanish. The test command checks the migrated route inventory, legacy anchors, headings, code examples, tables, callouts, images, metadata, translation links and internal link targets. It also rejects prototype dependencies and local runtime URLs in production HTML. Results are written to the ignored `reports/` directory.

After an approved change to a heading or code example, update that page's entry in `migration/content-contracts.json` as part of the same edit. Retain the old anchor IDs as aliases. Ordinary prose changes do not require changing the heading/code contracts.

`migration/inventory.json` records the original source file and native Hugo destination for each migrated page. `migration/content-contracts.json` records the baseline rendering contracts. These are regression evidence, not generated page bodies.

The Pages workflow builds and tests pull requests. Its deployment job runs only for `main`, after the checks pass. The deployment artifact is `public/`; source files, local fixtures and migration records are not published.

See [MIGRATION.md](MIGRATION.md) for migration scope, validation and the remaining release steps.
