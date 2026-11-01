---
title: Markdown Syntax Reference
url: /docs/your-content/markdown-syntax/
translationKey: docs-your-content-markdown-syntax
type: guide
katex: true
docs_section: reference
---

# Markdown Syntax Reference {#markdown-syntax-reference}

Panel content in Telar supports rich markdown formatting. This reference covers the syntax most useful for narrative content.

{{< callout "note" >}}
**This reference covers panel content**: these options apply to `layer1_content` and `layer2_content`, and to the markdown files they point to. A step's `question` and `answer` work differently. The question is a heading, so it is plain text with no markdown processing. Answers are reduced to plain prose, and Telar cuts any answer over 18 lines. See [Answers Are Plain Prose](/docs/your-data/csv-stories/#answers-are-plain-prose).
{{< /callout >}}

## What is Markdown? {#what-is-markdown}

Markdown is a lightweight markup language that lets you format text using simple, readable syntax. Instead of complex HTML tags, you write in plain text with special characters like `*` for emphasis or `#` for headings. Markdown is:

- **Easy to read**: Even in its raw form, markdown is readable
- **Easy to write**: Simple syntax that's faster than HTML
- **Portable**: Plain text files work everywhere
- **Convertible**: Automatically converted to HTML for display

### Learning Resources {#learning-resources}

New to markdown? These resources will help:

- [Markdown Guide](https://www.markdownguide.org/) - Comprehensive getting started guide
- [CommonMark Tutorial](https://commonmark.org/help/) - Interactive 10-minute tutorial
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/) - Quick reference

In case you're wondering, Telar uses the [Python Markdown](https://python-markdown.github.io/) processor with the `extra` and `nl2br` extensions.

---

## Panel Content Methods {#panel-content-methods}

You can provide panel content in three ways. For full details, see the [CSV Reference: Stories](/docs/your-data/csv-stories/#layer-content).

{{< callout "note" >}}
The three methods that follow describe authoring in a spreadsheet. In the Compositor, the panel title has its own field, and anything pasted into the **Content** field — a `---` block included — is published as part of the panel's text, not read as a title.
{{< /callout >}}

### Method 1: Entering Text Directly {#method-1-entering-text-directly}

Type panel text directly in your spreadsheet's `layer1_content` column:

| layer1_content |
|----------------|
| This textile shows **advanced weaving techniques** from the colonial period. The interlocking pattern indicates sophisticated craftsmanship. |

Line breaks in your spreadsheet cell create paragraph breaks. The panel title defaults to the button text.

### Method 2: Pasting Markdown Text {#method-2-pasting-markdown-text}

Paste text from a plain text editor. You can include headings, widgets, and a custom panel title using YAML frontmatter:

```markdown
---
title: "Weaving Techniques"
---

The interlocking warp pattern visible here indicates a complex
weaving technique that was common in the colonial period.

## Technical Details

These patterns were created using...
```

{{< callout "warning" >}}
If you copy and paste from Microsoft Word, Google Docs, or similar applications, formatting will **not** be preserved. Write in markdown syntax instead.
{{< /callout >}}

### Method 3: Referencing a Markdown File {#method-3-referencing-a-markdown-file}

For complex content, reference a markdown file saved in `telar-content/texts/stories/`:

| layer1_content |
|----------------|
| colonial-textiles/step1-layer1.md |

The file uses frontmatter for the panel title and supports all markdown features including widgets.

**When to use file references**:
- Content with widgets (accordion, tabs, carousel)
- Content reused across multiple stories
- Long narratives that benefit from editing in a text editor

---

## Basic Formatting {#basic-formatting}

### Headings {#headings}

```markdown
## Second Level Heading
### Third Level Heading
#### Fourth Level Heading
```

{{< callout "note" >}}
**Tip**: Don't use `# First Level` in panels — each panel already has a title.
{{< /callout >}}

### Text Styling {#text-styling}

```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
***Bold and italic*** for maximum emphasis
```

### Lists {#lists}

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

### Links {#links}

```markdown
[Link text](https://example.com)
[Internal link](/objects/textile-001/)
```

### Blockquotes {#blockquotes}

```markdown
> This is a blockquote.
> It can span multiple lines.
```

---

## Images {#images}

Telar provides special syntax for controlling image sizes in panels.

### Basic Syntax {#basic-syntax}

```markdown
![Alt text description](path/to/image.jpg){size}
```

### Size Options {#size-options}

| Size | Keyword | Max Width | Use Case |
|------|---------|-----------|----------|
| Small | `{sm}` or `{small}` | 250px | Thumbnails, icons, small details |
| Medium | `{md}` or `{medium}` | 450px | Standard illustrations (default) |
| Large | `{lg}` or `{large}` | 700px | Featured images, detailed views |
| Full | `{full}` | 100% | Panoramas, full-width visuals |

### Image Paths {#image-paths}

**Relative paths** (no leading slash) automatically load from `/telar-content/objects/`:

```markdown
![Weaving detail](textile-closeup.jpg){md}
```
→ Loads `/telar-content/objects/textile-closeup.jpg`

**Absolute paths** (starting with `/`) load from site root:

```markdown
![Site logo](/telar-content/objects/logo.png){sm}
```

**External URLs** work as expected:

```markdown
![Museum photo](https://example.com/image.jpg){lg}
```

### Examples {#examples}

```markdown
![Small thumbnail](thumb.jpg){small}
![Medium illustration](diagram.jpg){md}
![Large featured image](painting.jpg){large}
![Full-width panorama](landscape.jpg){full}
```

{{< callout "tip" >}}
**Default Size**: Images without a size tag default to medium (450px). Always include size tags for clarity.
{{< /callout >}}

### Image Captions {#image-captions}

Add a caption to any image by placing text on the line immediately after the image:

```markdown
![Colonial textile fragment](textile.jpg){lg}
Detail showing the *interlocking warp* pattern typical of the period.
```

The caption appears centered below the image in a lighter weight font.

**Optional prefix**: You can use `caption:` to make captions more explicit:

```markdown
![Map of the region](map.jpg){md}
caption: Map from *Recopilación de Leyes*, 1680.
```

The `caption:` prefix is stripped from the displayed text.

**Markdown in captions**: Captions support inline markdown formatting like `*italics*`, `**bold**`, and `[links](url)`.

---

## Rich Media {#rich-media}

### YouTube Videos {#youtube-videos}

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

### Other Iframes {#other-iframes}

Any iframe-embeddable content works:

```html
<iframe src="https://example.com/embed"
        width="100%"
        height="400"
        frameborder="0">
</iframe>
```

---

## Code {#code}

### Inline Code {#inline-code}

Use backticks for `inline code` references:

```markdown
The `object_id` field must match the filename.
```

### Code Blocks {#code-blocks}

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

## Footnotes {#footnotes}

Create footnotes with `[^1]` syntax:

```markdown
The textile shows advanced techniques.[^1]

[^1]: Based on analysis by Dr. Smith (2020).
```

Footnotes automatically appear at the bottom of panel content with proper styling.

Footnotes work in panel content only. If you put one in a step's `answer`, Telar removes both the reference and the note, and tells you in the build log.

---

## Math and Science Notation (LaTeX) {#math-and-science-notation-latex}

Telar supports LaTeX math rendering via [KaTeX](https://katex.org/). You can include mathematical formulas, chemical equations, and scientific notation anywhere markdown appears: story panels, glossary definitions, object descriptions, and custom pages.

### How It Works {#how-it-works}

Telar automatically detects LaTeX in your content at build time. No configuration is needed — if your text contains LaTeX notation, it will render as formatted math.

### Inline Math {#inline-math}

Wrap expressions in single dollar signs to display math inline with surrounding text:

```markdown
The coefficient is $C = \frac{8}{35}$ and the polynomial is $P_4(x)$.
```

<p><strong>Renders as:</strong> The coefficient is $C = \frac{8}{35}$ and the polynomial is $P_4(x)$.</p>

{{< callout "warning" >}}
**Dollar sign heuristic**: To avoid false positives with currency (e.g. "$50"), Telar only treats `$...$` as math when the content contains LaTeX-like characters such as `\`, `^`, `_`, or `{`. Double dollar signs (`$$...$$`) are always treated as math.
{{< /callout >}}

### Display Math {#display-math}

Wrap expressions in double dollar signs for centered, standalone equations:

```markdown
$$x^4 = \frac{8}{35}P_4(x) + \frac{4}{7}P_2(x) + \frac{1}{5}P_0(x)$$
```

<p><strong>Renders as:</strong></p>
<p>$$x^4 = \frac{8}{35}P_4(x) + \frac{4}{7}P_2(x) + \frac{1}{5}P_0(x)$$</p>

You can also use `\[...\]` delimiters:

```markdown
\[E = mc^2\]
```

### Multi-line Equations {#multi-line-equations}

Use `\begin{align}...\end{align}` for aligned multi-line equations. Use `&` to mark alignment points and `\\` for line breaks:

```markdown
$$\begin{align}
P_0(x) &= 1\\
P_1(x) &= x\\
P_2(x) &= \frac{1}{2}(3x^2 - 1)
\end{align}$$
```

<p><strong>Renders as:</strong></p>
<p>$$\begin{align} P_0(x) &= 1\\ P_1(x) &= x\\ P_2(x) &= \frac{1}{2}(3x^2 - 1) \end{align}$$</p>

### Supported Environments {#supported-environments}

| Environment | Purpose |
|------------|---------|
| `align`, `align*` | Aligned equations (with/without numbering) |
| `equation`, `equation*` | Single equations (with/without numbering) |
| `cases` | Piecewise functions |
| `pmatrix` | Parenthesized matrices |
| `bmatrix` | Bracketed matrices |

### Chemical Formulas {#chemical-formulas}

Telar includes the [mhchem](https://mhchem.github.io/MathJax-mhchem/) extension for chemical notation:

```markdown
The reaction $\ce{2H2 + O2 -> 2H2O}$ produces water.

$$\ce{CO2 + C -> 2CO}$$
```

<p><strong>Renders as:</strong> The reaction $\ce{2H2 + O2 -> 2H2O}$ produces water.</p>
<p>$$\ce{CO2 + C -> 2CO}$$</p>

### Where LaTeX Works {#where-latex-works}

| Content type | How it loads |
|-------------|-------------|
| Story panels (layer 1 / layer 2) | Automatic — detected at build time |
| Story step text | Automatic — detected at build time |
| Object descriptions | Automatic — detected at build time |
| Glossary definitions | Automatic — detected at build time |
| Custom pages | Always available |
| Encrypted stories | Loaded automatically after decryption |

### Full Syntax Reference {#full-syntax-reference}

For the complete list of supported LaTeX commands, see the [KaTeX function support table](https://katex.org/docs/supported).

---

## Best Practices {#best-practices}

### Alt Text for Accessibility {#alt-text-for-accessibility}

Always provide descriptive alt text for images:

```markdown
✅ ![Detailed view of interlocking warp threads](closeup.jpg){lg}
❌ ![Image](closeup.jpg){lg}
```

### Image Organization {#image-organization}

Keep panel images in `/telar-content/objects/` for easy reference:

```
telar-content/objects/
├── story1-context.jpg
├── story1-detail.jpg
├── story2-map.jpg
└── ...
```

### Content Length {#content-length}

- **Layer 1**: 2-3 paragraphs of context
- **Layer 2**: Longer scholarly content, citations, extended analysis

Break up long text with headings, lists, and images for better readability.

### File Naming {#file-naming}

Use descriptive, lowercase filenames with hyphens:

```markdown
✅ ![Colonial weaving pattern](colonial-textile-detail.jpg){md}
❌ ![Photo](IMG_1234.JPG){md}
```

---

## Quick Reference {#quick-reference}

Copy-paste examples for the most common formatting tasks:

### Add an image with caption {#add-an-image-with-caption}
```markdown
![Colonial textile showing interlocking pattern](textile-detail.jpg){lg}
Detail of the warp threads, circa 1650.
```

### Add a YouTube video {#add-a-youtube-video}
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameborder="0" allowfullscreen></iframe>
</div>
```

### Add a citation with footnote {#add-a-citation-with-footnote}
```markdown
Recent scholarship challenges this interpretation.[^1]

[^1]: García, M. (2023). *Rethinking Colonial Textiles*. University Press.
```

### Link to a glossary term {#link-to-a-glossary-term}
```markdown
The [[encomienda]] system structured colonial tributary relations.
```

### Link to another object {#link-to-another-object}
```markdown
Compare with the [Lima textile](/objects/textile-lima/).
```

### Add inline and display math {#add-inline-and-display-math}
```markdown
The coefficient is $C = \frac{8}{35}$ and the result is:

$$x^4 = \frac{8}{35}P_4(x) + \frac{4}{7}P_2(x) + \frac{1}{5}P_0(x)$$
```

### Create a blockquote {#create-a-blockquote}
```markdown
> "The patterns speak to a sophisticated understanding of geometry."
> — Author
```

---

## Limitations {#limitations}

- **No JavaScript**: Markdown is converted to static HTML
- **No custom HTML attributes**: Use the provided size syntax instead of custom classes
- **Image processing**: Images from `telar-content/objects/` that are listed in your objects CSV without external IIIF sources will be converted into IIIF tiles automatically.
- **LaTeX cross-page glossary**: If a story page has no LaTeX but a fetched glossary term contains LaTeX, the math will not render in the glossary popup (KaTeX is not loaded on that page). This is a rare edge case.

---

## Next Steps {#next-steps}

- [Your Content Guide](/docs/your-content/) - Learn how to organize your markdown files
- [Rich Content with Markdown](/docs/your-content/rich-content/) - Create and edit markdown files
- [Advanced Styling](/docs/developers/styling/) - Customize panel appearance
