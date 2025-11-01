---
layout: default
title: 2.4. Integración con Google Sheets
parent: 2. Flujos de Trabajo
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /documentacion/2-flujos-de-trabajo/4-google-sheets/
---

## Integración con Google Sheets

Usa Google Sheets para gestionar el contenido de tu exposición con una interfaz familiar y colaborativa. Funciona tanto con el flujo de trabajo de Interfaz Web de GitHub como con Desarrollo Local.

## Inicio rápido

1. Duplica la plantilla: <https://bit.ly/telar-template> (Archivo → Hacer una copia · File → Make a copy)
2. Comparte: Cualquiera con el enlace (Lector)
3. Publica: Archivo → Compartir → Publicar en la Web · File → Share → Publish to the web
4. Configura `_config.yml` → bloque `google_sheets` (shared_url, published_url)
5. Construye tu sitio (GitHub Actions o build local)

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
  shared_url: "https://docs.google.com/..."      # Compartir: Cualquiera con el enlace (Lector)
  published_url: "https://docs.google.com/..."   # Archivo → Compartir → Publicar en la Web · File → Share → Publish to the web
```

- `shared_url` asegura que el *fetcher* pueda leer la hoja
- `published_url` provee URLs CSV estables por pestaña

## Obtener datos (solo desarrollo local)

Cuando desarrolles localmente, trae los CSV antes de construir:

```bash
python3 scripts/fetch_google_sheets.py
```

Qué hace:

- Detecta automáticamente los GID de las pestañas
- Descarga CSV a `components/structures/`
- Omite pestañas solo de instrucciones

Luego ejecuta tu build normal:

```bash
python3 scripts/csv_to_json.py
python3 scripts/generate_collections.py
bundle exec jekyll build
```

## Referencia de columnas (resumen)

Pestaña `project`

- Después de la fila `STORIES`, lista cada historia (número y título)

Pestaña `objects` (campos comunes)

- object_id, title, description, iiif_manifest, creator, period, medium, dimensions, location, credit, thumbnail

Pestañas `story-X`

- step, object, x, y, zoom, question, answer, layer1_button, layer1_file, layer2_button, layer2_file

## Solución de problemas

- Referencias de objetos inválidas → asegúrate de que los IDs coincidan exactamente entre `objects` y las pestañas de historia
- Falla al traer datos → verifica la configuración de compartir/publicar y las URLs en `_config.yml`
- Coordenadas imprecisas → usa rangos válidos (x/y: 0.000–1.000; zoom: número positivo)

## Ver también

- [Interfaz Web de GitHub](/documentacion/2-flujos-de-trabajo/1-interfaz-web/)
- [Desarrollo local](/documentacion/2-flujos-de-trabajo/2-desarrollo-local/)
- [Cómo actualizar](/documentacion/2-flujos-de-trabajo/3-actualizar/)
