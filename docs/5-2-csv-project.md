---
layout: docs
title: "5.2. Project Columns"
parent: "5. Your Data"
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/your-data/csv-project/
---

# Project Columns

Complete reference for `project.csv` columns with bilingual column name support.

## Overview

Telar v0.6.0+ supports CSV columns in both English and Spanish. You can use either language consistently, mix them, or include dual headers for bilingual reference.

### Column Normalization

All column names are normalized during processing:
- Case-insensitive (`Title` = `title` = `TITLE`)
- Whitespace-trimmed
- Spanish names mapped to English equivalents
- Accented characters supported

### Dual Header Support

Include both English and Spanish headers for bilingual teams:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,colonial-textiles,Colonial Textiles,Weaving traditions,by Dr. Smith
2,textiles-coloniales,Textiles Coloniales,Tradiciones textiles,por Dra. García
```

Telar automatically detects and skips the second header row.

## Project CSV (project.csv / proyecto.csv)

Defines stories and their display order on the homepage.

**Location**: `components/structures/project.csv` or `components/structures/proyecto.csv`

### Columns

| English | Spanish | Required | Description |
|---------|---------|----------|-------------|
| `order` | `orden` | Yes | Display order on homepage (1, 2, 3...) |
| `story_id` | `id_historia` | No | Semantic identifier (e.g., `colonial-textiles`). If omitted, uses `story-{order}` |
| `title` | `titulo` | Yes | Story title shown on homepage and story page |
| `subtitle` | `subtitulo` | Yes | Brief description shown on story cards |
| `byline` | `firma` | No | Author attribution; supports markdown for links and formatting |
| `protected` | `protegida` | No | Set to `yes` to encrypt this story (requires `story_key` in config) |

### Example

**English:**
```csv
order,story_id,title,subtitle,byline,protected
1,colonial-textiles,Colonial Textiles,Weaving traditions of the Americas,by Dr. Jane Smith,
2,trade-routes,Trade Routes,Following the threads of commerce,based on [original research](https://example.com),yes
```

**Spanish:**
```csv
orden,id_historia,titulo,subtitulo,firma,protegida
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido de las Américas,por Dra. María García,
2,rutas-comerciales,Rutas Comerciales,Siguiendo los hilos del comercio,basado en [investigación original](https://ejemplo.com),si
```

### Field Notes

#### order
- Must be unique integers
- Determines card order on homepage
- Gaps allowed (1, 2, 5 works fine)
- Automatically renumbered if demo content is included

#### story_id
- **New in v0.6.0**
- Lowercase, hyphens, underscores only
- Used for: story CSV filename, story URL, internal references
- If omitted: defaults to `story-1`, `story-2`, etc. based on order
- Examples: `colonial-textiles`, `paisajes_coloniales`, `story-one`

#### title
- Displayed on homepage cards and story page headers
- No markdown processing (plain text only)
- Recommended: 2-6 words

#### subtitle
- Shown below title on homepage cards
- No markdown processing
- Recommended: 5-12 words
- Describes story content briefly

#### byline
- **Supports markdown** (v0.6.0+)
- Homepage: renders as plain text
- Story page: renders markdown links as clickable
- Common patterns:
  - `by Dr. Jane Smith`
  - `por María García y Juan López`
  - `based on [original research](https://example.com)`
  - `curated by *Digital Archive Project*`

#### protected
- **New in v0.8.0**
- Set to `yes` to encrypt the story during build
- Requires `story_key` in `_config.yml`
- Viewers access protected stories via `?key=your-key` URL parameter
- Leave empty or omit for public stories
- See [Private Stories](/docs/site-features/private-stories/) for details

### Column Aliases

| Normalized | Accepts |
|-----------|---------|
| `order` | `order`, `orden` |
| `story_id` | `story_id`, `id_historia` |
| `title` | `title`, `titulo` |
| `subtitle` | `subtitle`, `subtitulo` |
| `byline` | `byline`, `firma` |
| `protected` | `protected`, `protegida`, `private`, `privada` |

## See Also

- [Object Columns](/docs/your-data/csv-objects/) — Objects CSV column reference
- [Story Columns](/docs/your-data/csv-stories/) — Story step CSV columns
- [Glossary Columns](/docs/your-data/csv-glossary/) — Glossary CSV columns
- [Google Sheets](/docs/your-data/google-sheets/) — Managing data via Google Sheets
