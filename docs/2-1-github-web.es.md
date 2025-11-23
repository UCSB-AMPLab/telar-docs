---
layout: default
title: 2.1. Interfaz Web de GitHub
parent: 2. Flujos de Trabajo
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/flujos-de-trabajo/interfaz-web-github/
---

## Flujo de trabajo con la interfaz web de GitHub

**No necesitas instalar nada.** Construye tu narrativa completamente desde la interfaz web de GitHub y Google Sheets.

## Descripción general

Este flujo de trabajo te permite crear exposiciones con Telar sin instalar ningún software. Administrarás el contenido desde la interfaz web de GitHub y Google Sheets, con *builds* automáticos gestionados por GitHub Actions.

{: .note }
> **Opción de inicio rápido**
> Si quieres ir al grano, salta a [Fase 2: prepara tu espacio de trabajo](#fase-2-prepara-tu-espacio-de-trabajo) y luego a [Fase 4: estructura tu historia](#fase-4-estructura-tu-historia).

## Fase 1: planea tu narrativa

Antes de empezar, planea tu historia:

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
   ![Captura de GitHub para el botón Use this template](/telar-docs/images/use-this-template.png)

{: .note }
> Necesitarás una cuenta de GitHub si no tienes una. Regístrate en [github.com](https://github.com/join).

### Duplica la plantilla de Google Sheets

1. Ve a [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Haz clic en **File** → **Make a copy**
3. Guárdala en tu Google Drive con un nombre descriptivo

Con esto ya tienes dónde subir imágenes y organizar contenido.

## Fase 3: reúne materiales

Telar admite dos maneras de agregar imágenes:

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
> Repositorio total: mantén el peso por debajo de 1 GB

![Captura de GitHub para subir archivos](/telar-docs/images/add-files.png)
![Captura de GitHub para hacer commit de archivos](/telar-docs/images/commit-files.png)

### Opción B: usa imágenes IIIF

1. Encuentra recursos IIIF de instituciones ([Guía IIIF para Encontrar Recursos](https://iiif.io/guides/finding_resources/))
2. Copia la URL del manifiesto (ej., `https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json`)
3. Agrégala a la pestaña **objects** con un `object_id` simple (ej., `museum-textile-001`)
   ![Captura de ejemplo de manifiesto IIIF externo](/telar-docs/images/external-iiif-manifest.png)

### Agrega detalles de objetos

Completa la pestaña **objects** de tu hoja de cálculo:
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
7. **Importante**: Mantén nota de tus nombres de archivo y sus ubicaciones. Necesitarás las rutas exactas (ej., `story1/tecnicas-tejido.md`) para incluirlas en tu hoja de cálculo de historia en la Fase 4.

   ![Captura de GitHub para crear una nueva capa](/telar-docs/images/create-new-layer.png)

![Captura de GitHub para editar una capa](/telar-docs/images/edit-layer.png)

{: .tip }
> **Formato de Markdown**
> Los paneles de contenido en Telar se escriben en Markdown e incluyen opciones avanzadas como ajustar el tamaño de las imágenes o incrustar videos. Consulta la [Guía de sintaxis de Markdown](/docs/reference/markdown-syntax/) para ver todas las posibilidades.

{: .tip }
> **Formato de Markdown**
> Los paneles de contenido en Telar se deben escribir utilizando el formato Markdown, que permite incluir encabezados, notas al pie, imágenes, videos y más. Consulta la [Guía de Sintaxis de Markdown](/docs/reference/markdown-syntax/) para una guía completa de cómo funciona.

## Fase 4: estructura tu historia

Conecta todo en tu hoja de Google Sheets:

### Agrega pasos de historia

Para cada paso de tu historia, agrega una fila con:
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
- Deja en blanco para usar los predeterminados (**Learn more** y **Go deeper**)

{: .tip }
> **Cómo omitir filas**
> Agrega un prefijo `#` para ignorar filas o agregar notas:
> - `# TODO: verificar esta fecha`
> - La plantilla incluye una columna `# Instructions` para orientación

## Fase 5: conecta y publica

### Habilita GitHub Pages

1. Ve a **Settings** → **Pages** del repositorio
2. En **Source**, selecciona **GitHub Actions**
3. Haz clic en **Save**
   ![Captura de GitHub para configurar GitHub Actions](/telar-docs/images/github-actions.gif)

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

#### Primero, edita la configuración básica del sitio

3. Edita el nombre del sitio, la descripción y tus datos.
4. Asegúrate de actualizar la URL y el `baseurl` de tu sitio.
   1. `url` debe ser la URL predeterminada de GitHub Pages para tu cuenta (por ejemplo, `https://tugithubusuario.github.io`) o tu dominio personalizado si tienes uno (por ejemplo, `https://misitio.org`).
   2. `baseurl` debe coincidir con el nombre que le diste al repositorio.
   3. La dirección completa del sitio será `url/baseurl`, por ejemplo, `https://tugithubusuario.github.io/mi-sitio-telar`.
   ![Captura de GitHub para editar la configuración del sitio](/telar-docs/images/config_title.gif)

#### Agrega los detalles de tu Google Sheet

1. Desplázate hacia abajo hasta la sección `google_sheets`.
2. Asegúrate de que la integración con Google Sheets esté activada (`enabled: true`; si ves `enabled: false`, cámbialo a `enabled: true`).
3. Pega la URL compartida en `shared_url`.
4. Pega la URL publicada en `published_url`.

#### (Opcional) Elige un tema

9. (Opcional) Elige tu tema:
   ```yaml
   telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin
   ```

#### Haz commit de los cambios

10. Haz clic en el botón verde **Commit changes** para guardar.
   ![Captura de GitHub para editar el tema](/telar-docs/images/config_theme.gif)

### Espera la construcción

1. GitHub Actions construirá automáticamente tu sitio (2-5 minutos).
2. Ve tu sitio en `https://[usuario].github.io/[repositorio]/`.

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

1. Ve a la pestaña **Actions** del repositorio.
2. Haz clic en el workflow **Build and Deploy**.
3. Haz clic en el botón **Run workflow**.
4. Selecciona la rama (usualmente `main`).
5. Haz clic en el botón verde **Run workflow**.
6. Espera 2-5 minutos.

### Itera

1. Agrega capas de contenido adicionales.
2. Agrega términos del glosario.
3. Personaliza tu página de inicio (edita `index.md` en la raíz del repositorio).
4. Pule hasta que tu historia brille.

{: .tip }
> **Personaliza tu página de inicio**
> Edita `index.md` para cambiar el mensaje de bienvenida, los encabezados de sección o quitar el aviso de demostración. Consulta la [Guía de personalización de la página de inicio](/documentacion/6-personalizacion/3-pagina-inicial/) para ver detalles.

## Próximos pasos

- [Conoce la estructura de contenido](/documentacion/3-estructura-de-contenido/)
- [Explora la integración IIIF](/documentacion/4-integracion-iiif/)
- [Personaliza tu tema](/documentacion/6-personalizacion/1-temas/)
