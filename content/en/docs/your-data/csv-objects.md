---
title: Object Columns
url: /docs/your-data/csv-objects/
translationKey: docs-your-data-csv-objects
type: guide
docs_section: reference
---

# Object Columns {#object-columns}

Complete reference for `objects.csv` columns with bilingual column name support. For column normalization and dual header support, see [Project Columns](/docs/your-data/csv-project/#overview).

## Objects CSV (objects.csv / objetos.csv) {#objects-csv-objectscsv--objetoscsv}

Catalogs all objects used in stories and displayed in the gallery.

**Location**: `telar-content/spreadsheets/objects.csv` or `telar-content/spreadsheets/objetos.csv`

{{< callout "tip" >}}
If you use the [Compositor](/docs/the-compositor/objects/), it manages `objects.csv` visually — you don't need to edit this file directly.
{{< /callout >}}

### Columns {#columns}

| English | Spanish | Required | Description |
|---------|---------|----------|-------------|
| `object_id` | `id_objeto` | Yes | Unique identifier (lowercase, hyphens, underscores) |
| `title` | `titulo` | Yes | Object title |
| `description` | `descripcion` | No | Long-form description (markdown supported) |
| `source_url` | `url_fuente` | No | IIIF image info.json or manifest URL |
| `creator` | `creador` | No | Creator or artist name |
| `period` | `periodo` | No | Historical period |
| `year` | `año` | No | Year created or dated (used for gallery sorting) |
| `medium` | `medio_genero` | No | Genre or medium of the object (e.g., "Photograph", "Oil painting") |
| `dimensions` | `dimensiones` | No | Physical dimensions |
| `source` | `fuente` | No | Location or repository (renamed from `location` in v0.8.0) |
| `credit` | `credito` | No | Attribution or credit line |
| `thumbnail` | `miniatura` | No | Path to thumbnail image |
| `alt_text` | `texto_alt` | No | Alt text for accessibility (falls back to `title` if empty) |
| `object_type` | `tipo_objeto` | No | Object classification (used for gallery filter) |
| `subjects` | `temas` | No | Topical subjects, comma-separated (used for gallery filter) |
| `featured` | `destacado` | No | Set to `yes` to feature on homepage |

### Custom metadata columns {#custom-metadata-columns}

Any columns you add beyond the 16 standard columns listed above are automatically displayed on object pages as additional metadata fields. The column name becomes the label and the cell value becomes the displayed text.

For example, adding `material` and `technique` columns to your spreadsheet:

```csv
object_id,title,material,technique
textile-001,Colonial Textile,Cotton and wool blend,Backstrap loom weaving
```

The values "Cotton and wool blend" and "Backstrap loom weaving" appear as extra metadata on the object page, labeled "material" and "technique" respectively.

### Example {#example}

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

### Field Notes {#field-notes}

#### object_id / id_objeto {#object_id--id_objeto}
- Unique across all objects
- Referenced in story CSVs
- Used in URLs: `/objects/{object_id}/`
- Format: lowercase, hyphens, underscores

#### description / descripcion {#description--descripcion}
- Markdown supported
- Displayed on object pages
- Can include headings, lists, links, emphasis

#### source_url / url_fuente {#source_url--url_fuente}
- URL to IIIF Image API info.json or IIIF Presentation API manifest
- Use for objects from external IIIF servers
- Leave empty for self-hosted images (tiles generated automatically)
- **v0.5.0+**: Preferred over the legacy `iiif_manifest` column (which still works)

#### year / año {#year--año}
- **New in v0.8.0**
- Used for sorting objects in the gallery (sort by year)
- Flexible format: `1650`, `1685`, `1750`
- Accepts `año` or `ano` (without tilde) as Spanish aliases

#### source / fuente {#source--fuente}
- **Renamed in v0.8.0** from `location`
- Current location or holding repository
- The old column name `location` (and Spanish aliases `ubicacion`, `locacion`) still works for backward compatibility

#### medium / medio_genero {#medium--medio_genero}
- **Renamed in v1.0.0** from `object_type` / `tipo_objeto`
- Describes the genre or medium of the object — not the media type (Image, Video, Audio), which is now auto-detected from the object's source
- Examples: `Photograph`, `Oil painting`, `Textile`, `Map`
- Used as a facet in the gallery filter sidebar when `browse_and_search: true`
- The old column name `object_type` (and Spanish alias `tipo_objeto`) still works for backward compatibility
- Also accepts `medium_genre` as an English alias

#### alt_text / texto_alt {#alt_text--texto_alt}
- **New in v1.0.0**
- Alt text for the object image, used for accessibility
- Falls back to the object's `title` if left empty
- Displayed in the `alt` attribute of object images across the site

#### object_type / tipo_objeto {#object_type--tipo_objeto}
- **Deprecated in v1.0.0** — use `medium` / `medio_genero` instead
- Still works as a backward-compatible alias for `medium`
- Object classification used as a facet in the gallery filter sidebar
- Examples: `map`, `textile`, `photograph`, `painting`
- Appears as a filter category when `browse_and_search: true`

#### subjects / temas {#subjects--temas}
- **New in v0.8.0**
- Comma-separated topical subjects used as facets in the gallery filter sidebar
- Examples: `"weaving, colonial, textiles"`, `"cartography, Lima, urban planning"`
- Also accepts Spanish aliases: `materias`, `materia`

#### featured / destacado {#featured--destacado}
- **New in v0.8.0**
- Set to `yes` to feature this object on the homepage
- Featured objects are prioritized when `show_sample_on_homepage: true` in config
- The number shown is controlled by `featured_count` (default: 4)

#### credit / credito {#credit--credito}
- Displayed as badge in top-right corner of object images (if `show_object_credits: true`)
- Also shown in metadata table
- Use for attribution: `Public Domain`, `CC BY 4.0`, `Courtesy of National Archive`

#### thumbnail / miniatura {#thumbnail--miniatura}
- Path to a thumbnail image file
- Relative to the repository root
- If omitted, Telar generates thumbnails from the IIIF source

### Column Aliases {#column-aliases}

| Normalized | Accepts |
|-----------|---------|
| `object_id` | `object_id`, `id_objeto`, `objeto`, `object`, `id` |
| `title` | `title`, `titulo` |
| `description` | `description`, `descripcion` |
| `creator` | `creator`, `creador` |
| `period` | `period`, `periodo` |
| `year` | `year`, `año`, `ano` |
| `medium` | `medium`, `medio`, `medio_genero`, `medium_genre`, `object_type`, `tipo_objeto` |
| `dimensions` | `dimensions`, `dimensiones` |
| `source` | `source`, `fuente`, `location`, `ubicacion` |
| `credit` | `credit`, `credito` |
| `thumbnail` | `thumbnail`, `miniatura` |
| `alt_text` | `alt_text`, `texto_alt` |
| `subjects` | `subjects`, `temas`, `materias`, `materia` |
| `featured` | `featured`, `destacado` |
| `source_url` | `source_url`, `url_fuente` |
| `iiif_manifest` | `iiif_manifest`, `manifiesto_iiif` (legacy) |

## Gallery Metadata Tips {#gallery-metadata-tips}

For the best gallery experience with browse, search, and filter:

1. **Fill in `medium`** for every object — this powers the type filter
2. **Add `subjects`** with 2-4 comma-separated terms — this powers the subjects filter
3. **Include `year`** for chronological sorting
4. **Mark 4-6 objects as `featured: yes`** for the homepage sample
5. **Write meaningful `description` fields** — the search indexes these for full-text search

## File Organization {#file-organization}

```
telar-content/spreadsheets/
├── project.csv              # Story metadata
├── objects.csv              # Object catalog
├── colonial-textiles.csv    # Story steps (using story_id)
├── trade-routes.csv         # Another story
└── glossary.csv             # Glossary terms (optional)
```

## Migration from v0.7.x to v0.8.0 {#migration-from-v07x-to-v080}

### New columns (optional) {#new-columns-optional}

Add these to your objects.csv if you want gallery filtering and sorting:

| Column | Purpose |
|--------|---------|
| `year` | Enables sort-by-year in gallery |
| `object_type` | Enables type filter in sidebar |
| `subjects` | Enables subjects filter in sidebar |
| `featured` | Controls homepage object sample |

### Renamed columns {#renamed-columns}

| Old (v0.7.x) | New (v0.8.0) | Notes |
|---------------|-------------|-------|
| `location` | `source` | Old name still works |

**No breaking changes.** All v0.7.x CSVs work without modification.

## Validation {#validation}

Telar checks object CSV data during build and prints messages to the build log.

**What the build checks**:
- Rows with an empty `object_id` are silently dropped.
- Each object must have either a `source_url` pointing to a valid IIIF manifest, or a matching local image file in `telar-content/objects/`. Missing or unreachable sources produce a warning; the object is still written to the output.
- Thumbnail values that are not image paths (for example, "n/a" or "none") are cleared with a warning.
- Object IDs that contain spaces produce a warning, as spaces may cause issues with file paths.

**What the build does not enforce**:
- Missing or duplicate `object_id` values do not stop the build. Rows with no `object_id` are dropped without a message; duplicate IDs are not detected, and the last row wins when collection files are generated.
- A missing or empty `title` does not stop the build; the object is output with a blank title.

All warnings appear in the build log. Review the output for messages marked `[WARN]` to catch data problems before publishing.

## See Also {#see-also}

- [Project Columns](/docs/your-data/csv-project/) — Project CSV column reference
- [Story Columns](/docs/your-data/csv-stories/) — Story step CSV columns
- [Objects](/docs/your-content/objects/) — Defining objects and object pages
- [Objects Gallery](/docs/site-features/objects-gallery/) — Gallery browse, search, and filter
- [Configuration Reference](/docs/configure/configuration/) — Collection interface settings
