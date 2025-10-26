---
layout: default
title: 5. Configuration
parent: Documentation
nav_order: 5
lang: en
---

# Configuration

Configure your Telar site through the `_config.yml` file in your repository root.

## Basic Settings

```yaml
title: Your Narrative Title
description: A brief description of your narrative exhibition
baseurl: "/repository-name"  # For GitHub Pages subdirectory
url: "https://username.github.io"
author: Your Name
email: your-email@example.com
```

### baseurl vs url

- **url**: Your site's base domain
- **baseurl**: Path after domain (use `""` for root domain, or `/repo-name` for GitHub Pages)

**Examples:**
```yaml
# GitHub Pages subdirectory
url: "https://username.github.io"
baseurl: "/telar-site"
# Result: https://username.github.io/telar-site

# Custom domain at root
url: "https://mysite.org"
baseurl: ""
# Result: https://mysite.org
```

## Google Sheets Integration

Configure Google Sheets for content management:

```yaml
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?output=csv"
```

### Getting Your URLs

**Shared URL:**
1. Click **Share** button in Google Sheets
2. Set to "Anyone with the link (Viewer)"
3. Copy the URL

**Published URL:**
1. **File** → **Share** → **Publish to web**
2. Click **Publish**
3. Copy the URL

{: .warning }
> **Important**
> Both URLs are required. The shared URL is for viewing, the published URL is for automated fetching.

## Theme Selection

Telar includes 4 preset themes:

```yaml
telar_theme: "paisajes"  # Options: paisajes, neogranadina, santa-barbara, austin
```

### Available Themes

- **paisajes** (default): Earth tones with terracotta and olive
- **neogranadina**: Colonial burgundy and gold
- **santa-barbara**: Modern teal and coral
- **austin**: Burnt orange and slate blue

See [Customization: Themes](/docs/customization/themes/) for details and creating custom themes.

## Navigation

Configure site navigation:

```yaml
# Show/hide sections
show_objects: true
show_glossary: true
show_about: true
```

## Collections

Jekyll collections are pre-configured for stories, objects, and glossary:

```yaml
collections:
  stories:
    output: true
    permalink: /stories/:name/
  objects:
    output: true
    permalink: /objects/:name/
  glossary:
    output: true
    permalink: /glossary/:name/
```

{: .note }
> **Note**
> You typically don't need to modify collection settings unless doing advanced customization.

## Build Settings

Standard Jekyll build configuration:

```yaml
markdown: kramdown
permalink: pretty
exclude:
  - Gemfile
  - Gemfile.lock
  - scripts/
  - components/
  - README.md
```

## Plugins

Required plugins:

```yaml
plugins:
  - jekyll-seo-tag
```

These are automatically installed when you run `bundle install`.

## Full Example

Here's a complete `_config.yml` example:

```yaml
title: Colonial Textiles
description: An exhibition of colonial-era textiles from the Americas
baseurl: "/colonial-textiles"
url: "https://username.github.io"
author: Jane Smith
email: jane@example.com

telar_theme: "paisajes"

google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/ABC123/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/XYZ789/pub?output=csv"

show_objects: true
show_glossary: true
show_about: true

collections:
  stories:
    output: true
    permalink: /stories/:name/
  objects:
    output: true
    permalink: /objects/:name/
  glossary:
    output: true
    permalink: /glossary/:name/

markdown: kramdown
permalink: pretty

plugins:
  - jekyll-seo-tag

exclude:
  - Gemfile
  - Gemfile.lock
  - scripts/
  - components/
  - README.md
```

## Next Steps

- [Customize Your Theme](/docs/customization/themes/)
- [Learn about GitHub Actions](/docs/reference/github-actions/)
- [Explore Advanced Styling](/docs/customization/styling/)
