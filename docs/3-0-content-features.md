---
layout: docs
title: 3. Content & Features
parent: Documentation
nav_order: 3
has_children: true
lang: en
permalink: /docs/content-structure/
---

# Content & Features

Telar uses a **components-based architecture** that separates your source content from generated files.

## Components Folder

The `components/` folder contains all editable source content:

```
components/
├── structures/           # CSV files with organizational data
│   ├── project.csv       # Story list and display order
│   ├── objects.csv       # Object catalog metadata
│   ├── your-story.csv    # Story steps with coordinates
│   ├── glossary.csv      # Glossary terms (optional)
│   └── story-1.csv       # Additional stories
├── images/               # All images (IIIF source and additional)
└── texts/
    ├── stories/          # Markdown files for story panels
    │   └── your-story/
    │       ├── step1-layer1.md
    │       └── step1-layer2.md
    ├── pages/            # Custom pages (about, credits, etc.)
    │   ├── about.md
    │   └── credits.md
    └── glossary/         # Glossary definitions (legacy markdown format)
        └── term.md
```

### Key Principles

- **CSV files** define structure — what stories exist, what objects they use, where to zoom
- **Markdown files** contain extended narrative content for story panels, custom pages, and glossary definitions
- **Images** in `components/images/` are processed into IIIF tiles automatically for objects listed in `objects.csv`

## Content Types

### Objects

Objects are the visual items your stories explore — images, maps, documents, photographs. Define them in `objects.csv` with metadata like title, creator, year, and description. Objects appear in a browsable gallery with search and filtering.

See [Objects & Gallery](/docs/content-structure/objects-gallery/).

### Stories

Stories are step-by-step narratives built around your objects. Each step zooms into a specific region of an image and presents a question with expandable detail panels. Define story steps in individual CSV files (one per story).

See [Stories & Panels](/docs/content-structure/stories-panels/).

### Rich Content with Markdown

Enhance story panels with markdown files when you need longer narratives, interactive widgets, embedded media, or reusable content across stories.

See [Rich Content with Markdown](/docs/content-structure/rich-content/).

### Widgets

Stories can be encrypted so that only viewers with the correct key can access them. Useful for work-in-progress content, classroom materials, or restricted access.

See [Private Stories](/docs/content-structure/private-stories/).

### Widgets

Enrich story panels and custom pages with interactive elements: image carousels, tabbed content panels, and collapsible accordion sections.

See [Widgets](/docs/content-structure/widgets/).

### Glossary

Define terms that viewers can look up from within stories. Glossary links open a slide-over panel without interrupting the narrative. Define terms in a CSV file or as individual markdown files.

See [Glossary](/docs/content-structure/glossary/).

### Custom Pages

Create standalone pages for content outside the story structure — about pages, credits, methodology, bibliographies. Custom pages support full markdown formatting and widgets.

See [Custom Pages](/docs/content-structure/custom-pages/).

## Bilingual CSV Support

All CSV files support column names in both English and Spanish. You can use either language consistently, mix them, or include dual headers for bilingual teams:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,colonial-textiles,Colonial Textiles,Weaving traditions,by Dr. Jane Smith
```

Telar automatically detects and skips the second header row. Spanish file names (`proyecto.csv`, `objetos.csv`) are also supported.

See the CSV reference pages for complete column name mappings: [Project & Objects](/docs/reference/csv-project-objects/), [Stories & Glossary](/docs/reference/csv-stories-glossary/).

## Generated Files

During build, Telar generates working files in `_jekyll-files/`:

- `_jekyll-files/_stories/` — Story pages
- `_jekyll-files/_objects/` — Object pages
- `_jekyll-files/_glossary/` — Glossary entries

{: .warning }
> Files in `_jekyll-files/` are auto-generated. Always edit source files in `components/` instead.

## Google Sheets Integration

When using Google Sheets, your CSV data is managed in a spreadsheet and fetched automatically during build — no manual CSV editing needed. See [Google Sheets Reference](/docs/reference/google-sheets/) for setup.
