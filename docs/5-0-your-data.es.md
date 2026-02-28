---
layout: docs
title: 5. Tus datos
parent: Documentación
nav_order: 5
lang: es
permalink: /guia/tus-datos/
has_children: true
---

# Tus datos

Telar usa archivos de hoja de cálculo para definir la estructura de tu exhibición — qué historias existen, qué objetos contienen, dónde hacer zoom en cada imagen y qué términos de glosario incluir.

Puedes administrar estos datos de dos maneras:
- **Google Sheets** — edita una hoja de cálculo en tu navegador y Telar la obtiene y convierte a archivos CSV automáticamente durante cada compilación
- **Archivos CSV** — edita los archivos directamente en `components/structures/`

Ambos enfoques producen el mismo resultado. La mayoría de las personas comienzan con Google Sheets y nunca tocan un archivo CSV.

## Archivos de datos

| Archivo | Qué define | Referencia |
|---------|-----------|-----------|
| `project.csv` | Historias, orden de visualización, títulos | [Columnas del proyecto](/guia/tus-datos/csv-proyecto/) |
| `objects.csv` | Catálogo de objetos y metadatos | [Columnas de objetos](/guia/tus-datos/csv-objetos/) |
| `{story-id}.csv` | Pasos, coordenadas, contenido de paneles | [Columnas de historias](/guia/tus-datos/csv-historias/) |
| `glossary.csv` | Términos de glosario y definiciones | [Columnas del glosario](/guia/tus-datos/csv-glosario/) |

## Soporte bilingüe de columnas

Todos los archivos de hoja de cálculo admiten nombres de columnas en inglés y en español. Puedes usar cualquiera de los dos idiomas, mezclarlos o incluir encabezados dobles para equipos bilingües:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido,por Dra. María García
```

Telar detecta automáticamente y omite la segunda fila de encabezado. También se admiten nombres de archivos en español (`proyecto.csv`, `objetos.csv`). Consulta [Columnas del proyecto](/guia/tus-datos/csv-proyecto/#descripcion-general) para detalles completos sobre la normalización de columnas.

## Google Sheets

Consulta [Google Sheets](/guia/tus-datos/google-sheets/) para la configuración y el flujo de trabajo.
