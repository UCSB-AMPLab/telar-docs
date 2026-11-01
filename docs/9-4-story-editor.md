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

Open a story from **Stories** to write its questions, brief answers and optional panels. The editor combines the story outline, editable text and the view visitors will see.

The sidebar uses a **square** for the title card, **circles** for steps and an **upward triangle** for the final step. A step's first panel branches from it; a second panel branches from the first.

{% include docs/media.html id="editor-overview" %}

## Title card

Select the title card at the top of the outline. Click its title, subtitle or byline, or the corresponding editing icon, to change the field. Your edits are saved as you work.

<span class="anchor-alias" id="object-picker" aria-hidden="true"></span>

## IIIF viewer

Select an image step and choose **Change object** to pick its source. Pan and zoom to the detail you want visitors to see.

To save the view:

1. Select the step.
2. Pan and zoom to the intended framing.
3. Choose **Capture position**.
4. Check the **Captured** confirmation.
5. Move to the title card or another step, then return and check the saved view.

{: .note }
> Panning and zooming explore the object. **Capture position** records the framing for the selected step. Capture again if you change the view you want to preserve.

{% include docs/media.html id="framing" %}

The guides indicate the frame and the centre of the view. The text-limit guide helps you see how much of the brief answer fits in the public card.

## Step management

- **+ Add step** creates a step. If you are offered the previous object, you can keep it or choose another.
- **Change object** selects a different source for the current step.
- Drag a step by its handle to change its position.
- Use the step's delete control and read the confirmation before removing it.
- **Add section title** inserts a heading that groups parts of the story.

Write a question and a brief answer on each step card. Click the text or its editing icon. The answer field accepts Markdown; click outside it to review the rendered text.

Video and audio steps have media controls in place of the image viewer. See [Video and Audio](/docs/the-compositor/video-audio/).

## Layer editing

Choose **+ Add panel** on a step card, or open an existing panel using its button. Edit the panel's title and content in place using the text or editing icons. The first panel can offer a button to a second panel.

Keep the main answer concise. Use panels for the context, evidence and nuance a reader may choose to explore.

{% include docs/media.html id="panels" %}

### Formatting toolbar

When editing panel content, use the formatting controls or write Markdown directly. Review the rendered panel after editing. See [Markdown Syntax](/docs/your-content/markdown-syntax/) and [Rich Content](/docs/your-content/rich-content/) for supported content.

{% include docs/media.html id="panel-editor" %}

### Keyboard shortcuts

Standard editing shortcuts depend on the focused field. Keep the text editor focused when applying a formatting command. Use the toolbar when you are unsure which command is available.

### Image insertion

Use the panel editor's image controls to add an image, and supply the information the dialog requests. A panel image is part of the explanation; the step's main source is selected separately through **Change object**.

### Rich paste

When bringing text from another application, check the resulting formatting, links and spacing in the rendered panel before publishing.

### Embed preservation

For embedded media and interactive content inside panels, follow [Rich Content](/docs/your-content/rich-content/) and [Widgets](/docs/your-content/widgets/). Check the actual published result as well as the editor preview.

## See also

- [Use an IIIF object in a story](/docs/the-compositor/iiif-to-story/)
- [Start and navigation](/docs/the-compositor/dashboard/)
- [Video and Audio](/docs/the-compositor/video-audio/)
- [Publishing](/docs/the-compositor/publishing/)
