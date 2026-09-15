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
  <div class="sc-filters" id="sc-filters" role="region" aria-label="Filter projects">
    <div class="sc-filter-row" id="sc-filter-row-context">
      <span class="sc-filter-label" id="sc-filter-label-context">Context</span>
      <div class="sc-filter-chips" role="group" aria-labelledby="sc-filter-label-context" data-filter="context">
        <button type="button" class="sc-filter" aria-pressed="true" data-value="">All</button>
      </div>
    </div>
    <div class="sc-filter-row" id="sc-filter-row-language">
      <span class="sc-filter-label" id="sc-filter-label-language">Language</span>
      <div class="sc-filter-chips" role="group" aria-labelledby="sc-filter-label-language" data-filter="language">
        <button type="button" class="sc-filter" aria-pressed="true" data-value="">All</button>
      </div>
    </div>
  </div>
  <ul class="sc-grid" id="sc-cards"></ul>
  <div id="sc-nomatch" hidden>
    <div class="sc-callout">No projects match these filters.</div>
    <button type="button" class="sc-btn" id="sc-clear">Clear filters</button>
  </div>
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
  var filters = document.getElementById('sc-filters');
  var filterGroups = filters.querySelectorAll('.sc-filter-chips');
  var noMatch = document.getElementById('sc-nomatch');
  var clearButton = document.getElementById('sc-clear');

  var CONTEXT_LABELS = {
    class: 'Class project',
    thesis: 'Thesis',
    research: 'Research project',
    teaching: 'Teaching resource',
    community: 'Community project',
    personal: 'Personal project',
    other: 'Other'
  };

  var CONTEXT_ORDER = ['class', 'thesis', 'research', 'teaching', 'community', 'personal', 'other'];
  var LANGUAGE_ORDER = ['en', 'es', 'other'];

  var LANGUAGE_FILTER_LABELS = {
    en: 'English',
    es: 'Spanish',
    other: 'Other'
  };

  var LANGUAGE_CHIPS = {
    en: 'English',
    es: 'Spanish',
    other: 'Other language'
  };

  var ANNOUNCE_ONE = 'Showing one project.';
  var ANNOUNCE_MANY = 'Showing {n} projects.';

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
    var context = CONTEXT_LABELS[p.context] ? p.context : 'other';
    var language = LANGUAGE_CHIPS[p.language] ? p.language : '';
    li.setAttribute('data-context', context);
    li.setAttribute('data-language', language);
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
    tags.appendChild(el('span', 'sc-chip', CONTEXT_LABELS[context]));
    if (language) tags.appendChild(el('span', 'sc-chip', LANGUAGE_CHIPS[language]));
    if (p.authorship === 'individual') tags.appendChild(el('span', 'sc-chip', 'Individual'));
    else if (p.authorship === 'group') tags.appendChild(el('span', 'sc-chip', 'Group'));
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

  function buildFilterRow(group, order, labels) {
    var present = {};
    var items = cards.children;
    for (var i = 0; i < items.length; i++) present[items[i].getAttribute('data-' + group.getAttribute('data-filter'))] = true;
    var count = 0;
    for (var j = 0; j < order.length; j++) {
      if (!present[order[j]]) continue;
      var chip = el('button', 'sc-filter', labels[order[j]]);
      chip.type = 'button';
      chip.setAttribute('aria-pressed', 'false');
      chip.setAttribute('data-value', order[j]);
      group.appendChild(chip);
      count++;
    }
    var row = group.parentNode;
    row.hidden = count < 2;
    return !row.hidden;
  }

  function selectedValue(group) {
    var pressed = group.querySelector('.sc-filter[aria-pressed="true"]');
    return pressed ? pressed.getAttribute('data-value') : '';
  }

  function press(group, chip) {
    var chips = group.querySelectorAll('.sc-filter');
    for (var i = 0; i < chips.length; i++) chips[i].setAttribute('aria-pressed', chips[i] === chip ? 'true' : 'false');
  }

  function applyFilters() {
    var wanted = {};
    for (var g = 0; g < filterGroups.length; g++) wanted[filterGroups[g].getAttribute('data-filter')] = selectedValue(filterGroups[g]);
    var items = cards.children;
    var shown = 0;
    for (var i = 0; i < items.length; i++) {
      var match = (!wanted.context || items[i].getAttribute('data-context') === wanted.context) &&
        (!wanted.language || items[i].getAttribute('data-language') === wanted.language);
      items[i].hidden = !match;
      if (match) shown++;
    }
    cards.hidden = !shown;
    noMatch.hidden = shown > 0;
    announce.textContent = shown === 1 ? ANNOUNCE_ONE : ANNOUNCE_MANY.replace('{n}', shown);
  }

  function onFilterClick(event) {
    var chip = event.target.closest('.sc-filter');
    if (!chip || chip.getAttribute('aria-pressed') === 'true') return;
    press(event.currentTarget, chip);
    applyFilters();
  }

  function setUpFilters() {
    var contextRow = buildFilterRow(filterGroups[0], CONTEXT_ORDER, CONTEXT_LABELS);
    var languageRow = buildFilterRow(filterGroups[1], LANGUAGE_ORDER, LANGUAGE_FILTER_LABELS);
    filters.hidden = !contextRow && !languageRow;
    for (var g = 0; g < filterGroups.length; g++) filterGroups[g].addEventListener('click', onFilterClick);
    clearButton.addEventListener('click', function () {
      var target = null;
      for (var i = 0; i < filterGroups.length; i++) {
        var all = filterGroups[i].querySelector('.sc-filter[data-value=""]');
        press(filterGroups[i], all);
        if (!target && !filterGroups[i].parentNode.hidden) target = all;
      }
      applyFilters();
      if (target) target.focus();
    });
  }

  function render(projects) {
    if (!projects.length) { showEmpty(); return; }
    var appended = 0;
    for (var i = 0; i < projects.length; i++) {
      var node = card(projects[i]);
      if (node) { cards.appendChild(node); appended++; }
    }
    if (!appended) { showEmpty(); return; }
    setUpFilters();
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
