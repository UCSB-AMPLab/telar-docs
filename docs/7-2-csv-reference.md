---
layout: docs
title: 7.2. CSV Column Reference
parent: 7. Reference
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/reference/csv-reference/
---

# CSV Column Reference

Complete reference for all CSV columns in Telar with bilingual column name support.

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

### Example

**English:**
```csv
order,story_id,title,subtitle,byline
1,colonial-textiles,Colonial Textiles,Weaving traditions of the Americas,by Dr. Jane Smith
2,trade-routes,Trade Routes,Following the threads of commerce,based on [original research](https://example.com)
```

**Spanish:**
```csv
orden,id_historia,titulo,subtitulo,firma
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido de las Américas,por Dra. María García
2,rutas-comerciales,Rutas Comerciales,Siguiendo los hilos del comercio,basado en [investigación original](https://ejemplo.com)
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

## Objects CSV (objects.csv / objetos.csv)

Catalogs all objects used in stories.

**Location**: `components/structures/objects.csv` or `components/structures/objetos.csv`

### Columns

| English | Spanish | Required | Description |
|---------|---------|----------|-------------|
| `object_id` | `objeto` | Yes | Unique identifier (lowercase, hyphens, underscores) |
| `title` | `titulo` | Yes | Object title |
| `description` | `descripcion` | No | Long-form description (markdown supported) |
| `creator` | `creador` | No | Creator or artist name |
| `date` | `fecha` / `periodo` | No | Creation date or period |
| `medium` | `medio` | No | Material or medium |
| `dimensions` | `dimensiones` | No | Physical dimensions |
| `location` | `ubicacion` / `locacion` | No | Current location or repository |
| `credit` | `credito` | No | Attribution or credit line |
| `thumbnail` | `miniatura` | No | Path to thumbnail image |
| `iiif_manifest` | `manifiesto_iiif` | No | URL to external IIIF manifest |
| `source_url` | `url_fuente` | No | IIIF image info.json URL |

### Example

**English:**
```csv
object_id,title,description,creator,date,medium,dimensions,location,credit,thumbnail,source_url
textile-001,Colonial Textile,A woven fragment showing complex patterns...,Unknown,circa 1650,Wool,45 x 60 cm,National Museum,Public Domain,,
map-lima,Map of Lima,Early colonial map showing city layout,Juan de Cuellar,1685,Ink on paper,30 x 40 cm,,,map-thumb.jpg,https://example.org/iiif/map/info.json
```

**Spanish:**
```csv
objeto,titulo,descripcion,creador,periodo,medio,dimensiones,ubicacion,credito,miniatura,url_fuente
textil-001,Textil Colonial,Un fragmento tejido con patrones complejos...,Desconocido,circa 1650,Lana,45 x 60 cm,Museo Nacional,Dominio Público,,
mapa-lima,Mapa de Lima,Mapa colonial temprano mostrando el diseño de la ciudad,Juan de Cuellar,1685,Tinta sobre papel,30 x 40 cm,,,mapa-miniatura.jpg,https://ejemplo.org/iiif/mapa/info.json
```

### Field Notes

#### object_id / objeto
- Unique across all objects
- Referenced in story CSVs
- Used in URLs: `/objects/{object_id}/`
- Format: lowercase, hyphens, underscores

#### description / descripcion
- Markdown supported
- Displayed on object pages
- Can include headings, lists, links, emphasis

#### date / fecha / periodo
- Flexible format
- Examples: `1650`, `circa 1650`, `1600-1650`, `17th century`

#### credit / credito
- Displayed as badge in top-right corner of object images (if `show_object_credits: true`)
- Also shown in metadata table
- Use for attribution: `Public Domain`, `CC BY 4.0`, `Courtesy of National Archive`

#### iiif_manifest / manifiesto_iiif
- URL to external IIIF Presentation API manifest
- Use for objects from external repositories
- Overrides `source_url` if both provided

#### source_url / url_fuente
- URL to IIIF Image API info.json
- Use for objects from IIIF servers
- Leave empty for self-hosted images (auto-generated)

## Story CSV (story-{id}.csv / historia-{id}.csv)

Defines step-by-step navigation and panel content for each story.

**Location**: `components/structures/{story_id}.csv` or `components/structures/historia-{story_id}.csv`

**Naming**:
- If `story_id` specified in project.csv: use that name (e.g., `colonial-textiles.csv`)
- If `story_id` omitted: use `story-{order}.csv` (e.g., `story-1.csv`, `story-2.csv`)

### Columns

| English | Spanish | Required | Description |
|---------|---------|----------|-------------|
| `step` | `paso` | Yes | Step number (1, 2, 3...) |
| `object` | `objeto` | Yes | Object ID from objects.csv |
| `x` | `x` | Yes | Horizontal coordinate (0-1 normalized) |
| `y` | `y` | Yes | Vertical coordinate (0-1 normalized) |
| `zoom` | `zoom` | Yes | Zoom level (0-1 normalized) |
| `question` | `pregunta` | Yes | Heading displayed in story panel |
| `answer` | `respuesta` | Yes | Brief answer text |
| `layer1_button` | `boton_capa1` | No | Custom button text (empty = "Learn more") |
| `layer1_content` | `contenido_capa1` | No | Panel content: inline text or path to .md file |
| `layer2_button` | `boton_capa2` | No | Custom button text (empty = "Go deeper") |
| `layer2_content` | `contenido_capa2` | No | Panel content: inline text or path to .md file |
| `layer3_button` | `boton_capa3` | No | Custom button text (empty = default) |
| `layer3_content` | `contenido_capa3` | No | Panel content: inline text or path to .md file |

### Example

**English (with inline content):**
```csv
step,object,x,y,zoom,question,answer,layer1_button,layer1_content,layer2_button,layer2_content
1,textile-001,0.5,0.5,1.0,What is this?,A colonial textile fragment,"",This fragment shows **advanced weaving techniques** from the colonial period.,"Learn More",colonial-textiles/step1-layer2.md
2,textile-001,0.3,0.7,0.5,What is this pattern?,An interlocking warp design,"",colonial-textiles/step2-layer1.md,"",colonial-textiles/step2-layer2.md
```

**Spanish (with inline content):**
```csv
paso,objeto,x,y,zoom,pregunta,respuesta,boton_capa1,contenido_capa1,boton_capa2,contenido_capa2
1,textil-001,0.5,0.5,1.0,¿Qué es esto?,Un fragmento de textil colonial,"",Este fragmento muestra **técnicas avanzadas de tejido** del período colonial.,"Aprende Más",textiles-coloniales/paso1-capa2.md
2,textil-001,0.3,0.7,0.5,¿Qué es este patrón?,Un diseño de urdimbre entrelazada,"",textiles-coloniales/paso2-capa1.md,"",textiles-coloniales/paso2-capa2.md
```

Note: Step 1 uses inline content for layer 1, while step 2 uses a file reference. Both approaches work and can be mixed freely.

### Field Notes

#### step / paso
- Must be sequential integers starting at 1
- No gaps allowed (1, 2, 3... not 1, 3, 5)
- Determines navigation order

#### object / objeto
- Must match an `object_id` from objects.csv
- Multiple steps can reference the same object

#### x, y, zoom
- All values normalized 0-1
- **x**: 0 = left edge, 1 = right edge, 0.5 = center
- **y**: 0 = top edge, 1 = bottom edge, 0.5 = center
- **zoom**: 0 = zoomed out (full image), 1 = maximum zoom
- Use coordinate tool on object pages to find values

#### question / pregunta
- Displayed as panel heading
- Brief question or statement
- Recommended: 3-8 words

#### answer / respuesta
- Brief answer shown in panel
- Teaser for layer 1 content
- Recommended: 1-2 sentences

#### layer buttons / botones de capa
- Empty string = default button text
- Custom text: any string (e.g., "See details", "Ver detalles")
- If content exists but button empty: shows default text
- If content empty: button hidden

#### layer content / contenido de capa

Panel content can be provided in three ways, depending on the complexity of your needs and your chosen workflow (CSV or Google Sheets).

**Method 1: Entering text directly**

Type your panel text directly in the spreadsheet cell. This is the simplest approach for short panels.

| layer1_content |
|----------------|
| This textile shows **advanced weaving techniques** from the colonial period. |

To create paragraph breaks within a cell:

| Environment | How to create line breaks |
|-------------|---------------------------|
| Google Sheets | Press `Ctrl+Enter` (Windows/Linux) or `Option+Enter` (macOS) |
| CSV files | Use actual newlines inside quoted text |
| Alternative | Use HTML: `<br>` for line breaks, `<p>...</p>` for paragraphs |

The panel title defaults to the button text (e.g., "Learn more"). You can use basic formatting: `**bold**`, `*italic*`, `[link text](url)`, and glossary links (`[[term-id]]`).

**Method 2: Pasting markdown text**

Paste text written in a plain text editor or markdown application. This method supports the full range of formatting features.

You can include:
- Headings (`## Section Title`)
- Widgets (accordion, carousel, tabs)
- Images with size controls
- A custom panel title using YAML frontmatter at the top of your text

{: .warning }
> If you copy and paste from Microsoft Word, Google Docs, or similar applications, formatting will **not** be preserved. Bold, italics, colors, font sizes, and inserted images will all be lost. Write in markdown syntax instead — see the [Markdown Syntax Guide](/docs/reference/markdown-syntax/).

**Method 3: Referencing a markdown file**

Point to a markdown file saved in your site's repository. This is our recommended method for complex panels, especially those with widgets or content you want to reuse across multiple stories.

| layer1_content |
|----------------|
| colonial-textiles/step1-layer1.md |

**Where to save your files**: Save markdown files in the `components/texts/stories/` folder. In your spreadsheet, enter just the filename — or if you've organised files into subfolders, include the subfolder name (e.g., `my-story/step1-layer1.md`).

**How Telar knows which method you're using**: If what you enter ends in `.md` and Telar finds that file, it loads the file. Otherwise, Telar treats what you entered as the panel content itself.

**Empty cells**: If you leave a layer content cell empty, no button appears for that layer.

### Choosing the Right Method

| Scenario | Recommended method |
|----------|-------------------|
| Short explanation (1–2 paragraphs) | Method 1: Enter directly |
| Panel with custom title | Method 2: Paste with frontmatter, or Method 3 |
| Content with widgets (accordion, tabs, carousel) | Method 3: File reference |
| Same content used in multiple places | Method 3: File reference |
| Quick edits without leaving the spreadsheet | Method 1 or 2 |

## Alternative Column Names

Complete mappings of all accepted column names.

### Project CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `order` | `order`, `orden`, `number`, `numero`, `num` |
| `story_id` | `story_id`, `id_historia`, `story-id`, `story` |
| `title` | `title`, `titulo`, `name`, `nombre` |
| `subtitle` | `subtitle`, `subtitulo`, `description`, `descripcion`, `desc` |
| `byline` | `byline`, `firma`, `author`, `autor`, `attribution`, `atribucion` |

### Objects CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `object_id` | `object_id`, `objeto`, `object`, `id` |
| `title` | `title`, `titulo`, `name`, `nombre` |
| `description` | `description`, `descripcion`, `desc` |
| `creator` | `creator`, `creador`, `artist`, `artista`, `author`, `autor` |
| `date` | `date`, `fecha`, `period`, `periodo` |
| `medium` | `medium`, `medio`, `material` |
| `dimensions` | `dimensions`, `dimensiones`, `size`, `tamaño` |
| `location` | `location`, `ubicacion`, `locacion`, `repository`, `repositorio` |
| `credit` | `credit`, `credito`, `attribution`, `atribucion` |
| `thumbnail` | `thumbnail`, `miniatura`, `thumb` |
| `iiif_manifest` | `iiif_manifest`, `manifiesto_iiif`, `manifest`, `manifiesto` |
| `source_url` | `source_url`, `url_fuente`, `iiif_source_url`, `iiif_url` |

### Story CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `step` | `step`, `paso`, `number`, `numero`, `num` |
| `object` | `object`, `objeto`, `object_id` |
| `x` | `x`, `horizontal`, `left` |
| `y` | `y`, `vertical`, `top` |
| `zoom` | `zoom`, `z`, `scale` |
| `question` | `question`, `pregunta`, `heading`, `encabezado` |
| `answer` | `answer`, `respuesta`, `response` |
| `layer1_button` | `layer1_button`, `boton_capa1`, `button1`, `btn1` |
| `layer1_content` | `layer1_content`, `contenido_capa1`, `layer1_file`, `archivo_capa1`, `file1`, `layer1` |
| `layer2_button` | `layer2_button`, `boton_capa2`, `button2`, `btn2` |
| `layer2_content` | `layer2_content`, `contenido_capa2`, `layer2_file`, `archivo_capa2`, `file2`, `layer2` |
| `layer3_button` | `layer3_button`, `boton_capa3`, `button3`, `btn3` |
| `layer3_content` | `layer3_content`, `contenido_capa3`, `layer3_file`, `archivo_capa3`, `file3`, `layer3` |

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

**Mixed environments**: Mix is supported but not recommended
```csv
order,id_historia,title,subtitulo,byline  # Works but confusing
```

### File Organization

**Recommended structure**:
```
components/structures/
├── project.csv              # English
├── objects.csv
├── colonial-textiles.csv    # Using story_id
└── trade-routes.csv

# OR

components/structures/
├── proyecto.csv             # Spanish
├── objetos.csv
├── textiles-coloniales.csv
└── rutas-comerciales.csv
```

**story_id naming**:
- Use semantic names: `colonial-textiles`, not `story-about-colonial-textiles`
- Keep short: 2-4 words maximum
- Match content language: `textiles-coloniales` for Spanish stories

### Data Entry Tips

**Coordinates**:
1. Use coordinate tool on object pages
2. Click to identify x, y, zoom values
3. Copy values directly into CSV
4. Test in story viewer

**Markdown in fields**:
- `description`: Full markdown supported
- `byline`: Markdown for links/emphasis only
- `question`, `answer`: Plain text only

**Panel content**:
- Inline text: write directly in the cell for simple panels
- File references: path ending in `.md`, relative to `components/texts/stories/`
- Use file references for complex content with widgets

## Validation

Telar validates CSV data during build:

**Errors (build fails)**:
- Missing required columns
- Duplicate `object_id` values
- Invalid `step` sequence (gaps, duplicates)
- Missing layer markdown files
- Invalid coordinate values (outside 0-1 range)

**Warnings (build succeeds)**:
- Missing optional columns
- Empty descriptions
- Unrecognized column names (ignored)
- Missing thumbnails

Check build output for validation messages.

## Migration from Previous Versions

### From v0.5.x to v0.6.0

**New features**:
- `story_id` column (optional)
- Spanish column names
- Dual header support
- Markdown in `byline`
- `show_object_credits` config

**Breaking changes**: None. All v0.5.x CSVs work without modification.

**Recommended updates**:
1. Add `story_id` to project.csv for semantic naming
2. Rename story CSVs to match `story_id`
3. Consider using Spanish column names if appropriate
4. Add markdown links to bylines if desired

### From v0.4.x to v0.6.0

**Additional changes**:
- `source_url` replaces `iiif_url` (old name still works)
- Three-layer system (was two-layer)
- Custom button text support

## Troubleshooting

### "Column not found" errors

**Cause**: Column name not recognized
**Solution**: Check spelling, use names from reference above

### "Duplicate object_id" errors

**Cause**: Same object_id used twice in objects.csv
**Solution**: Make each object_id unique

### "Invalid step sequence" errors

**Cause**: Steps not sequential (1, 2, 4) or duplicate steps
**Solution**: Ensure steps are 1, 2, 3, 4... without gaps

### "File not found" errors

**Cause**: Markdown file referenced but doesn't exist
**Solution**: Create file or remove file reference from CSV

### Coordinates not working

**Cause**: Values outside 0-1 range or incorrect object_id
**Solution**: Use coordinate tool, verify object exists

## See Also

- [Content Structure](/docs/content-structure/) - Overview of Telar content organization
- [Google Sheets Workflow](/docs/workflows/google-sheets/) - Manage CSVs via Google Sheets
- [Markdown Syntax](/docs/reference/markdown-syntax/) - Formatting options for content files

---

**New in v0.6.0**: Bilingual CSV support with Spanish column names and dual headers.
