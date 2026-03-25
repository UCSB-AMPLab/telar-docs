---
layout: docs
title: "9. The Compositor"
parent: Documentation
nav_order: 9
has_children: true
lang: en
permalink: /docs/the-compositor/
---

# The Compositor

The Telar Compositor is a visual editor for building and managing your exhibition — no spreadsheets, no command line, no code. It runs in your browser at [compositor.telar.org](https://compositor.telar.org) and connects directly to your GitHub repository.

## What is the Compositor?

If you have used Telar before, you know that content is defined through spreadsheet files — CSV files or Google Sheets — and published through GitHub. The Compositor replaces that workflow with a point-and-click editor. You can:

- Import existing content from a Telar repository or Google Sheets
- Add and edit objects with metadata, IIIF manifests, or uploaded images
- Build stories visually — write panels, set viewer coordinates, capture clip times
- Publish changes to GitHub with a single click
- Track your site's build status in real time

The Compositor is designed for students, educators, and anyone who wants to focus on storytelling rather than data files.

## How it works

The typical workflow has four stages:

1. **Sign in** — Authenticate with your GitHub account at [compositor.telar.org](https://compositor.telar.org)
2. **Connect a repository** — Select an existing Telar repository and import its content
3. **Edit** — Use the visual editor to manage objects, write stories, and arrange steps
4. **Publish** — Review your changes, commit to GitHub, and watch the build complete

Every change you make in the Compositor is saved automatically on the server until you publish. Publishing creates a single commit in your repository — attributed to you — and triggers a GitHub Pages build automatically.

## Requirements

To use the Compositor, you need:

- A **GitHub account** ([sign up for free](https://github.com/join))
- A **Telar repository** created from the [Telar template](https://github.com/UCSB-AMPLab/telar) (see [Getting Started](/docs/getting-started/compositor/) for setup instructions)
- **GitHub Pages enabled** with the source set to **GitHub Actions** (see [Getting Started](/docs/getting-started/compositor/) for details)

## In this section

- [Getting Started](/docs/the-compositor/getting-started/) — Sign in, connect a repository, and import your content
- [Dashboard](/docs/the-compositor/dashboard/) — Navigate your project, manage stories, and monitor your site
- [Objects](/docs/the-compositor/objects/) — Browse, edit, upload, and add objects to your exhibition
- [Story Editor](/docs/the-compositor/story-editor/) — Build stories with a visual editor, capture coordinates, and write layer content
- [Video and Audio](/docs/the-compositor/video-audio/) — Capture clips, set loop points, and work with multimedia steps
- [Publishing](/docs/the-compositor/publishing/) — Review changes, commit to GitHub, and track your build
- [Sync and Updates](/docs/the-compositor/sync-updates/) — Re-sync with your repository and upgrade Telar
