---
layout: docs
title: 6.6. Config Generator
parent: 6. Reference
grand_parent: Documentation
nav_order: 6
lang: en
permalink: /docs/reference/config-generator/
extra_css:
  - config-tools
---

# Config Generator

Fill in your site details to generate a ready-to-use `_config.yml` file for your Telar site. Your configuration is never sent to any server — everything runs in your browser.

<div class="cg-container">

  <!-- 1. Site Settings -->
  <div class="cg-section">
    <h3>Site Settings</h3>
    <p class="cg-section-desc">Basic site information and appearance. These are the most important settings for your site.</p>

    <div class="cg-row">
      <label class="cg-label" for="cg-title">Title</label>
      <div class="cg-field">
        <input type="text" id="cg-title" class="cg-input" placeholder="My Narrative Exhibition">
        <div class="cg-warn-msg" id="cg-title-warn"></div>
        <div class="cg-hint">Your site's display name, shown in the browser tab and navigation header</div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-description">Description <span class="cg-optional">(optional)</span></label>
      <div class="cg-field">
        <textarea id="cg-description" class="cg-textarea-input" rows="2" placeholder="A brief description of your exhibition"></textarea>
        <div class="cg-hint">Used for search engine metadata and social sharing previews</div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-author">Author <span class="cg-optional">(optional)</span></label>
      <div class="cg-field">
        <input type="text" id="cg-author" class="cg-input" placeholder="Your Name">
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-email">Email <span class="cg-optional">(optional)</span></label>
      <div class="cg-field">
        <input type="text" id="cg-email" class="cg-input" placeholder="you@example.com">
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-theme">Theme</label>
      <div class="cg-field">
        <select id="cg-theme" class="cg-select">
          <option value="paisajes" selected>paisajes</option>
          <option value="neogranadina">neogranadina</option>
          <option value="santa-barbara">santa-barbara</option>
          <option value="austin">austin</option>
        </select>
        <div class="cg-hint">Controls your site's color scheme and visual style</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-logo-toggle">
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-logo-toggle">Use an image as logo</label>
        <div class="cg-toggle-hint cg-hint">When off, the site title is displayed as text in the navigation header</div>
      </div>
    </div>
    <div id="cg-logo-fields" class="cg-optional-fields">
      <div class="cg-row">
        <label class="cg-label" for="cg-logo-path">Logo path</label>
        <div class="cg-field">
          <input type="text" id="cg-logo-path" class="cg-input" placeholder="components/images/logo.png">
          <div class="cg-hint">Place your logo in <code>components/images/</code>. Recommended: max 80px tall, 200–300px wide, PNG/JPG/SVG</div>
        </div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-language">Language</label>
      <div class="cg-field">
        <select id="cg-language" class="cg-select">
          <option value="en" selected>English (en)</option>
          <option value="es">Español (es)</option>
        </select>
        <div class="cg-hint">Controls all interface elements: navigation, buttons, labels, error messages. Your content stays in whatever language you write it in.</div>
      </div>
    </div>
  </div>

  <!-- 2. Hosting -->
  <div class="cg-section">
    <h3>Hosting</h3>
    <p class="cg-section-desc">Telar is designed to work with GitHub Pages — most users just need their username and repository name.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-ghpages" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-ghpages">Host on GitHub Pages</label>
        <div class="cg-toggle-hint cg-hint">If you are not using GitHub Pages, turn this off to enter your URL manually.</div>
      </div>
    </div>

    <div id="cg-ghpages-fields" class="cg-optional-fields cg-visible">
      <div class="cg-row">
        <label class="cg-label" for="cg-gh-username">GitHub username</label>
        <div class="cg-field">
          <input type="text" id="cg-gh-username" class="cg-input" placeholder="username">
          <div class="cg-error-msg" id="cg-gh-username-error"></div>
        </div>
      </div>
      <div class="cg-row">
        <label class="cg-label" for="cg-gh-repo">Repository name</label>
        <div class="cg-field">
          <input type="text" id="cg-gh-repo" class="cg-input" placeholder="my-exhibition">
          <div class="cg-error-msg" id="cg-gh-repo-error"></div>
          <div class="cg-warn-msg" id="cg-gh-repo-warn"></div>
        </div>
      </div>

      <div class="cg-toggle-row">
        <label class="cg-toggle">
          <input type="checkbox" id="cg-custom-domain">
          <span class="cg-track"></span>
        </label>
        <div class="cg-toggle-info">
          <label class="cg-toggle-label" for="cg-custom-domain">Custom domain</label>
          <div class="cg-toggle-hint cg-hint">Do you have a custom domain configured with GitHub Pages? <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site" target="_blank" rel="noopener">Learn how to set one up</a></div>
        </div>
      </div>

      <div id="cg-custom-domain-fields" class="cg-optional-fields">
        <div class="cg-row">
          <label class="cg-label" for="cg-domain-url">Domain URL</label>
          <div class="cg-field">
            <input type="text" id="cg-domain-url" class="cg-input" placeholder="https://myname.org">
            <div class="cg-error-msg" id="cg-domain-url-error"></div>
            <div class="cg-warn-msg" id="cg-domain-url-warn"></div>
          </div>
        </div>
        <div class="cg-toggle-row">
          <label class="cg-toggle">
            <input type="checkbox" id="cg-root-domain">
            <span class="cg-track"></span>
          </label>
          <div class="cg-toggle-info">
            <label class="cg-toggle-label" for="cg-root-domain">Serve on root domain</label>
            <div class="cg-toggle-hint cg-hint">When on, your site serves at the root of your domain. When off, it serves at domain.com/repo-name.</div>
          </div>
        </div>
      </div>
    </div>

    <div id="cg-manual-fields" class="cg-optional-fields">
      <div class="cg-row">
        <label class="cg-label" for="cg-manual-url">URL</label>
        <div class="cg-field">
          <input type="text" id="cg-manual-url" class="cg-input" placeholder="https://mysite.org">
          <div class="cg-error-msg" id="cg-manual-url-error"></div>
          <div class="cg-hint">Your site's base domain</div>
        </div>
      </div>
      <div class="cg-row">
        <label class="cg-label" for="cg-manual-baseurl">Baseurl</label>
        <div class="cg-field">
          <input type="text" id="cg-manual-baseurl" class="cg-input" placeholder="/my-site">
          <div class="cg-hint">Path after domain. Leave empty to serve at the root.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. Google Sheets Integration -->
  <div class="cg-section">
    <h3>Google Sheets Integration</h3>
    <p class="cg-section-desc">Manage your content via Google Sheets instead of editing CSV files directly. Telar fetches your data automatically during each build.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-gsheets-toggle" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-gsheets-toggle">Enable Google Sheets</label>
        <div class="cg-toggle-hint cg-hint">When off, Telar uses CSV files from your repository instead — make sure you have them in <code>components/structures/</code></div>
      </div>
    </div>

    <div id="cg-gsheets-fields" class="cg-optional-fields cg-visible">
      <div class="cg-row">
        <label class="cg-label" for="cg-gsheets-shared">Shared URL</label>
        <div class="cg-field">
          <input type="text" id="cg-gsheets-shared" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing">
          <div class="cg-error-msg" id="cg-gsheets-shared-error"></div>
          <div class="cg-warn-msg" id="cg-gsheets-shared-warn"></div>
          <div class="cg-hint">Share your Google Sheet with "Anyone with the link" (Viewer access)</div>
        </div>
      </div>
      <div class="cg-row">
        <label class="cg-label" for="cg-gsheets-published">Published URL</label>
        <div class="cg-field">
          <input type="text" id="cg-gsheets-published" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/e/your-published-id/pubhtml">
          <div class="cg-error-msg" id="cg-gsheets-published-error"></div>
          <div class="cg-warn-msg" id="cg-gsheets-published-warn"></div>
          <div class="cg-hint">From File → Share → Publish to web. Both URLs are required.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Story Interface -->
  <div class="cg-section">
    <h3>Story Interface</h3>
    <p class="cg-section-desc">Control how stories display and behave on your site. These settings affect the story viewer and homepage presentation.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-on-homepage" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-on-homepage">Show stories on the homepage</label>
        <div class="cg-toggle-hint cg-hint">When on, story cards appear on the homepage. Stories are still accessible via navigation when off.</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-story-steps" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-story-steps">Show step indicators in stories</label>
        <div class="cg-toggle-hint cg-hint">Displays "Step 1", "Step 2", etc. as you scroll through a story. Purely visual.</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-object-credits" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-object-credits">Show object credits</label>
        <div class="cg-toggle-hint cg-hint">Displays a dismissable credit badge in the bottom-left corner of story viewers. Credit information still appears in the metadata table either way.</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-include-demo-content" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-include-demo-content">Include demo content</label>
        <div class="cg-toggle-hint cg-hint">Fetches tutorial stories from the Telar content server. These show a "Demo" badge and help new users explore the interface. Turn off for production sites.</div>
      </div>
    </div>
  </div>

  <!-- 5. Collection Interface -->
  <div class="cg-section">
    <h3>Collection Interface</h3>
    <p class="cg-section-desc">Control how the objects gallery displays and behaves, including filtering, search, and homepage presentation.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-browse-and-search" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-browse-and-search">Show the full browse and search interface</label>
        <div class="cg-toggle-hint cg-hint">Enables the filter sidebar with facets on the objects page</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-link-on-homepage" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-link-on-homepage">Show link to objects on homepage</label>
        <div class="cg-toggle-hint cg-hint">Displays a "View the objects" link on the homepage</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-sample-on-homepage" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-sample-on-homepage">Show a sample of your objects on the homepage</label>
        <div class="cg-toggle-hint cg-hint">Displays objects marked as featured in your objects.csv on the homepage</div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-featured-count">Featured count</label>
      <div class="cg-field">
        <input type="number" id="cg-featured-count" class="cg-input cg-input--number" value="4" min="1">
        <div class="cg-hint">Number of objects to show in the homepage sample</div>
      </div>
    </div>
  </div>

  <!-- 6. Private Stories -->
  <div class="cg-section">
    <h3>Private Stories</h3>
    <p class="cg-section-desc">Encrypt stories so only viewers with the correct key can access them. Stories with <code>private: yes</code> in your project.csv (or Google Sheets Project tab) will be encrypted during build.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-protection-toggle">
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-protection-toggle">Enable private stories</label>
        <div class="cg-toggle-hint cg-hint">Uses client-side encryption. Prevents casual access but is not suitable for highly sensitive content.</div>
      </div>
    </div>

    <div id="cg-protection-fields" class="cg-optional-fields">
      <div class="cg-row">
        <label class="cg-label" for="cg-secret-key">Secret key</label>
        <div class="cg-field">
          <input type="text" id="cg-secret-key" class="cg-input" placeholder="your-secret-key">
          <div class="cg-error-msg" id="cg-secret-key-error"></div>
          <div class="cg-warn-msg" id="cg-secret-key-warn"></div>
          <div class="cg-hint">Viewers access protected stories via <code>?key=your-secret-key</code></div>
        </div>
      </div>
    </div>
  </div>

  <!-- 7. Actions -->
  <div class="cg-actions">
    <button id="cg-generate" class="cg-button" type="button">Generate</button>
    <button id="cg-copy" class="cg-button" type="button" style="display: none;">Copy</button>
    <span id="cg-copied" class="cg-copied">Copied!</span>
  </div>

  <!-- 8. Output -->
  <div id="cg-output-wrapper" class="cg-output-wrapper">
    <p class="cg-output-heading">Generated _config.yml</p>
    <div class="cv-editor">
      <div class="cv-lines" id="cg-lines" aria-hidden="true">1</div>
      <textarea id="cg-output" class="cv-textarea" readonly wrap="off"></textarea>
    </div>
  </div>

</div>

<script type="text/template" id="cg-template">
# Telar - Digital Storytelling Framework
# https://telar.org

# Site Settings
title: __TITLE__
description: __DESCRIPTION__
url: __URL__
baseurl: __BASEURL__
author: __AUTHOR__
email: __EMAIL__
telar_theme: __THEME__ # Options: paisajes, neogranadina, santa-barbara, austin, or custom
logo: __LOGO__ # Path to logo image (optional, max 80px tall, 200-300px wide recommended)
telar_language: __LANGUAGE__ # Options: "en" (English), "es" (Español)

# Google Sheets Integration (optional)
# Manage content via Google Sheets instead of editing CSV files directly.
# See https://telar.org/docs/reference/google-sheets/ for detailed setup instructions.
#
# Setup:
# 1. Get the template: Duplicate our template at https://bit.ly/telar-template
# 2. Share your sheet: Anyone with the link (Viewer access)
# 3. Publish your sheet: File > Share > Publish to web
# 4. Paste both URLs below
# 5. Set enabled: true
# 6. Commit changes
#    - If using GitHub Pages: GitHub Actions will automatically discover tab GIDs and fetch CSVs
#    - If running locally: Run `python3 scripts/fetch_google_sheets.py` before building
google_sheets:
  enabled: %%GSHEETS_ENABLED%%
  shared_url: __GSHEETS_SHARED__
  published_url: __GSHEETS_PUBLISHED__

# Story Interface Settings
story_interface:
  show_on_homepage: %%SHOW_ON_HOMEPAGE%% # Set to false to hide stories section from homepage (stories still accessible via direct URL)
  show_story_steps: %%SHOW_STORY_STEPS%% # Set to false to hide "Step X" overlay in stories
  show_object_credits: %%SHOW_OBJECT_CREDITS%% # Set to true to display object credits badge (bottom-left corner, dismissable)
  include_demo_content: %%INCLUDE_DEMO_CONTENT%% # Fetch demo stories from content.telar.org. Switch this off to hide demo stories and their content.

# Collection Interface Settings
collection_interface:
  browse_and_search: %%BROWSE_AND_SEARCH%% # Set to false to disable filtering sidebar and search on objects page
  show_link_on_homepage: %%SHOW_LINK_ON_HOMEPAGE%% # Set to false to hide "View the objects" link from homepage
  show_sample_on_homepage: %%SHOW_SAMPLE_ON_HOMEPAGE%% # Set to true to show a sample of objects on homepage
  featured_count: %%FEATURED_COUNT%% # Number of objects to show on homepage (default 4)

# Story Protection (optional)
# Stories with private=yes in project.csv will be encrypted.
# Viewers need this key to unlock protected stories.
%%STORY_KEY_LINE%%

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

# Collections Directory (a folder where Jekyll and the Telar scripts will put all auto-generated object and story working files)
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
# Set to false or remove for production use
development-features:
  # Christmas Tree Mode - Displays all warning messages for testing multilingual support
  # Set to true to light up the site with test warnings (test objects, fake errors, etc.)
  christmas_tree_mode: false

  # Viewer preloading configuration
  # Controls how story viewers are preloaded for smoother navigation.
  # Higher values = smoother scrolling but more memory usage.
  # Lower values = less memory but may show loading shimmer during navigation.
  # These defaults work well for most sites. Only adjust if experiencing issues.
  viewer_preloading:
    max_viewer_cards: 10    # Max viewers in memory. Higher = smoother, more memory. (default: 10, max: 15)
    preload_steps: 6        # Steps to preload ahead. Higher = smoother, more memory. (default: 6)
    loading_threshold: 5    # Show shimmer on intro if story has >= N viewers. (default: 5)
    min_ready_viewers: 3    # Hide shimmer when N viewers ready. (default: 3)

  # Skip stories - skips story generation entirely
  # Objects remain visible and accessible
  # (Backward compatible: hide_stories also supported)
  skip_stories: false

  # Skip collections - skips both object AND story generation
  # Use this when building a site with only custom pages (no stories or objects)
  # (Backward compatible: hide_collections also supported)
  skip_collections: false
</script>

<script>
(function() {
  'use strict';

  // --- DOM references ---
  var generateBtn = document.getElementById('cg-generate');
  var copyBtn = document.getElementById('cg-copy');
  var copiedMsg = document.getElementById('cg-copied');
  var outputWrapper = document.getElementById('cg-output-wrapper');
  var outputEl = document.getElementById('cg-output');
  var linesEl = document.getElementById('cg-lines');
  var templateEl = document.getElementById('cg-template');

  // --- Toggle wiring ---
  function wireToggle(toggleId, fieldsId, invert) {
    var toggle = document.getElementById(toggleId);
    var fields = document.getElementById(fieldsId);
    if (!toggle || !fields) return;
    toggle.addEventListener('change', function() {
      var show = invert ? !toggle.checked : toggle.checked;
      if (show) {
        fields.classList.add('cg-visible');
      } else {
        fields.classList.remove('cg-visible');
      }
    });
  }

  wireToggle('cg-logo-toggle', 'cg-logo-fields');
  wireToggle('cg-custom-domain', 'cg-custom-domain-fields');
  wireToggle('cg-gsheets-toggle', 'cg-gsheets-fields');
  wireToggle('cg-protection-toggle', 'cg-protection-fields');

  // GitHub Pages toggle — shows/hides two panels
  var ghPagesToggle = document.getElementById('cg-ghpages');
  var ghPagesFields = document.getElementById('cg-ghpages-fields');
  var manualFields = document.getElementById('cg-manual-fields');

  ghPagesToggle.addEventListener('change', function() {
    if (ghPagesToggle.checked) {
      ghPagesFields.classList.add('cg-visible');
      manualFields.classList.remove('cg-visible');
    } else {
      ghPagesFields.classList.remove('cg-visible');
      manualFields.classList.add('cg-visible');
    }
  });

  // --- Validation helpers ---
  function clearAllValidation() {
    document.querySelectorAll('.cg-error-msg, .cg-warn-msg').forEach(function(el) {
      el.classList.remove('cg-visible');
      el.textContent = '';
    });
    document.querySelectorAll('[class*="cg-input--"], [class*="cg-textarea-input--"]').forEach(function(el) {
      el.classList.remove('cg-input--error', 'cg-input--warn', 'cg-textarea-input--error', 'cg-textarea-input--warn');
    });
  }

  function showError(id, msg) {
    var el = document.getElementById(id);
    if (el) el.classList.add(el.tagName === 'TEXTAREA' ? 'cg-textarea-input--error' : 'cg-input--error');
    var div = document.getElementById(id + '-error');
    if (div) { div.textContent = msg; div.classList.add('cg-visible'); }
  }

  function showWarn(id, msg) {
    var el = document.getElementById(id);
    if (el) el.classList.add(el.tagName === 'TEXTAREA' ? 'cg-textarea-input--warn' : 'cg-input--warn');
    var div = document.getElementById(id + '-warn');
    if (div) { div.textContent = msg; div.classList.add('cg-visible'); }
  }

  function clearField(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('cg-input--error', 'cg-input--warn', 'cg-textarea-input--error', 'cg-textarea-input--warn');
    var err = document.getElementById(id + '-error');
    if (err) { err.classList.remove('cg-visible'); err.textContent = ''; }
    var warn = document.getElementById(id + '-warn');
    if (warn) { warn.classList.remove('cg-visible'); warn.textContent = ''; }
  }

  // --- Per-field validators ---
  function validateTitle() {
    clearField('cg-title');
    if (!document.getElementById('cg-title').value.trim()) {
      showWarn('cg-title', 'Your site title will appear blank — you can always add one later');
    }
    return false;
  }

  function validateUsername() {
    clearField('cg-gh-username');
    if (!ghPagesToggle.checked) return false;
    var username = document.getElementById('cg-gh-username').value.trim();
    if (!username) {
      showError('cg-gh-username', 'Required — used to build your GitHub Pages URL');
      return true;
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(username)) {
      showError('cg-gh-username', 'GitHub usernames can only contain letters, numbers, and hyphens, and cannot start with a hyphen');
      return true;
    }
    return false;
  }

  function validateRepo() {
    clearField('cg-gh-repo');
    if (!ghPagesToggle.checked) return false;
    var repo = document.getElementById('cg-gh-repo').value.trim();
    if (!repo) {
      showError('cg-gh-repo', 'Required — used to build your GitHub Pages URL');
      return true;
    }
    if (/\s/.test(repo)) {
      showError('cg-gh-repo', 'Repository names cannot contain spaces — use hyphens instead (e.g. my-exhibition)');
      return true;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(repo)) {
      showError('cg-gh-repo', 'Repository names can only contain letters, numbers, hyphens, underscores, and periods');
      return true;
    }
    if (/[A-Z]/.test(repo)) {
      showWarn('cg-gh-repo', 'GitHub repository names are case-sensitive and conventionally all lowercase — consider revising');
    }
    return false;
  }

  function validateDomain() {
    clearField('cg-domain-url');
    if (!ghPagesToggle.checked || !document.getElementById('cg-custom-domain').checked) return false;
    var domain = document.getElementById('cg-domain-url').value.trim();
    if (!domain) {
      showError('cg-domain-url', 'Enter your custom domain URL');
      return true;
    }
    if (!/^https?:\/\/.+/.test(domain)) {
      showError('cg-domain-url', 'Should start with https:// (e.g. https://myname.org)');
      return true;
    }
    if (/^http:\/\//.test(domain)) {
      showWarn('cg-domain-url', 'Consider using https:// — GitHub Pages supports HTTPS for custom domains');
    }
    return false;
  }

  function validateManualUrl() {
    clearField('cg-manual-url');
    if (ghPagesToggle.checked) return false;
    var manualUrl = document.getElementById('cg-manual-url').value.trim();
    if (!manualUrl) {
      showError('cg-manual-url', 'Enter your site URL');
      return true;
    }
    if (!/^https?:\/\/.+/.test(manualUrl)) {
      showError('cg-manual-url', 'Should start with https:// or http:// (e.g. https://mysite.org)');
      return true;
    }
    return false;
  }

  function validateSheetsShared() {
    clearField('cg-gsheets-shared');
    if (!document.getElementById('cg-gsheets-toggle').checked) return false;
    var sharedUrl = document.getElementById('cg-gsheets-shared').value.trim();
    if (!sharedUrl) {
      showError('cg-gsheets-shared', 'Enter your Google Sheets shared URL');
      return true;
    }
    if (!sharedUrl.includes('docs.google.com/spreadsheets')) {
      showWarn('cg-gsheets-shared', "This doesn't look like a Google Sheets URL — make sure you're sharing from Google Sheets");
    }
    return false;
  }

  function validateSheetsPublished() {
    clearField('cg-gsheets-published');
    if (!document.getElementById('cg-gsheets-toggle').checked) return false;
    var publishedUrl = document.getElementById('cg-gsheets-published').value.trim();
    if (!publishedUrl) {
      showError('cg-gsheets-published', 'Enter your Google Sheets published URL');
      return true;
    }
    if (!publishedUrl.includes('docs.google.com/spreadsheets')) {
      showWarn('cg-gsheets-published', "This doesn't look like a Google Sheets published URL — get this from File → Share → Publish to web");
    }
    return false;
  }

  function validateSecretKey() {
    clearField('cg-secret-key');
    if (!document.getElementById('cg-protection-toggle').checked) return false;
    var secretKey = document.getElementById('cg-secret-key').value.trim();
    if (!secretKey) {
      showError('cg-secret-key', 'Enter a secret key for private stories');
      return true;
    }
    if (secretKey.length < 8) {
      showWarn('cg-secret-key', 'Short keys are easier to guess — consider using a longer, more random key');
    }
    return false;
  }

  function validateAll() {
    validateTitle();
    var hasErrors = false;
    if (validateUsername())      hasErrors = true;
    if (validateRepo())          hasErrors = true;
    if (validateDomain())        hasErrors = true;
    if (validateManualUrl())     hasErrors = true;
    if (validateSheetsShared())  hasErrors = true;
    if (validateSheetsPublished()) hasErrors = true;
    if (validateSecretKey())     hasErrors = true;
    return hasErrors;
  }

  // Per-field: clear on input, validate on blur
  function wireField(id, validator) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function() { clearField(id); });
    el.addEventListener('blur', validator);
  }

  wireField('cg-title',             validateTitle);
  wireField('cg-gh-username',       validateUsername);
  wireField('cg-gh-repo',           validateRepo);
  wireField('cg-domain-url',        validateDomain);
  wireField('cg-manual-url',        validateManualUrl);
  wireField('cg-gsheets-shared',    validateSheetsShared);
  wireField('cg-gsheets-published', validateSheetsPublished);
  wireField('cg-secret-key',        validateSecretKey);

  // --- Helper: quote a value for YAML ---
  function q(v) {
    if (v === undefined || v === null) v = '';
    v = String(v);
    return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  // --- Generate ---
  generateBtn.addEventListener('click', function() {
    // Validate — errors block generation, warnings allow it
    var hasErrors = validateAll();
    if (hasErrors) {
      var firstError = document.querySelector('.cg-error-msg.cg-visible');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Compute URL and baseurl
    var url = '';
    var baseurl = '';

    if (ghPagesToggle.checked) {
      var username = document.getElementById('cg-gh-username').value.trim();
      var repo = document.getElementById('cg-gh-repo').value.trim();
      var customDomain = document.getElementById('cg-custom-domain').checked;

      if (customDomain) {
        var domainUrl = document.getElementById('cg-domain-url').value.trim();
        var rootDomain = document.getElementById('cg-root-domain').checked;
        url = domainUrl;
        baseurl = rootDomain ? '' : ('/' + repo);
      } else {
        url = 'https://' + username + '.github.io';
        baseurl = '/' + repo;
      }
    } else {
      url = document.getElementById('cg-manual-url').value.trim();
      baseurl = document.getElementById('cg-manual-baseurl').value.trim();
    }

    // Gather values
    var title = document.getElementById('cg-title').value.trim();
    var description = document.getElementById('cg-description').value.trim();
    var author = document.getElementById('cg-author').value.trim();
    var email = document.getElementById('cg-email').value.trim();
    var theme = document.getElementById('cg-theme').value;
    var language = document.getElementById('cg-language').value;

    var logoOn = document.getElementById('cg-logo-toggle').checked;
    var logoPath = logoOn ? document.getElementById('cg-logo-path').value.trim() : '';

    var gsheetsOn = document.getElementById('cg-gsheets-toggle').checked;
    var gsheetsShared = gsheetsOn ? document.getElementById('cg-gsheets-shared').value.trim() : '';
    var gsheetsPublished = gsheetsOn ? document.getElementById('cg-gsheets-published').value.trim() : '';

    var showOnHomepage = document.getElementById('cg-show-on-homepage').checked;
    var showStorySteps = document.getElementById('cg-show-story-steps').checked;
    var showObjectCredits = document.getElementById('cg-show-object-credits').checked;
    var includeDemoContent = document.getElementById('cg-include-demo-content').checked;

    var browseAndSearch = document.getElementById('cg-browse-and-search').checked;
    var showLinkOnHomepage = document.getElementById('cg-show-link-on-homepage').checked;
    var showSampleOnHomepage = document.getElementById('cg-show-sample-on-homepage').checked;
    var featuredCount = document.getElementById('cg-featured-count').value;

    var protectionOn = document.getElementById('cg-protection-toggle').checked;
    var secretKey = protectionOn ? document.getElementById('cg-secret-key').value.trim() : '';

    // Story key line
    var storyKeyLine;
    if (protectionOn && secretKey) {
      storyKeyLine = 'story_key: ' + q(secretKey);
    } else if (protectionOn) {
      storyKeyLine = '# story_key: "your-secret-key"';
    } else {
      storyKeyLine = '# story_key: ""';
    }

    // Build output from template
    var output = templateEl.textContent;

    // String replacements
    output = output.replace('__TITLE__', q(title));
    output = output.replace('__DESCRIPTION__', q(description));
    output = output.replace('__URL__', q(url));
    output = output.replace('__BASEURL__', q(baseurl));
    output = output.replace('__AUTHOR__', q(author));
    output = output.replace('__EMAIL__', q(email));
    output = output.replace('__THEME__', q(theme));
    output = output.replace('__LOGO__', q(logoPath));
    output = output.replace('__LANGUAGE__', q(language));
    output = output.replace('__GSHEETS_SHARED__', q(gsheetsShared));
    output = output.replace('__GSHEETS_PUBLISHED__', q(gsheetsPublished));

    // Boolean replacements
    output = output.replace('%%GSHEETS_ENABLED%%', gsheetsOn ? 'true' : 'false');
    output = output.replace('%%SHOW_ON_HOMEPAGE%%', showOnHomepage ? 'true' : 'false');
    output = output.replace('%%SHOW_STORY_STEPS%%', showStorySteps ? 'true' : 'false');
    output = output.replace('%%SHOW_OBJECT_CREDITS%%', showObjectCredits ? 'true' : 'false');
    output = output.replace('%%INCLUDE_DEMO_CONTENT%%', includeDemoContent ? 'true' : 'false');
    output = output.replace('%%BROWSE_AND_SEARCH%%', browseAndSearch ? 'true' : 'false');
    output = output.replace('%%SHOW_LINK_ON_HOMEPAGE%%', showLinkOnHomepage ? 'true' : 'false');
    output = output.replace('%%SHOW_SAMPLE_ON_HOMEPAGE%%', showSampleOnHomepage ? 'true' : 'false');
    output = output.replace('%%FEATURED_COUNT%%', featuredCount);
    output = output.replace('%%STORY_KEY_LINE%%', storyKeyLine);

    // Remove leading newline from template
    output = output.replace(/^\n/, '');

    // Set output
    outputEl.value = output;

    // Generate line numbers
    var lineCount = output.split('\n').length;
    var lineNums = '';
    for (var i = 1; i <= lineCount; i++) { lineNums += i + '\n'; }
    linesEl.textContent = lineNums;

    // Show output
    outputWrapper.classList.add('cg-visible');

    // Show copy button
    copyBtn.style.display = 'inline-block';

    // Update button text
    generateBtn.textContent = 'Regenerate';

    // Scroll output into view
    outputWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // --- Scroll sync ---
  outputEl.addEventListener('scroll', function() {
    linesEl.scrollTop = outputEl.scrollTop;
  });

  // --- Copy ---
  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(outputEl.value).then(function() {
      copiedMsg.classList.add('cg-show');
      setTimeout(function() {
        copiedMsg.classList.remove('cg-show');
      }, 1500);
    });
  });
})();
</script>
