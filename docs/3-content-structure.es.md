---
layout: default
title: 3. Estructura de Contenido
parent: Documentación
nav_order: 3
lang: es
permalink: /documentacion/3-estructura-de-contenido/
---

## Estructura de contenido

Telar usa una **arquitectura basada en componentes** que separa el contenido fuente de los archivos generados.

## Carpeta components (fuente de verdad)

La carpeta `components/` contiene todo el contenido fuente editable:

```
components/
├── structures/           # Archivos CSV con datos organizacionales
│   ├── project.csv       # Configuración del sitio y lista de historias
│   ├── objects.csv       # Metadatos del catálogo de objetos
│   └── story-1.csv       # Estructura de historia con coordenadas de pasos
├── images/
│   ├── objects/          # Imágenes fuente para procesamiento IIIF
│   └── additional/       # Otras imágenes usadas en el sitio
└── texts/
    ├── stories/          # Contenido de las capas de la historia (markdown)
    │   └── story1/       # Subcarpetas opcionales para organización
    │       ├── paso1-capa1.md
    │       ├── paso1-capa2.md
    │       └── ...
    └── glossary/         # Definiciones de glosario (markdown)
        ├── termino1.md
        └── ...
```

### Principios clave

- **Archivos CSV** contienen datos estructurales (coordenadas, referencias de archivos)
- **Archivos Markdown** contienen contenido narrativo de formato largo
- **Imágenes** se procesan automáticamente en _tiles_ IIIF

## Estructura CSV de historia

Cada CSV de historia (ej., `story-1.csv`) contiene datos de navegación paso a paso:

```csv
step,question,answer,object,x,y,zoom,layer1_button,layer1_file,layer2_button,layer2_file
1,"Texto de pregunta","Respuesta breve","obj-001",0.5,0.5,1.0,"","story1/paso1-capa1.md","","story1/paso1-capa2.md"
```

### Referencia de columnas

| Columna | Descripción |
|---------|-------------|
| `step` | Número de paso |
| `question` | Encabezado mostrado en historia |
| `answer` | Texto de respuesta breve |
| `object` | ID de objeto de objects.csv |
| `x, y, zoom` | Coordenadas del visor IIIF (0-1 normalizadas) |
| `layer1_button` | Texto de botón personalizado (vacío = "Learn more") |
| `layer1_file` | Ruta a archivo markdown en `components/texts/stories/` |
| `layer2_button` | Texto de botón personalizado (vacío = "Go deeper") |
| `layer2_file` | Ruta a archivo markdown en `components/texts/stories/` |

{: .note }
> **Comportamiento de botones**
> Si las columnas de botones están vacías, aparece el texto predeterminado. Si proporcionas texto, se usará en su lugar.

## Estructura CSV de objetos

El archivo `objects.csv` cataloga todos los objetos:

```csv
object_id,title,description,creator,date,medium,dimensions,location,credit,thumbnail,iiif_manifest
textile-001,Textil Colonial,Un fragmento tejido...,Desconocido,circa 1650,Lana,45 x 60 cm,,,
```

Para recursos IIIF externos, incluye la URL `iiif_manifest`.

## Archivos markdown

### Archivos de las capas de la historia

Los archivos de las capas de la historia contienen el contenido narrativo detallado:

```markdown
---
title: "Técnicas de Tejido"
---

El patrón de urdimbre entrelazada visible aquí indica una
técnica de tejido compleja que era común en el período colonial.

## Detalles técnicos

Estos patrones se crearon usando...
```

{: .tip }
> **Referencia Completa de Markdown**
> Consulta la [Guía de Sintaxis de Markdown](/docs/reference/markdown-syntax/) para todas las opciones de formato disponibles, incluyendo dimensionamiento de imágenes, incrustación de medios enriquecidos y mejores prácticas.

### Archivos de glosario

Los archivos de glosario definen términos referenciados en tus narrativas:

```markdown
---
term_id: periodo-colonial
title: "Período Colonial"
related_terms: encomienda,virreinato
---

El Período Colonial en las Américas comenzó con...
```

## Colecciones de Jekyll

Los archivos autogenerados viven en `_jekyll-files/`:

- `_jekyll-files/_stories/`: Narrativas de scrollytelling
- `_jekyll-files/_objects/`: Metadatos de objetos
- `_jekyll-files/_glossary/`: Términos de glosario

{: .warning }
> **No editar**
> Los archivos en `_jekyll-files/` se autogeneran. Siempre edita archivos fuente en `components/` o `_data/` en su lugar.

## Integración con Google Sheets

Cuando uses Google Sheets (recomendado):

1. Edita contenido en tu Google Sheet
2. Los scripts automáticamente obtienen y convierten a formato CSV
3. Los archivos CSV se procesan en JSON para Jekyll
4. ¡No se necesita edición manual de CSV!

Consulta [GitHub Actions](/documentacion/7-referencia/1-github-actions/) para ver cómo funciona esta automatización.
