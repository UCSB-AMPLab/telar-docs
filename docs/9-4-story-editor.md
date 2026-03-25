---
layout: docs
title: "9.4. Story Editor"
parent: "9. The Compositor"
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/the-compositor/story-editor/
---

# Story Editor

The story editor is where you build and refine your narratives. It combines a text editor, an interactive viewer, and step management tools into a single workspace — everything you need to compose a story without editing spreadsheet files.

When you open a story from the [Dashboard](/docs/the-compositor/dashboard/), the editor loads with the title card on the left and the viewer on the right. Each step in your story appears as a card in the sidebar, and selecting a step updates both the text editor and the viewer to show that step's content.

## Title card

The title card is the first thing your audience sees. It displays your story's title, subtitle, and byline.

To edit the title card, click directly on any of its fields. Changes save automatically as you type — there is no separate save button. The title card is always the first item in the step sidebar.

## IIIF viewer

The right side of the editor shows an interactive IIIF viewer. When a step references an image object, you can pan and zoom to frame the exact view you want your audience to see.

To capture the current view for a step:

1. Navigate to the step you want to configure
2. Pan and zoom the viewer until the image shows the framing you want
3. The Compositor captures the current x, y, and zoom coordinates and saves them to the step

These coordinates control what your audience sees when they reach that step in the published story. For background on how viewer coordinates work in Telar, see [Stories & Panels](/docs/your-content/stories-panels/).

## Step management

The sidebar lists all steps in your story. You can reorganize and modify your story structure here.

- **Add a step** — Click the add button at the bottom of the sidebar to append a new step
- **Insert a step** — Click the insert button between two existing steps to place a new step at that position
- **Delete a step** — Remove a step and its content from the story
- **Reorder steps** — Drag a step by its handle to move it to a new position in the sequence

### Object picker

Each step can display a different object in the viewer. To change which object a step shows, use the object picker — it lets you browse all objects in your exhibition and select one for the current step.

When a step references a video or audio object, the viewer column shows the appropriate media player instead of the IIIF viewer. See [Video and Audio](/docs/the-compositor/video-audio/) for details on working with multimedia steps.

## Layer editing

The text panel for each step uses a live preview editor powered by CodeMirror. You write in markdown and see the formatted result immediately — no need to switch between editing and preview modes.

### Formatting toolbar

The toolbar above the editor provides quick access to common formatting options:

- **Bold** and **Italic** — Emphasis and strong emphasis
- **Link** — Insert or edit a hyperlink
- **Image** — Insert an image into the panel text
- **Headings** — Apply heading levels (H2, H3)
- **Lists** — Bulleted and numbered lists
- **Blockquote** — Indented quotation blocks
- **Undo** and **Redo** — Step backward or forward through your edits

### Keyboard shortcuts

For faster editing, the editor supports standard keyboard shortcuts:

| Shortcut | Action |
|---|---|
| Cmd+B (Ctrl+B on Windows/Linux) | Bold |
| Cmd+I (Ctrl+I on Windows/Linux) | Italic |
| Cmd+K (Ctrl+K on Windows/Linux) | Insert link |
| Cmd+Z (Ctrl+Z on Windows/Linux) | Undo |

### Image insertion

You can add images to your panel text in two ways:

- **From a URL** — Paste any image URL and the editor inserts it as a markdown image
- **From your IIIF objects** — Browse the objects in your repository and select one. The Compositor generates the correct URL automatically.

### Rich paste

When you paste content from other applications — such as a word processor or a web page — the editor automatically converts the HTML formatting to markdown. Bold text stays bold, links remain clickable, and headings keep their levels. This makes it easy to move existing text into your story panels.

### Embed preservation

If you paste a YouTube or Vimeo embed code (an `<iframe>` tag), the editor preserves it as raw HTML rather than converting it. This lets you embed video players directly in your panel text, separate from the viewer column.

## See also

- [Dashboard](/docs/the-compositor/dashboard/) — Return to the project overview
- [Video and Audio](/docs/the-compositor/video-audio/) — Working with video and audio steps
- [Publishing](/docs/the-compositor/publishing/) — Review and publish your changes
- [Stories & Panels](/docs/your-content/stories-panels/) — How stories work in Telar
- [Rich Content](/docs/your-content/rich-content/) — Markdown formatting reference for panel text
