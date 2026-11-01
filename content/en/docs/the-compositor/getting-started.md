---
title: Connect an existing site
url: /docs/the-compositor/getting-started/
translationKey: docs-the-compositor-getting-started
type: guide
docs_section: compositor
---

<span class="anchor-alias" id="getting-started-with-the-compositor" aria-hidden="true"></span>

# Connect an existing site {#connect-an-existing-site}

Use this guide when your Telar repository already exists. To start a new project, follow [Create your first site](/docs/getting-started/compositor/).

## Prerequisites {#prerequisites}

Before you begin, make sure you have:

- A **GitHub account** — [sign up for free](https://github.com/join) if you don't have one
- A **Telar repository** — create one from the [Telar template](https://github.com/UCSB-AMPLab/telar) (see [Use the Compositor](/docs/getting-started/compositor/) for step-by-step instructions)
- **GitHub Pages enabled** — in your repository settings, set the Pages source to **GitHub Actions**

## Sign in {#sign-in}

The Compositor uses your GitHub account for authentication and publishing. No separate account is needed.

1. Go to [compositor.telar.org](https://compositor.telar.org)
2. Click **Sign in with GitHub**
3. Authorize the Telar Compositor when GitHub prompts you

## Install the GitHub App {#install-the-github-app}

On your first sign-in, the Compositor asks you to install the Telar GitHub App. This app gives the Compositor permission to read and write to your repositories.

1. When prompted, click **Install**
2. Choose whether to grant access to all repositories or only specific ones
3. Confirm the installation

{{< callout "tip" >}}
If you only want the Compositor to access one repository, select **Only select repositories** and choose it from the list. You can change this later in your GitHub settings under **Applications**.
{{< /callout >}}

## Connect a repository {#connect-a-repository}

After signing in, you select which repository to work with.

1. The Compositor shows a list of your GitHub repositories that have the Telar GitHub App installed
2. Select the repository you want to edit
3. The Compositor scans the repository to detect Telar content files

If the repository was created from the Telar template and has content in `telar-content/`, the Compositor imports it automatically.

## Import from Google Sheets {#import-from-google-sheets}

If the site uses Google Sheets, follow the import and settings checks shown by the Compositor. Review the content that is imported and any request to switch off the Sheets connection before proceeding with visual authoring.

Your spreadsheet is not deleted by importing it. Decide which authoring method will manage future changes; do not assume edits in the Compositor automatically update the original sheet.

## After import {#after-import}

After import and the setup checks, use the [main navigation](/docs/the-compositor/dashboard/) to:

- View and manage your stories
- Browse and edit your objects
- Start building new content

Your imported content is saved on the server. Changes you make are not sent to GitHub until you publish — so you can explore and experiment freely.

## See also {#see-also}

- [Start and navigation](/docs/the-compositor/dashboard/) — Navigate your project and manage stories
- [Objects](/docs/the-compositor/objects/) — Browse, edit, and add objects
- [Use the Compositor](/docs/getting-started/compositor/) — Create a repository and enable GitHub Pages
