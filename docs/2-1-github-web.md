---
layout: docs
title: 2.1. Quick Start
parent: 2. Set Up Your Site
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/workflows/github-web/
---

# GitHub Web Interface Workflow

**No installation required.** Build your Telar exhibition entirely in your browser using GitHub and Google Sheets.

## Overview

This is the simplest way to create a Telar site. You manage all your content — objects, stories, and text — in a Google Sheets spreadsheet. GitHub handles hosting your images and publishing your site automatically.

You will need:

- A [GitHub account](https://github.com/join) (free)
- A [Google account](https://accounts.google.com/) for Google Sheets (free)

{: .note }

> **Quick Start**
> If you want to jump right in, skip to [Phase 2: Set Up Your Workspace](#phase-2-set-up-your-workspace) and come back to Phase 1 later.

## Phase 1: Plan Your Story

Before you start, spend a few minutes thinking about your narrative:

- Browse the [Telar example site](https://ampl.clair.ucsb.edu/telar) for inspiration
- What story do you want to tell? What are the key moments?
- For each moment, draft a **question** (heading) and a brief **answer** (1-2 sentences)
- What images will anchor your story? What details matter most?
- Sketch your narrative structure on paper — even a rough outline helps

## Phase 2: Set Up Your Workspace

### Create Your Repository

A repository is your project's home on GitHub — it holds your images and configuration files.

1. Visit the [Telar template](https://github.com/UCSB-AMPLab/telar)
2. Click the green **Use this template** button
3. Choose **Create a new repository**
4. Give your repository a name (this becomes part of your site's web address)
5. Click **Create repository**

![GitHub screenshot for Use this template button](/images/use-this-template.png)

### Duplicate the Google Sheets Template

Your Google Sheets spreadsheet is where you manage all your content — objects, stories, and text.

1. Go to [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Click **File** → **Make a copy**
3. Save to your Google Drive with a descriptive name (e.g., "My Telar Exhibition")

You now have your two workspaces ready: a GitHub repository for images and publishing, and a Google Sheet for content.

## Phase 3: Add Your Images

Telar supports two ways to include images in your exhibition.

### Option A: Upload Your Own Images

1. In your GitHub repository, navigate to `components/images/`
2. Click **Add file** → **Upload files**
3. Drag your images into the upload area
4. Give each file a simple name without spaces (e.g., `textile-001.jpg`, `ceramic-002.jpg`)
5. Click **Commit changes** to save

The filename (without the extension) becomes the image's `object_id` — you will use this to reference it in your spreadsheet.

{: .warning }

> **File Size Limits**
> Individual images: up to 100 MB. Total repository: keep under 1 GB.

![GitHub screenshot for uploading files](/images/add-files.png)
![GitHub screenshot for committing uploaded files](/images/commit-files.png)

### Option B: Use IIIF Images from Museums and Libraries

Many institutions provide high-resolution images through the IIIF standard (pronounced "triple-eye-eff"). You can use these images directly in Telar without downloading anything.

1. Find IIIF resources from institutions like the Library of Congress, the British Library, or the Smithsonian ([IIIF Guide to Finding Resources](https://iiif.io/guides/finding_resources/))
2. Copy the manifest URL (e.g., `https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json`)
3. In your spreadsheet's "objects" tab, add a row with a simple `object_id` and paste the manifest URL into the `source_url` column

![Adding an external IIIF manifest](/images/external-iiif-manifest.png)

## Phase 4: Build Your Story in Google Sheets

All your content lives in the spreadsheet. It has three types of tabs:

- **project** — your site's settings and a list of your stories
- **objects** — the images used across your exhibition
- **story-1**, **story-2**, etc. — the steps and content for each story

### Fill in the Objects Tab

Add a row for each image in your exhibition:

- `object_id` — a simple identifier (matches the filename for uploaded images, or any name you choose for IIIF images)
- `title` — the display name
- `description` — a brief description
- `source_url` — the IIIF manifest URL (leave blank for uploaded images)
- `creator`, `date`, `medium`, `dimensions` — metadata fields (all optional)

{: .tip }

> **Ignoring Rows and Columns**
> Prefix any row or column header with `#` to have Telar skip it. This is useful for notes, instructions, and TODOs (e.g., `# TODO: verify this date`).

### Structure Your Story

In each story tab (e.g., `story-1`), add a row for each step in your narrative:

| Column | What it does |
|--------|-------------|
| `step` | Step number (1, 2, 3...) |
| `object` | Which image to show (the `object_id` from the objects tab) |
| `x`, `y`, `zoom` | Where to look in the image — use `0.5, 0.5, 1.0` as a starting point |
| `question` | The heading for this step (e.g., "What is this textile?") |
| `answer` | A brief 1-2 sentence response |

This is enough to create a working story. Each step shows an image with a question and answer that guide the viewer through your narrative.

### Add Detail Panels

For steps where you want to share more than a brief answer, add content to the panel columns. Type your text directly into the spreadsheet cell:

| Column | What it does |
|--------|-------------|
| `layer1_content` | "Learn more" panel — extra detail about this step |
| `layer2_content` | "Go deeper" panel — even more depth |
| `layer1_button` | Custom button text (leave blank for "Learn more") |
| `layer2_button` | Custom button text (leave blank for "Go deeper") |

Write your panel text directly in the cell. You can use basic markdown formatting: `**bold**`, `*italic*`, and headings with `##`.

{: .tip }

> **Keep it Simple**
> For most stories, the question-and-answer columns plus one layer of detail panels is plenty. You can always add more depth later.

### Register Your Stories

In the **project** tab, list each story by its number and title. The template shows you the format — add a row below the `STORIES` marker for each story tab you have created.

### Make a Story Private (Optional)

{: .beta }

> **New in v0.8.0**

Private stories are useful for classroom settings — drafts, work in progress, or student projects that are not ready to share publicly. Visitors will see the story listed on your homepage, but they will need a key to view it.

To make a story private:

1. In the **project** tab, add `yes` to the `private` column for any story you want to restrict
2. In your repository's `_config.yml` file, set a `story_key` — this is the password visitors will need to enter

Anyone with the key can view the story. You can share the key with your class, or share a direct link that includes the key so students do not have to type it.

## Phase 5: Connect and Publish

### Enable GitHub Pages

GitHub Pages turns your repository into a live website for free.

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

![Setting up GitHub Pages with GitHub Actions](/images/github-actions.gif)

### Share and Publish Your Google Sheet

Your spreadsheet needs two types of access so Telar can read it:

**Share your sheet:**

1. Click the **Share** button in Google Sheets
2. Set access to "Anyone with the link" with **Viewer** permissions
3. Copy the shared URL

**Publish your sheet:**

1. Go to **File** → **Share** → **Publish to web**
2. Click **Publish**
3. Copy the published URL

### Configure Your Site

Edit the `_config.yml` file in your repository to connect everything:

1. Navigate to `_config.yml` and click the pencil icon to edit

2. **Site settings** — fill in your site's name, description, and your details:

   ```yaml
   title: "My Exhibition"
   description: "A visual narrative about..."
   author:
     name: "Your Name"
   ```

3. **Web address** — set your site's URL:

   ```yaml
   url: "https://yourgithubusername.github.io"
   baseurl: "/your-repository-name"
   ```

   Your site will be available at `https://yourgithubusername.github.io/your-repository-name`.

4. **Google Sheets** — paste in the URLs you copied:

   ```yaml
   google_sheets:
     enabled: true
     shared_url: "https://docs.google.com/..."
     published_url: "https://docs.google.com/..."
   ```

5. **Theme** (optional) — choose a visual theme:

   ```yaml
   telar_theme: "paisajes"  # Options: paisajes, neogranadina, santa-barbara, austin
   ```

6. **Private story key** (only if you have private stories):

   ```yaml
   story_key: "your-secret-key"
   ```

7. Click **Commit changes** to save

![Editing config: title and URL](/images/config_title.gif)
![Editing config: Google Sheets and theme](/images/config_theme.gif)

### Wait for Your Site to Build

After committing, GitHub Actions will automatically build and publish your site. This takes 2-5 minutes.

1. Click the **Actions** tab to watch the build progress
2. When it finishes, visit your site at the URL you configured

## Phase 6: Refine

### Review Your Site

Browse through your exhibition and check for:

- Warning messages on the homepage (these point to configuration issues)
- Correct images appearing for each story step
- Text displaying as expected

### Set Your Image Coordinates

The placeholder coordinates (`0.5, 0.5, 1.0`) show the center of each image. To focus on specific details:

1. Navigate to any object page on your site
2. Click **Identify coordinates** below the image viewer
3. Pan and zoom to find the perfect view for each story step
4. Copy the X, Y, and Zoom values
5. Paste them into your spreadsheet

### Trigger a Rebuild

After editing your Google Sheet, you need to tell GitHub to rebuild your site:

1. Go to your repository's **Actions** tab
2. Click **Build and Deploy** workflow
3. Click **Run workflow** → select `main` → click the green **Run workflow** button
4. Wait 2-5 minutes for the new version

### Keep Building

Once the basics are in place, you can:

- Add more stories (create new story tabs in your spreadsheet)
- Add a glossary of terms (use the glossary tab in your spreadsheet)
- Customize your homepage (edit `index.md` in your repository)
- Browse and search your objects collection (enabled by default in v0.8.0)

## Going Further: Markdown Files

For steps that need complex panel content — such as embedded videos, image carousels, tabbed sections, or very long narratives — you can link to markdown files stored in your repository instead of writing directly in the spreadsheet. See the [Hybrid Workflow](/docs/workflows/hybrid/) for a guide to combining Google Sheets with markdown files.

## Next Steps

- [Content Structure](/docs/content-structure/) — how Telar organizes your materials
- [IIIF Integration](/docs/iiif-integration/) — working with high-resolution images
- [Themes](/docs/customization/themes/) — customizing your site's look and feel
