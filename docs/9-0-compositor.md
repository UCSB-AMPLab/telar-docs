---
layout: docs
title: "9. The Compositor"
parent: Documentation
nav_order: 9
has_children: true
lang: en
permalink: /docs/the-compositor/
---

# Compositor manual

<span class="anchor-alias" id="the-compositor"></span>

<span class="anchor-alias" id="what-is-the-compositor"></span>

The Telar Compositor is a visual authoring tool for creating and managing Telar exhibitions. It runs in your browser at [compositor.telar.org](https://compositor.telar.org), where you can bring images, video, audio and text together into layered visual narratives without writing code.

You can use it for digital scholarship, public exhibitions, community storytelling and classroom projects, working on your own or with collaborators. The interface is available in English and Spanish.

Telar provides the framework for the exhibition your visitors explore. The Compositor gives you a workspace to assemble its content, preview your stories and publish the site. Your published site's content and configuration are kept as files in a GitHub repository.

## The parts of an exhibition

- **Objects** are your source materials: images, video or audio, with their descriptions, sources and credits.
- **Stories** guide visitors through those materials in a sequence of **steps**. Each step combines narrative text with a view of an object or a media clip.
- **Panels and glossary entries** offer further context that visitors can open as they explore.
- **The homepage and supporting pages** introduce the exhibition and help visitors find their way around it.

You can manage all of these in the Compositor, along with the site's appearance and navigation.

## How it works

1. **Start a site.** Create a new Telar site or connect one you already have.
2. **Compose your exhibition.** Add your sources, write stories, choose the details each step will show and develop the surrounding context.
3. **Review and publish.** Check your work and publish the changes to GitHub. Telar then builds the public website.

Your work is saved as you edit. Publishing is a separate action, so you can develop a draft before updating the public site. After publishing, check the website once its build has finished.

<span class="anchor-alias" id="requirements"></span>

## Before you begin

You need a GitHub account. The [first-site guide](/docs/getting-started/compositor/) takes you through signing in, granting the Telar GitHub App access and creating a site. If you already have a Telar repository, follow [Connect an existing site](/docs/the-compositor/getting-started/).

If you are still developing your idea, start with [Plan an exhibition](/docs/plan/). For a practical first exercise, the illustrated [khipu walkthrough](/docs/the-compositor/iiif-to-story/) takes one image from an IIIF collection into a story step and shows how to save its framing.

<span class="anchor-alias" id="in-this-section"></span>

{% assign manual_book = site.data.docs_navigation.sections[page.lang].compositor %}
{% for group in manual_book.groups %}{% unless group.id == 'main' %}
<h2>{{ group.title }}</h2><ul>{% for item in group.items %}<li><a href='{{ item.url }}'>{{ item.title }}</a></li>{% endfor %}</ul>
{% endunless %}{% endfor %}
