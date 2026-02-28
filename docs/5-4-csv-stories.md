---
layout: docs
title: "5.4. Story Columns"
parent: "5. Your Data"
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/your-data/csv-stories/
---

# Story Columns

Complete reference for story CSV columns with bilingual column name support. For column normalization and dual header support, see [Project Columns](/docs/your-data/csv-project/#overview).

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
> If you copy and paste from Microsoft Word, Google Docs, or similar applications, formatting will **not** be preserved. Write in markdown syntax instead — see the [Markdown Syntax Guide](/docs/your-content/markdown-syntax/).

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

### Column Aliases

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

## Data Entry Tips

**Coordinates**: Use the coordinate picker on object pages to find x, y, zoom values and copy them directly into your CSV.

**Markdown in fields**:
- `layer_content`: Full markdown supported
- `question`, `answer`: Plain text only

**Panel content**: Use file references (Method 3) for complex content with widgets. Use inline text (Method 1) for short panels.

## Validation

Telar validates story CSV data during build:

**Errors (build fails)**:
- Missing required columns
- Invalid `step` sequence (gaps, duplicates)
- Missing layer markdown files
- Invalid coordinate values (outside 0-1 range)

**Warnings (build succeeds)**:
- Unrecognized column names (ignored)
- Object ID not found in objects.csv

Check build output for validation messages.

## See Also

- [Project Columns](/docs/your-data/csv-project/) — Project CSV column reference
- [Object Columns](/docs/your-data/csv-objects/) — Objects CSV column reference
- [Glossary Columns](/docs/your-data/csv-glossary/) — Glossary CSV columns
- [Stories & Panels](/docs/your-content/stories-panels/) — How to structure stories
- [Markdown Syntax](/docs/your-content/markdown-syntax/) — Formatting for panel content
