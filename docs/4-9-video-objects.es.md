---
layout: docs
title: "4.9. Objetos de video"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 9
lang: es
permalink: /guia/tu-contenido/objetos-de-video/
---

# Objetos de video

Telar puede mostrar videos de YouTube, Vimeo y Google Drive como objetos en tu exhibición. Los videos funcionan igual que las imágenes — puedes construir historias alrededor de ellos, enfocar momentos específicos con control de *clips* e incluirlos junto a los demás objetos.

Los videos no se almacenan en el repositorio — Telar los inserta directamente desde la plataforma donde ya están alojados.

## Agregar un objeto de video

Para agregar un video, pon la URL del video en la columna `source_url` de tu hoja de cálculo de objetos. Telar detecta el tipo de medio automáticamente a partir de la URL — no se necesita configuración adicional.

Por ejemplo, una fila en tu hoja de cálculo de objetos podría verse así:

```csv
object_id,title,source_url
interview-01,Oral history interview,https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Plataformas compatibles

Telar reconoce URLs de video de tres plataformas:

- **YouTube** — `youtube.com/watch?v=...` y enlaces cortos `youtu.be/...`
- **Vimeo** — `vimeo.com/123456789`
- **Google Drive** — `drive.google.com/file/d/.../view` (el video debe estar compartido públicamente o con "Cualquier persona con el enlace")

{: .note }
> Telar no admite archivos de video autoalojados. Los videos deben estar alojados en una de las plataformas compatibles. Para medios autoalojados, consulta [Objetos de audio](/guia/tu-contenido/objetos-de-audio/).

## Cómo se muestran los videos

### En historias

Cuando un paso de la historia hace referencia a un objeto de video, el reproductor ocupa el área del visor. El reproductor incluye controles de reproducción estándar (reproducir, pausar, avanzar) y responde a cualquier configuración de *clip* definida para ese paso.

Si estableces valores de `clip_start` y `clip_end` en tu hoja de cálculo de historias, el video reproduce solo el segmento especificado. Esto es útil para dirigir la atención a un momento particular sin requerir que el público vea la grabación completa.

### En páginas de objetos

Cada objeto de video tiene su propia página (`/objects/{object-id}/`) con un reproductor insertado. Debajo del reproductor, un selector de tiempos de *clip* permite reproducir hasta una posición y capturar marcas de tiempo — útil al construir pasos de historias.

### En la galería

Los objetos de video aparecen en la galería de objetos con un ícono de reproducción sobre un fondo gris. El filtro **Type** de la galería permite a quienes visitan explorar por tipo de medio (Image, Video o Audio).

## Control de *clips*

Los pasos de la historia pueden especificar un tiempo de inicio, un tiempo de fin y una configuración de bucle para los objetos de video. Agrega estas columnas a la hoja de cálculo de la historia:

| Columna (inglés) | Columna (español) | Descripción |
|---|---|---|
| `clip_start` | `inicio_clip` | Tiempo de inicio en segundos (ej., `12.5`) |
| `clip_end` | `fin_clip` | Tiempo de fin en segundos |
| `loop` | `bucle` | Repetir el *clip* en bucle (`true`, `yes` o `sí`) |

Las tres columnas son opcionales. Si se omiten, el video se reproduce desde el inicio sin bucle.

```csv
paso,objeto,inicio_clip,fin_clip,bucle,pregunta,respuesta
1,entrevista-01,45,78,false,¿Qué describe ella?,La técnica de tejido utilizada en su comunidad.
2,entrevista-01,120,145,true,Un motivo recurrente,Observa cómo se repite el patrón — este *clip* se reproduce en bucle para resaltar la repetición.
```

### Encontrar tiempos de *clip*

La página de objeto de cada video incluye un selector de tiempos de *clip*:

1. Navega a la página de objeto del video (`/objects/{object-id}/`)
2. Reproduce el video hasta la posición deseada
3. Haz clic en los botones de captura de marca de tiempo para registrar los tiempos de inicio y fin
4. Copia los valores en tu hoja de cálculo de historias

{: .tip }
> También puedes usar la interfaz de captura de *clips* del Compositor para establecer tiempos de *clip* visualmente. Consulta [Video y audio en el Compositor](/guia/el-compositor/video-y-audio/) para más detalles.

## Véase también

- [Objetos de audio](/guia/tu-contenido/objetos-de-audio/) — Agregar archivos de audio autoalojados
- [Objetos](/guia/tu-contenido/objetos/) — Definir objetos en tu hoja de cálculo
- [Historias y paneles](/guia/tu-contenido/historias-y-paneles/) — Construir pasos de historias
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Referencia completa de columnas incluyendo columnas de *clip*
- [Galería de objetos](/guia/funciones-del-sitio/galeria-de-objetos/) — Cómo se muestran los videos en la galería
