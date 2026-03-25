---
layout: docs
title: "9.6. Publishing"
parent: "9. The Compositor"
grand_parent: Documentation
nav_order: 6
lang: en
permalink: /docs/the-compositor/publishing/
---

# Publishing

Publishing sends your changes from the Compositor to your GitHub repository. Until you publish, all edits — to objects, stories, and settings — are saved on the server. Publishing creates a single commit in your repository, triggers a GitHub Pages build, and makes your changes live on your site.

## Change summary

Before publishing, the Compositor shows a summary of everything that has changed since your last publish. This lets you review your work before committing.

The change summary lists additions, modifications, and deletions across your project — new objects, edited story steps, updated metadata, and any other changes you have made. Review this summary carefully to make sure it reflects what you intend to publish.

## Pre-publish validation

The Compositor validates your project before allowing you to publish. Validation catches issues that could cause problems on your live site.

There are two levels of validation:

- **Errors** — Critical issues that block publishing. For example, a required field might be missing or a story might reference an object that does not exist. You must fix errors before you can publish.
- **Warnings** — Non-critical issues that do not block publishing but are worth reviewing. For example, an object might be missing alt text or a story might have only one step. You can publish with warnings, but addressing them improves your exhibition.

## Publish

When you are ready, click the publish button. The Compositor creates a single atomic commit in your GitHub repository containing all your changes. The commit is attributed to your GitHub account — your name and email appear in the repository's commit history, not the Compositor's.

Publishing triggers a GitHub Pages build automatically. You do not need to visit GitHub or run any additional steps.

## Build tracking

After publishing, the Compositor tracks the progress of your GitHub Pages build in real time. A progress indicator shows the current status:

- **Queued** — The build is waiting to start
- **Building** — GitHub Actions is building your site
- **Complete** — The build finished successfully and your changes are live
- **Failed** — The build encountered an error

If a build fails, the Compositor displays the error information so you can diagnose the issue. Common causes include invalid YAML in configuration files or missing required files. You can fix the issue and publish again.

## Post-publish

Once the build completes successfully, the Compositor provides a direct link to your live site. Click it to see your published changes immediately.

## Config editor

The Compositor includes a configuration editor for essential site settings. Instead of editing your `_config.yml` file directly through GitHub, you can update key fields through a form in the Compositor.

The config editor lets you change settings like your site title, theme options, and other configuration values that affect how your exhibition appears. Changes to configuration are included in your next publish alongside any content changes.

{: .note }
> The config editor covers the most commonly used settings. For advanced configuration options, you can still edit `_config.yml` directly in your repository. See [Configuration](/docs/configuration/) for the full reference.

## See also

- [Story Editor](/docs/the-compositor/story-editor/) — Building and editing your stories
- [Objects](/docs/the-compositor/objects/) — Managing objects in the Compositor
- [Sync and Updates](/docs/the-compositor/sync-updates/) — Keeping your project in sync with your repository
- [Dashboard](/docs/the-compositor/dashboard/) — Return to the project overview
