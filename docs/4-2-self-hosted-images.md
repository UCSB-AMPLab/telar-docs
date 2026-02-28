---
layout: docs
title: "4.2. Self-Hosted Images"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/your-content/self-hosted-images/
---

# Self-Hosted Images

If you have your own images — photographs, scans of documents, maps — you can upload them directly to your Telar site. Telar automatically converts them into zoomable, high-resolution tiles so viewers can explore every detail.

This process uses a technology called [IIIF](https://iiif.io/) (International Image Interoperability Framework) behind the scenes, but you don't need to understand IIIF to use self-hosted images. Just upload your files and Telar handles the rest.

## Adding images

Each image needs to match an object defined in your spreadsheet. The filename (without its extension) must match the object's `object_id`.

For example, if your spreadsheet has an object with `object_id` = `textile-001`, name your image file `textile-001.jpg`.

**From the GitHub web interface:**

1. Navigate to `components/images/` in your repository
2. Click **Add file** > **Upload files**
3. Drag your images into the upload area
4. Make sure filenames match your object IDs
5. Commit changes

**For local development:**

1. Place your images in `components/images/`
2. Generate the IIIF tiles:
   ```bash
   python3 scripts/generate_iiif.py --base-url http://localhost:4001
   ```

{: .note }
> Telar only generates tiles for objects listed in your spreadsheet that don't already have an external IIIF source. This is automatic — just add your images and they'll be processed during the next build.

## Supported file formats

- **JPG, PNG, HEIC, WebP, TIFF** — all common image formats work
- Case doesn't matter: `.JPG`, `.png`, `.Tiff` are all fine
- **Resolution**: Higher is better — at least 2000px on the longest side is recommended for good zoom quality
- **Size limits**: Individual images up to 100 MB; keep the total repository under 1 GB for GitHub

{: .tip }
> **iPhone photos work directly.** HEIC photos from iPhones are supported natively — no need to convert them first. Telar converts them to JPEG automatically during tile generation while keeping your originals.

{: .tip }
> **Naming tip.** Use simple, descriptive IDs without spaces or special characters: `textile-001.jpg`, `ceramic-bowl-blue.jpg`

## How it works

When you add an image and build your site:

1. Telar creates tiled versions at multiple zoom levels
2. Tiles are saved to `iiif/objects/{object-id}/`
3. A manifest file describes the image structure
4. The viewer loads tiles progressively — only the visible area at the current zoom level, not the entire image

This allows smooth zooming even on very large images.

## Coordinate system

Telar uses normalized coordinates (values from 0 to 1) to describe positions within an image:

- **x**: Horizontal position (0 = left edge, 1 = right edge)
- **y**: Vertical position (0 = top edge, 1 = bottom edge)
- **zoom**: Zoom level (1.0 = full image, 2.0 = 2x zoom, etc.)

You use these coordinates in your story steps to tell Telar where to zoom in on each image.

### Finding coordinates

Each object page includes a built-in coordinate picker:

1. Navigate to any object page on your site
2. Click the **Identify coordinates** button
3. Pan and zoom to the view you want
4. Copy the X, Y, and Zoom values
5. Paste them into your story spreadsheet or CSV

{: .tip }
> The coordinate tool has a **Copy entire row** button that copies a complete row template with the coordinates already filled in — ready to paste into your spreadsheet.

## Troubleshooting

### Image not loading

- Check that the file exists in `components/images/`
- Make sure the filename (without extension) matches the `object_id` in your spreadsheet
- Verify the object has a blank `source_url` column (otherwise Telar expects an external image)
- Make sure IIIF tiles have been generated (check that `iiif/objects/{object-id}/` exists)

### Low quality display

- Use higher resolution source images (at least 2000px on the longest side)
- Very small images won't look good when zoomed in

### Slow loading

- Optimize file sizes before uploading (large TIFFs can be converted to high-quality JPEGs)
- GitHub Pages has bandwidth limits — for high-traffic sites, consider alternative hosting

## See also

- [External IIIF Images](/docs/your-content/external-iiif/) — Use images from museums and libraries instead of uploading your own
- [Objects](/docs/your-content/objects/) — How to define objects in your spreadsheet
- [Object Columns](/docs/your-data/csv-objects/) — Complete column reference for the objects spreadsheet
