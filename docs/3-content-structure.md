---
layout: default
title: 3. Content Structure
parent: Documentation
nav_order: 3
lang: en
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
object_id,title,description,creator,date,medium,dimensions,location,credit,thumbnail,iiif_manifest
textile-001,Colonial Textile,A woven fragment...,Unknown,circa 1650,Wool,45 x 60 cm,,,
```

For external IIIF resources, include the `iiif_manifest` URL.

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
