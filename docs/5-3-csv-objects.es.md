---
layout: docs
title: "5.3. Columnas de objetos"
parent: "5. Tus datos"
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/tus-datos/csv-objetos/
---

# Columnas de objetos

Referencia completa de las columnas de `objects.csv` con soporte bilingüe de nombres de columnas. Para la normalización de columnas y soporte de encabezados dobles, consulta [Columnas del proyecto](/guia/tus-datos/csv-proyecto/#descripcion-general).

## CSV de objetos (objects.csv / objetos.csv)

Cataloga todos los objetos usados en las historias y mostrados en la galería.

**Ubicación**: `components/structures/objects.csv` o `components/structures/objetos.csv`

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `object_id` | `id_objeto` | Sí | Identificador único (minúsculas, guiones, guiones bajos) |
| `title` | `titulo` | Sí | Título del objeto |
| `description` | `descripcion` | No | Descripción extensa (admite markdown) |
| `source_url` | `url_fuente` | No | URL de la imagen IIIF info.json o manifiesto |
| `creator` | `creador` | No | Nombre del creador o artista |
| `period` | `periodo` | No | Periodo histórico |
| `year` | `año` | No | Año de creación o datación (se usa para ordenar en la galería) |
| `medium` | `medio` | No | Material o medio |
| `dimensions` | `dimensiones` | No | Dimensiones físicas |
| `source` | `fuente` | No | Ubicación o repositorio (renombrado desde `location` en v0.8.0) |
| `credit` | `credito` | No | Línea de atribución o crédito |
| `thumbnail` | `miniatura` | No | Ruta a la imagen en miniatura |
| `object_type` | `tipo_objeto` | No | Clasificación del objeto (se usa para el filtro de la galería) |
| `subjects` | `temas` | No | Temas, separados por comas (se usa para el filtro de la galería) |
| `featured` | `destacado` | No | Pon `yes` para destacar en la página principal |

### Ejemplo

**Inglés:**
```csv
object_id,title,description,creator,year,object_type,subjects,source,credit,featured,source_url
textile-001,Colonial Textile,A woven fragment showing complex patterns...,Unknown,1650,textile,"weaving, colonial",National Museum,Public Domain,yes,
map-lima,Map of Lima,Early colonial map showing city layout,Juan de Cuellar,1685,map,"cartography, Lima",British Library,,no,https://example.org/iiif/map/info.json
```

**Español:**
```csv
id_objeto,titulo,descripcion,creador,año,tipo_objeto,temas,fuente,credito,destacado,url_fuente
textil-001,Textil Colonial,Un fragmento tejido con patrones complejos...,Desconocido,1650,textil,"tejido, colonial",Museo Nacional,Dominio Público,si,
mapa-lima,Mapa de Lima,Mapa colonial temprano...,Juan de Cuellar,1685,mapa,"cartografía, Lima",Biblioteca Británica,,no,https://ejemplo.org/iiif/mapa/info.json
```

### Notas de los campos

#### object_id / id_objeto
- Único entre todos los objetos
- Referenciado en los CSV de historias
- Se usa en las URLs: `/objects/{object_id}/`
- Formato: minúsculas, guiones, guiones bajos

#### description / descripcion
- Admite markdown
- Se muestra en las páginas de objetos
- Puede incluir encabezados, listas, enlaces, énfasis

#### source_url / url_fuente
- URL a la Image API IIIF info.json o la Presentation API IIIF manifiesto
- Úsalo para objetos de servidores IIIF externos
- Déjalo vacío para imágenes autoalojadas (las teselas se generan automáticamente)
- **v0.5.0+**: Preferido sobre la columna heredada `iiif_manifest` (que aún funciona)

#### year / año
- **Nuevo en v0.8.0**
- Se usa para ordenar objetos en la galería (ordenar por año)
- Formato flexible: `1650`, `1685`, `1750`
- Acepta `año` o `ano` (sin tilde) como alias en español

#### source / fuente
- **Renombrado en v0.8.0** desde `location`
- Ubicación actual o repositorio que lo alberga
- El nombre antiguo `location` (y los alias en español `ubicacion`, `locacion`) sigue funcionando por compatibilidad

#### object_type / tipo_objeto
- **Nuevo en v0.8.0**
- Clasificación del objeto usada como faceta en la barra lateral de filtros de la galería
- Ejemplos: `mapa`, `textil`, `fotografía`, `pintura`
- Aparece como categoría de filtro cuando `browse_and_search: true`

#### subjects / temas
- **Nuevo en v0.8.0**
- Temas separados por comas usados como facetas en la barra lateral de filtros de la galería
- Ejemplos: `"tejido, colonial, textiles"`, `"cartografía, Lima, urbanismo"`
- También acepta alias en español: `materias`, `materia`

#### featured / destacado
- **Nuevo en v0.8.0**
- Pon `yes` para destacar este objeto en la página principal
- Los objetos destacados se priorizan cuando `show_sample_on_homepage: true` en la configuración
- La cantidad mostrada se controla con `featured_count` (predeterminado: 4)

#### credit / credito
- Se muestra como etiqueta en la esquina superior derecha de las imágenes (si `show_object_credits: true`)
- También se muestra en la tabla de metadatos
- Úsalo para atribución: `Dominio Público`, `CC BY 4.0`, `Cortesía del Archivo Nacional`

#### thumbnail / miniatura
- Ruta a un archivo de imagen en miniatura
- Relativa a la raíz del repositorio
- Si se omite, Telar genera miniaturas desde la fuente IIIF

### Alias del CSV de objetos

| Normalizado | Acepta |
|------------|--------|
| `object_id` | `object_id`, `id_objeto`, `objeto`, `object`, `id` |
| `title` | `title`, `titulo` |
| `description` | `description`, `descripcion` |
| `creator` | `creator`, `creador` |
| `period` | `period`, `periodo` |
| `year` | `year`, `año`, `ano` |
| `medium` | `medium`, `medio` |
| `dimensions` | `dimensions`, `dimensiones` |
| `source` | `source`, `fuente`, `location`, `ubicacion` |
| `credit` | `credit`, `credito` |
| `thumbnail` | `thumbnail`, `miniatura` |
| `object_type` | `object_type`, `tipo_objeto` |
| `subjects` | `subjects`, `temas`, `materias`, `materia` |
| `featured` | `featured`, `destacado` |
| `source_url` | `source_url`, `url_fuente` |
| `iiif_manifest` | `iiif_manifest`, `manifiesto_iiif` (heredado) |

## Buenas prácticas

### Elegir nombres de columnas

**Sitios monolingües**: Usa tu idioma preferido de forma consistente
```csv
# Sitio en inglés
order,story_id,title,subtitle,byline

# Sitio en español
orden,id_historia,titulo,subtitulo,firma
```

**Equipos bilingües**: Usa encabezados dobles
```csv
order,story_id,title,subtitle,byline
orden,id_historia,titulo,subtitulo,firma
```

### Organización de archivos

```
components/structures/
├── project.csv              # Metadatos de las historias
├── objects.csv              # Catálogo de objetos
├── textiles-coloniales.csv  # Pasos de la historia (usando story_id)
├── rutas-comerciales.csv    # Otra historia
└── glossary.csv             # Términos de glosario (opcional)
```

### Consejos para los metadatos de la galería

Para la mejor experiencia de galería con exploración, búsqueda y filtrado:

1. **Completa `object_type`** para cada objeto — alimenta el filtro de tipo
2. **Agrega `subjects`** con 2-4 términos separados por comas — alimenta el filtro de temas
3. **Incluye `year`** para ordenación cronológica
4. **Marca 4-6 objetos como `featured: yes`** para la muestra de la página principal
5. **Escribe campos `description` significativos** — la búsqueda los indexa para texto completo

## Migración de v0.7.x a v0.8.0

### Columnas nuevas (opcionales)

Agrega estas a tu objects.csv si deseas filtrado y ordenación en la galería:

| Columna | Propósito |
|---------|-----------|
| `year` | Habilita ordenar por año en la galería |
| `object_type` | Habilita el filtro de tipo en la barra lateral |
| `subjects` | Habilita el filtro de temas en la barra lateral |
| `featured` | Controla la muestra de objetos en la página principal |

### Columnas renombradas

| Anterior (v0.7.x) | Nuevo (v0.8.0) | Notas |
|-------------------|----------------|-------|
| `location` | `source` | El nombre anterior sigue funcionando |

### Nueva columna en project.csv

| Columna | Propósito |
|---------|-----------|
| `protected` | Marca historias para encriptación (requiere `story_key` en la configuración) |

**Sin cambios que rompan compatibilidad.** Todos los CSV de v0.7.x funcionan sin modificación.

## Validación

Telar valida los datos CSV durante la compilación:

**Errores (la *build* falla)**:
- Faltan columnas requeridas (`object_id`, `title` para objetos; `order`, `title` para proyecto)
- Valores `object_id` duplicados

**Advertencias (la *build* continúa)**:
- Faltan columnas opcionales
- Descripciones vacías
- Nombres de columnas no reconocidos (se ignoran)
- Miniaturas faltantes

Revisa la salida de la *build* para ver mensajes de validación.

## Véase también

- [Columnas del proyecto](/guia/tus-datos/csv-proyecto/) — Columnas de project.csv
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Columnas de los CSV de historia
- [Objetos](/guia/tu-contenido/objetos/) — Información sobre objetos
- [Galería de objetos](/guia/funciones/galeria-objetos/) — Exploración, búsqueda y filtrado de la galería
- [Referencia de configuración](/guia/configurar/configuracion/) — Opciones de la interfaz de colección
