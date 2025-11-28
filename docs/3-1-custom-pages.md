---
layout: docs
title: 3.1. Custom Pages
parent: 3. Content Structure
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/content-structure/custom-pages/
---

# Custom Pages

Create custom pages for credits, methodology, team information, or any other content that doesn't fit into the story structure.

## What are Custom Pages?

Custom pages are standalone pages that appear in your site's navigation menu but aren't part of the story viewer. Unlike story layers, which are tightly integrated with IIIF objects and step navigation, custom pages are flexible containers for any content you want to share.

**Common use cases:**
- **About**: Introduce your project and research team
- **Methodology**: Explain your research methods and sources
- **Credits**: Acknowledge contributors, funders, and institutions
- **Bibliography**: List sources and further reading
- **Contact**: Provide ways to get in touch

## Creating a Custom Page

### Step 1: Create the Markdown File

Add a new `.md` file in the `components/texts/pages/` directory:

```
components/texts/pages/
├── about.md          # Default page (included in template)
├── credits.md        # Your custom credits page
└── methodology.md    # Your custom methodology page
```

### Step 2: Write Your Content

Custom pages use standard markdown with full widget and glossary support:

```markdown
---
---

# About This Project

This digital archive explores colonial trade networks through...

## Research Team

- **Principal Investigator**: Dr. Jane Smith
- **Digital Humanities Developer**: Alex Chen
- **Graduate Researchers**: María González, John Davis

## Acknowledgments

This project was made possible by...

<div class="accordion">
<details>
<summary>Funding Sources</summary>

- National Endowment for the Humanities
- University Research Grant Program
- Digital Scholarship Initiative

</details>
</details>
```

{: .note }
> The frontmatter (`---`) lines are required but can be empty. They tell Jekyll to process the file.

### Step 3: Add to Navigation

Update `_data/navigation.yml` to include your new page in the menu. See [Navigation Configuration](/docs/customization/navigation-menu/) for details.

## Supported Features

Custom pages support the same markdown features as story layers:

### Markdown Formatting
- **Headings** (h1-h6)
- **Bold**, *italic*, and other text formatting
- Lists (bulleted and numbered)
- Links and images
- Blockquotes

### Widgets
All Telar widgets work on custom pages:

- **Accordion**: Collapsible sections
- **Tabs**: Tabbed content panels
- **Carousel**: Image slideshows

See [Markdown Syntax Reference](/docs/reference/markdown-syntax/) for complete widget documentation.

### Glossary Links

Glossary auto-linking works the same way:

```markdown
The [term:encomienda] system was a key institution...
```

When users click the link, the glossary panel opens with the definition.

## Layout and Styling

Custom pages use the `user-page` layout, which provides:

- **Responsive container**: Content is centered and constrained for readability
- **Consistent header/footer**: Navigation menu and site branding
- **Widget processing**: Accordion, tabs, and carousel support
- **Glossary integration**: Auto-linking and panel display

## File Naming

File names determine the page URL:

| File | URL |
|------|-----|
| `about.md` | `/about/` |
| `credits.md` | `/credits/` |
| `methodology.md` | `/methodology/` |
| `team-bios.md` | `/team-bios/` |

**Naming rules:**
- Use lowercase
- Use hyphens for spaces (not underscores)
- Use descriptive names (the filename becomes the URL)

## Example: Credits Page

Here's a complete example showing credits with an accordion for detailed acknowledgments:

```markdown
---
---

# Credits

## Project Team

**Principal Investigator**: Dr. Elena Martínez (University of California)
**Digital Scholarship Coordinator**: James Park (UCSB Library)
**Research Assistants**: Sofia Rodriguez, Michael Chen

## Funding

This project received generous support from:

- National Endowment for the Humanities (Grant #AB-12345)
- Andrew W. Mellon Foundation
- UC Digital Humanities Program

## Technical Credits

Built with [Telar](https://telar.org), an open-source framework for digital storytelling.

<div class="accordion">
<details>
<summary>Image Sources and Permissions</summary>

All images used with permission:

- Bogotá Painting (1614): Princeton University Art Museum
- Colonial Maps: Library of Congress, Geography and Map Division
- Ceramic Figures: Smithsonian National Museum of the American Indian

</details>
<details>
<summary>Special Thanks</summary>

We are grateful to the following individuals and institutions:

- Archive of the Indies (Seville, Spain)
- Colombian National Archive (Bogotá)
- Dr. Maria Santos for archival research assistance
- The Digital Scholarship Commons at UCSB

</details>
</div>
```

## Differences from Story Layers

| Feature | Story Layers | Custom Pages |
|---------|--------------|--------------|
| Location | `components/texts/stories/` | `components/texts/pages/` |
| Viewer integration | Yes (split-screen with IIIF) | No (full-width text) |
| Step navigation | Yes (coordinated with viewer) | No (standalone page) |
| Widgets | Yes | Yes |
| Glossary | Yes | Yes |
| Navigation | Via story interface | Via site menu |
| URL structure | `/story-name/` | `/page-name/` |

## Next Steps

- Learn how to [configure navigation](/docs/customization/navigation-menu/) to add pages to your menu
- Explore [widget syntax](/docs/reference/markdown-syntax/) for accordion, tabs, and carousels
- See [glossary configuration](/docs/content-structure/#glossary) for auto-linking setup

---

**New in v0.6.0**: Custom pages with full widget and glossary support.
