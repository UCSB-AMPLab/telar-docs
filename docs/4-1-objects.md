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

Objects are the materials at the center of your Telar site — images, videos, audio recordings, documents, and other materials that your stories explore.

{: .tip }
> The [Compositor](/docs/the-compositor/objects/) provides a visual interface for managing objects — including IIIF manifest auto-fetch, image upload, and metadata editing.

## Defining Objects

Every object in your site is defined as a row in your objects spreadsheet — either in the objects tab of your Google Sheet, or in `objects.csv` (or `objetos.csv`) in `telar-content/spreadsheets/`.

At minimum, each object needs an `object_id` and a `title`:

```csv
object_id,title
textile-001,Colonial Textile Fragment
map-lima,Map of Lima
```

- **`object_id`** — A unique identifier (lowercase, hyphens, underscores). This becomes the object's URL: `/objects/textile-001/`
- **`title`** — The display name
- **`alt_text`** — Alternative text for accessibility (optional). Falls back to `title` if left empty.

### Media type detection

Telar automatically determines whether an object is an image, video, or audio file based on its source — no additional configuration is needed:

- **Image** — A self-hosted file (JPG, PNG, etc.) in `telar-content/objects/`, or an external IIIF manifest in `source_url`
- **Video** — A YouTube, Vimeo, or Google Drive URL in `source_url`
- **Audio** — A self-hosted audio file (MP3, OGG, M4A) in `telar-content/objects/`

For images, you have two options:
- **Self-hosted**: Place image files in `telar-content/objects/` with filenames matching the `object_id`. Telar generates IIIF tiles automatically.
- **External IIIF**: Add a `source_url` column pointing to a IIIF image URL (info.json or manifest).

For videos and audio, see [Video Objects](/docs/your-content/video-objects/) and [Audio Objects](/docs/your-content/audio-objects/).

You can add richer metadata for each object — description, creator, period, year, `medium` (the genre or medium of the object, e.g. "Photograph", "Oil painting", "Oral history"), dimensions, source, credit, and more. See the [Object Columns](/docs/your-data/csv-objects/) reference for the complete column list.

{: .note }
> The `medium` column (previously `object_type`) describes the genre or medium of the object — not the media type (Image, Video, Audio), which Telar detects automatically. The column name `object_type` still works for backward compatibility.

## Object Pages

Each object gets its own page at `/objects/{object_id}/`. The page shows:

- A **viewer** — a IIIF deep-zoom viewer for images, an embedded player for videos, or an audio player for audio files
- A **metadata table** with all available fields (creator, period, medium, dimensions, source, credit)
- A **coordinate picker** (images) or **clip time picker** (videos and audio) for capturing values to use in story steps
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
- [Video Objects](/docs/your-content/video-objects/) — Adding videos from YouTube, Vimeo, and Google Drive
- [Audio Objects](/docs/your-content/audio-objects/) — Adding self-hosted audio files
- [Stories & Panels](/docs/your-content/stories-panels/) — How objects are used in stories
