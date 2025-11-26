---
layout: docs
title: 3. Content Structure
parent: Documentation
nav_order: 3
lang: en
permalink: /docs/content-structure/
---

# Content Structure

Telar uses a **components-based architecture** that separates source content from generated files.

## Components Folder (Source of Truth)

The `components/` folder contains all editable source content:

```
components/
├── structures/           # CSV files with organizational data
│   ├── project.csv       # Site settings and story list
│   ├── objects.csv       # Object catalog metadata
│   └── story-1.csv       # Story structure with step coordinates
├── images/
│   ├── objects/          # Source images for IIIF processing
│   └── additional/       # Other images used around the site
└── texts/
    ├── stories/          # Story layer content (markdown)
    │   └── story1/       # Optional subfolders for organization
    │       ├── step1-layer1.md
    │       ├── step1-layer2.md
    │       └── ...
    └── glossary/         # Glossary definitions (markdown)
        ├── term1.md
        └── ...
```

### Key Principles

- **CSV files** contain structural data (coordinates, file references)
- **Markdown files** contain long-form narrative content
- **Images** are processed into IIIF tiles automatically

## Project CSV Structure

The `project.csv` file defines your site's stories and their display order:

```csv
order,title,subtitle,byline
1,Colonial Textiles,Weaving traditions of the Americas,by Dr. Jane Smith
2,Trade Routes,Following the threads of commerce,based on [original research](https://example.com)
```

### Column Reference

| Column | Description |
|--------|-------------|
| `order` | Display order on homepage (1, 2, 3...) |
| `title` | Story title shown on homepage and story page |
| `subtitle` | Brief description shown on story cards |
| `byline` | Author attribution; supports markdown for links and formatting |

{: .tip }
> **Markdown in Bylines**
> The `byline` field supports markdown syntax. Use `[text](url)` for links, `*italics*` for emphasis, etc. On homepage cards, links are displayed as plain text; on story pages, they render as clickable links.

## Story CSV Structure

Each story CSV (e.g., `story-1.csv`) contains step-by-step navigation data:

```csv
step,question,answer,object,x,y,zoom,layer1_button,layer1_file,layer2_button,layer2_file
1,"Question text","Brief answer","obj-001",0.5,0.5,1.0,"","story1/step1-layer1.md","","story1/step1-layer2.md"
```

### Column Reference

| Column | Description |
|--------|-------------|
| `step` | Step number |
| `question` | Heading displayed in story |
| `answer` | Brief answer text |
| `object` | Object ID from objects.csv |
| `x, y, zoom` | IIIF viewer coordinates (0-1 normalized) |
| `layer1_button` | Custom button text (empty = "Learn more") |
| `layer1_file` | Path to markdown file in `components/texts/stories/` |
| `layer2_button` | Custom button text (empty = "Go deeper") |
| `layer2_file` | Path to markdown file in `components/texts/stories/` |

{: .note }
> **Button Behavior**
> If button columns are empty, default text appears. If you provide text, it will be used instead.

## Objects CSV Structure

The `objects.csv` file catalogs all objects:

```csv
object_id,title,description,creator,date,medium,dimensions,location,credit,thumbnail,source_url
textile-001,Colonial Textile,A woven fragment...,Unknown,circa 1650,Wool,45 x 60 cm,,,
```

For external IIIF resources, include the `source_url` URL.

## Markdown Files

### Story Layer Files

Story layer files contain the detailed narrative content:

```markdown
---
title: "Weaving Techniques"
---

The interlocking warp pattern visible here indicates a complex
weaving technique that was common in the colonial period.

## Technical Details

These patterns were created using...
```

{: .tip }
> **Complete Markdown Reference**
> See the [Markdown Syntax Guide](/docs/reference/markdown-syntax/) for all available formatting options, including image sizing, rich media embeds, and best practices.

### Glossary Files

Glossary files define terms referenced in your narratives:

```markdown
---
term_id: colonial-period
title: "Colonial Period"
related_terms: encomienda,viceroyalty
---

The Colonial Period in the Americas began with...
```

### Glossary Auto-Linking

You can create inline links to glossary terms using wiki-style syntax:

```markdown
The [[colonial-period]] began with the establishment of [[viceroyalty|viceroyalties]].
```

**Syntax:**
- `[[term_id]]` - Links to term, displays term title
- `[[term_id|custom text]]` - Links to term, displays custom text

When users click these links, the glossary definition opens in a slide-over panel without navigating away from the story.

## Widgets in Story Panels

Telar v0.4.0+ includes an interactive widget system for rich content presentation in story panels. Widgets allow you to embed carousels, tabbed content, and collapsible sections directly in your markdown files.

### Available Widgets

**Carousel** - Image carousel with navigation controls
**Tabs** - Tabbed content panels for multi-perspective information
**Accordion** - Collapsible sections for hierarchical content

### Widget Syntax

Widgets use CommonMark-style container syntax with triple colons:

```markdown
:::widget_type
widget content here
:::
```

### Carousel Widget

Display multiple images with navigation controls, captions, and credits.

**Syntax:**
```markdown
:::carousel
image: story1/map.jpg
alt: Historical map of the region
caption: Map from 1650 showing colonial boundaries
credit: National Archives

---

image: story1/document.jpg
alt: Colonial document
caption: Royal decree establishing the settlement
credit: Archivo General de Indias
:::
```

**Fields:**
- `image` (required) - Path relative to `assets/images/`
- `alt` (recommended) - Accessibility description
- `caption` (optional) - Text displayed below image; supports markdown (e.g., `*italics*`)
- `credit` (optional) - Attribution line; supports markdown

**External images:** You can use full URLs for images hosted elsewhere:
```markdown
image: https://example.org/images/photo.jpg
```

{: .note }
> **Separator**
> Use `---` to separate carousel items

### Tabs Widget

Organize content into switchable tabs, perfect for presenting different perspectives or sources.

**Syntax:**
```markdown
:::tabs
## Spanish Account
The royal authorities reported that the revolt began on...

Historical records show contradictory accounts...

## Indigenous Perspective
Community leaders organized resistance to...

Oral traditions describe a coordinated response...

## Modern Analysis
Historians now recognize this event as...
:::
```

**Structure:**
- Each `## Header` creates a new tab
- Content between headers becomes tab content
- Standard markdown formatting supported
- Minimum 2 tabs, maximum 4 tabs

### Accordion Widget

Create collapsible panels for chronological sequences, hierarchical information, or optional details.

**Syntax:**
```markdown
:::accordion
## 1600-1650: Early Colonial Period
The Spanish crown established administrative structures across the territory.

Indigenous populations were reorganized into settlements...

## 1650-1700: Consolidation
Estate systems became entrenched as the colonial economy matured.

## 1700-1750: Reform Era
Bourbon reforms challenged existing power structures...
:::
```

**Structure:**
- Each `## Header` creates a collapsible panel
- All panels start collapsed
- Minimum 2 panels, maximum 6 panels
- Standard markdown formatting supported

### Widget Placement

Widgets work in all story panel markdown files:

- **Layer 1 panels** - "Learn more" content
- **Layer 2 panels** - "Go deeper" content
- **Layer 3 panels** - Deepest level of detail

{: .tip }
> **Visual Contrast**
> Widgets automatically use opposite panel colors for visual distinction. Layer 1 widgets appear with Layer 2 colors, and vice versa.

### Images in Widgets

**Local images:**
Place images in `assets/images/` and reference them relative to that folder:

```
assets/images/
├── story1/
│   ├── map.jpg
│   └── document.jpg
└── story2/
    └── artifact.jpg
```

```markdown
image: story1/map.jpg
image: story2/artifact.jpg
```

**External images:**
Use complete URLs for images hosted elsewhere:

```markdown
image: https://digital-collections.library.edu/iiif/image123.jpg
image: https://archive.org/download/item/photo.jpg
```

### Validation and Errors

Telar validates widgets during the build process:

**Errors that stop the build:**
- Missing required `image` field in carousel
- Too few or too many tabs/accordion panels
- Empty content sections

**Warnings:**
- Missing `alt` text on carousel images (accessibility concern)
- Image files not found at specified paths

Check your build output for widget validation messages.

### Widget Examples

**Historical timeline accordion:**
```markdown
:::accordion
## 1520-1550: Conquest
Spanish forces established control over the territory through a series of military campaigns...

## 1550-1600: Settlement
Colonial towns were founded as administrative centers...

## 1600-1680: Consolidation
The colonial economy based on mining and agriculture became established...
:::
```

**Comparative sources tabs:**
```markdown
:::tabs
## Primary Source
"On the 15th day of August, the viceroy decreed..." (Colonial Archive, Doc. 234)

## Secondary Analysis
Modern historians interpret this decree as evidence of...

## Archaeological Evidence
Excavations at the site revealed...
:::
```

**Image comparison carousel:**
```markdown
:::carousel
image: before.jpg
alt: Site photograph from 1920
caption: The *Plaza Mayor* before restoration
credit: Municipal Archive

---

image: after.jpg
alt: Site photograph from 2020
caption: The *Plaza Mayor* after archaeological restoration
credit: National Institute of Anthropology
:::
```

## Jekyll Collections

Auto-generated files live in `_jekyll-files/`:

- `_jekyll-files/_stories/`: Scrollytelling narratives
- `_jekyll-files/_objects/`: Object metadata
- `_jekyll-files/_glossary/`: Glossary terms

{: .warning }
> **Do Not Edit**
> Files in `_jekyll-files/` are auto-generated. Always edit source files in `components/` or `_data/` instead.

## Google Sheets Integration

When using Google Sheets (recommended):

1. Edit content in your Google Sheet
2. Scripts automatically fetch and convert to CSV format
3. CSV files are processed into JSON for Jekyll
4. No manual CSV editing needed!

See [GitHub Actions](/docs/reference/github-actions/) for how this automation works.
