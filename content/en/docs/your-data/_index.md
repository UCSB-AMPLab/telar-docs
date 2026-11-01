---
title: Your Data
url: /docs/your-data/
translationKey: docs-your-data
type: guide
docs_section: reference
---

# Your Data {#your-data}

Telar uses spreadsheet files to define the structure of your exhibition — what stories exist, what objects they contain, where to zoom in each image, and what glossary terms to include.

These files are the publication format. Choose how you edit their content:
- **Compositor** — edit visually; the editor writes the publication files when you publish
- **Google Sheets** — edit a spreadsheet in your browser, and Telar fetches and converts it to CSV files automatically during each build
- **CSV files** — edit the files directly in `telar-content/spreadsheets/`

Choose one source for ongoing authoring. If Google Sheets is enabled, the build fetches it and replaces its local CSV copies. The [three manuals](/docs/#build) explain each workflow.

## Data files {#data-files}

| File | What it defines | Reference |
|------|----------------|-----------|
| `project.csv` | Stories, display order, titles | [Project Columns](/docs/your-data/csv-project/) |
| `objects.csv` | Object catalog and metadata | [Object Columns](/docs/your-data/csv-objects/) |
| `{story-id}.csv` | Steps, coordinates, panel content | [Story Columns](/docs/your-data/csv-stories/) |
| `glossary.csv` | Glossary terms and definitions | [Glossary Columns](/docs/your-data/csv-glossary/) |

## Bilingual column support {#bilingual-column-support}

All spreadsheet files support column names in both English and Spanish. You can use either language, mix them, or include dual headers for bilingual teams:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,colonial-textiles,Colonial Textiles,Weaving traditions,by Dr. Jane Smith
```

Telar automatically detects and skips the second header row. Spanish filenames (`proyecto.csv`, `objetos.csv`) are also supported. See [Project Columns](/docs/your-data/csv-project/#overview) for full details on column normalization.

## Google Sheets {#google-sheets}

See [Google Sheets](/docs/your-data/google-sheets/) for setup and workflow.
