---
layout: docs
title: 2.1. Quick Start
parent: 2. Set Up Your Site
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/workflows/github-web/
---

# Quick Start

Build a complete Telar exhibition in your browser using GitHub and Google Sheets. No software to install.

You will need:
- A [GitHub account](https://github.com/join) (free)
- A [Google account](https://accounts.google.com/) for Google Sheets (free)

---

## Part 1: Set Up Everything

This part handles all the technical plumbing. Once it's done, everything else is creative work in your spreadsheet.

### Create Your Repository

A repository is your project's home on GitHub — it holds your images and configuration files.

1. Visit the [Telar template](https://github.com/UCSB-AMPLab/telar)
2. Click the green **Use this template** button
3. Choose **Create a new repository**
4. Give your repository a name — **use all lowercase letters and avoid spaces (hyphens are fine)** — this will be part of your site's web address
5. Click **Create repository**

![GitHub screenshot: Use this template button](/images/use-this-template.png)

### Enable GitHub Pages

GitHub Pages turns your repository into a live website for free.

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

![Setting up GitHub Pages with GitHub Actions](/images/github-actions.gif)

### Duplicate the Google Sheets Template

Your Google Sheets spreadsheet is where you manage all your content — objects, stories, and text.

1. Go to [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Click **File** → **Make a copy**
3. Save to your Google Drive with a descriptive name (e.g., "My Telar Exhibition")

### Share and Publish Your Sheet

Your spreadsheet needs two types of access so Telar can read it during builds.

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

2. **Site settings** — fill in your site's name and description:

   ```yaml
   title: "My Exhibition"
   description: "A visual narrative about..."
   author: Your Name
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

6. Click **Commit changes** to save

![Editing config: title and URL](/images/config_title.gif)
![Editing config: theme](/images/config_theme.gif)

### Verify Your Setup

After committing, GitHub Actions will automatically build and publish your site. This takes 2–5 minutes.

1. Click the **Actions** tab to watch the build progress
2. When it finishes, visit your site at the URL you configured
3. You should see an empty Telar site with your title and theme

![Telar homepage with title and navigation menu](/images/telar-homepage.png)

If the build fails, double-check your Google Sheets URLs in `_config.yml`. Both the shared and published URLs are required. See [Google Sheets Reference](/docs/workflows/google-sheets/) for troubleshooting.

---

## Part 2: Add Your Content

Setup is done. From here, everything happens in your Google Sheets spreadsheet.

### Add Your Images

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

### Fill in the Objects Tab

In your Google Sheet, go to the **objects** tab and add a row for each image:

- **`object_id`** — a simple identifier (matches the filename for uploaded images, or any name for IIIF images)
- **`title`** — the display name
- **`description`** — a brief description (optional, but helps with search)
- **`source_url`** — the IIIF manifest URL (leave blank for uploaded images)
- **`creator`**, **`year`**, **`object_type`**, **`subjects`** — metadata for gallery filtering (all optional)

{: .tip }
> **Ignoring Rows and Columns**
> Prefix any row or column header with `#` to have Telar skip it. Useful for notes and TODOs.

### Structure Your Story

In each story tab (e.g., **story-1**), add a row for each step in your narrative:

| Column | What it does |
|--------|-------------|
| `step` | Step number (1, 2, 3...) |
| `object` | Which image to show (the `object_id` from the objects tab) |
| `x`, `y`, `zoom` | Where to look in the image — use `0.5, 0.5, 1.0` as a starting point |
| `question` | The heading for this step (e.g., "What is this textile?") |
| `answer` | A brief 1–2 sentence response |

This is enough to create a working story. Each step shows an image with a question and answer that guide the viewer through your narrative.

### Add Detail Panels

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

### Register Your Stories

In the **project** tab, list each story with its title and subtitle. The template shows you the format — add a row for each story tab you have created.

### Trigger a Rebuild

After editing your Google Sheet, tell GitHub to rebuild your site:

1. Go to your repository's **Actions** tab
2. Click **Build and Deploy** workflow
3. Click **Run workflow** → select `main` → click the green **Run workflow** button
4. Wait 2–5 minutes for the new version

---

## Part 3: Refine

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
6. Trigger a rebuild to see the changes

![Coordinate picker showing X, Y, and Zoom values below the image viewer](/images/coordinate-picker.png)

### Make Stories Private (Optional)

If you want to restrict access to a story — for classroom use, drafts, or work in progress:

1. In the **project** tab, set the `protected` column to `yes` for that story
2. In your repository's `_config.yml`, add a `story_key`:

   ```yaml
   story_key: "your-secret-key"
   ```

3. Share the key with your viewers, or send them a link with `?key=your-secret-key` appended

See [Private Stories](/docs/content-structure/private-stories/) for details.

### Keep Building

Once the basics are in place, you can:

- Add more stories (create new story tabs in your spreadsheet)
- Add a glossary of terms (use the glossary tab in your spreadsheet)
- Customize your homepage (edit `index.md` in your repository)
- Browse and search your objects collection (enabled by default)

When your panels need more than a few paragraphs — widgets, rich formatting, or reusable content — see [Going Further](/docs/workflows/hybrid/) for how to add markdown files.

## Next Steps

- [Going Further](/docs/workflows/hybrid/) — Enhance panels with markdown files and widgets
- [Content Structure](/docs/content-structure/) — How Telar organizes your materials
- [Themes](/docs/customization/themes/) — Customizing your site's look and feel
- [IIIF & Images](/docs/iiif-integration/) — Working with high-resolution images
