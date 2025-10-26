---
layout: default
title: 5. Configuración
parent: Documentación
nav_order: 5
lang: es
permalink: /documentacion/5-configuracion/
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

Consulta [Personalización: Temas](/documentacion/6-personalizacion/1-temas/) para ver detalles y cómo crear temas personalizados.

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

- [Personaliza tu Tema](/documentacion/6-personalizacion/1-temas/)
- [Aprende sobre GitHub Actions](/documentacion/7-referencia/1-github-actions/)
- [Explora Estilos Avanzados](/documentacion/6-personalizacion/2-estilos/)

{% include last-modified.html %}