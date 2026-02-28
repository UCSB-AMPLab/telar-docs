---
layout: docs
title: "3.2. Referencia de configuración"
parent: "3. Configura tu proyecto"
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/configurar/configuracion/
---

# Configuración

Configura tu sitio Telar usando el archivo `_config.yml` en la raíz de tu repositorio.

## Ajustes del sitio

Información básica y apariencia del sitio:

```yaml
# Site Settings
title: Título de tu Narrativa
description: Una breve descripción de tu exposición narrativa
baseurl: "/nombre-repositorio"  # Para un subdirectorio en GitHub Pages
url: "https://usuario.github.io"
author: Tu Nombre
email: tu-email@ejemplo.com
telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin, o custom
logo: ""  # Ruta a imagen de logo (opcional)
telar_language: "en"  # Opciones: "en" (English), "es" (Español)
```

### baseurl vs. url

- **url**: Dominio base de tu sitio
- **baseurl**: Ruta después del dominio (usa `""` para el dominio raíz, o `/nombre-repo` para GitHub Pages)

**Ejemplos:**
```yaml
# Subdirectorio en GitHub Pages
url: "https://usuario.github.io"
baseurl: "/sitio-telar"
# Resultado: https://usuario.github.io/sitio-telar

# Dominio personalizado en la raíz
url: "https://misitio.org"
baseurl: ""
# Resultado: https://misitio.org
```

### Logo del sitio

Agrega un logo para reemplazar el título del sitio en la barra de navegación:

```yaml
logo: "/components/images/mi-logo.png"
```

- Pon la imagen de tu logo en `components/images/`
- Déjalo vacío (`logo: ""`) para mostrar el título del sitio como texto
- Dimensiones recomendadas: máximo 80px de alto, 200-300px de ancho
- Admite formatos PNG, JPG, SVG

## Selección de tema

Telar incluye 4 temas predefinidos:

```yaml
telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin, o custom
```

### Temas disponibles

- **paisajes** (predeterminado): Tonos tierra con terracota y oliva
- **neogranadina**: Burdeos colonial y dorado
- **santa-barbara**: Turquesa y coral modernos
- **austin**: Naranja quemado y azul pizarra

Consulta [Personalización: Temas](/guia/personalizacion/temas/) para ver detalles y cómo crear temas personalizados.

## Interfaz multilingüe

Telar v0.4.0+ admite interfaces en inglés y español:

```yaml
telar_language: "en"  # Opciones: "en" (English), "es" (Español)
```

Esta opción controla el idioma de los elementos de la interfaz, incluyendo navegación, botones, etiquetas, mensajes de error e instrucciones.

### Qué se traduce

El ajuste `telar_language` cambia el idioma de:

- **Menú de navegación**: **Home**, **Objects**, **Stories**, **Glossary**, **About**
- **Botones**: **Copy**, **Back**, **Learn More**, **Go Deeper**, etc.
- **Campos de metadatos**: *Creator*, *Period*, *Medium*, *Location*, *Credit*, etc.
- **Mensajes de error**: Todas las advertencias IIIF, errores de validación y problemas de configuración
- **Interfaz de historias**: Indicadores de paso, encabezados de panel, herramienta de coordenadas
- **Páginas de objetos**: Etiquetas de manifiestos IIIF, instrucciones de coordenadas
- **Glosario**: Encabezados de panel y elementos de navegación

### Qué permanece en tu idioma

El ajuste `telar_language` **no** traduce tu contenido:

- Narrativas y texto de panel (archivos markdown que escribes)
- Descripciones de objetos y metadatos (datos de tu CSV)
- Definiciones del glosario
- Contenido de la página About
- Título y descripción del sitio

{: .note }
> Si necesitas un sitio completamente bilingüe con contenido en múltiples idiomas, deberás crear sitios Telar separados para cada idioma.

### Detección de idioma en metadatos IIIF

Cuando Telar extrae metadatos de manifiestos IIIF, respeta tu ajuste `telar_language`:

- Para **sitios en inglés** (`en`): Prioriza metadatos en inglés y recurre a otros idiomas si no existen
- Para **sitios en español** (`es`): Prioriza metadatos en español, luego en inglés, y finalmente en otros idiomas

Así, los metadatos se muestran en el idioma más adecuado disponible desde la institución fuente.

## Integración con Google Sheets

Gestiona contenido mediante Google Sheets en lugar de editar archivos CSV directamente:

```yaml
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/TU_ID_HOJA_CALCULO/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/TU_ID_PUBLICADO/pubhtml"
```

### Pasos de configuración

1. **Obtén la plantilla**: Duplica la plantilla en [bit.ly/telar-template](https://bit.ly/telar-template)
2. **Comparte tu hoja**: Establécela en "Anyone with the link (Viewer access)"
3. **Publica tu hoja**: **File** → **Share** → **Publish to web**
4. Pega ambas URLs en `_config.yml`
5. Pon `enabled: true`
6. Confirma los cambios

**Descarga automatizada:**
- **GitHub Pages**: GitHub Actions descubre automáticamente los GIDs de pestañas y obtiene los CSV
- **Desarrollo local**: Ejecuta `python3 scripts/fetch_google_sheets.py` antes de compilar

{: .warning }
> Ambas URLs son necesarias. La URL compartida sirve para visualización; la URL publicada, para la obtención automatizada.

Consulta [Referencia de Google Sheets](/guia/tus-datos/google-sheets/) para instrucciones completas de configuración.

## Ajustes de la interfaz de historias

Controla cómo se muestran y se comportan las historias:

```yaml
story_interface:
  show_on_homepage: true  # Ponlo en false para ocultar la sección de historias de la página principal
  show_story_steps: true  # Ponlo en false para ocultar la superposición "Step X"
  show_object_credits: true  # Ponlo en false para ocultar la etiqueta de créditos en objetos
  include_demo_content: false  # Ponlo en true para habilitar historias de demostración
```

### show_on_homepage

Controla si la sección de historias aparece en la página principal:

- **`true` (predeterminado)**: Las historias aparecen en la página principal como tarjetas
- **`false`**: Oculta la sección de historias de la página principal (las historias siguen accesibles por URL directa)

Úsalo cuando quieras tener objetos en la página principal pero prefieras que las historias se accedan a través de la navegación o enlaces directos en lugar de las tarjetas de la página principal.

### show_story_steps

Controla si el indicador **Step X** aparece en la esquina superior izquierda del visor de historias.

- **`true` (predeterminado)**: Muestra **Step 1**, **Step 2**, etc. en el visor
- **`false`**: Oculta los indicadores para una experiencia más limpia e inmersiva

Es solo un cambio visual; las personas siguen pudiendo navegar por los pasos normalmente.

### include_demo_content

Habilita historias de demostración pre-construidas que muestran las funcionalidades de Telar:

- **`false` (predeterminado)**: El sitio contiene solo tu contenido
- **`true`**: Agrega historias de tutorial y ejemplos a tu sitio

Las historias de demostración aparecen junto con tu propio contenido con una etiqueta de "Contenido de demostración". Se obtienen automáticamente durante el proceso de compilación y se ajustan al idioma de tu sitio.

**Cuándo habilitar:**
- Aprendiendo cómo estructurar historias
- Probando funcionalidades de Telar sin crear contenido
- Mostrando a partes interesadas lo que Telar puede hacer

**Cuándo deshabilitar:**
- Publicando tu sitio de producción final
- Probando solo tu propio contenido

Consulta [Contenido de Demostración](/guia/personalizacion/contenido-demostracion/) para detalles completos sobre las demos disponibles.

### show_object_credits

Controla la etiqueta de atribución de créditos en páginas de objetos:

- **`true` (predeterminado)**: Muestra etiqueta de créditos en todos los objetos con información de crédito
- **`false`**: Oculta la etiqueta de créditos (la información de crédito sigue accesible mediante la tabla de metadatos)

La etiqueta de créditos se muestra en la esquina superior derecha de las imágenes de objetos, mostrando la atribución del campo `credit` en tu `objects.csv`.

## Ajustes de la interfaz de colección

Controla cómo se muestra y se comporta la galería de objetos:

```yaml
collection_interface:
  browse_and_search: true  # Ponlo en false para desactivar la barra lateral de filtros y la búsqueda
  show_link_on_homepage: true  # Ponlo en false para ocultar el enlace "View the objects"
  show_sample_on_homepage: true  # Ponlo en true para mostrar objetos de muestra en la página principal
  featured_count: 4  # Cantidad de objetos a mostrar en la página principal
```

### browse_and_search

Controla la barra lateral de filtrado y la búsqueda de texto completo de la galería:

- **`true` (predeterminado)**: La página de objetos muestra una barra lateral de filtros con facetas (tipo, creador, periodo, temas) y una barra de búsqueda con Lunr.js
- **`false`**: La página de objetos muestra una cuadrícula simple sin filtrado ni búsqueda

### show_link_on_homepage

Controla el enlace "View the objects" en la página principal:

- **`true` (predeterminado)**: Muestra un enlace a la galería de objetos en la página principal
- **`false`**: Oculta el enlace (la página de objetos sigue accesible a través de la navegación)

### show_sample_on_homepage

Controla si los objetos de muestra aparecen en la página principal:

- **`true` (predeterminado)**: Muestra una muestra de objetos en la página principal, tomados de los marcados como `featured` en objects.csv (o aleatorios si ninguno está destacado)
- **`false`**: No se muestran objetos en la página principal

### featured_count

Cantidad de objetos a mostrar en la página principal cuando `show_sample_on_homepage` es true:

- **Predeterminado**: `4`
- Prioriza objetos marcados `featured: yes` en objects.csv
- Si hay menos objetos destacados que `featured_count`, llena los espacios restantes aleatoriamente

## Protección de historias

Encripta historias para que solo las personas con la clave correcta puedan acceder a ellas:

```yaml
story_key: "tu-clave-secreta"
```

- Las historias con `protected: yes` en project.csv se encriptan durante la compilación
- Las personas acceden a historias protegidas mediante un parámetro de URL: `?key=tu-clave-secreta`
- Deja `story_key` vacío u omítelo para desactivar la protección de historias
- Consulta [Historias Privadas](/guia/funciones/historias-privadas/) para detalles de configuración

{: .warning }
> La protección de historias usa encriptación del lado del cliente. Previene el acceso casual pero no es adecuada para contenido altamente sensible. Para mayor seguridad, usa un repositorio privado de GitHub.

## Ajustes avanzados

Los siguientes ajustes están pre-configurados y normalmente no necesitan modificación a menos que estés haciendo una personalización avanzada.

{: .warning }
> **No editar**
> El `_config.yml` de Telar incluye una línea: "PLEASE DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING". Las secciones debajo de esta línea están configuradas automáticamente y rara vez necesitan cambios.

### Colecciones

Las colecciones Jekyll definen tipos de contenido:

```yaml
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
```

{: .note }
> Normalmente no necesitas modificar la configuración de colecciones, a menos que estés haciendo una personalización avanzada.

El ajuste `collections_dir` indica a Jekyll dónde encontrar los archivos de trabajo autogenerados.

### Defaults

Valores predeterminados de plantilla para cada colección:

```yaml
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
```

### Ajustes de construcción

Configuración estándar de compilación de Jekyll:

```yaml
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

# Indica a Jekyll que no espere fechas para las colecciones
future: true
show_drafts: false
```

### Plugins

Plugin necesario:

```yaml
plugins:
  - jekyll-seo-tag
```

Se instala automáticamente cuando ejecutas `bundle install`.

### Versión de Telar

Información de versión (actualizada automáticamente durante lanzamientos):

```yaml
telar:
  version: "0.8.0-beta"
  release_date: "2026-02-05"
```

### Funciones de desarrollo

Opciones para desarrollo, pruebas y situaciones especiales (por favor no edites estos ajustes a menos que sepas lo que estás haciendo):

```yaml
development-features:
  christmas_tree_mode: false
  viewer_preloading:
    max_viewer_cards: 10
    preload_steps: 6
    loading_threshold: 5
    min_ready_viewers: 3
  skip_stories: false
  skip_collections: false
```

#### christmas_tree_mode

Muestra todos los mensajes de advertencia para probar el soporte multilingüe:

- **`false` (predeterminado)**: Operación normal
- **`true`**: Muestra objetos de prueba con errores falsos para verificar que los mensajes de advertencia se muestren correctamente

Usa esto solo al probar traducciones o el estilo de mensajes de advertencia.

#### viewer_preloading

Controla cómo se precargan los visores de historias para una navegación más fluida:

- **max_viewer_cards** (predeterminado: 10, máximo: 15): Cantidad máxima de visores en memoria
- **preload_steps** (predeterminado: 6): Pasos a precargar por delante de la posición actual
- **loading_threshold** (predeterminado: 5): Mostrar el efecto de carga en la introducción si la historia tiene este número o más de visores
- **min_ready_viewers** (predeterminado: 3): Ocultar el efecto de carga cuando esté lista esta cantidad de visores

Valores más altos = navegación más fluida pero mayor uso de memoria. Los valores predeterminados funcionan bien para la mayoría de los sitios.

#### skip_stories

Compila un sitio sin historias, manteniendo solo los objetos visibles:

- **`false` (predeterminado)**: Las historias se generan y muestran normalmente
- **`true`**: Omite la generación de historias y oculta la sección de historias de la página de inicio

Usa esto cuando quieras mostrar objetos sin historias narrativas, o al construir un sitio estilo catálogo.

{: .note }
> Renombrado desde `hide_stories` en v0.8.0. El nombre anterior sigue funcionando por compatibilidad.

#### skip_collections

Compila un sitio con solo páginas personalizadas (sin objetos ni historias):

- **`false` (predeterminado)**: Los objetos e historias se generan normalmente
- **`true`**: Omite la generación de objetos e historias, oculta la sección de historias y la muestra de objetos de la página de inicio, elimina `/objects/` de la navegación

Usa esto al construir un sitio con solo páginas personalizadas (como una página "Acerca de" o de inicio) sin ninguna colección.

{: .note }
> Cuando `skip_collections` está habilitado, `skip_stories` se activa automáticamente. Renombrado desde `hide_collections` en v0.8.0 — el nombre anterior sigue funcionando por compatibilidad.

## Ejemplo completo

Aquí hay un ejemplo completo de `_config.yml`:

```yaml
# Site Settings
title: Textiles Coloniales
description: Una exposición de textiles de la era colonial de las Américas
baseurl: "/textiles-coloniales"
url: "https://usuario.github.io"
author: Jane Smith
email: jane@ejemplo.com
telar_theme: "paisajes"
logo: ""
telar_language: "es"

# Story Interface Settings
story_interface:
  show_on_homepage: true
  show_story_steps: true
  show_object_credits: true
  include_demo_content: false

# Collection Interface Settings
collection_interface:
  browse_and_search: true
  show_link_on_homepage: true
  show_sample_on_homepage: true
  featured_count: 4

# Story Protection (opcional)
# story_key: "tu-clave-secreta"

# Google Sheets Integration (opcional)
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/ABC123/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/XYZ789/pubhtml"

#
# PLEASE DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
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

future: true
show_drafts: false

# Telar Settings
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
```

## Véase también

- [Validador de Configuración](/guia/configurar/validador-de-configuracion/) — Revisa tu `_config.yml` en busca de errores comunes
- [Generador y editor de configuración](/guia/configurar/generador-de-configuracion/) — Genera o edita un archivo `_config.yml`
- [Personaliza tu Tema](/guia/personalizacion/temas/)
- [Personaliza tu Página de Inicio](/guia/personalizacion/pagina-de-inicio/)
- [Configura el Menú de Navegación](/guia/personalizacion/menu-navegacion/)
- [Contenido de Demostración](/guia/personalizacion/contenido-demostracion/)
- [Historias Privadas](/guia/funciones/historias-privadas/)
- [Referencia CSV: Proyecto y Objetos](/guia/tus-datos/csv-proyecto/)
- [GitHub Actions](/guia/desarrolladores/github-actions/)
