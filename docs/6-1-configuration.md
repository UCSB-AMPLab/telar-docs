---
layout: docs
title: 6.1. Configuration
parent: 6. Reference
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/reference/configuration/
---

# Configuration

Configure your Telar site through the `_config.yml` file in your repository root.

## Site Settings

Basic site information and appearance:

```yaml
# Site Settings
title: Your Narrative Title
description: A brief description of your narrative exhibition
baseurl: "/repository-name"  # For GitHub Pages subdirectory
url: "https://username.github.io"
author: Your Name
email: your-email@example.com
telar_theme: "paisajes"  # Options: paisajes, neogranadina, santa-barbara, austin, or custom
logo: ""  # Path to logo image (optional)
telar_language: "en"  # Options: "en" (English), "es" (Español)
```

### baseurl vs. url

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

### Site Logo

Add a logo to replace the site title in the navigation header:

```yaml
logo: "/components/images/my-logo.png"
```

- Place your logo image in `components/images/`
- Leave empty (`logo: ""`) to display the site title as text instead
- Recommended dimensions: max 80px tall, 200-300px wide
- Supports PNG, JPG, SVG formats

## Theme Selection

Telar includes 4 preset themes:

```yaml
telar_theme: "paisajes"  # Options: paisajes, neogranadina, santa-barbara, austin, or custom
```

### Available Themes

- **paisajes** (default): Terracotta and olive
- **neogranadina**: Burgundy and gold
- **santa-barbara**: Teal and coral
- **austin**: Burnt orange and slate blue

See [Customization: Themes](/docs/customization/themes/) for details and creating custom themes.

## Multilingual Interface

Telar v0.4.0+ supports multilingual user interfaces in English and Spanish:

```yaml
telar_language: "en"  # Options: "en" (English), "es" (Español)
```

This controls the language of all interface elements, including navigation, buttons, labels, error messages, and instructions.

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
> If you need a fully bilingual site with content in multiple languages, you'll need to create separate Telar sites for each language.

### IIIF Metadata Language Detection

When Telar auto-extracts metadata from IIIF manifests, it respects your `telar_language` setting:

- For **English sites** (`en`): Prioritizes English metadata, falls back to other languages if unavailable
- For **Spanish sites** (`es`): Prioritizes Spanish metadata, falls back to English, then other languages

This ensures that object metadata appears in your preferred language when available from the source institution.

## Google Sheets Integration

Manage content via Google Sheets instead of editing CSV files directly:

```yaml
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pubhtml"
```

### Setup Steps

1. **Get the template**: Duplicate the template at [bit.ly/telar-template](https://bit.ly/telar-template)
2. **Share your sheet**: Set to "Anyone with the link (Viewer access)"
3. **Publish your sheet**: **File** → **Share** → **Publish to web**
4. Paste both URLs into `_config.yml`
5. Set `enabled: true`
6. Commit changes

**Automated fetching:**
- **GitHub Pages**: GitHub Actions automatically discovers tab GIDs and fetches CSVs
- **Local development**: Run `python3 scripts/fetch_google_sheets.py` before building

{: .warning }
> Both URLs are required. The shared URL is for viewing, the published URL is for automated fetching.

See [Google Sheets Workflow](/docs/workflows/google-sheets/) for complete setup instructions.

## Story Interface Settings

Control how stories display and behave:

```yaml
story_interface:
  show_on_homepage: true  # Set to false to hide stories section from homepage
  show_story_steps: true  # Set to false to hide "Step X" overlay
  show_object_credits: true  # Set to false to hide credits badge on objects
  include_demo_content: false  # Set to true to enable demo stories
```

### show_on_homepage

Controls whether the stories section appears on the homepage:

- **`true` (default)**: Stories appear on the homepage as cards
- **`false`**: Hides the stories section from the homepage (stories remain accessible via direct URL)

Use this when you want objects on the homepage but prefer stories to be accessed through navigation or direct links rather than homepage cards.

### show_story_steps

Controls whether the "Step X" indicator appears in the top-left corner of story viewers.

- **`true` (default)**: Shows "Step 1", "Step 2", etc. in the viewer
- **`false`**: Hides the step indicators for a cleaner, more immersive experience

This is purely visual - users can still navigate through steps normally.

### include_demo_content

Enable pre-built demonstration stories that showcase Telar's features:

- **`false` (default)**: Site contains only your content
- **`true`**: Adds tutorial and example stories to your site

Demo stories appear alongside your own content with a "Demo content" badge. They're automatically fetched during the build process and matched to your site's language.

**When to enable:**
- Learning how to structure stories
- Testing Telar features without creating content
- Showing stakeholders what Telar can do

**When to disable:**
- Publishing your final production site
- Testing only your own content

See [Demo Content](/docs/iiif/demo-content/) for complete details on available demos.

## Collection Interface Settings

Control how the objects gallery displays and behaves:

```yaml
collection_interface:
  browse_and_search: true  # Set to false to disable filtering sidebar and search
  show_link_on_homepage: true  # Set to false to hide "View the objects" link
  show_sample_on_homepage: true  # Set to true to show sample objects on homepage
  featured_count: 4  # Number of objects to show on homepage
```

### browse_and_search

Controls the gallery's filtering sidebar and full-text search:

- **`true` (default)**: Objects page shows a filter sidebar with facets (type, creator, period, subjects) and a search bar powered by Lunr.js
- **`false`**: Objects page shows a simple grid without filtering or search

### show_link_on_homepage

Controls the "View the objects" link on the homepage:

- **`true` (default)**: Shows a link to the objects gallery on the homepage
- **`false`**: Hides the link (objects page still accessible via navigation)

### show_sample_on_homepage

Controls whether sample objects appear on the homepage:

- **`true` (default)**: Shows a sample of objects on the homepage, drawn from those marked as `featured` in objects.csv (or random if none are featured)
- **`false`**: No objects displayed on the homepage

### featured_count

Number of objects to display on the homepage when `show_sample_on_homepage` is true:

- **Default**: `4`
- Prioritizes objects marked `featured: yes` in objects.csv
- If fewer featured objects exist than `featured_count`, fills remaining slots randomly

## Story Protection

Encrypt stories so that only viewers with the correct key can access them:

```yaml
story_key: "your-secret-key"
```

- Stories with `protected: yes` in project.csv will be encrypted during build
- Viewers access protected stories via a URL parameter: `?key=your-secret-key`
- Leave `story_key` empty or omit it to disable story protection
- See [Private Stories](/docs/content-structure/private-stories/) for setup details

{: .warning }
> Story protection uses client-side encryption. It prevents casual access but is not suitable for highly sensitive content. For stronger security, use a private GitHub repository.

### show_object_credits

Controls the credit attribution badge on object pages:

- **`true` (default)**: Shows credit badge on all objects with credit information
- **`false`**: Hides the credit badge (credit info still accessible via metadata table)

The credit badge displays in the top-right corner of object images, showing attribution from the `credit` field in your `objects.csv`.

## Advanced Settings

The following settings are pre-configured and typically don't need modification unless you're doing advanced customization.

{: .warning }
> **Do Not Edit**
> The Telar `_config.yml` includes a line: "PLEASE DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING". The sections below this line are configured automatically and rarely need changes.

### Collections

Jekyll collections define content types:

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
  pages:
    output: true
    permalink: /:name/

# Collections Directory
collections_dir: _jekyll-files
```

{: .note }
> You typically don't need to modify collection settings unless doing advanced customization.

The `collections_dir` setting tells Jekyll where to find auto-generated working files.

### Defaults

Layout defaults for each collection:

```yaml
defaults:
  - scope:
      path: ""
      type: "stories"
    values:
      layout: "story"
  - scope:
      path: ""
      type: "objects"
    values:
      layout: "object"
  - scope:
      path: ""
      type: "glossary"
    values:
      layout: "glossary"
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "user-page"
```

### Build Settings

Standard Jekyll build configuration:

```yaml
markdown: kramdown
permalink: pretty
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - .github
  - README.md
  - docs/
  - scripts/

# Tell Jekyll not to expect dates for collections
future: true
show_drafts: false
```

### Plugins

Required plugin:

```yaml
plugins:
  - jekyll-seo-tag
```

Installed automatically when you run `bundle install`.

### Telar Version

Version information (updated automatically during releases):

```yaml
telar:
  version: "0.6.2-beta"
  release_date: "2025-12-03"
```

### Development Features

Options for development, testing, and special use cases (please do not edit these unless you know what you are doing):

```yaml
development-features:
  christmas_tree_mode: false
  viewer_preloading:
    max_viewer_cards: 10
    preload_steps: 6
    loading_threshold: 5
    min_ready_viewers: 3
  skip_stories: false
  skip_collections: false
```

#### christmas_tree_mode

Displays all warning messages for testing multilingual support:

- **`false` (default)**: Normal operation
- **`true`**: Shows test objects with fake errors to verify all warning messages display correctly

Use this only when testing translations or warning message styling.

#### viewer_preloading

Controls how story viewers are preloaded for smoother navigation:

- **max_viewer_cards** (default: 10, max: 15): Maximum viewers kept in memory
- **preload_steps** (default: 6): Steps to preload ahead of current position
- **loading_threshold** (default: 5): Show loading shimmer on intro if story has this many or more viewers
- **min_ready_viewers** (default: 3): Hide shimmer when this many viewers are ready

Higher values = smoother scrolling but more memory usage. The defaults work well for most sites.

#### skip_stories

Build a site without stories, keeping only objects visible:

- **`false` (default)**: Stories are generated and displayed normally
- **`true`**: Skips story generation and hides the stories section from the index page

Use this when you want to showcase objects without narrative stories, or when building a catalog-style site.

{: .note }
> Renamed from `hide_stories` in v0.8.0. The old name still works for backward compatibility.

#### skip_collections

Build a site with only custom user pages (no objects or stories):

- **`false` (default)**: Objects and stories are generated normally
- **`true`**: Skips both object AND story generation, hides stories section and objects teaser from index, removes `/objects/` from navigation

Use this when building a site with only custom pages (like an "About" or landing page) without any collections.

{: .note }
> When `skip_collections` is enabled, `skip_stories` is automatically implied. Renamed from `hide_collections` in v0.8.0 — the old name still works for backward compatibility.

## Full Example

Here's a complete `_config.yml` example:

```yaml
# Site Settings
title: Colonial Textiles
description: An exhibition of colonial-era textiles from the Americas
baseurl: "/colonial-textiles"
url: "https://username.github.io"
author: Jane Smith
email: jane@example.com
telar_theme: "paisajes"
logo: ""
telar_language: "en"

# Story Interface Settings
story_interface:
  show_on_homepage: true
  show_story_steps: true
  show_object_credits: true
  include_demo_content: false

# Collection Interface Settings
collection_interface:
  browse_and_search: true
  show_link_on_homepage: true
  show_sample_on_homepage: true
  featured_count: 4

# Story Protection (optional)
# story_key: "your-secret-key"

# Google Sheets Integration (optional)
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/ABC123/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/XYZ789/pubhtml"

#
# PLEASE DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
#

# Collections
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
  pages:
    output: true
    permalink: /:name/

collections_dir: _jekyll-files

# Build Settings
markdown: kramdown
permalink: pretty
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - .github
  - README.md
  - docs/
  - scripts/

# Defaults
defaults:
  - scope:
      path: ""
      type: "stories"
    values:
      layout: "story"
  - scope:
      path: ""
      type: "objects"
    values:
      layout: "object"
  - scope:
      path: ""
      type: "glossary"
    values:
      layout: "glossary"
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "user-page"

future: true
show_drafts: false

# Telar Settings
telar:
  version: "0.8.0-beta"
  release_date: "2026-02-05"

# Plugins
plugins:
  - jekyll-seo-tag

# WEBrick server configuration for development (enables CORS for IIIF)
webrick:
  headers:
    Access-Control-Allow-Origin: "*"
    Access-Control-Allow-Methods: "GET, POST, OPTIONS"
    Access-Control-Allow-Headers: "Content-Type"

# Development & Testing
development-features:
  christmas_tree_mode: false
  viewer_preloading:
    max_viewer_cards: 10
    preload_steps: 6
    loading_threshold: 5
    min_ready_viewers: 3
  skip_stories: false
  skip_collections: false
```

## See Also

- [Config Validator](/docs/reference/config-validator/) — Check your `_config.yml` for common errors
- [Customize Your Theme](/docs/customization/themes/)
- [Customize Your Home Page](/docs/customization/home-page/)
- [Configure Navigation Menu](/docs/customization/navigation-menu/)
- [Demo Content](/docs/iiif/demo-content/)
- [Private Stories](/docs/content-structure/private-stories/)
- [CSV Reference: Project & Objects](/docs/reference/csv-project-objects/)
- [GitHub Actions](/docs/developers/github-actions/)
