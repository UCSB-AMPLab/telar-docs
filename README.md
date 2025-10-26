# Telar Documentation

Official documentation site for [Telar](https://github.com/UCSB-AMPLab/telar), a minimal computing framework for creating visual narrative exhibitions with IIIF images and scrollytelling.

## About

This is a bilingual (English/Spanish) documentation site built with Jekyll and the just-the-docs theme.

## Local Development

### Prerequisites

- Ruby 3.0+
- Bundler

### Setup

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# View at http://localhost:4000
```

## Bilingual Structure

This site uses a manual bilingual approach without plugins:

- **English pages**: Standard `.md` files (e.g., `docs/1-getting-started.md`)
- **Spanish pages**: `.es.md` extension (e.g., `docs/1-getting-started.es.md`)
- **URL structure**:
  - English: `/`, `/about/`, `/docs/...`
  - Spanish: `/es/`, `/acerca-de/`, `/documentacion/...`

### Adding Content

1. Create English page: `docs/new-page.md`
2. Add frontmatter with `lang: en` and `permalink:`
3. Create Spanish version: `docs/new-page.es.md`
4. Add frontmatter with `lang: es` and Spanish `permalink:`

### Navigation

The custom navigation (`_includes/components/site_nav.html`) groups pages by language, showing:
- English section with English pages
- Español section with Spanish pages

The language switcher appears at the top-right of each page.

## Customization

- **Theme styles**: `_sass/custom/custom.scss`
- **Logo**: `images/telar.png` (placeholder - replace with final logo)
- **Site config**: `_config.yml`
