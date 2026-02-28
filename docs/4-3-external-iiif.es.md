---
layout: docs
title: "4.3. Imágenes IIIF externas"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/tu-contenido/iiif-externo/
---

# Imágenes IIIF externas

Muchos museos, bibliotecas y archivos ponen sus colecciones a disposición a través de una tecnología llamada [IIIF](https://iiif.io/) (Marco Internacional de Interoperabilidad de Imágenes). Esto significa que puedes construir historias en Telar usando imágenes de alta resolución de instituciones de todo el mundo, sin descargar ni alojar las imágenes.

## Encontrar imágenes IIIF

Busca recursos IIIF en:

- [Guía IIIF para encontrar recursos](https://iiif.io/guides/finding_resources/)
- Museos importantes (British Museum, Getty, Smithsonian, Rijksmuseum)
- Bibliotecas digitales (Internet Archive, Europeana, Gallica)
- Colecciones universitarias y archivos especializados

Cuando una institución ofrece IIIF, generalmente encontrarás una URL de manifiesto — un enlace que describe la imagen y sus metadatos. Normalmente termina en `info.json` o `manifest.json`.

## Agregar una imagen externa

En tu hoja de cálculo de objetos (Google Sheet u `objects.csv`):

1. Crea una fila con un `object_id` único (ej., `museum-textile-001`)
2. Agrega la URL del manifiesto IIIF en la columna `source_url`:
   ```
   https://example.org/iiif/image/abc123/info.json
   ```

Eso es todo. Telar obtendrá la imagen directamente del servidor de la institución cuando alguien visite tu sitio.

### Formatos de URL de manifiesto

Las URLs IIIF normalmente se ven así:

- **Image API**: `https://example.org/iiif/2/abc123/info.json`
- **Presentation API**: `https://example.org/iiif/2/abc123/manifest.json`

Telar es compatible con ambos formatos y con las dos versiones de IIIF (2.0 y 3.0).

## Combinar imágenes propias y externas

Puedes usar tus propias imágenes e imágenes IIIF externas en el mismo proyecto. Deja `source_url` en blanco para los objetos con imágenes autoalojadas:

```csv
object_id,title,...,source_url
mi-textil,Mi textil,,,
mapa-museo,Mapa del museo,...,https://example.org/iiif/manifest.json
mi-ceramica,Mi cerámica,,,
```

## Extracción automática de metadatos

Cuando proporcionas una `source_url`, Telar puede llenar automáticamente los metadatos a partir del manifiesto IIIF — título, descripción, creador, periodo, ubicación y crédito. Esto te ahorra escribir información que la institución ya tiene registrada.

### Cómo usarlo

Agrega la URL del manifiesto IIIF a tu hoja de cálculo y deja los campos de metadatos vacíos:

```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,,,https://example.org/iiif/manifest.json,,,,
```

Cuando tu sitio se compile, Telar:

1. Obtendrá el manifiesto IIIF
2. Extraerá los metadatos disponibles
3. Llenará los campos que dejaste vacíos
4. Conservará los valores que hayas escrito

### Tus datos siempre tienen prioridad

Tienes control total sobre lo que se extrae:

- **Deja los campos vacíos** y Telar los llena desde el manifiesto
- **Llena algunos campos** y Telar solo completa el resto
- **Llena todo** y los metadatos del manifiesto se ignoran

**Ejemplo — sobrescritura parcial:**
```csv
object_id,title,description,source_url,creator,period,location,credit
map-001,Mi título personalizado,,https://example.org/manifest.json,,,,
```

Telar usará "Mi título personalizado" (tu valor) y extraerá la descripción, creador, periodo, ubicación y crédito del manifiesto.

### Detección de idioma

La extracción respeta la configuración de idioma de tu sitio (`telar_language` en `_config.yml`):

- **Sitios en inglés** (`en`) — Prioriza metadatos en inglés; recurre a otros idiomas si no están
- **Sitios en español** (`es`) — Prioriza español, luego inglés, luego otros idiomas

### Detección inteligente de créditos

Para el campo `credit`, Telar filtra textos legales genéricos (URLs de Creative Commons, avisos de derechos) y busca líneas de atribución significativas — el nombre de la institución, el titular de los derechos o la línea de crédito.

### Qué busca Telar

Cada institución nombra sus metadatos de manera diferente. Telar busca variaciones comunes:

| Campo | Busca |
|-------|-------|
| title | Title, Label, Name |
| description | Description, Summary, Note |
| creator | Creator, Artist, Maker, Author |
| period | Date, Period, Creation Date, Date Created |
| location | Repository, Holding Institution, Current Location |
| credit | Attribution, Rights Holder, Credit Line, Provider |

### Cuándo escribir tus propios valores

Quizás quieras ingresar tus propios valores cuando:

- El manifiesto está en un idioma que tu público no entenderá
- La institución usa abreviaturas o códigos
- La descripción es muy técnica para tu público
- Prefieres una versión más corta o más simple de algún campo

### Procesamiento durante la compilación

La extracción de metadatos ocurre automáticamente al compilar el sitio:

- **GitHub Pages**: Se ejecuta durante el despliegue — no necesitas hacer nada
- **Desarrollo local**: Ejecuta `python3 scripts/csv_to_json.py` cuando agregues o actualices URLs de manifiestos

### Validación

Durante la compilación, Telar verifica cada manifiesto:

- **Manifiesto válido** — Metadatos extraídos con éxito
- **Manifiesto no disponible** — La URL no respondió; se reintentará en la siguiente compilación
- **Sin metadatos** — El manifiesto es válido pero no contiene campos extraíbles

Revisa los registros de la compilación para ver el estado de la extracción.

### Limitaciones

- Solo funciona con **manifiestos IIIF externos** (las imágenes autoalojadas no tienen manifiestos de los cuales extraer)
- Los manifiestos deben ser de acceso público (sin inicio de sesión)
- Las etiquetas HTML se eliminan del texto extraído
- Algunos manifiestos pueden no incluir campos de metadatos

## Solución de problemas

### La imagen no carga

- Verifica que la URL del manifiesto sea correcta — intenta abrirla directamente en tu navegador
- Asegúrate de que el recurso sea de acceso público (sin autenticación)
- Confirma que pegaste la URL completa, incluyendo `info.json` o `manifest.json`

### Los metadatos no aparecen

- Revisa los registros de la compilación para ver advertencias de extracción
- El manifiesto puede no incluir los campos que esperas
- Intenta ingresar los valores manualmente en tu hoja de cálculo

### Carga lenta

- Las imágenes externas se cargan desde el servidor de la institución — la velocidad depende de su infraestructura
- Algunas instituciones pueden limitar las solicitudes de sitios desconocidos

## Véase también

- [Imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) — Sube tus propias imágenes en lugar de usar fuentes externas
- [Objetos](/guia/tu-contenido/objetos/) — Cómo definir objetos en tu hoja de cálculo
- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Referencia completa de columnas de la hoja de cálculo de objetos
