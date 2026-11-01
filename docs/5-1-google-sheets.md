---
layout: docs
title: "Understand the spreadsheet"
parent: "5. Your Data"
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/your-data/google-sheets/
---

# Understand the spreadsheet

<span class="anchor-alias" id="troubleshooting"></span>

<span class="anchor-alias" id="see-also"></span>

<span class="anchor-alias" id="google-sheets-integration"></span>

<span class="anchor-alias" id="fetching-data-local-dev-only"></span>

<span class="anchor-alias" id="configuring-_configyml"></span>

<span class="anchor-alias" id="column-reference-summary"></span>

Your Google Sheet is the source for a generated edition of your exhibition. Editing a cell does not immediately change the public site: the next build fetches the published sheet and processes it.

## How the tabs connect

| Tab | Purpose | Connection |
|---|---|---|
| `project` | Lists stories and their display order | `story_id` identifies a story tab |
| `objects` | Describes the shared source collection | `object_id` is used in story rows |
| A tab for each story | Lists its steps, views, questions and panels | `object` matches an object ID |
| `glossary` | Defines recurring terms | `term_id` is used in text links |

The template includes guidance and bilingual headers. Keep the machine-readable column names. Rows or columns beginning with `#` are ignored.

<span class="anchor-alias" id="quick-start"></span>
## Start with the template

Use the template linked in the [guided setup](/docs/getting-started/google-sheets/). Make your own copy, then publish the spreadsheet through **File → Share → Publish to web**.

The ordinary editing link is different from the published link. The configuration needs the published address:

```yaml
google_sheets:
  enabled: true
  published_url: "YOUR-PUBLISHED-SPREADSHEET-URL"
```

Publish the tabs Telar must read. Do not put confidential notes in content you publish to the web.

## Keep IDs consistent

Use short, stable IDs with lowercase letters and hyphens. A story ID must match its tab name. An object reference must match an ID in `objects`. A glossary link must match the term ID.

Titles can change without changing these relationships. Renaming an ID requires updating the references that use it.

## Use text and file references

A short panel can be written directly in a `layer1_content` or `layer2_content` cell. Use Markdown syntax for formatting. A path ending in `.md` can refer to a longer text in the repository's stories text folder.

Answers are brief plain prose. Panels are the place for richer formatting and further context. See [story columns](/docs/your-data/csv-stories/) for supported fields.

<span class="anchor-alias" id="sheet-structure"></span>
## Choose this sheet as the source

If you move to the Compositor, review its import process and switch the content source deliberately. The Compositor does not write your visual edits back to the Google Sheet. Leaving Sheets enabled can cause later builds to replace those edits with the sheet's content.

For local work, `python3 scripts/build_local_site.py` fetches Sheets when enabled. The CSV copies in `telar-content/spreadsheets/` are fetched inputs; edit the sheet if it is your chosen source.

Next, [add an object and build a first story](/docs/getting-started/add-content/).
