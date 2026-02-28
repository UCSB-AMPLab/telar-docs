---
layout: docs
title: "4.1. Objects"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/your-content/objects/
---

# Objects

Objects are the visual items at the center of your Telar site — images, maps, documents, and other materials that your stories explore.

## Defining Objects

Every object in your site is defined as a row in your objects spreadsheet — either in the objects tab of your Google Sheet, or in `objects.csv` (or `objetos.csv`) in `components/structures/`.

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

You can add richer metadata for each object — description, creator, period, year, medium, dimensions, source, credit, and more. See the [Object Columns](/docs/your-data/csv-objects/) reference for the complete column list.

## Object Pages

Each object gets its own page at `/objects/{object_id}/`. The page shows:

- A **IIIF viewer** displaying the image at full resolution with zoom and pan
- A **metadata table** with all available fields (creator, period, medium, dimensions, source, credit)
- A **coordinate picker** for finding x, y, and zoom values to use in story steps
- **Related stories** that reference the object
- A **description** section if you provided one in the spreadsheet

![Object detail page with IIIF viewer and metadata](/images/object-detail.png)

### Coordinate Picker

The coordinate picker is a development tool on each object page. Click or zoom on the image, then read the normalized coordinates (0–1 range) displayed below the viewer. Use the **Copy** buttons to copy coordinates directly into your story CSV.

![Coordinate picker showing X, Y, and Zoom values below the image viewer](/images/coordinate-picker.png)

## See Also

- [Objects Gallery](/docs/site-features/objects-gallery/) — Browse, search, and filter your collection
- [Object Columns](/docs/your-data/csv-objects/) — Complete column reference for objects.csv
- [Self-Hosted Images](/docs/your-content/self-hosted-images/) — Upload and process your own images
- [External IIIF Images](/docs/your-content/external-iiif/) — Use images from museums and libraries
- [Stories & Panels](/docs/your-content/stories-panels/) — How objects are used in stories
