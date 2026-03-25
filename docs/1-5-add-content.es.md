---
layout: docs
title: 1.5. Agrega tu contenido
parent: 1. Primeros pasos
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/primeros-pasos/agrega-contenido/
tutorial_prev:
  title: "Planea tu narrativa"
  url: /guia/primeros-pasos/estructura-narrativa/
tutorial_next:
  title: "Revisa y perfecciona"
  url: /guia/primeros-pasos/revisa-y-perfecciona/
---

# Agrega tu contenido

Tu sitio está configurado. Ahora es momento de agregar tus imágenes, videos y archivos de audio, y construir tus historias. La forma de ingresar tu contenido depende del método de configuración que elegiste, pero la estructura es la misma en todos los casos.

## Agrega tus archivos multimedia

Los objetos en Telar pueden ser imágenes, videos o archivos de audio. Telar admite dos formas de incluirlos:

**Opción A: Sube tus propias imágenes**

1. En tu repositorio de GitHub, navega a `telar-content/objects/`
2. Haz clic en **Add file** → **Upload files**
3. Arrastra tus imágenes al área de carga
4. Nombra cada archivo de forma sencilla, sin espacios (ej., `textile-001.jpg`, `map-lima.jpg`)
5. Haz clic en **Commit changes** para guardar

El nombre del archivo (sin la extensión) se convierte en el `object_id` del objeto — lo usarás en tu hoja de cálculo.

![Subiendo archivos en GitHub](/images/add-files.png)
![Confirmando los archivos subidos](/images/commit-files.png)

{: .warning }
> **Límites de tamaño**
> Imágenes individuales: hasta 100 MB. Repositorio total: procura mantenerlo por debajo de 1 GB.

**Opción B: Usa imágenes IIIF de museos y bibliotecas**

Muchas instituciones ofrecen imágenes de alta resolución a través del estándar IIIF. Puedes usarlas directamente sin descargar nada.

1. Encuentra recursos IIIF de instituciones como la Biblioteca del Congreso, la British Library o el Smithsonian ([Guía IIIF para encontrar recursos](https://iiif.io/guides/finding_resources/))
2. Copia la URL del manifiesto (ej., `https://example.org/iiif/manifest.json`)
3. En la pestaña de objetos de tu hoja de cálculo, agrega una fila y pega la URL en la columna `source_url`

![Encontrando una URL de manifiesto IIIF](/images/external-iiif-manifest.png)

## Registra tus objetos

Una vez que tus archivos estén en el repositorio, regístralos como objetos para que Telar los reconozca. Cada objeto necesita:

- **`object_id`** — un identificador sencillo (coincide con el nombre del archivo para imágenes subidas, o cualquier nombre para imágenes IIIF)
- **`title`** — el nombre visible
- **`description`** — una descripción breve (opcional, pero ayuda con la búsqueda)
- **`source_url`** — la URL del manifiesto IIIF (deja en blanco para imágenes subidas)
- **`creator`**, **`year`**, **`object_type`**, **`subjects`** — metadatos para el filtrado de la galería (todos opcionales)

Dónde ingresas estos datos depende de tu método de configuración:
- **Compositor** — agrega objetos en la pestaña de Objetos
- **Google Sheets** — agrega filas en la pestaña **objects** de tu hoja de cálculo
- **CSV** — agrega filas a `objects.csv`

{: .tip }
> **Omitir filas y columnas**
> Agrega un `#` al inicio de cualquier fila o encabezado de columna para que Telar lo ignore. Útil para notas y pendientes.

## Estructura tu historia

Cada historia es una secuencia de pasos. Ya sea que estés agregando filas en una hoja de cálculo, editando un CSV, o usando el editor visual del Compositor, cada paso necesita:

| Columna | Qué hace |
|---------|----------|
| `step` | Número del paso (1, 2, 3...) |
| `object` | Qué objeto mostrar (el `object_id` de la pestaña de objetos) |
| `x`, `y`, `zoom` | Dónde enfocar en la imagen — usa `0.5, 0.5, 1.0` como punto de partida |
| `clip` | Tiempos de inicio y fin para *clips* de video/audio (ej., `00:30-01:15`) |
| `question` | El encabezado de este paso (ej., "¿Qué es este textil?") |
| `answer` | Una respuesta breve de 1-2 oraciones |

Esto es suficiente para crear una historia funcional. Cada paso muestra una imagen (o reproduce un *clip* de video/audio) con una pregunta y respuesta que guían a quien la ve a través de tu narrativa.

## Agrega paneles de detalle

Para los pasos donde quieras compartir más que una respuesta breve, agrega contenido en las columnas de paneles:

| Columna | Qué hace |
|---------|----------|
| `layer1_content` | Panel "Saber más" — más detalle sobre este paso |
| `layer2_content` | Panel "Profundizar más" — aún más profundidad |
| `layer1_button` | Texto personalizado del botón (deja en blanco para "Saber más") |
| `layer2_button` | Texto personalizado del botón (deja en blanco para "Profundizar más") |

Escribe tu texto directamente en la celda. Puedes usar formato básico de markdown: `**negrita**`, `*cursiva*` y encabezados con `##`.

{: .tip }
> **Mantenlo sencillo**
> Para la mayoría de las historias, las columnas de pregunta y respuesta más una capa de paneles de detalle es suficiente. Siempre puedes agregar más profundidad después.

## Registra tus historias

En los datos de tu proyecto, lista cada historia con su título y subtítulo.

## Construye tu sitio

Después de hacer cambios en tu contenido:

- **Compositor** — exporta y sube tu sitio actualizado a GitHub
- **Google Sheets** — ve a la pestaña **Actions** de tu repositorio, haz clic en **Build and Deploy** y luego en **Run workflow**
- **Desarrollo local** — construye localmente con Jekyll y luego sube a GitHub

Espera de 2 a 5 minutos para que GitHub Pages publique la nueva versión.
