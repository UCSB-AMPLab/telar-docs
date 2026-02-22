---
layout: docs
title: 3.4. Widgets
parent: 3. Estructura de contenido
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/estructura-de-contenido/widgets/
---

# Widgets

Telar incluye un sistema de widgets interactivos para contenido enriquecido en paneles de historias y páginas personalizadas. Los widgets te permiten incrustar carruseles de imágenes, contenido con pestañas y secciones plegables directamente en tu markdown.

**Disponible desde v0.4.0.**

## Widgets disponibles

| Widget | Propósito |
|--------|-----------|
| **Carrusel** | Presentación de imágenes con leyendas y créditos |
| **Pestañas** | Paneles conmutables para múltiples perspectivas |
| **Acordeón** | Secciones plegables para contenido secuencial o jerárquico |

## Sintaxis de widgets

Los widgets usan la sintaxis de contenedor estilo CommonMark con triple dos puntos:

```markdown
:::widget_type
contenido del widget aquí
:::
```

## Carrusel

Muestra varias imágenes con controles de navegación, leyendas y créditos.

### Sintaxis

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

### Campos

- **`image`** (obligatorio) — Ruta relativa a `components/images/`, o una URL completa para imágenes externas
- **`alt`** (recomendado) — Descripción para accesibilidad
- **`caption`** (opcional) — Texto que se muestra debajo de la imagen; admite markdown (ej., `*cursivas*`)
- **`credit`** (opcional) — Línea de atribución; admite markdown

Separa los elementos del carrusel con `---`.

### Imágenes externas

Puedes usar URLs completas para imágenes alojadas en otros servidores:

```markdown
image: https://example.org/images/photo.jpg
```

## Pestañas

Organiza contenido en paneles conmutables — útil para presentar diferentes perspectivas, fuentes o categorías.

### Sintaxis

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

### Estructura

- Cada `## Encabezado` crea una pestaña nueva
- El contenido entre encabezados se convierte en el cuerpo de la pestaña
- Se admite la sintaxis estándar de markdown dentro de las pestañas
- Mínimo 2 pestañas, máximo 4 pestañas

## Acordeón

Crea paneles plegables para secuencias cronológicas, información jerárquica o detalles opcionales que las personas pueden expandir según su interés.

### Sintaxis

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

### Estructura

- Cada `## Encabezado` crea un panel plegable
- Todos los paneles empiezan colapsados
- Se admite la sintaxis estándar de markdown dentro de los paneles
- Mínimo 2 paneles, máximo 6 paneles

## Dónde funcionan los widgets

Los widgets se pueden usar en:

- **Archivos markdown de paneles de historias** — Contenido de las capas 1, 2 y 3
- **Páginas personalizadas** — Cualquier archivo markdown en `components/texts/pages/`

Para los paneles de las historias, se recomienda guardar el contenido con widgets en un archivo markdown (Método 3: indicar un archivo) en lugar de ingresarlo directamente en una celda de la hoja de cálculo, ya que la sintaxis de triple dos puntos es difícil de manejar en línea.

{: .tip }
> Los widgets usan automáticamente colores de panel contrastantes para distinción visual. Los widgets de la capa 1 aparecen con los colores de la capa 2 y viceversa.

## Imágenes en widgets

### Imágenes locales

Pon las imágenes en `components/images/` y haz referencia a ellas por nombre de archivo:

```
components/images/
├── map.jpg
├── document.jpg
└── artifact.jpg
```

```markdown
image: map.jpg
image: document.jpg
```

Si las imágenes están en subcarpetas, incluye la ruta relativa a `components/images/`:

```markdown
image: story1/map.jpg
```

### Imágenes externas

Usa URLs completas para imágenes alojadas en otros servidores:

```markdown
image: https://digital-collections.library.edu/iiif/image123.jpg
image: https://archive.org/download/item/photo.jpg
```

## Validación

Telar valida los widgets durante el proceso de compilación:

**Errores (la *build* falla):**
- Falta el campo `image` obligatorio en el carrusel
- Muy pocas o demasiadas pestañas/paneles de acordeón
- Secciones de contenido vacías

**Advertencias (la *build* continúa):**
- Falta texto `alt` en imágenes del carrusel (impacta accesibilidad)
- No se encuentran archivos de imagen en las rutas especificadas

Revisa la salida de la *build* para ver mensajes de validación de widgets.

## Ejemplos

### Línea de tiempo histórica

```markdown
:::accordion
## 1520-1550: Conquista
Las fuerzas españolas establecieron control sobre el territorio por medio
de varias campañas militares...

## 1550-1600: Asentamiento
Se fundaron pueblos coloniales como centros administrativos...

## 1600-1680: Consolidación
Se consolidó la economía colonial basada en minería y agricultura...
:::
```

### Fuentes comparativas

```markdown
:::tabs
## Fuente primaria
"El día 15 de agosto, el virrey decretó..."
(Archivo Colonial, Doc. 234)

## Análisis secundario
Las personas historiadoras contemporáneas interpretan este decreto como evidencia de...

## Evidencia arqueológica
Las excavaciones en el sitio revelaron...
:::
```

### Comparación de imágenes

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

## Véase también

- [Historias y Paneles](/guia/estructura-de-contenido/historias-paneles/) — Usar widgets en paneles de historias
- [Páginas Personalizadas](/guia/estructura-de-contenido/paginas-personalizadas/) — Usar widgets en páginas independientes
- [Guía de Sintaxis Markdown](/guia/referencia/sintaxis-markdown/) — Todas las opciones de formato
