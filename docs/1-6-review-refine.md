---
layout: docs
title: "Frame, review and publish from Sheets"
parent: 1. Getting Started
grand_parent: Documentation
nav_order: 6
lang: en
permalink: /docs/getting-started/review-refine/
tutorial_prev:
  title: "Add Your Content"
  url: /docs/getting-started/add-content/
---

# Frame, review and publish from Sheets

<span class="anchor-alias" id="review-and-refine"></span>

<span class="anchor-alias" id="next-steps"></span>

<span class="anchor-alias" id="keep-building"></span>

Use the first build to choose precise views and test the narrative. Keep the sheet as your source while you revise.

<span class="anchor-alias" id="set-your-image-coordinates"></span>
## Set each image's framing

1. Open the intended object's page on the built site.
2. Choose **Identify coordinates**.
3. Select the document page if it has more than one.
4. Pan and zoom to the detail for your step.
5. Copy the X, Y and Zoom values into that step's row.
6. Rebuild and revisit the step.

For the khipu example, frame the khipu image itself. Do not substitute a view from another object just because its coordinate tool is already open.

{% include docs/media.html id="coordinates" %}

<span class="anchor-alias" id="make-stories-private-optional"></span>
## Check the main story and optional routes

Read the questions and short answers in sequence. Verify that the source and view support each observation.

Open every first and second panel, follow glossary links and return to the story. Check the ending, the homepage story order and the menu. Test a narrow window and keyboard navigation.

Use [the reader-testing guide](/docs/plan/review/) for a structured review with another person.

## Publish a sheet revision

A sheet edit does not trigger the repository workflow by itself. Run **Build and Deploy** from **Actions** when you want to publish the latest sheet content.

Open the run's log if it fails. Confirm the published spreadsheet address and that the required tabs remain published. If the site loads but a source does not, check the object ID and source URL rather than changing unrelated configuration.

## Handle private or unfinished work

A private story uses the `private` project column and a `story_key` in the configuration. Read [private stories](/docs/site-features/private-stories/) before using it. A key does not make externally hosted images private.

Keep unfinished work out of the published story list until it is ready. The Compositor's draft flag is an editor workflow; do not assume that marking a row private removes it from publication.

## Complete the exhibition

Edit the homepage introduction and supporting pages, review credits and disable demo content when the examples no longer belong. Rebuild and inspect the public result once more.

Keep the spreadsheet, repository and public-site addresses together. Record which one is the editing source so collaborators know where to make the next change.
