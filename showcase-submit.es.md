---
layout: section
title: "Comparte tu proyecto hecho con Telar"
description: "Cuéntanos del sitio que hiciste con Telar para que lo incluyamos en la sección de proyectos."
lang: es
permalink: /proyectos/compartir/
nav_exclude: true
section_title: Proyectos
extra_css:
  - showcase
---

<img class="sc-mark" src="{{ '/images/telar-icon.svg' | relative_url }}" alt="" aria-hidden="true" width="724" height="506">

# Comparte tu proyecto hecho con Telar

<p class="sc-lede">Estamos reuniendo sitios hechos con Telar y nos encantaría incluir el tuyo. Cuéntanos un poco de él aquí abajo; te toma unos cinco minutos. Solo mostramos un sitio si quienes lo hicieron nos dan permiso en la última pregunta, y te escribiremos antes de publicar nada.</p>

<div id="sc-alert" class="sc-callout sc-callout--error" role="alert" hidden></div>

<form id="sc-form" class="sc-form" novalidate>

  <div class="sc-q" data-field="title">
    <label class="sc-label" for="sc-title">Título del proyecto</label>
    <input class="sc-input" id="sc-title" name="title" type="text" maxlength="200">
    <p class="sc-error" id="sc-error-title" hidden></p>
  </div>

  <div class="sc-q" data-field="url">
    <label class="sc-label" for="sc-url">Enlace del proyecto</label>
    <p class="sc-help">El enlace público a tu sitio.</p>
    <input class="sc-input" id="sc-url" name="url" type="text" inputmode="url" autocomplete="url" maxlength="500">
    <p class="sc-error" id="sc-error-url" hidden></p>
  </div>

  <div class="sc-q" data-field="description">
    <label class="sc-label" for="sc-description">Cuéntanos del proyecto</label>
    <p class="sc-help">¿De qué trata y con qué fuentes u objetos trabajaste? Con dos o tres frases basta.</p>
    <textarea class="sc-textarea" id="sc-description" name="description" maxlength="3000"></textarea>
    <p class="sc-error" id="sc-error-description" hidden></p>
  </div>

  <fieldset class="sc-q" data-field="language">
    <legend class="sc-label">¿En qué idioma está el sitio?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="language" value="es" checked> Español</label>
      <label class="sc-radio"><input type="radio" name="language" value="en"> Inglés</label>
      <label class="sc-radio"><input type="radio" name="language" value="other"> Otro</label>
    </div>
    <p class="sc-error" id="sc-error-language" hidden></p>
    <div class="sc-followup" hidden>
      <label class="sc-label sc-label--sub" for="sc-language-other">¿Qué idioma?</label>
      <input class="sc-input" id="sc-language-other" name="languageOther" type="text" maxlength="100">
    </div>
  </fieldset>

  <fieldset class="sc-q" data-field="context">
    <legend class="sc-label">¿En qué contexto lo hiciste?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="context" value="class"> Un trabajo de clase</label>
      <label class="sc-radio"><input type="radio" name="context" value="thesis"> Una tesis o trabajo de grado</label>
      <label class="sc-radio"><input type="radio" name="context" value="research"> Un proyecto de investigación</label>
      <label class="sc-radio"><input type="radio" name="context" value="teaching"> Un recurso didáctico</label>
      <label class="sc-radio"><input type="radio" name="context" value="community"> Un proyecto comunitario</label>
      <label class="sc-radio"><input type="radio" name="context" value="personal"> Un proyecto personal</label>
      <label class="sc-radio"><input type="radio" name="context" value="other"> Otro</label>
    </div>
    <p class="sc-error" id="sc-error-context" hidden></p>
    <div class="sc-followup" hidden>
      <label class="sc-label sc-label--sub" for="sc-context-detail">¿Qué curso fue y en qué institución?</label>
      <input class="sc-input" id="sc-context-detail" name="contextDetail" type="text" maxlength="300">
    </div>
  </fieldset>

  <fieldset class="sc-q" data-field="authorship">
    <legend class="sc-label">¿Fue un proyecto individual o grupal?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="authorship" value="individual"> Individual</label>
      <label class="sc-radio"><input type="radio" name="authorship" value="group"> Grupal</label>
    </div>
    <p class="sc-error" id="sc-error-authorship" hidden></p>
  </fieldset>

  <fieldset class="sc-q" data-field="method">
    <legend class="sc-label">¿Cómo armaste el sitio?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="method" value="compositor"> Con el Compositor</label>
      <label class="sc-radio"><input type="radio" name="method" value="sheets"> Con Google Sheets</label>
      <label class="sc-radio"><input type="radio" name="method" value="local"> Con archivos CSV en mi computador</label>
      <label class="sc-radio"><input type="radio" name="method" value="unsure"> No lo sé</label>
    </div>
    <p class="sc-error" id="sc-error-method" hidden></p>
  </fieldset>

  <div class="sc-q" data-field="feedback">
    <label class="sc-label" for="sc-feedback">¿Qué funcionó bien y qué no? <span class="sc-optional">(opcional)</span></label>
    <p class="sc-help">Cualquier cosa del proceso de armar el sitio: qué te facilitó Telar, dónde te enredaste, qué cambiarías. Las respuestas sinceras nos ayudan a mejorar Telar.</p>
    <textarea class="sc-textarea" id="sc-feedback" name="feedback" maxlength="3000"></textarea>
    <p class="sc-error" id="sc-error-feedback" hidden></p>
  </div>

  <div class="sc-q" data-field="name">
    <label class="sc-label" for="sc-name">Nombre completo</label>
    <p class="sc-help" id="sc-name-help" hidden></p>
    <input class="sc-input" id="sc-name" name="name" type="text" autocomplete="name" maxlength="1000">
    <p class="sc-error" id="sc-error-name" hidden></p>
  </div>

  <div class="sc-q" data-field="email">
    <label class="sc-label" for="sc-email">Correo electrónico</label>
    <p class="sc-help">Para escribirte si tenemos preguntas sobre el proyecto. No publicamos tu correo.</p>
    <input class="sc-input" id="sc-email" name="email" type="email" autocomplete="email" maxlength="320">
    <p class="sc-error" id="sc-error-email" hidden></p>
  </div>

  <fieldset class="sc-q" data-field="consent">
    <legend class="sc-label">¿Podemos mostrar el proyecto en telar.org?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="consent" value="named"> Sí, con mi nombre</label>
      <label class="sc-radio"><input type="radio" name="consent" value="anonymous"> Sí, pero sin mi nombre</label>
      <label class="sc-radio"><input type="radio" name="consent" value="contact_first"> Todavía no, escríbanme primero</label>
      <label class="sc-radio"><input type="radio" name="consent" value="no"> No</label>
    </div>
    <p class="sc-error" id="sc-error-consent" hidden></p>
  </fieldset>

  <div class="sc-hp" aria-hidden="true">
    <label for="sc-website">Sitio web</label>
    <input id="sc-website" name="website" type="text" tabindex="-1" autocomplete="off">
  </div>

  {% if site.showcase_turnstile_site_key and site.showcase_turnstile_site_key != "" %}
  <div class="cf-turnstile" data-sitekey="{{ site.showcase_turnstile_site_key }}" data-language="{{ page.lang }}"></div>
  {% endif %}

  <div class="sc-actions">
    <button type="submit" class="sc-btn sc-btn--primary" id="sc-submit">Enviar</button>
    <p class="sc-note" id="sc-note"></p>
  </div>

</form>

<div id="sc-success" class="sc-callout sc-callout--success" role="status" tabindex="-1" hidden>Gracias por compartir tu proyecto. Te escribiremos antes de publicar nada.</div>

{% if site.showcase_turnstile_site_key and site.showcase_turnstile_site_key != "" %}
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
{% endif %}
<script>
(function () {
  'use strict';

  var API = '{{ site.showcase_api }}';
  var form = document.getElementById('sc-form');
  var alertEl = document.getElementById('sc-alert');
  var successEl = document.getElementById('sc-success');
  var button = document.getElementById('sc-submit');
  var note = document.getElementById('sc-note');
  var followup = form.querySelector('.sc-q[data-field="context"] .sc-followup');
  var languageFollowup = form.querySelector('.sc-q[data-field="language"] .sc-followup');
  var contextRadios = form.querySelectorAll('input[name="context"]');
  var languageRadios = form.querySelectorAll('input[name="language"]');
  var authorshipRadios = form.querySelectorAll('input[name="authorship"]');
  var nameLabel = form.querySelector('.sc-q[data-field="name"] .sc-label');
  var nameHelp = document.getElementById('sc-name-help');
  var nameInput = document.getElementById('sc-name');
  var consentInputs = form.querySelectorAll('.sc-q[data-field="consent"] input[name="consent"]');

  var AUTHORSHIP_WORDING = {
    individual: {
      name: 'Nombre completo',
      nameHelp: '',
      consent: {
        named: 'Sí, con mi nombre',
        anonymous: 'Sí, pero sin mi nombre',
        contact_first: 'Todavía no, escríbanme primero',
        no: 'No'
      }
    },
    group: {
      name: 'Integrantes del grupo',
      nameHelp: 'Nombre completo de cada persona, tal como quiere que aparezca en telar.org.',
      consent: {
        named: 'Sí, con nuestros nombres',
        anonymous: 'Sí, pero sin nuestros nombres',
        contact_first: 'Todavía no, escríbannos primero',
        no: 'No'
      }
    }
  };

  var MESSAGES = {
    email: 'Escribe tu correo completo, como nombre@ejemplo.org.',
    url: 'Escribe el enlace público de tu sitio.',
    language: 'Elige una opción.',
    context: 'Elige una opción.',
    authorship: 'Elige una opción.',
    method: 'Elige una opción.',
    consent: 'Elige una opción.',
    other: 'Este campo es obligatorio.'
  };

  var FAILURE = 'No pudimos enviar tus respuestas.';
  var FAILURE_BODY = 'Tu texto sigue aquí. Inténtalo de nuevo en un momento o escríbenos si el problema continúa.';

  var ALLOWED_FIELDS = ['title', 'url', 'description', 'language', 'languageOther', 'context', 'contextDetail', 'authorship', 'method', 'feedback', 'name', 'email', 'consent'];

  // A follow-up answer is reported under its own name but shown on its parent question.
  var FOLLOWUP_PARENT = { contextDetail: 'context', languageOther: 'language' };
  var FOLLOWUP_INPUT = { contextDetail: 'sc-context-detail', languageOther: 'sc-language-other' };

  function value(name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el.length !== undefined && el.type !== 'textarea' && el.type !== 'text' && el.type !== 'email') {
      for (var i = 0; i < el.length; i++) if (el[i].checked) return el[i].value;
      return '';
    }
    return (el.value || '').trim();
  }

  function normaliseUrl(raw) {
    var candidate = /^[a-z][a-z0-9+.\-]*:/i.test(raw) ? raw : 'https://' + raw;
    var parsed;
    try { parsed = new URL(candidate); } catch (e) { return null; }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (parsed.hostname.indexOf('.') === -1) return null;
    return parsed.toString();
  }

  function collect() {
    var turnstile = form.querySelector('[name="cf-turnstile-response"]');
    var language = value('language');
    var context = value('context');
    return {
      name: value('name'),
      email: value('email'),
      title: value('title'),
      url: value('url'),
      description: value('description'),
      language: language,
      languageOther: language === 'other' ? value('languageOther') : '',
      context: context,
      contextDetail: context === 'class' ? value('contextDetail') : '',
      authorship: value('authorship'),
      method: value('method'),
      feedback: value('feedback'),
      consent: value('consent'),
      website: value('website'),
      turnstile: turnstile ? turnstile.value : ''
    };
  }

  function toggleFollowup(detailName, box, show) {
    box.hidden = !show;
    box.style.display = show ? 'flex' : 'none';
    if (!show) {
      var detail = document.getElementById(FOLLOWUP_INPUT[detailName]);
      if (detail) {
        detail.removeAttribute('aria-invalid');
        removeErrorDescribedBy(detail);
      }
      var parentBlock = form.querySelector('.sc-q[data-field="' + FOLLOWUP_PARENT[detailName] + '"]');
      if (parentBlock) {
        parentBlock.classList.remove('is-invalid');
        var err = parentBlock.querySelector('.sc-error');
        if (err) { err.textContent = ''; err.hidden = true; }
        var radios = parentBlock.querySelectorAll('.sc-radio-group input[aria-invalid]');
        for (var i = 0; i < radios.length; i++) {
          radios[i].removeAttribute('aria-invalid');
          removeErrorDescribedBy(radios[i]);
        }
      }
      refreshAlertSummary();
    }
  }

  function syncFollowup() {
    toggleFollowup('contextDetail', followup, value('context') === 'class');
  }

  function syncLanguageFollowup() {
    toggleFollowup('languageOther', languageFollowup, value('language') === 'other');
  }

  function validate(v) {
    var fields = [];
    if (!v.title) fields.push('title');
    if (!v.url || !normaliseUrl(v.url)) fields.push('url');
    if (!v.description) fields.push('description');
    if (!v.language) fields.push('language');
    if (!v.context) fields.push('context');
    if (!v.authorship) fields.push('authorship');
    if (!v.method) fields.push('method');
    if (!v.name) fields.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) fields.push('email');
    if (!v.consent) fields.push('consent');
    return fields;
  }

  function addDescribedBy(el, id) {
    var tokens = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (tokens.indexOf(id) === -1) tokens.push(id);
    el.setAttribute('aria-describedby', tokens.join(' '));
  }

  function removeErrorDescribedBy(el) {
    var tokens = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (t) {
      return t && t.indexOf('sc-error-') !== 0;
    });
    if (tokens.length) el.setAttribute('aria-describedby', tokens.join(' '));
    else el.removeAttribute('aria-describedby');
  }

  function invalidCount() {
    return form.querySelectorAll('.sc-q.is-invalid').length;
  }

  function alertHeading(n) {
    return n === 1 ? 'Revisa un campo más abajo.' : 'Revisa {n} campos más abajo.'.replace('{n}', n);
  }

  function refreshAlertSummary() {
    if (alertEl.hidden) return;
    var n = invalidCount();
    if (!n) { alertEl.hidden = true; alertEl.textContent = ''; return; }
    var strong = alertEl.querySelector('strong');
    if (strong) strong.textContent = alertHeading(n);
  }

  function clearErrors() {
    var blocks = form.querySelectorAll('.sc-q');
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].classList.remove('is-invalid');
      var err = blocks[i].querySelector('.sc-error');
      if (err) { err.textContent = ''; err.hidden = true; }
    }
    var invalidEls = form.querySelectorAll('[aria-invalid]');
    for (var j = 0; j < invalidEls.length; j++) {
      invalidEls[j].removeAttribute('aria-invalid');
      removeErrorDescribedBy(invalidEls[j]);
    }
    alertEl.hidden = true;
    alertEl.textContent = '';
  }

  function markInvalid(fieldName, block) {
    block.classList.add('is-invalid');
    var err = block.querySelector('.sc-error');
    var errId = err ? err.id : '';
    if (FOLLOWUP_INPUT[fieldName]) {
      var detail = document.getElementById(FOLLOWUP_INPUT[fieldName]);
      if (detail) {
        detail.setAttribute('aria-invalid', 'true');
        if (errId) addDescribedBy(detail, errId);
      }
      return;
    }
    var radios = block.querySelectorAll('.sc-radio-group input');
    if (radios.length) {
      for (var i = 0; i < radios.length; i++) {
        radios[i].setAttribute('aria-invalid', 'true');
        if (errId) addDescribedBy(radios[i], errId);
      }
      return;
    }
    var field = block.querySelector('input, textarea');
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      if (errId) addDescribedBy(field, errId);
    }
  }

  function showAlert(heading, body) {
    alertEl.textContent = '';
    var strong = document.createElement('strong');
    strong.textContent = heading;
    alertEl.appendChild(strong);
    alertEl.appendChild(document.createTextNode(body));
    alertEl.hidden = false;
    alertEl.scrollIntoView({ block: 'start' });
  }

  function showErrors(fields) {
    var filtered = [];
    for (var i = 0; i < fields.length; i++) {
      if (ALLOWED_FIELDS.indexOf(fields[i]) !== -1) filtered.push(fields[i]);
    }
    if (!filtered.length) { showFailure(); return; }
    clearErrors();
    var first = null;
    for (var i = 0; i < filtered.length; i++) {
      var name = filtered[i];
      var fieldName = FOLLOWUP_PARENT[name] || name;
      var block = form.querySelector('.sc-q[data-field="' + fieldName + '"]');
      if (!block) continue;
      markInvalid(name, block);
      var err = block.querySelector('.sc-error');
      if (err) {
        err.textContent = MESSAGES[name] || MESSAGES.other;
        err.hidden = false;
      }
      if (!first) first = FOLLOWUP_INPUT[name] ? document.getElementById(FOLLOWUP_INPUT[name]) : block.querySelector('input, textarea');
    }
    var n = filtered.length;
    showAlert(alertHeading(n), 'Todavía no se ha enviado nada.');
    if (first) first.focus();
  }

  function setSending(on) {
    var controls = form.querySelectorAll('input, textarea, button');
    for (var i = 0; i < controls.length; i++) controls[i].disabled = on;
    if (on) {
      button.textContent = '';
      var spinner = document.createElement('span');
      spinner.className = 'sc-spinner';
      spinner.setAttribute('aria-hidden', 'true');
      button.appendChild(spinner);
      button.appendChild(document.createTextNode('Enviando…'));
      note.textContent = 'No cierres esta página.';
    }
  }

  function showSuccess() {
    form.hidden = true;
    alertEl.hidden = true;
    successEl.hidden = false;
    successEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
    successEl.focus();
  }

  function showFailure() {
    if (window.turnstile) window.turnstile.reset();
    setSending(false);
    button.textContent = 'Intentar de nuevo';
    note.textContent = '';
    showAlert(FAILURE, FAILURE_BODY);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var v = collect();
    var fields = validate(v);
    if (fields.length) { showErrors(fields); return; }
    clearErrors();
    v.url = normaliseUrl(v.url);
    setSending(true);

    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 20000);

    fetch(API + '/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v),
      signal: controller.signal
    }).then(function (res) {
      if (res.status === 201) {
        clearTimeout(timeout);
        showSuccess();
        return;
      }
      if (res.status === 400) {
        return res.json().then(function (data) {
          clearTimeout(timeout);
          var hasStringField = Array.isArray(data && data.fields) && data.fields.some(function (f) { return typeof f === 'string'; });
          if (data && data.error === 'validation' && hasStringField) {
            if (window.turnstile) window.turnstile.reset();
            setSending(false);
            button.textContent = 'Enviar';
            note.textContent = '';
            showErrors(data.fields);
          } else {
            showFailure();
          }
        }, function () {
          clearTimeout(timeout);
          showFailure();
        });
      }
      clearTimeout(timeout);
      showFailure();
    }).catch(function () {
      clearTimeout(timeout);
      showFailure();
    });
  });

  function applyAuthorshipWording() {
    var isGroup = value('authorship') === 'group';
    var wording = AUTHORSHIP_WORDING[isGroup ? 'group' : 'individual'];
    if (nameLabel) nameLabel.textContent = wording.name;
    if (nameHelp) {
      nameHelp.textContent = wording.nameHelp;
      nameHelp.hidden = !isGroup;
    }
    if (nameInput) {
      nameInput.setAttribute('autocomplete', isGroup ? 'off' : 'name');
      var describedBy = (nameInput.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (token) {
        return token && token !== 'sc-name-help';
      });
      if (isGroup) describedBy.push('sc-name-help');
      if (describedBy.length) nameInput.setAttribute('aria-describedby', describedBy.join(' '));
      else nameInput.removeAttribute('aria-describedby');
    }
    for (var i = 0; i < consentInputs.length; i++) {
      var input = consentInputs[i];
      var text = wording.consent[input.value];
      if (!text) continue;
      var label = input.parentNode;
      for (var j = 0; j < label.childNodes.length; j++) {
        if (label.childNodes[j].nodeType === 3) {
          label.childNodes[j].textContent = ' ' + text;
          break;
        }
      }
    }
  }

  for (var i = 0; i < contextRadios.length; i++) contextRadios[i].addEventListener('change', syncFollowup);
  syncFollowup();
  for (i = 0; i < languageRadios.length; i++) languageRadios[i].addEventListener('change', syncLanguageFollowup);
  syncLanguageFollowup();
  for (i = 0; i < authorshipRadios.length; i++) authorshipRadios[i].addEventListener('change', applyAuthorshipWording);
  applyAuthorshipWording();

  window.addEventListener('pageshow', function (event) {
    if (event.persisted) return;
    syncFollowup();
    syncLanguageFollowup();
    applyAuthorshipWording();
  });
})();
</script>
