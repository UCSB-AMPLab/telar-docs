---
layout: section
title: "Projects built with Telar"
description: "Exhibitions, class projects and research made with Telar."
lang: en
permalink: /showcase/
nav_exclude: true
section_title: Showcase
extra_css:
  - showcase
---

# Projects built with Telar

<p class="sc-lede">A sample of exhibitions, class projects and research made using Telar that users have shared with us. Each card links to the published site.</p>

<p id="sc-announce" class="sc-hp" aria-live="polite"></p>

<div id="sc-loading">
  <p class="sc-status" aria-live="polite"><span class="sc-spinner" aria-hidden="true"></span>Loading projects…</p>
  <ul class="sc-grid" aria-hidden="true">
    <li class="sc-card sc-skeleton"><div class="sc-thumb"></div><div class="sc-card__body"><div class="sc-bar sc-bar--title" style="width:70%"></div><div class="sc-bar" style="width:45%"></div><div class="sc-bar" style="width:100%"></div><div class="sc-bar" style="width:85%"></div></div></li>
    <li class="sc-card sc-skeleton"><div class="sc-thumb"></div><div class="sc-card__body"><div class="sc-bar sc-bar--title" style="width:70%"></div><div class="sc-bar" style="width:45%"></div><div class="sc-bar" style="width:100%"></div><div class="sc-bar" style="width:85%"></div></div></li>
    <li class="sc-card sc-skeleton"><div class="sc-thumb"></div><div class="sc-card__body"><div class="sc-bar sc-bar--title" style="width:70%"></div><div class="sc-bar" style="width:45%"></div><div class="sc-bar" style="width:100%"></div><div class="sc-bar" style="width:85%"></div></div></li>
    <li class="sc-card sc-skeleton"><div class="sc-thumb"></div><div class="sc-card__body"><div class="sc-bar sc-bar--title" style="width:70%"></div><div class="sc-bar" style="width:45%"></div><div class="sc-bar" style="width:100%"></div><div class="sc-bar" style="width:85%"></div></div></li>
    <li class="sc-card sc-skeleton"><div class="sc-thumb"></div><div class="sc-card__body"><div class="sc-bar sc-bar--title" style="width:70%"></div><div class="sc-bar" style="width:45%"></div><div class="sc-bar" style="width:100%"></div><div class="sc-bar" style="width:85%"></div></div></li>
    <li class="sc-card sc-skeleton"><div class="sc-thumb"></div><div class="sc-card__body"><div class="sc-bar sc-bar--title" style="width:70%"></div><div class="sc-bar" style="width:45%"></div><div class="sc-bar" style="width:100%"></div><div class="sc-bar" style="width:85%"></div></div></li>
  </ul>
</div>

<div id="sc-empty" hidden>
  <div class="sc-callout"><strong id="sc-empty-heading">No projects yet.</strong><span id="sc-empty-body">If you've built something with Telar, we'd love to include it here.</span></div>
  <a class="sc-btn sc-btn--primary" href="{{ '/showcase/submit/' | relative_url }}">Share your project</a>
</div>

<div id="sc-populated" hidden>
  <ul class="sc-grid" id="sc-cards"></ul>
  <p class="sc-after"><a class="sc-btn" href="{{ '/showcase/submit/' | relative_url }}">Share your project</a></p>
</div>

<script>
(function () {
  'use strict';

  var API = '{{ site.showcase_api }}';
  var loading = document.getElementById('sc-loading');
  var empty = document.getElementById('sc-empty');
  var populated = document.getElementById('sc-populated');
  var cards = document.getElementById('sc-cards');

  var CONTEXT_LABELS = {
    class: 'Class project',
    thesis: 'Thesis',
    research: 'Research project',
    teaching: 'Teaching resource',
    community: 'Community project',
    personal: 'Personal project',
    other: 'Other'
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function card(p) {
    var safeUrl;
    try {
      safeUrl = new URL(p.url);
    } catch (e) {
      return null;
    }
    if (safeUrl.protocol !== 'http:' && safeUrl.protocol !== 'https:') return null;

    var li = el('li', 'sc-card');
    li.appendChild(el('div', 'sc-thumb', ''));

    var body = el('div', 'sc-card__body');
    var title = el('h3', 'sc-card__title');
    var link = el('a', null, p.title);
    link.href = p.url;
    link.rel = 'noopener';
    link.target = '_blank';
    title.appendChild(link);
    body.appendChild(title);

    if (p.author) body.appendChild(el('p', 'sc-card__byline', p.author));
    body.appendChild(el('p', 'sc-card__desc', p.description));

    var tags = el('div', 'sc-card__tags');
    tags.appendChild(el('span', 'sc-chip', CONTEXT_LABELS[p.context] || CONTEXT_LABELS.other));
    body.appendChild(tags);

    var footer = el('div', 'sc-card__footer');
    var visit = el('a', 'sc-card__link', 'Visit site ↗');
    visit.href = p.url;
    visit.rel = 'noopener';
    visit.target = '_blank';
    footer.appendChild(visit);
    body.appendChild(footer);

    li.appendChild(body);
    return li;
  }

  var announce = document.getElementById('sc-announce');

  function showEmpty(heading, body) {
    if (heading) document.getElementById('sc-empty-heading').textContent = heading;
    if (body) document.getElementById('sc-empty-body').textContent = body;
    loading.hidden = true;
    empty.hidden = false;
    announce.textContent = heading ? 'Projects could not be loaded.' : 'No projects yet.';
  }

  function render(projects) {
    if (!projects.length) { showEmpty(); return; }
    var appended = 0;
    for (var i = 0; i < projects.length; i++) {
      var node = card(projects[i]);
      if (node) { cards.appendChild(node); appended++; }
    }
    if (!appended) { showEmpty(); return; }
    loading.hidden = true;
    populated.hidden = false;
    announce.textContent = 'Projects loaded.';
  }

  var controller = new AbortController();
  var timeout = setTimeout(function () { controller.abort(); }, 20000);

  fetch(API + '/projects', { signal: controller.signal }).then(function (res) {
    if (!res.ok) {
      clearTimeout(timeout);
      throw new Error('status ' + res.status);
    }
    return res.json().then(function (data) {
      clearTimeout(timeout);
      return data;
    }, function (err) {
      clearTimeout(timeout);
      throw err;
    });
  }).then(function (data) {
    if (!data || !Array.isArray(data.projects)) throw new Error('bad envelope');
    render(data.projects);
  }).catch(function () {
    clearTimeout(timeout);
    showEmpty('We couldn\'t load the projects.', 'Please try again in a moment.');
  });
})();
</script>
