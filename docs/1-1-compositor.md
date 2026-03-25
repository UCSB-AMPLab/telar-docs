---
layout: docs
title: "1.1. Option A: Use the Compositor"
parent: 1. Getting Started
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/getting-started/compositor/
---

# Use the Compositor

The Telar Compositor is a visual tool for building exhibitions. You can add objects, write stories, arrange steps, and preview your site — all in your browser, with no coding required.

When you're ready, the Compositor exports a complete Telar site that you publish to GitHub Pages.

## What you'll need

- A [GitHub account](https://github.com/join) (free)
- Images, videos, or audio files for your exhibition

## Create Your Repository

A repository is your project's home on GitHub — it holds your configuration and image files.

1. Visit the [Telar template](https://github.com/UCSB-AMPLab/telar)
2. Click the green **Use this template** button
3. Choose **Create a new repository**
4. Give your repository a name — **use lowercase letters and hyphens** (e.g., `my-exhibition`) — this will be part of your site's web address
5. Make sure **Public** is selected
6. Click **Create repository**

![GitHub screenshot: Use this template button](/images/use-this-template.png)

{: .warning }
> **Keep your repository public.** Private repositories will not work with GitHub Pages unless you have a paid GitHub plan.

## Enable GitHub Pages

GitHub Pages turns your repository into a live website for free.

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

![Setting up GitHub Pages with GitHub Actions](/images/github-actions.gif)

## Open the Compositor

The Compositor is a full-featured visual editor for building Telar exhibitions. With it you can:

- **Edit stories visually** — add steps, write text, set image coordinates, and preview your narrative in real time
- **Upload images** — drag and drop images directly; IIIF tiles are generated automatically
- **Add video and audio** — embed YouTube, Vimeo, or Google Drive videos and self-hosted audio files with clip controls
- **Publish in one click** — review your changes, commit to GitHub, and track the build without leaving the editor

Go to [compositor.telar.org](https://compositor.telar.org), sign in with your GitHub account, and connect your repository to get started.

For the full guide, see [The Compositor](/docs/the-compositor/).

## Next steps

Once your site is live, continue with the tutorial to learn more about Telar's narrative model and how to refine your exhibition:

- **[Plan Your Narrative](/docs/getting-started/narrative-structure/)** — Understand how stories, steps, and panels fit together
- **[Review and Refine](/docs/getting-started/review-refine/)** — Set image coordinates, review your site, and polish
