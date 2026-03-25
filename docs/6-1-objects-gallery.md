---
layout: docs
title: "6.1. Objects Gallery"
parent: "6. Site Features"
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/site-features/objects-gallery/
---

# Objects Gallery

The objects gallery provides a browsable, searchable interface for your collection at `/objects/`.

## Gallery Page

There are two modes, controlled by the `browse_and_search` setting in your `_config.yml`:

### Browse and Search Mode

When `browse_and_search` is `true` (the default), the gallery includes a **filter sidebar** and a **search bar** for exploring your collection.

![Objects gallery with search bar, sort options, and filter sidebar](/images/gallery-browse.png)

**Search** uses full-text indexing powered by Lunr.js. It searches across title, creator, description, period, subjects, and medium — with title matches weighted most heavily. Type a few characters and results update instantly.

**Filters** let you narrow the gallery by five facets across two sections:

**Type** filters by the auto-detected media type of each object:

| Value | Description |
|-------|-------------|
| Image | Self-hosted or IIIF images |
| Video | YouTube, Vimeo, or Google Drive videos |
| Audio | Self-hosted audio files (MP3, OGG, M4A) |

**Medium/Genre** filters by the `medium` column in your `objects.csv` (previously called `object_type`). Values are user-defined — for example, map, textile, photograph, or painting.

The remaining facets work as before:

| Facet | CSV column | Example values |
|-------|-----------|---------------|
| Creator | `creator` | Unknown, Juan de Cuellar |
| Period | `period` | Colonial, 18th century |
| Subjects | `subjects` | weaving, cartography, Lima |

Each facet shows the number of matching objects in parentheses. Select multiple values within a facet to broaden results (OR logic), or combine facets to narrow them (AND logic).

Video and audio objects display icon placeholder thumbnails in the gallery grid instead of blank spaces. Each gallery item also carries `data-media-type` and `data-medium` attributes for styling or scripting purposes.

**Sorting** offers two options:
- **Title** — Alphabetical (A–Z or Z–A)
- **Year** — Chronological, using the `year` column from your CSV

Active filters and search terms appear as removable chips above the grid. Click **Clear all** to reset.

### Simple Grid Mode

When `browse_and_search` is `false`, the gallery shows a plain grid of object cards without filtering or search.

### Populating Gallery Metadata

For the best gallery experience, fill in these columns in your `objects.csv`:

1. **`medium`** for every object — powers the Medium/Genre filter (the column was previously called `object_type`; both names are accepted)
2. **`subjects`** with 2–4 comma-separated terms — powers the Subjects filter
3. **`year`** — enables chronological sorting
4. **`description`** — indexed for full-text search
5. **`creator`** and **`period`** — power their respective filters

Without these columns, the gallery still works but filtering and sorting options are limited.

{: .note }
> Objects added or uploaded via the Compositor appear in the gallery after publishing.

## Featured Objects on the Homepage

You can showcase a selection of objects on your homepage by marking them as featured:

1. In `objects.csv`, set `featured` to `yes` for the objects you want to highlight
2. In `_config.yml`, set `show_sample_on_homepage: true` under `collection_interface`

```yaml
collection_interface:
  show_sample_on_homepage: true
  featured_count: 4
```

The homepage displays up to `featured_count` objects (default: 4). If you mark fewer objects as featured than the count allows, the remaining slots are filled randomly from your collection.

### Homepage Objects Link

The "View the objects" link on the homepage is controlled separately:

```yaml
collection_interface:
  show_link_on_homepage: true  # Show or hide the link to /objects/
```

Even when the link is hidden, the gallery page remains accessible through the navigation menu.

## Configuration

All gallery settings live under `collection_interface` in `_config.yml`:

```yaml
collection_interface:
  browse_and_search: true       # Filter sidebar and search bar
  show_link_on_homepage: true   # "View the objects" link on homepage
  show_sample_on_homepage: true # Featured objects grid on homepage
  featured_count: 4             # Number of homepage objects
```

See [Configuration Reference](/docs/configure/configuration/#collection-interface-settings) for full details on each setting.

## See Also

- [Objects](/docs/your-content/objects/) — Defining objects and object pages
- [Object Columns](/docs/your-data/csv-objects/) — Complete column reference for objects.csv
- [Configuration Reference](/docs/configure/configuration/) — Collection interface settings
