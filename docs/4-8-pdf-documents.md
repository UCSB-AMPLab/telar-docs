---
layout: docs
title: "4.8. PDF Documents"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 8
lang: en
permalink: /docs/your-content/pdf-documents/
---

# PDF Documents

Telar can display multi-page PDF documents — books, legal records, manuscripts, maps — as zoomable, high-resolution objects. Each page of a PDF becomes a deep-zoom image, just like a photograph or scan.

This means you can build stories that zoom into specific pages and regions of a document, guiding your audience through details that might otherwise go unnoticed.

## Adding a PDF

Adding a PDF works the same way as adding an image. Place the file in `telar-content/objects/` with a filename matching the `object_id` in your spreadsheet.

For example, if your spreadsheet has an object with `object_id` = `new-laws`, name your file `new-laws.pdf`.

**From the GitHub web interface:**

1. Navigate to `telar-content/objects/` in your repository
2. Click **Add file** > **Upload files**
3. Upload your PDF file
4. Make sure the filename (without `.pdf`) matches your `object_id`
5. Commit changes

**For local development:**

1. Place your PDF in `telar-content/objects/`
2. Generate the IIIF tiles:
   ```bash
   python3 scripts/generate_iiif.py --base-url http://localhost:4001
   ```

{: .note }
> Telar renders every page of the PDF as a high-resolution image during the build process. A 40-page PDF will produce 40 separate page images, each with its own set of zoom tiles. Build times increase with page count.

## How it works

When you add a PDF and build your site:

1. Telar renders each page as a high-resolution JPEG image using PyMuPDF
2. Each page image is tiled at multiple zoom levels (just like a photograph)
3. A IIIF manifest is generated for each individual page, plus a multi-page manifest for the full document
4. On object pages, the viewer shows the full document with page navigation
5. In stories, each step can reference a specific page

## Object pages vs. stories

PDFs behave differently depending on the context:

- **Object pages** (`/objects/new-laws/`) show the full document. The viewer includes page navigation controls — forward/back arrows and a page selector — so visitors can browse through all pages.

- **Stories** show one page at a time. Each story step specifies which page to display using the `page` column in your spreadsheet. The viewer zooms to the coordinates you set for that page, just like it does for a photograph.

## Using PDFs in stories

To reference a specific page of a PDF in a story step, add a `page` column to your story spreadsheet. The value is the page number (starting from 1).

```csv
step,object,x,y,zoom,page,question,answer
1,new-laws,0.5,0.5,1,1,What is this document?,The Recopilación de leyes de los reynos de las Indias codified Spanish colonial law.
2,new-laws,0.4,0.15,2.5,10,A key provision,This page details the legal framework governing colonial administration.
3,textile-001,0.5,0.3,0.8,,What is this textile?,A colonial fragment showing complex weaving patterns.
```

- Steps 1 and 2 reference pages 1 and 10 of the `new-laws` PDF
- Step 3 references a regular image (`textile-001`) with no `page` value — the column is left empty for single-image objects

{: .tip }
> **Finding coordinates for a specific page.** Navigate to the object page for your PDF (`/objects/new-laws/`). Use the page navigation controls to go to the page you want. Then use the coordinate picker — it automatically includes the current page number in the copied values.

### The `page` column

- **Page numbers start at 1** (page 1 is the first page of the PDF)
- **Must be a positive integer** — decimal or negative values produce a warning
- **Leave empty for single-image objects** — Telar ignores empty `page` values
- **Bilingual column names**: `page` (English) or `pagina` / `página` (Spanish)

## Supported PDF types

Telar renders PDFs using PyMuPDF, which handles most standard PDF files:

- **Scanned documents** — Photographed or scanned pages (the most common type in historical research)
- **Native PDFs** — Documents with embedded text and vector graphics
- **Mixed PDFs** — Documents combining scanned images and native text

{: .note }
> PDF rendering quality depends on the source document. Scanned pages at 300 DPI or higher produce the best deep-zoom results. Low-resolution scans may appear blurry when zoomed in.

## Size considerations

PDFs produce more data than single images because every page generates its own tile pyramid:

- A 10-page PDF produces roughly 10x the tiles of a single image
- A 100-page document can add significant build time and repository size
- Consider using only the pages you need rather than including the entire document

{: .note }
> **If your site is hosted on GitHub Pages** (the default for most Telar sites), keep in mind that GitHub does not allow individual files larger than 100 MB, and recommends keeping the total repository size under 1 GB. A large PDF plus all the zoom tiles it generates can add up quickly.

{: .tip }
> **For very large documents** (100+ pages), check whether a library or archive already hosts a digitized version with a IIIF manifest. If so, you can use the manifest URL in your `source_url` column instead of self-hosting the PDF. See [External IIIF Images](/docs/your-content/external-iiif/) for how to find and use these manifests.

## Troubleshooting

### PDF not loading

- Check that the file exists in `telar-content/objects/`
- Make sure the filename (without `.pdf`) matches the `object_id` in your spreadsheet
- Verify the object has a blank `source_url` column
- Make sure IIIF tiles have been generated (check that `iiif/objects/{object-id}/` exists)

### Wrong page displayed in story

- Check the `page` value in your story spreadsheet — it should be a positive integer
- Page numbers start at 1, not 0
- Use the coordinate picker on the object page to verify the correct page number

### Build errors

- Make sure PyMuPDF is installed (`pip install pymupdf`)
- If PyMuPDF is not available, Telar skips PDF files with an info message — other objects still process normally

## See also

- [Self-Hosted Images](/docs/your-content/self-hosted-images/) — Adding photographs and scans
- [Objects](/docs/your-content/objects/) — Defining objects in your spreadsheet
- [Stories & Panels](/docs/your-content/stories-panels/) — Building story steps
- [Story Columns](/docs/your-data/csv-stories/) — Complete column reference including the `page` column
- [External IIIF Images](/docs/your-content/external-iiif/) — Using IIIF manifests from libraries and archives
