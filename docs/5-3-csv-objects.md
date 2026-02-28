---
layout: docs
title: "5.3. Object Columns"
parent: "5. Your Data"
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/your-data/csv-objects/
---

# Object Columns

Complete reference for `objects.csv` columns with bilingual column name support. For column normalization and dual header support, see [Project Columns](/docs/your-data/csv-project/#overview).

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

### Column Aliases

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

## Gallery Metadata Tips

For the best gallery experience with browse, search, and filter:

1. **Fill in `object_type`** for every object — this powers the type filter
2. **Add `subjects`** with 2-4 comma-separated terms — this powers the subjects filter
3. **Include `year`** for chronological sorting
4. **Mark 4-6 objects as `featured: yes`** for the homepage sample
5. **Write meaningful `description` fields** — the search indexes these for full-text search

## File Organization

```
components/structures/
├── project.csv              # Story metadata
├── objects.csv              # Object catalog
├── colonial-textiles.csv    # Story steps (using story_id)
├── trade-routes.csv         # Another story
└── glossary.csv             # Glossary terms (optional)
```

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

**No breaking changes.** All v0.7.x CSVs work without modification.

## Validation

Telar validates object CSV data during build:

**Errors (build fails)**:
- Missing required columns (`object_id`, `title`)
- Duplicate `object_id` values

**Warnings (build succeeds)**:
- Missing optional columns
- Empty descriptions
- Unrecognized column names (ignored)
- Missing thumbnails

Check build output for validation messages.

## See Also

- [Project Columns](/docs/your-data/csv-project/) — Project CSV column reference
- [Story Columns](/docs/your-data/csv-stories/) — Story step CSV columns
- [Objects](/docs/your-content/objects/) — Defining objects and object pages
- [Objects Gallery](/docs/site-features/objects-gallery/) — Gallery browse, search, and filter
- [Configuration Reference](/docs/configure/configuration/) — Collection interface settings
