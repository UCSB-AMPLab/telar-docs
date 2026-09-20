---
layout: docs
title: "9.5. Video y audio"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/el-compositor/video-y-audio/
---

# Video y audio

El Compositor admite objetos de video y audio junto con imágenes. Cuando un paso de la historia hace referencia a un objeto de video o audio, la columna del visor muestra el reproductor de medios correspondiente — un reproductor de video insertado o un reproductor de audio con forma de onda — y ofrece herramientas para fijar los tiempos del clip y el comportamiento de bucle.

Para más información sobre cómo funcionan los objetos de video y audio en Telar, consulta [Objetos de video](/guia/tu-contenido/objetos-de-video/) y [Objetos de audio](/guia/tu-contenido/objetos-de-audio/).

## Detección del tipo de medio

El Compositor detecta el tipo de medio de cada objeto automáticamente a partir de su URL de origen. No necesitas configurar el tipo manualmente — el Compositor lee la URL y determina si el objeto es una imagen, un video o un archivo de audio.

Cada paso en la barra lateral muestra una insignia de tipo de medio para ayudarte a identificar qué clase de objeto referencia:

- **Video** — Un ícono de película para objetos de video
- **Audio** — Un ícono de música para objetos de audio
- **Texto** — Un ícono de texto para pasos sin objeto de medio

## Fuentes de video compatibles

El Compositor reconoce URLs de video de tres plataformas:

- **YouTube** — `youtube.com/watch?v=...` y enlaces cortos `youtu.be/...`
- **Vimeo** — `vimeo.com/123456789`
- **Google Drive** — `drive.google.com/file/d/.../view` (el video debe estar compartido públicamente o con "Cualquier persona con el enlace")

Cuando un paso hace referencia a un objeto de video, un reproductor de video en línea aparece en la columna del visor con controles de reproducción estándar.

## Objetos de audio

Los objetos de audio utilizan archivos autoalojados almacenados en tu repositorio en `telar-content/objects/`. El Compositor admite formatos MP3, OGG y M4A.

Cuando un paso hace referencia a un objeto de audio, la columna del visor muestra un reproductor de forma de onda WaveSurfer. La forma de onda ofrece una representación visual del audio e incluye controles de reproducción y pausa.

## Recortar el clip

Un clip es el segmento de un archivo de video o de audio que se reproduce durante un paso. Lo defines arrastrando en el visor, en vez de escribir marcas de tiempo en una hoja de cálculo.

### Video

Debajo del video hay una línea de tiempo que abarca el archivo completo: el clip aparece como una franja resaltada y una marca fina indica por dónde va la reproducción.

1. Selecciona el paso que quieres configurar
2. Arrastra el extremo inicial o el final de la franja para mover ese borde del clip, o arrastra la franja entera para desplazar el clip sin cambiarle la duración
3. Suelta para guardar

Los tiempos de los dos extremos de la barra son el comienzo y el final del clip, y en el medio se lee su duración: **Clip de 0:07**. Cada vez que cambias el rango, esa duración da paso por un momento a la confirmación **Clip guardado**.

### Audio

El audio no tiene una línea de tiempo aparte: la región del clip va sobre la onda misma. Arrastra sus extremos para fijar el comienzo y el final.

### Comprobar el clip

Debajo del reproductor, el clip vigente se lee `clip 0:05 → 0:12`. Si el paso reproduce el archivo completo, ahí dice **Sin clip definido**.

**Previsualizar fragmento** reproduce el clip solo, para que veas exactamente lo que le va a llegar al público sin tener que aguantar el resto del archivo.

{: .note }
> Los videos de Google Drive no se pueden recortar. En lugar de los tiempos del clip, el visor muestra **Google Drive no admite recorte de clips**.

{: .tip }
> El Compositor fija los mismos valores `clip_start` y `clip_end` que describen [Objetos de video](/guia/tu-contenido/objetos-de-video/) y [Objetos de audio](/guia/tu-contenido/objetos-de-audio/). Son intercambiables: puedes definir el clip aquí y editarlo después en la hoja de cálculo, o al revés.

## Control de bucle

Cada paso tiene un interruptor **Repetir** que determina si el clip se repite continuamente cuando el público llega a ese paso. Cuando está activado, el clip se reproduce en bucle hasta que el público avanza al siguiente paso.

La configuración de bucle se conserva al guardar y se aplica tanto a pasos de video como de audio.

## Género y medio

Los objetos tienen un campo de tipo que se corresponde con la columna `medium_genre` en `objects.csv`. El Compositor gestiona este campo a través del editor de metadatos de [Objetos](/guia/el-compositor/objetos/) — puedes configurarlo al agregar o editar un objeto.

El valor de género o medio ayuda a la galería de objetos a organizar los elementos por tipo y proporciona contexto adicional para el público al explorar la exhibición.

## Véase también

- [Editor de historias](/guia/el-compositor/editor-historias/) — Construir historias con el editor visual
- [Publicación](/guia/el-compositor/publicacion/) — Revisar y publicar cambios
- [Objetos de video](/guia/tu-contenido/objetos-de-video/) — Cómo funcionan los objetos de video en Telar
- [Objetos de audio](/guia/tu-contenido/objetos-de-audio/) — Cómo funcionan los objetos de audio en Telar
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Referencia completa de columnas incluyendo columnas de clip
