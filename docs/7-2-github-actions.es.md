---
layout: docs
title: 7.2. GitHub Actions
parent: 7. Para desarrolladores
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/desarrolladores/github-actions/
---

## Flujo de trabajo con GitHub Actions

Telar usa GitHub Actions para construir y publicar automáticamente tu sitio. Entender este flujo de trabajo te ayuda a solucionar problemas y optimizar tu proceso de desarrollo.

## Qué hace GitHub Actions

Cuando publicas vía GitHub Pages, el proceso de construcción es **completamente automatizado**. ¡No se requieren pasos manuales!

### Acciones del usuario (tú)

Edita contenido directamente en GitHub o empuja desde local:

1. **Edita la pestaña `objects` de tu Google Sheet o `objects.csv`** en `components/structures/`
2. **Edita markdown** en `components/texts/`
3. **Agrega imágenes** a `components/images/`
4. **Haz *commit* y *push*** a la rama main

### Acciones automatizadas (GitHub)

El flujo de trabajo (`.github/workflows/build.yml`) automáticamente:

1. **Obtiene Google Sheets** (si está habilitado)
   - Descarga contenido de tu Google Sheet publicado
   - Convierte a formato CSV
   - Guarda en `components/structures/`

2. **Convierte CSVs a JSON**
   - Ejecuta `scripts/csv_to_json.py`
   - Lee CSVs de `components/structures/`
   - Incrusta contenido markdown de `components/texts/`
   - Genera archivos JSON en `_data/` para Jekyll

3. **Genera teselas IIIF**
   - Ejecuta `scripts/generate_iiif.py`
   - Procesa solo los objetos listados en `objects.csv` que no tienen manifiestos IIIF externos
   - Busca imágenes en `components/images/` según el `object_id`
   - Crea pirámides de teselas en `iiif/objects/`
   - Genera archivos de manifiesto

4. **Hace el _build_ del sitio Jekyll**
   - Ejecuta `bundle exec jekyll build`
   - Compila plantillas con datos
   - Salida al directorio `_site/`

5. **Publica en GitHub Pages**
   - Publica directorio `_site/`
   - El sitio queda en vivo en tu URL de GitHub Pages

## Activadores de construcción

El flujo de trabajo se ejecuta automáticamente cuando:

- **Push a rama main**: Cualquier confirmación activa una construcción
- **Cambios a CSV o markdown**: Las actualizaciones de contenido se publican inmediatamente
- **Cambios a config**: Modificaciones a `_config.yml` reconstruyen el sitio

## Activador manual de construcción

A veces necesitas reconstruir sin hacer cambios de código (ej., después de editar Google Sheets).

### Cómo activarlo manualmente

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Selecciona el flujo de trabajo **Build and Deploy**
4. Haz clic en el botón **Run workflow** (arriba a la derecha)
5. Selecciona la rama (usualmente `main`)
6. Haz clic en el botón verde **Run workflow**
7. Espera 2-5 minutos para completar

### Cuándo activarlo manualmente

- Después de editar contenido de Google Sheets
- Después de agregar objetos o pasos de historia en Google Sheets
- Para reconstruir sin cambios de código
- Para forzar una construcción limpia

## Errores comunes de construcción

### Error de análisis CSV

**Error:** `Failed to parse story-1.csv`

**Solución:**

- Verifica el archivo CSV para errores de sintaxis
- Asegura que todas las columnas requeridas estén presentes
- Verifica que no haya caracteres especiales rompiendo el formato CSV

### Error de generación IIIF

**Error:** `Failed to process image textile-001.jpg`

**Solución:**
- Verifica que el archivo de imagen exista en `components/images/`
- Asegúrate de que el objeto esté listado en la pestaña `objects` de tu Google Sheet o en `objects.csv` con la columna `source_url` vacía
- Verifica que la imagen no esté dañada
- Asegúrate de que el formato de imagen sea compatible (JPG, PNG, TIFF)

### Error de construcción de Jekyll

**Error:** `Liquid syntax error`

**Solución:**

- Verifica archivos markdown para sintaxis inválida
- Verifica que el frontmatter esté correctamente formateado
- Busca etiquetas o corchetes sin cerrar

### Error de obtención de Google Sheets

**Error:** `Failed to fetch Google Sheets`

**Solución:**

- Verifica que `published_url` sea correcto en `_config.yml`
- Asegura que la hoja esté publicada en la web (no solo compartida)
- Verifica que la hoja tenga permisos apropiados

## Rendimiento de construcción

Tiempos de construcción típicos:

- **Sitios pequeños** (< 10 objetos, 1-2 historias): 2-3 minutos
- **Sitios medianos** (10-50 objetos, múltiples historias): 3-5 minutos
- **Sitios grandes** (50+ objetos, muchas historias): 5-10 minutos

### Optimiza el tiempo de construcción

- **Usa IIIF externo** para imágenes grandes (evita generar teselas (*tiles*))
- **Confirma menos imágenes** a la vez (divide cargas grandes)
- **Limpia repositorio** periódicamente (elimina archivos sin usar)

## Solución de problemas

### La construcción falla cada vez

1. Verifica confirmaciones recientes para errores
2. Revisa los _logs_ de construcción para mensajes de error específicos
3. Prueba localmente primero (`bundle exec jekyll serve`)
4. Revierte a la última confirmación funcional si es necesario

### La construcción tiene éxito pero el sitio no se actualiza

1. Limpia caché del navegador (recarga forzada: Cmd+Shift+R o Ctrl+Shift+R)
2. Espera 5 minutos para propagación de CDN
3. Verifica configuración de GitHub Pages (Settings → Pages)
4. Verifica que la rama correcta esté establecida para publicación en Pages

### Google Sheets no se actualiza

1. Activa flujo de trabajo manualmente (ver arriba)
2. Verifica ambas URLs compartida y publicada en `_config.yml`
3. Verifica que la hoja esté publicada en la web
4. Revisa los _logs_ de obtención en pestaña Actions

## Próximos pasos

- [Referencia de Desarrollo Local](/guia/desarrolladores/desarrollo-local/)
- [Guía de Configuración](/guia/referencia/configuracion/)
- [Consejos de Solución de Problemas](https://github.com/UCSB-AMPLab/telar/issues)
