---
layout: docs
title: 6.6. Generador de Configuración
parent: 6. Referencia
grand_parent: Documentación
nav_order: 6
lang: es
permalink: /guia/referencia/generador-de-configuracion/
extra_css:
  - config-tools
---

# Generador de Configuración

Ingresa los datos de tu sitio para generar un archivo `_config.yml` listo para usar en tu sitio Telar. Tu configuración nunca se envía a ningún servidor — todo se ejecuta en tu navegador.

<div class="cg-container">

  <!-- 1. Configuración del sitio -->
  <div class="cg-section">
    <h3>Configuración del sitio</h3>
    <p class="cg-section-desc">Información básica y apariencia del sitio. Estos son los ajustes más importantes para tu sitio.</p>

    <div class="cg-row">
      <label class="cg-label" for="cg-title">Título</label>
      <div class="cg-field">
        <input type="text" id="cg-title" class="cg-input" placeholder="Mi Exhibición Narrativa">
        <div class="cg-warn-msg" id="cg-title-warn"></div>
        <div class="cg-hint">El nombre de tu sitio, visible en la pestaña del navegador y en el encabezado de navegación</div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-description">Descripción <span class="cg-optional">(opcional)</span></label>
      <div class="cg-field">
        <textarea id="cg-description" class="cg-textarea-input" rows="2" placeholder="Una breve descripción de tu exhibición"></textarea>
        <div class="cg-hint">Se usa para los metadatos de motores de búsqueda y vistas previas en redes sociales</div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-author">Autor <span class="cg-optional">(opcional)</span></label>
      <div class="cg-field">
        <input type="text" id="cg-author" class="cg-input" placeholder="Tu Nombre">
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-email">Correo electrónico <span class="cg-optional">(opcional)</span></label>
      <div class="cg-field">
        <input type="text" id="cg-email" class="cg-input" placeholder="tu@ejemplo.com">
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-theme">Tema</label>
      <div class="cg-field">
        <select id="cg-theme" class="cg-select">
          <option value="paisajes" selected>paisajes</option>
          <option value="neogranadina">neogranadina</option>
          <option value="santa-barbara">santa-barbara</option>
          <option value="austin">austin</option>
        </select>
        <div class="cg-hint">Controla el esquema de colores y el estilo visual de tu sitio</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-logo-toggle">
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-logo-toggle">Usar una imagen como logo</label>
        <div class="cg-toggle-hint cg-hint">Cuando está desactivado, el título del sitio se muestra como texto en el encabezado de navegación</div>
      </div>
    </div>
    <div id="cg-logo-fields" class="cg-optional-fields">
      <div class="cg-row">
        <label class="cg-label" for="cg-logo-path">Ruta del logo</label>
        <div class="cg-field">
          <input type="text" id="cg-logo-path" class="cg-input" placeholder="components/images/logo.png">
          <div class="cg-hint">Pon tu logo en <code>components/images/</code>. Recomendado: máx. 80px de alto, 200–300px de ancho, PNG/JPG/SVG</div>
        </div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-language">Idioma</label>
      <div class="cg-field">
        <select id="cg-language" class="cg-select">
          <option value="en">English (en)</option>
          <option value="es" selected>Español (es)</option>
        </select>
        <div class="cg-hint">Controla todos los elementos de la interfaz: navegación, botones, etiquetas, mensajes de error. Tu contenido permanece en el idioma en que lo escribas.</div>
      </div>
    </div>
  </div>

  <!-- 2. Alojamiento -->
  <div class="cg-section">
    <h3>Alojamiento</h3>
    <p class="cg-section-desc">Telar está diseñado para funcionar con GitHub Pages — la mayoría de los usuarios solo necesitan su nombre de usuario y el nombre del repositorio.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-ghpages" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-ghpages">Alojar en GitHub Pages</label>
        <div class="cg-toggle-hint cg-hint">Si no usas GitHub Pages, desactiva esta opción para ingresar tu URL manualmente.</div>
      </div>
    </div>

    <div id="cg-ghpages-fields" class="cg-optional-fields cg-visible">
      <div class="cg-row">
        <label class="cg-label" for="cg-gh-username">Usuario de GitHub</label>
        <div class="cg-field">
          <input type="text" id="cg-gh-username" class="cg-input" placeholder="usuario">
          <div class="cg-error-msg" id="cg-gh-username-error"></div>
        </div>
      </div>
      <div class="cg-row">
        <label class="cg-label" for="cg-gh-repo">Nombre del repositorio</label>
        <div class="cg-field">
          <input type="text" id="cg-gh-repo" class="cg-input" placeholder="mi-exhibicion">
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
          <label class="cg-toggle-label" for="cg-custom-domain">Dominio personalizado</label>
          <div class="cg-toggle-hint cg-hint">¿Tienes un dominio personalizado configurado con GitHub Pages? <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site" target="_blank" rel="noopener">Aprende cómo configurarlo</a></div>
        </div>
      </div>

      <div id="cg-custom-domain-fields" class="cg-optional-fields">
        <div class="cg-row">
          <label class="cg-label" for="cg-domain-url">URL del dominio</label>
          <div class="cg-field">
            <input type="text" id="cg-domain-url" class="cg-input" placeholder="https://minombre.org">
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
            <label class="cg-toggle-label" for="cg-root-domain">Servir desde el dominio raíz</label>
            <div class="cg-toggle-hint cg-hint">Cuando está activado, tu sitio se sirve desde la raíz del dominio. Cuando está desactivado, se sirve en dominio.com/nombre-repo.</div>
          </div>
        </div>
      </div>
    </div>

    <div id="cg-manual-fields" class="cg-optional-fields">
      <div class="cg-row">
        <label class="cg-label" for="cg-manual-url">URL</label>
        <div class="cg-field">
          <input type="text" id="cg-manual-url" class="cg-input" placeholder="https://misitio.org">
          <div class="cg-error-msg" id="cg-manual-url-error"></div>
          <div class="cg-hint">El dominio base de tu sitio</div>
        </div>
      </div>
      <div class="cg-row">
        <label class="cg-label" for="cg-manual-baseurl">Baseurl</label>
        <div class="cg-field">
          <input type="text" id="cg-manual-baseurl" class="cg-input" placeholder="/mi-sitio">
          <div class="cg-hint">Ruta después del dominio. Déjalo vacío para servir desde la raíz.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. Integración con Google Sheets -->
  <div class="cg-section">
    <h3>Integración con Google Sheets</h3>
    <p class="cg-section-desc">Administra tu contenido a través de Google Sheets en vez de editar archivos CSV directamente. Telar obtiene tus datos automáticamente en cada <em>build</em>.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-gsheets-toggle" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-gsheets-toggle">Activar Google Sheets</label>
        <div class="cg-toggle-hint cg-hint">Cuando está desactivado, Telar usa los archivos CSV de tu repositorio — asegúrate de tenerlos en <code>components/structures/</code></div>
      </div>
    </div>

    <div id="cg-gsheets-fields" class="cg-optional-fields cg-visible">
      <div class="cg-row">
        <label class="cg-label" for="cg-gsheets-shared">URL compartida</label>
        <div class="cg-field">
          <input type="text" id="cg-gsheets-shared" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing">
          <div class="cg-error-msg" id="cg-gsheets-shared-error"></div>
          <div class="cg-warn-msg" id="cg-gsheets-shared-warn"></div>
          <div class="cg-hint">Comparte tu hoja de Google con "Cualquier persona con el enlace" (acceso de Visor)</div>
        </div>
      </div>
      <div class="cg-row">
        <label class="cg-label" for="cg-gsheets-published">URL publicada</label>
        <div class="cg-field">
          <input type="text" id="cg-gsheets-published" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/e/your-published-id/pubhtml">
          <div class="cg-error-msg" id="cg-gsheets-published-error"></div>
          <div class="cg-warn-msg" id="cg-gsheets-published-warn"></div>
          <div class="cg-hint">Desde Archivo → Compartir → Publicar en la web. Se requieren ambas URLs.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Interfaz de historias -->
  <div class="cg-section">
    <h3>Interfaz de historias</h3>
    <p class="cg-section-desc">Controla cómo se muestran y se comportan las historias en tu sitio. Estos ajustes afectan al visor de historias y la presentación en la página de inicio.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-on-homepage" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-on-homepage">Mostrar historias en la página de inicio</label>
        <div class="cg-toggle-hint cg-hint">Cuando está activado, las tarjetas de historia aparecen en la página de inicio. Las historias siguen siendo accesibles por navegación cuando está desactivado.</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-story-steps" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-story-steps">Mostrar indicadores de paso en las historias</label>
        <div class="cg-toggle-hint cg-hint">Muestra "Paso 1", "Paso 2", etc. al desplazarte por una historia. Es puramente visual.</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-object-credits" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-object-credits">Mostrar créditos de objetos</label>
        <div class="cg-toggle-hint cg-hint">Muestra un distintivo de créditos desplegable en la esquina inferior izquierda del visor de historias. La información de créditos siempre aparece en la tabla de metadatos.</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-include-demo-content" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-include-demo-content">Incluir contenido de demostración</label>
        <div class="cg-toggle-hint cg-hint">Obtiene historias de demostración del servidor de contenido de Telar. Muestran un distintivo "Demo" y ayudan a los nuevos usuarios a explorar la interfaz. Desactívalo en sitios en producción.</div>
      </div>
    </div>
  </div>

  <!-- 5. Interfaz de la colección -->
  <div class="cg-section">
    <h3>Interfaz de la colección</h3>
    <p class="cg-section-desc">Controla cómo se muestra y se comporta la galería de objetos, incluyendo filtrado, búsqueda y presentación en la página de inicio.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-browse-and-search" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-browse-and-search">Mostrar la interfaz completa de exploración y búsqueda</label>
        <div class="cg-toggle-hint cg-hint">Activa la barra lateral de filtros con facetas en la página de objetos</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-link-on-homepage" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-link-on-homepage">Mostrar enlace a objetos en la página de inicio</label>
        <div class="cg-toggle-hint cg-hint">Muestra un enlace "Ver los objetos" en la página de inicio</div>
      </div>
    </div>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-show-sample-on-homepage" checked>
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-show-sample-on-homepage">Mostrar una muestra de objetos en la página de inicio</label>
        <div class="cg-toggle-hint cg-hint">Muestra en la página de inicio los objetos marcados como destacados en tu objects.csv</div>
      </div>
    </div>

    <div class="cg-row">
      <label class="cg-label" for="cg-featured-count">Cantidad de destacados</label>
      <div class="cg-field">
        <input type="number" id="cg-featured-count" class="cg-input cg-input--number" value="4" min="1">
        <div class="cg-hint">Número de objetos a mostrar en la muestra de la página de inicio</div>
      </div>
    </div>
  </div>

  <!-- 6. Historias privadas -->
  <div class="cg-section">
    <h3>Historias privadas</h3>
    <p class="cg-section-desc">Encripta las historias para que solo los espectadores con la clave correcta puedan acceder a ellas. Las historias con <code>private: yes</code> en tu project.csv (o en la pestaña Proyecto de Google Sheets) se encriptarán durante el <em>build</em>.</p>

    <div class="cg-toggle-row">
      <label class="cg-toggle">
        <input type="checkbox" id="cg-protection-toggle">
        <span class="cg-track"></span>
      </label>
      <div class="cg-toggle-info">
        <label class="cg-toggle-label" for="cg-protection-toggle">Activar historias privadas</label>
        <div class="cg-toggle-hint cg-hint">Usa encriptación del lado del cliente. Previene el acceso casual, pero no es adecuado para contenido altamente sensible.</div>
      </div>
    </div>

    <div id="cg-protection-fields" class="cg-optional-fields">
      <div class="cg-row">
        <label class="cg-label" for="cg-secret-key">Clave secreta</label>
        <div class="cg-field">
          <input type="text" id="cg-secret-key" class="cg-input" placeholder="tu-clave-secreta">
          <div class="cg-error-msg" id="cg-secret-key-error"></div>
          <div class="cg-warn-msg" id="cg-secret-key-warn"></div>
          <div class="cg-hint">Los espectadores acceden a las historias protegidas mediante <code>?key=tu-clave-secreta</code></div>
        </div>
      </div>
    </div>
  </div>

  <!-- 7. Acciones -->
  <div class="cg-actions">
    <button id="cg-generate" class="cg-button" type="button">Generar</button>
    <button id="cg-copy" class="cg-button" type="button" style="display: none;">Copiar</button>
    <span id="cg-copied" class="cg-copied">¡Copiado!</span>
  </div>

  <!-- 8. Salida -->
  <div id="cg-output-wrapper" class="cg-output-wrapper">
    <p class="cg-output-heading">Archivo _config.yml generado</p>
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

  function validateSheetsShared() {
    clearField('cg-gsheets-shared');
    if (!document.getElementById('cg-gsheets-toggle').checked) return false;
    var sharedUrl = document.getElementById('cg-gsheets-shared').value.trim();
    if (!sharedUrl) {
      showError('cg-gsheets-shared', 'Ingresa la URL compartida de Google Sheets');
      return true;
    }
    if (!sharedUrl.includes('docs.google.com/spreadsheets')) {
      showWarn('cg-gsheets-shared', 'Esta URL no parece ser de Google Sheets — asegúrate de compartir desde Google Sheets');
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
