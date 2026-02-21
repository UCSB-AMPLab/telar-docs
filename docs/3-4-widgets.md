---
layout: docs
title: 3.4. Widgets
parent: 3. Content Structure
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/content-structure/widgets/
---

# Widgets

Telar includes an interactive widget system for rich content in story panels and custom pages. Widgets let you embed image carousels, tabbed content, and collapsible sections directly in your markdown.

**Available since v0.4.0.**

## Available Widgets

| Widget | Purpose |
|--------|---------|
| **Carousel** | Image slideshow with captions and credits |
| **Tabs** | Switchable content panels for multiple perspectives |
| **Accordion** | Collapsible sections for sequential or hierarchical content |

## Widget Syntax

Widgets use CommonMark-style container syntax with triple colons:

```markdown
:::widget_type
widget content here
:::
```

## Carousel

Display multiple images with navigation controls, captions, and credits.

### Syntax

```markdown
:::carousel
image: story1/map.jpg
alt: Historical map of the region
caption: Map from 1650 showing colonial boundaries
credit: National Archives

---

image: story1/document.jpg
alt: Colonial document
caption: Royal decree establishing the settlement
credit: Archivo General de Indias
:::
```

### Fields

- **`image`** (required) — Path relative to `components/images/`, or a full URL for external images
- **`alt`** (recommended) — Accessibility description
- **`caption`** (optional) — Text displayed below the image; supports markdown (e.g., `*italics*`)
- **`credit`** (optional) — Attribution line; supports markdown

Separate carousel items with `---`.

### External Images

You can use full URLs for images hosted elsewhere:

```markdown
image: https://example.org/images/photo.jpg
```

## Tabs

Organize content into switchable panels — useful for presenting different perspectives, sources, or categories.

### Syntax

```markdown
:::tabs
## Spanish Account
The royal authorities reported that the revolt began on...

Historical records show contradictory accounts...

## Indigenous Perspective
Community leaders organized resistance to...

Oral traditions describe a coordinated response...

## Modern Analysis
Historians now recognize this event as...
:::
```

### Structure

- Each `## Header` creates a new tab
- Content between headers becomes the tab body
- Standard markdown formatting supported within tabs
- Minimum 2 tabs, maximum 4 tabs

## Accordion

Create collapsible panels for chronological sequences, hierarchical information, or optional details that readers can expand on demand.

### Syntax

```markdown
:::accordion
## 1600-1650: Early Colonial Period
The Spanish crown established administrative structures across the territory.

Indigenous populations were reorganized into settlements...

## 1650-1700: Consolidation
Estate systems became entrenched as the colonial economy matured.

## 1700-1750: Reform Era
Bourbon reforms challenged existing power structures...
:::
```

### Structure

- Each `## Header` creates a collapsible panel
- All panels start collapsed
- Standard markdown formatting supported within panels
- Minimum 2 panels, maximum 6 panels

## Where Widgets Work

Widgets can be used in:

- **Story panel markdown files** — Layer 1, 2, and 3 content
- **Custom pages** — Any markdown file in `components/texts/pages/`

For story panels, the recommended approach is to save widget content in a markdown file (Method 3: file reference) rather than entering it directly in a spreadsheet cell, since the triple-colon syntax is difficult to manage inline.

{: .tip }
> Widgets automatically use contrasting panel colors for visual distinction. Layer 1 widgets appear with Layer 2 styling, and vice versa.

## Images in Widgets

### Local Images

Place images in `components/images/` and reference them by filename:

```
components/images/
├── map.jpg
├── document.jpg
└── artifact.jpg
```

```markdown
image: map.jpg
image: document.jpg
```

If your images are in subfolders, include the path relative to `components/images/`:

```markdown
image: story1/map.jpg
```

### External Images

Use complete URLs for images hosted elsewhere:

```markdown
image: https://digital-collections.library.edu/iiif/image123.jpg
image: https://archive.org/download/item/photo.jpg
```

## Validation

Telar validates widgets during the build process:

**Errors (build fails):**
- Missing required `image` field in carousel
- Too few or too many tabs/accordion panels
- Empty content sections

**Warnings (build succeeds):**
- Missing `alt` text on carousel images (accessibility concern)
- Image files not found at specified paths

Check your build output for widget validation messages.

## Examples

### Historical Timeline

```markdown
:::accordion
## 1520-1550: Conquest
Spanish forces established control over the territory through a series
of military campaigns...

## 1550-1600: Settlement
Colonial towns were founded as administrative centers...

## 1600-1680: Consolidation
The colonial economy based on mining and agriculture became established...
:::
```

### Comparative Sources

```markdown
:::tabs
## Primary Source
"On the 15th day of August, the viceroy decreed..."
(Colonial Archive, Doc. 234)

## Secondary Analysis
Modern historians interpret this decree as evidence of...

## Archaeological Evidence
Excavations at the site revealed...
:::
```

### Image Comparison

```markdown
:::carousel
image: before.jpg
alt: Site photograph from 1920
caption: The *Plaza Mayor* before restoration
credit: Municipal Archive

---

image: after.jpg
alt: Site photograph from 2020
caption: The *Plaza Mayor* after archaeological restoration
credit: National Institute of Anthropology
:::
```

## See Also

- [Stories & Panels](/docs/content-structure/stories-panels/) — Using widgets in story panels
- [Custom Pages](/docs/content-structure/custom-pages/) — Using widgets in standalone pages
- [Markdown Syntax Guide](/docs/reference/markdown-syntax/) — All formatting options
