---
layout: docs
title: "8.3. Demo System Architecture"
parent: "8. For Developers"
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/developers/demo-system/
---

# Demo System Architecture

This page describes how a Telar site fetches its demo content, merges it into the site's data, and marks it on the page, and how the demo bundles are produced. For what demo content looks like to a site's author, see [Demo Content](/docs/customization/demo-content/).

## Overview

Demo content is published as one JSON file per Telar release and language, the demo bundle, at [content.telar.org](https://content.telar.org). The site is served by GitHub Pages from the [demo content repository](https://github.com/UCSB-AMPLab/demo-content). A site downloads the bundle during its build, merges it into the JSON files in `_data/`, and the collection generator writes demo stories, objects and glossary entries as pages flagged `demo: true`.

The parts involved are:

| Part | Role |
|------|------|
| `scripts/fetch_demo_content.py` | Reads the site's settings, picks a bundle version, downloads and checks the bundle, and saves it |
| `scripts/telar/demo.py` | Runs the fetch script (`fetch_demo_content_if_enabled`), loads the saved bundle (`load_demo_bundle`), and merges it into `_data/` (`merge_demo_content`) |
| `scripts/telar/core.py` | Calls those functions from `main()`, which `scripts/csv_to_json.py` runs |
| `scripts/generate_collections.py` and `scripts/telar/glossary_pages.py` | Write the story, object and glossary pages, including the demo ones |
| `_demo_content/telar-demo-bundle.json` | The downloaded bundle; gitignored |
| `_data/demo-glossary.json` | The bundle's glossary entries, for the glossary page generator; gitignored |

## Build Sequence

The build workflow has no separate step for demo content. The fetch runs inside the **Convert CSV to JSON** step, which runs `python scripts/csv_to_json.py`.

When `csv_to_json.py` runs:

1. `fetch_demo_content_if_enabled()` runs `python3 scripts/fetch_demo_content.py` as a subprocess, before any spreadsheet is converted. It allows the subprocess 60 seconds and prints its standard output. The subprocess's exit status is not checked, and a timeout or an error starting it prints a warning and lets the build continue.
2. The site's project, objects and story spreadsheets are converted to JSON in `_data/`.
3. `load_demo_bundle()` reads `_demo_content/telar-demo-bundle.json` if it exists, and `merge_demo_content()` merges it into `_data/`.
4. `_cleanup_stale_data_files()` removes any `_data/*.json` story file that matches neither a spreadsheet in `telar-content/spreadsheets/` nor a story in the loaded bundle. This removes the demo story files after demo content is turned off, or after a change of language or bundle version. It also removes `_data/demo-glossary.json` when no bundle is loaded or the loaded bundle has no glossary, so the demo glossary entries go with the stories.

The next workflow step, **Generate Jekyll collections**, runs `generate_collections.py`, which writes the pages.

## Fetching the Bundle

### Settings

`load_config()` in `fetch_demo_content.py` reads three settings from `_config.yml`:

| Setting | Used for | When it is missing or invalid |
|---------|----------|-------------------------------|
| `story_interface.include_demo_content` | Whether to fetch | Treated as `false` |
| `telar.version` | Choosing the bundle version | A value that does not parse prints a warning, and the script exits without fetching |
| `telar_language` | Choosing the bundle language | Any value other than `en` or `es` prints a warning and is treated as `en` |

The version may carry a `v` or `V` prefix and a `-beta` suffix (for example `v1.8.0` or `1.0.0-beta`). The script uses only the three-part release number.

If `include_demo_content` is `false`, `cleanup_demo_content()` deletes `_demo_content/` and the script exits. If it is `true`, the script deletes `_demo_content/` first and then fetches, so a failed fetch leaves no bundle from an earlier build behind.

### Version Matching

`fetch_versions_index()` downloads `https://content.telar.org/demos/versions.json`, which lists the published bundle versions:

```json
{
  "versions": [
    "0.6.0",
    "0.8.1",
    "0.9.0",
    "1.8.0"
  ]
}
```

`find_best_version(site_version, available_versions)` returns the highest listed version that is less than or equal to the site's version. With the versions above, sites get these bundles:

| Site version | Bundle |
|--------------|--------|
| 1.8.0 and later | 1.8.0 |
| 0.9.0 to 1.7.x | 0.9.0 |
| 0.8.1 to 0.8.x | 0.8.1 |
| 0.6.0 to 0.8.0 | 0.6.0 |

If no listed version is less than or equal to the site's version, the script prints the available versions and exits without fetching. If `versions.json` cannot be read, the script tries a bundle for the site's own version.

### Download and Checks

`fetch_bundle(version, language)` downloads:

```
https://content.telar.org/demos/v{version}/{language}/telar-demo-bundle.json
```

and prints the bundle's `_meta.telar_version`, `_meta.language` and `_meta.generated`. On a 404, another HTTP error, a network error or invalid JSON, it prints the error and returns `None`, and the script exits with "Your site will build without demos".

The fetch script applies these limits:

| Limit | Value |
|-------|-------|
| Timeout for `versions.json` | 10 seconds |
| Timeout for the bundle | 30 seconds |
| Size of `versions.json` | 64 KB |
| Size of the bundle | 10 MB |

The size limits are `MAX_VERSIONS_BYTES` and `MAX_BUNDLE_BYTES` in `scripts/pipeline_utils.py`.

Before saving, `save_bundle()` checks that the bundle has the keys `_meta`, `objects`, `stories` and `project`; that `objects`, `stories` and `project` are each a list or an object; and that `objects` and `stories` have no more than 10,000 entries each. A bundle that fails any check is not saved. A bundle that passes is written to `_demo_content/telar-demo-bundle.json`.

## Bundle Format

A bundle has these top-level keys:

| Key | Contents |
|-----|----------|
| `_meta` | `bundle_format`, `telar_version`, `language`, `generated`, `generator`, `source`, `description`, `license` |
| `iiif_base_url` | The base URL of the bundle's hosted IIIF objects |
| `project` | A list of story entries, one per story |
| `objects` | An object keyed by object ID |
| `stories` | An object keyed by story ID, each holding a `steps` list |
| `glossary` | An object keyed by glossary entry ID |

The site's build does not read `iiif_base_url` or `_meta.bundle_format`.

A `project` entry from the English v1.8.0 bundle:

```json
{
  "order": 2,
  "story_id": "colonial-landscapes",
  "title": "Colonial Landscapes",
  "subtitle": "A 1614 legal painting of the Bogotá savanna — a story with complex content",
  "byline": "By Santiago Muñoz, Adelaida Ávila, and María Alejandra Orduz Avella",
  "show_sections": true
}
```

An entry in `objects`:

```json
"demo-leviathan": {
  "title": "Leviathan Frontispiece",
  "description": "Frontispiece from Thomas Hobbes’ Leviathan (1651), showing the sovereign as a giant body composed of individual citizens",
  "creator": "Abraham Bosse (after design by Thomas Hobbes)",
  "period": "17th century",
  "credit": "British Library",
  "year": "1651",
  "subjects": "political philosophy, sovereignty",
  "featured": "TRUE",
  "source": "British Library",
  "source_url": "https://content.telar.org/iiif/objects/demo-leviathan/manifest.json",
  "thumbnail": "https://content.telar.org/iiif/objects/demo-leviathan/full/231,313/0/default.jpg"
}
```

Each step in a story's `steps` list has `step`, `object`, `x`, `y` and `zoom`, and may have `question`, `answer`, `alt_text`, `page` and `layers`. A step whose `object` is empty is a title card. This is step 2 of `colonial-landscapes`:

```json
{
  "step": 2,
  "object": "",
  "x": 0.5,
  "y": 0.5,
  "zoom": 1.0,
  "question": "A Painting of the Savanna",
  "answer": "This document, which can be read both as a map and a painting, was part of a legal proceeding that consolidated one of the most important haciendas and family lineages of the New Kingdom of Granada."
}
```

`layers` holds `layer1` and `layer2`, each with `button`, `content` and, when the panel's markdown file has a title in its front matter, `title`. Layer content is raw markdown; the site's build renders it.

A glossary entry has `term` (its title) and `content` (markdown), and may have `kind` and `related_terms`. The `kind` value is written as in the source spreadsheet, for example `source` in the English bundle and `fuente` in the Spanish one; the site's build resolves both to the same kind.

## Merging into `_data/`

`merge_demo_content(bundle)` runs four functions in order. Each catches its own errors and prints a `[WARN]` line, so a failure in one does not stop the others.

### Stories in `project.json`

`_merge_demo_projects()` turns each `project` entry into a story record and puts the demo stories before the site's own in `stories` of the first entry in `_data/project.json`. It runs only when `_data/project.json` exists and the bundle's `project` list is not empty.

| Record field | Taken from |
|--------------|------------|
| `number` | `order`, as a string |
| `story_id` | `story_id` |
| `title`, `subtitle`, `byline` | The same fields |
| `show_sections` | `show_sections`, only when it is `true` |
| `_demo` | Always `true` |

No other field is carried. In the v1.8.0 bundles, `colonial-landscapes` and `paisajes` set `show_sections` to `true`, so their intro cards list their sections.

### Objects in `objects.json`

`_merge_demo_objects()` appends the bundle's objects to `_data/objects.json`. An object whose ID is already in the site's objects is skipped, and the site's object is kept.

Each demo object gets `object_id`, `title`, `description`, `source_url`, `iiif_manifest`, `creator`, `period`, `year`, `object_type`, `subjects`, `featured`, `source`, `credit`, `thumbnail`, `medium` and `_demo: true`, with these rules:

- `iiif_manifest` is a copy of `source_url`
- `source` falls back to `location`, the field name in the v0.6.0 bundles
- `medium` falls back to `object_type`
- `alt_text` is added only when the bundle object has a value for it
- `media_type` is computed from `source_url` by `detect_media_type()`, as for the site's own objects; a `media_type` in the bundle is not read

### Story Files

`_write_demo_stories()` writes one `_data/{story_id}.json` per bundle story. Each step becomes:

| Field | Value |
|-------|-------|
| `step`, `object`, `question`, `answer` | From the bundle step |
| `x`, `y`, `zoom` | From the bundle step, as strings; `0.5`, `0.5` and `1` when absent |
| `alt_text`, `page`, `clip_start`, `clip_end`, `loop` | Copied as strings, only when they have a value |
| `layer1_button`, `layer2_button` | The layer's `button` |
| `layer1_title`, `layer2_title` | The layer's `title`, or its `button` when it has none |
| `layer1_text`, `layer2_text` | The layer's `content`, rendered |
| `layer1_demo`, `layer2_demo` | `true` for every layer present |
| `_demo` | Always `true` |

Layer content goes through the same steps as a site's own panels: `process_widgets()`, then `process_images()`, then `render_markdown()`, which adds glossary links to the rendered HTML. Answers are rendered with `render_answer()`, as a site's answers are. If a story contains LaTeX, a `{"_metadata": true, "has_latex": true}` entry is put first in the file.

Glossary links in a demo story resolve against a link map built by `_demo_link_terms()` from the bundle's glossary and the site's own glossary pages together.

### Glossary

`_write_demo_glossary()` writes the bundle's glossary to `_data/demo-glossary.json` as a list. Each entry has `term_id`, `title` (from `term`), `content` and `_demo: true`, plus `kind` and `related_terms` when the bundle entry has them. A `related_terms` value written as a string is split on `|` into a list.

## Writing the Pages

`generate_collections.py` reads the merged data and writes the Jekyll collection files:

- **Stories** (`generate_stories()`): a story record with `_demo` gets `demo: true` in its front matter. Demo stories get `sort_order` values from 0 and the site's stories from 1000, so the home page lists demo stories first.
- **Objects**: a demo object gets `demo: true` in its front matter.
- **Glossary** (`generate_glossary()` in `scripts/telar/glossary_pages.py`): demo entries are written after the site's own, from `_data/demo-glossary.json`. Each gets `glossary_kind` (resolved by `resolve_kind()`) and `demo: true`.

Two glossary entries whose IDs produce the same page address cannot both be published. `place_demo_terms()` decides which demo entries are written: a demo entry whose address already belongs to a site entry, or to an earlier demo entry, is skipped with a warning, and links to its ID go to the page that holds the address. The same function decides the glossary links in demo stories, so the links and the pages agree. All demo entry IDs begin with `demo-`.

## Marking Demo Content

The layouts read the `demo` front matter flag, and the story engine reads the layer flags:

| File | What it shows |
|------|---------------|
| `_layouts/index.html` | A `demo-badge` with `lang.demo.badge` on demo story cards |
| `_layouts/story.html` | An `intro-demo-label` with `lang.story.demo_label` on a demo story's intro card |
| `assets/js/telar-story/panels.js` | A `demo-badge-inline` with `lang.demo.panel_badge` next to the title of a panel whose `layer1_demo` or `layer2_demo` is set |
| `_layouts/objects-index.html` | Lists the site's objects first and demo objects after them |
| `_includes/object-grid-item.html` | A `demo-badge` with `lang.demo.badge` on demo object cards |
| `_layouts/object.html` | An `object-demo-label` with `lang.story.demo_label` on a demo object's page |
| `_layouts/glossary-index.html` | A `demo-badge-inline` with `lang.demo.badge` next to demo entries |
| `_layouts/glossary.html` | A `demo-badge-inline` with `lang.demo.panel_badge` on a demo entry's page |

`panels.js` reads the panel badge text from `window.telarLang.demoPanelBadge`, which `_layouts/story.html` sets from `lang.demo.panel_badge`. The strings are in `_data/languages/en.yml` and `es.yml`:

| Key | English | Spanish |
|-----|---------|---------|
| `demo.badge` | DEMO | DEMO |
| `demo.panel_badge` | Demo content | Contenido de demostración |
| `story.demo_label` | Demo content | Contenido de demostración |

## Files on Disk

| Path | Written by | Removed |
|------|------------|---------|
| `_demo_content/telar-demo-bundle.json` | `save_bundle()` | By `cleanup_demo_content()` at the start of every run of the fetch script |
| `_data/{story_id}.json` for each demo story | `_write_demo_stories()` | By `_cleanup_stale_data_files()` when the loaded bundle no longer has the story |
| `_data/demo-glossary.json` | `_write_demo_glossary()` | By `_cleanup_stale_data_files()` when no bundle is loaded or the loaded bundle has no glossary |
| Demo records in `_data/project.json` and `_data/objects.json` | `_merge_demo_projects()`, `_merge_demo_objects()` | Rewritten from the site's spreadsheets on every build |

`.gitignore` lists `_demo_content/` and `_data/demo-glossary.json`.

## The Demo Content Repository

The bundles are built in the [demo content repository](https://github.com/UCSB-AMPLab/demo-content), which content.telar.org serves.

### Layout

The repository holds:

| Path | Contents |
|------|----------|
| `demos/versions.json` | The version index the fetch script reads |
| `demos/v{version}/{language}/` | One bundle's sources and its `telar-demo-bundle.json` |
| `iiif/all-demo-objects.csv` | The images the generator tiles, with English and Spanish metadata for their manifests |
| `iiif/sources/` | Source images for those tiles |
| `iiif/objects/{object_id}/` | Hosted IIIF objects: `manifest.json`, `info.json` and tiles |
| `assets/images/` | Images that panels use, such as carousel images |
| `generator/build-demos.py` | The bundle and tile generator |

A language directory holds these sources:

| File | Contents |
|------|----------|
| `demo-project.csv` | One row per story |
| `demo-objects.csv` | The objects |
| `{story_id}.csv` | One file per story, named by the story's `story_id` |
| `glossary.csv` or `glosario.csv` | The glossary entries |
| `texts/stories/` | Markdown files that panel cells point to |

The v1.8.0 bundles hold two stories: `allegorical-woman` (10 steps) and `colonial-landscapes` (22 steps) in English, and `mujer-alegorica` and `paisajes` in Spanish. Each language has 12 objects and 24 glossary entries.

### The Generator

The generator builds a bundle from a language directory's sources and writes it next to them. It reads the following columns:

| Source | Columns |
|--------|---------|
| Project | `order`, `story_id`, `title`, `subtitle`, `byline`, `show_sections` |
| Objects | `title`, `description`, `source_url`, `creator`, `period`, `credit`, `thumbnail`, `year`, `object_type`, `subjects`, `featured`, `medium`, `alt_text`, `source` |
| Story | `step`, `object`, `x`, `y`, `zoom`, `question`, `answer`, `alt_text`, `page`, `layer1_button`, `layer1_content`, `layer2_button`, `layer2_content` |
| Glossary | `term_id`, `title`, `definition`, `kind`, `related_terms` |

Spanish column names are accepted and mapped to these names, as in a site's own spreadsheets. A row is skipped when its key column (`order`, `object_id`, `step` or `term_id`) is empty or begins with `#`, and a project or story row whose `order` or `step` is not a number is skipped too. `show_sections` is written as `true` when the cell holds `yes`, `true`, `sí` or `si`.

A layer cell that ends in `.md` is read as a path under `texts/stories/`; its front matter is removed, and its `title`, if any, becomes the layer's `title`. Any other value is used as the panel's markdown. Carousel items whose images are in the repository's `assets/images/` get `width` and `height` written into them, so a site's build does not have to download the images to size the carousel.

For objects listed in `iiif/all-demo-objects.csv`, the generator fills in an empty `source_url` with the object's manifest URL on content.telar.org, and an empty `thumbnail` from the object's `info.json`. Other objects keep the `source_url` written in `demo-objects.csv`.

After a bundle is built, the generator rewrites `demos/versions.json` from the version directories that contain a `telar-demo-bundle.json`.

The generator's options are:

| Option | Effect |
|--------|--------|
| `--version`, `-v` | The bundle version to build, matching a `demos/v{version}/` directory; required unless `--iiif-only` is given |
| `--bundle-only` | Build the bundles only |
| `--iiif-only` | Generate IIIF tiles only |
| `--force` | Regenerate tiles that already exist |
| `--base-url` | The base URL written into IIIF manifests and into the URLs the bundle carries; defaults to `https://content.telar.org` |
| `--skip-validation` | Skip IIIF manifest validation |

To rebuild the v1.8.0 bundles without regenerating tiles:

```bash
python generator/build-demos.py --version 1.8.0 --bundle-only
```

## Troubleshooting

### Run the Fetch on Its Own

From the root of a site, run:

```bash
python3 scripts/fetch_demo_content.py
```

The script prints the site version and language it read, the bundle version it chose, the bundle's URL and `_meta` fields, and a count of the projects, objects, stories and glossary entries it saved.

### Check the Merge

After `python3 scripts/csv_to_json.py`, the merge prints a line for each part: `Merged 2 demo project(s) into project.json`, a `Merged … demo object(s)` line, a `Created demo story:` line for each story, and `Created _data/demo-glossary.json (24 demo terms)` for the v1.8.0 bundles. A failure in a part prints a `[WARN]` line instead. Each demo record in `_data/project.json` and `_data/objects.json` has `"_demo": true`.

### Check the Published Files

To see which versions are published, and to check that a bundle is reachable:

```bash
curl https://content.telar.org/demos/versions.json
curl -I https://content.telar.org/demos/v1.8.0/en/telar-demo-bundle.json
```

## Related Documentation

- [Demo Content](/docs/customization/demo-content/): demo content for site authors
- [GitHub Actions](/docs/developers/github-actions/): the build workflow
