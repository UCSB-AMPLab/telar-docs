---
layout: docs
title: 2.4. Google Sheets Integration
parent: 2. Workflows
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/workflows/google-sheets/
---

## Google Sheets Integration

Use Google Sheets to manage your Telar content through a familiar, collaborative interface. This works with both the GitHub Web workflow and Local Development.

## Quick start

1. Duplicate the template: <https://bit.ly/telar-template> (File → Make a copy)
2. Share: Anyone with the link (Viewer)
3. Publish: File → Share → Publish to web
4. Configure `_config.yml` → `google_sheets` block (shared_url, published_url)
5. Build your site (GitHub Actions or local build)

Optional: Import from Excel instead of duplicating the Google template

- Download the Excel template (raw file):
  {{ site.baseurl }}/assets/templates/telar-template.xlsx
- In Google Sheets: File → Import → Upload → Replace spreadsheet

## Sheet structure

Your spreadsheet contains these tabs by default:

- `project` — Site-wide settings and story list
- `objects` — IIIF objects used across stories
- `story-1`, `story-2`, ... — Steps and content for each story

Tips

- Use `#`-prefixed rows as section breaks or TODOs (ignored during processing)
- Any column starting with `#` is also ignored (for inline notes/guidance)
- Coordinates: start with `0.500, 0.500, 1.000` and refine later using the Identify Coordinates tool

## Configuring `_config.yml`

In your repository, set:

```yaml
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/..." # Share: Anyone with the link (Viewer)
  published_url: "https://docs.google.com/..." # File → Share → Publish to web
```

- The `shared_url` ensures the fetcher can read the spreadsheet
- The `published_url` provides stable CSV endpoints for each sheet

![GitHub screenshot for editing config file](/images/config_drive.gif)

## Fetching data (local dev only)

When developing locally, fetch latest CSVs before building:

```bash
python3 scripts/fetch_google_sheets.py
```

What it does:

- Discovers tab GIDs automatically
- Downloads CSVs to `components/structures/`
- Skips instruction-only tabs

Then run your normal build steps:

```bash
python3 scripts/csv_to_json.py
python3 scripts/generate_collections.py
bundle exec jekyll build
```

## Column reference (summary)

`project` tab

- After the `STORIES` row, list each story (number and title)

`objects` tab (common fields)

- object_id, title, description, iiif_manifest, creator, period, medium, dimensions, location, credit, thumbnail

![GitHub screenshot for editing sheet objects](/images/object-sheet.png)

`story-X` tabs

- step, object, x, y, zoom, question, answer, layer1_button, layer1_file, layer2_button, layer2_file

## Troubleshooting

- Invalid object references → ensure IDs match exactly between `objects` and story tabs
- Fetch fails → verify share/publish settings and URLs in `_config.yml`
- Coordinates off → keep values in range (x/y: 0.000–1.000; zoom: positive number)

## See also

- [GitHub Web workflow](/docs/workflows/github-web/)
- [Local Development workflow](/docs/workflows/local-dev/)
- [Upgrading](/docs/workflows/upgrading/)
