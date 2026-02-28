---
layout: docs
title: "3.3. Validador de configuración"
parent: "3. Configura tu proyecto"
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/configurar/validador-de-configuracion/
extra_css:
  - config-tools
---

# Validador de Configuración

Pega tu `_config.yml` de Telar a continuación para verificar errores comunes de configuración. El validador revisa la sintaxis YAML, los campos obligatorios y los ajustes específicos de Telar.

Tu configuración nunca se envía a ningún servidor — todo se ejecuta en tu navegador.


<div class="cv-container">
  <div class="cv-editor">
    <div class="cv-lines" id="cv-lines" aria-hidden="true">1</div>
    <textarea id="cv-input" class="cv-textarea" placeholder="Pega el contenido completo de tu _config.yml aquí..."></textarea>
  </div>
  <div class="cv-actions">
    <button id="cv-validate" class="cv-button" type="button">Validar</button>
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
      return 'Es probable que falte un espacio después de los dos puntos (:), o que haya un problema de indentación cerca de esta línea. Verifica que cada ajuste tenga un espacio después de los dos puntos (ej., title: "Mi sitio") y que los elementos anidados estén indentados con espacios, no tabulaciones.';
    }
    if (r.indexOf('bad indentation') !== -1) {
      return 'La indentación es incorrecta cerca de esta línea. YAML usa espacios (no tabulaciones) para anidar. Elementos como shared_url bajo google_sheets: deben tener exactamente 2 espacios de indentación.';
    }
    if (r.indexOf('colon is missed') !== -1 || r.indexOf('mapping values are not allowed') !== -1) {
      return 'Parece que falta un signo de dos puntos (:) o está mal ubicado. Cada ajuste necesita dos puntos seguidos de un espacio entre el nombre y el valor (ej., title: "Mi sitio").';
    }
    if (r.indexOf('did not find expected') !== -1) {
      return 'Falta un carácter de cierre. Revisa si hay comillas (\"), corchetes o llaves sin cerrar cerca de esta línea.';
    }
    if (r.indexOf('duplicated mapping key') !== -1) {
      return 'Este nombre de ajuste aparece más de una vez. Cada ajuste debe aparecer solo una vez en el archivo.';
    }
    if (r.indexOf('block end') !== -1) {
      return 'La indentación no coincide con la estructura esperada. Asegúrate de que los elementos al mismo nivel tengan la misma cantidad de espacios.';
    }
    if (r.indexOf('flow collection') !== -1 || r.indexOf('expected \',\'') !== -1) {
      return 'Se abrió un corchete o llave que nunca se cerró, o falta una coma dentro de una lista. Revisa si hay caracteres [ ] o { } desbalanceados.';
    }
    if (r.indexOf('unexpected end') !== -1) {
      return 'El archivo termina de forma inesperada. Revisa si hay comillas, corchetes o llaves sin cerrar.';
    }
    return null;
  }

  buttonEl.addEventListener('click', function() {
    var raw = inputEl.value;
    resultsEl.innerHTML = '';

    if (!raw.trim()) {
      resultsEl.innerHTML = '<p class="cv-summary">Pega tu _config.yml arriba y haz clic en Validar.</p>';
      return;
    }

    if (typeof jsyaml === 'undefined') {
      resultsEl.innerHTML = '<div class="cv-issue cv-issue--error"><span class="cv-badge cv-badge--error">ERROR</span><span>No se pudo cargar el analizador YAML. Revisa tu conexión a internet e intenta recargar la página.</span></div>';
      return;
    }

    var issues = validate(raw);
    render(issues);
  });

  function validate(raw) {
    var issues = [];
    var lines = raw.split('\n');

    // --- Nivel 1: Sintaxis ---

    for (var i = 0; i < lines.length; i++) {
      if (lines[i].indexOf('\t') !== -1) {
        issues.push({
          s: 'error',
          m: 'Se encontró un carácter de tabulación. YAML requiere espacios para la indentación — reemplaza cada tabulación con 2 espacios.',
          l: i + 1
        });
      }
    }

    // Verificar comillas sin cerrar
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
          m: 'Comillas sin cerrar. Cada " de apertura necesita su " de cierre en la misma línea.',
          l: i + 1
        });
      }
    }
    if (hasQuoteError) return issues;

    // Verificar posibles comentarios sin # (carácter eliminado por accidente)
    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (!trimmed || trimmed.charAt(0) === '#' || trimmed.charAt(0) === '-') continue;
      if (trimmed.indexOf(':') !== -1) continue;
      if (/^---/.test(trimmed)) continue;
      issues.push({
        s: 'warning',
        m: 'Esta línea no parece un ajuste YAML ni un comentario. ¿Eliminaste un carácter # por accidente?',
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
        m: friendly || ('Error de sintaxis YAML: ' + e.reason),
        l: e.mark ? e.mark.line + 1 : null,
        d: friendly ? e.reason : null
      });
      return issues;
    }

    if (typeof config !== 'object' || config === null) {
      issues.push({
        s: 'error',
        m: 'El archivo de configuración debe contener pares clave-valor de YAML, no un solo valor.'
      });
      return issues;
    }

    // --- Nivel 2: Campos obligatorios ---

    if (!config.title || (typeof config.title === 'string' && !config.title.trim())) {
      issues.push({ s: 'error', m: '"title" falta o está vacío. Tu sitio necesita un título.' });
    }

    checkUrl(config, issues);
    checkBaseurl(config, issues);

    // --- Nivel 3: Ajustes de Telar ---

    checkTheme(config, issues);
    checkLanguage(config, issues);
    checkGoogleSheets(config, issues);
    checkStoryKey(config, issues);

    // --- Nivel 4: Advertencias útiles ---

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
        m: '"url" falta o está vacío. Establécelo como el dominio base de tu sitio (ej., "https://usuario.github.io").'
      });
      return;
    }
    var url = String(config.url);
    if (!/^https?:\/\//.test(url)) {
      issues.push({
        s: 'error',
        m: '"url" debe comenzar con "https://" (ej., "https://usuario.github.io").'
      });
    } else if (/^http:\/\//.test(url)) {
      issues.push({
        s: 'warning',
        m: '"url" usa http:// en lugar de https://. La mayoría de sitios en GitHub Pages deben usar https://.'
      });
    }
  }

  function checkBaseurl(config, issues) {
    if (!config.hasOwnProperty('baseurl')) {
      issues.push({
        s: 'error',
        m: '"baseurl" falta. Establécelo como el nombre de tu repositorio (ej., "/mi-repo") o "" para dominios raíz.'
      });
      return;
    }
    var bu = config.baseurl;
    if (bu === null || bu === '') return;
    var buStr = String(bu);
    if (buStr !== buStr.toLowerCase()) {
      issues.push({
        s: 'warning',
        m: '"baseurl" contiene mayúsculas. Debe estar todo en minúsculas para coincidir con el nombre de tu repositorio.'
      });
    }
    if (buStr.charAt(0) !== '/') {
      issues.push({
        s: 'warning',
        m: '"baseurl" debe comenzar con "/" (ej., "/mi-repo").'
      });
    }
    if (buStr.length > 1 && buStr.charAt(buStr.length - 1) === '/') {
      issues.push({
        s: 'warning',
        m: '"baseurl" no debe tener una barra al final. Usa "/mi-repo", no "/mi-repo/".'
      });
    }
  }

  function checkTheme(config, issues) {
    if (config.telar_theme === undefined) return;
    var theme = String(config.telar_theme);
    if (KNOWN_THEMES.indexOf(theme) === -1) {
      issues.push({
        s: 'warning',
        m: 'Tema no reconocido "' + theme + '". Los temas incluidos son: ' + KNOWN_THEMES.join(', ') + '. Si es un tema personalizado, asegúrate de haber agregado el archivo CSS correspondiente.'
      });
    }
  }

  function checkLanguage(config, issues) {
    if (config.telar_language === undefined) return;
    var lang = String(config.telar_language);
    if (lang !== 'en' && lang !== 'es') {
      issues.push({
        s: 'warning',
        m: '"telar_language" debe ser "en" o "es". Se encontró "' + lang + '".'
      });
    }
  }

  function checkGoogleSheets(config, issues) {
    if (!config.google_sheets) {
      issues.push({
        s: 'info',
        m: 'No se encontró la sección "google_sheets". La integración con Sheets no está configurada — Telar usará los archivos CSV de tu repositorio.'
      });
      return;
    }
    var gs = config.google_sheets;
    if (gs.hasOwnProperty('enabled') && typeof gs.enabled !== 'boolean') {
      issues.push({
        s: 'error',
        m: '"google_sheets.enabled" debe ser true o false, pero se encontró "' + gs.enabled + '". Quita las comillas — escribe solo true o false, no "true" ni "false".'
      });
      return;
    }
    if (!gs.enabled) {
      if (gs.shared_url || gs.published_url) {
        issues.push({
          s: 'warning',
          m: '"google_sheets" tiene URLs pero "enabled" no está en true. Pon "enabled: true" para usar la integración con Google Sheets.'
        });
      }
      return;
    }
    if (!gs.shared_url || (typeof gs.shared_url === 'string' && !gs.shared_url.trim())) {
      issues.push({
        s: 'error',
        m: '"google_sheets.shared_url" falta o está vacío. Necesitas tanto la URL compartida como la URL publicada.'
      });
    }
    if (!gs.published_url || (typeof gs.published_url === 'string' && !gs.published_url.trim())) {
      issues.push({
        s: 'error',
        m: '"google_sheets.published_url" falta o está vacío. Necesitas tanto la URL compartida como la URL publicada.'
      });
    }
    if (gs.shared_url && gs.published_url && gs.shared_url === gs.published_url) {
      issues.push({
        s: 'error',
        m: '"shared_url" y "published_url" son la misma URL. Deben ser dos URLs diferentes — una para compartir, otra para publicar.'
      });
    }
  }

  function checkStoryKey(config, issues) {
    if (!config.story_key) return;
    var key = String(config.story_key).toLowerCase();
    if (WEAK_KEYS.indexOf(key) !== -1) {
      issues.push({
        s: 'warning',
        m: '"story_key" tiene un valor fácil de adivinar. Considera usar una clave más segura para las historias protegidas.'
      });
    }
  }

  function checkInterfaces(config, issues) {
    if (!config.story_interface) {
      issues.push({
        s: 'info',
        m: 'No se encontró la sección "story_interface". Se usarán los ajustes predeterminados para la visualización de historias.'
      });
    } else {
      checkBooleanFields(config.story_interface, 'story_interface', [
        'show_on_homepage', 'show_story_steps', 'show_object_credits', 'include_demo_content'
      ], issues);
    }
    if (!config.collection_interface) {
      issues.push({
        s: 'info',
        m: 'No se encontró la sección "collection_interface". Se usarán los ajustes predeterminados para la galería de objetos.'
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
          m: '"' + label + '" debe ser true o false, pero se encontró "' + obj[key] + '". Quita las comillas — escribe solo true o false, no "true" ni "false".'
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
        m: 'Tu "url" parece un dominio de GitHub Pages, pero "baseurl" está vacío. En GitHub Pages, baseurl generalmente debe ser el nombre de tu repositorio (ej., "/mi-repo").'
      });
    }
  }

  function checkReadOnlySection(config, issues) {
    var warns = [];
    if (config.markdown && config.markdown !== 'kramdown') {
      warns.push('"markdown" está en "' + config.markdown + '" en lugar de "kramdown"');
    }
    if (config.permalink && config.permalink !== 'pretty') {
      warns.push('"permalink" está en "' + config.permalink + '" en lugar de "pretty"');
    }
    if (config.collections_dir && config.collections_dir !== '_jekyll-files') {
      warns.push('"collections_dir" está en "' + config.collections_dir + '" en lugar de "_jekyll-files"');
    }
    if (warns.length > 0) {
      issues.push({
        s: 'warning',
        m: 'La sección de solo lectura tiene valores no estándar: ' + warns.join('; ') + '. Estos ajustes están preconfigurados por Telar y normalmente no deben cambiarse.'
      });
    }
  }

  function render(issues) {
    if (issues.length === 0) {
      resultsEl.innerHTML = '<div class="cv-issue cv-issue--success"><span class="cv-badge cv-badge--success">OK</span><span>No se encontraron problemas. Tu configuración se ve bien.</span></div>';
      return;
    }

    var counts = { error: 0, warning: 0, info: 0 };
    for (var i = 0; i < issues.length; i++) {
      counts[issues[i].s]++;
    }

    var parts = [];
    if (counts.error > 0) parts.push(counts.error + ' error' + (counts.error > 1 ? 'es' : ''));
    if (counts.warning > 0) parts.push(counts.warning + ' advertencia' + (counts.warning > 1 ? 's' : ''));
    if (counts.info > 0) parts.push(counts.info + ' nota' + (counts.info > 1 ? 's' : ''));

    var total = counts.error + counts.warning + counts.info;
    var verb = total === 1 ? 'Se encontró' : 'Se encontraron';
    var html = '<p class="cv-summary">' + verb + ' ' + parts.join(', ') + ':</p>';

    for (var i = 0; i < issues.length; i++) {
      var issue = issues[i];
      var lineStr = issue.l ? '<span class="cv-line">Línea ' + issue.l + ':</span> ' : '';
      var detailStr = issue.d ? '<span class="cv-detail">Mensaje del parser: ' + esc(issue.d) + '</span>' : '';
      var label = issue.s === 'error' ? 'error' : (issue.s === 'warning' ? 'aviso' : 'nota');
      html += '<div class="cv-issue cv-issue--' + issue.s + '">';
      html += '<span class="cv-badge cv-badge--' + issue.s + '">' + label + '</span>';
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

## Qué se verifica

1. **Sintaxis YAML** — Detecta errores de análisis, tabulaciones y comillas sin cerrar, con números de línea
2. **Campos obligatorios** — Verifica que `title`, `url` y `baseurl` estén presentes y con el formato correcto
3. **Ajustes de Telar** — Valida nombres de tema, códigos de idioma, URLs de Google Sheets y formato de baseurl
4. **Advertencias útiles** — Notas sobre ajustes predeterminados, errores comunes en GitHub Pages y la sección de solo lectura

## Véase también

- [Referencia de Configuración](/guia/configurar/configuracion/) — Lista completa de todos los ajustes de `_config.yml`
- [Generador y editor de configuración](/guia/configurar/generador-de-configuracion/) — Genera o edita un archivo `_config.yml`
- [Inicio rápido](/guia/primeros-pasos/inicio-rapido/) — Guía paso a paso de configuración
