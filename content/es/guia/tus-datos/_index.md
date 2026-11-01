---
title: Tus datos
url: /guia/tus-datos/
translationKey: docs-your-data
type: guide
docs_section: reference
---

# Tus datos {#tus-datos}

Telar usa archivos de hoja de cálculo para definir la estructura de tu exhibición — qué historias existen, qué objetos contienen, dónde hacer zoom en cada imagen y qué términos de glosario incluir.

Estos archivos son el formato de publicación. Elige cómo editar su contenido:
- **Compositor** — edita visualmente; el editor escribe los archivos al publicar
- **Google Sheets** — edita una hoja de cálculo en tu navegador y Telar la obtiene y convierte a archivos CSV automáticamente durante cada *build*
- **Archivos CSV** — edita los archivos directamente en `telar-content/spreadsheets/`

Elige una fuente para la autoría. Si Google Sheets está activo, el build lo descarga y reemplaza sus copias CSV locales. Los [tres manuales](/guia/#build) explican cada proceso.

## Archivos de datos {#archivos-de-datos}

| Archivo | Qué define | Referencia |
|---------|-----------|-----------|
| `project.csv` | Historias, orden de visualización, títulos | [Columnas del proyecto](/guia/tus-datos/csv-proyecto/) |
| `objects.csv` | Catálogo de objetos y metadatos | [Columnas de objetos](/guia/tus-datos/csv-objetos/) |
| `{story-id}.csv` | Pasos, coordenadas, contenido de paneles | [Columnas de historias](/guia/tus-datos/csv-historias/) |
| `glossary.csv` | Términos de glosario y definiciones | [Columnas del glosario](/guia/tus-datos/csv-glosario/) |

## Soporte bilingüe de columnas {#soporte-bilingüe-de-columnas}

Todos los archivos de hoja de cálculo admiten nombres de columnas en inglés y en español. Puedes usar cualquiera de los dos idiomas, mezclarlos o incluir encabezados dobles para equipos bilingües:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido,por Dra. María García
```

Telar detecta automáticamente y omite la segunda fila de encabezado. También se admiten nombres de archivos en español (`proyecto.csv`, `objetos.csv`). Consulta [Columnas del proyecto](/guia/tus-datos/csv-proyecto/#descripción-general) para detalles completos sobre la normalización de columnas.

## Google Sheets {#google-sheets}

Consulta [Google Sheets](/guia/tus-datos/google-sheets/) para la configuración y el flujo de trabajo.
