---
layout: docs
title: 3. Estructura de Contenido
parent: Documentación
nav_order: 3
lang: es
permalink: /guia/estructura-de-contenido/
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
- **Imágenes** se procesan automáticamente en teselas (*tiles*) IIIF

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
> Consulta la [Guía de Sintaxis de Markdown](/guia/referencia/sintaxis-markdown/) para todas las opciones de formato disponibles, incluyendo dimensionamiento de imágenes, incrustación de medios enriquecidos y mejores prácticas.

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

### Autoenlaces del glosario

Puedes crear enlaces dentro del texto a términos del glosario usando sintaxis tipo wiki:

```markdown
El [[colonial-period]] comenzó con el establecimiento de [[viceroyalty|virreinatos]].
```

**Sintaxis:**
- `[[term_id]]` - Crea un enlace al término y muestra el título del término
- `[[term_id|custom text]]` - Crea un enlace al término y muestra el texto personalizado

Cuando las personas hacen clic en estos enlaces, la definición del glosario se abre en un panel lateral deslizante sin abandonar la historia.

## Widgets en los paneles de la historia

Telar v0.4.0+ incluye un sistema de widgets interactivos para presentar contenido enriquecido dentro de los paneles de las historias. Los widgets te permiten incrustar carruseles, contenido con pestañas y secciones plegables directamente en tus archivos markdown.

### Widgets disponibles

**Carrusel** - Carrusel de imágenes con controles de navegación
**Pestañas** - Paneles con pestañas para información multiperspectiva
**Acordeón** - Secciones plegables para contenido jerárquico

### Sintaxis de widgets

Los widgets usan la sintaxis de contenedor estilo CommonMark con triple dos puntos:

```markdown
:::widget_type
contenido del widget aquí
:::
```

### Widget de carrusel

Muestra varias imágenes con controles de navegación, leyendas y créditos.

**Sintaxis:**
```markdown
:::carousel
image: story1/map.jpg
alt: Mapa histórico de la región
caption: Mapa de 1650 que muestra los límites coloniales
credit: National Archives

---

image: story1/document.jpg
alt: Documento colonial
caption: Decreto real que establece el asentamiento
credit: Archivo General de Indias
:::
```

**Campos:**
- `image` (obligatorio) - Ruta relativa a `assets/images/`
- `alt` (recomendado) - Descripción para accesibilidad
- `caption` (opcional) - Texto que se muestra debajo de la imagen; admite markdown (ej., `*cursivas*`)
- `credit` (opcional) - Línea de atribución; admite markdown

**Imágenes externas:** Puedes usar URLs completas para imágenes alojadas en otros servidores:
```markdown
image: https://example.org/images/photo.jpg
```

{: .note }
> **Separador**
> Usa `---` para separar elementos del carrusel

### Widget de pestañas

Organiza contenido en pestañas conmutables, ideal para presentar distintas perspectivas o fuentes.

**Sintaxis:**
```markdown
:::tabs
## Relato español
Las autoridades reales reportaron que el levantamiento comenzó el...

Los registros históricos muestran testimonios contradictorios...

## Perspectiva indígena
Las lideresas y los líderes comunitarios organizaron la resistencia...

Las tradiciones orales describen una respuesta coordinada...

## Análisis contemporáneo
Hoy las personas historiadoras reconocen este evento como...
:::
```

**Estructura:**
- Cada `## Encabezado` crea una pestaña nueva
- El contenido entre encabezados se convierte en el contenido de la pestaña
- Se admite la sintaxis estándar de Markdown
- Mínimo 2 pestañas, máximo 4 pestañas

### Widget de acordeón

Crea paneles plegables para secuencias cronológicas, información jerárquica o detalles opcionales.

**Sintaxis:**
```markdown
:::accordion
## 1600-1650: Primer periodo colonial
La corona española estableció estructuras administrativas en todo el territorio.

Las poblaciones indígenas se reorganizaron en asentamientos...

## 1650-1700: Consolidación
Los sistemas de hacienda se afianzaron a medida que maduraba la economía colonial.

## 1700-1750: Era de reformas
Las reformas borbónicas retaron las estructuras de poder existentes...
:::
```

**Estructura:**
- Cada `## Encabezado` crea un panel plegable
- Todos los paneles empiezan colapsados
- Mínimo 2 paneles, máximo 6 paneles
- Se admite la sintaxis estándar de Markdown

### Ubicación de widgets

Los widgets funcionan en todos los archivos markdown de los paneles de las historias:

- **Paneles de la capa 1** - Contenido de "Learn more"
- **Paneles de la capa 1** - Contenido de **Learn more**
- **Paneles de la capa 2** - Contenido de **Go deeper**
- **Paneles de la capa 3** - El nivel más profundo de detalle

{: .tip }
> **Contraste visual**
> Los widgets usan automáticamente colores opuestos para lograr contraste visual. Los widgets de la capa 1 aparecen con los colores de la capa 2 y viceversa.

### Imágenes en widgets

**Imágenes locales:**
Coloca las imágenes en `assets/images/` y haz referencia a ellas de forma relativa a esa carpeta:

```
assets/images/
├── story1/
│   ├── map.jpg
│   └── document.jpg
└── story2/
    └── artifact.jpg
```

```markdown
image: story1/map.jpg
image: story2/artifact.jpg
```

**Imágenes externas:**
Usa URLs completas para imágenes alojadas en otros lugares:

```markdown
image: https://digital-collections.library.edu/iiif/image123.jpg
image: https://archive.org/download/item/photo.jpg
```

### Validación y errores

Telar valida los widgets durante el proceso de *build*:

**Errores que detienen la *build*:**
- Falta el campo `image` obligatorio en el carrusel
- Muy pocas o demasiadas pestañas/paneles de acordeón
- Secciones de contenido vacías

**Advertencias:**
- Falta texto `alt` en imágenes del carrusel (impacta accesibilidad)
- No se encuentran archivos de imagen en las rutas especificadas

Revisa la salida de la *build* para ver mensajes de validación de widgets.

### Ejemplos de widgets

**Acordeón para línea de tiempo histórica:**
```markdown
:::accordion
## 1520-1550: Conquista
Las fuerzas españolas establecieron control sobre el territorio por medio de varias campañas militares...

## 1550-1600: Asentamiento
Se fundaron pueblos coloniales como centros administrativos...

## 1600-1680: Consolidación
Se consolidó la economía colonial basada en minería y agricultura...
:::
```

**Pestañas con fuentes comparativas:**
```markdown
:::tabs
## Fuente primaria
"El día 15 de agosto, el virrey decretó..." (Archivo Colonial, Doc. 234)

## Análisis secundario
Las personas historiadoras contemporáneas interpretan este decreto como evidencia de...

## Evidencia arqueológica
Las excavaciones en el sitio revelaron...
:::
```

**Carrusel de comparación de imágenes:**
```markdown
:::carousel
image: before.jpg
alt: Fotografía del sitio en 1920
caption: La *Plaza Mayor* antes de la restauración
credit: Archivo Municipal

---

image: after.jpg
alt: Fotografía del sitio en 2020
caption: La *Plaza Mayor* después de la restauración arqueológica
credit: Instituto Nacional de Antropología
:::
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

Consulta [GitHub Actions](/guia/referencia/github-actions/) para ver cómo funciona esta automatización.
