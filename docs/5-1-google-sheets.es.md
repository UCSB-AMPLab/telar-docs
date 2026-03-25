---
layout: docs
title: "5.1. Google Sheets"
parent: "5. Tus datos"
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/tus-datos/google-sheets/
---

## Integración con Google Sheets

Usa Google Sheets para gestionar el contenido de tu exhibición con una interfaz familiar y colaborativa. Funciona tanto con el flujo de trabajo de Interfaz Web de GitHub como con Desarrollo Local.

## Inicio rápido

1. Duplica la plantilla: <https://bit.ly/telar-template> (Archivo → Hacer una copia · File → Make a copy)
2. Publica: Archivo → Compartir → Publicar en la Web · File → Share → Publish to the web
3. Configura `_config.yml` → bloque `google_sheets` (published_url)
4. Construye tu sitio (GitHub Actions o build local)

{: .tip }
> **Integración con el Compositor.** El Compositor puede importar directamente desde tu Google Sheet durante la configuración inicial. Después de la primera publicación con el Compositor, puedes desactivar la integración con Google Sheets si prefieres gestionar el contenido solo desde el Compositor.

Opcional: Importar desde Excel en lugar de duplicar la plantilla de Google

- Descarga la plantilla de Excel (archivo):
  {{ site.baseurl }}/assets/templates/telar-template.xlsx
- En Google Sheets: Archivo → Importar → Subir → Reemplazar hoja de cálculo · File → Import → Upload → Replace spreadsheet

## Estructura de la hoja

Tu hoja de cálculo incluye estas pestañas por defecto:

- `project` — Configuración del sitio y lista de historias
- `objects` — Objetos IIIF usados en las historias
- `story-1`, `story-2`, … — Pasos y contenido de cada historia

Consejos

- Usa filas que comiencen con `#` como separadores o TODOs (se ignoran en el procesamiento)
- Cualquier columna que empiece con `#` también se ignora (para notas y guía en línea)
- Coordenadas: empieza con `0.500, 0.500, 1.000` y luego afina usando la herramienta Identificar Coordenadas

## Configurar `_config.yml`

En tu repositorio, define:

```yaml
google_sheets:
  enabled: true
  published_url: "https://docs.google.com/..."   # Archivo → Compartir → Publicar en la Web · File → Share → Publish to the web
```

- `published_url` provee URLs CSV estables por pestaña

{: .note }
> **Simplificado en v0.9.0.** Ya no necesitas compartir tu hoja por separado. Solo se requiere la URL publicada. Si tu configuración todavía tiene una línea `shared_url`, se ignora sin problemas.

![Captura de pantalla de GitHub: editando el archivo de configuración](/images/config_drive.gif)

## Obtener datos (solo desarrollo local)

Cuando desarrolles localmente, la forma más sencilla es usar el script de construcción **todo-en-uno** del sitio, que descarga y procesa los datos automáticamente:

```bash
python3 scripts/build_local_site.py
```

O ejecuta el paso de descarga de manera independiente:

```bash
python3 scripts/fetch_google_sheets.py
```

Qué hace el script de descarga:

- Detecta automáticamente los GID de las pestañas
- Descarga CSV a `telar-content/spreadsheets/`
- Omite pestañas solo de instrucciones

Luego ejecuta tu flujo de build habitual:

```bash
python3 scripts/csv_to_json.py
python3 scripts/generate_collections.py
bundle exec jekyll build
```

## Referencia de columnas (resumen)

Pestaña `project`

- Después de la fila `STORIES`, lista cada historia (número y título)

Pestaña `objects` (campos comunes)

- object_id, title, description, source_url, creator, period, medium, dimensions, location, credit, thumbnail

Pestañas `story-X`

- step, object, x, y, zoom, clip, question, answer, alt_text
- layer1_button, **layer1_content**, layer2_button, **layer2_content**

El contenido del panel puede ser:
- Texto en línea (escrito directamente en la celda)
- Indicar un archivo de texto (ruta terminando en `.md`)

{: .tip }
> **Texto en línea vs archivos de texto**
> Para paneles cortos (1–2 párrafos), escribe el contenido directamente en la celda de la hoja de cálculo. Usa archivos de texto para contenido complejo con widgets o narrativas muy largas. Consulta la [Referencia CSV: Historias](/guia/tus-datos/csv-historias/#contenido-de-capa) para más detalles.

## Solución de problemas

- Referencias de objetos inválidas → asegúrate de que los IDs coincidan exactamente entre `objects` y las pestañas de historia
- Falla al traer datos → verifica la configuración de compartir/publicar y las URLs en `_config.yml`
- Coordenadas imprecisas → usa rangos válidos (x/y: 0.000–1.000; zoom: número positivo)

## Véase también

- [Configuración manual](/guia/configuracion/configuracion-manual/)
- [Desarrollo local](/guia/primeros-pasos/desarrollo-local/)
- [Actualizar Telar](/guia/configuracion/actualizacion/)
