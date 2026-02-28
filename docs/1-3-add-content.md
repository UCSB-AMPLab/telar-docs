---
layout: docs
title: 1.3. Add Your Content
parent: 1. Getting Started
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/getting-started/add-content/
tutorial_prev:
  title: "Plan Your Narrative"
  url: /docs/getting-started/narrative-structure/
tutorial_next:
  title: "Review and Refine"
  url: /docs/getting-started/review-refine/
---

# Step 3: Add Your Content

Setup is done. From here, everything happens in your Google Sheets spreadsheet.

## Add Your Images

Telar supports two ways to include images:

**Option A: Upload your own images**

1. In your GitHub repository, navigate to `components/images/`
2. Click **Add file** → **Upload files**
3. Drag your images into the upload area
4. Give each file a simple name without spaces (e.g., `textile-001.jpg`, `map-lima.jpg`)
5. Click **Commit changes** to save

The filename (without the extension) becomes the image's `object_id` — you will use this in your spreadsheet.

![Uploading files on GitHub](/images/add-files.png)
![Committing uploaded files](/images/commit-files.png)

{: .warning }
> **File Size Limits**
> Individual images: up to 100 MB. Total repository: keep under 1 GB.

**Option B: Use IIIF images from museums and libraries**

Many institutions provide high-resolution images through the IIIF standard. You can use these directly without downloading anything.

1. Find IIIF resources from institutions like the Library of Congress, the British Library, or the Smithsonian ([IIIF Guide to Finding Resources](https://iiif.io/guides/finding_resources/))
2. Copy the manifest URL (e.g., `https://example.org/iiif/manifest.json`)
3. In your spreadsheet's objects tab, add a row and paste the URL into the `source_url` column

![Finding a IIIF manifest URL](/images/external-iiif-manifest.png)

## Fill in the Objects Tab

In your Google Sheet, go to the **objects** tab and add a row for each image:

- **`object_id`** — a simple identifier (matches the filename for uploaded images, or any name for IIIF images)
- **`title`** — the display name
- **`description`** — a brief description (optional, but helps with search)
- **`source_url`** — the IIIF manifest URL (leave blank for uploaded images)
- **`creator`**, **`year`**, **`object_type`**, **`subjects`** — metadata for gallery filtering (all optional)

{: .tip }
> **Ignoring Rows and Columns**
> Prefix any row or column header with `#` to have Telar skip it. Useful for notes and TODOs.

## Structure Your Story

In each story tab (e.g., **story-1**), add a row for each step in your narrative:

| Column | What it does |
|--------|-------------|
| `step` | Step number (1, 2, 3...) |
| `object` | Which image to show (the `object_id` from the objects tab) |
| `x`, `y`, `zoom` | Where to look in the image — use `0.5, 0.5, 1.0` as a starting point |
| `question` | The heading for this step (e.g., "What is this textile?") |
| `answer` | A brief 1-2 sentence response |

This is enough to create a working story. Each step shows an image with a question and answer that guide the viewer through your narrative.

## Add Detail Panels

For steps where you want to share more than a brief answer, add content to the panel columns:

| Column | What it does |
|--------|-------------|
| `layer1_content` | "Learn more" panel — extra detail about this step |
| `layer2_content` | "Go deeper" panel — even more depth |
| `layer1_button` | Custom button text (leave blank for "Learn more") |
| `layer2_button` | Custom button text (leave blank for "Go deeper") |

Write your panel text directly in the cell. You can use basic markdown formatting: `**bold**`, `*italic*`, and headings with `##`.

{: .tip }
> **Keep It Simple**
> For most stories, the question-and-answer columns plus one layer of detail panels is plenty. You can always add more depth later.

## Register Your Stories

In the **project** tab, list each story with its title and subtitle. The template shows you the format — add a row for each story tab you have created.

## Trigger a Rebuild

After editing your Google Sheet, tell GitHub to rebuild your site:

1. Go to your repository's **Actions** tab
2. Click **Build and Deploy** workflow
3. Click **Run workflow** → select `main` → click the green **Run workflow** button
4. Wait 2-5 minutes for the new version
