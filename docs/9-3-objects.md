---
layout: docs
title: "9.3. Objects"
parent: "9. The Compositor"
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/the-compositor/objects/
---

# Objects

The Objects page in the Compositor lets you browse, edit, and add the visual items that make up your exhibition. Every object you manage here — images, IIIF manifests, videos, audio files — is tracked in your repository's `objects.csv` file. The Compositor handles that file for you, so you never need to edit it directly.

## Object list

The object list shows all objects in your exhibition as a grid of thumbnails. Each object displays:

- A **thumbnail** preview of the image or media
- The object's **title**
- A **status indicator** showing its current state

### Status indicators

Objects can have one of three statuses:

- **Ready** — The object has metadata and its image tiles are available. It is ready to use in stories.
- **No metadata** — The object exists but is missing key information like title, creator, or description. You can still use it in stories, but adding metadata improves your exhibition.
- **Tiles missing** — The object's IIIF tiles have not been generated yet. This can happen with newly uploaded images that have not been published and built.

### Featured toggle

You can mark any object as featured. Featured objects appear prominently on your site's home page and in the objects gallery.

To toggle an object's featured status, click the featured indicator on the object card.

## Edit metadata

Select an object to open its metadata editor. Here you can fill in or update the information that describes the object in your exhibition.

The metadata fields are:

| Field | Description |
|---|---|
| **Title** | The name of the object as it appears on your site |
| **Creator** | The person or organization that created the object |
| **Date** | When the object was created or published |
| **Description** | A short summary of what the object depicts or contains |
| **Source** | Where the object comes from — a collection, archive, or URL |
| **Alt text** | A description for screen readers and accessibility |
| **Genre / Medium** | The type of object — photograph, painting, map, manuscript, etc. |

{: .tip }
> Alt text is important for accessibility. Write a brief, descriptive sentence that conveys what the image shows to someone who cannot see it.

## Add external IIIF

You can add objects from museums, libraries, and other institutions that publish IIIF manifests. The Compositor fetches the image and metadata automatically.

1. Click **Add Object** and select the IIIF option
2. Paste the manifest URL into the field
3. The Compositor retrieves the image and fills in available metadata (title, creator, description)
4. Review and adjust the metadata as needed
5. Save the object

{: .note }
> To find IIIF manifests, look for the IIIF logo on museum and library websites, or check the [IIIF Guide to Finding Resources](https://iiif.io/guides/finding_resources/). For more background on IIIF in Telar, see [External IIIF Images](/docs/your-content/external-iiif/).

## Upload images

You can upload your own images directly through the Compositor. Uploaded images are committed to your repository and IIIF tiles are generated automatically during the next build.

1. Click **Add Object** and select the upload option
2. Drag files into the upload area, or click to select files from your computer
3. Fill in metadata while the upload processes
4. Save the object to your project

Supported formats are JPG, PNG, and TIFF, with a maximum file size of 25 MB per image.

{: .note }
> After uploading, the object's status may show **Tiles missing** until you publish and the GitHub Actions build generates the IIIF tiles. The object is still usable in the Compositor — tiles will be available on your live site after the build completes.

## Save to repository

When you save changes to objects — whether editing metadata, adding IIIF, or uploading images — those changes are stored locally in the Compositor. To send them to GitHub, you need to publish.

Publishing commits an updated `objects.csv` to your repository along with any uploaded image files. See [Publishing](/docs/the-compositor/publishing/) for the full workflow.

## Sync

If objects were added or changed outside the Compositor — for example, by editing `objects.csv` directly or uploading images through GitHub — you can re-scan your repository to pick up those changes.

1. Click the **Sync** button
2. The Compositor re-reads your repository and updates the object list

{: .warning }
> If you have unpublished changes in the Compositor, syncing may overwrite them with the repository's current state. Publish your changes first, or review carefully before syncing.

## See also

- [Dashboard](/docs/the-compositor/dashboard/) — Return to the project overview
- [Objects](/docs/your-content/objects/) — How objects work in Telar
- [External IIIF Images](/docs/your-content/external-iiif/) — Background on IIIF manifests and sources
- [Self-Hosted Images](/docs/your-content/self-hosted-images/) — How uploaded images become IIIF tiles
