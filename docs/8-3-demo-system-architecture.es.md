---
layout: docs
title: "8.3. Arquitectura del contenido de demostración"
parent: "8. Para desarrolladores"
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/desarrolladores/sistema-demos/
---

# Arquitectura del contenido de demostración

Esta página explica cómo un sitio de Telar descarga el contenido de demostración, lo incorpora a sus datos y lo marca en las páginas, y también cómo se producen los paquetes de demostración. La página [Contenido de demostración](/guia/personalizacion/contenido-demostracion/) lo explica desde el punto de vista de quien hace un sitio.

## Resumen

El contenido de demostración se publica en [content.telar.org](https://content.telar.org) como un solo archivo JSON por versión de Telar y por idioma: el paquete de demostración. GitHub Pages sirve ese sitio desde el [repositorio de contenido de demostración](https://github.com/UCSB-AMPLab/demo-content). Durante el *build*, el sitio descarga el paquete y lo incorpora a los archivos JSON de `_data/`; luego, el generador de colecciones escribe las historias, los objetos y las entradas del glosario de demostración como páginas marcadas con `demo: true`.

Estas son las piezas que intervienen:

| Pieza | Función |
|-------|---------|
| `scripts/fetch_demo_content.py` | Lee la configuración del sitio, elige una versión del paquete, lo descarga, lo verifica y lo guarda |
| `scripts/telar/demo.py` | Ejecuta el script de descarga (`fetch_demo_content_if_enabled`), carga el paquete guardado (`load_demo_bundle`) y lo incorpora a `_data/` (`merge_demo_content`) |
| `scripts/telar/core.py` | Llama a esas funciones desde `main()`, que es lo que ejecuta `scripts/csv_to_json.py` |
| `scripts/generate_collections.py` y `scripts/telar/glossary_pages.py` | Escriben las páginas de historias, objetos y glosario, incluidas las de demostración |
| `_demo_content/telar-demo-bundle.json` | El paquete descargado; excluido de git |
| `_data/demo-glossary.json` | Las entradas del glosario del paquete, para el generador de páginas del glosario; excluido de git |

## Secuencia del *build*

El flujo de trabajo **Build and Deploy** no tiene un paso propio para el contenido de demostración. La descarga ocurre dentro del paso **Convert CSV to JSON**, que ejecuta `python scripts/csv_to_json.py`.

Cuando se ejecuta `csv_to_json.py`:

1. Antes de convertir las hojas de cálculo, `fetch_demo_content_if_enabled()` ejecuta `python3 scripts/fetch_demo_content.py` como subproceso, con un plazo de 60 segundos, y muestra su salida estándar. No revisa el código de salida del subproceso; si se agota el plazo o el subproceso no logra arrancar, muestra una advertencia y el *build* continúa.
2. Las hojas de cálculo del proyecto, de los objetos y de las historias del sitio se convierten a JSON en `_data/`.
3. `load_demo_bundle()` lee `_demo_content/telar-demo-bundle.json`, si existe, y `merge_demo_content()` lo incorpora a `_data/`.
4. `_cleanup_stale_data_files()` borra cualquier archivo de historia `_data/*.json` que no corresponda ni a una hoja de cálculo de `telar-content/spreadsheets/` ni a una historia del paquete cargado. Así desaparecen los archivos de las historias de demostración cuando se desactiva el contenido de demostración o cuando cambian el idioma o la versión del paquete.

El paso siguiente del flujo de trabajo, **Generate Jekyll collections**, ejecuta `generate_collections.py`, que escribe las páginas.

## Descarga del paquete

### Configuración

`load_config()`, en `fetch_demo_content.py`, lee tres valores de `_config.yml`:

| Ajuste | Para qué sirve | Si falta o no es válido |
|--------|----------------|-------------------------|
| `story_interface.include_demo_content` | Decidir si se descarga | Se toma como `false` |
| `telar.version` | Elegir la versión del paquete | Si no se puede interpretar, el script muestra una advertencia y termina sin descargar |
| `telar_language` | Elegir el idioma del paquete | Cualquier valor distinto de `en` o `es` produce una advertencia y se toma como `en` |

La versión puede llevar el prefijo `v` o `V` y el sufijo `-beta` (por ejemplo, `v1.8.0` o `1.0.0-beta`). El script solo usa el número de versión de tres partes.

Si `include_demo_content` es `false`, `cleanup_demo_content()` borra `_demo_content/` y el script termina. Si es `true`, el script borra primero `_demo_content/` y después descarga; así, si la descarga falla, no queda ningún paquete de un *build* anterior.

### Selección de versión

`fetch_versions_index()` descarga `https://content.telar.org/demos/versions.json`, que enumera las versiones publicadas del paquete:

```json
{
  "versions": [
    "0.6.0",
    "0.8.1",
    "0.9.0",
    "1.8.0"
  ]
}
```

`find_best_version(site_version, available_versions)` devuelve la versión más alta de la lista que sea menor o igual a la del sitio. Con las versiones de arriba, cada sitio recibe estos paquetes:

| Versión del sitio | Paquete |
|-------------------|---------|
| 1.8.0 o posterior | 1.8.0 |
| De 0.9.0 a 1.7.x | 0.9.0 |
| De 0.8.1 a 0.8.x | 0.8.1 |
| De 0.6.0 a 0.8.0 | 0.6.0 |

Si ninguna versión de la lista es menor o igual a la del sitio, el script muestra las versiones disponibles y termina sin descargar. Si no puede leer `versions.json`, intenta descargar el paquete de la misma versión que el sitio.

### Descarga y verificaciones

`fetch_bundle(version, language)` descarga:

```
https://content.telar.org/demos/v{version}/{language}/telar-demo-bundle.json
```

y muestra los campos `_meta.telar_version`, `_meta.language` y `_meta.generated` del paquete. Ante un 404, otro error HTTP, un error de red o un JSON no válido, muestra el error y devuelve `None`, y el script termina con "Your site will build without demos".

El script de descarga aplica estos límites:

| Límite | Valor |
|--------|-------|
| Tiempo de espera para `versions.json` | 10 segundos |
| Tiempo de espera para el paquete | 30 segundos |
| Tamaño de `versions.json` | 64 KB |
| Tamaño del paquete | 10 MB |

Los límites de tamaño son `MAX_VERSIONS_BYTES` y `MAX_BUNDLE_BYTES`, en `scripts/pipeline_utils.py`.

Antes de guardar, `save_bundle()` verifica que el paquete tenga las claves `_meta`, `objects`, `stories` y `project`; que `objects`, `stories` y `project` sean cada uno una lista o un objeto, y que `objects` y `stories` no tengan más de 10.000 entradas cada uno. Si el paquete no pasa alguna de estas verificaciones, no se guarda; si las pasa todas, se escribe en `_demo_content/telar-demo-bundle.json`.

## Formato del paquete

Un paquete tiene estas claves de primer nivel:

| Clave | Contenido |
|-------|-----------|
| `_meta` | `bundle_format`, `telar_version`, `language`, `generated`, `generator`, `source`, `description`, `license` |
| `iiif_base_url` | La URL base de los objetos IIIF alojados que usa el paquete |
| `project` | Una lista de entradas de historia, una por historia |
| `objects` | Un objeto con los objetos del paquete, indexados por identificador de objeto |
| `stories` | Un objeto con las historias, indexadas por identificador de historia; cada una tiene una lista `steps` |
| `glossary` | Un objeto con las entradas del glosario, indexadas por su identificador |

El *build* del sitio no lee `iiif_base_url` ni `_meta.bundle_format`.

Una entrada de `project` del paquete en español de la v1.8.0:

```json
{
  "order": 2,
  "story_id": "paisajes",
  "title": "Paisajes coloniales",
  "subtitle": "Una pintura legal de 1614 de la Sabana de Bogotá — una historia con contenidos complejos",
  "byline": "Por Santiago Muñoz, Adelaida Ávila y María Alejandra Orduz Avella",
  "show_sections": true
}
```

Una entrada de `objects`:

```json
"demo-leviathan": {
  "title": "Frontispicio del Leviatán",
  "description": "Frontispicio del Leviatán de Thomas Hobbes (1651), en el que el soberano aparece como un cuerpo gigante compuesto por ciudadanos individuales.",
  "creator": "Abraham Bosse (según diseño de Thomas Hobbes)",
  "period": "siglo XVII",
  "credit": "British Library",
  "year": "1651",
  "subjects": "filosofía política, soberanía",
  "featured": "TRUE",
  "medium": "Grabado",
  "source": "British Library",
  "source_url": "https://content.telar.org/iiif/objects/demo-leviathan/manifest.json",
  "thumbnail": "https://content.telar.org/iiif/objects/demo-leviathan/full/231,313/0/default.jpg"
}
```

Cada paso de la lista `steps` de una historia tiene `step`, `object`, `x`, `y` y `zoom`, y puede tener además `question`, `answer`, `alt_text`, `page` y `layers`. Un paso con `object` vacío es una tarjeta de título. Este es el paso 2 de `paisajes`:

```json
{
  "step": 2,
  "object": "",
  "x": 0.5,
  "y": 0.5,
  "zoom": 1.0,
  "question": "Una pintura de la Sabana",
  "answer": "Este documento, que oscila entre mapa y pintura, formó parte de un proceso legal en el que se consolidaron una de las haciendas y uno de los linajes más importantes del Nuevo Reino de Granada."
}
```

`layers` contiene `layer1` y `layer2`, cada una con `button`, `content` y, cuando el archivo Markdown del panel trae un título en su frontmatter, `title`. El contenido de las capas es Markdown sin procesar; lo convierte el *build* del sitio.

Una entrada del glosario tiene `term` (su título) y `content` (Markdown), y puede tener `kind` y `related_terms`. El valor de `kind` va tal como está escrito en la hoja de cálculo de origen, por ejemplo `fuente` en el paquete en español y `source` en el paquete en inglés; el *build* del sitio interpreta ambos como el mismo tipo.

## Incorporación a `_data/`

`merge_demo_content(bundle)` ejecuta cuatro funciones, en este orden. Cada una captura sus propios errores y muestra una línea `[WARN]`, así que, si una falla, las demás se ejecutan igual.

### Historias en `project.json`

`_merge_demo_projects()` convierte cada entrada de `project` en un registro de historia y pone las historias de demostración antes de las del sitio, en la lista `stories` de la primera entrada de `_data/project.json`. Solo se ejecuta si `_data/project.json` existe y la lista `project` del paquete no está vacía.

| Campo del registro | Se toma de |
|--------------------|------------|
| `number` | `order`, como cadena de texto |
| `story_id` | `story_id` |
| `title`, `subtitle`, `byline` | Los mismos campos |
| `_demo` | Siempre `true` |

No se copia ningún otro campo. Como `show_sections` queda por fuera, la tarjeta de inicio de una historia de demostración no muestra la tabla de contenidos de secciones, aunque la entrada del paquete tenga `show_sections` en `true`, como ocurre con `colonial-landscapes` y `paisajes` en los paquetes de la v1.8.0.

### Objetos en `objects.json`

`_merge_demo_objects()` agrega los objetos del paquete al final de `_data/objects.json`. Si el identificador de un objeto ya está entre los objetos del sitio, ese objeto se omite y se conserva el del sitio.

Cada objeto de demostración recibe `object_id`, `title`, `description`, `source_url`, `iiif_manifest`, `creator`, `period`, `year`, `object_type`, `subjects`, `featured`, `source`, `credit`, `thumbnail`, `medium` y `_demo: true`, con estas reglas:

- `iiif_manifest` es una copia de `source_url`
- si falta `source`, se usa `location`, el nombre que tenía ese campo en los paquetes de la v0.6.0
- si falta `medium`, se usa `object_type`
- `alt_text` solo se agrega cuando el objeto del paquete tiene un valor para ese campo
- `media_type` se calcula a partir de `source_url` con `detect_media_type()`, igual que para los objetos del propio sitio; no se lee ningún `media_type` que traiga el paquete

### Archivos de historia

`_write_demo_stories()` escribe un `_data/{story_id}.json` por cada historia del paquete. Cada paso queda así:

| Campo | Valor |
|-------|-------|
| `step`, `object`, `question`, `answer` | Del paso del paquete |
| `x`, `y`, `zoom` | Del paso del paquete, como cadenas de texto; `0.5`, `0.5` y `1` si faltan |
| `alt_text`, `page`, `clip_start`, `clip_end`, `loop` | Se copian como cadenas de texto, solo cuando tienen un valor |
| `layer1_button`, `layer2_button` | El `button` de la capa |
| `layer1_title`, `layer2_title` | El `title` de la capa, o su `button` si no tiene título |
| `layer1_text`, `layer2_text` | El `content` de la capa, ya convertido |
| `layer1_demo`, `layer2_demo` | `true` para cada capa presente |
| `_demo` | Siempre `true` |

El contenido de las capas recibe el mismo procesamiento que los paneles del propio sitio: `process_widgets()`, luego `process_images()` y por último `render_markdown()`, que agrega los enlaces de glosario al HTML resultante. Las respuestas se convierten con `render_answer()`, igual que las del sitio. Si una historia contiene LaTeX, se agrega una entrada `{"_metadata": true, "has_latex": true}` al comienzo del archivo.

Los enlaces de glosario de una historia de demostración se resuelven con un mapa de enlaces que `_demo_link_terms()` arma a partir del glosario del paquete y de las páginas de glosario del propio sitio.

### Glosario

`_write_demo_glossary()` escribe el glosario del paquete en `_data/demo-glossary.json`, como una lista. Cada entrada tiene `term_id`, `title` (tomado de `term`), `content` y `_demo: true`, y además `kind` y `related_terms` cuando la entrada del paquete los trae. Si `related_terms` viene como cadena de texto, se divide en una lista por el carácter `|`.

## Escritura de las páginas

`generate_collections.py` lee los datos ya incorporados y escribe los archivos de las colecciones de Jekyll:

- **Historias** (`generate_stories()`): un registro de historia con `_demo` recibe `demo: true` en su frontmatter. Las historias de demostración reciben valores de `sort_order` a partir de 0, y las del sitio a partir de 1000, de modo que la página de inicio muestra primero las de demostración.
- **Objetos**: un objeto de demostración recibe `demo: true` en su frontmatter.
- **Glosario** (`generate_glossary()`, en `scripts/telar/glossary_pages.py`): las entradas de demostración se escriben después de las del sitio, a partir de `_data/demo-glossary.json`. Cada una recibe `glossary_kind` (que resuelve `resolve_kind()`) y `demo: true`.

No se pueden publicar dos entradas del glosario cuyos identificadores produzcan la misma URL. `place_demo_terms()` decide qué entradas de demostración se escriben: si la URL de una entrada de demostración ya pertenece a una entrada del sitio, o a una entrada de demostración anterior, esa entrada se omite con una advertencia, y los enlaces a su identificador llevan a la página que ocupa esa URL. La misma función decide los enlaces de glosario de las historias de demostración, así que los enlaces y las páginas coinciden. Todos los identificadores de las entradas de demostración empiezan con `demo-`.

## Cómo se marca el contenido de demostración

Las plantillas leen la marca `demo` del frontmatter, y el motor de historias lee las marcas de las capas:

| Archivo | Qué muestra |
|---------|-------------|
| `_layouts/index.html` | Un `demo-badge` con `lang.demo.badge` en las tarjetas de las historias de demostración |
| `_layouts/story.html` | Un `intro-demo-label` con `lang.story.demo_label` en la tarjeta de inicio de una historia de demostración |
| `assets/js/telar-story/panels.js` | Un `demo-badge-inline` con `lang.demo.panel_badge` junto al título de un panel que tenga `layer1_demo` o `layer2_demo` |
| `_layouts/objects-index.html` | Muestra primero los objetos del sitio y después los de demostración |
| `_includes/object-grid-item.html` | Un `demo-badge` con `lang.demo.badge` en las tarjetas de los objetos de demostración |
| `_layouts/object.html` | Un `object-demo-label` con `lang.story.demo_label` en la página de un objeto de demostración |
| `_layouts/glossary-index.html` | Un `demo-badge-inline` con `lang.demo.badge` junto a las entradas de demostración |
| `_layouts/glossary.html` | Un `demo-badge-inline` con `lang.demo.panel_badge` en la página de una entrada de demostración |

`panels.js` toma el texto de la insignia del panel de `window.telarLang.demoPanelBadge`, que `_layouts/story.html` define a partir de `lang.demo.panel_badge`. Los textos están en `_data/languages/en.yml` y `es.yml`:

| Clave | Inglés | Español |
|-------|--------|---------|
| `demo.badge` | DEMO | DEMO |
| `demo.panel_badge` | Demo content | Contenido de demostración |
| `story.demo_label` | Demo content | Contenido de demostración |

## Archivos en disco

| Ruta | Lo escribe | Cuándo se borra |
|------|------------|-----------------|
| `_demo_content/telar-demo-bundle.json` | `save_bundle()` | Lo borra `cleanup_demo_content()` al comienzo de cada ejecución del script de descarga |
| `_data/{story_id}.json` de cada historia de demostración | `_write_demo_stories()` | Lo borra `_cleanup_stale_data_files()` cuando el paquete cargado ya no tiene esa historia |
| `_data/demo-glossary.json` | `_write_demo_glossary()` | El *build* no lo borra; una copia recién clonada del repositorio, como la de GitHub Actions, no lo tiene |
| Registros de demostración en `_data/project.json` y `_data/objects.json` | `_merge_demo_projects()`, `_merge_demo_objects()` | Se reescriben a partir de las hojas de cálculo del sitio en cada *build* |

`.gitignore` incluye `_demo_content/` y `_data/demo-glossary.json`.

## El repositorio de contenido de demostración

Los paquetes se construyen en el [repositorio de contenido de demostración](https://github.com/UCSB-AMPLab/demo-content), desde el cual se sirve content.telar.org.

### Estructura

El repositorio contiene:

| Ruta | Contenido |
|------|-----------|
| `demos/versions.json` | El índice de versiones que lee el script de descarga |
| `demos/v{version}/{language}/` | Las fuentes de un paquete y su `telar-demo-bundle.json` |
| `iiif/all-demo-objects.csv` | Las imágenes que el generador convierte en teselas (*tiles*), con los metadatos en inglés y en español para sus manifiestos |
| `iiif/sources/` | Las imágenes de origen de esas teselas |
| `iiif/objects/{object_id}/` | Los objetos IIIF alojados: `manifest.json`, `info.json` y las teselas |
| `assets/images/` | Imágenes que usan los paneles, como las de los carruseles |
| `generator/build-demos.py` | El generador de paquetes y teselas |

Un directorio de idioma contiene estos archivos de origen:

| Archivo | Contenido |
|---------|-----------|
| `demo-project.csv` | Una fila por historia |
| `demo-objects.csv` | Los objetos |
| `{story_id}.csv` | Un archivo por historia, que lleva el nombre de su `story_id` |
| `glossary.csv` o `glosario.csv` | Las entradas del glosario |
| `texts/stories/` | Los archivos Markdown a los que remiten las celdas de los paneles |

Los paquetes de la v1.8.0 tienen dos historias: `mujer-alegorica` (10 pasos) y `paisajes` (22 pasos) en español, y `allegorical-woman` y `colonial-landscapes` en inglés. Cada idioma tiene 12 objetos y 24 entradas del glosario.

### El generador

El generador arma un paquete a partir de los archivos de origen de un directorio de idioma y lo guarda en ese mismo directorio. Lee las siguientes columnas:

| Hoja de cálculo | Columnas |
|--------|----------|
| Proyecto | `order`, `story_id`, `title`, `subtitle`, `byline`, `show_sections` |
| Objetos | `title`, `description`, `source_url`, `creator`, `period`, `credit`, `thumbnail`, `year`, `object_type`, `subjects`, `featured`, `medium`, `alt_text`, `source` |
| Historia | `step`, `object`, `x`, `y`, `zoom`, `question`, `answer`, `alt_text`, `page`, `layer1_button`, `layer1_content`, `layer2_button`, `layer2_content` |
| Glosario | `term_id`, `title`, `definition`, `kind`, `related_terms` |

Acepta también los nombres de columna en español y los convierte a estos, como ocurre con las hojas de cálculo de cualquier sitio. Se omite una fila cuando su columna clave (`order`, `object_id`, `step` o `term_id`) está vacía o empieza con `#`, y también una fila de proyecto o de historia cuyo `order` o `step` no sea un número. `show_sections` se escribe como `true` cuando la celda dice `yes`, `true`, `sí` o `si`.

Una celda de capa que termina en `.md` se lee como una ruta dentro de `texts/stories/`: el generador le quita el frontmatter a ese archivo y, si este tiene `title`, lo usa como el `title` de la capa. Cualquier otro valor se usa como el Markdown del panel. Los elementos de un carrusel cuyas imágenes están en `assets/images/` del repositorio reciben `width` y `height`, para que el *build* del sitio no tenga que descargar las imágenes para darle tamaño al carrusel.

Para los objetos que aparecen en `iiif/all-demo-objects.csv`, el generador llena un `source_url` vacío con la URL del manifiesto del objeto en content.telar.org, y un `thumbnail` vacío a partir del `info.json` del objeto. Los demás objetos conservan el `source_url` que tienen en `demo-objects.csv`.

Después de construir un paquete, el generador reescribe `demos/versions.json` a partir de los directorios de versión que contienen un `telar-demo-bundle.json`.

Las opciones del generador son:

| Opción | Efecto |
|--------|--------|
| `--version`, `-v` | La versión del paquete que se va a construir, que corresponde a un directorio `demos/v{version}/`; es obligatoria, salvo con `--iiif-only` |
| `--bundle-only` | Construye solo los paquetes |
| `--iiif-only` | Genera solo las teselas IIIF |
| `--force` | Vuelve a generar las teselas que ya existen |
| `--base-url` | La URL base que se escribe en los manifiestos IIIF y en las URL que lleva el paquete; por defecto, `https://content.telar.org` |
| `--skip-validation` | Omite la validación de los manifiestos IIIF |

Para reconstruir los paquetes de la v1.8.0 sin volver a generar las teselas:

```bash
python generator/build-demos.py --version 1.8.0 --bundle-only
```

## Solución de problemas

### Ejecutar la descarga por separado

Desde la raíz de un sitio, ejecuta:

```bash
python3 scripts/fetch_demo_content.py
```

El script muestra la versión y el idioma del sitio que leyó, la versión del paquete que eligió, la URL del paquete y sus campos `_meta`, y cuántos proyectos, objetos, historias y entradas del glosario guardó.

### Revisar la incorporación

Al ejecutar `python3 scripts/csv_to_json.py`, la incorporación muestra una línea por cada parte: `Merged 2 demo project(s) into project.json`, una línea `Merged … demo object(s)`, una línea `Created demo story:` por cada historia y, con los paquetes de la v1.8.0, `Created _data/demo-glossary.json (24 demo terms)`. Si una parte falla, muestra en su lugar una línea `[WARN]`. Cada registro de demostración en `_data/project.json` y `_data/objects.json` tiene `"_demo": true`.

### Revisar los archivos publicados

Para ver qué versiones están publicadas y comprobar que se puede acceder a un paquete:

```bash
curl https://content.telar.org/demos/versions.json
curl -I https://content.telar.org/demos/v1.8.0/en/telar-demo-bundle.json
```

## Véase también

- [Contenido de demostración](/guia/personalizacion/contenido-demostracion/) — el contenido de demostración para quienes hacen un sitio
- [GitHub Actions](/guia/desarrolladores/github-actions/) — el flujo de trabajo **Build and Deploy**
