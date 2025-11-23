---
layout: default
title: 2.2. Local Development
parent: 2. Workflows
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/workflows/local-dev/
---

# Local Development Workflow

Preview changes locally before publishing. Full control over the build process.

## Overview

This workflow is best for developers and users who want to preview changes locally before deploying. You'll work with files directly on your computer and run Jekyll locally.

## Prerequisites

- Ruby 3.0+ (for Jekyll)
- Bundler
- Python 3.9+ (for IIIF generation)

## Installation

### Install Ruby and Bundler

**macOS (using Homebrew):**
```bash
brew install ruby
gem install bundler
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ruby-full build-essential
gem install bundler
```

### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/UCSB-AMPLab/telar.git
cd telar

# Install Ruby dependencies
bundle install

# Install Python dependencies (for IIIF generation)
pip install -r requirements.txt
```

### Configure Site Settings

Edit `_config.yml`:
```yaml
title: Your Narrative Title
description: A brief description
baseurl: "/your-repository-name"  # For GitHub Pages, or "" for root
url: "https://your-username.github.io"
author: Your Name
email: your-email@example.com
```

## Core Commands

Throughout your workflow, you'll use these commands:

```bash
# Convert CSVs to JSON (run after editing CSVs)
python3 scripts/csv_to_json.py

# Generate IIIF tiles (run after adding/updating images)
python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000

# Serve with live reload
bundle exec jekyll serve --livereload

# View at http://localhost:4000
```

## Step-by-Step Workflow

### Step 1: Gather Your Images

Choose one of two options:

**Option A: Upload Your Own Images**

1. Add high-res images to `components/images/objects/` directory
2. Name files to match object IDs (e.g., `textile-001.jpg`)
3. Generate IIIF tiles:
   ```bash
   python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000
   ```

**Option B: Use External IIIF Manifests**

1. Find IIIF resources ([IIIF Guide](https://iiif.io/guides/finding_resources/))
2. Copy the info.json URL
3. Create an object_id (e.g., `museum-textile-001`)
4. Save for next step

### Step 2: Write Your Narrative Text

Create markdown files for your story layers:

1. Create directory for your story:
   ```bash
   mkdir -p components/texts/stories/story1
   ```

2. Create markdown files (e.g., `step1-layer1.md`, `step1-layer2.md`)

3. Add frontmatter and content:
   ```markdown
   ---
   title: "Weaving Techniques"
   ---

   The interlocking warp pattern visible here indicates...
   ```

### Step 3: Catalog Your Objects

Add metadata to the objects catalog:

1. Edit `components/structures/objects.csv`
2. Add a row for each object:

**For uploaded images:**
```csv
textile-001,Colonial Textile Fragment,"A woven textile from...",Unknown Artist,circa 1650-1700,Wool,45 x 60 cm,,,
```

**For external IIIF:**
```csv
museum-textile-001,Colonial Textile Fragment,"A woven textile from...",Unknown Artist,circa 1650-1700,Wool,45 x 60 cm,,https://example.org/iiif/image/abc123/info.json,
```

3. Convert to JSON:
   ```bash
   python3 scripts/csv_to_json.py
   ```

### Step 4: Preview Your Objects

Build and view your site:

```bash
bundle exec jekyll serve --livereload
```

Then:
1. Visit `http://localhost:4000`
2. Click "Objects" in the navigation
3. Verify all images appear with their metadata

### Step 5: Find Coordinates for Story Moments

Use the coordinate identification tool:

1. Navigate to an object page: `http://localhost:4000/objects/{object_id}`
2. Click **Identify coordinates** button
3. Pan and zoom to the area you want to feature
4. Click **Copy entire row** for CSV template with coordinates

### Step 6: Build Your Story

Connect your narrative to your objects:

1. Create CSV file in `components/structures/` (e.g., `story-1.csv`)

2. Add header row:
   ```csv
   step,question,answer,object,x,y,zoom,layer1_button,layer1_file,layer2_button,layer2_file
   ```

3. Add story steps:
   ```csv
   1,"What is this textile?","This fragment shows...","textile-001",0.5,0.5,1.0,"","story1/step1-layer1.md","",""
   2,"Notice the pattern","The geometric motifs...","textile-001",0.3,0.4,2.5,"","story1/step2-layer1.md","",""
   ```

4. Add to project setup:
   - Edit `components/structures/project.csv`
   - Scroll to `STORIES` section
   - Add row: `1,Your Story Title`

5. Convert to JSON:
   ```bash
   python3 scripts/csv_to_json.py
   ```

6. Rebuild and test:
   ```bash
   bundle exec jekyll serve
   ```

### Step 7: Add Glossary Terms (Optional)

Enhance your narrative with term definitions:

1. Create markdown file in `components/texts/glossary/` (e.g., `colonial-period.md`)

2. Add frontmatter and definition:
   ```markdown
   ---
   term_id: colonial-period
   title: "Colonial Period"
   related_terms: encomienda,viceroyalty
   ---

   The Colonial Period in the Americas began with...
   ```

3. Generate collection:
   ```bash
   python3 scripts/generate_collections.py
   ```

4. Build and test:
   ```bash
   bundle exec jekyll serve
   ```

## Daily Development Workflow

When working on your site:

```bash
# 1. Edit content
# - CSVs in components/structures/
# - Markdown in components/texts/
# - Images in components/images/objects/

# 2. Convert CSVs to JSON (after editing CSVs)
python3 scripts/csv_to_json.py

# 3. Generate IIIF tiles (after adding/updating images)
python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000

# 4. Serve with live reload
bundle exec jekyll serve --livereload

# Additional commands:
# Build only (output to _site/)
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

## Deploying to GitHub Pages

Once you're happy with your local site:

1. Commit and push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. GitHub Actions will automatically build and deploy

3. View your live site at `https://[username].github.io/[repository]/`

## Next Steps

- [Understand Content Structure](/docs/content-structure/)
- [Learn about IIIF Integration](/docs/iiif-integration/)
- [Customize Your Theme](/docs/customization/themes/)
