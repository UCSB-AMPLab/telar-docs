---
layout: docs
title: "Install and run Telar locally"
parent: 1. Getting Started
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/getting-started/local-dev/
---

# Install and run Telar locally

<span class="anchor-alias" id="step-by-step-workflow"></span>

<span class="anchor-alias" id="step-7-add-glossary-terms-optional"></span>

<span class="anchor-alias" id="step-5-find-coordinates-for-story-moments"></span>

<span class="anchor-alias" id="step-3-catalog-your-objects"></span>

<span class="anchor-alias" id="step-2-write-your-narrative-text"></span>

<span class="anchor-alias" id="step-1-gather-your-images"></span>

<span class="anchor-alias" id="overview"></span>

<span class="anchor-alias" id="next-steps"></span>

<span class="anchor-alias" id="local-development"></span>

<span class="anchor-alias" id="installation"></span>

<span class="anchor-alias" id="deploying-to-github-pages"></span>

<span class="anchor-alias" id="daily-development-workflow"></span>

<span class="anchor-alias" id="core-commands"></span>

<span class="anchor-alias" id="clone-and-setup"></span>

Build an exhibition from CSV and Markdown files on your computer. This route gives you control of the source files, build process and hosting. You can also preview a site whose content comes from Google Sheets.

## Prerequisites

The current Telar build uses Ruby 3.2, Python 3.12 and Node.js 22. Use Ruby 3.2 or newer within the 3.x series and Bundler. The template's dependency files are the authority for the version you are building.

Check the programs in the terminal:

```bash
ruby -v
bundle -v
python3 --version
node --version
npm --version
git --version
```

Install missing programs with the package manager or version manager you use on your operating system. On macOS, the system Ruby may be too old; check the version rather than assuming the preinstalled program is suitable.

## Get your own source copy

Create a repository from the [Telar template](https://github.com/UCSB-AMPLab/telar), then clone your repository. Replace the example address with your own:

```bash
git clone https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

You can also download a source archive if you do not plan to use Git. Keep a separate backup of your editable files.

<span class="anchor-alias" id="install-ruby-and-bundler"></span>
## Install dependencies

Use a Python virtual environment so the project's packages remain separate from other Python work:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
bundle install
npm ci
```

On Windows, activate with `.venv\Scripts\Activate.ps1` in PowerShell. Reopen and activate the same environment when returning to the project. If dependency installation fails, check the program versions before changing the lockfiles.

<span class="anchor-alias" id="configure-site-settings"></span>
For audio objects, install the system tool audiowaveform to prepare waveform data. Clip boundaries are applied in the browser; the audio-processing script does not extract separate clip files.

## Configure the site

Edit the author-facing section of `_config.yml`: title, description, author, language and theme. If editing CSV files directly, set:

```yaml
google_sheets:
  enabled: false
```

Keep the template's build settings below the author-facing section. For a site served at a domain root, `baseurl` is empty; for a project site it is the repository path.

<span class="anchor-alias" id="step-4-preview-your-objects"></span>
<span class="anchor-alias" id="step-6-build-your-story"></span>
## Build the first preview

From the repository root, with the environment active:

```bash
python3 scripts/build_local_site.py
```

The helper processes content, audio and IIIF tiles, bundles JavaScript and starts Jekyll on port 4001. Open the address with the configured base path, for example `http://127.0.0.1:4001/my-exhibition/`.

Stop the server with Ctrl+C. Use `--port 4003` if another site already uses 4001.

**Check your work:** the homepage and a sample object should load. Next, [edit the content files](/docs/local-authoring/content/).
