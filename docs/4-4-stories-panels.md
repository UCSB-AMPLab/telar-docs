---
layout: docs
title: "4.4. Stories & Panels"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/your-content/stories-panels/
---

# Stories & Panels

Stories are scrollable narratives built around your objects. Each story guides your audience through a sequence of steps — focusing on specific regions of images, moments in videos, or segments of audio recordings — with question-and-answer pairs and expandable detail panels.

{: .tip }
> The [Compositor's story editor](/docs/the-compositor/story-editor/) provides a visual alternative to editing story spreadsheets directly. You can build and reorder steps, set coordinates, and preview your story without leaving your browser.

## How the scroll experience works

A story fills the viewport with a **card-stack layout**. The object — whether an image in the IIIF viewer, a video player, or an audio player — fills the entire background. Text cards are layered on top, and as you scroll, each new card slides over the previous one.

The scroll is **continuous with magnetic waypoints**. Rather than jumping discretely from step to step, viewers scroll naturally through the story. The view snaps magnetically to each step, ensuring the text card and object position stay in sync.

On mobile, text cards are anchored to the bottom of the screen with a frosted glass effect, overlaying the lower portion of the viewer.

![Story viewer showing card-stack layout with text card over the IIIF viewer](/images/story-viewer.png)

Each step:

1. Focuses the viewer on a specific region of an object (using x, y, and zoom coordinates for images, or clip times for video and audio)
2. Displays a **question** and a brief **answer** in the text card
3. Optionally offers up to three layers of additional detail via expandable buttons

## Registering stories

Before building a story's steps, register it in `project.csv`:

```csv
order,story_id,title,subtitle,byline
1,colonial-textiles,Colonial Textiles,Weaving traditions of the Americas,by Dr. Jane Smith
```

The `story_id` determines the filename for the story CSV and its URL. With `story_id: colonial-textiles`, Telar looks for `telar-content/spreadsheets/colonial-textiles.csv` and serves the story at `/stories/colonial-textiles/`.

If you omit `story_id`, Telar uses `story-{order}` (e.g., `story-1.csv` for order 1).

See the [CSV Reference: Project](/docs/your-data/csv-project/#project-csv-projectcsv--proyectocsv) for all project.csv columns.

## Building story steps

Each story has its own CSV file in `telar-content/spreadsheets/`. The file defines steps in sequence:

```csv
step,object,x,y,zoom,question,answer,layer1_content
1,textile-001,0.5,0.3,0.8,What is this textile?,A colonial fragment showing complex weaving patterns,This fragment dates to the mid-17th century...
2,textile-001,0.2,0.7,0.4,What does this pattern mean?,An interlocking warp design used in ceremonial cloths,The pattern has been identified as...
3,map-lima,0.5,0.5,1.0,Where were these textiles found?,In the historic center of Lima,Archaeological excavations in the 1990s...
```

### Required fields

Every step needs:

- **`step`** — Sequential number (1, 2, 3...) with no gaps
- **`object`** — An `object_id` from your objects spreadsheet
- **`x`**, **`y`**, **`zoom`** — Viewer coordinates (see below)
- **`question`** — The heading displayed in the text card
- **`answer`** — A brief answer shown below the question

### Coordinates

Coordinates tell the viewer where to focus for each step. All values are normalized from 0 to 1:

- **x** — Horizontal position. 0 = left edge, 0.5 = center, 1 = right edge
- **y** — Vertical position. 0 = top edge, 0.5 = center, 1 = bottom edge
- **zoom** — Zoom level. 0 = zoomed out (full image visible), 1 = maximum zoom

To find coordinates, use the **coordinate picker** on any object page: zoom and pan to the region you want, then click the **Copy** buttons to copy the x, y, and zoom values directly into your spreadsheet.

![Coordinate picker showing X, Y, and Zoom values below the image viewer](/images/coordinate-picker.png)

## Layer panels

Each step can have up to three layers of detail, following the QAI pattern (question, answer, invitation). The question and answer appear in the text card itself. Layers expand from the text card when the viewer clicks the invitation buttons:

| Layer | Default button text | Purpose |
|-------|-------------------|---------|
| Layer 1 | "Learn more" | Primary detail |
| Layer 2 | "Go deeper" | Extended analysis |
| Layer 3 | (default) | Deepest level |

For each layer, you can customize two things:

- **Button text** (`layer1_button`) — Leave empty for the default, or provide custom text like "See the technique" or "Read the source"
- **Content** (`layer1_content`) — The panel content itself

If a layer has no content, its button is hidden automatically.

## Writing panel content

You can provide panel content in three ways. Choose based on complexity:

### Method 1: Enter text directly

Type your text directly in the spreadsheet cell. Best for short panels (1–2 paragraphs).

```csv
layer1_content
"This fragment shows **advanced weaving techniques** from the colonial period."
```

You can use basic formatting: `**bold**`, `*italic*`, `[link text](url)`, and glossary links (`[[term-id]]`).

For line breaks within a cell:
- **Google Sheets**: Press `Ctrl+Enter` (Windows/Linux) or `Option+Enter` (macOS)
- **CSV files**: Use actual newlines inside quoted text
- **Alternative**: Use HTML `<br>` tags

### Method 2: Paste markdown text

Paste text written in a plain text editor. This supports the full range of markdown features including headings, widgets (accordion, carousel, tabs), images with size controls, and a custom panel title using YAML frontmatter.

{: .warning }
> If you copy and paste from Microsoft Word, Google Docs, or similar applications, formatting will **not** be preserved. Write in markdown syntax instead — see the [Markdown Syntax Guide](/docs/your-content/markdown-syntax/).

### Method 3: Reference a markdown file

Point to a markdown file in your repository. Best for complex panels — especially those with widgets or content you want to reuse across steps.

```csv
layer1_content
colonial-textiles/step1-layer1.md
```

Save markdown files in `telar-content/texts/stories/`. In your spreadsheet, enter just the filename — or if you've organized files into subfolders, include the subfolder name.

**How Telar decides**: If what you enter ends in `.md` and the file exists, it loads the file. Otherwise, it treats the value as content.

### Choosing the right method

| Scenario | Recommended method |
|----------|-------------------|
| Short explanation (1–2 paragraphs) | Method 1: Enter directly |
| Panel with custom title or widgets | Method 2: Paste, or Method 3: File reference |
| Content with widgets (accordion, tabs, carousel) | Method 3: File reference |
| Same content used in multiple places | Method 3: File reference |
| Quick edits without leaving the spreadsheet | Method 1 or 2 |

## Story markdown files

When using Method 3 (file references), your story markdown files live in `telar-content/texts/stories/`:

```
telar-content/texts/stories/
├── colonial-textiles/
│   ├── step1-layer1.md
│   ├── step1-layer2.md
│   ├── step2-layer1.md
│   └── step2-layer2.md
└── trade-routes/
    ├── step1-layer1.md
    └── step1-layer2.md
```

Organizing files into subfolders by story keeps things manageable as your site grows.

### Panel title

Add a custom panel title using YAML frontmatter:

```markdown
---
title: "Weaving Techniques"
---

The interlocking warp pattern visible here indicates a complex
weaving technique that was common in the colonial period.
```

If you omit the frontmatter, the panel has no title — the content starts immediately.

### What you can use in panels

Story panels support:

- Standard markdown (headings, bold, italic, links, lists, images)
- [Widgets](/docs/your-content/widgets/) (carousel, tabs, accordion)
- [Glossary auto-links](/docs/site-features/glossary/) (`[[term-id]]`)
- Images with size controls (see [Markdown Syntax Guide](/docs/your-content/markdown-syntax/))

## Multimedia steps

Story steps can reference any object type — not just images. When a step references a video or audio object, the viewer area switches automatically to the appropriate player.

- **Video objects** — The video player fills the viewer area with standard playback controls. See [Video Objects](/docs/your-content/video-objects/) for supported platforms and setup.
- **Audio objects** — The audio player fills the viewer area with waveform visualization. See [Audio Objects](/docs/your-content/audio-objects/) for supported formats and setup.

No additional configuration is needed. Telar detects the object type from your objects spreadsheet and loads the correct player.

## Clip control

For video and audio steps, you can specify a start time, end time, and loop setting. Add these columns to your story spreadsheet:

| Column (English) | Column (Spanish) | Description |
|---|---|---|
| `clip_start` | `inicio_clip` | Start time in seconds (e.g. `12.5`) |
| `clip_end` | `fin_clip` | End time in seconds |
| `loop` | `bucle` | Loop the clip (`true`, `yes`, or `sí`) |

All three columns are optional. If omitted, the media plays from the beginning without looping.

```csv
step,object,clip_start,clip_end,loop,question,answer
1,interview-01,45,78,false,What does she describe?,The weaving technique used in her community.
2,field-recording,0,30,true,What sounds surround the workshop?,The rhythmic clatter of the loom fills the space.
```

{: .tip }
> You can also set clip times visually using the Compositor's clip capture interface. See [Video and Audio in the Compositor](/docs/the-compositor/video-audio/) for details.

See the [CSV Reference: Stories](/docs/your-data/csv-stories/) for the full column reference including clip columns.

## Alt text

Each step can include an `alt_text` column with a description of what is visible or audible at that point in the story. This text is used by screen readers and other assistive technologies.

```csv
step,object,x,y,zoom,alt_text,question,answer
1,textile-001,0.5,0.3,0.8,Close-up of interlocking warp threads in red and gold,What is this textile?,A colonial fragment showing complex weaving patterns.
```

{: .tip }
> Alt text for each step can also be set in the [Compositor's step editor](/docs/the-compositor/story-editor/).

## Keyboard navigation

Stories support keyboard navigation. Arrow keys, Space, and Page Up/Down scroll through the story, and the magnetic waypoints ensure each keypress lands on the next or previous step.

## Controlling story display

### Hiding stories from the homepage

If you want objects on the homepage but prefer stories to be accessed through navigation or direct links:

```yaml
story_interface:
  show_on_homepage: false
```

Stories remain accessible at their URLs — only the homepage cards are hidden.

### Hiding step indicators

The "Step 1", "Step 2" indicators in the top-left corner of the story viewer can be hidden for a cleaner experience:

```yaml
story_interface:
  show_story_steps: false
```

Viewers can still navigate through steps normally.

## See also

- [CSV Reference: Stories](/docs/your-data/csv-stories/) — Complete column reference for story spreadsheets
- [Objects](/docs/your-content/objects/) — Defining the objects used in stories
- [Video Objects](/docs/your-content/video-objects/) — Adding video objects from YouTube, Vimeo, and Google Drive
- [Audio Objects](/docs/your-content/audio-objects/) — Adding self-hosted audio files
- [Widgets](/docs/your-content/widgets/) — Carousel, tabs, and accordion in story panels
- [Private Stories](/docs/site-features/private-stories/) — Restricting access to stories
- [Configuration](/docs/configure/configuration/) — Story interface settings
