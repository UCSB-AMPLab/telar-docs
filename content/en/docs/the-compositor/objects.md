---
title: Objects
url: /docs/the-compositor/objects/
translationKey: docs-the-compositor-objects
type: guide
docs_section: compositor
---

# Objects {#objects}

The Objects page in the Compositor lets you browse, edit, and add the visual items that make up your exhibition. Every object you manage here — images, IIIF manifests, videos, audio files — is tracked in your repository's `objects.csv` file. The Compositor handles that file for you, so you never need to edit it directly.

## Object list {#object-list}

The object list shows all objects in your exhibition as a list with thumbnails. Each object displays:

- A **thumbnail** preview of the image or media
- The object's **title**
- A **status indicator** showing its current state

### Status indicators {#status-indicators}

The status reports availability; it does not mean the catalogue description has been fully reviewed.

- **Ready** — The object has a title and passes the image-availability check where that check applies.
- **No metadata** — The title is missing. Review the record and add its title and other useful catalogue information.
- **Needs tiles** — The image is not yet available. For a hosted file, check its build and generated tiles; for an external source, check the manifest.
- **Missing from repo** — The record has been flagged as absent from the repository. Review the repository comparison before deciding what to keep.

### Featured toggle {#featured-toggle}

You can mark any object as featured. Featured objects appear prominently on your site's home page and in the objects gallery.

To toggle an object's featured status, click the featured indicator on the object row.

{{< media id="objects" >}}

## Edit metadata {#edit-metadata}

Select an object to open its metadata editor. Here you can fill in or update the information that describes the object in your exhibition.

The metadata fields are:

| Field | Description |
|---|---|
| **Title** | The name of the object as it appears on your site |
| **Creator** | The person or organization that created the object |
| **Year** | When the object was created or published |
| **Description** | A short summary of what the object depicts or contains |
| **Source** | Where the object comes from — a collection, archive, or URL |
| **Alt text** | A description for screen readers and accessibility |
| **Genre / Medium** | The type of object — photograph, painting, map, manuscript, etc. |

{{< callout "tip" >}}
Alt text is important for accessibility. Write a brief, descriptive sentence that conveys what the image shows to someone who cannot see it.
{{< /callout >}}

{{< media id="object-metadata" >}}

## Add external IIIF {#add-external-iiif}

1. Open **Objects** and choose **+ Add object**.
2. Select **IIIF manifest**.
3. Paste the manifest URL and choose **Fetch manifest**.
4. Review the preview, title, source, credit and any other supplied metadata.
5. Choose **Add object**.

Adding the object makes it available in the collection. Select it separately in a story step using **Change object**.

Follow [Use an IIIF object in a story](/docs/the-compositor/iiif-to-story/) for the complete illustrated khipu example. See [External IIIF Images](/docs/your-content/external-iiif/) for background.

{{< media id="import" >}}

## Upload images {#upload-images}

You can upload your own images directly through the Compositor. Uploaded images are committed to your repository and IIIF tiles are generated automatically during the next build.

1. Click **Add object** and select the upload option
2. Drag files into the upload area, or click to select files from your computer
3. Fill in metadata while the upload processes
4. Save the object to your project

Supported formats are JPG, PNG, and TIFF, with a maximum file size of 25 MB per image.

{{< callout "note" >}}
After uploading, the object's status may show **Needs tiles** until you publish and the GitHub Actions build generates the IIIF tiles. The object is still usable in the Compositor — tiles will be available on your live site after the build completes.
{{< /callout >}}

## Save to repository {#save-to-repository}

When you save changes to objects — whether editing metadata, adding IIIF, or uploading images — those changes are saved in the Compositor draft. To send them to GitHub, you need to publish.

Publishing commits an updated `objects.csv` to your repository along with any uploaded image files. See [Publishing](/docs/the-compositor/publishing/) for the full workflow.

## Sync {#sync}

When objects change outside the Compositor, use the project's **Changes on GitHub** review. Read the differences and choose which version to keep before applying them. See [Sync and Updates](/docs/the-compositor/sync-updates/).

Unpublished editing and publishing are separate. Review the consequences shown for the affected object rather than re-importing the entire project.

## See also {#see-also}

- [Start and navigation](/docs/the-compositor/dashboard/) — Return to the project overview
- [Objects](/docs/your-content/objects/) — How objects work in Telar
- [External IIIF Images](/docs/your-content/external-iiif/) — Background on IIIF manifests and sources
- [Self-Hosted Images](/docs/your-content/self-hosted-images/) — How uploaded images become IIIF tiles
