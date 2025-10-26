---
layout: default
title: 2.1. GitHub Web Interface
parent: 2. Workflows
grand_parent: Documentation
nav_order: 1
lang: en
---

# GitHub Web Interface Workflow

**No installation required!** Build your narrative entirely through GitHub's web interface and Google Sheets.

## Overview

This workflow lets you create Telar exhibitions without installing any software. You'll manage content through GitHub's web interface and Google Sheets, with automatic builds handled by GitHub Actions.

{: .note }
> **Quick Start Option**
> If you're eager to experiment, skip to [Phase 2: Get Your Workspace Ready](#phase-2-get-your-workspace-ready) and then jump to [Phase 4: Structure Your Story](#phase-4-structure-your-story).

## Phase 1: Narrative Planning

Before diving in, plan your story:

- Browse the [Telar example site](https://ampl.clair.ucsb.edu/telar) for inspiration
- What story do you want to tell?
- What are the key steps or moments in your story?
- For each step, draft a **question** (heading) and **answer** (brief 1-2 sentence response)
- What image or images can you use to anchor your story?
- What details in these images matter most and when?
- Sketch your narrative structure on paper before using tools

## Phase 2: Get Your Workspace Ready

### Create Your Repository

1. Visit the [Telar GitHub repository](https://github.com/UCSB-AMPLab/telar)
2. Click the green **Use this template** button
3. Choose a repository name
4. Click **Create repository**

{: .note }
> You'll need a GitHub account if you don't have one. Sign up at [github.com](https://github.com/join).

### Duplicate the Google Sheets Template

1. Go to [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Click **File** → **Make a copy**
3. Save to your Google Drive with a descriptive name

You're ready! Now you have places to upload images and organize content.

## Phase 3: Gather Materials

Telar supports two ways to add images:

### Option A: Upload Your Own Images

1. Navigate to `components/images/objects/` in your GitHub repository
2. Click **Add file** → **Upload files**
3. Drag images into upload area
4. Name files with simple object IDs (e.g., `textile-001.jpg`, `ceramic-002.jpg`)
   - Avoid spaces in filenames
5. Add the object ID (with or without file extension) to the "objects" tab of your spreadsheet
6. Commit changes to save

{: .warning }
> **File Size Limits**
> Individual images: Up to 100 MB
> Total repository: Keep under 1 GB

### Option B: Use IIIF Images

1. Find IIIF resources from institutions ([IIIF Guide to Finding Resources](https://iiif.io/guides/finding_resources/))
2. Copy the manifest URL (e.g., `https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json`)
3. Add to the "objects" tab with a simple object_id (e.g., `museum-textile-001`)

### Add Object Details

Fill in the objects tab of your spreadsheet:
- `object_id`: Simple identifier (matches filename for uploaded images)
- `title`: Display name
- `description`: Brief description
- `creator`, `date`, `medium`, `dimensions`, `location`, `credit`: Metadata fields
- `iiif_manifest`: URL for external IIIF resources (leave blank for uploaded images)

### Create Narrative Texts

Write markdown files for your story layer content:

1. Navigate to `components/texts/stories/story1/` in your repository
2. Click **Add file** → **Create new file**
3. Name the file (e.g., `step1-layer1.md`, `weaving-techniques.md`)
   - Avoid spaces (use hyphens or underscores)
   - Use `.md` extension
4. Add frontmatter and content:
   ```markdown
   ---
   title: "Weaving Techniques"
   ---

   The interlocking warp pattern visible here indicates...
   ```
5. Commit the file
6. Keep note of paths for Phase 4

## Phase 4: Structure Your Story

Connect everything in your Google Sheets story sheet:

### Add Story Steps

For each step in your story, add a row with:
- **Question**: The heading text (e.g., "What is this textile?")
- **Answer**: A brief 1-2 sentence response
- **Object ID**: The object to display (matching your objects sheet)
- **Coordinates**: Use placeholders for now (0.5, 0.5, 1.0) - refine in Phase 6

### Connect Narrative Content

Reference the markdown files you created:
- In `layer1_file` column: add path (e.g., `story1/step1-layer1.md`)
- In `layer2_file` column: add path if you have a second layer
- Leave blank if a step doesn't need a panel

### Customize Panel Buttons (Optional)

- Add custom button text in `layer1_button` and `layer2_button` columns
- Leave blank to use defaults ("Learn more" and "Go deeper")

{: .tip }
> **Ignoring Rows**
> Add a `#` prefix to ignore rows or add notes:
> - `# TODO: verify this date`
> - The template includes a `# Instructions` column for guidance

## Phase 5: Connect and Publish

### Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Click **Save**

### Share Your Google Sheet

1. Click **Share** button
2. Set to "Anyone with the link (Viewer)"
3. Copy the shared URL

### Publish Your Google Sheet

1. **File** → **Share** → **Publish to web**
2. Click **Publish**
3. Copy the published URL

### Configure `_config.yml`

1. Navigate to `_config.yml` in your repository
2. Click pencil icon to edit
3. Find `google_sheets` section
4. Set `enabled: true`
5. Paste shared URL into `shared_url`
6. Paste published URL into `published_url`
7. (Optional) Choose your theme:
   ```yaml
   telar_theme: "paisajes"  # Options: paisajes, neogranadina, santa-barbara, austin
   ```
8. Commit changes

### Wait for Build

1. GitHub Actions will automatically build your site (2-5 minutes)
2. View your site at `https://[username].github.io/[repository]/`

## Phase 6: Refine

Polish your narrative:

### Review Your Site

1. Browse through pages and stories
2. Check for warning messages on the home page
3. Fix any configuration issues in Google Sheets

### Use Coordinate Identification Tool

1. Navigate to any object page
2. Click **Identify coordinates** button below viewer
3. Pan and zoom to find the perfect view for each story step
4. Copy coordinates (X, Y, Zoom values)
5. Paste into your story sheet

### Trigger Rebuild

After editing Google Sheets:

1. Go to repository's **Actions** tab
2. Click **Build and Deploy** workflow
3. Click **Run workflow** button
4. Select branch (usually `main`)
5. Click green **Run workflow** button
6. Wait 2-5 minutes

### Iterate

1. Add additional content layers
2. Add glossary terms
3. Polish until your story shines

## Next Steps

- [Learn about Content Structure](/docs/content-structure/)
- [Explore IIIF Integration](/docs/iiif-integration/)
- [Customize Your Theme](/docs/customization/themes/)
