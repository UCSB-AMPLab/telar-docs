---
layout: docs
title: "4.3. External IIIF Images"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/your-content/external-iiif/
---

# External IIIF Images

Many museums, libraries, and archives make their collections available through a technology called [IIIF](https://iiif.io/) (International Image Interoperability Framework). This means you can build Telar stories around high-resolution images from institutions worldwide — without downloading or hosting the images yourself.

## Finding IIIF images

Look for IIIF resources at:

- [IIIF Guide to Finding Resources](https://iiif.io/guides/finding_resources/)
- Major museums (British Museum, Getty, Smithsonian, Rijksmuseum)
- Digital libraries (Internet Archive, Europeana, Gallica)
- University collections and special archives

When an institution supports IIIF, you'll typically find a manifest URL — a link that describes the image and its metadata. It usually ends in `info.json` or `manifest.json`.

## Adding an external image

In your objects spreadsheet (Google Sheet or `objects.csv`):

1. Create a row with a unique `object_id` (e.g., `museum-textile-001`)
2. Add the IIIF manifest URL in the `source_url` column:
   ```
   https://example.org/iiif/image/abc123/info.json
   ```

That's it. Telar will fetch the image directly from the institution's server when viewers visit your site.

### Manifest URL formats

IIIF URLs typically look like:

- **Image API**: `https://example.org/iiif/2/abc123/info.json`
- **Presentation API**: `https://example.org/iiif/2/abc123/manifest.json`

Telar supports both formats, and both IIIF versions (2.0 and 3.0).

## Mixing self-hosted and external images

You can use both your own images and external IIIF images in the same project. Leave `source_url` blank for objects that use self-hosted images:

```csv
object_id,title,...,source_url
my-textile,My Textile,,,
museum-map,Museum Map,...,https://example.org/iiif/manifest.json
my-ceramic,My Ceramic,,,
```

## Automatic metadata extraction

When you provide a `source_url`, Telar can automatically fill in metadata from the IIIF manifest — title, description, creator, period, location, and credit. This saves you from typing information that the institution has already recorded.

### How to use it

Add the IIIF manifest URL to your spreadsheet and leave the metadata fields blank:

```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,,,https://example.org/iiif/manifest.json,,,,
```

When your site builds, Telar will:

1. Fetch the IIIF manifest
2. Extract available metadata
3. Fill in any fields you left blank
4. Keep any values you entered yourself

### Your data always takes priority

You have full control over what gets extracted:

- **Leave fields blank** and Telar fills them from the manifest
- **Fill in some fields** and Telar only fills the rest
- **Fill in everything** and the manifest metadata is ignored

**Example — partial override:**
```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,My Custom Title,,https://example.org/manifest.json,,,,
```

Telar will use "My Custom Title" (your value) and extract the description, creator, period, location, and credit from the manifest.

### Language detection

Metadata extraction respects your site's language setting (`telar_language` in `_config.yml`):

- **English sites** (`en`) — Prioritizes English metadata, falls back to other languages
- **Spanish sites** (`es`) — Prioritizes Spanish metadata, then English, then others

### Smart credit detection

For the `credit` field, Telar filters out legal boilerplate (Creative Commons URLs, generic rights statements) and looks for meaningful attribution lines — the institution name, the rights holder, or the credit line.

### What Telar looks for

Different institutions label their metadata differently. Telar searches for common variations:

| Field | Looks for |
|-------|-----------|
| title | Title, Label, Name |
| description | Description, Summary, Note |
| creator | Creator, Artist, Maker, Author |
| period | Date, Period, Creation Date, Date Created |
| location | Repository, Holding Institution, Current Location |
| credit | Attribution, Rights Holder, Credit Line, Provider |

### When to override

You might want to enter your own values when:

- The manifest is in a language your audience won't understand
- The institution uses abbreviations or codes
- The description is too technical for your audience
- You want a shorter or simpler version of a field

### Build-time processing

Metadata extraction happens automatically during the site build:

- **GitHub Pages**: Runs during deployment — no action needed
- **Local development**: Run `python3 scripts/csv_to_json.py` when you add or update manifest URLs

### Validation

During the build, Telar checks each manifest:

- **Valid manifest** — Metadata extracted successfully
- **Manifest unavailable** — The URL didn't respond; will retry on the next build
- **No metadata found** — The manifest is valid but doesn't contain extractable fields

Check your build logs for extraction status.

### Limitations

- Only works with **external IIIF manifests** (self-hosted images don't have manifests to extract from)
- Manifests must be publicly accessible (no login required)
- HTML tags are removed from extracted text
- Some manifests may not include metadata fields

## Troubleshooting

### Image not loading

- Verify the manifest URL is correct — try opening it directly in your browser
- Make sure the resource is publicly accessible (no authentication required)
- Check that you pasted the full URL including `info.json` or `manifest.json`

### Metadata not appearing

- Check your build logs for extraction warnings
- The manifest may not include the fields you expect
- Try entering the values manually in your spreadsheet

### Slow loading

- External images load from the institution's server — speed depends on their infrastructure
- Some institutions may throttle requests from unfamiliar sites

## See also

- [Self-Hosted Images](/docs/your-content/self-hosted-images/) — Upload your own images instead of using external sources
- [Objects](/docs/your-content/objects/) — How to define objects in your spreadsheet
- [Object Columns](/docs/your-data/csv-objects/) — Complete column reference for the objects spreadsheet
