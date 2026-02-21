---
layout: docs
title: "6.3. CSV Reference: Stories & Glossary"
parent: 6. Reference
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/reference/csv-stories-glossary/
---

# CSV Reference: Stories & Glossary

Complete reference for story CSV and glossary CSV columns with bilingual column name support.

For project.csv and objects.csv columns, see [CSV Reference: Project & Objects](/docs/reference/csv-project-objects/).

## Story CSV (story-{id}.csv)

Defines step-by-step navigation and panel content for each story.

**Location**: `components/structures/{story_id}.csv`

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
1,textil-001,0.5,0.5,1.0,¿Qué es esto?,Un fragmento de textil colonial,"",Este fragmento muestra **técnicas avanzadas de tejido** del período colonial.,"Saber más",textiles-coloniales/paso1-capa2.md
2,textil-001,0.3,0.7,0.5,¿Qué es este patrón?,Un diseño de urdimbre entrelazada,"",textiles-coloniales/paso2-capa1.md,"",textiles-coloniales/paso2-capa2.md
```

Step 1 uses inline content for layer 1, while step 2 uses a file reference. Both approaches work and can be mixed freely.

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
- Use the coordinate picker on object pages to find values

#### question / pregunta
- Displayed as panel heading
- Brief question or statement
- Recommended: 3-8 words

#### answer / respuesta
- Brief answer shown in panel
- Teaser for layer 1 content
- Recommended: 1-2 sentences

#### Layer buttons

- Empty string = default button text
- Custom text: any string (e.g., "See details", "Ver detalles")
- If content exists but button empty: shows default text
- If content empty: button hidden

#### Layer content

Panel content can be provided in three ways:

**Method 1: Enter text directly**

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

You can use basic formatting: `**bold**`, `*italic*`, `[link text](url)`, and glossary links (`[[term-id]]`).

**Method 2: Paste markdown text**

Paste text written in a plain text editor. This supports the full range of formatting features including headings, widgets (accordion, carousel, tabs), images with size controls, and a custom panel title using YAML frontmatter.

{: .warning }
> If you copy and paste from Microsoft Word, Google Docs, or similar applications, formatting will **not** be preserved. Write in markdown syntax instead — see the [Markdown Syntax Guide](/docs/reference/markdown-syntax/).

**Method 3: Reference a markdown file**

Point to a markdown file in your repository. This is recommended for complex panels, especially those with widgets or content you want to reuse.

| layer1_content |
|----------------|
| colonial-textiles/step1-layer1.md |

Save markdown files in `components/texts/stories/`. In your spreadsheet, enter just the filename — or if you've organized files into subfolders, include the subfolder name.

**How Telar decides**: If what you enter ends in `.md` and the file exists, it loads the file. Otherwise, it treats the value as content.

### Choosing the Right Method

| Scenario | Recommended method |
|----------|-------------------|
| Short explanation (1-2 paragraphs) | Method 1: Enter directly |
| Panel with custom title or widgets | Method 2: Paste, or Method 3: File reference |
| Content with widgets (accordion, tabs, carousel) | Method 3: File reference |
| Same content used in multiple places | Method 3: File reference |
| Quick edits without leaving the spreadsheet | Method 1 or 2 |

### Story CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `step` | `step`, `paso` |
| `object` | `object`, `objeto`, `object_id` |
| `x` | `x` |
| `y` | `y` |
| `zoom` | `zoom` |
| `question` | `question`, `pregunta` |
| `answer` | `answer`, `respuesta` |
| `layer1_button` | `layer1_button`, `boton_capa1` |
| `layer1_content` | `layer1_content`, `contenido_capa1`, `layer1_file`, `archivo_capa1` |
| `layer2_button` | `layer2_button`, `boton_capa2` |
| `layer2_content` | `layer2_content`, `contenido_capa2`, `layer2_file`, `archivo_capa2` |
| `layer3_button` | `layer3_button`, `boton_capa3` |
| `layer3_content` | `layer3_content`, `contenido_capa3`, `layer3_file`, `archivo_capa3` |

{: .note }
> The `layer_file` / `archivo_capa` column names are backward-compatible aliases from before v0.6.3. The preferred names are `layer_content` / `contenido_capa`.

## Glossary CSV (glossary.csv)

Defines glossary terms that can be linked from story panels using `[[term-id]]` syntax.

**Location**: `components/structures/glossary.csv`

**New in v0.8.0.** The CSV format is the preferred method for glossary terms. Legacy markdown files in `components/texts/glossary/` are still supported but CSV takes precedence if both exist.

### Columns

| English | Spanish | Required | Description |
|---------|---------|----------|-------------|
| `term_id` | `id_termino` | Yes | Unique identifier for the term (used in link syntax) |
| `title` | `titulo` | Yes | Display title of the term |
| `definition` | `definicion` | No | The term definition text |
| `related_terms` | `terminos_relacionados` | No | Comma-separated related term IDs |

### Example

**English:**
```csv
term_id,title,definition,related_terms
loom,Loom,A device used to weave cloth and tapestry.,warp
warp,Warp,"The set of lengthwise yarns on a loom, through which the weft is woven.",loom
encomienda,Encomienda,"A system of labor in colonial Spanish America, granting colonists authority over indigenous workers.",
```

**Spanish:**
```csv
id_termino,titulo,definicion,terminos_relacionados
telar,Telar,Un dispositivo utilizado para tejer tela y tapices.,urdimbre
urdimbre,Urdimbre,"El conjunto de hilos longitudinales en un telar, a través de los cuales se teje la trama.",telar
encomienda,Encomienda,"Un sistema de trabajo en la América colonial española, que otorgaba a los colonos autoridad sobre los trabajadores indígenas.",
```

### Field Notes

#### term_id / id_termino
- Unique across all glossary terms
- Used in inline link syntax: `[[term_id]]` or `[[display text|term_id]]`
- Format: lowercase, hyphens recommended
- Terms prefixed with `demo-` are tagged as demo content

#### title / titulo
- The display name shown in the glossary panel and as link text
- When using `[[term_id]]` shorthand, the title is used as the link text automatically

#### definition / definicion
- The definition text shown in the glossary entry
- Supports basic markdown formatting

#### related_terms / terminos_relacionados
- Comma-separated list of other `term_id` values
- Used for cross-referencing between glossary entries

### Inline Link Syntax

Link to glossary terms from story panels using double-bracket syntax:

**Shorthand** — uses the term's title as link text:
```
The [[loom]] was central to textile production.
```

**With custom display text** — use a pipe separator:
```
The [[weaving device|loom]] was central to textile production.
```

If the `term_id` is not found in the glossary, a warning icon and error message appear in the build output and in the story panel.

### Glossary CSV Aliases

| Normalized | Accepts |
|-----------|---------|
| `term_id` | `term_id`, `id_termino`, `id_término` |
| `title` | `title`, `titulo`, `título` |
| `definition` | `definition`, `definicion`, `definición` |
| `related_terms` | `related_terms`, `terminos_relacionados`, `términos_relacionados` |

### CSV vs. Markdown Glossary

| Aspect | CSV (preferred) | Markdown (legacy) |
|--------|----------------|-------------------|
| Location | `components/structures/glossary.csv` | `components/texts/glossary/*.md` |
| Format | Rows with columns | Individual files with YAML frontmatter |
| Bilingual headers | Yes (via column aliases) | No |
| Google Sheets | Yes (fetched like other CSVs) | No |

If both a CSV and markdown glossary exist, the CSV is used and the markdown files are ignored (with a build warning).

## Data Entry Tips

**Coordinates**: Use the coordinate picker on object pages to find x, y, zoom values and copy them directly into your CSV.

**Markdown in fields**:
- `layer_content`, `definition`: Full markdown supported
- `question`, `answer`: Plain text only

**Panel content**: Use file references (Method 3) for complex content with widgets. Use inline text (Method 1) for short panels.

## Validation

Telar validates story and glossary CSV data during build:

**Story errors (build fails)**:
- Missing required columns
- Invalid `step` sequence (gaps, duplicates)
- Missing layer markdown files
- Invalid coordinate values (outside 0-1 range)

**Story warnings (build succeeds)**:
- Unrecognized column names (ignored)
- Object ID not found in objects.csv

**Glossary warnings**:
- Missing `term_id` or `title` (row skipped)
- Glossary link `[[term_id]]` references nonexistent term

## See Also

- [CSV Reference: Project & Objects](/docs/reference/csv-project-objects/) — Project and objects CSV columns
- [Stories & Panels](/docs/content-structure/stories-panels/) — How to structure stories
- [Glossary](/docs/content-structure/glossary/) — Glossary setup and auto-linking
- [Markdown Syntax](/docs/reference/markdown-syntax/) — Formatting for panel content
