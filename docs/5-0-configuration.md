---
layout: docs
title: 5. Configuration
parent: Documentation
nav_order: 5
lang: en
permalink: /docs/configuration/
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
logo: "/components/images/my-logo.png"  # Optional site logo
```

### Site Logo

Add a logo to replace the site title in the navigation header:

```yaml
logo: "/components/images/my-logo.png"
```

- Place your logo image in `components/images/`
- Leave empty (`logo: ""`) to display the site title as text instead
- Recommended dimensions: max 80px tall, 200-300px wide
- Supports PNG, JPG, SVG formats

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

- **paisajes** (default): Terracotta and olive
- **neogranadina**: Burgundy and gold
- **santa-barbara**: Teal and coral
- **austin**: Burnt orange and slate blue

See [Customization: Themes](/docs/customization/themes/) for details and creating custom themes.

## Multilingual Interface

Telar v0.4.0+ supports multilingual user interfaces in English and Spanish. This controls the language of all interface elements, including navigation, buttons, labels, error messages, and instructions.

```yaml
telar_language: "en"  # Options: "en" (English), "es" (Español)
```

### What Gets Translated

The `telar_language` setting changes the language of:

- **Navigation menu**: Home, Objects, Stories, Glossary, About
- **Button labels**: Copy, Back, Learn More, Go Deeper, etc.
- **Metadata fields**: Creator, Period, Medium, Location, Credit, etc.
- **Error messages**: All IIIF warnings, validation errors, and configuration issues
- **Story interface**: Step indicators, panel headers, coordinate tool
- **Object pages**: IIIF manifest labels, coordinate identification instructions
- **Glossary**: Panel headers, navigation elements

### What Stays in Your Language

The `telar_language` setting **does not** translate your content:

- Story narratives and panel text (markdown files you create)
- Object descriptions and metadata (CSV data you provide)
- Glossary definitions
- About page content
- Site title and description

{: .note }
> **Note on Content Translation**
> If you need a fully bilingual site with content in multiple languages, you'll need to create separate Telar sites for each language or wait for v0.5.0's multilingual content system.

### Setting Your Language

**New sites:** The language is set when you first configure your site in `_config.yml`.

**Existing sites:** Add or update the setting in your `_config.yml`:

```yaml
# Site Settings
title: My Exhibition
description: A description of my site
telar_language: "es"  # Change from "en" to "es" for Spanish
```

Then rebuild your site:

```bash
bundle exec jekyll build
```

### IIIF Metadata Language Detection

When Telar auto-extracts metadata from IIIF manifests, it respects your `telar_language` setting:

- For **English sites** (`en`): Prioritizes English metadata, falls back to other languages if unavailable
- For **Spanish sites** (`es`): Prioritizes Spanish metadata, falls back to English, then other languages

This ensures that object metadata appears in your preferred language when available from the source institution.

{: .warning }
> **Spanish Google Sheets Template**
> If you're creating a Spanish-language site with Google Sheets integration, use the Spanish template which includes translated column headers and instructions.

### Language Files

The interface translations are stored in:

- `_data/lang/en.yml` - English strings
- `_data/lang/es.yml` - Spanish strings

These files are maintained by the Telar project and update automatically when you upgrade to new versions.

## Story Interface Settings

Control how stories display and behave:

```yaml
story_interface:
  show_story_steps: true  # Set to false to hide "Step X" overlay
  include_demo_content: false  # v0.5.0 feature (not yet available)
```

### show_story_steps

Controls whether the "Step X" indicator appears in the top-left corner of story viewers.

- **`true` (default)**: Shows "Step 1", "Step 2", etc. in the viewer
- **`false`**: Hides the step indicators for a cleaner, more immersive experience

This is purely visual - users can still navigate through steps normally.

### include_demo_content

Reserved for future use (v0.5.0). Will allow including demonstration stories and content from an external repository.

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
logo: ""  # Optional: path to logo image

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
- [Customize Your Home Page](/docs/customization/home-page/)
- [Learn about GitHub Actions](/docs/reference/github-actions/)
- [Explore Advanced Styling](/docs/customization/styling/)
