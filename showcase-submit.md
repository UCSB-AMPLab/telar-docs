---
layout: docs
title: "Share your Telar project"
description: "Tell us about a site you built with Telar so we can feature it in the showcase."
lang: en
permalink: /showcase/submit/
nav_exclude: true
extra_css:
  - showcase
---

# Share your Telar project

<p class="sc-lede">We're putting together a showcase of projects built with Telar, and we'd love to include yours. Tell us a little about it below. It takes about five minutes. We'll only feature projects whose authors say yes in the last question, and we'll check with you before publishing anything.</p>

<div id="sc-alert" class="sc-callout sc-callout--error" role="alert" hidden></div>

<form id="sc-form" class="sc-form" novalidate>

  <div class="sc-q" data-field="name">
    <label class="sc-label" for="sc-name">Your name</label>
    <p class="sc-help">As you'd like it to appear in the showcase.</p>
    <input class="sc-input" id="sc-name" name="name" type="text" autocomplete="name" maxlength="200">
    <p class="sc-error" hidden></p>
  </div>

  <div class="sc-q" data-field="email">
    <label class="sc-label" for="sc-email">Email</label>
    <p class="sc-help">So we can get in touch if we have a question about your project. We won't publish it.</p>
    <input class="sc-input" id="sc-email" name="email" type="email" autocomplete="email" maxlength="320">
    <p class="sc-error" hidden></p>
  </div>

  <div class="sc-q" data-field="title">
    <label class="sc-label" for="sc-title">Project title</label>
    <input class="sc-input" id="sc-title" name="title" type="text" maxlength="200">
    <p class="sc-error" hidden></p>
  </div>

  <div class="sc-q" data-field="url">
    <label class="sc-label" for="sc-url">Project URL</label>
    <p class="sc-help">The public link to your published site.</p>
    <input class="sc-input" id="sc-url" name="url" type="text" inputmode="url" autocomplete="url" maxlength="500">
    <p class="sc-error" hidden></p>
  </div>

  <div class="sc-q" data-field="description">
    <label class="sc-label" for="sc-description">Tell us about the project</label>
    <p class="sc-help">What is it about, and what sources or objects does it work with? Two or three sentences is plenty.</p>
    <textarea class="sc-textarea" id="sc-description" name="description" maxlength="3000"></textarea>
    <p class="sc-error" hidden></p>
  </div>

  <fieldset class="sc-q" data-field="context">
    <legend class="sc-label">What was the context?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="context" value="class"> A class assignment</label>
      <label class="sc-radio"><input type="radio" name="context" value="thesis"> A thesis or capstone</label>
      <label class="sc-radio"><input type="radio" name="context" value="research"> A research project</label>
      <label class="sc-radio"><input type="radio" name="context" value="teaching"> A teaching resource</label>
      <label class="sc-radio"><input type="radio" name="context" value="personal"> A personal project</label>
      <label class="sc-radio"><input type="radio" name="context" value="other"> Other</label>
    </div>
    <p class="sc-error" hidden></p>
    <div class="sc-followup">
      <label class="sc-label sc-label--sub" for="sc-context-detail">If it was for a class, which course, and where?</label>
      <input class="sc-input" id="sc-context-detail" name="contextDetail" type="text" maxlength="300">
    </div>
  </fieldset>

  <div class="sc-q" data-field="feedback">
    <label class="sc-label" for="sc-feedback">What worked well, and what didn't? <span class="sc-optional">(optional)</span></label>
    <p class="sc-help">Anything from the building process: what Telar made easy, where you got stuck, what you'd want to see changed. Honest answers help us improve the tool.</p>
    <textarea class="sc-textarea" id="sc-feedback" name="feedback" maxlength="3000"></textarea>
    <p class="sc-error" hidden></p>
  </div>

  <fieldset class="sc-q" data-field="consent">
    <legend class="sc-label">Can we feature your project in the Telar showcase?</legend>
    <div class="sc-radio-group">
      <label class="sc-radio"><input type="radio" name="consent" value="named"> Yes, with my name</label>
      <label class="sc-radio"><input type="radio" name="consent" value="anonymous"> Yes, but without my name</label>
      <label class="sc-radio"><input type="radio" name="consent" value="contact_first"> Not yet, please contact me first</label>
      <label class="sc-radio"><input type="radio" name="consent" value="no"> No</label>
    </div>
    <p class="sc-error" hidden></p>
  </fieldset>

  <div class="sc-hp" aria-hidden="true">
    <label for="sc-website">Website</label>
    <input id="sc-website" name="website" type="text" tabindex="-1" autocomplete="off">
  </div>

  {% if site.showcase_turnstile_site_key and site.showcase_turnstile_site_key != "" %}
  <div class="cf-turnstile" data-sitekey="{{ site.showcase_turnstile_site_key }}"></div>
  {% endif %}

  <div class="sc-actions">
    <button type="submit" class="sc-btn sc-btn--primary" id="sc-submit">Send</button>
    <p class="sc-note" id="sc-note">About five minutes. We'll check with you before publishing.</p>
  </div>

</form>

<div id="sc-success" class="sc-callout sc-callout--success" role="status" tabindex="-1" hidden>Thanks for sharing your project. We'll be in touch before anything goes live.</div>

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

  var MESSAGES = {
    email: 'Enter a full email address, like name@example.org.',
    url: 'Enter the public link to your site.',
    context: 'Choose one option.',
    consent: 'Choose one option.',
    other: 'This field is required.'
  };

  var FAILURE = 'We couldn\'t send your answers.';
  var FAILURE_BODY = 'Your text is still here. Please try again in a moment, or email us if it keeps happening.';

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
    return {
      name: value('name'),
      email: value('email'),
      title: value('title'),
      url: value('url'),
      description: value('description'),
      context: value('context'),
      contextDetail: value('contextDetail'),
      feedback: value('feedback'),
      consent: value('consent'),
      website: value('website'),
      turnstile: turnstile ? turnstile.value : ''
    };
  }

  function validate(v) {
    var fields = [];
    if (!v.name) fields.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) fields.push('email');
    if (!v.title) fields.push('title');
    if (!v.url || !normaliseUrl(v.url)) fields.push('url');
    if (!v.description) fields.push('description');
    if (!v.context) fields.push('context');
    if (!v.consent) fields.push('consent');
    return fields;
  }

  function clearErrors() {
    var blocks = form.querySelectorAll('.sc-q');
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].classList.remove('is-invalid');
      var err = blocks[i].querySelector('.sc-error');
      if (err) { err.textContent = ''; err.hidden = true; }
    }
    alertEl.hidden = true;
    alertEl.textContent = '';
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
    clearErrors();
    var first = null;
    for (var i = 0; i < fields.length; i++) {
      var fieldName = fields[i] === 'contextDetail' ? 'context' : fields[i];
      var block = form.querySelector('.sc-q[data-field="' + fieldName + '"]');
      if (!block) continue;
      block.classList.add('is-invalid');
      var err = block.querySelector('.sc-error');
      if (err) {
        err.textContent = MESSAGES[fields[i]] || MESSAGES.other;
        err.hidden = false;
      }
      if (!first) first = block.querySelector('input, textarea');
    }
    var n = fields.length;
    showAlert('Please check ' + n + (n === 1 ? ' field' : ' fields') + ' below.', 'Nothing has been sent yet.');
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
      button.appendChild(document.createTextNode('Sending…'));
      note.textContent = 'Please keep this page open.';
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
    button.textContent = 'Try again';
    note.textContent = 'About five minutes. We\'ll check with you before publishing.';
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
      clearTimeout(timeout);
      if (res.status === 201) { showSuccess(); return; }
      if (res.status === 400) {
        return res.json().then(function (data) {
          if (window.turnstile) window.turnstile.reset();
          setSending(false);
          button.textContent = 'Send';
          note.textContent = 'About five minutes. We\'ll check with you before publishing.';
          showErrors((data && data.fields && data.fields.length) ? data.fields : ['url']);
        });
      }
      showFailure();
    }).catch(function () {
      clearTimeout(timeout);
      showFailure();
    });
  });
})();
</script>
