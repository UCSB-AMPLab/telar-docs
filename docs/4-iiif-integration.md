---
layout: default
title: 4. IIIF Integration
parent: Documentation
nav_order: 4
lang: en
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

Upload your own images and Telar will automatically generate IIIF tiles.

### Adding Local Images

**For GitHub Web Interface:**

1. Navigate to `components/images/objects/` in your repository
2. Click **Add file** → **Upload files**
3. Drag images into upload area
4. Name files to match object IDs (e.g., `textile-001.jpg`)
5. Commit changes

**For Local Development:**

1. Add high-resolution images to `components/images/objects/`
2. Generate IIIF tiles:
   ```bash
   python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000
   ```

### File Requirements

- **Formats**: JPG, PNG, TIFF
- **Resolution**: Higher is better (at least 2000px on longest side recommended)
- **Size limits**:
  - Individual images: Up to 100 MB
  - Total repository: Keep under 1 GB for GitHub

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
2. Add the IIIF manifest URL in the `iiif_manifest` column:
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
object_id,title,...,iiif_manifest
local-textile-001,My Textile,,,
museum-textile-002,Museum Textile,...,https://example.org/iiif/manifest.json
local-ceramic-001,My Ceramic,,,
```

Leave `iiif_manifest` blank for local images.

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
- Verify file exists in `components/images/objects/`
- Check that object_id matches filename
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
