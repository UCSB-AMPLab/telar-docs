---
layout: docs
title: 2.1b. Inicio rápido guiado
parent: 2. Configura tu sitio
grand_parent: Documentación
nav_order: 1.5
lang: es
permalink: /guia/flujos-de-trabajo/inicio-rapido-guiado/
extra_css:
  - config-tools
---

# Primeros pasos

Esta guía te lleva paso a paso por la configuración de tu primera exhibición con Telar. A medida que avanzas, vas a ingresar algunos datos — tu nombre de usuario de GitHub, el enlace de tu hoja de cálculo de Google, un título para tu sitio. Al final, esta página reúne todo en un archivo de configuración que puedes descargar o copiar y pegar en tu repositorio.

Vas a necesitar:
- Una [cuenta de GitHub](https://github.com/join) (gratis)
- Una [cuenta de Google](https://accounts.google.com/) para Google Sheets (gratis)

{: .tip }
> **¿Ya conoces GitHub Pages y YAML?** Puedes configurar todo manualmente con la [guía de inicio rápido](/guia/flujos-de-trabajo/interfaz-web-github/).

La configuración puede parecer muchos pasos, pero solo tienes que hacerla una vez. Después de eso, todo se maneja desde tu hoja de cálculo de Google Sheets.

---

## Crea tu repositorio

Un repositorio es el espacio de tu proyecto en GitHub — allí se guardan tu archivo de configuración y tus imágenes.

1. Visita la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar)
2. Haz clic en el botón verde **Use this template**
3. Elige **Create a new repository**
4. Dale un nombre a tu repositorio — **usa solo letras minúsculas y guiones** (ej., `mi-exhibicion`) — este nombre será parte de la dirección web de tu sitio
5. Asegúrate de que **Public** esté seleccionado
6. Haz clic en **Create repository**

{: .warning }
> **Mantén tu repositorio público.** Los repositorios privados no funcionan con GitHub Pages a menos que tengas un plan de pago en GitHub.

Ingresa tus datos de GitHub a continuación. Se usan para construir la dirección web de tu sitio y para generar tu archivo de configuración al final.

<div class="gqs-field-group" id="gqs-repo-group">
  <div class="gqs-panel-title">Tus datos de GitHub</div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-username">Usuario de GitHub</label>
    <div class="cg-field">
      <input type="text" id="gqs-username" class="cg-input" placeholder="usuario">
      <div class="cg-error-msg" id="gqs-username-error"></div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-repo">Nombre del repositorio</label>
    <div class="cg-field">
      <input type="text" id="gqs-repo" class="cg-input" placeholder="mi-exhibicion">
      <div class="cg-error-msg" id="gqs-repo-error"></div>
      <div class="cg-warn-msg" id="gqs-repo-warn"></div>
    </div>
  </div>
  <div class="gqs-url-preview-separator"></div>
  <div class="gqs-url-preview">
    <div class="gqs-url-preview-label">Tu sitio estará en:</div>
    <div class="gqs-url-preview-value" id="gqs-url-preview" aria-live="polite">
      https://<span class="gqs-placeholder">usuario</span>.github.io/<span class="gqs-placeholder">mi-exhibicion</span>
    </div>
  </div>
</div>

## Activa GitHub Pages

GitHub Pages convierte tu repositorio en un sitio web en vivo, de forma gratuita.

1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Haz clic en **Save**

## Duplica la plantilla de Google Sheets

Tu hoja de cálculo de Google Sheets es donde manejas todo tu contenido — objetos, historias y textos.

1. Abre [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Haz clic en **Archivo** → **Hacer una copia**
3. Guárdala en tu Google Drive con un nombre que recuerdes (ej., "Mi exhibición Telar")

## Comparte y publica tu hoja de cálculo

Tu hoja de cálculo necesita dos tipos de acceso para que Telar pueda leer tu contenido.

**Comparte tu hoja de cálculo:**

1. Haz clic en el botón **Compartir** en Google Sheets
2. Configura el acceso como "Cualquier persona con el enlace" con permisos de **Lector**
3. Copia la URL compartida y pégala a continuación

**Publica tu hoja de cálculo:**

1. Ve a **Archivo** → **Compartir** → **Publicar en la Web**
2. Haz clic en **Publicar**
3. Copia la URL publicada y pégala a continuación

<div class="gqs-field-group" id="gqs-sheets-group">
  <div class="gqs-panel-title">Tus URLs de Google Sheets</div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-shared-url">URL compartida</label>
    <div class="cg-field">
      <input type="text" id="gqs-shared-url" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/tu-id-de-hoja/edit?usp=sharing">
      <div class="cg-error-msg" id="gqs-shared-url-error"></div>
      <div class="cg-warn-msg" id="gqs-shared-url-warn"></div>
      <div class="cg-hint">La URL del cuadro de diálogo Compartir (acceso de Lector)</div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-published-url">URL publicada</label>
    <div class="cg-field">
      <input type="text" id="gqs-published-url" class="cg-input" placeholder="https://docs.google.com/spreadsheets/d/e/tu-id-publicado/pubhtml">
      <div class="cg-error-msg" id="gqs-published-url-error"></div>
      <div class="cg-warn-msg" id="gqs-published-url-warn"></div>
      <div class="cg-hint">Desde Archivo → Compartir → Publicar en la Web. Es una URL diferente a la anterior.</div>
    </div>
  </div>
</div>

## Genera tu configuración

Completa los datos restantes y esta página creará tu archivo de configuración.

<div class="gqs-field-group" id="gqs-site-group">
  <div class="gqs-panel-title">Datos del sitio</div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-title">Título</label>
    <div class="cg-field">
      <input type="text" id="gqs-title" class="cg-input" placeholder="Mi Exhibición Narrativa">
      <div class="cg-warn-msg" id="gqs-title-warn"></div>
      <div class="cg-hint">El nombre de tu sitio, visible en la pestaña del navegador y en el encabezado</div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-description">Descripción <span class="cg-optional">(opcional)</span></label>
    <div class="cg-field">
      <input type="text" id="gqs-description" class="cg-input" placeholder="Una breve descripción de tu exhibición">
      <div class="cg-hint">Se usa para metadatos de motores de búsqueda y vistas previas en redes sociales</div>
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-author">Autor <span class="cg-optional">(opcional)</span></label>
    <div class="cg-field">
      <input type="text" id="gqs-author" class="cg-input" placeholder="Tu Nombre">
    </div>
  </div>
  <div class="cg-row">
    <label class="cg-label" for="gqs-theme">Tema</label>
    <div class="cg-field">
      <select id="gqs-theme" class="cg-select">
        <option value="paisajes" selected>paisajes</option>
        <option value="neogranadina">neogranadina</option>
        <option value="santa-barbara">santa-barbara</option>
        <option value="austin">austin</option>
      </select>
      <div class="cg-hint">Controla la paleta de colores y el estilo visual de tu sitio</div>
    </div>
  </div>
</div>

<div class="gqs-actions">
  <button id="gqs-generate" class="cg-button" type="button">Generar _config.yml</button>
</div>

<div id="gqs-output-wrapper" class="gqs-output-wrapper">
  <p class="gqs-output-heading">Tu _config.yml</p>
  <div class="cv-editor">
    <div class="cv-lines" id="gqs-lines" aria-hidden="true">1</div>
    <textarea id="gqs-output" class="cv-textarea" readonly wrap="off"></textarea>
  </div>
</div>

<div class="gqs-actions" id="gqs-output-actions" style="display: none;">
  <button id="gqs-copy" class="cg-button" type="button">Copiar</button>
  <button id="gqs-download" class="gqs-button--secondary" type="button">Descargar</button>
  <span id="gqs-copied" class="gqs-copied">¡Copiado!</span>
</div>

Una vez generado:

1. En tu repositorio de GitHub, navega a `_config.yml` y haz clic en el ícono de lápiz para editar
2. Selecciona todo el contenido existente y reemplázalo con lo que copiaste o descargaste
3. Haz clic en **Commit changes** para guardar

## Verifica tu configuración

Después de guardar, GitHub Actions construirá y publicará tu sitio automáticamente. Esto toma entre 2 y 5 minutos.

1. Haz clic en la pestaña **Actions** para ver el progreso de la construcción
2. Cuando termine, visita tu sitio en la URL que aparece en la vista previa arriba
3. Deberías ver un sitio Telar con tu título y el contenido de demostración predeterminado

{: .warning }
> **¿Problemas con la construcción?** Los errores más comunes son URLs de Google Sheets que no coinciden (necesitas tanto la URL compartida como la URL publicada — son diferentes). Si tu sitio no aparece, revisa la pestaña Actions para ver los detalles del error. También puedes pegar tu `_config.yml` en el [Validador de configuración de Telar](/guia/referencia/validador-de-configuracion/) para verificar errores.

---

## Próximos pasos

Tu sitio Telar ya está funcionando. Ahora es momento de agregar tu propio contenido.

- **[Agrega tu contenido](/guia/flujos-de-trabajo/interfaz-web-github/#parte-2-agrega-tu-contenido)** — Sube imágenes, llena tu hoja de cálculo y crea tu primera historia
- **[Coordenadas de imagen](/guia/flujos-de-trabajo/interfaz-web-github/#ajusta-las-coordenadas-de-imagen)** — Enfoca detalles específicos en tus imágenes
- **[Ir más allá](/guia/flujos-de-trabajo/hibrido/)** — Enriquece los paneles con archivos markdown y widgets interactivos
- **[Temas](/guia/personalizacion/temas/)** — Personaliza la apariencia de tu sitio

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
      : '<span class="gqs-placeholder">usuario</span>';
    html += '.github.io/';
    html += repo
      ? '<span class="gqs-user-text">' + esc(repo) + '</span>'
      : '<span class="gqs-placeholder">mi-exhibicion</span>';
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
    if (!val) { showError('gqs-username', 'Obligatorio \u2014 se usa para construir la URL de GitHub Pages'); return true; }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(val)) {
      showError('gqs-username', 'Los nombres de usuario de GitHub solo pueden contener letras, n\u00fameros y guiones, y no pueden empezar con un gui\u00f3n');
      return true;
    }
    return false;
  }

  function validateRepo() {
    clearField('gqs-repo');
    var val = repoEl.value.trim();
    if (!val) { showError('gqs-repo', 'Obligatorio \u2014 se usa para construir la URL de GitHub Pages'); return true; }
    if (/\s/.test(val)) { showError('gqs-repo', 'Los nombres de repositorio no pueden contener espacios \u2014 usa guiones (ej. mi-exhibicion)'); return true; }
    if (!/^[a-zA-Z0-9._-]+$/.test(val)) { showError('gqs-repo', 'Los nombres de repositorio solo pueden contener letras, n\u00fameros, guiones, guiones bajos y puntos'); return true; }
    if (/[A-Z]/.test(val)) { showWarn('gqs-repo', 'Por convenci\u00f3n, los nombres de repositorio en GitHub van en min\u00fasculas'); }
    return false;
  }

  function validateSharedUrl() {
    clearField('gqs-shared-url');
    var val = sharedUrlEl.value.trim();
    if (!val) { showError('gqs-shared-url', 'Ingresa la URL compartida de tu hoja de Google Sheets'); return true; }
    if (!val.includes('docs.google.com/spreadsheets')) {
      showWarn('gqs-shared-url', 'Esto no parece ser una URL de Google Sheets');
    } else if (/\/e\/.*\/pub/.test(val)) {
      showError('gqs-shared-url', 'Esta parece ser una URL publicada, no una URL compartida. La URL compartida viene del bot\u00f3n Compartir y contiene /edit');
      return true;
    }
    var pubVal = publishedUrlEl.value.trim();
    if (val && pubVal && val === pubVal) {
      showError('gqs-shared-url', 'Esta es la misma URL publicada \u2014 la URL compartida y la publicada son diferentes');
      return true;
    }
    return false;
  }

  function validatePublishedUrl() {
    clearField('gqs-published-url');
    var val = publishedUrlEl.value.trim();
    if (!val) { showError('gqs-published-url', 'Ingresa la URL publicada de tu hoja de Google Sheets'); return true; }
    if (!val.includes('docs.google.com/spreadsheets')) {
      showWarn('gqs-published-url', 'Esto no parece ser una URL de Google Sheets');
    } else if (val.includes('/edit')) {
      showError('gqs-published-url', 'Esta parece ser una URL compartida/de edici\u00f3n, no una URL publicada. Ve a Archivo \u2192 Compartir \u2192 Publicar en la Web para obtener la URL publicada');
      return true;
    }
    var sharedVal = sharedUrlEl.value.trim();
    if (val && sharedVal && val === sharedVal) {
      showError('gqs-published-url', 'Esta es la misma URL compartida \u2014 la URL publicada es diferente. Ve a Archivo \u2192 Compartir \u2192 Publicar en la Web para obtenerla');
      return true;
    }
    return false;
  }

  function validateTitle() {
    clearField('gqs-title');
    if (!titleEl.value.trim()) {
      showWarn('gqs-title', 'El t\u00edtulo de tu sitio aparecer\u00e1 en blanco \u2014 siempre puedes a\u00f1adirlo despu\u00e9s');
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
    validateTitle();
    var hasErrors = false;
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
    generateBtn.textContent = 'Regenerar';

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
telar_language: "es"

# Google Sheets Integration
# See https://telar.org/docs/workflows/google-sheets/ for detailed setup instructions.
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
