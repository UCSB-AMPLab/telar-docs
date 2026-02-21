---
layout: docs
title: 4. IIIF e Imágenes
parent: Documentación
nav_order: 4
has_children: true
lang: es
permalink: /guia/integracion-iiif/
---

## Integración IIIF

Telar usa el Marco Internacional de Interoperabilidad de Imágenes (IIIF) para mostrar imágenes de alta resolución que pueden ampliarse, desplazarse y explorarse en detalle.

## ¿Qué es IIIF?

IIIF (pronunciado "triple-i-efe") es un conjunto de estándares abiertos para entregar objetos digitales de alta calidad y atribuidos en internet. Te permite:

- Ampliar imágenes de alta resolución
- Desplazarte con fluidez por imágenes grandes
- Usar imágenes de museos y bibliotecas de todo el mundo
- Alojar tus propias imágenes con teselas automáticas

[Aprende más sobre IIIF](https://iiif.io/)

## Opción 1: imágenes locales

Sube tus propias imágenes y Telar generará automáticamente teselas (*tiles*) IIIF.

### Agrega imágenes locales

**Desde la interfaz web de GitHub:**

1. Navega a `components/images/` en tu repositorio
2. Haz clic en **Add file** → **Upload files**
3. Arrastra imágenes al área de carga
4. Nombra archivos para que coincidan con IDs de objeto (ej., `textile-001.jpg`)
5. Confirma cambios

**En desarrollo local:**

1. Agrega imágenes de alta resolución a `components/images/`
2. Genera teselas IIIF:
   ```bash
   python3 scripts/generate_iiif.py --base-url http://localhost:4001
   ```

{: .note }
> **Procesamiento a partir de CSV/Sheets**
> Desde la v0.5.0, Telar solo genera teselas (*tiles*) IIIF para los objetos que aparecen en la hoja `objects` de Google Sheets o en `objects.csv`, siempre y cuando estos no tengan un manifiesto IIIF externo. Esto es automático: simplemente agrega tus imágenes y ejecuta el script.

### Requisitos de archivo

- **Formatos**: JPG, PNG, HEIC, WebP, TIFF (sin distinción de mayúsculas/minúsculas: `.JPG`, `.png`, etc. funcionan)
- **Resolución**: Mientras más alta mejor (al menos 2000px en el lado más largo recomendado)
- **Límites de tamaño**:
  - Imágenes individuales: Hasta 100 MB
  - Repositorio total: Mantener bajo 1 GB para GitHub

{: .tip }
> **Las fotos de iPhone funcionan directamente**
> Desde la v0.5.0, las fotos HEIC de iPhone funcionan de manera nativa - no necesitas convertirlas a otro formato manualmente. El generador IIIF las convierte automáticamente a JPEG durante la generación de teselas (*tiles*) preservando tus archivos originales.

{: .tip }
> **Convención de nombres**
> Usa IDs simples y descriptivos sin espacios y sin caracteres especiales: `textile-001.jpg`, `ceramic-bowl-blue.jpg`

### Cómo funciona

Cuando agregas una imagen:

1. El generador IIIF crea versiones en teselas a múltiples niveles de zoom
2. Las teselas se guardan en `iiif/objects/[object-id]/`
3. Un archivo de manifiesto describe la estructura de la imagen
4. El UniversalViewer carga teselas progresivamente según sea necesario

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
2. Agrega la URL del manifiesto IIIF en la columna `source_url`:
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
object_id,title,...,source_url
local-textile-001,Mi Textil,,,
museum-textile-002,Textil de Museo,...,https://example.org/iiif/manifest.json
local-ceramic-001,Mi Cerámica,,,
```

Deja `source_url` en blanco para imágenes locales.

## Autorrelleno de metadatos

Telar v0.4.0+ puede extraer automáticamente metadatos de objetos desde manifiestos IIIF, lo que reduce la carga de digitación manual y mejora la consistencia.

### Cómo funciona

Cuando proporcionas una URL en `source_url`, Telar intenta extraer automáticamente:

- **title** - Título del objeto
- **description** - Descripción detallada
- **creator** - Artista, creadora o creador
- **period** - Fecha, periodo o rango temporal
- **location** - Institución o repositorio
- **credit** - Línea de atribución

### Versiones de IIIF compatibles

Telar es compatible con las dos versiones de la API de Presentación de IIIF:

- **Versión 2.0** - Amplia adopción institucional
- **Versión 3.0** - Estándar más reciente con mapas de idioma

El sistema detecta automáticamente la versión y usa la estructura de metadatos correspondiente.

### Cómo usarlo

Simplemente agrega la URL del manifiesto IIIF a tu CSV de objetos o a la hoja de Google y deja los demás campos vacíos:

```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,,,https://example.org/iiif/manifest.json,,,,
```

Cuando el sitio se construye, Telar:

1. Obtiene el manifiesto IIIF
2. Extrae los campos de metadatos disponibles
3. Llena los campos vacíos con la información extraída
4. Respeta los valores que tú hayas escrito en el CSV

### Control de sobrescritura

**Tu CSV siempre tiene prioridad.** Puedes:

- Dejar que Telar extraiga todos los campos (déjalos vacíos)
- Sobrescribir algunos campos (llena los que quieras y deja los demás vacíos)
- Sobrescribir todo (llena todo y se ignorará el manifiesto)

**Ejemplo - sobrescritura parcial:**
```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,Mi título personalizado,,https://example.org/manifest.json,,,,
```

Telar hará lo siguiente:
- Usará "Mi título personalizado" (desde el CSV)
- Extraerá la descripción, creador, periodo, ubicación y crédito del manifiesto IIIF

### Detección de idioma

La extracción respeta la configuración `telar_language` en `_config.yml`:

- **Sitios en inglés** (`en`) - Prioriza metadatos en inglés y recurre a otros idiomas si no están disponibles
- **Sitios en español** (`es`) - Prioriza metadatos en español, luego en inglés y después en otros idiomas

Si el manifiesto ofrece metadatos multilingües, Telar selecciona el idioma más apropiado para tu sitio.

### Detección inteligente de créditos

Para el campo `credit`, Telar aplica una lógica de respaldo inteligente:

1. Busca campos llamados "Attribution" o "Rights"
2. Filtra texto legal (URLs de Creative Commons, avisos de derechos)
3. Usa el nombre del repositorio si no encuentra una atribución específica

Así obtienes líneas de crédito útiles en lugar de texto legal extenso.

### Validación

Durante la *build*, Telar valida los manifiestos IIIF:

- ✅ **Manifiesto válido** - Metadatos extraídos con éxito
- ⚠️ **Manifiesto no disponible** - Errores HTTP; se reintenta en la siguiente *build*
- ⚠️ **Sin metadatos** - El manifiesto es válido pero no contiene campos legibles

Revisa los registros de la *build* para conocer el estado de la extracción y posibles advertencias.

### Procesamiento durante la *build*

La extracción de metadatos ocurre durante el paso `python3 scripts/csv_to_json.py`:

**GitHub Pages:** Se ejecuta automáticamente durante el despliegue.
**Desarrollo local:** Ejecútalo manualmente cuando actualices manifiestos:

```bash
python3 scripts/csv_to_json.py
```

### Ejemplo de flujo de trabajo

1. Busca una URL de manifiesto IIIF de un museo o biblioteca
2. Agrégala a tu CSV de objetos con solo `object_id` y `source_url`
3. Construye tu sitio
4. Revisa la página del objeto: los metadatos deberían aparecer completos
5. Sobrescribe cualquier campo que necesite ajustes

### Campos comunes de metadatos

Cada institución nombra los campos de manera diferente. Telar busca variaciones frecuentes:

**Para title:**
- "Title", "Label", "Name"

**Para description:**
- "Description", "Summary", "Note"

**Para creator:**
- "Creator", "Artist", "Maker", "Author"

**Para period:**
- "Date", "Period", "Creation Date", "Date Created"

**Para location:**
- "Repository", "Holding Institution", "Current Location"

**Para credit:**
- "Attribution", "Rights Holder", "Credit Line", "Provider"

### Cuándo sobrescribir

Quizás quieras sobrescribir metadatos extraídos cuando:

- **Necesitas traducción** - El manifiesto está en otro idioma
- **Hay abreviaturas** - La institución usa códigos o siglas
- **Existen múltiples valores** - El manifiesto incluye demasiado detalle y prefieres un resumen
- **Por el nivel del público** - La descripción original es muy técnica o académica

### Limitaciones

- Solo funciona con **manifiestos IIIF externos** (no con imágenes locales)
- Requiere manifiestos de acceso público (sin autenticación)
- Se eliminan etiquetas HTML de las descripciones para mantener YAML seguro
- Algunos manifiestos pueden carecer de campos de metadatos

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
- Verifica que el archivo exista en `components/images/`
- Verifica que el `object_id` coincida con el nombre del archivo (sin extensión)
- Asegúrate de que el objeto esté listado en `objects.csv` con la columna `source_url` vacía
- Asegúrate de que se hayan generado las teselas IIIF

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

- [Configura tu sitio](/guia/configuracion/)
- [Estructura tu historia](/guia/flujos-de-trabajo/interfaz-web-github/#fase-4-estructura-tu-historia)
- [Aprende sobre personalización](/guia/personalizacion/)
