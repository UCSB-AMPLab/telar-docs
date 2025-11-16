---
layout: default
title: 7.3. Markdown Syntax
parent: 7. Reference
grand_parent: Documentation
nav_order: 3
lang: en
---

# Markdown Syntax Reference

Panel content in Telar supports rich markdown formatting. This reference covers all available syntax for creating engaging narrative content.

## What is Markdown?

Markdown is a lightweight markup language that lets you format text using simple, readable syntax. Instead of complex HTML tags, you write in plain text with special characters like `*` for emphasis or `#` for headings. Markdown is:

- **Easy to read**: Even in its raw form, markdown is readable
- **Easy to write**: Simple syntax that's faster than HTML
- **Portable**: Plain text files work everywhere
- **Convertible**: Automatically converted to HTML for display

### Learning Resources

New to markdown? These resources will help:

- [Markdown Guide](https://www.markdownguide.org/) - Comprehensive getting started guide
- [CommonMark Tutorial](https://commonmark.org/help/) - Interactive 10-minute tutorial
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/) - Quick reference

In case you're wondering, Telar uses the [Python Markdown](https://python-markdown.github.io/) processor with the `extra` and `nl2br` extensions.

---

## Panel Structure

Story layer files (referenced in `layer1_file` and `layer2_file` columns) use markdown with frontmatter:

```markdown
---
title: "Your Panel Title"
---

Your content goes here with full markdown support.
```

The title from frontmatter appears in the panel header. The body content is converted to HTML and displayed in the panel.

---

## Basic Formatting

### Headings

```markdown
## Second Level Heading
### Third Level Heading
#### Fourth Level Heading
```

{: .note }
> **Tip**: Don't use `# First Level` in panels - the panel already has a title from frontmatter.

### Text Styling

```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
***Bold and italic*** for maximum emphasis
```

### Lists

Unordered lists:
```markdown
- First item
- Second item
  - Nested item
  - Another nested item
- Third item
```

Ordered lists:
```markdown
1. First step
2. Second step
3. Third step
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](/objects/textile-001/)
```

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

---

## Images

Telar provides special syntax for controlling image sizes in panels.

### Basic Syntax

```markdown
![Alt text description](path/to/image.jpg){size}
```

### Size Options

| Size | Keyword | Max Width | Use Case |
|------|---------|-----------|----------|
| Small | `{sm}` or `{small}` | 250px | Thumbnails, icons, small details |
| Medium | `{md}` or `{medium}` | 450px | Standard illustrations (default) |
| Large | `{lg}` or `{large}` | 700px | Featured images, detailed views |
| Full | `{full}` | 100% | Panoramas, full-width visuals |

### Image Paths

**Relative paths** (no leading slash) automatically load from `/components/images/`:

```markdown
![Weaving detail](textile-closeup.jpg){md}
```
→ Loads `/components/images/textile-closeup.jpg`

**Absolute paths** (starting with `/`) load from specified location:

```markdown
![Site logo](/assets/images/logo.png){sm}
```

**External URLs** work as expected:

```markdown
![Museum photo](https://example.com/image.jpg){lg}
```

### Examples

```markdown
![Small thumbnail](thumb.jpg){small}
![Medium illustration](diagram.jpg){md}
![Large featured image](painting.jpg){large}
![Full-width panorama](landscape.jpg){full}
```

{: .tip }
> **Default Size**: Images without a size tag default to medium (450px). Always include size tags for clarity.

---

## Rich Media

### YouTube Videos

Embed responsive YouTube videos using iframe HTML:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          src="https://www.youtube.com/embed/VIDEO_ID"
          frameborder="0"
          allowfullscreen>
  </iframe>
</div>
```

Replace `VIDEO_ID` with your YouTube video ID.

The `padding-bottom: 56.25%` creates a 16:9 aspect ratio container.

### Other Iframes

Any iframe-embeddable content works:

```html
<iframe src="https://example.com/embed"
        width="100%"
        height="400"
        frameborder="0">
</iframe>
```

---

## Code

### Inline Code

Use backticks for `inline code` references:

```markdown
The `object_id` field must match the filename.
```

### Code Blocks

Use triple backticks for code blocks:

````markdown
```
git add .
git commit -m "Update content"
git push
```
````

With syntax highlighting:

````markdown
```yaml
title: My Story
description: A compelling narrative
```
````

---

## Footnotes

Create footnotes with `[^1]` syntax:

```markdown
The textile shows advanced techniques.[^1]

[^1]: Based on analysis by Dr. Smith (2020).
```

Footnotes automatically appear at the bottom of panel content with proper styling.

---

## Best Practices

### Alt Text for Accessibility

Always provide descriptive alt text for images:

```markdown
✅ ![Detailed view of interlocking warp threads](closeup.jpg){lg}
❌ ![Image](closeup.jpg){lg}
```

### Image Organization

Keep panel images in `/components/images/` for easy reference:

```
components/images/
├── story1-context.jpg
├── story1-detail.jpg
├── story2-map.jpg
└── ...
```

### Content Length

- **Layer 1**: 2-3 paragraphs of context
- **Layer 2**: Longer scholarly content, citations, extended analysis

Break up long text with headings, lists, and images for better readability.

### File Naming

Use descriptive, lowercase filenames with hyphens:

```markdown
✅ ![Colonial weaving pattern](colonial-textile-detail.jpg){md}
❌ ![Photo](IMG_1234.JPG){md}
```

---

## Limitations

- **No JavaScript**: Markdown is converted to static HTML
- **No custom HTML attributes**: Use the provided size syntax instead of custom classes
- **Image processing**: Images from `/components/images/` that are listed in the `objects` tab of your Google Sheet or `objects.csv` without external IIIF manifests will be converted into IIIF tiles automatically.

---

## Next Steps

- [Content Structure Guide](/docs/content-structure/) - Learn how to organize your markdown files
- [GitHub Web Workflow](/docs/workflows/github-web/) - Create and edit markdown files
- [Advanced Styling](/docs/customization/styling/) - Customize panel appearance