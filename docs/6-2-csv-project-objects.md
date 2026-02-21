---
layout: docs
title: "6.2. CSV Reference: Project & Objects"
parent: 6. Reference
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/reference/csv-project-objects/
---

# CSV Reference: Project & Objects

Complete reference for project.csv and objects.csv columns with bilingual column name support.

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
- See [Private Stories](/docs/content-structure/private-stories/) for details

### Project CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `order` | `order`, `orden` |
| `story_id` | `story_id`, `id_historia` |
| `title` | `title`, `titulo` |
| `subtitle` | `subtitle`, `subtitulo` |
| `byline` | `byline`, `firma` |
| `protected` | `protected`, `protegida`, `private`, `privada` |

## Objects CSV (objects.csv / objetos.csv)

Catalogs all objects used in stories and displayed in the gallery.

**Location**: `components/structures/objects.csv` or `components/structures/objetos.csv`

### Columns

| English | Spanish | Required | Description |
|---------|---------|----------|-------------|
| `object_id` | `id_objeto` | Yes | Unique identifier (lowercase, hyphens, underscores) |
| `title` | `titulo` | Yes | Object title |
| `description` | `descripcion` | No | Long-form description (markdown supported) |
| `source_url` | `url_fuente` | No | IIIF image info.json or manifest URL |
| `creator` | `creador` | No | Creator or artist name |
| `period` | `periodo` | No | Historical period |
| `year` | `año` | No | Year created or dated (used for gallery sorting) |
| `medium` | `medio` | No | Material or medium |
| `dimensions` | `dimensiones` | No | Physical dimensions |
| `source` | `fuente` | No | Location or repository (renamed from `location` in v0.8.0) |
| `credit` | `credito` | No | Attribution or credit line |
| `thumbnail` | `miniatura` | No | Path to thumbnail image |
| `object_type` | `tipo_objeto` | No | Object classification (used for gallery filter) |
| `subjects` | `temas` | No | Topical subjects, comma-separated (used for gallery filter) |
| `featured` | `destacado` | No | Set to `yes` to feature on homepage |

### Example

**English:**
```csv
object_id,title,description,creator,year,object_type,subjects,source,credit,featured,source_url
textile-001,Colonial Textile,A woven fragment showing complex patterns...,Unknown,1650,textile,"weaving, colonial",National Museum,Public Domain,yes,
map-lima,Map of Lima,Early colonial map showing city layout,Juan de Cuellar,1685,map,"cartography, Lima",British Library,,no,https://example.org/iiif/map/info.json
```

**Spanish:**
```csv
id_objeto,titulo,descripcion,creador,año,tipo_objeto,temas,fuente,credito,destacado,url_fuente
textil-001,Textil Colonial,Un fragmento tejido con patrones complejos...,Desconocido,1650,textil,"tejido, colonial",Museo Nacional,Dominio Público,si,
mapa-lima,Mapa de Lima,Mapa colonial temprano...,Juan de Cuellar,1685,mapa,"cartografía, Lima",Biblioteca Británica,,no,https://ejemplo.org/iiif/mapa/info.json
```

### Field Notes

#### object_id / id_objeto
- Unique across all objects
- Referenced in story CSVs
- Used in URLs: `/objects/{object_id}/`
- Format: lowercase, hyphens, underscores

#### description / descripcion
- Markdown supported
- Displayed on object pages
- Can include headings, lists, links, emphasis

#### source_url / url_fuente
- URL to IIIF Image API info.json or IIIF Presentation API manifest
- Use for objects from external IIIF servers
- Leave empty for self-hosted images (tiles generated automatically)
- **v0.5.0+**: Preferred over the legacy `iiif_manifest` column (which still works)

#### year / año
- **New in v0.8.0**
- Used for sorting objects in the gallery (sort by year)
- Flexible format: `1650`, `1685`, `1750`
- Accepts `año` or `ano` (without tilde) as Spanish aliases

#### source / fuente
- **Renamed in v0.8.0** from `location`
- Current location or holding repository
- The old column name `location` (and Spanish aliases `ubicacion`, `locacion`) still works for backward compatibility

#### object_type / tipo_objeto
- **New in v0.8.0**
- Object classification used as a facet in the gallery filter sidebar
- Examples: `map`, `textile`, `photograph`, `painting`
- Appears as a filter category when `browse_and_search: true`

#### subjects / temas
- **New in v0.8.0**
- Comma-separated topical subjects used as facets in the gallery filter sidebar
- Examples: `"weaving, colonial, textiles"`, `"cartography, Lima, urban planning"`
- Also accepts Spanish aliases: `materias`, `materia`

#### featured / destacado
- **New in v0.8.0**
- Set to `yes` to feature this object on the homepage
- Featured objects are prioritized when `show_sample_on_homepage: true` in config
- The number shown is controlled by `featured_count` (default: 4)

#### credit / credito
- Displayed as badge in top-right corner of object images (if `show_object_credits: true`)
- Also shown in metadata table
- Use for attribution: `Public Domain`, `CC BY 4.0`, `Courtesy of National Archive`

#### thumbnail / miniatura
- Path to a thumbnail image file
- Relative to the repository root
- If omitted, Telar generates thumbnails from the IIIF source

### Objects CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `object_id` | `object_id`, `id_objeto`, `objeto`, `object`, `id` |
| `title` | `title`, `titulo` |
| `description` | `description`, `descripcion` |
| `creator` | `creator`, `creador` |
| `period` | `period`, `periodo` |
| `year` | `year`, `año`, `ano` |
| `medium` | `medium`, `medio` |
| `dimensions` | `dimensions`, `dimensiones` |
| `source` | `source`, `fuente`, `location`, `ubicacion` |
| `credit` | `credit`, `credito` |
| `thumbnail` | `thumbnail`, `miniatura` |
| `object_type` | `object_type`, `tipo_objeto` |
| `subjects` | `subjects`, `temas`, `materias`, `materia` |
| `featured` | `featured`, `destacado` |
| `source_url` | `source_url`, `url_fuente` |
| `iiif_manifest` | `iiif_manifest`, `manifiesto_iiif` (legacy) |

## Best Practices

### Choosing Column Names

**Monolingual sites**: Use your preferred language consistently
```csv
# English site
order,story_id,title,subtitle,byline

# Spanish site
orden,id_historia,titulo,subtitulo,firma
```

**Bilingual teams**: Use dual headers
```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
```

### File Organization

```
components/structures/
├── project.csv              # Story metadata
├── objects.csv              # Object catalog
├── colonial-textiles.csv    # Story steps (using story_id)
├── trade-routes.csv         # Another story
└── glossary.csv             # Glossary terms (optional)
```

### Gallery Metadata Tips

For the best gallery experience with browse, search, and filter:

1. **Fill in `object_type`** for every object — this powers the type filter
2. **Add `subjects`** with 2-4 comma-separated terms — this powers the subjects filter
3. **Include `year`** for chronological sorting
4. **Mark 4-6 objects as `featured: yes`** for the homepage sample
5. **Write meaningful `description` fields** — the search indexes these for full-text search

## Migration from v0.7.x to v0.8.0

### New columns (optional)

Add these to your objects.csv if you want gallery filtering and sorting:

| Column | Purpose |
|--------|---------|
| `year` | Enables sort-by-year in gallery |
| `object_type` | Enables type filter in sidebar |
| `subjects` | Enables subjects filter in sidebar |
| `featured` | Controls homepage object sample |

### Renamed columns

| Old (v0.7.x) | New (v0.8.0) | Notes |
|---------------|-------------|-------|
| `location` | `source` | Old name still works |

### New project.csv column

| Column | Purpose |
|--------|---------|
| `protected` | Marks stories for encryption (requires `story_key` in config) |

**No breaking changes.** All v0.7.x CSVs work without modification.

## Validation

Telar validates CSV data during build:

**Errors (build fails)**:
- Missing required columns (`object_id`, `title` for objects; `order`, `title` for project)
- Duplicate `object_id` values

**Warnings (build succeeds)**:
- Missing optional columns
- Empty descriptions
- Unrecognized column names (ignored)
- Missing thumbnails

Check build output for validation messages.

## See Also

- [CSV Reference: Stories & Glossary](/docs/reference/csv-stories-glossary/) — Story step columns and glossary CSV
- [Content Structure](/docs/content-structure/) — Overview of content organization
- [Objects & Gallery](/docs/content-structure/objects-gallery/) — Gallery browse, search, and filter features
- [Configuration](/docs/reference/configuration/) — Collection interface settings
