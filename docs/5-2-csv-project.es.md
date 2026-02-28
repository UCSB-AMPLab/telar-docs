---
layout: docs
title: "5.2. Columnas del proyecto"
parent: "5. Tus datos"
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/tus-datos/csv-proyecto/
---

# Columnas del proyecto

Referencia completa de las columnas de `project.csv` con soporte bilingüe de nombres de columnas.

## Descripción general

Telar v0.6.0+ admite columnas CSV en inglés y español. Puedes usar cualquiera de los dos idiomas de forma consistente, mezclarlos o incluir encabezados dobles para referencia bilingüe.

### Normalización de columnas

Todos los nombres de columnas se normalizan durante el procesamiento:
- Sin distinción entre mayúsculas y minúsculas (`Title` = `title` = `TITLE`)
- Espacios recortados
- Nombres en español mapeados a equivalentes en inglés
- Caracteres con tilde admitidos

### Soporte de encabezados dobles

Incluye encabezados en inglés y español para equipos bilingües:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,colonial-textiles,Colonial Textiles,Weaving traditions,by Dr. Smith
2,textiles-coloniales,Textiles Coloniales,Tradiciones textiles,por Dra. García
```

Telar detecta automáticamente y omite la segunda fila de encabezado.

## CSV de proyecto (project.csv / proyecto.csv)

Define las historias y su orden de visualización en la página principal.

**Ubicación**: `components/structures/project.csv` o `components/structures/proyecto.csv`

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `order` | `orden` | Sí | Orden de visualización en la página principal (1, 2, 3...) |
| `story_id` | `id_historia` | No | Identificador semántico (ej., `textiles-coloniales`). Si se omite, usa `story-{order}` |
| `title` | `titulo` | Sí | Título de la historia mostrado en la página principal y en la historia |
| `subtitle` | `subtitulo` | Sí | Descripción breve mostrada en las tarjetas de historia |
| `byline` | `firma` | No | Atribución de autoría; admite markdown para enlaces y formato |
| `protected` | `protegida` | No | Pon `yes` para encriptar esta historia (requiere `story_key` en la configuración) |

### Ejemplo

**Inglés:**
```csv
order,story_id,title,subtitle,byline,protected
1,colonial-textiles,Colonial Textiles,Weaving traditions of the Americas,by Dr. Jane Smith,
2,trade-routes,Trade Routes,Following the threads of commerce,based on [original research](https://example.com),yes
```

**Español:**
```csv
orden,id_historia,titulo,subtitulo,firma,protegida
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido de las Américas,por Dra. María García,
2,rutas-comerciales,Rutas Comerciales,Siguiendo los hilos del comercio,basado en [investigación original](https://ejemplo.com),si
```

### Notas de los campos

#### order
- Deben ser enteros únicos
- Determina el orden de las tarjetas en la página principal
- Se permiten saltos (1, 2, 5 funciona bien)
- Se renumera automáticamente si se incluye contenido de demostración

#### story_id
- **Nuevo en v0.6.0**
- Solo minúsculas, guiones y guiones bajos
- Se usa para: nombre del archivo CSV de la historia, URL de la historia, referencias internas
- Si se omite: se usa `story-1`, `story-2`, etc. según el orden
- Ejemplos: `textiles-coloniales`, `paisajes_coloniales`, `story-one`

#### title
- Se muestra en las tarjetas de la página principal y en los encabezados de la historia
- Sin procesamiento markdown (solo texto plano)
- Recomendado: 2-6 palabras

#### subtitle
- Se muestra debajo del título en las tarjetas de la página principal
- Sin procesamiento markdown
- Recomendado: 5-12 palabras
- Describe brevemente el contenido de la historia

#### byline
- **Admite markdown** (v0.6.0+)
- Página principal: se renderiza como texto plano
- Página de la historia: renderiza enlaces markdown como clicables
- Patrones comunes:
  - `por Dra. María García`
  - `por María García y Juan López`
  - `basado en [investigación original](https://example.com)`
  - `curado por *Proyecto de Archivo Digital*`

#### protected
- **Nuevo en v0.8.0**
- Pon `yes` para encriptar la historia durante la compilación
- Requiere `story_key` en `_config.yml`
- Las personas acceden a historias protegidas mediante el parámetro de URL `?key=tu-clave`
- Déjalo vacío u omítelo para historias públicas
- Consulta [Historias Privadas](/guia/funciones/historias-privadas/) para detalles

### Alias del CSV de proyecto

| Normalizado | Acepta |
|------------|--------|
| `order` | `order`, `orden` |
| `story_id` | `story_id`, `id_historia` |
| `title` | `title`, `titulo` |
| `subtitle` | `subtitle`, `subtitulo` |
| `byline` | `byline`, `firma` |
| `protected` | `protected`, `protegida`, `private`, `privada` |

## Véase también

- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Columnas de objects.csv
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Columnas de los CSV de historia
- [Columnas del glosario](/guia/tus-datos/csv-glosario/) — Columnas de glossary.csv
- [Google Sheets](/guia/tus-datos/google-sheets/) — Uso de Google Sheets con Telar
