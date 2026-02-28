---
layout: docs
title: 1.3. Agrega tu contenido
parent: 1. Primeros pasos
grand_parent: Documentación
nav_order: 3
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

La configuración está lista. De aquí en adelante, todo sucede en tu hoja de cálculo de Google Sheets.

## Agrega tus imágenes

Telar admite dos formas de incluir imágenes:

**Opción A: Sube tus propias imágenes**

1. En tu repositorio de GitHub, navega a `components/images/`
2. Haz clic en **Add file** → **Upload files**
3. Arrastra tus imágenes al área de carga
4. Nombra cada archivo de forma sencilla, sin espacios (ej., `textile-001.jpg`, `map-lima.jpg`)
5. Haz clic en **Commit changes** para guardar

El nombre del archivo (sin la extensión) se convierte en el `object_id` de la imagen — lo usarás en tu hoja de cálculo.

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

## Completa la pestaña de objetos

En tu Google Sheet, ve a la pestaña **objects** y agrega una fila por cada imagen:

- **`object_id`** — un identificador sencillo (coincide con el nombre del archivo para imágenes subidas, o cualquier nombre para imágenes IIIF)
- **`title`** — el nombre visible
- **`description`** — una descripción breve (opcional, pero ayuda con la búsqueda)
- **`source_url`** — la URL del manifiesto IIIF (deja en blanco para imágenes subidas)
- **`creator`**, **`year`**, **`object_type`**, **`subjects`** — metadatos para el filtrado de la galería (todos opcionales)

{: .tip }
> **Omitir filas y columnas**
> Agrega un `#` al inicio de cualquier fila o encabezado de columna para que Telar lo ignore. Útil para notas y pendientes.

## Estructura tu historia

En cada pestaña de historia (ej., **story-1**), agrega una fila por cada paso de tu narrativa:

| Columna | Qué hace |
|---------|----------|
| `step` | Número del paso (1, 2, 3...) |
| `object` | Qué imagen mostrar (el `object_id` de la pestaña de objetos) |
| `x`, `y`, `zoom` | Dónde enfocar en la imagen — usa `0.5, 0.5, 1.0` como punto de partida |
| `question` | El encabezado de este paso (ej., "¿Qué es este textil?") |
| `answer` | Una respuesta breve de 1-2 oraciones |

Esto es suficiente para crear una historia funcional. Cada paso muestra una imagen con una pregunta y respuesta que guían a quien la ve a través de tu narrativa.

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

En la pestaña **project**, lista cada historia con su título y subtítulo. La plantilla muestra el formato — agrega una fila por cada pestaña de historia que hayas creado.

## Activa una reconstrucción

Después de editar tu Google Sheet, indica a GitHub que reconstruya tu sitio:

1. Ve a la pestaña **Actions** de tu repositorio
2. Haz clic en el *workflow* **Build and Deploy**
3. Haz clic en **Run workflow** → selecciona `main` → haz clic en el botón verde **Run workflow**
4. Espera de 2 a 5 minutos para la nueva versión
