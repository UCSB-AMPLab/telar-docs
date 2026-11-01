# Telar project website

The bilingual Telar documentation and project site, built with Hugo Extended and Pagefind. Exhibition sites continue to use the separate Telar framework.

## Build and preview

Requires Node.js 22 or later.

```sh
npm ci
npm run build
```

For local work:

```sh
npm run build:preview
npm run preview
```

The local site is at http://127.0.0.1:4004/. English and Spanish guides are at `/docs/` and `/guia/`; language homepages are `/` and `/es/`. Existing homepage query links continue to work.

Content lives in `content/en/` and `content/es/`. Keep the published `url`, paired `translationKey`, heading IDs and alias spans when editing. Shared copy, editorial navigation and media descriptions live in `data/`. Native layouts and shortcodes live in `layouts/`, with public assets in `static/`.
