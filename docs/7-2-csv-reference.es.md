---
layout: docs
title: 7.2. Referencia de columnas CSV
parent: 7. Referencia
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/referencia/csv-reference/
---

# Referencia de columnas CSV

Referencia completa para todas las columnas CSV en Telar con soporte de nombres de columnas bilingües.

## Descripción general

Telar v0.6.0+ admite columnas CSV en inglés y español. Puedes usar cualquier idioma de forma consistente, mezclarlos, o incluir encabezados duales para referencia bilingüe.

### Normalización de columnas

Todos los nombres de columna se normalizan durante el procesamiento:
- Sin distinción de mayúsculas (`Title` = `title` = `TITLE`)
- Espacios en blanco recortados
- Nombres en español mapeados a equivalentes en inglés
- Caracteres acentuados admitidos

### Soporte de encabezados duales

Incluye encabezados en inglés y español para equipos bilingües:

```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
1,colonial-textiles,Colonial Textiles,Weaving traditions,by Dr. Smith
2,textiles-coloniales,Textiles Coloniales,Tradiciones textiles,por Dra. García
```

Telar detecta automáticamente y omite la segunda fila de encabezado.

## CSV de proyecto (project.csv / proyecto.csv)

Define historias y su orden de visualización en la página de inicio.

**Ubicación**: `components/structures/project.csv` o `components/structures/proyecto.csv`

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `order` | `orden` | Sí | Orden de visualización en la página de inicio (1, 2, 3...) |
| `story_id` | `id_historia` | No | Identificador semántico (ej., `textiles-coloniales`). Si se omite, usa `story-{orden}` |
| `title` | `titulo` | Sí | Título de historia mostrado en la página de inicio y página de historia |
| `subtitle` | `subtitulo` | Sí | Descripción breve mostrada en tarjetas de historia |
| `byline` | `firma` | No | Atribución de autoría; admite markdown para enlaces y formato |

### Ejemplo

**Inglés:**
```csv
order,story_id,title,subtitle,byline
1,colonial-textiles,Colonial Textiles,Weaving traditions of the Americas,by Dr. Jane Smith
2,trade-routes,Trade Routes,Following the threads of commerce,based on [original research](https://example.com)
```

**Español:**
```csv
orden,id_historia,titulo,subtitulo,firma
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido de las Américas,por Dra. María García
2,rutas-comerciales,Rutas Comerciales,Siguiendo los hilos del comercio,basado en [investigación original](https://ejemplo.com)
```

### Notas de campo

#### order / orden
- Deben ser enteros únicos
- Determina el orden de tarjetas en la página de inicio
- Se permiten brechas (1, 2, 5 funciona bien)
- Se renumera automáticamente si se incluye contenido de demostración

#### story_id / id_historia
- **Nuevo en v0.6.0**
- Solo minúsculas, guiones, guiones bajos
- Se usa para: nombre de archivo CSV de historia, URL de historia, referencias internas
- Si se omite: predeterminado a `story-1`, `story-2`, etc. basado en orden
- Ejemplos: `textiles-coloniales`, `paisajes_coloniales`, `historia-uno`

#### title / titulo
- Se muestra en tarjetas de página de inicio y encabezados de página de historia
- Sin procesamiento de markdown (solo texto plano)
- Recomendado: 2-6 palabras

#### subtitle / subtitulo
- Se muestra debajo del título en tarjetas de página de inicio
- Sin procesamiento de markdown
- Recomendado: 5-12 palabras
- Describe brevemente el contenido de la historia

#### byline / firma
- **Admite markdown** (v0.6.0+)
- Página de inicio: se renderiza como texto plano
- Página de historia: renderiza enlaces markdown como clicables
- Patrones comunes:
  - `por Dra. María García`
  - `by Dr. Jane Smith and Juan López`
  - `basado en [investigación original](https://ejemplo.com)`
  - `curado por *Proyecto de Archivo Digital*`

## CSV de objetos (objects.csv / objetos.csv)

Cataloga todos los objetos usados en historias.

**Ubicación**: `components/structures/objects.csv` o `components/structures/objetos.csv`

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `object_id` | `objeto` | Sí | Identificador único (minúsculas, guiones, guiones bajos) |
| `title` | `titulo` | Sí | Título del objeto |
| `description` | `descripcion` | No | Descripción de formato largo (se admite markdown) |
| `creator` | `creador` | No | Nombre del creador o artista |
| `date` | `fecha` / `periodo` | No | Fecha de creación o período |
| `medium` | `medio` | No | Material o medio |
| `dimensions` | `dimensiones` | No | Dimensiones físicas |
| `location` | `ubicacion` / `locacion` | No | Ubicación actual o repositorio |
| `credit` | `credito` | No | Atribución o línea de crédito |
| `thumbnail` | `miniatura` | No | Ruta a imagen en miniatura |
| `iiif_manifest` | `manifiesto_iiif` | No | URL a manifiesto IIIF externo |
| `source_url` | `url_fuente` | No | URL de info.json de imagen IIIF |

### Ejemplo

**Inglés:**
```csv
object_id,title,description,creator,date,medium,dimensions,location,credit,thumbnail,source_url
textile-001,Colonial Textile,A woven fragment showing complex patterns...,Unknown,circa 1650,Wool,45 x 60 cm,National Museum,Public Domain,,
map-lima,Map of Lima,Early colonial map showing city layout,Juan de Cuellar,1685,Ink on paper,30 x 40 cm,,,map-thumb.jpg,https://example.org/iiif/map/info.json
```

**Español:**
```csv
objeto,titulo,descripcion,creador,periodo,medio,dimensiones,ubicacion,credito,miniatura,url_fuente
textil-001,Textil Colonial,Un fragmento tejido con patrones complejos...,Desconocido,circa 1650,Lana,45 x 60 cm,Museo Nacional,Dominio Público,,
mapa-lima,Mapa de Lima,Mapa colonial temprano mostrando el diseño de la ciudad,Juan de Cuellar,1685,Tinta sobre papel,30 x 40 cm,,,mapa-miniatura.jpg,https://ejemplo.org/iiif/mapa/info.json
```

### Notas de campo

#### object_id / objeto
- Único entre todos los objetos
- Referenciado en CSVs de historia
- Usado en URLs: `/objects/{object_id}/`
- Formato: minúsculas, guiones, guiones bajos

#### description / descripcion
- Se admite markdown
- Se muestra en páginas de objetos
- Puede incluir encabezados, listas, enlaces, énfasis

#### date / fecha / periodo
- Formato flexible
- Ejemplos: `1650`, `circa 1650`, `1600-1650`, `siglo XVII`

#### credit / credito
- Se muestra como etiqueta en la esquina superior derecha de imágenes de objetos (si `show_object_credits: true`)
- También se muestra en tabla de metadatos
- Usar para atribución: `Dominio Público`, `CC BY 4.0`, `Cortesía del Archivo Nacional`

#### iiif_manifest / manifiesto_iiif
- URL a manifiesto de API de Presentación IIIF externo
- Usar para objetos de repositorios externos
- Anula `source_url` si ambos están proporcionados

#### source_url / url_fuente
- URL a info.json de API de Imagen IIIF
- Usar para objetos de servidores IIIF
- Dejar vacío para imágenes autoalojadas (autogenerado)

## CSV de historia (story-{id}.csv / historia-{id}.csv)

Define navegación paso a paso y contenido de panel para cada historia.

**Ubicación**: `components/structures/{story_id}.csv` o `components/structures/historia-{story_id}.csv`

**Nomenclatura**:
- Si se especifica `story_id` en project.csv: usar ese nombre (ej., `textiles-coloniales.csv`)
- Si se omite `story_id`: usar `story-{orden}.csv` (ej., `story-1.csv`, `story-2.csv`)

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `step` | `paso` | Sí | Número de paso (1, 2, 3...) |
| `object` | `objeto` | Sí | ID de objeto de objects.csv |
| `x` | `x` | Sí | Coordenada horizontal (0-1 normalizado) |
| `y` | `y` | Sí | Coordenada vertical (0-1 normalizado) |
| `zoom` | `zoom` | Sí | Nivel de zoom (0-1 normalizado) |
| `question` | `pregunta` | Sí | Encabezado mostrado en panel de historia |
| `answer` | `respuesta` | Sí | Texto de respuesta breve |
| `layer1_button` | `boton_capa1` | No | Texto de botón personalizado (vacío = "Saber más") |
| `layer1_file` | `archivo_capa1` | Sí | Ruta a archivo markdown de capa 1 |
| `layer2_button` | `boton_capa2` | No | Texto de botón personalizado (vacío = "Profundizar más") |
| `layer2_file` | `archivo_capa2` | No | Ruta a archivo markdown de capa 2 |
| `layer3_button` | `boton_capa3` | No | Texto de botón personalizado (vacío = predeterminado) |
| `layer3_file` | `archivo_capa3` | No | Ruta a archivo markdown de capa 3 |

### Ejemplo

**Inglés:**
```csv
step,object,x,y,zoom,question,answer,layer1_button,layer1_file,layer2_button,layer2_file
1,textile-001,0.5,0.5,1.0,What is this?,A colonial textile fragment,"",colonial-textiles/step1-layer1.md,"Learn More",colonial-textiles/step1-layer2.md
2,textile-001,0.3,0.7,0.5,What is this pattern?,An interlocking warp design,"",colonial-textiles/step2-layer1.md,"",colonial-textiles/step2-layer2.md
```

**Español:**
```csv
paso,objeto,x,y,zoom,pregunta,respuesta,boton_capa1,archivo_capa1,boton_capa2,archivo_capa2
1,textil-001,0.5,0.5,1.0,¿Qué es esto?,Un fragmento de textil colonial,"",textiles-coloniales/paso1-capa1.md,"Saber más",textiles-coloniales/paso1-capa2.md
2,textil-001,0.3,0.7,0.5,¿Qué es este patrón?,Un diseño de urdimbre entrelazada,"",textiles-coloniales/paso2-capa1.md,"",textiles-coloniales/paso2-capa2.md
```

### Notas de campo

#### step / paso
- Deben ser enteros secuenciales comenzando en 1
- No se permiten brechas (1, 2, 3... no 1, 3, 5)
- Determina el orden de navegación

#### object / objeto
- Debe coincidir con un `object_id` de objects.csv
- Múltiples pasos pueden referenciar el mismo objeto

#### x, y, zoom
- Todos los valores normalizados 0-1
- **x**: 0 = borde izquierdo, 1 = borde derecho, 0.5 = centro
- **y**: 0 = borde superior, 1 = borde inferior, 0.5 = centro
- **zoom**: 0 = alejado (imagen completa), 1 = zoom máximo
- Usar herramienta de coordenadas en páginas de objetos para encontrar valores

#### question / pregunta
- Se muestra como encabezado de panel
- Pregunta o declaración breve
- Recomendado: 3-8 palabras

#### answer / respuesta
- Respuesta breve mostrada en panel
- Adelanto del contenido de capa 1
- Recomendado: 1-2 oraciones

#### layer buttons / botones de capa
- Cadena vacía = texto de botón predeterminado
- Texto personalizado: cualquier cadena (ej., "Ver detalles", "See details")
- Si el archivo existe pero el botón está vacío: muestra texto predeterminado
- Si el archivo está vacío: botón oculto

#### layer files / archivos de capa
- Rutas relativas a `components/texts/stories/`
- Extensión `.md` requerida
- Puede usar subdirectorios para organización
- Capa 1 requerida, capas 2-3 opcionales
- Si el archivo no existe: botón oculto, muestra error en compilación

## Nombres de columnas alternativos

Mapeos completos de todos los nombres de columna aceptados.

### Alias de CSV de proyecto

| Normalizado | Acepta |
|-------------|--------|
| `order` | `order`, `orden`, `number`, `numero`, `num` |
| `story_id` | `story_id`, `id_historia`, `story-id`, `story` |
| `title` | `title`, `titulo`, `name`, `nombre` |
| `subtitle` | `subtitle`, `subtitulo`, `description`, `descripcion`, `desc` |
| `byline` | `byline`, `firma`, `author`, `autor`, `attribution`, `atribucion` |

### Alias de CSV de objetos

| Normalizado | Acepta |
|-------------|--------|
| `object_id` | `object_id`, `objeto`, `object`, `id` |
| `title` | `title`, `titulo`, `name`, `nombre` |
| `description` | `description`, `descripcion`, `desc` |
| `creator` | `creator`, `creador`, `artist`, `artista`, `author`, `autor` |
| `date` | `date`, `fecha`, `period`, `periodo` |
| `medium` | `medium`, `medio`, `material` |
| `dimensions` | `dimensions`, `dimensiones`, `size`, `tamaño` |
| `location` | `location`, `ubicacion`, `locacion`, `repository`, `repositorio` |
| `credit` | `credit`, `credito`, `attribution`, `atribucion` |
| `thumbnail` | `thumbnail`, `miniatura`, `thumb` |
| `iiif_manifest` | `iiif_manifest`, `manifiesto_iiif`, `manifest`, `manifiesto` |
| `source_url` | `source_url`, `url_fuente`, `iiif_source_url`, `iiif_url` |

### Alias de CSV de historia

| Normalizado | Acepta |
|-------------|--------|
| `step` | `step`, `paso`, `number`, `numero`, `num` |
| `object` | `object`, `objeto`, `object_id` |
| `x` | `x`, `horizontal`, `left` |
| `y` | `y`, `vertical`, `top` |
| `zoom` | `zoom`, `z`, `scale` |
| `question` | `question`, `pregunta`, `heading`, `encabezado` |
| `answer` | `answer`, `respuesta`, `response` |
| `layer1_button` | `layer1_button`, `boton_capa1`, `button1`, `btn1` |
| `layer1_file` | `layer1_file`, `archivo_capa1`, `file1`, `layer1` |
| `layer2_button` | `layer2_button`, `boton_capa2`, `button2`, `btn2` |
| `layer2_file` | `layer2_file`, `archivo_capa2`, `file2`, `layer2` |
| `layer3_button` | `layer3_button`, `boton_capa3`, `button3`, `btn3` |
| `layer3_file` | `layer3_file`, `archivo_capa3`, `file3`, `layer3` |

## Mejores prácticas

### Elegir nombres de columnas

**Sitios monolingües**: Usa tu idioma preferido de forma consistente
```csv
# Sitio en inglés
order,story_id,title,subtitle,byline

# Sitio en español
orden,id_historia,titulo,subtitulo,firma
```

**Equipos bilingües**: Usa encabezados duales
```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
```

**Entornos mixtos**: Se admite mezcla pero no se recomienda
```csv
order,id_historia,title,subtitulo,byline  # Funciona pero confuso
```

### Organización de archivos

**Estructura recomendada**:
```
components/structures/
├── project.csv              # Inglés
├── objects.csv
├── colonial-textiles.csv    # Usando story_id
└── trade-routes.csv

# O

components/structures/
├── proyecto.csv             # Español
├── objetos.csv
├── textiles-coloniales.csv
└── rutas-comerciales.csv
```

**Nomenclatura de story_id**:
- Usar nombres semánticos: `textiles-coloniales`, no `historia-sobre-textiles-coloniales`
- Mantener corto: máximo 2-4 palabras
- Coincidir idioma del contenido: `textiles-coloniales` para historias en español

### Consejos de entrada de datos

**Coordenadas**:
1. Usar herramienta de coordenadas en páginas de objetos
2. Hacer clic para identificar valores de x, y, zoom
3. Copiar valores directamente en CSV
4. Probar en visor de historia

**Markdown en campos**:
- `description`: Se admite markdown completo
- `byline`: Markdown solo para enlaces/énfasis
- `question`, `answer`: Solo texto plano

**Referencias de archivo**:
- Siempre relativo a `components/texts/stories/`
- Usar subdirectorios para organización
- Incluir extensión `.md`
- Verificar que el archivo existe antes de confirmar

## Validación

Telar valida datos CSV durante la compilación:

**Errores (falla la compilación)**:
- Faltan columnas requeridas
- Valores `object_id` duplicados
- Secuencia `step` inválida (brechas, duplicados)
- Faltan archivos markdown de capa
- Valores de coordenadas inválidos (fuera del rango 0-1)

**Advertencias (compilación exitosa)**:
- Faltan columnas opcionales
- Descripciones vacías
- Nombres de columna no reconocidos (ignorados)
- Faltan miniaturas

Verificar salida de compilación para mensajes de validación.

## Migración de versiones anteriores

### De v0.5.x a v0.6.0

**Nuevas funcionalidades**:
- Columna `story_id` (opcional)
- Nombres de columna en español
- Soporte de encabezados duales
- Markdown en `byline`
- Configuración `show_object_credits`

**Cambios incompatibles**: Ninguno. Todos los CSVs de v0.5.x funcionan sin modificación.

**Actualizaciones recomendadas**:
1. Agregar `story_id` a project.csv para nomenclatura semántica
2. Renombrar CSVs de historia para coincidir con `story_id`
3. Considerar usar nombres de columna en español si es apropiado
4. Agregar enlaces markdown a bylines si se desea

### De v0.4.x a v0.6.0

**Cambios adicionales**:
- `source_url` reemplaza `iiif_url` (el nombre antiguo aún funciona)
- Sistema de tres capas (era de dos capas)
- Soporte de texto de botón personalizado

## Solución de problemas

### Errores "Column not found"

**Causa**: Nombre de columna no reconocido
**Solución**: Verificar ortografía, usar nombres de la referencia anterior

### Errores "Duplicate object_id"

**Causa**: Mismo object_id usado dos veces en objects.csv
**Solución**: Hacer cada object_id único

### Errores "Invalid step sequence"

**Causa**: Pasos no secuenciales (1, 2, 4) o pasos duplicados
**Solución**: Asegurar que los pasos sean 1, 2, 3, 4... sin brechas

### Errores "File not found"

**Causa**: Archivo markdown referenciado pero no existe
**Solución**: Crear archivo o eliminar referencia de archivo del CSV

### Las coordenadas no funcionan

**Causa**: Valores fuera del rango 0-1 o object_id incorrecto
**Solución**: Usar herramienta de coordenadas, verificar que el objeto existe

## Ver también

- [Estructura de Contenido](/guia/estructura-de-contenido/) - Descripción general de la organización de contenido de Telar
- [Flujo de Trabajo con Google Sheets](/guia/flujos-de-trabajo/google-sheets/) - Gestionar CSVs mediante Google Sheets
- [Sintaxis de Markdown](/guia/referencia/sintaxis-markdown/) - Opciones de formato para archivos de contenido

---

**Nuevo en v0.6.0**: Soporte de CSV bilingüe con nombres de columna en español y encabezados duales.
