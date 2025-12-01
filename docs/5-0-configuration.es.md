---
layout: docs
title: 5. Configuración
parent: Documentación
nav_order: 5
lang: es
permalink: /guia/configuracion/
---

# Configuración

Configura tu sitio de Telar mediante el archivo `_config.yml` en la raíz de tu repositorio.

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

## Selección de Tema

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

Esta opción controla el idioma de los elementos de interfaz, incluyendo navegación, botones, etiquetas, mensajes de error e instrucciones.

### Qué se traduce

El ajuste `telar_language` cambia el idioma de:

 - **Menú de navegación**: **Home**, **Objects**, **Stories**, **Glossary**, **About**
 - **Botones**: **Copy**, **Back**, **Learn More**, **Go Deeper**, etc.
- **Campos de metadatos**: Creator, Period, Medium, Location, Credit, etc.
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

### Pasos de Configuración

1. **Obtén la plantilla**: Duplica la plantilla en [bit.ly/telar-template](https://bit.ly/telar-template)
2. **Comparte tu hoja**: Establécela en "Anyone with the link (Viewer access)"
3. **Publica tu hoja**: **File** → **Share** → **Publish to web**
4. Pega ambas URLs en `_config.yml`
5. Pon `enabled: true`
6. Confirma los cambios

**Obtención automatizada:**
- **GitHub Pages**: GitHub Actions descubre automáticamente los GIDs de pestañas y obtiene los CSVs
- **Desarrollo local**: Ejecuta `python3 scripts/fetch_google_sheets.py` antes de compilar

{: .warning }
> Ambas URLs son necesarias. La URL compartida sirve para visualización; la URL publicada, para la obtención automatizada.

Consulta [Flujo de trabajo con Google Sheets](/guia/flujos-de-trabajo/google-sheets/) para instrucciones completas de configuración.

## Ajustes de la interfaz de historias

Controla cómo se muestran y se comportan las historias:

```yaml
story_interface:
  show_story_steps: true  # Ponlo en false para ocultar la superposición "Step X"
  include_demo_content: false  # Ponlo en true para habilitar historias de demostración
  show_object_credits: true  # Ponlo en false para ocultar la etiqueta de créditos en objetos
```

### show_story_steps

Controla si el indicador **Step X** aparece en la esquina superior izquierda del visor de historias.

- **`true` (predeterminado)**: Muestra **Step 1**, **Step 2**, etc. en el visor
- **`false`**: Oculta los indicadores para una experiencia más limpia e inmersiva

Es un cambio visual; las personas siguen pudiendo navegar por los pasos normalmente.

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

Consulta [Contenido de Demostración](/guia/iiif/contenido-demostracion/) para detalles completos sobre las demos disponibles.

### show_object_credits

Controla la etiqueta de atribución de créditos en páginas de objetos:

- **`true` (predeterminado)**: Muestra etiqueta de créditos en todos los objetos con información de crédito
- **`false`**: Oculta la etiqueta de créditos (la información de crédito sigue accesible mediante la tabla de metadatos)

La etiqueta de créditos se muestra en la esquina superior derecha de las imágenes de objetos, mostrando la atribución del campo `credit` en tu `objects.csv`.

## Ajustes Avanzados

Los siguientes ajustes están pre-configurados y normalmente no necesitan modificación a menos que estés haciendo una personalización avanzada.

{: .warning }
> **No Editar**
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
  version: "0.6.1-beta"
  release_date: "2025-11-28"
```

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
  show_story_steps: true
  show_object_credits: true
  include_demo_content: false

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
  version: "0.6.1-beta"
  release_date: "2025-11-28"

# Plugins
plugins:
  - jekyll-seo-tag
```

## Próximos pasos

- [Personaliza tu Tema](/guia/personalizacion/temas/)
- [Personaliza tu Página de Inicio](/guia/personalizacion/pagina-de-inicio/)
- [Configura el Menú de Navegación](/guia/personalizacion/menu-navegacion/)
- [Aprende Sobre Contenido de Demostración](/guia/iiif/contenido-demostracion/)
- [Explora GitHub Actions](/guia/desarrolladores/github-actions/)
