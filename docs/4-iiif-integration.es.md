---
layout: default
title: 4. Integración IIIF
parent: Documentación
nav_order: 4
lang: es
permalink: /documentacion/4-integracion-iiif/
---

## Integración IIIF

Telar usa el Marco Internacional de Interoperabilidad de Imágenes (IIIF) para mostrar imágenes de alta resolución que pueden ampliarse, desplazarse y explorarse en detalle.

## ¿Qué es IIIF?

IIIF (pronunciado "triple-i-efe") es un conjunto de estándares abiertos para entregar objetos digitales de alta calidad y atribuidos en internet. Te permite:

- Ampliar imágenes de alta resolución
- Desplazarte con fluidez por imágenes grandes
- Usar imágenes de museos y bibliotecas de todo el mundo
- Alojar tus propias imágenes con mosaicos automáticos

[Aprende más sobre IIIF](https://iiif.io/)

## Opción 1: imágenes locales

Sube tus propias imágenes y Telar generará automáticamente _tiles_ IIIF.

### Agrega imágenes locales

**Desde la interfaz web de GitHub:**

1. Navega a `components/images/objects/` en tu repositorio
2. Haz clic en **Add file** → **Upload files**
3. Arrastra imágenes al área de carga
4. Nombra archivos para que coincidan con IDs de objeto (ej., `textile-001.jpg`)
5. Confirma cambios

**En desarrollo local:**

1. Agrega imágenes de alta resolución a `components/images/objects/`
2. Genera _tiles_ IIIF:
   ```bash
   python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000
   ```

### Requisitos de archivo

- **Formatos**: JPG, PNG, TIFF
- **Resolución**: Mientras más alta mejor (al menos 2000px en el lado más largo recomendado)
- **Límites de tamaño**:
  - Imágenes individuales: Hasta 100 MB
  - Repositorio total: Mantener bajo 1 GB para GitHub

{: .tip }
> **Convención de nombres**
> Usa IDs simples y descriptivos sin espacios y sin caracteres especiales: `textile-001.jpg`, `ceramic-bowl-blue.jpg`

### Cómo funciona

Cuando agregas una imagen:

1. El generador IIIF crea versiones en mosaico a múltiples niveles de zoom
2. Los _tiles_ se guardan en `iiif/objects/[object-id]/`
3. Un archivo de manifiesto describe la estructura de la imagen
4. El UniversalViewer carga _tiles_ progresivamente según sea necesario

Esto permite un zoom fluido incluso en imágenes muy grandes.

## Opción 2: recursos IIIF externos

Referencia imágenes IIIF de museos, bibliotecas y otras instituciones de todo el mundo.

### Encuentra recursos IIIF

Muchas instituciones proporcionan manifiestos IIIF:

- [Guía IIIF para Encontrar Recursos](https://iiif.io/guides/finding_resources/)
- Museos importantes (British Museum, Getty, Smithsonian)
- Bibliotecas digitales (Internet Archive, Europeana)
- Colecciones universitarias

### Agrega IIIF externo

**En tu CSV de objetos u hoja de Google:**

1. Crea un `object_id` (ej., `museum-textile-001`)
2. Agrega la URL del manifiesto IIIF en la columna `iiif_manifest`:
   ```
   https://example.org/iiif/image/abc123/info.json
   ```

### Formatos de URL de manifiesto

Las URLs IIIF típicamente se ven así:

- **Image API**: `https://example.org/iiif/2/abc123/info.json`
- **Presentation API**: `https://example.org/iiif/2/abc123/manifest.json`

Telar soporta ambos formatos.

## Mezcla local y externo

Puedes usar imágenes IIIF locales y externas en el mismo proyecto:

```csv
object_id,title,...,iiif_manifest
local-textile-001,Mi Textil,,,
museum-textile-002,Textil de Museo,...,https://example.org/iiif/manifest.json
local-ceramic-001,Mi Cerámica,,,
```

Deja `iiif_manifest` en blanco para imágenes locales.

## Sistema de coordenadas

Las coordenadas IIIF en Telar usan valores normalizados (0-1):

- **x**: Posición horizontal (0 = borde izquierdo, 1 = borde derecho)
- **y**: Posición vertical (0 = borde superior, 1 = borde inferior)
- **zoom**: Nivel de zoom (1.0 = imagen completa, 2.0 = zoom 2x, etc.)

### Cómo encontrar coordenadas

Usa la herramienta de identificación de coordenadas integrada:

1. Navega a cualquier página de objeto
2. Haz clic en el botón **Identify coordinates**
3. Desplaza y amplía a la vista deseada
4. Copia los valores X, Y y Zoom
5. Pega en tu CSV de historia o hoja de Google

{: .tip }
> **Consejo pro**
> La herramienta de coordenadas tiene un botón "Copy entire row" que copia una plantilla de fila CSV completa con las coordenadas ya llenadas.

## Solución de problemas

### La imagen no carga

**Para imágenes locales:**
- Verifica que el archivo exista en `components/images/objects/`
- Verifica que object_id coincida con el nombre del archivo
- Asegúrate de que se hayan generado _tiles_ IIIF

**Para IIIF externo:**
- Verifica que la URL del manifiesto sea correcta
- Verifica que el recurso sea de acceso público
- Intenta cargar la URL del manifiesto directamente en tu navegador

### Visualización de baja calidad

- Usa imágenes fuente de mayor resolución (al menos 2000px)
- Para IIIF externo, verifica la configuración de calidad de imagen de la institución

### Carga lenta

- Para imágenes locales, optimiza tamaños de archivo antes de subir
- Considera usar IIIF externo para imágenes muy grandes
- GitHub Pages tiene límites de ancho de banda; para sitios de alto tráfico, considera otros hosts

## Próximos pasos

- [Configura tu sitio](/documentacion/5-configuracion/)
- [Estructura tu historia](/documentacion/2-flujos-de-trabajo/1-interfaz-web/#fase-4-estructura-tu-historia)
- [Aprende sobre personalización](/documentacion/6-personalizacion/)
