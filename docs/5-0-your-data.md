---
layout: docs
title: 5. Your Data
parent: Documentation
nav_order: 5
lang: en
permalink: /docs/your-data/
has_children: true
---

# Your Data

Telar uses spreadsheet files to define the structure of your exhibition — what stories exist, what objects they contain, where to zoom in each image, and what glossary terms to include.

You can manage this data in two ways:
- **Google Sheets** — edit a spreadsheet in your browser, and Telar fetches and converts it to CSV files automatically during each build
- **CSV files** — edit the files directly in `components/structures/`

Both approaches produce the same result. Most users start with Google Sheets and never touch a CSV file.

## Data files

| File | What it defines | Reference |
|------|----------------|-----------|
| `project.csv` | Stories, display order, titles | [Project Columns](/docs/your-data/csv-project/) |
| `objects.csv` | Object catalog and metadata | [Object Columns](/docs/your-data/csv-objects/) |
| `{story-id}.csv` | Steps, coordinates, panel content | [Story Columns](/docs/your-data/csv-stories/) |
| `glossary.csv` | Glossary terms and definitions | [Glossary Columns](/docs/your-data/csv-glossary/) |

## Bilingual column support

All spreadsheet files support column names in both English and Spanish. You can use either language, mix them, or include dual headers for bilingual teams:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,colonial-textiles,Colonial Textiles,Weaving traditions,by Dr. Jane Smith
```

Telar automatically detects and skips the second header row. Spanish filenames (`proyecto.csv`, `objetos.csv`) are also supported. See [Project Columns](/docs/your-data/csv-project/#overview) for full details on column normalization.

## Google Sheets

See [Google Sheets](/docs/your-data/google-sheets/) for setup and workflow.
