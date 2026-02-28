---
layout: docs
title: 1.4. Review and Refine
parent: 1. Getting Started
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/getting-started/review-refine/
tutorial_prev:
  title: "Add Your Content"
  url: /docs/getting-started/add-content/
---

# Step 4: Review and Refine

Browse through your exhibition and check for:

- Warning messages on the homepage (these point to configuration issues)
- Correct images appearing for each story step
- Text displaying as expected

## Set Your Image Coordinates

The placeholder coordinates (`0.5, 0.5, 1.0`) show the center of each image. To focus on specific details:

1. Navigate to any object page on your site
2. Click **Identify coordinates** below the image viewer
3. Pan and zoom to find the perfect view for each story step
4. Copy the X, Y, and Zoom values
5. Paste them into your spreadsheet
6. Trigger a rebuild to see the changes

![Coordinate picker showing X, Y, and Zoom values below the image viewer](/images/coordinate-picker.png)

## Make Stories Private (Optional)

If you want to restrict access to a story — for classroom use, drafts, or work in progress:

1. In the **project** tab, set the `protected` column to `yes` for that story
2. In your repository's `_config.yml`, add a `story_key`:

   ```yaml
   story_key: "your-secret-key"
   ```

3. Share the key with your viewers, or send them a link with `?key=your-secret-key` appended

See [Private Stories](/docs/site-features/private-stories/) for details.

## Keep Building

Once the basics are in place, you can:

- Add more stories (create new story tabs in your spreadsheet)
- Add a glossary of terms (use the glossary tab in your spreadsheet)
- Customize your homepage (edit `index.md` in your repository)
- Browse and search your objects collection (enabled by default)

When your panels need more than a few paragraphs — widgets, rich formatting, or reusable content — see [Rich Content](/docs/your-content/rich-content/) for how to add markdown files.

## Next Steps

- [Rich Content](/docs/your-content/rich-content/) — Enhance panels with markdown files and widgets
- [Your Content](/docs/your-content/) — How Telar organizes your materials
- [Themes](/docs/customization/themes/) — Customizing your site's look and feel
- [Self-Hosted Images](/docs/your-content/self-hosted-images/) — Upload and process your own images
- [External IIIF Images](/docs/your-content/external-iiif/) — Use images from museums and libraries
