---
layout: docs
title: 2.2. Desarrollo Local
parent: 2. Flujos de Trabajo
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/flujos-de-trabajo/desarrollo-local/
---

## Flujo de trabajo de desarrollo local

Previsualiza cambios localmente antes de publicar. Control total sobre el proceso de construcción.

## Descripción general

Este flujo de trabajo es mejor para desarrolladores y usuarios que quieren previsualizar cambios localmente antes de publicar. Trabajarás con archivos directamente en tu computadora y ejecutarás Jekyll localmente.

## Requisitos previos

- Ruby 3.0+ (para Jekyll)
- Bundler
- Python 3.9+ (para generación IIIF)

## Instalación

### Instala Ruby y Bundler

**macOS (usando Homebrew):**
```bash
brew install ruby
gem install bundler
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ruby-full build-essential
gem install bundler
```

### Clona y configura

```bash
# Clona el repositorio
git clone https://github.com/UCSB-AMPLab/telar.git
cd telar

# Instala dependencias de Ruby
bundle install

# Instala dependencias de Python (para generación IIIF)
pip install -r requirements.txt
```

### Configura ajustes del sitio

Edita `_config.yml`:
```yaml
title: Título de tu Narrativa
description: Una breve descripción
baseurl: "/nombre-de-tu-repositorio"  # Para GitHub Pages, o "" para dominio raíz
url: "https://tu-usuario.github.io"
author: Tu Nombre
email: tu-email@ejemplo.com
```

## Comandos principales

A lo largo de tu flujo de trabajo, usarás estos comandos:

```bash
# Convierte CSVs a JSON (ejecuta después de editar CSVs)
python3 scripts/csv_to_json.py

# Genera teselas IIIF (ejecuta después de agregar/actualizar imágenes)
python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000

# Sirve con recarga automática
bundle exec jekyll serve --livereload

# Ver en http://localhost:4000
```

## Flujo de trabajo paso a paso

### Paso 1: reúne tus imágenes

Elige una de dos opciones:

**Opción A: sube tus propias imágenes**

1. Agrega imágenes de alta resolución al directorio `components/images/objects/`
2. Nombra archivos para que coincidan con IDs de objeto (ej., `textile-001.jpg`)
3. Genera teselas IIIF:
   ```bash
   python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000
   ```

**Opción B: usa manifiestos IIIF externos**

1. Encuentra recursos IIIF ([Guía IIIF](https://iiif.io/guides/finding_resources/))
2. Copia la URL info.json
3. Crea un object_id (ej., `museum-textile-001`)
4. Guarda para el siguiente paso

### Paso 2: escribe tu texto narrativo

Crea archivos markdown para las capas de tu historia:

1. Crea directorio para tu historia:
   ```bash
   mkdir -p components/texts/stories/story1
   ```

2. Crea archivos markdown (ej., `paso1-capa1.md`, `paso1-capa2.md`)

3. Agrega frontmatter y contenido:
   ```markdown
   ---
   title: "Técnicas de Tejido"
   ---

   El patrón de urdimbre entrelazada visible aquí indica...
   ```

### Paso 3: cataloga tus objetos

Agrega metadatos al catálogo de objetos:

1. Edita `components/structures/objects.csv`
2. Agrega una fila para cada objeto:

**Para imágenes subidas:**
```csv
textile-001,Fragmento de Textil Colonial,"Un textil tejido de...",Artista Desconocido,circa 1650-1700,Lana,45 x 60 cm,,,
```

**Para IIIF externo:**
```csv
museum-textile-001,Fragmento de Textil Colonial,"Un textil tejido de...",Artista Desconocido,circa 1650-1700,Lana,45 x 60 cm,,https://example.org/iiif/image/abc123/info.json,
```

3. Convierte a JSON:
   ```bash
   python3 scripts/csv_to_json.py
   ```

### Paso 4: previsualiza tus objetos

Construye y ve tu sitio:

```bash
bundle exec jekyll serve --livereload
```

Luego:
1. Visita `http://localhost:4000`
2. Haz clic en "Objects" en la navegación
3. Verifica que todas las imágenes aparezcan con sus metadatos

### Paso 5: encuentra coordenadas para momentos de historia

Usa la herramienta de identificación de coordenadas:

1. Navega a una página de objeto: `http://localhost:4000/objects/{object_id}`
2. Haz clic en el botón **Identify coordinates**
3. Desplaza y amplía al área que quieres destacar
4. Haz clic en **Copy entire row** para plantilla CSV con coordenadas

### Paso 6: construye tu historia

Conecta tu narrativa a tus objetos:

1. Crea archivo CSV en `components/structures/` (ej., `story-1.csv`)

2. Agrega fila de encabezado:
   ```csv
   step,question,answer,object,x,y,zoom,layer1_button,layer1_file,layer2_button,layer2_file
   ```

3. Agrega pasos de historia:
   ```csv
   1,"¿Qué es este textil?","Este fragmento muestra...","textile-001",0.5,0.5,1.0,"","story1/paso1-capa1.md","",""
   2,"Nota el patrón","Los motivos geométricos...","textile-001",0.3,0.4,2.5,"","story1/paso2-capa1.md","",""
   ```

4. Agrega a configuración del proyecto:
   - Edita `components/structures/project.csv`
   - Desplázate a la sección `STORIES`
   - Agrega fila: `1,Título de tu Historia`

5. Convierte a JSON:
   ```bash
   python3 scripts/csv_to_json.py
   ```

6. Reconstruye y prueba:
   ```bash
   bundle exec jekyll serve
   ```

### Paso 7: agrega términos del glosario (opcional)

Mejora tu narrativa con definiciones de términos:

1. Crea archivo markdown en `components/texts/glossary/` (ej., `periodo-colonial.md`)

2. Agrega frontmatter y definición:
   ```markdown
   ---
   term_id: periodo-colonial
   title: "Período Colonial"
   related_terms: encomienda,virreinato
   ---

   El Período Colonial en las Américas comenzó con...
   ```

3. Genera colección:
   ```bash
   python3 scripts/generate_collections.py
   ```

4. Construye y prueba:
   ```bash
   bundle exec jekyll serve
   ```

## Flujo de trabajo de desarrollo diario

Cuando trabajes en tu sitio:

```bash
# 1. Edita contenido
# - CSVs en components/structures/
# - Markdown en components/texts/
# - Imágenes en components/images/objects/

# 2. Convierte CSVs a JSON (después de editar CSVs)
python3 scripts/csv_to_json.py

# 3. Genera teselas IIIF (después de agregar/actualizar imágenes)
python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000

# 4. Sirve con recarga automática
bundle exec jekyll serve --livereload

# Comandos adicionales:
# Construir solamente (salida a _site/)
bundle exec jekyll build

# Limpiar artefactos de construcción
bundle exec jekyll clean
```

## Publicación en GitHub Pages

Una vez que estés satisfecho con tu sitio local:

1. Confirma y empuja cambios a GitHub:
   ```bash
   git add .
   git commit -m "Actualizar contenido"
   git push origin main
   ```

2. GitHub Actions construirá y publicará automáticamente

3. Ve tu sitio en vivo en `https://[usuario].github.io/[repositorio]/`

## Próximos pasos

- [Conoce la estructura de contenido](/documentacion/3-estructura-de-contenido/)
- [Aprende sobre la integración IIIF](/documentacion/4-integracion-iiif/)
- [Personaliza tu tema](/documentacion/6-personalizacion/1-temas/)
