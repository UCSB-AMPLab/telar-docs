---
title: Add an object and a first story
url: /docs/getting-started/add-content/
translationKey: docs-getting-started-add-content
type: guide
docs_section: sheets
---

# Add an object and a first story {#add-an-object-and-a-first-story}

Start with one object and a short sequence. Once the full route works, extend it with more sources and optional layers.

<span class="anchor-alias" id="add-detail-panels"></span>
<span class="anchor-alias" id="add-your-content"></span>
<span class="anchor-alias" id="add-your-media"></span>
## Add the source {#add-the-source}

In the **objects** tab, add an ID, title, source address and useful metadata. For an external IIIF source, put the manifest URL in `source_url`.

Use this example if you need a source for practice:

```text
https://juancobo.com/138la/iiif/khipu/p7/manifest.json
```

Choose the ID `khipu` and a title such as “Haptic khipu”. Add a description of the visible activity and retain the source's catalogue information and credit.

For a file you host yourself, upload it to `telar-content/objects/` in your repository, use its filename as the object ID and leave `source_url` blank. Read [self-hosted images](/docs/your-content/self-hosted-images/) for supported formats and processing.

<span class="anchor-alias" id="register-your-objects"></span>
<span class="anchor-alias" id="register-your-stories"></span>
<span class="anchor-alias" id="structure-your-story"></span>
## Register the story {#register-the-story}

In **project**, add a story row with an order, stable story ID and title. For example:

| order | story_id | title |
|---|---|---|
| 1 | khipu-story | Examining a khipu |

Create or rename the story tab to `khipu-story`. The ID and tab name must match. Keep the template's column headers.

## Add the first step {#add-the-first-step}

Fill one row:

| Column | Example |
|---|---|
| `step` | `1` |
| `object` | `khipu` |
| `x`, `y`, `zoom` | `0.5`, `0.5`, `1` |
| `question` | Which activity does this image document? |
| `answer` | Sampling a khipu for radiocarbon dating in spring 2025. |
| `alt_text` | Gloved hands working with knotted cords on a white surface. |

Add another numbered row for the next observation. You can use the same object with a different framing. For multi-page objects, the optional `page` column chooses the page first.

For recordings, use `clip_start` and `clip_end` in seconds and `loop` where needed. Read [video](/docs/your-content/video-objects/) and [audio](/docs/your-content/audio-objects/) before using a provider with different playback behaviour.

## Add optional depth {#add-optional-depth}

Write additional context in `layer1_content`. Give the opening button a useful name in `layer1_button`. A second panel uses `layer2_content` and opens from the first.

For longer texts, use a Markdown file reference. Add glossary terms in the **glossary** tab and insert `[[term-id]]` links in supported text fields.

<span class="anchor-alias" id="build-your-site"></span>
## Build the first edition {#build-the-first-edition}

Save the sheet changes. In your repository, open **Actions**, select **Build and Deploy**, then **Run workflow**. The build fetches the published sheet.

Wait for that run to complete, then open the site. Next, [capture the framing and review the result](/docs/getting-started/review-refine/).
