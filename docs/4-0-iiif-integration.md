---
layout: docs
title: 4. IIIF Integration
parent: Documentation
nav_order: 4
lang: en
permalink: /docs/iiif-integration/
---

# IIIF Integration

Telar uses the International Image Interoperability Framework (IIIF) to serve high-resolution images that can be zoomed, panned, and explored in detail.

## What is IIIF?

IIIF (pronounced "triple-eye-eff") is a set of open standards for delivering high-quality, attributed digital objects online. It allows you to:

- Zoom into high-resolution images
- Pan across large images smoothly
- Use images from museums and libraries worldwide
- Host your own images with automatic tiling

[Learn more about IIIF](https://iiif.io/)

## Option 1: Local Images

Upload your images and Telar will automatically generate IIIF tiles.

### Adding Local Images

**For GitHub Web Interface:**

1. Navigate to `components/images/` in your repository
2. Click **Add file** → **Upload files**
3. Drag images into upload area
4. Name files to match object IDs (e.g., `textile-001.jpg`)
5. Commit changes

**For Local Development:**

1. Add high-resolution images to `components/images/`
2. Generate IIIF tiles:
   ```bash
   python3 scripts/generate_iiif.py --base-url http://localhost:4001
   ```

{: .note }
> **Sheet/CSV-Driven Processing**
> As of v0.5.0, Telar only generates IIIF tiles for objects listed in the `objects` tab of your Google Sheet or `objects.csv`, as long as these don't have an external IIIF manifest. This is automatic - just add your images and run the script.

### File Requirements

- **Formats**: JPG, PNG, HEIC, WebP, TIFF (case-insensitive: `.JPG`, `.png`, etc. all work)
- **Resolution**: Higher is better (at least 2000px on longest side recommended)
- **Size limits**:
  - Individual images: Up to 100 MB
  - Total repository: Keep under 1 GB for GitHub

{: .tip }
> **iPhone Photos Work Directly**
> As of v0.5.0, HEIC photos from iPhones are supported natively - no manual conversion needed. The IIIF generator automatically converts them to JPEG during tile generation while preserving your original files.

{: .tip }
> **Naming Convention**
> Use simple, descriptive IDs without spaces: `textile-001.jpg`, `ceramic-bowl-blue.jpg`

### How It Works

When you add an image:

1. The IIIF generator creates tiled versions at multiple zoom levels
2. Tiles are saved to `iiif/objects/[object-id]/`
3. A manifest file describes the image structure
4. The UniversalViewer loads tiles progressively as needed

This allows smooth zooming even on very large images.

## Option 2: External IIIF Resources

Reference IIIF images from museums, libraries, and other institutions worldwide.

### Finding IIIF Resources

Many institutions provide IIIF manifests:

- [IIIF Guide to Finding Resources](https://iiif.io/guides/finding_resources/)
- Major museums (British Museum, Getty, Smithsonian)
- Digital libraries (Internet Archive, Europeana)
- University collections

### Adding External IIIF

**In your objects CSV or Google Sheet:**

1. Create an `object_id` (e.g., `museum-textile-001`)
2. Add the IIIF manifest URL in the `source_url` column:
   ```
   https://example.org/iiif/image/abc123/info.json
   ```

### Manifest URL Formats

IIIF URLs typically look like:

- **Image API**: `https://example.org/iiif/2/abc123/info.json`
- **Presentation API**: `https://example.org/iiif/2/abc123/manifest.json`

Telar supports both formats.

## Mixing Local and External

You can use both local and external IIIF images in the same project:

```csv
object_id,title,...,source_url
local-textile-001,My Textile,,,
museum-textile-002,Museum Textile,...,https://example.org/iiif/manifest.json
local-ceramic-001,My Ceramic,,,
```

Leave `source_url` blank for local images.

## Metadata Auto-Population

Telar v0.4.0+ can automatically extract object metadata from IIIF manifests, reducing manual data entry and improving accuracy.

### How It Works

When you provide a `source_url` with an IIIF manifest, Telar automatically attempts to extract:

- **title** - Object title
- **description** - Detailed description
- **creator** - Artist, maker, or creator
- **period** - Date, period, or time range
- **location** - Repository or holding institution
- **credit** - Attribution line

### Supported IIIF Versions

Telar supports both IIIF Presentation API versions:

- **Version 2.0** - Widely used by many institutions
- **Version 3.0** - Latest standard with language maps

The extraction system automatically detects the version and uses the appropriate metadata structure.

### How to Use

Simply add the IIIF manifest URL to your objects CSV or Google Sheet. Leave other fields blank:

```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,,,https://example.org/iiif/manifest.json,,,,
```

When the site builds, Telar will:

1. Fetch the IIIF manifest
2. Extract available metadata fields
3. Populate empty fields with extracted data
4. Use your CSV data for any fields you filled in

### Override Control

**Your CSV data always wins.** You can:

- Let Telar extract all fields (leave them blank)
- Override some fields (fill them in, leave others blank)
- Override all fields (fill everything in, ignore manifest metadata)

**Example - partial override:**
```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,My Custom Title,,https://example.org/manifest.json,,,,
```

Telar will:
- Use "My Custom Title" (from CSV)
- Extract description, creator, period, location, and credit from IIIF manifest

### Language Detection

Metadata extraction respects your site's language setting (`telar_language` in `_config.yml`):

- **English sites** (`en`) - Prioritizes English metadata, falls back to other languages
- **Spanish sites** (`es`) - Prioritizes Spanish metadata, falls back to English, then others

If a manifest provides multilingual metadata, Telar selects the most appropriate language for your site.

### Smart Credit Detection

For the `credit` field, Telar uses intelligent fallback logic:

1. Looks for "Attribution" or "Rights" fields
2. Filters out legal boilerplate (Creative Commons URLs, rights statements)
3. Falls back to repository name if no specific attribution found

This ensures you get meaningful credit lines, not just legal text.

### Validation

During the build, Telar validates IIIF manifests:

- ✅ **Valid manifest** - Metadata extracted successfully
- ⚠️ **Manifest unavailable** - HTTP errors, will retry next build
- ⚠️ **No metadata found** - Manifest valid but contains no metadata fields

Check your build logs for extraction status and warnings.

### Build-Time Processing

Metadata extraction happens during the `python3 scripts/csv_to_json.py` step:

**GitHub Pages:** Automatic during deployment
**Local development:** Run manually when updating manifests:

```bash
python3 scripts/csv_to_json.py
```

### Example Workflow

1. Find a IIIF manifest URL from a museum or library
2. Add to your objects CSV with just the `object_id` and `source_url`
3. Build your site
4. Check the object page - metadata should be populated
5. Override any fields that need adjustment

### Common Metadata Fields

Different institutions use different field names. Telar searches for common variations:

**For title:**
- "Title", "Label", "Name"

**For description:**
- "Description", "Summary", "Note"

**For creator:**
- "Creator", "Artist", "Maker", "Author"

**For period:**
- "Date", "Period", "Creation Date", "Date Created"

**For location:**
- "Repository", "Holding Institution", "Current Location"

**For credit:**
- "Attribution", "Rights Holder", "Credit Line", "Provider"

### When to Override

You might want to override extracted metadata when:

- **Translation needed** - Manifest is in a different language
- **Abbreviations** - Institution uses codes or abbreviations
- **Multiple values** - Manifest has too much detail, you want a summary
- **Audience level** - Original description is too technical/academic

### Limitations

- Only works with **external IIIF manifests** (not local images)
- Requires publicly accessible manifests (no authentication)
- HTML tags are stripped from descriptions for YAML safety
- Some manifests may not include metadata fields

## Coordinate System

IIIF coordinates in Telar use normalized values (0-1):

- **x**: Horizontal position (0 = left edge, 1 = right edge)
- **y**: Vertical position (0 = top edge, 1 = bottom edge)
- **zoom**: Zoom level (1.0 = full image, 2.0 = 2x zoom, etc.)

### Finding Coordinates

Use the built-in coordinate identification tool:

1. Navigate to any object page
2. Click **Identify coordinates** button
3. Pan and zoom to the desired view
4. Copy the X, Y, and Zoom values
5. Paste into your story CSV or Google Sheet

{: .tip }
> **Pro Tip**
> The coordinate tool has a "Copy entire row" button that copies a complete CSV row template with the coordinates already filled in.

## Troubleshooting

### Image Not Loading

**For local images:**
- Verify file exists in `components/images/`
- Check that object_id matches filename (without extension)
- Ensure object is listed in `objects.csv` with a blank `source_url` column
- Ensure IIIF tiles were generated

**For external IIIF:**
- Verify manifest URL is correct
- Check that the resource is publicly accessible
- Try loading the manifest URL directly in your browser

### Low Quality Display

- Use higher resolution source images (at least 2000px)
- For external IIIF, check the institution's image quality settings

### Slow Loading

- For local images, optimize file sizes before upload
- Consider using external IIIF for very large images
- GitHub Pages has bandwidth limits; for high-traffic sites, consider other hosts

## Next Steps

- [Configure Your Site](/docs/configuration/)
- [Build Your Story](/docs/workflows/github-web/#phase-4-structure-your-story)
- [Learn about Customization](/docs/customization/)
