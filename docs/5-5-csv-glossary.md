---
layout: docs
title: "5.5. Glossary Columns"
parent: "5. Your Data"
grand_parent: Documentation
nav_order: 5
lang: en
permalink: /docs/your-data/csv-glossary/
---

# Glossary Columns

Complete reference for `glossary.csv` columns with bilingual column name support. For column normalization and dual header support, see [Project Columns](/docs/your-data/csv-project/#overview).

## Glossary CSV (glossary.csv)

Defines glossary terms that can be linked from story panels using `[[term_id]]` syntax.

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
- Used in inline link syntax: `[[term_id]]` or `[[term_id|display text]]`
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
The [[loom|weaving device]] was central to textile production.
```

If the `term_id` is not found in the glossary, a warning icon and error message appear in the build output and in the story panel.

### Column Aliases

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

## Validation

**Glossary warnings**:
- Missing `term_id` or `title` (row skipped)
- Glossary link `[[term_id]]` references nonexistent term

## See Also

- [Project Columns](/docs/your-data/csv-project/) — Project CSV column reference
- [Object Columns](/docs/your-data/csv-objects/) — Objects CSV column reference
- [Story Columns](/docs/your-data/csv-stories/) — Story step CSV columns
- [Glossary](/docs/site-features/glossary/) — Glossary setup and auto-linking
