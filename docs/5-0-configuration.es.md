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

## Ajustes básicos

```yaml
title: Título de tu Narrativa
description: Una breve descripción de tu exposición narrativa
baseurl: "/nombre-repositorio"  # Para un subdirectorio en GitHub Pages
url: "https://usuario.github.io"
author: Tu Nombre
email: tu-email@ejemplo.com
logo: "/components/images/mi-logo.png"  # Logo del sitio (opcional)
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

## Integración con Google Sheets

Configura Google Sheets para gestionar el contenido:

```yaml
google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/TU_ID_HOJA_CALCULO/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/TU_ID_PUBLICADO/pub?output=csv"
```

### Cómo obtener tus URLs

**URL Compartida:**
1. Haz clic en el botón **Share** en Google Sheets
2. Establece en "Anyone with the link (Viewer)"
3. Copia la URL

**URL Publicada:**
1. **File** → **Share** → **Publish to web**
2. Haz clic en **Publish**
3. Copia la URL

{: .warning }
> **Importante**
> Ambas URLs son necesarias. La URL compartida sirve para visualización; la URL publicada, para la obtención automatizada.

## Selección de Tema

Telar incluye 4 temas predefinidos:

```yaml
telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin
```

### Temas disponibles

- **paisajes** (predeterminado): Tonos tierra con terracota y oliva
- **neogranadina**: Burdeos colonial y dorado
- **santa-barbara**: Turquesa y coral modernos
- **austin**: Naranja quemado y azul pizarra

Consulta [Personalización: Temas](/guia/personalizacion/temas/) para ver detalles y cómo crear temas personalizados.

## Interfaz multilingüe

Telar v0.4.0+ admite interfaces en inglés y español. Esta opción controla el idioma de los elementos de interfaz, incluyendo navegación, botones, etiquetas, mensajes de error e instrucciones.

```yaml
telar_language: "en"  # Opciones: "en" (English), "es" (Español)
```

### Qué se traduce

El ajuste `telar_language` cambia el idioma de:

- **Menú de navegación**: Home, Objects, Stories, Glossary, About
- **Botones**: Copy, Back, Learn More, Go Deeper, etc.
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
> **Nota sobre la traducción de contenido**
> Si necesitas un sitio completamente bilingüe, crea instalaciones separadas de Telar para cada idioma o espera el sistema multilingüe de contenido previsto para la versión 0.5.0.

### Configura tu idioma

**Sitios nuevos:** Selecciona el idioma cuando configures tu sitio en `_config.yml`.

**Sitios existentes:** Agrega o actualiza la opción en tu `_config.yml`:

```yaml
# Configuración del sitio
title: Mi exposición
description: Una descripción de mi sitio
telar_language: "es"  # Cambia de "en" a "es" para español
```

Luego recompila tu sitio:

```bash
bundle exec jekyll build
```

### Detección de idioma en metadatos IIIF

Cuando Telar extrae metadatos de manifiestos IIIF, respeta tu ajuste `telar_language`:

- Para **sitios en inglés** (`en`): Prioriza metadatos en inglés y recurre a otros idiomas si no existen
- Para **sitios en español** (`es`): Prioriza metadatos en español, luego en inglés, y finalmente en otros idiomas

Así, los metadatos se muestran en el idioma más adecuado disponible desde la institución fuente.

{: .warning }
> **Plantilla de Google Sheets en español**
> Si vas a crear un sitio en español con integración de Google Sheets, usa la plantilla en español que incluye encabezados y notas traducidas.

### Archivos de idioma

Las traducciones de la interfaz se almacenan en:

- `_data/lang/en.yml` - Cadenas en inglés
- `_data/lang/es.yml` - Cadenas en español

Estos archivos los mantiene el proyecto Telar y se actualizan automáticamente cuando haces *upgrade* a nuevas versiones.

## Ajustes de la interfaz de historias

Controla cómo se muestran y se comportan las historias:

```yaml
story_interface:
  show_story_steps: true  # Ponlo en false para ocultar la superposición "Step X"
  include_demo_content: false  # Función de la versión 0.5.0 (aún no disponible)
```

### show_story_steps

Controla si el indicador **Step X** aparece en la esquina superior izquierda del visor de historias.

- **`true` (predeterminado)**: Muestra **Step 1**, **Step 2**, etc. en el visor
- **`false`**: Oculta los indicadores para una experiencia más limpia e inmersiva

Es un cambio visual; las personas siguen pudiendo navegar por los pasos normalmente.

### include_demo_content

Reservado para versiones futuras (v0.5.0). Permitirá incluir historias de demostración y contenido desde un repositorio externo.

## Navegación

Configura la navegación del sitio:

```yaml
# Mostrar/ocultar secciones
show_objects: true
show_glossary: true
show_about: true
```

## Colecciones

Las colecciones Jekyll están preconfiguradas para historias, objetos y glosario:

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
```

{: .note }
> **Nota**
> Normalmente no necesitas modificar la configuración de colecciones, a menos que estés haciendo una personalización avanzada.

## Ajustes de construcción

Configuración estándar de construcción de Jekyll:

```yaml
markdown: kramdown
permalink: pretty
exclude:
  - Gemfile
  - Gemfile.lock
  - scripts/
  - components/
  - README.md
```

## Plugins

Plugins necesarios:

```yaml
plugins:
  - jekyll-seo-tag
```

Se instalan automáticamente cuando ejecutas `bundle install`.

## Ejemplo completo

Aquí hay un ejemplo completo de `_config.yml`:

```yaml
title: Textiles Coloniales
description: Una exposición de textiles de la era colonial de las Américas
baseurl: "/textiles-coloniales"
url: "https://usuario.github.io"
author: Jane Smith
email: jane@ejemplo.com
logo: ""  # Opcional: ruta a la imagen del logo

telar_theme: "paisajes"

google_sheets:
  enabled: true
  shared_url: "https://docs.google.com/spreadsheets/d/ABC123/edit?usp=sharing"
  published_url: "https://docs.google.com/spreadsheets/d/e/XYZ789/pub?output=csv"

show_objects: true
show_glossary: true
show_about: true

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

markdown: kramdown
permalink: pretty

plugins:
  - jekyll-seo-tag

exclude:
  - Gemfile
  - Gemfile.lock
  - scripts/
  - components/
  - README.md
```

## Próximos pasos

- [Personaliza tu Tema](/guia/personalizacion/temas/)
- [Personaliza tu página inicial](/guia/personalizacion/pagina-de-inicio/)
- [Aprende sobre GitHub Actions](/guia/referencia/github-actions/)
- [Explora Estilos Avanzados](/guia/personalizacion/estilos/)

{% include last-modified.html %}