---
layout: docs
title: "4.10. Objetos de audio"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 10
lang: es
permalink: /guia/tu-contenido/objetos-de-audio/
---

# Objetos de audio

Telar puede mostrar archivos de audio autoalojados como objetos en tu exhibición. El audio funciona igual que las imágenes y los videos — se pueden construir historias alrededor de grabaciones, enfocar momentos específicos con el control de *clips* y combinarlos con los demás objetos.

A diferencia de los objetos de video (que se insertan desde plataformas externas), los archivos de audio se alojan directamente en tu repositorio. Pon tus archivos MP3, OGG o M4A en `telar-content/objects/` y Telar se encarga del resto.

## Agregar un objeto de audio

Para agregar un archivo de audio, ponlo en `telar-content/objects/` con un nombre que coincida con el `object_id` en tu hoja de cálculo de objetos.

Por ejemplo, si tu hoja de cálculo tiene un objeto con `object_id` = `grabacion-campo-01`, nombra tu archivo `grabacion-campo-01.mp3`.

### Formatos compatibles

Telar reconoce tres formatos de audio:

- **MP3** — el formato más ampliamente compatible
- **OGG** — formato abierto con buena compresión
- **M4A** — formato común de dispositivos Apple y grabadoras profesionales

## Cómo se muestra el audio

### En historias

Cuando un paso de la historia hace referencia a un objeto de audio, una visualización de forma de onda WaveSurfer llena el área del visor con controles de reproducción y pausa. Si se configuran valores de `inicio_clip` y `fin_clip` en la hoja de cálculo, el reproductor reproduce solo el segmento especificado. Esto es útil para dirigir la atención a un momento particular en una grabación larga.

### En páginas de objetos

Cada objeto de audio tiene su propia página (`/objects/{object-id}/`) con un reproductor de forma de onda completo. Debajo de la forma de onda, un selector de *clips* permite elegir los tiempos de inicio y fin arrastrando los bordes de la región sobre la forma de onda — útil al construir pasos de historias. Los valores se copian directamente a la hoja de cálculo.

### En la galería

Los objetos de audio aparecen en la galería de objetos con un ícono de forma de onda sobre un fondo gris. El filtro **Type** de la galería permite a quienes visitan explorar por tipo de medio (Image, Video o Audio).

## Control de *clips*

Los pasos de las historias pueden especificar un tiempo de inicio, un tiempo de fin y una configuración de bucle para los objetos de audio. Las columnas funcionan exactamente igual que para los videos — consulta [Objetos de video: Control de clips](/guia/tu-contenido/objetos-de-video/#control-de-clips) para la referencia completa de columnas y ejemplos.

| Columna (inglés) | Columna (español) | Descripción |
|---|---|---|
| `clip_start` | `inicio_clip` | Tiempo de inicio en segundos (ej., `12.5`) |
| `clip_end` | `fin_clip` | Tiempo de fin en segundos |
| `loop` | `bucle` | Repetir el *clip* (`true`, `yes` o `sí`) |

{: .tip }
> También se puede usar la interfaz de captura de *clips* del Compositor para configurar los tiempos de forma visual. Consulta [Video y audio en el Compositor](/guia/el-compositor/video-y-audio/) para más detalles.

## Procesamiento de audio en el *build*

Telar procesa los archivos de audio durante el *build* para extraer clips y generar datos de picos para la visualización de la forma de onda. Esto se gestiona mediante `process_audio.py`, que se ejecuta automáticamente como parte del proceso de construcción.

### Dependencias opcionales

El procesamiento de audio requiere dos herramientas externas. Solo se necesitan si el sitio incluye objetos de audio — los sitios sin audio no las requieren.

- **ffmpeg** — extrae *clips* de audio según los valores de `inicio_clip` y `fin_clip`
- **audiowaveform** — genera datos de picos para la visualización de la forma de onda

Para instalarlas localmente:

**macOS:**

```bash
brew install ffmpeg audiowaveform
```

**Ubuntu/Debian:**

```bash
sudo apt install ffmpeg audiowaveform
```

{: .note }
> **GitHub Actions se encarga de esto automáticamente.** El flujo de trabajo `build.yml` detecta archivos de audio en el repositorio e instala estas herramientas durante el *build*. No se necesita configuración manual para sitios desplegados.

## Véase también

- [Objetos de video](/guia/tu-contenido/objetos-de-video/) — Insertar video desde plataformas externas
- [Objetos](/guia/tu-contenido/objetos/) — Definir objetos en tu hoja de cálculo
- [Historias y paneles](/guia/tu-contenido/historias-y-paneles/) — Construir pasos de historias
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Referencia completa de columnas incluyendo columnas de *clips*
- [Galería de objetos](/guia/funciones-del-sitio/galeria-de-objetos/) — Cómo aparecen los objetos de audio en la galería
