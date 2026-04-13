---
layout: docs
title: "7.2. Customizing the Home Page"
parent: "7. Customization"
grand_parent: Documentation
nav_order: 2
lang: en
permalink: /docs/customization/home-page/
---

# Customizing the Home Page

The homepage of your Telar site is controlled by a simple markdown file (`index.md`) in the root of your repository. This makes it easy to customize your welcome message, section headings, and introductory content.

## File Location

`index.md` **must** be in the root directory of your repository (not in a subdirectory). Jekyll automatically serves this file as your homepage.

## Basic Structure

Here's the default `index.md` structure:

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

Your custom content goes here...
```

## Collection mode

By default, the homepage shows stories first with a sample of objects below. Collection mode reverses this — objects appear first in a large grid, with stories in a smaller grid below.

Enable it in `_config.yml`:

```yaml
collection_mode: true
```

When collection mode is active:

- **Objects grid**: Up to 8 objects displayed in a 4-column grid (2 columns on tablet, 1 on mobile). Objects are drawn from those marked as `featured` in `objects.csv`. If no objects are marked as featured, the first 8 objects are used
- **Video and audio objects** show icon placeholders; image objects show IIIF thumbnails
- A **View all objects** button links to the full gallery
- **Stories grid**: All stories appear below in a smaller grid. The `show_on_homepage` setting in `story_interface` is ignored in collection mode — all stories are shown
- The section heading — "Explore the collection" — comes from your site's language files, not from `index.md` frontmatter

Collection mode works well for sites with a large number of objects and fewer stories, or for collection-first exhibitions where browsing objects is the primary entry point.

**New in v1.1.0.** See [Configuration Reference](/docs/configure/configuration/#collection_mode) for the setting details.

## Frontmatter Options

### stories_heading

The heading displayed above the story grid. Default: `"Explore the stories"`

### stories_intro

Optional introductory text displayed between the heading and story grid. Leave blank (`""`) if you don't want intro text.

### objects_heading

The heading displayed above the objects section teaser. Default: `"See the objects behind the stories"`

### objects_intro

Introductory text for the objects section. Use `{count}` as a placeholder for the number of objects.

Default: `"Browse {count} objects featured in the stories."`

The `{count}` placeholder will be automatically replaced with the actual number of objects.

## Adding Custom Content

Any markdown content you add below the frontmatter will appear above the stories section. This is perfect for:

- Welcome messages
- Exhibition overviews
- Important notices
- Custom calls-to-action

### Example: Custom Welcome

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

## Welcome to the Colonial Textiles Project

This digital exhibition explores the hidden stories woven into
colonial-era textiles from the Andean region.

Navigate through our curated stories to discover the techniques,
patterns, and cultural significance of these remarkable artifacts.
```

### Example: Alert Box

Use Bootstrap alert classes for styled messages:

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

{: .alert .alert-warning}
> **🚧 Exhibition in Progress**
>
> This exhibition is being actively developed. New stories and objects
> are added regularly. Check back soon for updates!
```

## Demo Site Notice

The template includes a demo site notice by default that links to the GitHub repository and documentation.

### To Customize

Edit the markdown content to match your project.

### To Remove

Simply delete the demo notice block from `index.md`.

## Examples

### Minimal Homepage

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---
```

No custom content — just displays stories and objects. Story cards show media-type-aware thumbnails: video and audio stories display an icon placeholder when no image object is available.

### With Introductory Text

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: "Each story reveals a unique perspective on our shared cultural heritage."
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

## About This Exhibition

{: .lead}
The **Colonial Landscapes Project** uses digital storytelling to explore
the complex histories embedded in material culture.
```

## Best Practices

- Keep homepage content concise to get visitors into your stories quickly
- Use `##` (second-level) or `###` (third-level) headings for custom content
- Test your homepage on different screen sizes
- Update notices and introductory text as your exhibition evolves

## Technical Notes

- The `layout: index` setting is required and should not be changed
- The `title` setting controls the page `<title>` tag
- All markdown features are supported (see [Markdown Syntax Guide](/docs/your-content/markdown-syntax/))

## Next Steps

- [Learn about themes](/docs/customization/themes/) to style your homepage
- [Explore advanced styling](/docs/developers/styling/) for custom CSS
- [See the markdown reference](/docs/your-content/markdown-syntax/) for formatting options
