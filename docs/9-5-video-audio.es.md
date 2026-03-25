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

El Compositor admite objetos de video y audio junto con imágenes. Cuando un paso de la historia hace referencia a un objeto de video o audio, la columna del visor muestra el reproductor de medios correspondiente — un reproductor de video insertado o un reproductor de audio con forma de onda — y ofrece herramientas para capturar tiempos de *clip* y configurar el comportamiento de bucle.

Para más información sobre cómo funcionan los objetos de video y audio en Telar, consulta [Objetos de video](/guia/tu-contenido/objetos-de-video/) y [Objetos de audio](/guia/tu-contenido/objetos-de-audio/).

## Detección del tipo de medio

El Compositor detecta el tipo de medio de cada objeto automáticamente a partir de su URL de origen. No necesitas configurar el tipo manualmente — el Compositor lee la URL y determina si el objeto es una imagen, un video o un archivo de audio.

Cada paso en la barra lateral muestra una insignia de tipo de medio para ayudarte a identificar qué clase de objeto referencia:

- **Video** — Un ícono de película para objetos de video
- **Music** — Un ícono de música para objetos de audio
- **Text** — Un ícono de texto para pasos sin objeto de medio

## Fuentes de video compatibles

El Compositor reconoce URLs de video de tres plataformas:

- **YouTube** — `youtube.com/watch?v=...` y enlaces cortos `youtu.be/...`
- **Vimeo** — `vimeo.com/123456789`
- **Google Drive** — `drive.google.com/file/d/.../view` (el video debe estar compartido públicamente o con "Cualquier persona con el enlace")

Cuando un paso hace referencia a un objeto de video, un reproductor de video en línea aparece en la columna del visor con controles de reproducción estándar.

## Objetos de audio

Los objetos de audio utilizan archivos autoalojados almacenados en tu repositorio en `telar-content/objects/`. El Compositor admite formatos MP3, OGG y M4A.

Cuando un paso hace referencia a un objeto de audio, la columna del visor muestra un reproductor de forma de onda WaveSurfer. La forma de onda ofrece una representación visual del audio e incluye controles de reproducción y pausa.

## Captura de *clips*

La captura de *clips* te permite definir qué segmento de un archivo de video o audio se reproduce durante un paso particular. En lugar de ingresar marcas de tiempo manualmente en una hoja de cálculo, las capturas visualmente mientras se reproduce el medio.

Para capturar tiempos de *clip* en un paso:

1. Selecciona el paso que deseas configurar
2. Reproduce el video o audio en el visor
3. Cuando el medio llegue al punto donde quieres que comience el *clip*, haz clic en **Capture start**
4. Continúa la reproducción hasta que el medio llegue al punto final, luego haz clic en **Capture end**
5. Los tiempos capturados aparecen en la configuración del paso, mostrados en formato dorado monoespaciado MM:SS

Puedes recapturar cualquiera de los tiempos en cualquier momento haciendo clic en el botón correspondiente cuando el medio esté en una nueva posición.

{: .tip }
> La captura de *clips* en el Compositor establece los mismos valores de `clip_start` y `clip_end` descritos en [Objetos de video](/guia/tu-contenido/objetos-de-video/) y [Objetos de audio](/guia/tu-contenido/objetos-de-audio/). Si luego editas las hojas de cálculo directamente, los valores de *clip* son intercambiables.

## Control de bucle

Cada paso tiene un control de bucle que determina si el *clip* se repite continuamente cuando el público llega a ese paso. Cuando está habilitado, el medio reproduce el segmento capturado en bucle hasta que el público avanza al siguiente paso.

La configuración de bucle se conserva al guardar y se aplica tanto a pasos de video como de audio.

## Género y medio

Los objetos tienen un campo de tipo que se corresponde con la columna `medium_genre` en `objects.csv`. El Compositor gestiona este campo a través del editor de metadatos de [Objetos](/guia/el-compositor/objetos/) — puedes configurarlo al agregar o editar un objeto.

El valor de género o medio ayuda a la galería de objetos a organizar los elementos por tipo y proporciona contexto adicional para el público al explorar la exhibición.

## Véase también

- [Editor de historias](/guia/el-compositor/editor-historias/) — Construir historias con el editor visual
- [Publicación](/guia/el-compositor/publicacion/) — Revisar y publicar cambios
- [Objetos de video](/guia/tu-contenido/objetos-de-video/) — Cómo funcionan los objetos de video en Telar
- [Objetos de audio](/guia/tu-contenido/objetos-de-audio/) — Cómo funcionan los objetos de audio en Telar
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Referencia completa de columnas incluyendo columnas de *clip*
