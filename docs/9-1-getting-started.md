---
layout: docs
title: "9.1. Getting Started"
parent: "9. The Compositor"
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/the-compositor/getting-started/
---

# Getting started with the Compositor

This page walks you through signing in to the Compositor, connecting a repository, and importing your content. By the end, you will have your exhibition loaded in the Compositor and ready to edit.

## Prerequisites

Before you begin, make sure you have:

- A **GitHub account** — [sign up for free](https://github.com/join) if you don't have one
- A **Telar repository** — create one from the [Telar template](https://github.com/UCSB-AMPLab/telar) (see [Use the Compositor](/docs/getting-started/compositor/) for step-by-step instructions)
- **GitHub Pages enabled** — in your repository settings, set the Pages source to **GitHub Actions**

## Sign in

The Compositor uses your GitHub account for authentication and publishing. No separate account is needed.

1. Go to [compositor.telar.org](https://compositor.telar.org)
2. Click **Sign in with GitHub**
3. Authorize the Telar Compositor when GitHub prompts you

## Install the GitHub App

On your first sign-in, the Compositor asks you to install the Telar GitHub App. This app gives the Compositor permission to read and write to your repositories.

1. When prompted, click **Install**
2. Choose whether to grant access to all repositories or only specific ones
3. Confirm the installation

{: .tip }
> If you only want the Compositor to access one repository, select **Only select repositories** and choose it from the list. You can change this later in your GitHub settings under **Applications**.

## Connect a repository

After signing in, you select which repository to work with.

1. The Compositor shows a list of your GitHub repositories that have the Telar GitHub App installed
2. Select the repository you want to edit
3. The Compositor scans the repository to detect Telar content files

If the repository was created from the Telar template and has content in `telar-content/`, the Compositor imports it automatically.

## Import from Google Sheets

If your Telar site uses Google Sheets as its data source, the Compositor can import directly from your spreadsheet.

1. When the Compositor detects a Google Sheets URL in your site configuration, it offers to import from Sheets
2. Confirm the import to pull your current content into the Compositor
3. After your first publish through the Compositor, you can optionally disable the Google Sheets connection — the Compositor becomes your primary editor

{: .note }
> Importing from Google Sheets does not delete or modify your spreadsheet. It copies the data into the Compositor so you can edit it visually.

## After import

Once the import completes, you land on the [Dashboard](/docs/the-compositor/dashboard/). From here you can:

- View and manage your stories
- Browse and edit your objects
- Start building new content

Your imported content is saved on the server. Changes you make are not sent to GitHub until you publish — so you can explore and experiment freely.

## See also

- [Dashboard](/docs/the-compositor/dashboard/) — Navigate your project and manage stories
- [Objects](/docs/the-compositor/objects/) — Browse, edit, and add objects
- [Use the Compositor](/docs/getting-started/compositor/) — Create a repository and enable GitHub Pages
