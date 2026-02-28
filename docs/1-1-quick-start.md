---
layout: docs
title: 1.1. Quick Start
parent: 1. Getting Started
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/getting-started/quick-start/
extra_css:
  - config-tools
tutorial_next:
  title: "Plan Your Narrative"
  url: /docs/getting-started/narrative-structure/
tutorial_hide_top: true
---

# Quick Start

Telar is a minimal-computing framework for creating interactive visual narrative exhibitions. It weaves together high-resolution images, narrative text, and layered contextual information into scrollytelling experiences — hosted for free on GitHub Pages.

This tutorial walks you through building your first exhibition in four steps:

1. **Set Up Your Site** — Set up your GitHub repository, Google Sheet, and configuration
2. **[Plan Your Narrative](/docs/getting-started/narrative-structure/)** — Understand how stories, steps, and panels fit together
3. **[Add Your Content](/docs/getting-started/add-content/)** — Upload images, fill in your spreadsheet, and create your first story
4. **[Review and Refine](/docs/getting-started/review-refine/)** — Set image coordinates, review your site, and polish

A Telar exhibition is made up of **stories** — step-by-step visual narratives built around high-resolution images. Each story unfolds through a series of **steps**. Every step zooms into a region of an image and presents a question with a brief answer. Viewers who want more can open **layer panels** — expandable sections with longer text, embedded media, or interactive widgets. We will see this in more detail when we get to Step 2: [Plan Your Narrative](/docs/getting-started/narrative-structure/). But first, we need to set up the basics.

# Step 1: Set up your site

In this first step, you'll set up three things: a GitHub repository for your site, a Google Sheets spreadsheet for your content, and a configuration file to connect them. You'll enter a few details as you go — your GitHub username, your spreadsheet link, a title for your site. At the end of this page, you'll download a ready-to-use configuration file.

You will need:
- A [GitHub account](https://github.com/join) (free)
- A [Google account](https://accounts.google.com/) for Google Sheets (free)

{: .tip }
> **Already familiar with GitHub Pages and YAML?** You can configure everything manually with the [Manual Setup guide](/docs/setup/manual/).

The setup might feel like a lot of steps, but you only have to do it once. After that, everything happens in your Google Sheets spreadsheet.

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

Enter your GitHub details below. These are used to build your site's web address and to generate your configuration file at the end.

<div class="gqs-field-group" id="gqs-repo-group">
  <div class="gqs-panel-title">Your GitHub Details</div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-username">GitHub username</label>
    <div class="cg-field">
      <input type="text" id="gqs-username" class="cg-input" placeholder="username">
      <div class="cg-error-msg" id="gqs-username-error"></div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-repo">Repository name</label>
    <div class="cg-field">
      <input type="text" id="gqs-repo" class="cg-input" placeholder="my-exhibition">
      <div class="cg-error-msg" id="gqs-repo-error"></div>
      <div class="cg-warn-msg" id="gqs-repo-warn"></div>
    </div>
  </div>
  <div class="gqs-url-preview-separator"></div>
  <div class="gqs-url-preview">
    <div class="gqs-url-preview-label">Your site will be at:</div>
    <div class="gqs-url-preview-value" id="gqs-url-preview" aria-live="polite">
      https://<span class="gqs-placeholder">username</span>.github.io/<span class="gqs-placeholder">my-exhibition</span>
    </div>
  </div>
</div>

## Enable GitHub Pages

GitHub Pages turns your repository into a live website for free.

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

![Setting up GitHub Pages with GitHub Actions](/images/github-actions.gif)

## Duplicate the Google Sheets Template

Your Google Sheets spreadsheet is where you manage all your content — objects, stories, and text.

1. Go to [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Click **File** → **Make a copy**
3. Save to your Google Drive with a name you will remember (e.g., "My Telar Exhibition")

## Share and Publish Your Sheet

Your spreadsheet needs two types of access so Telar can read your content.

**Share your sheet:**

1. Click the **Share** button in Google Sheets
2. Set access to "Anyone with the link" with **Viewer** permissions
3. Copy the shared URL and paste it below

**Publish your sheet:**

1. Go to **File** → **Share** → **Publish to web**
2. Click **Publish**
3. Copy the published URL and paste it below

<div class="gqs-field-group" id="gqs-sheets-group">
  <div class="gqs-panel-title">Your Google Sheets URLs</div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-shared-url">Shared URL</label>
    <div class="cg-field">
      <input type="text" id="gqs-shared-url" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing">
      <div class="cg-error-msg" id="gqs-shared-url-error"></div>
      <div class="cg-warn-msg" id="gqs-shared-url-warn"></div>
      <div class="cg-hint">The URL from the Share dialog (Viewer access)</div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-published-url">Published URL</label>
    <div class="cg-field">
      <input type="text" id="gqs-published-url" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/e/your-published-id/pubhtml">
      <div class="cg-error-msg" id="gqs-published-url-error"></div>
      <div class="cg-warn-msg" id="gqs-published-url-warn"></div>
      <div class="cg-hint">From File → Share → Publish to web. This is a different URL from the one above.</div>
    </div>
  </div>
</div>

## Generate Your Configuration

Fill in the remaining details and this page will create your configuration file.

<div class="gqs-field-group" id="gqs-site-group">
  <div class="gqs-panel-title">Site Details</div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-title">Title</label>
    <div class="cg-field">
      <input type="text" id="gqs-title" class="cg-input" placeholder="My Narrative Exhibition">
      <div class="cg-warn-msg" id="gqs-title-warn"></div>
      <div class="cg-hint">Your site's display name, shown in the browser tab and header</div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-description">Description <span class="cg-optional">(optional)</span></label>
    <div class="cg-field">
      <input type="text" id="gqs-description" class="cg-input" placeholder="A brief description of your exhibition">
      <div class="cg-hint">Used for search engine metadata and social sharing previews</div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-author">Author <span class="cg-optional">(optional)</span></label>
    <div class="cg-field">
      <input type="text" id="gqs-author" class="cg-input" placeholder="Your Name">
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-theme">Theme</label>
    <div class="cg-field">
      <select id="gqs-theme" class="cg-select">
        <option value="paisajes" selected>paisajes</option>
        <option value="neogranadina">neogranadina</option>
        <option value="santa-barbara">santa-barbara</option>
        <option value="austin">austin</option>
      </select>
      <div class="cg-hint">Controls your site's color scheme and visual style</div>
    </div>
  </div>
</div>

<div class="gqs-actions">
  <button id="gqs-generate" class="cg-button" type="button">Generate _config.yml</button>
</div>

<div id="gqs-output-wrapper" class="gqs-output-wrapper">
  <p class="gqs-output-heading">Your _config.yml</p>
  <div class="cv-editor">
    <div class="cv-lines" id="gqs-lines" aria-hidden="true">1</div>
    <textarea id="gqs-output" class="cv-textarea" readonly wrap="off"></textarea>
  </div>
</div>

<div class="gqs-actions" id="gqs-output-actions" style="display: none;">
  <button id="gqs-copy" class="cg-button" type="button">Copy</button>
  <button id="gqs-download" class="gqs-button--secondary" type="button">Download</button>
  <span id="gqs-copied" class="gqs-copied">Copied!</span>
</div>

Once generated:

1. In your GitHub repository, navigate to `_config.yml` and click the pencil icon to edit
2. Select all the existing content and replace it with what you copied or downloaded
3. Click **Commit changes** to save

## Verify Your Setup

After committing, GitHub Actions will automatically build and publish your site. This takes 2–5 minutes.

1. Click the **Actions** tab to watch the build progress
2. When it finishes, visit your site at the URL shown in the preview above
3. You should see a Telar site with your title and the default demo content

![Telar homepage with title and navigation menu](/images/telar-homepage.png)

{: .warning }
> **Build problems?** The most common issues are mismatched Google Sheets URLs (you need both the shared URL and the published URL — they are different). If your site does not appear at all, check the Actions tab for error details. You can also paste your `_config.yml` into the [Telar Config Validator](/docs/configure/config-validator/) to check for errors.

---

## Next Steps

Your Telar site is up and running. Follow this tutorial to learn how Telar stories work and add your own content, or jump ahead to any section:

- **[Plan Your Narrative](/docs/getting-started/narrative-structure/)** — Understand how stories, steps, and panels fit together
- **[Add Your Content](/docs/getting-started/add-content/)** — Upload images, fill in your spreadsheet, and create your first story
- **[Review and Refine](/docs/getting-started/review-refine/)** — Set image coordinates, review your site, and polish

<script>
(function() {
  'use strict';

  // --- DOM refs ---
  var usernameEl = document.getElementById('gqs-username');
  var repoEl = document.getElementById('gqs-repo');
  var urlPreview = document.getElementById('gqs-url-preview');

  var sharedUrlEl = document.getElementById('gqs-shared-url');
  var publishedUrlEl = document.getElementById('gqs-published-url');

  var titleEl = document.getElementById('gqs-title');
  var descriptionEl = document.getElementById('gqs-description');
  var authorEl = document.getElementById('gqs-author');
  var themeEl = document.getElementById('gqs-theme');

  var generateBtn = document.getElementById('gqs-generate');
  var copyBtn = document.getElementById('gqs-copy');
  var downloadBtn = document.getElementById('gqs-download');
  var copiedMsg = document.getElementById('gqs-copied');
  var outputWrapper = document.getElementById('gqs-output-wrapper');
  var outputActions = document.getElementById('gqs-output-actions');
  var outputEl = document.getElementById('gqs-output');
  var linesEl = document.getElementById('gqs-lines');

  // --- HTML escape helper ---
  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // --- URL preview ---
  function updateUrlPreview() {
    var username = usernameEl.value.trim();
    var repo = repoEl.value.trim();
    var html = 'https://';
    html += username
      ? '<span class="gqs-user-text">' + esc(username) + '</span>'
      : '<span class="gqs-placeholder">username</span>';
    html += '.github.io/';
    html += repo
      ? '<span class="gqs-user-text">' + esc(repo) + '</span>'
      : '<span class="gqs-placeholder">my-exhibition</span>';
    urlPreview.innerHTML = html;
  }

  usernameEl.addEventListener('input', updateUrlPreview);
  repoEl.addEventListener('input', updateUrlPreview);

  // --- Validation helpers ---
  function showError(id, msg) {
    var el = document.getElementById(id);
    if (el) el.classList.add('cg-input--error');
    var div = document.getElementById(id + '-error');
    if (div) { div.textContent = msg; div.classList.add('cg-visible'); }
  }

  function showWarn(id, msg) {
    var el = document.getElementById(id);
    if (el) el.classList.add('cg-input--warn');
    var div = document.getElementById(id + '-warn');
    if (div) { div.textContent = msg; div.classList.add('cg-visible'); }
  }

  function clearField(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('cg-input--error', 'cg-input--warn');
    var err = document.getElementById(id + '-error');
    if (err) { err.classList.remove('cg-visible'); err.textContent = ''; }
    var warn = document.getElementById(id + '-warn');
    if (warn) { warn.classList.remove('cg-visible'); warn.textContent = ''; }
  }

  // --- Per-field validators ---
  function validateUsername() {
    clearField('gqs-username');
    var val = usernameEl.value.trim();
    if (!val) { showError('gqs-username', 'Required \u2014 used to build your GitHub Pages URL'); return true; }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(val)) {
      showError('gqs-username', 'GitHub usernames can only contain letters, numbers, and hyphens, and cannot start with a hyphen');
      return true;
    }
    return false;
  }

  function validateRepo() {
    clearField('gqs-repo');
    var val = repoEl.value.trim();
    if (!val) { showError('gqs-repo', 'Required \u2014 used to build your GitHub Pages URL'); return true; }
    if (/\s/.test(val)) { showError('gqs-repo', 'Repository names cannot contain spaces \u2014 use hyphens instead'); return true; }
    if (!/^[a-zA-Z0-9._-]+$/.test(val)) { showError('gqs-repo', 'Repository names can only contain letters, numbers, hyphens, underscores, and periods'); return true; }
    if (/[A-Z]/.test(val)) { showWarn('gqs-repo', 'GitHub repository names are conventionally all lowercase'); }
    return false;
  }

  function validateSharedUrl() {
    clearField('gqs-shared-url');
    var val = sharedUrlEl.value.trim();
    if (!val) { showError('gqs-shared-url', 'Enter your Google Sheets shared URL'); return true; }
    if (!val.includes('docs.google.com/spreadsheets')) {
      showWarn('gqs-shared-url', "This doesn't look like a Google Sheets URL");
    } else if (/\/e\/.*\/pub/.test(val)) {
      showError('gqs-shared-url', 'This looks like a published URL, not a shared URL. The shared URL comes from the Share button and contains /edit');
      return true;
    }
    var pubVal = publishedUrlEl.value.trim();
    if (val && pubVal && val === pubVal) {
      showError('gqs-shared-url', 'This is the same as your published URL \u2014 the shared and published URLs are different');
      return true;
    }
    return false;
  }

  function validatePublishedUrl() {
    clearField('gqs-published-url');
    var val = publishedUrlEl.value.trim();
    if (!val) { showError('gqs-published-url', 'Enter your Google Sheets published URL'); return true; }
    if (!val.includes('docs.google.com/spreadsheets')) {
      showWarn('gqs-published-url', "This doesn't look like a Google Sheets URL");
    } else if (val.includes('/edit')) {
      showError('gqs-published-url', 'This looks like a shared/edit URL, not a published URL. Go to File \u2192 Share \u2192 Publish to web to get the published URL');
      return true;
    }
    var sharedVal = sharedUrlEl.value.trim();
    if (val && sharedVal && val === sharedVal) {
      showError('gqs-published-url', 'This is the same as your shared URL \u2014 the published URL is different. Go to File \u2192 Share \u2192 Publish to web to get it');
      return true;
    }
    return false;
  }

  function validateTitle() {
    clearField('gqs-title');
    if (!titleEl.value.trim()) {
      showError('gqs-title', 'Required \u2014 your site needs a title');
      return true;
    }
    return false;
  }

  // Wire blur validation + input clearing
  function wireField(el, validator) {
    el.addEventListener('input', function() { clearField(el.id); });
    el.addEventListener('blur', validator);
  }

  wireField(usernameEl, validateUsername);
  wireField(repoEl, validateRepo);
  wireField(sharedUrlEl, validateSharedUrl);
  wireField(publishedUrlEl, validatePublishedUrl);
  wireField(titleEl, validateTitle);

  // --- YAML quoting helper ---
  function q(v) {
    v = String(v || '');
    return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  // --- Generate ---
  generateBtn.addEventListener('click', function() {
    var hasErrors = false;
    if (validateTitle()) hasErrors = true;
    if (validateUsername()) hasErrors = true;
    if (validateRepo()) hasErrors = true;
    if (validateSharedUrl()) hasErrors = true;
    if (validatePublishedUrl()) hasErrors = true;

    if (hasErrors) {
      var firstError = document.querySelector('.cg-error-msg.cg-visible');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var username = usernameEl.value.trim();
    var repo = repoEl.value.trim();

    var output = document.getElementById('gqs-template').textContent;
    output = output.replace('__TITLE__', q(titleEl.value.trim()));
    output = output.replace('__DESCRIPTION__', q(descriptionEl.value.trim()));
    output = output.replace('__URL__', q('https://' + username + '.github.io'));
    output = output.replace('__BASEURL__', q('/' + repo));
    output = output.replace('__AUTHOR__', q(authorEl.value.trim()));
    output = output.replace('__THEME__', q(themeEl.value));
    output = output.replace('__GSHEETS_SHARED__', q(sharedUrlEl.value.trim()));
    output = output.replace('__GSHEETS_PUBLISHED__', q(publishedUrlEl.value.trim()));
    output = output.replace(/^\n/, '');

    outputEl.value = output;

    var lineCount = output.split('\n').length;
    var lineNums = '';
    for (var i = 1; i <= lineCount; i++) { lineNums += i + '\n'; }
    linesEl.textContent = lineNums;

    outputWrapper.classList.add('gqs-visible');
    outputActions.style.display = 'flex';
    generateBtn.textContent = 'Regenerate';

    outputWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // --- Scroll sync ---
  outputEl.addEventListener('scroll', function() {
    linesEl.scrollTop = outputEl.scrollTop;
  });

  // --- Copy ---
  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(outputEl.value).then(function() {
      copiedMsg.classList.add('gqs-show');
      setTimeout(function() { copiedMsg.classList.remove('gqs-show'); }, 1500);
    });
  });

  // --- Download ---
  downloadBtn.addEventListener('click', function() {
    var blob = new Blob([outputEl.value], { type: 'text/yaml' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '_config.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

})();
</script>

<script type="text/template" id="gqs-template">
# Telar - Digital Storytelling Framework
# https://telar.org

# Site Settings
title: __TITLE__
description: __DESCRIPTION__
url: __URL__
baseurl: __BASEURL__
author: __AUTHOR__
telar_theme: __THEME__ # Options: paisajes, neogranadina, santa-barbara, austin, or custom
logo: ""
telar_language: "en"

# Google Sheets Integration
# See https://telar.org/docs/your-data/google-sheets/ for detailed setup instructions.
google_sheets:
  enabled: true
  shared_url: __GSHEETS_SHARED__
  published_url: __GSHEETS_PUBLISHED__

# Story Interface Settings
story_interface:
  show_on_homepage: true
  show_story_steps: true
  show_object_credits: true
  include_demo_content: true # Turn off for production sites

# Collection Interface Settings
collection_interface:
  browse_and_search: true
  show_link_on_homepage: true
  show_sample_on_homepage: true
  featured_count: 4

# Story Protection (optional)
# story_key: ""

#
#
#
# PLEASE DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
#
#
#

# Collections
collections:
  stories:
    output: true
    permalink: /stories/:name/
  objects:
    output: true
    permalink: /objects/:name/
  glossary:
    output: true
    permalink: /glossary/:name/
  pages:
    output: true
    permalink: /:name/

# Collections Directory
collections_dir: _jekyll-files

# Build Settings
markdown: kramdown
permalink: pretty
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - .github
  - README.md
  - docs/
  - scripts/

# Defaults
defaults:
  - scope:
      path: ""
      type: "stories"
    values:
      layout: "story"
  - scope:
      path: ""
      type: "objects"
    values:
      layout: "object"
  - scope:
      path: ""
      type: "glossary"
    values:
      layout: "glossary"
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "user-page"

# Tell Jekyll not to expect dates for these collections
future: true
show_drafts: false

# Telar Settings (version information)
telar:
  version: "0.8.0-beta"
  release_date: "2026-02-05"

# Plugins
plugins:
  - jekyll-seo-tag

# WEBrick server configuration for development (enables CORS for IIIF)
webrick:
  headers:
    Access-Control-Allow-Origin: "*"
    Access-Control-Allow-Methods: "GET, POST, OPTIONS"
    Access-Control-Allow-Headers: "Content-Type"

# Development & Testing
development-features:
  christmas_tree_mode: false
  viewer_preloading:
    max_viewer_cards: 10
    preload_steps: 6
    loading_threshold: 5
    min_ready_viewers: 3
  skip_stories: false
  skip_collections: false
</script>
