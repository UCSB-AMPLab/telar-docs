---
layout: docs
title: "4.2. Imágenes autoalojadas"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/tu-contenido/imagenes-autoalojadas/
---

# Imágenes autoalojadas

Si tienes tus propias imágenes — fotografías, escaneos de documentos, mapas — puedes subirlas directamente a tu sitio Telar. Telar las convierte automáticamente en teselas ampliables de alta resolución para que el público pueda explorar cada detalle.

Este proceso usa una tecnología llamada [IIIF](https://iiif.io/) (Marco Internacional de Interoperabilidad de Imágenes), pero no necesitas entender IIIF para usar imágenes autoalojadas. Solo sube tus archivos y Telar se encarga del resto.

## Agregar imágenes

Cada imagen debe corresponder a un objeto definido en tu hoja de cálculo. El nombre del archivo (sin la extensión) debe coincidir con el `object_id` del objeto.

Por ejemplo, si tu hoja de cálculo tiene un objeto con `object_id` = `textile-001`, nombra tu archivo de imagen `textile-001.jpg`.

**Desde la interfaz web de GitHub:**

1. Navega a `components/images/` en tu repositorio
2. Haz clic en **Add file** > **Upload files**
3. Arrastra tus imágenes al área de carga
4. Asegúrate de que los nombres coincidan con tus object IDs
5. Confirma los cambios

**En desarrollo local:**

1. Coloca tus imágenes en `components/images/`
2. Genera las teselas IIIF:
   ```bash
   python3 scripts/generate_iiif.py --base-url http://localhost:4001
   ```

{: .note }
> Telar solo genera teselas para objetos que estén en tu hoja de cálculo y que no tengan una fuente IIIF externa. Esto es automático — solo agrega tus imágenes y se procesarán durante la siguiente compilación.

## Formatos compatibles

- **JPG, PNG, HEIC, WebP, TIFF** — todos los formatos de imagen comunes funcionan
- No importan mayúsculas o minúsculas: `.JPG`, `.png`, `.Tiff` funcionan
- **Resolución**: Mientras más alta, mejor — se recomienda al menos 2000px en el lado más largo para buena calidad de zoom
- **Límites de tamaño**: Imágenes individuales hasta 100 MB; mantén el repositorio total bajo 1 GB en GitHub

{: .tip }
> **Las fotos de iPhone funcionan directamente.** Las fotos HEIC de iPhone se procesan sin conversión previa. Telar las convierte automáticamente a JPEG durante la generación de teselas, conservando tus archivos originales.

{: .tip }
> **Nombres de archivo.** Usa IDs simples y descriptivos, sin espacios ni caracteres especiales: `textile-001.jpg`, `ceramic-bowl-blue.jpg`

## Cómo funciona

Cuando agregas una imagen y compilas tu sitio:

1. Telar crea versiones en teselas a múltiples niveles de zoom
2. Las teselas se guardan en `iiif/objects/{object-id}/`
3. Un archivo de manifiesto describe la estructura de la imagen
4. El visor carga teselas progresivamente — solo el área visible al nivel de zoom actual, no la imagen completa

Esto permite un zoom fluido incluso en imágenes muy grandes.

## Sistema de coordenadas

Telar usa coordenadas normalizadas (valores de 0 a 1) para describir posiciones dentro de una imagen:

- **x**: Posición horizontal (0 = borde izquierdo, 1 = borde derecho)
- **y**: Posición vertical (0 = borde superior, 1 = borde inferior)
- **zoom**: Nivel de zoom (1.0 = imagen completa, 2.0 = zoom 2x, etc.)

Usas estas coordenadas en los pasos de tu historia para indicarle a Telar dónde hacer zoom en cada imagen.

### Cómo encontrar coordenadas

Cada página de objeto incluye un selector de coordenadas integrado:

1. Navega a cualquier página de objeto en tu sitio
2. Haz clic en el botón **Identify coordinates**
3. Desplaza y amplía hasta la vista que quieras
4. Copia los valores X, Y y Zoom
5. Pégalos en tu hoja de cálculo de historias o archivo CSV

{: .tip }
> El selector de coordenadas tiene un botón **Copy entire row** que copia una fila completa con las coordenadas ya incluidas — lista para pegar en tu hoja de cálculo.

## Solución de problemas

### La imagen no carga

- Verifica que el archivo exista en `components/images/`
- Asegúrate de que el nombre del archivo (sin extensión) coincida con el `object_id` en tu hoja de cálculo
- Verifica que la columna `source_url` del objeto esté vacía (de lo contrario Telar espera una imagen externa)
- Confirma que se hayan generado las teselas IIIF (revisa que exista `iiif/objects/{object-id}/`)

### Visualización de baja calidad

- Usa imágenes de mayor resolución (al menos 2000px en el lado más largo)
- Las imágenes muy pequeñas no se verán bien al aplicar zoom

### Carga lenta

- Optimiza el tamaño de los archivos antes de subirlos (los TIFF grandes se pueden convertir a JPEG de alta calidad)
- GitHub Pages tiene límites de ancho de banda — para sitios de alto tráfico, considera otro servicio de alojamiento

## Véase también

- [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/) — Usa imágenes de museos y bibliotecas en lugar de subir las tuyas
- [Objetos](/guia/tu-contenido/objetos/) — Cómo definir objetos en tu hoja de cálculo
- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Referencia completa de columnas de la hoja de cálculo de objetos
