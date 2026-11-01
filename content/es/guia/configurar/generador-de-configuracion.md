---
title: Generador y editor de configuración
url: /guia/configurar/generador-de-configuracion/
translationKey: docs-configure-config-generator
type: guide
extra_css:
- config-tools
docs_section: reference
---

# Generador y editor de configuración {#generador-y-editor-de-configuración}

Ingresa los datos de tu sitio para generar un archivo `_config.yml` listo para usar en tu sitio Telar. Tu configuración nunca se envía a ningún servidor — todo se ejecuta en tu navegador.

{{< template "widget-guia-configurar-generador-de-configuracion" >}}


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
telar_theme: __THEME__ # Options: paisajes, neogranadina, santa-barbara, austin, trama, or custom
logo: __LOGO__ # Path to logo image (optional, max 80px tall, 200-300px wide recommended)
telar_language: __LANGUAGE__ # Options: "en" (English), "es" (Español)
collection_mode: %%COLLECTION_MODE%% # Set to true for objects-first homepage layout

# Google Sheets Integration (optional)
# Manage content via Google Sheets instead of editing CSV files directly.
# See https://telar.org/docs/your-data/google-sheets/ for detailed setup instructions.
#
# Setup:
# 1. Get the template: Duplicate our template at https://bit.ly/telar-template
# 2. Publish your sheet: File > Share > Publish to web
# 3. Paste the published URL below
# 4. Set enabled: true
# 5. Commit changes
#    - If using GitHub Pages: GitHub Actions will automatically discover tab GIDs and fetch CSVs
#    - If running locally: Run `python3 scripts/fetch_google_sheets.py` before building
google_sheets:
  enabled: %%GSHEETS_ENABLED%%
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
Markdown: kramdown
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
  version: __TELAR_VERSION__
  release_date: __TELAR_RELEASE_DATE__

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
    max_viewer_cards: 8     # Per-scene pool cap. Higher = smoother, more memory. (default: 8, max: 15)
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

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
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
  var _loadedSharedUrl = ''; // Stash shared_url from loaded configs (backward compat)
  var _loadedVersion = '';   // Stash version from loaded configs
  var _loadedReleaseDate = '';

  // Latest version from docs site config
  var container = document.querySelector('.cg-container');
  var LATEST_VERSION = container.getAttribute('data-telar-version');
  var LATEST_RELEASE_DATE = container.getAttribute('data-telar-release-date');

  // --- Load mode DOM references ---
  var modeCreateBtn = document.getElementById('cg-mode-create');
  var modeEditBtn = document.getElementById('cg-mode-edit');
  var pasteArea = document.getElementById('cg-paste-area');
  var loadInput = document.getElementById('cg-load-input');
  var loadLines = document.getElementById('cg-load-lines');
  var loadBtn = document.getElementById('cg-load-btn');
  var loadFeedback = document.getElementById('cg-load-feedback');
  var loadResults = document.getElementById('cg-load-results');

  // --- Toggle visibility sync (used by loadConfig and resetForm) ---
  function syncOneToggle(toggleId, fieldsId) {
    var toggle = document.getElementById(toggleId);
    var fields = document.getElementById(fieldsId);
    if (!toggle || !fields) return;
    if (toggle.checked) { fields.classList.add('cg-visible'); }
    else { fields.classList.remove('cg-visible'); }
  }

  function syncAllToggles() {
    syncOneToggle('cg-logo-toggle', 'cg-logo-fields');
    syncOneToggle('cg-custom-domain', 'cg-custom-domain-fields');
    syncOneToggle('cg-gsheets-toggle', 'cg-gsheets-fields');
    syncOneToggle('cg-protection-toggle', 'cg-protection-fields');
    // GitHub Pages toggle — inverted panel logic
    var ghToggle = document.getElementById('cg-ghpages');
    var ghFields = document.getElementById('cg-ghpages-fields');
    var manFields = document.getElementById('cg-manual-fields');
    if (ghToggle.checked) {
      ghFields.classList.add('cg-visible');
      manFields.classList.remove('cg-visible');
    } else {
      ghFields.classList.remove('cg-visible');
      manFields.classList.add('cg-visible');
    }
  }

  // --- Friendly YAML error messages (from config validator) ---
  function friendlyYamlError(reason) {
    if (!reason) return null;
    var r = reason.toLowerCase();
    if (r.indexOf('block mapping entry') !== -1 || r.indexOf('multiline key') !== -1) {
      return 'Probablemente falta un espacio después de dos puntos (:), o hay un problema de indentación cerca de esta línea. Verifica que cada ajuste tenga un espacio después de los dos puntos (ej. title: "Mi Sitio") y que los elementos anidados estén indentados con espacios, no tabulaciones.';
    }
    if (r.indexOf('bad indentation') !== -1) {
      return 'La indentación es incorrecta cerca de esta línea. YAML usa espacios (no tabulaciones) para anidar. Los elementos como published_url bajo google_sheets: deben estar indentados con exactamente 2 espacios.';
    }
    if (r.indexOf('colon is missed') !== -1 || r.indexOf('mapping values are not allowed') !== -1) {
      return 'Parece que falta o está mal ubicado un signo de dos puntos (:). Cada ajuste necesita dos puntos seguidos de un espacio entre el nombre y su valor (ej. title: "Mi Sitio").';
    }
    if (r.indexOf('did not find expected') !== -1) {
      return 'Falta un carácter de cierre. Busca comillas (\"), corchetes o llaves sin cerrar cerca de esta línea.';
    }
    if (r.indexOf('duplicated mapping key') !== -1) {
      return 'Este nombre de ajuste aparece más de una vez. Cada ajuste debe aparecer solo una vez en el archivo.';
    }
    if (r.indexOf('block end') !== -1) {
      return 'La indentación no coincide con la estructura esperada. Asegúrate de que los elementos del mismo nivel tengan la misma cantidad de espacios.';
    }
    if (r.indexOf('flow collection') !== -1 || r.indexOf('expected \',\'') !== -1) {
      return 'Se abrió un corchete o llave sin cerrarse, o falta una coma dentro de una lista. Busca caracteres [ ] o { } desbalanceados.';
    }
    if (r.indexOf('unexpected end') !== -1) {
      return 'El archivo termina inesperadamente. Busca comillas, corchetes o llaves sin cerrar.';
    }
    return null;
  }

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showLoadError(msg, line, detail) {
    var lineStr = line ? '<span class="cv-line">Línea ' + line + ':</span> ' : '';
    var detailStr = detail ? '<span class="cv-detail">Mensaje del analizador: ' + esc(detail) + '</span>' : '';
    loadResults.innerHTML = '<div class="cv-issue cv-issue--error">' +
      '<span class="cv-badge cv-badge--error">ERROR</span>' +
      '<span>' + lineStr + esc(msg) + detailStr + '</span></div>';
  }

  // --- Load config ---
  function loadConfig() {
    loadResults.innerHTML = '';
    var raw = loadInput.value;
    if (!raw || !raw.trim()) {
      showLoadError('No se encontró configuración. Pega tu _config.yml arriba y haz clic en Cargar.');
      return;
    }

    if (typeof jsyaml === 'undefined') {
      showLoadError('No se pudo cargar el analizador YAML. Verifica tu conexión a internet y recarga la página.');
      return;
    }

    var config;
    try {
      config = jsyaml.load(raw);
    } catch (e) {
      var friendly = friendlyYamlError(e.reason);
      var line = e.mark ? e.mark.line + 1 : null;
      showLoadError(
        friendly || ('Error de sintaxis YAML: ' + e.reason),
        line,
        friendly ? e.reason : null
      );
      return;
    }

    if (typeof config !== 'object' || config === null) {
      showLoadError('El archivo de configuración debe contener pares clave-valor YAML, no un solo valor.');
      return;
    }

    // --- Map parsed values to form fields ---

    // Simple strings
    if (config.title !== undefined) {
      document.getElementById('cg-title').value = String(config.title);
    }
    if (config.description !== undefined) {
      document.getElementById('cg-description').value = String(config.description);
    }
    if (config.author !== undefined) {
      var authorVal = config.author;
      if (typeof authorVal === 'object' && authorVal !== null) {
        authorVal = authorVal.name || '';
      }
      document.getElementById('cg-author').value = String(authorVal);
    }
    if (config.email !== undefined) {
      document.getElementById('cg-email').value = String(config.email);
    }

    // Selects
    if (config.telar_theme !== undefined) {
      document.getElementById('cg-theme').value = String(config.telar_theme);
    }
    if (config.telar_language !== undefined) {
      document.getElementById('cg-language').value = String(config.telar_language);
    }

    // Version detection
    _loadedVersion = '';
    _loadedReleaseDate = '';
    if (config.telar && typeof config.telar === 'object') {
      if (config.telar.version !== undefined) {
        _loadedVersion = String(config.telar.version);
      }
      if (config.telar.release_date !== undefined) {
        _loadedReleaseDate = String(config.telar.release_date);
      }
    }

    // Logo
    if (config.logo !== undefined && config.logo !== null && String(config.logo).trim() !== '') {
      document.getElementById('cg-logo-toggle').checked = true;
      document.getElementById('cg-logo-path').value = String(config.logo);
    } else {
      document.getElementById('cg-logo-toggle').checked = false;
      document.getElementById('cg-logo-path').value = '';
    }

    // Hosting — reverse-map url/baseurl
    var urlVal = config.url !== undefined ? String(config.url).replace(/\/+$/, '') : '';
    var baseurlVal = config.baseurl !== undefined ? String(config.baseurl) : '';

    if (/^https?:\/\/[\w-]+\.github\.io$/.test(urlVal)) {
      document.getElementById('cg-ghpages').checked = true;
      var ghMatch = urlVal.match(/^https?:\/\/([\w-]+)\.github\.io$/);
      document.getElementById('cg-gh-username').value = ghMatch ? ghMatch[1] : '';
      document.getElementById('cg-gh-repo').value = baseurlVal.replace(/^\//, '');
      document.getElementById('cg-custom-domain').checked = false;
      document.getElementById('cg-domain-url').value = '';
      document.getElementById('cg-root-domain').checked = false;
      document.getElementById('cg-manual-url').value = '';
      document.getElementById('cg-manual-baseurl').value = '';
    } else {
      document.getElementById('cg-ghpages').checked = false;
      document.getElementById('cg-manual-url').value = urlVal;
      document.getElementById('cg-manual-baseurl').value = baseurlVal;
      document.getElementById('cg-gh-username').value = '';
      document.getElementById('cg-gh-repo').value = '';
      document.getElementById('cg-custom-domain').checked = false;
      document.getElementById('cg-domain-url').value = '';
      document.getElementById('cg-root-domain').checked = false;
    }

    // Google Sheets
    var gs = config.google_sheets;
    if (gs && typeof gs === 'object') {
      document.getElementById('cg-gsheets-toggle').checked = !!gs.enabled;
      _loadedSharedUrl = (gs.shared_url !== undefined) ? String(gs.shared_url) : '';
      if (gs.published_url !== undefined) {
        document.getElementById('cg-gsheets-published').value = String(gs.published_url);
      }
    }

    // Collection mode
    if (config.collection_mode !== undefined) {
      document.getElementById('cg-collection-mode').checked = !!config.collection_mode;
    }

    // Story interface
    var si = config.story_interface;
    if (si && typeof si === 'object') {
      if (si.show_on_homepage !== undefined) {
        document.getElementById('cg-show-on-homepage').checked = !!si.show_on_homepage;
      }
      if (si.show_story_steps !== undefined) {
        document.getElementById('cg-show-story-steps').checked = !!si.show_story_steps;
      }
      if (si.show_object_credits !== undefined) {
        document.getElementById('cg-show-object-credits').checked = !!si.show_object_credits;
      }
      if (si.include_demo_content !== undefined) {
        document.getElementById('cg-include-demo-content').checked = !!si.include_demo_content;
      }
    }

    // Collection interface
    var ci = config.collection_interface;
    if (ci && typeof ci === 'object') {
      if (ci.browse_and_search !== undefined) {
        document.getElementById('cg-browse-and-search').checked = !!ci.browse_and_search;
      }
      if (ci.show_link_on_homepage !== undefined) {
        document.getElementById('cg-show-link-on-homepage').checked = !!ci.show_link_on_homepage;
      }
      if (ci.show_sample_on_homepage !== undefined) {
        document.getElementById('cg-show-sample-on-homepage').checked = !!ci.show_sample_on_homepage;
      }
      if (ci.featured_count !== undefined) {
        document.getElementById('cg-featured-count').value = ci.featured_count;
      }
    }

    // Story key
    if (config.story_key !== undefined && config.story_key !== null && String(config.story_key).trim() !== '') {
      document.getElementById('cg-protection-toggle').checked = true;
      document.getElementById('cg-secret-key').value = String(config.story_key);
    } else {
      document.getElementById('cg-protection-toggle').checked = false;
      document.getElementById('cg-secret-key').value = '';
    }

    // Sync toggle visibility, clear validation, hide paste area
    syncAllToggles();
    clearAllValidation();
    pasteArea.classList.remove('cg-visible');
    modeCreateBtn.classList.add('cg-active');
    modeEditBtn.classList.remove('cg-active');

    // Reset generate button text and hide output
    generateBtn.textContent = 'Generar';
    copyBtn.style.display = 'none';
    outputWrapper.classList.remove('cg-visible');

    showLoadSuccess('Configuración cargada');

    // Version notice
    if (_loadedVersion && _loadedVersion !== LATEST_VERSION) {
      loadResults.innerHTML = '<div class="cv-issue cv-issue--warning">' +
        '<span class="cv-badge cv-badge--warning">VERSIÓN</span>' +
        '<span>Tu configuración usa <strong>v' + esc(_loadedVersion) + '</strong>. ' +
        'La versión más reciente es <strong>v' + esc(LATEST_VERSION) + '</strong>. ' +
        '<a href="/docs/setup/upgrading/" target="_blank">Cómo actualizar</a></span>' +
        '<label style="display:block;margin-top:0.5em;cursor:pointer;">' +
        '<input type="checkbox" id="cg-update-version" checked> ' +
        'Actualizar versión a v' + esc(LATEST_VERSION) + ' en la configuración generada</label>' +
        '</div>';
    } else if (!_loadedVersion) {
      loadResults.innerHTML = '<div class="cv-issue cv-issue--warning">' +
        '<span class="cv-badge cv-badge--warning">VERSIÓN</span>' +
        '<span>No se detectó versión en tu configuración. La configuración generada usará ' +
        '<strong>v' + esc(LATEST_VERSION) + '</strong>. ' +
        '<a href="/docs/setup/upgrading/" target="_blank">Cómo actualizar</a></span>' +
        '</div>';
    } else {
      loadResults.innerHTML = '';
    }
  }

  // --- Reset form ---
  function resetForm() {
    // Text inputs and textareas
    document.getElementById('cg-title').value = '';
    document.getElementById('cg-description').value = '';
    document.getElementById('cg-author').value = '';
    document.getElementById('cg-email').value = '';
    document.getElementById('cg-logo-path').value = '';
    document.getElementById('cg-gh-username').value = '';
    document.getElementById('cg-gh-repo').value = '';
    document.getElementById('cg-domain-url').value = '';
    document.getElementById('cg-manual-url').value = '';
    document.getElementById('cg-manual-baseurl').value = '';
    document.getElementById('cg-gsheets-published').value = '';
    _loadedSharedUrl = '';
    _loadedVersion = '';
    _loadedReleaseDate = '';
    loadResults.innerHTML = '';
    document.getElementById('cg-secret-key').value = '';

    // Selects
    document.getElementById('cg-theme').value = 'trama';
    document.getElementById('cg-language').value = 'es';

    // Toggles — defaults
    document.getElementById('cg-ghpages').checked = true;
    document.getElementById('cg-logo-toggle').checked = false;
    document.getElementById('cg-custom-domain').checked = false;
    document.getElementById('cg-root-domain').checked = false;
    document.getElementById('cg-gsheets-toggle').checked = true;
    document.getElementById('cg-show-on-homepage').checked = true;
    document.getElementById('cg-show-story-steps').checked = true;
    document.getElementById('cg-show-object-credits').checked = true;
    document.getElementById('cg-include-demo-content').checked = true;
    document.getElementById('cg-browse-and-search').checked = true;
    document.getElementById('cg-show-link-on-homepage').checked = true;
    document.getElementById('cg-show-sample-on-homepage').checked = true;
    document.getElementById('cg-protection-toggle').checked = false;

    // Number input
    document.getElementById('cg-featured-count').value = 4;

    // Sync toggle visibility
    syncAllToggles();

    // Clear validation, hide output
    clearAllValidation();
    outputWrapper.classList.remove('cg-visible');
    generateBtn.textContent = 'Generar';
    copyBtn.style.display = 'none';

    // Clear paste area
    loadInput.value = '';
    loadLines.textContent = '1';
  }

  // --- Load feedback ---
  // --- Load success feedback (brief fade) ---
  function showLoadSuccess(msg) {
    loadFeedback.textContent = msg;
    loadFeedback.className = 'cg-load-feedback cg-load-success cg-show';
    setTimeout(function() { loadFeedback.classList.remove('cg-show'); }, 2500);
  }

  // --- Mode switching ---
  modeCreateBtn.addEventListener('click', function() {
    modeCreateBtn.classList.add('cg-active');
    modeEditBtn.classList.remove('cg-active');
    pasteArea.classList.remove('cg-visible');
    loadResults.innerHTML = '';
    resetForm();
  });

  modeEditBtn.addEventListener('click', function() {
    modeEditBtn.classList.add('cg-active');
    modeCreateBtn.classList.remove('cg-active');
    pasteArea.classList.add('cg-visible');
    loadResults.innerHTML = '';
    loadInput.focus();
  });

  // --- Paste area line numbers ---
  loadInput.addEventListener('input', function() {
    var count = (loadInput.value || '').split('\n').length;
    var nums = '';
    for (var i = 1; i <= count; i++) { nums += i + '\n'; }
    loadLines.textContent = nums;
  });
  loadInput.addEventListener('scroll', function() {
    loadLines.scrollTop = loadInput.scrollTop;
  });

  // --- Load button ---
  loadBtn.addEventListener('click', loadConfig);

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
      showError('cg-title', 'Obligatorio — tu sitio necesita un título');
      return true;
    }
    return false;
  }

  function validateUsername() {
    clearField('cg-gh-username');
    if (!ghPagesToggle.checked) return false;
    var username = document.getElementById('cg-gh-username').value.trim();
    if (!username) {
      showError('cg-gh-username', 'Obligatorio — se usa para construir la URL de GitHub Pages');
      return true;
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(username)) {
      showError('cg-gh-username', 'Los nombres de usuario de GitHub solo pueden contener letras, números y guiones, y no pueden comenzar con un guión');
      return true;
    }
    return false;
  }

  function validateRepo() {
    clearField('cg-gh-repo');
    if (!ghPagesToggle.checked) return false;
    var repo = document.getElementById('cg-gh-repo').value.trim();
    if (!repo) {
      showError('cg-gh-repo', 'Obligatorio — se usa para construir la URL de GitHub Pages');
      return true;
    }
    if (/\s/.test(repo)) {
      showError('cg-gh-repo', 'Los nombres de repositorio no pueden contener espacios — usa guiones (ej. mi-exhibicion)');
      return true;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(repo)) {
      showError('cg-gh-repo', 'Los nombres de repositorio solo pueden contener letras, números, guiones, guiones bajos y puntos');
      return true;
    }
    if (/[A-Z]/.test(repo)) {
      showWarn('cg-gh-repo', 'Los nombres de repositorio en GitHub distinguen mayúsculas y minúsculas, y convencionalmente van en minúsculas — considera revisarlo');
    }
    return false;
  }

  function validateDomain() {
    clearField('cg-domain-url');
    if (!ghPagesToggle.checked || !document.getElementById('cg-custom-domain').checked) return false;
    var domain = document.getElementById('cg-domain-url').value.trim();
    if (!domain) {
      showError('cg-domain-url', 'Ingresa la URL de tu dominio personalizado');
      return true;
    }
    if (!/^https?:\/\/.+/.test(domain)) {
      showError('cg-domain-url', 'Debe comenzar con https:// (ej. https://minombre.org)');
      return true;
    }
    if (/^http:\/\//.test(domain)) {
      showWarn('cg-domain-url', 'Considera usar https:// — GitHub Pages admite HTTPS para dominios personalizados');
    }
    return false;
  }

  function validateManualUrl() {
    clearField('cg-manual-url');
    if (ghPagesToggle.checked) return false;
    var manualUrl = document.getElementById('cg-manual-url').value.trim();
    if (!manualUrl) {
      showError('cg-manual-url', 'Ingresa la URL de tu sitio');
      return true;
    }
    if (!/^https?:\/\/.+/.test(manualUrl)) {
      showError('cg-manual-url', 'Debe comenzar con https:// o http:// (ej. https://misitio.org)');
      return true;
    }
    return false;
  }

  function validateSheetsPublished() {
    clearField('cg-gsheets-published');
    if (!document.getElementById('cg-gsheets-toggle').checked) return false;
    var publishedUrl = document.getElementById('cg-gsheets-published').value.trim();
    if (!publishedUrl) {
      showError('cg-gsheets-published', 'Ingresa la URL publicada de Google Sheets');
      return true;
    }
    if (!publishedUrl.includes('docs.google.com/spreadsheets')) {
      showWarn('cg-gsheets-published', 'Esta URL no parece ser una URL publicada de Google Sheets — obtenla desde Archivo → Compartir → Publicar en la web');
    }
    return false;
  }

  function validateSecretKey() {
    clearField('cg-secret-key');
    if (!document.getElementById('cg-protection-toggle').checked) return false;
    var secretKey = document.getElementById('cg-secret-key').value.trim();
    if (!secretKey) {
      showError('cg-secret-key', 'Ingresa una clave secreta para las historias privadas');
      return true;
    }
    if (secretKey.length < 8) {
      showWarn('cg-secret-key', 'Las claves cortas son más fáciles de adivinar — considera usar una clave más larga y aleatoria');
    }
    return false;
  }

  function validateAll() {
    var hasErrors = false;
    if (validateTitle())         hasErrors = true;
    if (validateUsername())      hasErrors = true;
    if (validateRepo())          hasErrors = true;
    if (validateDomain())        hasErrors = true;
    if (validateManualUrl())     hasErrors = true;
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

    var collectionMode = document.getElementById('cg-collection-mode').checked;

    var logoOn = document.getElementById('cg-logo-toggle').checked;
    var logoPath = logoOn ? document.getElementById('cg-logo-path').value.trim() : '';

    var gsheetsOn = document.getElementById('cg-gsheets-toggle').checked;
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
    output = output.replace('__GSHEETS_PUBLISHED__', q(gsheetsPublished));

    // Version: use latest unless user loaded an older version and unchecked the update box
    var updateVersionEl = document.getElementById('cg-update-version');
    var useLatest = !_loadedVersion || !updateVersionEl || updateVersionEl.checked;
    output = output.replace('__TELAR_VERSION__', q(useLatest ? LATEST_VERSION : _loadedVersion));
    output = output.replace('__TELAR_RELEASE_DATE__', q(useLatest ? LATEST_RELEASE_DATE : (_loadedReleaseDate || LATEST_RELEASE_DATE)));

    // Boolean replacements
    output = output.replace('%%GSHEETS_ENABLED%%', gsheetsOn ? 'true' : 'false');
    output = output.replace('%%COLLECTION_MODE%%', collectionMode ? 'true' : 'false');
    output = output.replace('%%SHOW_ON_HOMEPAGE%%', showOnHomepage ? 'true' : 'false');
    output = output.replace('%%SHOW_STORY_STEPS%%', showStorySteps ? 'true' : 'false');
    output = output.replace('%%SHOW_OBJECT_CREDITS%%', showObjectCredits ? 'true' : 'false');
    output = output.replace('%%INCLUDE_DEMO_CONTENT%%', includeDemoContent ? 'true' : 'false');
    output = output.replace('%%BROWSE_AND_SEARCH%%', browseAndSearch ? 'true' : 'false');
    output = output.replace('%%SHOW_LINK_ON_HOMEPAGE%%', showLinkOnHomepage ? 'true' : 'false');
    output = output.replace('%%SHOW_SAMPLE_ON_HOMEPAGE%%', showSampleOnHomepage ? 'true' : 'false');
    output = output.replace('%%FEATURED_COUNT%%', featuredCount);
    output = output.replace('%%STORY_KEY_LINE%%', storyKeyLine);

    // Backward compat: preserve shared_url from loaded config (needed by pre-v0.9.0)
    if (_loadedSharedUrl) {
      output = output.replace(
        '  published_url:',
        '  shared_url: ' + q(_loadedSharedUrl) + ' # No longer needed from v0.9.0 — kept for backward compatibility\n  published_url:'
      );
    }

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
    generateBtn.textContent = 'Regenerar';

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
