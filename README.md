# Telar Documentation

Official documentation site for [Telar](https://github.com/UCSB-AMPLab/telar), a minimal-computing framework for creating layered IIIF visual narratives for digital scholarship, public exhibitions, community storytelling, and classroom projects.

## About

This is a bilingual (English/Spanish) documentation site built with Jekyll using a custom docs theme with [Pagefind](https://pagefind.app/) search.

## Local Development

### Prerequisites

- Ruby 3.0+
- Bundler
- Node.js (for Pagefind search indexing)

### Basic Setup (without search)

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# View at http://localhost:4000
```

### With Search

Pagefind requires a two-step process (can't use `jekyll serve` as it overwrites the search index):

```bash
# Build Jekyll site
bundle exec jekyll build

# Build search index and serve
npx pagefind --site _site --serve

# View at http://localhost:1414
```

For regular development without search, use `jekyll serve`. Search is automatically built during GitHub Actions deployment.

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

## Credits

Telar is developed by Adelaida Ávila, Juan Cobo Betancourt, Natalie Cobo, Santiago Muñoz, and students and scholars at the [UCSB Archives, Memory, and Preservation Lab](https://ampl.clair.ucsb.edu), the UT Archives, Mapping, and Preservation Lab, and [Neogranadina](https://neogranadina.org).

We gratefully acknowledge the support of the [Caribbean Digital Scholarship Collective](https://cdscollective.org), the [Center for Innovative Teaching, Research, and Learning (CITRAL)](https://citral.ucsb.edu/home) at the University of California, Santa Barbara, the [UCSB Library](https://library.ucsb.edu), the [Routes of Enslavement in the Americas University of California MRPI](https://www.humanities.uci.edu/routes-enslavement-americas), and the [Department of History of The University of Texas at Austin](https://liberalarts.utexas.edu/history/).

Telar is built with:
- [Jekyll](https://jekyllrb.com/) - Static site generator
- [UniversalViewer](https://universalviewer.io/) - IIIF viewer
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [iiif-static](https://github.com/bodleian/iiif-static-choices) - IIIF tile generator

It is based on [Paisajes Coloniales](https://paisajescoloniales.com/), and inspired by:
- [Wax](https://minicomp.github.io/wax/) - Minimal computing for digital exhibitions
- [CollectionBuilder](https://collectionbuilder.github.io/) - Static digital collections
