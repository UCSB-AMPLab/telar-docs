---
layout: default
title: 7.1. GitHub Actions
parent: 7. Reference
grand_parent: Documentation
nav_order: 1
lang: en
---

# GitHub Actions Workflow

Telar uses GitHub Actions to automatically build and deploy your site. Understanding this workflow helps you troubleshoot issues and optimize your development process.

## What GitHub Actions Does

When you deploy via GitHub Pages, the build process is **fully automated**. No manual steps required!

### User Actions (You)

Edit content directly on GitHub or push from local:

1. **Edit Google Sheets or CSVs** in `components/structures/`
2. **Edit markdown** in `components/texts/`
3. **Add images** to `components/images/objects/`
4. **Commit and push** to main branch

### Automated Actions (GitHub)

The workflow (`.github/workflows/build.yml`) automatically:

1. **Fetches Google Sheets** (if enabled)
   - Downloads content from your published Google Sheet
   - Converts to CSV format
   - Saves to `components/structures/`

2. **Converts CSVs to JSON**
   - Runs `scripts/csv_to_json.py`
   - Reads CSVs from `components/structures/`
   - Embeds markdown content from `components/texts/`
   - Generates JSON files in `_data/` for Jekyll

3. **Generates IIIF Tiles**
   - Runs `scripts/generate_iiif.py`
   - Processes images from `components/images/objects/`
   - Creates tiled image pyramids in `iiif/objects/`
   - Generates manifest files

4. **Builds Jekyll Site**
   - Runs `bundle exec jekyll build`
   - Compiles templates with data
   - Outputs to `_site/` directory

5. **Deploys to GitHub Pages**
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

The workflow is defined in `.github/workflows/build.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:  # Enables manual trigger

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.0
          bundler-cache: true

      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9

      - name: Install dependencies
        run: |
          bundle install
          pip install -r requirements.txt

      - name: Fetch Google Sheets (if enabled)
        run: python3 scripts/fetch_google_sheets.py

      - name: Convert CSVs to JSON
        run: python3 scripts/csv_to_json.py

      - name: Generate IIIF tiles
        run: python3 scripts/generate_iiif.py

      - name: Build Jekyll site
        run: bundle exec jekyll build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

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

### IIIF Generation Error

**Error:** `Failed to process image textile-001.jpg`

**Solution:**
- Verify image file exists in `components/images/objects/`
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
3. Test locally first (`bundle exec jekyll serve`)
4. Revert to last working commit if needed

### Build Succeeds But Site Not Updating

1. Clear browser cache (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)
2. Wait 5 minutes for CDN propagation
3. Check GitHub Pages settings (Settings → Pages)
4. Verify correct branch is set for Pages deployment

### Google Sheets Not Updating

1. Manually trigger workflow (see above)
2. Verify both shared and published URLs in `_config.yml`
3. Check the sheet is published to web
4. Review fetch logs in Actions tab

## Next Steps

- [Local Development Reference](/docs/reference/development/)
- [Configuration Guide](/docs/configuration/)
- [Troubleshooting Tips](https://github.com/UCSB-AMPLab/telar/issues)
