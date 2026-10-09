---
layout: docs
title: "7.4. Demo Content"
parent: "7. Customization"
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/customization/demo-content/
---

# Demo Content

Demo content adds two finished example stories to your site, so you can see how a Telar story is built and how it behaves before you write your own.

## What is Demo Content?

Demo content is a set of example stories, together with the objects and glossary entries they use. Telar downloads it from [content.telar.org](https://content.telar.org) each time your site builds and adds it to your own content. It is never saved in your repository, so when you turn it off, the next build leaves it out.

Demo content is marked wherever it appears, so you can always tell it apart from your own work.

## The Demo Stories

Your site gets two stories, in your site's language:

| English title | Spanish title | Steps | What it shows |
|---------------|---------------|-------|---------------|
| The Allegorical Woman | La mujer alegórica | 10 | A simple story built around one image |
| Colonial Landscapes | Paisajes coloniales | 22 | A longer story with chapters, panels and primary sources |

### The Allegorical Woman

This story, by Natalie Cobo, follows the details of *Aspecto Symbólico del Mundo Hispánico*, a 1761 engraving by Laureano Atlas held by Princeton University Library. It shows:

- Steps that move around a single image, zooming in on one detail at a time
- A IIIF (pronounced "triple-eye-eff") image served by the institution that holds it, Princeton University Library, rather than by content.telar.org
- A step that switches to a second image, the frontispiece of Hobbes's *Leviathan*
- Layer panels, including one step with a second layer
- Links to glossary entries from the story's text

The first step links to the story's spreadsheet in Google Sheets, so you can compare each row with the step it produces.

### Colonial Landscapes

This story is a selection from *Colonial Landscapes*, a project by Santiago Muñoz, Adelaida Ávila, and María Alejandra Orduz Avella. It is built around a 1614 painting of the Bogotá savanna, made for a lawsuit and held by the Archivo General de Indias in Seville.

The story is organized as follows:

- The first step introduces the original project and links to it, and the last step repeats that link
- Four chapters, each opened by a title card: "A Painting of the Savanna", "Villages for the “indios”", "From Terraces to Grasslands", and "A Divided Landscape"
- Most of the other steps have a layer panel, which holds the longer text, image carousels, and callouts to primary sources

Each primary source is a glossary entry, which opens from its callout in a panel. Many of the entries end with a **See full document** link to the document's own object page; two panels link to documents in the same way. The painting and the nine documents are served from content.telar.org as IIIF images. Five of the documents have more than one page, and their object pages let you move from page to page.

The glossary also includes several key terms and one person, so the glossary page groups its entries under **Key terms**, **Primary sources**, and **People and entities**.

## Turning Demo Content On or Off

Demo content is controlled by one setting in `_config.yml`. A new Telar site has it turned on.

To change it:

1. Open `_config.yml`
2. Find the `story_interface` section
3. Set `include_demo_content` to `true` to show the demo stories, or `false` to hide them:

   ```yaml
   story_interface:
     include_demo_content: true
   ```

4. Commit the change

GitHub Actions rebuilds your site, and the change appears when the build finishes. If you build your site on your own computer, run `python3 scripts/csv_to_json.py` and `python3 scripts/generate_collections.py` (or `python3 scripts/build_local_site.py`, which runs both) before Jekyll. See [Local Development](/docs/getting-started/local-dev/).

{: .tip }
> **Keep the demos while you learn**
> The demo stories are useful to keep open next to your own while you write your first story. Turn them off before you share your site.

## Where Demo Content Appears

Demo content appears in the same places as your own content, with a label:

| Where | What you see |
|-------|--------------|
| Home page | The demo stories, listed before your own stories, with a **DEMO** badge |
| Story intro card | A **Demo content** label above the story title |
| Layer panels | A **Demo content** badge next to the panel title |
| Objects page | The demo objects, listed after your own objects, with a **DEMO** badge |
| Object page | A **Demo content** label above the object title |
| Glossary page | A **DEMO** badge next to each demo entry |
| Glossary entry page | A **Demo content** badge next to the entry title |

On a Spanish site the labels read **DEMO** and **Contenido de demostración**.

## Language

Demo content follows your site's language, set by `telar_language` in `_config.yml`:

| Your setting | Demo content you get |
|--------------|----------------------|
| `telar_language: "en"` | English stories, objects and glossary |
| `telar_language: "es"` | Spanish stories, objects and glossary |

Any other value gets the English demo content. If you change your site's language, the next build fetches the demo content in the new language.

## Demo Content and Your Own Content

Demo content is added to your content during the build, and it never replaces anything of yours:

| | Your content | Demo content |
|---|---|---|
| Where it lives | Your repository | Downloaded during each build; not saved in your repository |
| Editable | Yes | No |
| Label | None | **DEMO** badge or **Demo content** label |
| Same object ID as one of yours | — | Your object is kept and the demo object is left out |
| Same glossary entry ID as one of yours | — | Your entry is kept and the demo entry is left out |

The demo object and glossary IDs all begin with `demo-`, so they do not normally match yours.

## Using the Demos as Models

The demo stories are written in the same spreadsheet format as your own stories. Their sources are published in the [demo content repository](https://github.com/UCSB-AMPLab/demo-content) on GitHub, under `demos/v1.8.0/en/` and `demos/v1.8.0/es/`:

- `demo-project.csv`: the two stories' rows in the project sheet
- `demo-objects.csv`: the objects
- `allegorical-woman.csv` and `colonial-landscapes.csv` (`mujer-alegorica.csv` and `paisajes.csv` in Spanish): the stories' steps
- `glossary.csv` (`glosario.csv` in Spanish): the glossary entries, with the `kind` column that marks sources and people
- `texts/stories/`: the markdown files for the Colonial Landscapes panels

To see how a story's structure shows up on the page, compare the rows of `colonial-landscapes.csv` with the story on your site: the rows with an empty `object` column are the chapter title cards.

## Troubleshooting

### Demo Stories Do Not Appear

If you turned demo content on and the stories are missing:

1. Check that `include_demo_content: true` is inside the `story_interface` section of `_config.yml`
2. Check that the build finished in your repository's **Actions** tab
3. Open the build log, expand the **Convert CSV to JSON** step, and look for the lines that begin with **Telar Demo Content Fetcher**
4. Reload the page without the cache (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

### The Demo Content Could Not Be Downloaded

If content.telar.org cannot be reached, or the download fails, the build log says that your site will build without demos, and the build continues. Your own content is published as usual, without the demo stories. The next build tries again.

### Demo Content Is in the Wrong Language

Check `telar_language` in `_config.yml`. It must be `"en"` or `"es"`; any other value gets the English demo content.
