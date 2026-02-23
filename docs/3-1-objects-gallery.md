---
layout: docs
title: 3.1. Objects & Gallery
parent: 3. Content Structure
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/content-structure/objects-gallery/
---

# Objects & Gallery

Objects are the visual items at the center of your Telar site — images, maps, documents, and other materials that your stories explore. The objects gallery provides a browsable, searchable interface for your collection.

## Defining Objects

Every object in your site is defined as a row in `objects.csv` (or `objetos.csv`), located in `components/structures/`.

At minimum, each object needs an `object_id` and a `title`:

```csv
object_id,title
textile-001,Colonial Textile Fragment
map-lima,Map of Lima
```

- **`object_id`** — A unique identifier (lowercase, hyphens, underscores). This becomes the object's URL: `/objects/textile-001/`
- **`title`** — The display name

For images, you have two options:
- **Self-hosted**: Place image files in `components/images/` with filenames matching the `object_id`. Telar generates IIIF tiles automatically.
- **External IIIF**: Add a `source_url` column pointing to a IIIF image URL (info.json or manifest).

You can add richer metadata for each object — description, creator, period, year, medium, dimensions, source, credit, and more. See the [CSV Reference: Project & Objects](/docs/reference/csv-project-objects/) for the complete column list.

## Object Pages

Each object gets its own page at `/objects/{object_id}/`. The page shows:

- A **IIIF viewer** displaying the image at full resolution with zoom and pan
- A **metadata table** with all available fields (creator, period, medium, dimensions, source, credit)
- A **coordinate picker** for finding x, y, and zoom values to use in story steps
- **Related stories** that reference the object
- A **description** section if you provided one in the CSV

![Object detail page with IIIF viewer and metadata](/images/object-detail.png)

### Coordinate Picker

The coordinate picker is a development tool on each object page. Click or zoom on the image, then read the normalized coordinates (0–1 range) displayed below the viewer. Use the **Copy** buttons to copy coordinates directly into your story CSV.

![Coordinate picker showing X, Y, and Zoom values below the image viewer](/images/coordinate-picker.png)

## Gallery Page

The gallery page at `/objects/` displays all objects in a grid. There are two modes, controlled by the `browse_and_search` setting in your `_config.yml`:

### Browse and Search Mode

When `browse_and_search` is `true` (the default), the gallery includes a **filter sidebar** and a **search bar** for exploring your collection.

![Objects gallery with search bar, sort options, and filter sidebar](/images/gallery-browse.png)

**Search** uses full-text indexing powered by Lunr.js. It searches across title, creator, description, period, subjects, and object type — with title matches weighted most heavily. Type a few characters and results update instantly.

**Filters** let you narrow the gallery by four facets:

| Facet | CSV column | Example values |
|-------|-----------|---------------|
| Type | `object_type` | map, textile, photograph, painting |
| Creator | `creator` | Unknown, Juan de Cuellar |
| Period | `period` | Colonial, 18th century |
| Subjects | `subjects` | weaving, cartography, Lima |

Each facet shows the number of matching objects in parentheses. Select multiple values within a facet to broaden results (OR logic), or combine facets to narrow them (AND logic).

**Sorting** offers two options:
- **Title** — Alphabetical (A–Z or Z–A)
- **Year** — Chronological, using the `year` column from your CSV

Active filters and search terms appear as removable chips above the grid. Click **Clear all** to reset.

### Simple Grid Mode

When `browse_and_search` is `false`, the gallery shows a plain grid of object cards without filtering or search.

### Populating Gallery Metadata

For the best gallery experience, fill in these columns in your `objects.csv`:

1. **`object_type`** for every object — powers the Type filter
2. **`subjects`** with 2–4 comma-separated terms — powers the Subjects filter
3. **`year`** — enables chronological sorting
4. **`description`** — indexed for full-text search
5. **`creator`** and **`period`** — power their respective filters

Without these columns, the gallery still works but filtering and sorting options are limited.

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

See [Configuration](/docs/reference/configuration/#collection-interface-settings) for full details on each setting.

## See Also

- [CSV Reference: Project & Objects](/docs/reference/csv-project-objects/) — Complete column reference for objects.csv
- [Configuration](/docs/reference/configuration/) — Collection interface settings
- [Stories & Panels](/docs/content-structure/stories-panels/) — How objects are used in stories
