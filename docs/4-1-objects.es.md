---
layout: docs
title: "4.1. Objetos"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/tu-contenido/objetos/
---

# Objetos

Los objetos son los elementos visuales en el centro de tu sitio Telar — imágenes, mapas, documentos y otros materiales que tus historias exploran.

## Definir objetos

Cada objeto de tu sitio se define como una fila en tu hoja de cálculo de objetos — ya sea en la pestaña de objetos de tu Google Sheet, o en `objects.csv` (u `objetos.csv`) en `components/structures/`.

Como mínimo, cada objeto necesita un `object_id` y un `title`:

```csv
object_id,title
textile-001,Fragmento de Textil Colonial
map-lima,Mapa de Lima
```

- **`object_id`** — Un identificador único (minúsculas, guiones, guiones bajos). Se convierte en la URL del objeto: `/objects/textile-001/`
- **`title`** — El nombre visible

Para las imágenes, tienes dos opciones:
- **Autoalojadas**: Pon los archivos de imagen en `components/images/` con nombres que coincidan con el `object_id`. Telar genera las teselas (*tiles*) IIIF automáticamente.
- **IIIF externas**: Agrega una columna `source_url` con la URL de la imagen IIIF (info.json o manifiesto).

Puedes agregar metadatos más detallados para cada objeto — descripción, creador, periodo, año, medio, dimensiones, fuente, crédito y más. Consulta la referencia de [Columnas de objetos](/guia/tus-datos/csv-objetos/) para la lista completa de columnas.

## Páginas de objetos

Cada objeto tiene su propia página en `/objects/{object_id}/`. La página muestra:

- Un **visor IIIF** que presenta la imagen en resolución completa con zoom y desplazamiento
- Una **tabla de metadatos** con todos los campos disponibles (creador, periodo, medio, dimensiones, fuente, crédito)
- Un **selector de coordenadas** para encontrar los valores x, y y zoom que se usan en los pasos de las historias
- Las **historias relacionadas** que hacen referencia al objeto
- Una sección de **descripción**, si proporcionaste una en la hoja de cálculo

![Página de detalle de objeto con visor IIIF y metadatos](/images/object-detail.png)

### Selector de coordenadas

El selector de coordenadas es una herramienta de desarrollo en cada página de objeto. Haz clic o aplica zoom en la imagen y luego lee las coordenadas normalizadas (rango de 0 a 1) que aparecen debajo del visor. Usa los botones **Copy** para copiar las coordenadas directamente en el CSV de tu historia.

![Selector de coordenadas mostrando valores X, Y y Zoom debajo del visor de imágenes](/images/coordinate-picker.png)

## Véase también

- [Galería de objetos](/guia/funciones/galeria-objetos/) — Explora, busca y filtra tu colección
- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Referencia completa de columnas para objects.csv
- [Imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) — Sube y procesa tus propias imágenes
- [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/) — Usa imágenes de museos y bibliotecas
- [Historias y paneles](/guia/tu-contenido/historias-paneles/) — Cómo se usan los objetos en las historias
