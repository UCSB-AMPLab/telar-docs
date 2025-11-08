---
layout: default
title: 2.1. Interfaz Web de GitHub
parent: 2. Flujos de Trabajo
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /documentacion/2-flujos-de-trabajo/1-interfaz-web/
---

## Flujo de trabajo con la interfaz web de GitHub

**¡No tienes que instalar nada!** Construye tu narrativa completamente a través de la interfaz web de GitHub y Google Sheets.

## Descripción general

Este flujo de trabajo te permite crear exposiciones con Telar sin instalar ningún software. Administrarás el contenido a través de la interfaz web de GitHub y Google Sheets, con *builds* automáticos gestionados por GitHub Actions.

{: .note }
> **Inicio rápido**
> Si quieres ir al grano o ya conoces tu historia, salta a [Fase 2: prepara tu espacio de trabajo](#fase-2-prepara-tu-espacio-de-trabajo) y luego a [Fase 4: estructura tu historia](#fase-4-estructura-tu-historia).

## Fase 1: planea tu historia/recorrido

Antes de empezar, planea tu historia/recorrido:

- Navega el [sitio de ejemplo de Telar](https://ampl.clair.ucsb.edu/telar) para inspirarte
- ¿Qué historia quieres contar?
- ¿Cuáles son los pasos o momentos clave en tu historia?
- Para cada paso, redacta una **pregunta** (encabezado) y **respuesta** (respuesta breve de 1-2 oraciones)
- ¿Qué imagen o imágenes puedes usar para anclar tu historia?
- ¿Qué detalles en estas imágenes son más importantes y cuándo?
- Esboza la estructura de tu historia en papel antes de usar herramientas

## Fase 2: prepara tu espacio de trabajo

### Crea tu repositorio

1. Visita el [repositorio de Telar en GitHub](https://github.com/UCSB-AMPLab/telar)
2. Haz clic en el botón verde **Use this template**
3. Elige un nombre para el repositorio
4. Haz clic en **Create repository**

{: .note }
> Necesitarás una cuenta de GitHub si no tienes una. Regístrate en [github.com](https://github.com/join).

### Duplica la plantilla de Google Sheets

1. Ve a [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Haz clic en **Archivo** → **Hacer una copia** (File → Make a copy)
3. Guárdala en tu Google Drive con un nombre descriptivo

¡Estás listo! Ahora tienes lugares para subir imágenes y organizar contenido.

## Fase 3: reúne materiales

Telar admite dos formas de agregar imágenes:

### Opción A: sube tus propias imágenes

1. Navega a `components/images/objects/` en tu repositorio de GitHub
2. Haz clic en **Add file** → **Upload files**
3. Arrastra imágenes al área de carga
4. Nombra los archivos con IDs de objeto simples (ej., `textile-001.jpg`, `ceramic-002.jpg`)
   - Evita espacios en los nombres de archivo
5. Agrega el ID del objeto (con o sin extensión de archivo) a la pestaña "objects" de tu hoja de cálculo
6. Haz commit de los cambios para guardarlos

{: .warning }
> **Límites de tamaño de archivo**
> Imágenes individuales: hasta 100 MB
> Repositorio total: mantener bajo 1 GB

### Opción B: usa imágenes IIIF

1. Encuentra recursos IIIF de instituciones ([Guía IIIF para Encontrar Recursos](https://iiif.io/guides/finding_resources/))
2. Copia la URL del manifiesto (ej., `https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json`)
3. Agrégala a la pestaña **Objects** con un object_id simple (ej., `museum-textile-001`)

### Agrega detalles de objetos

Completa la pestaña objects de tu hoja de cálculo:
- `object_id`: Identificador simple (coincide con el nombre del archivo para imágenes subidas)
- `title`: Nombre para mostrar
- `description`: Descripción breve
- `creator`, `date`, `medium`, `dimensions`, `location`, `credit`: Campos de metadatos
- `iiif_manifest`: URL para recursos IIIF externos (dejar en blanco para imágenes subidas)

### Crea textos narrativos

Escribe archivos markdown para el contenido de las capas de tu historia:

1. Navega a `components/texts/stories/story1/` en tu repositorio
2. Haz clic en **Add file** → **Create new file**
3. Nombra el archivo (ej., `paso1-capa1.md`, `tecnicas-tejido.md`)
   - Evita espacios (usa guiones o guiones bajos)
   - Usa extensión `.md`
4. Agrega frontmatter y contenido:
   ```markdown
   ---
   title: "Técnicas de Tejido"
   ---

   El patrón de urdimbre entrelazada visible aquí indica...
   ```
5. Confirma el archivo
6. Repite para cada capa de contenido que quieras agregar
7. **Importante**: Mantén nota de tus nombres de archivo y sus ubicaciones. Necesitarás las rutas exactas (ej., `story1/tecnicas-tejido.md`) para incluir en tu hoja de cálculo de historia en la Fase 4

{: .tip }
> **Formato de Markdown**
> Los paneles de contenido en Telar se deben escribir utilizando el formato Markdown, que permite incluir encabezados, notas al pie, imágenes, videos y más. Consulta la [Guía de Sintaxis de Markdown](/docs/reference/markdown-syntax/) para una guía completa de cómo funciona.

## Fase 4: estructura tu historia

Conecta todo en tu hoja de Google Sheets:

### Agrega pasos de historia

Para cada paso en tu historia, agrega una fila con:
- **Question**: El texto del encabezado (ej., "¿Qué es este textil?")
- **Answer**: Una respuesta breve de 1-2 oraciones
- **Object ID**: El objeto a mostrar (coincidiendo con tu hoja objects)
- **Coordinates**: Usa marcadores de posición por ahora (0.5, 0.5, 1.0) - refinarás en la Fase 6

### Conecta tu contenido narrativo

Referencia los archivos markdown que creaste:
- En la columna `layer1_file`: agrega la ruta (ej., `story1/paso1-capa1.md`)
- En la columna `layer2_file`: agrega la ruta si tienes una segunda capa
- Deja en blanco si un paso no necesita un panel

### Personaliza los botones del panel (opcional)

- Agrega texto de botón personalizado en las columnas `layer1_button` y `layer2_button`
- Deja en blanco para usar los predeterminados ("Learn more" y "Go deeper")

{: .tip }
> **Cómo omitir filas**
> Agrega un prefijo `#` para ignorar filas o agregar notas:
> - `# TODO: verificar esta fecha`
> - La plantilla incluye una columna `# Instructions` para orientación

## Fase 5: conecta y publica

### Habilita GitHub Pages

1. Ve a **Settings** → **Pages** del repositorio
2. Source: **GitHub Actions**
3. Haz clic en **Save**

### Comparte tu Google Sheet

1. Haz clic en el botón **Share**
2. Establece en "Anyone with the link (Viewer)"
3. Copia la URL compartida

### Publica tu Google Sheet

1. **File** → **Share** → **Publish to web**
2. Haz clic en **Publish**
3. Copia la URL publicada

### Configura `_config.yml`

1. Navega a `_config.yml` en tu repositorio
2. Haz clic en el ícono de lápiz para editar
3. Encuentra la sección `google_sheets`
4. Establece `enabled: true`
5. Pega la URL compartida en `shared_url`
6. Pega la URL publicada en `published_url`
7. (Opcional) Elige tu tema:
   ```yaml
   telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin
   ```
8. Confirma cambios

### Espera la construcción

1. GitHub Actions construirá automáticamente tu sitio (2-5 minutos)
2. Ve tu sitio en `https://[usuario].github.io/[repositorio]/`

## Fase 6: refina

Pule tu narrativa:

### Revisa tu sitio

1. Navega a través de páginas e historias
2. Revisa mensajes de advertencia en la página de inicio
3. Corrige cualquier problema de configuración en Google Sheets

### Usa la herramienta de identificación de coordenadas

1. Navega a cualquier página de objeto
2. Haz clic en el botón **Identify coordinates** debajo del visor
3. Desplaza y amplía para encontrar la vista perfecta para cada paso de la historia
4. Copia coordenadas (valores X, Y, Zoom)
5. Pega en tu hoja de historia

### Activa la reconstrucción

Después de editar Google Sheets:

1. Ve a la pestaña **Actions** del repositorio
2. Haz clic en el workflow **Build and Deploy**
3. Haz clic en el botón **Run workflow**
4. Selecciona la rama (usualmente `main`)
5. Haz clic en el botón verde **Run workflow**
6. Espera 2-5 minutos

### Itera

1. Agrega capas de contenido adicionales
2. Agrega términos del glosario
3. Pule hasta que tu historia brille

## Próximos pasos

- [Conoce la estructura de contenido](/documentacion/3-estructura-de-contenido/)
- [Explora la integración IIIF](/documentacion/4-integracion-iiif/)
- [Personaliza tu tema](/documentacion/6-personalizacion/1-temas/)
