---
layout: docs
title: "8.2. GitHub Actions"
parent: "8. For Developers"
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/developers/github-actions/
---

# GitHub Actions Workflow

Telar uses GitHub Actions to automatically build and deploy your site. Understanding this workflow helps you troubleshoot issues and optimize your development process.

## What GitHub Actions Does

When you deploy via GitHub Pages, the build process is **fully automated**. No manual steps required!

### User Actions (You)

Edit content directly on GitHub or push from local:

1. **Edit the `objects` tab in your Google Sheet or `objects.csv`** in `telar-content/spreadsheets/`
2. **Edit markdown** in `telar-content/texts/`
3. **Add images** to `telar-content/objects/`
4. **Commit and push** to main branch

### Automated Actions (GitHub)

The workflow (`.github/workflows/build.yml`) automatically:

1. **Fetches Google Sheets** (if enabled)
   - Downloads content from your published Google Sheet
   - Converts to CSV format
   - Saves to `telar-content/spreadsheets/`

2. **Converts CSVs to JSON**
   - Runs `scripts/csv_to_json.py`
   - Reads CSVs from `telar-content/spreadsheets/`
   - Embeds markdown content from `telar-content/texts/`
   - Generates JSON files in `_data/` for Jekyll

3. **Generates IIIF Tiles**
   - Runs `scripts/generate_iiif.py`
   - Processes only objects listed in `objects.csv` without external IIIF manifests
   - Finds images in `telar-content/objects/` by object_id
   - Creates tiled image pyramids in `iiif/objects/`
   - Generates manifest files

4. **Processes Audio** (conditional)
   - Runs only when audio files are detected in `telar-content/objects/`
   - Installs `ffmpeg` and `audiowaveform` on the runner
   - Extracts audio clips and generates waveform peak data
   - Uses a content-hash cache key so unchanged audio is not reprocessed

5. **Builds JavaScript Bundle**
   - Sets up Node.js and runs `npm install`
   - Bundles JavaScript modules with esbuild in IIFE format
   - Outputs `assets/js/telar-story.js` with source map

6. **Builds Jekyll Site**
   - Runs `bundle exec jekyll build`
   - Compiles templates with data
   - Outputs to `_site/` directory

7. **Encrypts Private Stories**
   - Runs `scripts/encrypt_protected_stories.py`, unconditionally, immediately before deploy
   - Encrypts any story marked `private: yes` (or `protected: yes`) in place in `_site/`
   - Fails the build if anything would otherwise ship as plaintext

8. **Deploys to GitHub Pages**
   - Publishes `_site/` directory
   - Site goes live at your GitHub Pages URL

## Build Triggers

The workflow runs automatically when:

- **Push to main branch**: Any commit triggers a build
- **CSV or markdown changes**: Content updates deploy immediately
- **Config changes**: `_config.yml` modifications rebuild site

## Manual Build Trigger

Sometimes you need to rebuild without making code changes (e.g., after editing Google Sheets).

### How to Manually Trigger

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Build and Deploy** workflow
4. Click **Run workflow** button (top right)
5. Select branch (usually `main`)
6. Click green **Run workflow** button
7. Wait 2-5 minutes for completion

### When to Trigger Manually

- After editing Google Sheets content
- After adding objects or story steps in Google Sheets
- To rebuild without code changes
- To force a clean build

## Workflow File

The workflow is defined in `.github/workflows/build.yml`. The following is a simplified outline — the actual file contains caching logic and conditional steps:

```yaml
name: Build and Deploy Telar Site

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      force_iiif:
        description: 'Force IIIF tile regeneration'
        type: boolean
        default: true
      force_audio:
        description: 'Force audio regeneration'
        type: boolean
        default: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'

      - name: Set up Python
        uses: actions/setup-python@v7
        with:
          python-version: '3.11'

      - name: Set up Node.js
        uses: actions/setup-node@v7
        with:
          node-version: '22'

      - name: Build JavaScript bundle
      - name: Fetch data from Google Sheets (if enabled)
      - name: Convert CSV to JSON
      - name: Generate Jekyll collections
      - name: Generate search data

      - name: Process audio objects (peaks + clips)
        # Only when audio files changed, or on a manual run with force_audio;
        # otherwise the audio data is restored from the cache

      - name: Build Jekyll site
      - name: Check for destination conflicts

      - name: Generate IIIF tiles into _site
        # Only when images, objects.csv or _config.yml changed, or on a manual
        # run with force_iiif; otherwise the tiles are restored from the cache

      - name: Encrypt protected stories

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v5

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v5
```

On a manual run, the **force_iiif** and **force_audio** checkboxes decide whether IIIF tiles and audio are regenerated. Both are ticked by default. Untick one to take that part from the cache instead, and the build finishes sooner.

## Build Status

### Checking Build Status

1. Go to **Actions** tab in your repository
2. See list of recent workflow runs
3. Green checkmark = successful build
4. Red X = failed build

### Viewing Build Logs

1. Click on a workflow run
2. Click on the job name (e.g., "build-and-deploy")
3. Expand steps to see detailed logs
4. Use logs to troubleshoot errors

## Common Build Errors

### CSV Parsing Error

**Error:** `Failed to parse story-1.csv`

**Solution:**
- Check CSV file for syntax errors
- Ensure all required columns are present
- Verify no special characters breaking CSV format

### Spreadsheet Refused

**Error:** `Two columns in this spreadsheet mean the same thing: ...` (fails at the "Convert CSV to JSON" step; the message names the file)

**Solution:**
- Two of the sheet's headers name the same field, for example `medium` and `medium_genre`, or `privado` and `protected`. Keep one of each pair, delete the other, and rebuild.
- If you edit your site in the Compositor, publish it again from there instead of editing the file.

**Error:** `This spreadsheet has a column Telar uses for itself: '_metadata'` (fails at the same step)

**Solution:**
- Rename the `_metadata` column and rebuild. Telar keeps that name for its own use: if a row has anything in that column, Telar reads it as its own data and leaves the row off the published site.

### IIIF Generation Error

**Error:** `Failed to process image textile-001.jpg`

**Solution:**
- Verify image file exists in `telar-content/objects/`
- Ensure object is listed in the `objects` tab of your Google Sheet or `objects.csv` with blank `source_url`
- Check image isn't corrupted
- Ensure image format is supported (JPG, PNG, TIFF)

### Jekyll Build Error

**Error:** `Liquid syntax error`

**Solution:**
- Check markdown files for invalid syntax
- Verify frontmatter is properly formatted
- Look for unclosed tags or brackets

### Google Sheets Fetch Error

**Error:** `Failed to fetch Google Sheets`

**Solution:**
- Verify `published_url` is correct in `_config.yml`
- Ensure sheet is published to web (not just shared)
- Check sheet has proper permissions

### Private Story Build Failure

**Error:** `story/stories are marked protected but no story_key is set` (fails at the "Convert CSV
to JSON" step)

**Solution:**
- Add `story_key: yourkey` to `_config.yml`, or remove `private: yes` from the story

**Error:** `story/stories are marked protected, but .github/workflows/build.yml does not run
scripts/encrypt_protected_stories.py` (fails at the "Convert CSV to JSON" step)

**Solution:**
- Your build workflow predates v1.6.0's private-story encryption step. See [Upgrading Telar: v1.6.0
  Upgrade Notes](/docs/setup/upgrading/#v160-upgrade-notes) to update `build.yml`.

**Error:** the "Encrypt protected stories" step itself fails (near the end of the build, just
before "Upload artifact")

**Solution:**
- This means the rendered site still contains a trace of a private story's content that should
  have been encrypted away. This is a bug, not a configuration issue — [report
  it](https://github.com/UCSB-AMPLab/telar/issues) with the workflow run link.

## Build Performance

Typical build times:

- **Small sites** (< 10 objects, 1-2 stories): 2-3 minutes
- **Medium sites** (10-50 objects, multiple stories): 3-5 minutes
- **Large sites** (50+ objects, many stories): 5-10 minutes

### Optimizing Build Time

- **Use external IIIF** for large images (skips tile generation)
- **Commit fewer images** at once (split large uploads)
- **Clean repository** periodically (remove unused files)

## Troubleshooting

### Build Fails Every Time

1. Check recent commits for errors
2. Review build logs for specific error messages
3. Test locally first (`bundle exec jekyll serve`) — note that this never runs the private-story
   encryption step, so it won't reproduce a private-story build failure. For that, use
   `python3 scripts/build_local_site.py --build-only` instead (see [Local Development
   Reference](/docs/developers/local-development/))
4. Revert to last working commit if needed

### Build Succeeds But Site Not Updating

1. Clear browser cache (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)
2. Wait 5 minutes for CDN propagation
3. Check GitHub Pages settings (Settings → Pages)
4. Verify correct branch is set for Pages deployment

### Google Sheets Not Updating

1. Manually trigger workflow (see above)
2. Verify the published URL in `_config.yml`
3. Check the sheet is published to web
4. Review fetch logs in Actions tab

## Next Steps

- [Local Development Reference](/docs/developers/local-development/)
- [Configuration Guide](/docs/configure/configuration/)
- [Troubleshooting Tips](https://github.com/UCSB-AMPLab/telar/issues)
