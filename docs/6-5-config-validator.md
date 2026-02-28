---
layout: docs
title: 6.5. Config Validator
parent: 6. Reference
grand_parent: Documentation
nav_order: 5
lang: en
permalink: /docs/reference/config-validator/
extra_css:
  - config-tools
---

# Config Validator

Paste your Telar `_config.yml` below to check for common configuration errors. The validator checks YAML syntax, required fields, and Telar-specific settings.

Your configuration is never sent to any server — everything runs in your browser.

<div class="cv-container">
  <div class="cv-editor">
    <div class="cv-lines" id="cv-lines" aria-hidden="true">1</div>
    <textarea id="cv-input" class="cv-textarea" placeholder="Paste the full contents of your _config.yml here..."></textarea>
  </div>
  <div class="cv-actions">
    <button id="cv-validate" class="cv-button" type="button">Validate</button>
  </div>
  <div id="cv-results" class="cv-results"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script>
(function() {
  'use strict';

  var inputEl = document.getElementById('cv-input');
  var buttonEl = document.getElementById('cv-validate');
  var resultsEl = document.getElementById('cv-results');
  var linesEl = document.getElementById('cv-lines');

  function updateLineNumbers() {
    var count = (inputEl.value || '').split('\n').length;
    var html = '';
    for (var i = 1; i <= count; i++) { html += i + '\n'; }
    linesEl.textContent = html;
  }

  inputEl.addEventListener('input', updateLineNumbers);
  inputEl.addEventListener('scroll', function() { linesEl.scrollTop = inputEl.scrollTop; });
  updateLineNumbers();

  var KNOWN_THEMES = ['paisajes', 'neogranadina', 'santa-barbara', 'austin'];
  var WEAK_KEYS = ['test', 'password', '123', '1234', 'abc', 'key', 'secret', 'demo', 'admin'];

  function friendlyYamlError(reason) {
    if (!reason) return null;
    var r = reason.toLowerCase();
    if (r.indexOf('block mapping entry') !== -1 || r.indexOf('multiline key') !== -1) {
      return 'There is likely a missing space after a colon (:), or an indentation problem near this line. Check that each setting has a space after the colon (e.g., title: "My Site") and that nested items are indented with spaces, not tabs.';
    }
    if (r.indexOf('bad indentation') !== -1) {
      return 'The indentation is incorrect near this line. YAML uses spaces (not tabs) for nesting. Items like shared_url under google_sheets: need to be indented by exactly 2 spaces.';
    }
    if (r.indexOf('colon is missed') !== -1 || r.indexOf('mapping values are not allowed') !== -1) {
      return 'A colon (:) seems to be missing or misplaced. Each setting needs a colon followed by a space between the name and its value (e.g., title: "My Site").';
    }
    if (r.indexOf('did not find expected') !== -1) {
      return 'A closing character is missing. Check for unclosed quotes (\"), brackets, or braces near this line.';
    }
    if (r.indexOf('duplicated mapping key') !== -1) {
      return 'This setting name appears more than once. Each setting should only be listed once in the file.';
    }
    if (r.indexOf('block end') !== -1) {
      return 'The indentation does not match the expected structure. Make sure items at the same level have the same number of spaces.';
    }
    if (r.indexOf('flow collection') !== -1 || r.indexOf('expected \',\'') !== -1) {
      return 'A bracket or brace was opened but never closed, or a comma is missing inside a list. Check for mismatched [ ] or { } characters.';
    }
    if (r.indexOf('unexpected end') !== -1) {
      return 'The file ends unexpectedly. Check for unclosed quotes, brackets, or braces.';
    }
    return null;
  }

  buttonEl.addEventListener('click', function() {
    var raw = inputEl.value;
    resultsEl.innerHTML = '';

    if (!raw.trim()) {
      resultsEl.innerHTML = '<p class="cv-summary">Paste your _config.yml above and click Validate.</p>';
      return;
    }

    if (typeof jsyaml === 'undefined') {
      resultsEl.innerHTML = '<div class="cv-issue cv-issue--error"><span class="cv-badge cv-badge--error">ERROR</span><span>Could not load the YAML parser. Check your internet connection and try refreshing the page.</span></div>';
      return;
    }

    var issues = validate(raw);
    render(issues);
  });

  function validate(raw) {
    var issues = [];
    var lines = raw.split('\n');

    // --- Tier 1: Syntax ---

    for (var i = 0; i < lines.length; i++) {
      if (lines[i].indexOf('\t') !== -1) {
        issues.push({
          s: 'error',
          m: 'Tab character found. YAML requires spaces for indentation — replace each tab with 2 spaces.',
          l: i + 1
        });
      }
    }

    // Check for unclosed quotes
    var hasQuoteError = false;
    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (!trimmed || trimmed.charAt(0) === '#') continue;
      var qcount = 0;
      var inQ = false;
      for (var j = 0; j < lines[i].length; j++) {
        if (lines[i].charAt(j) === '"') { qcount++; inQ = !inQ; }
        if (lines[i].charAt(j) === '#' && !inQ) break;
      }
      if (qcount % 2 !== 0) {
        hasQuoteError = true;
        issues.push({
          s: 'error',
          m: 'Unclosed quotation mark. Every opening " needs a matching closing " on the same line.',
          l: i + 1
        });
      }
    }
    if (hasQuoteError) return issues;

    // Check for possible stripped comments (missing # character)
    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (!trimmed || trimmed.charAt(0) === '#' || trimmed.charAt(0) === '-') continue;
      if (trimmed.indexOf(':') !== -1) continue;
      if (/^---/.test(trimmed)) continue;
      issues.push({
        s: 'warning',
        m: 'This line does not look like a YAML setting or comment. Did you accidentally delete a # character?',
        l: i + 1
      });
    }

    var config;
    try {
      config = jsyaml.load(raw);
    } catch (e) {
      var friendly = friendlyYamlError(e.reason);
      issues.push({
        s: 'error',
        m: friendly || ('YAML syntax error: ' + e.reason),
        l: e.mark ? e.mark.line + 1 : null,
        d: friendly ? e.reason : null
      });
      return issues;
    }

    if (typeof config !== 'object' || config === null) {
      issues.push({
        s: 'error',
        m: 'The config file should contain YAML key-value pairs, not a single value.'
      });
      return issues;
    }

    // --- Tier 2: Required fields ---

    if (!config.title || (typeof config.title === 'string' && !config.title.trim())) {
      issues.push({ s: 'error', m: '"title" is missing or empty. Your site needs a title.' });
    }

    checkUrl(config, issues);
    checkBaseurl(config, issues);

    // --- Tier 3: Telar-specific ---

    checkTheme(config, issues);
    checkLanguage(config, issues);
    checkGoogleSheets(config, issues);
    checkStoryKey(config, issues);

    // --- Tier 4: Helpful warnings ---

    checkInterfaces(config, issues);
    checkDevelopmentFeatures(config, issues);
    checkBuildSettings(config, issues);
    checkGithubPagesBaseurl(config, issues);
    checkReadOnlySection(config, issues);

    return issues;
  }

  function checkUrl(config, issues) {
    if (config.url === undefined || config.url === null || config.url === '') {
      issues.push({
        s: 'error',
        m: '"url" is missing or empty. Set this to your site\'s base domain (e.g., "https://username.github.io").'
      });
      return;
    }
    var url = String(config.url);
    if (!/^https?:\/\//.test(url)) {
      issues.push({
        s: 'error',
        m: '"url" should start with "https://" (e.g., "https://username.github.io").'
      });
    } else if (/^http:\/\//.test(url)) {
      issues.push({
        s: 'warning',
        m: '"url" uses http:// instead of https://. Most GitHub Pages sites should use https://.'
      });
    }
  }

  function checkBaseurl(config, issues) {
    if (!config.hasOwnProperty('baseurl')) {
      issues.push({
        s: 'error',
        m: '"baseurl" is missing. Set it to your repository name (e.g., "/my-repo") or "" for root domains.'
      });
      return;
    }
    var bu = config.baseurl;
    if (bu === null || bu === '') return;
    var buStr = String(bu);
    if (buStr !== buStr.toLowerCase()) {
      issues.push({
        s: 'warning',
        m: '"baseurl" contains uppercase characters. It should be all lowercase to match your repository name.'
      });
    }
    if (buStr.charAt(0) !== '/') {
      issues.push({
        s: 'warning',
        m: '"baseurl" should start with "/" (e.g., "/my-repo").'
      });
    }
    if (buStr.length > 1 && buStr.charAt(buStr.length - 1) === '/') {
      issues.push({
        s: 'warning',
        m: '"baseurl" should not have a trailing slash. Use "/my-repo", not "/my-repo/".'
      });
    }
  }

  function checkTheme(config, issues) {
    if (config.telar_theme === undefined) return;
    var theme = String(config.telar_theme);
    if (KNOWN_THEMES.indexOf(theme) === -1) {
      issues.push({
        s: 'warning',
        m: 'Unrecognized theme "' + theme + '". Built-in themes are: ' + KNOWN_THEMES.join(', ') + '. If this is a custom theme, make sure you have added the corresponding CSS file.'
      });
    }
  }

  function checkLanguage(config, issues) {
    if (config.telar_language === undefined) return;
    var lang = String(config.telar_language);
    if (lang !== 'en' && lang !== 'es') {
      issues.push({
        s: 'warning',
        m: '"telar_language" should be "en" or "es". Got "' + lang + '".'
      });
    }
  }

  function checkGoogleSheets(config, issues) {
    if (!config.google_sheets) {
      issues.push({
        s: 'info',
        m: 'No "google_sheets" section found. Sheets integration is not configured — Telar will use CSV files from your repository instead.'
      });
      return;
    }
    var gs = config.google_sheets;
    if (gs.hasOwnProperty('enabled') && typeof gs.enabled !== 'boolean') {
      issues.push({
        s: 'error',
        m: '"google_sheets.enabled" should be true or false, but got "' + gs.enabled + '". Remove any quotes — write just true or false, not "true" or "false".'
      });
      return;
    }
    if (!gs.enabled) {
      if (gs.shared_url || gs.published_url) {
        issues.push({
          s: 'warning',
          m: '"google_sheets" has URLs but "enabled" is not set to true. Set "enabled: true" to use Google Sheets integration.'
        });
      }
      return;
    }
    if (!gs.shared_url || (typeof gs.shared_url === 'string' && !gs.shared_url.trim())) {
      issues.push({
        s: 'error',
        m: '"google_sheets.shared_url" is missing or empty. You need both the shared URL and the published URL.'
      });
    }
    if (!gs.published_url || (typeof gs.published_url === 'string' && !gs.published_url.trim())) {
      issues.push({
        s: 'error',
        m: '"google_sheets.published_url" is missing or empty. You need both the shared URL and the published URL.'
      });
    }
    if (gs.shared_url && gs.published_url && gs.shared_url === gs.published_url) {
      issues.push({
        s: 'error',
        m: '"shared_url" and "published_url" are the same URL. These should be two different URLs — one for sharing, one for publishing.'
      });
    }
  }

  function checkStoryKey(config, issues) {
    if (!config.story_key) return;
    var key = String(config.story_key).toLowerCase();
    if (WEAK_KEYS.indexOf(key) !== -1) {
      issues.push({
        s: 'warning',
        m: '"story_key" is set to a commonly guessable value. Consider using a stronger key for protected stories.'
      });
    }
  }

  function checkInterfaces(config, issues) {
    if (!config.story_interface) {
      issues.push({
        s: 'info',
        m: 'No "story_interface" section found. Default settings will be used for story display.'
      });
    } else {
      checkBooleanFields(config.story_interface, 'story_interface', [
        'show_on_homepage', 'show_story_steps', 'show_object_credits', 'include_demo_content'
      ], issues);
    }
    if (!config.collection_interface) {
      issues.push({
        s: 'info',
        m: 'No "collection_interface" section found. Default settings will be used for the objects gallery.'
      });
    } else {
      checkBooleanFields(config.collection_interface, 'collection_interface', [
        'browse_and_search', 'show_link_on_homepage', 'show_sample_on_homepage'
      ], issues);
    }
  }

  function checkBooleanFields(obj, section, fields, issues) {
    for (var i = 0; i < fields.length; i++) {
      var key = fields[i];
      if (obj.hasOwnProperty(key) && typeof obj[key] !== 'boolean') {
        var label = section ? section + '.' + key : key;
        issues.push({
          s: 'error',
          m: '"' + label + '" should be true or false, but got "' + obj[key] + '". Remove any quotes — write just true or false, not "true" or "false".'
        });
      }
    }
  }

  function checkDevelopmentFeatures(config, issues) {
    var df = config['development-features'];
    if (!df) return;
    checkBooleanFields(df, 'development-features', [
      'christmas_tree_mode', 'skip_stories', 'skip_collections'
    ], issues);
  }

  function checkBuildSettings(config, issues) {
    checkBooleanFields(config, '', ['future', 'show_drafts'], issues);
    if (config.collections) {
      var cols = config.collections;
      var names = Object.keys(cols);
      for (var i = 0; i < names.length; i++) {
        if (typeof cols[names[i]] === 'object' && cols[names[i]] !== null) {
          checkBooleanFields(cols[names[i]], 'collections.' + names[i], ['output'], issues);
        }
      }
    }
  }

  function checkGithubPagesBaseurl(config, issues) {
    if (!config.url || !config.hasOwnProperty('baseurl')) return;
    var url = String(config.url);
    var bu = config.baseurl;
    if (url.indexOf('github.io') !== -1 && (bu === null || bu === '')) {
      issues.push({
        s: 'warning',
        m: 'Your "url" looks like a GitHub Pages domain, but "baseurl" is empty. On GitHub Pages, baseurl usually needs to be set to your repository name (e.g., "/my-repo").'
      });
    }
  }

  function checkReadOnlySection(config, issues) {
    var warns = [];
    if (config.markdown && config.markdown !== 'kramdown') {
      warns.push('"markdown" is set to "' + config.markdown + '" instead of "kramdown"');
    }
    if (config.permalink && config.permalink !== 'pretty') {
      warns.push('"permalink" is set to "' + config.permalink + '" instead of "pretty"');
    }
    if (config.collections_dir && config.collections_dir !== '_jekyll-files') {
      warns.push('"collections_dir" is set to "' + config.collections_dir + '" instead of "_jekyll-files"');
    }
    if (warns.length > 0) {
      issues.push({
        s: 'warning',
        m: 'Read-only section has non-standard values: ' + warns.join('; ') + '. These settings are pre-configured by Telar and should not normally be changed.'
      });
    }
  }

  function render(issues) {
    if (issues.length === 0) {
      resultsEl.innerHTML = '<div class="cv-issue cv-issue--success"><span class="cv-badge cv-badge--success">PASS</span><span>No issues found. Your configuration looks good!</span></div>';
      return;
    }

    var counts = { error: 0, warning: 0, info: 0 };
    for (var i = 0; i < issues.length; i++) {
      counts[issues[i].s]++;
    }

    var parts = [];
    if (counts.error > 0) parts.push(counts.error + ' error' + (counts.error > 1 ? 's' : ''));
    if (counts.warning > 0) parts.push(counts.warning + ' warning' + (counts.warning > 1 ? 's' : ''));
    if (counts.info > 0) parts.push(counts.info + ' note' + (counts.info > 1 ? 's' : ''));

    var html = '<p class="cv-summary">Found ' + parts.join(', ') + ':</p>';

    for (var i = 0; i < issues.length; i++) {
      var issue = issues[i];
      var lineStr = issue.l ? '<span class="cv-line">Line ' + issue.l + ':</span> ' : '';
      var detailStr = issue.d ? '<span class="cv-detail">Parser message: ' + esc(issue.d) + '</span>' : '';
      html += '<div class="cv-issue cv-issue--' + issue.s + '">';
      html += '<span class="cv-badge cv-badge--' + issue.s + '">' + issue.s + '</span>';
      html += '<span>' + lineStr + esc(issue.m) + detailStr + '</span>';
      html += '</div>';
    }

    resultsEl.innerHTML = html;
  }

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
</script>

## What this checks

1. **YAML syntax** — Catches parse errors, tab characters, and unclosed quotes, with line numbers
2. **Required fields** — Ensures `title`, `url`, and `baseurl` are present and properly formatted
3. **Telar settings** — Validates theme names, language codes, Google Sheets URLs, and baseurl formatting
4. **Helpful warnings** — Notes about default settings, common GitHub Pages pitfalls, and the read-only section

## See also

- [Configuration Reference](/docs/reference/configuration/) — Full list of all `_config.yml` settings
- [Config Generator and Editor](/docs/reference/config-generator/) — Generate or edit a `_config.yml` file
- [Quick Start](/docs/getting-started/quick-start/) — Step-by-step setup guide
