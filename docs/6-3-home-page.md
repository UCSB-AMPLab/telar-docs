---
layout: default
title: 6.3. Customizing the Home Page
parent: 6. Customization
grand_parent: Documentation
nav_order: 3
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

No custom content - just displays stories and objects.

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
- All markdown features are supported (see [Markdown Syntax Guide](/docs/reference/markdown-syntax/))

## Next Steps

- [Learn about themes](/docs/customization/themes/) to style your homepage
- [Explore advanced styling](/docs/customization/styling/) for custom CSS
- [See the markdown reference](/docs/reference/markdown-syntax/) for formatting options
