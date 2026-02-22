---
layout: docs
title: 3. Estructura de Contenido
parent: Documentación
nav_order: 3
has_children: true
lang: es
permalink: /guia/estructura-de-contenido/
---

# Estructura de contenido

Telar usa una **arquitectura basada en componentes** que separa el contenido fuente de los archivos generados.

## Carpeta de componentes

La carpeta `components/` contiene todo el contenido fuente editable:

```
components/
├── structures/           # Archivos CSV con datos organizacionales
│   ├── project.csv       # Lista de historias y orden de visualización
│   ├── objects.csv       # Metadatos del catálogo de objetos
│   ├── your-story.csv    # Pasos de la historia con coordenadas
│   ├── glossary.csv      # Términos de glosario (opcional)
│   └── story-1.csv       # Historias adicionales
├── images/               # Todas las imágenes (fuente IIIF y adicionales)
└── texts/
    ├── stories/          # Archivos markdown para paneles de historias
    │   └── your-story/
    │       ├── step1-layer1.md
    │       └── step1-layer2.md
    ├── pages/            # Páginas personalizadas (acerca de, créditos, etc.)
    │   ├── about.md
    │   └── credits.md
    └── glossary/         # Definiciones de glosario (formato markdown legado)
        └── term.md
```

### Principios clave

- **Archivos CSV** definen la estructura — qué historias existen, qué objetos usan, dónde hacer zoom
- **Archivos markdown** contienen contenido narrativo extenso para paneles de historias, páginas personalizadas y definiciones de glosario
- **Imágenes** en `components/images/` se procesan automáticamente en teselas (*tiles*) IIIF para los objetos listados en `objects.csv`

## Tipos de contenido

### Objetos

Los objetos son los elementos visuales que tus historias exploran — imágenes, mapas, documentos, fotografías. Defínelos en `objects.csv` con metadatos como título, creador, año y descripción. Los objetos aparecen en una galería navegable con búsqueda y filtrado.

Consulta [Objetos y Galería](/guia/estructura-de-contenido/objetos-galeria/).

### Historias

Las historias son narrativas paso a paso construidas alrededor de tus objetos. Cada paso hace zoom en una región específica de una imagen y presenta una pregunta con paneles de detalle expandibles. Define los pasos en archivos CSV individuales (uno por historia).

Consulta [Historias y Paneles](/guia/estructura-de-contenido/historias-paneles/).

### Historias privadas

Las historias se pueden encriptar para que solo las personas con la clave correcta puedan acceder a ellas. Útil para contenido en desarrollo, materiales de clase o acceso restringido.

Consulta [Historias Privadas](/guia/estructura-de-contenido/historias-privadas/).

### Widgets

Enriquece los paneles de las historias y las páginas personalizadas con elementos interactivos: carruseles de imágenes, paneles con pestañas y secciones de acordeón plegables.

Consulta [Widgets](/guia/estructura-de-contenido/widgets/).

### Glosario

Define términos que las personas pueden consultar desde las historias. Los enlaces de glosario abren un panel lateral deslizante sin interrumpir la narrativa. Define términos en un archivo CSV o como archivos markdown individuales.

Consulta [Glosario](/guia/estructura-de-contenido/glosario/).

### Páginas personalizadas

Crea páginas independientes para contenido fuera de la estructura de historias — páginas de créditos, metodología, bibliografías. Las páginas personalizadas admiten formato markdown completo y widgets.

Consulta [Páginas Personalizadas](/guia/estructura-de-contenido/paginas-personalizadas/).

## Soporte de CSV bilingüe

Todos los archivos CSV admiten nombres de columnas en inglés y en español. Puedes usar cualquiera de los dos idiomas de forma consistente, mezclarlos o incluir encabezados dobles para equipos bilingües:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido,por Dra. María García
```

Telar detecta automáticamente y omite la segunda fila de encabezado. También se admiten nombres de archivos en español (`proyecto.csv`, `objetos.csv`).

Consulta las páginas de referencia CSV para los mapeos completos de nombres de columnas: [Proyecto y Objetos](/guia/referencia/csv-proyecto-objetos/), [Historias y Glosario](/guia/referencia/csv-historias-glosario/).

## Archivos generados

Durante la compilación, Telar genera archivos de trabajo en `_jekyll-files/`:

- `_jekyll-files/_stories/` — Páginas de historias
- `_jekyll-files/_objects/` — Páginas de objetos
- `_jekyll-files/_glossary/` — Entradas de glosario

{: .warning }
> Los archivos en `_jekyll-files/` se autogeneran. Siempre edita los archivos fuente en `components/`.

## Integración con Google Sheets

Cuando uses Google Sheets, los datos CSV se gestionan en una hoja de cálculo y se obtienen automáticamente durante la compilación — no es necesario editar CSV manualmente. Consulta [Referencia de Google Sheets](/guia/flujos-de-trabajo/google-sheets/) para la configuración.
