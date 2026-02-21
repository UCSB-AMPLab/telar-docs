---
layout: docs
title: 2.1. Inicio Rápido
parent: 2. Configura Tu Sitio
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/flujos-de-trabajo/interfaz-web-github/
---

# Flujo de trabajo con la interfaz web de GitHub

**No necesitas instalar nada.** Construye tu exposición de Telar completamente desde el navegador usando GitHub y Google Sheets.

## Descripción general

Esta es la forma más sencilla de crear un sitio con Telar. Todo tu contenido — objetos, historias y textos — se administra desde una hoja de cálculo de Google Sheets. GitHub se encarga de alojar tus imágenes y publicar tu sitio automáticamente.

Vas a necesitar:

- Una [cuenta de GitHub](https://github.com/join) (gratis)
- Una [cuenta de Google](https://accounts.google.com/) para Google Sheets (gratis)

{: .note }

> **Inicio rápido**
> Si quieres ir al grano, salta a [Fase 2: prepara tu espacio de trabajo](#fase-2-prepara-tu-espacio-de-trabajo) y regresa a la Fase 1 después.

## Fase 1: planea tu historia

Antes de empezar, dedica unos minutos a pensar en tu narrativa:

- Navega el [sitio de ejemplo de Telar](https://ampl.clair.ucsb.edu/telar) para inspirarte
- ¿Qué historia quieres contar? ¿Cuáles son los momentos clave?
- Para cada momento, redacta una **pregunta** (encabezado) y una **respuesta** breve (1-2 oraciones)
- ¿Qué imágenes anclan tu historia? ¿Qué detalles importan más?
- Esboza la estructura de tu narrativa en papel — incluso un esquema sencillo ayuda

## Fase 2: prepara tu espacio de trabajo

### Crea tu repositorio

Un repositorio es el espacio de tu proyecto en GitHub — almacena tus imágenes y archivos de configuración.

1. Visita la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar)
2. Haz clic en el botón verde **Use this template**
3. Selecciona **Create a new repository**
4. Escoge un nombre para tu repositorio (será parte de la dirección web de tu sitio)
5. Haz clic en **Create repository**

![Captura de GitHub para el botón Use this template](/images/use-this-template.png)

### Duplica la plantilla de Google Sheets

Tu hoja de cálculo de Google Sheets es donde administras todo el contenido — objetos, historias y textos.

1. Ve a [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Haz clic en **File** → **Make a copy**
3. Guárdala en tu Google Drive con un nombre descriptivo (ej., "Mi exposición Telar")

Ya tienes tus dos espacios de trabajo listos: un repositorio en GitHub para imágenes y publicación, y una hoja de cálculo de Google para el contenido.

## Fase 3: agrega tus imágenes

Telar admite dos formas de incluir imágenes en tu exposición.

### Opción A: sube tus propias imágenes

1. En tu repositorio de GitHub, navega a `components/images/`
2. Haz clic en **Add file** → **Upload files**
3. Arrastra tus imágenes al área de carga
4. Nombra cada archivo de forma sencilla, sin espacios (ej., `textile-001.jpg`, `ceramic-002.jpg`)
5. Haz clic en **Commit changes** para guardar

El nombre del archivo (sin la extensión) se convierte en el `object_id` de la imagen — lo usarás para referenciarla en tu hoja de cálculo.

{: .warning }

> **Límites de tamaño**
> Imágenes individuales: hasta 100 MB. Repositorio total: procura mantenerlo por debajo de 1 GB.

![Captura de GitHub para subir archivos](/images/add-files.png)
![Captura de GitHub para hacer commit de archivos](/images/commit-files.png)

### Opción B: usa imágenes IIIF de museos y bibliotecas

Muchas instituciones ofrecen imágenes de alta resolución a través del estándar IIIF (se pronuncia "triple-i-efe"). Puedes usar estas imágenes directamente en Telar sin descargar nada.

1. Encuentra recursos IIIF de instituciones como la Biblioteca del Congreso, la British Library o el Smithsonian ([Guía IIIF para encontrar recursos](https://iiif.io/guides/finding_resources/))
2. Copia la URL del manifiesto (ej., `https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json`)
3. En la pestaña "objects" de tu hoja de cálculo, agrega una fila con un `object_id` sencillo y pega la URL del manifiesto en la columna `source_url`

![Agregar un manifiesto IIIF externo](/images/external-iiif-manifest.png)

## Fase 4: construye tu historia en Google Sheets

Todo tu contenido se administra desde la hoja de cálculo, que tiene tres tipos de pestañas:

- **project** — la configuración de tu sitio y la lista de tus historias
- **objects** — las imágenes usadas en tu exposición
- **story-1**, **story-2**, etc. — los pasos y contenido de cada historia

### Completa la pestaña objects

Agrega una fila por cada imagen en tu exposición:

- `object_id` — un identificador sencillo (coincide con el nombre del archivo para imágenes subidas, o cualquier nombre que escojas para imágenes IIIF)
- `title` — el nombre para mostrar
- `description` — una descripción breve
- `source_url` — la URL del manifiesto IIIF (deja en blanco para imágenes subidas)
- `creator`, `date`, `medium`, `dimensions` — campos de metadatos (todos opcionales)

{: .tip }

> **Cómo omitir filas y columnas**
> Agrega un `#` al inicio de cualquier fila o encabezado de columna para que Telar lo ignore. Esto es útil para notas, instrucciones y pendientes (ej., `# TODO: verificar esta fecha`).

### Estructura tu historia

En cada pestaña de historia (ej., `story-1`), agrega una fila por cada paso de tu narrativa:

| Columna | Qué hace |
|---------|----------|
| `step` | Número del paso (1, 2, 3...) |
| `object` | Qué imagen mostrar (el `object_id` de la pestaña objects) |
| `x`, `y`, `zoom` | Dónde enfocar en la imagen — usa `0.5, 0.5, 1.0` como punto de partida |
| `question` | El encabezado de este paso (ej., "¿Qué es este textil?") |
| `answer` | Una respuesta breve de 1-2 oraciones |

Esto es suficiente para crear una historia funcional. Cada paso muestra una imagen con una pregunta y respuesta que guían a quien la ve a través de tu narrativa.

### Agrega paneles de detalle

Para los pasos donde quieras compartir más que una respuesta breve, agrega contenido en las columnas de paneles. Escribe tu texto directamente en la celda de la hoja de cálculo:

| Columna | Qué hace |
|---------|----------|
| `layer1_content` | Panel "Learn more" — más detalle sobre este paso |
| `layer2_content` | Panel "Go deeper" — aún más profundidad |
| `layer1_button` | Texto personalizado del botón (deja en blanco para "Learn more") |
| `layer2_button` | Texto personalizado del botón (deja en blanco para "Go deeper") |

Escribe tu texto directamente en la celda. Puedes usar formato básico de Markdown: `**negrita**`, `*cursiva*` y encabezados con `##`.

{: .tip }

> **Mantenlo sencillo**
> Para la mayoría de las historias, las columnas de pregunta y respuesta más una capa de paneles de detalle es suficiente. Siempre puedes agregar más profundidad después.

### Registra tus historias

En la pestaña **project**, lista cada historia con su número y título. La plantilla muestra el formato — agrega una fila debajo del marcador `STORIES` por cada pestaña de historia que hayas creado.

### Haz una historia privada (opcional)

{: .beta }

> **Nuevo en v0.8.0**

Las historias privadas son útiles en el aula — borradores, trabajos en progreso o proyectos estudiantiles que aún no están listos para compartir. Las personas visitantes verán la historia en la página principal, pero necesitarán una clave para verla.

Para hacer una historia privada:

1. En la pestaña **project**, pon `yes` en la columna `private` de la historia que quieras restringir
2. En el archivo `_config.yml` de tu repositorio, establece un `story_key` — esta es la contraseña que necesitarán para acceder

Cualquier persona con la clave puede ver la historia. Puedes compartir la clave con tu clase, o compartir un enlace directo que la incluya para que no tengan que escribirla.

## Fase 5: conecta y publica

### Habilita GitHub Pages

GitHub Pages convierte tu repositorio en un sitio web en vivo de forma gratuita.

1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Haz clic en **Save**

![Configurar GitHub Pages con GitHub Actions](/images/github-actions.gif)

### Comparte y publica tu Google Sheet

Tu hoja de cálculo necesita dos tipos de acceso para que Telar pueda leerla:

**Comparte tu hoja:**

1. Haz clic en el botón **Share** en Google Sheets
2. Establece el acceso a "Anyone with the link" con permisos de **Viewer**
3. Copia la URL compartida

**Publica tu hoja:**

1. Ve a **File** → **Share** → **Publish to web**
2. Haz clic en **Publish**
3. Copia la URL publicada

### Configura tu sitio

Edita el archivo `_config.yml` en tu repositorio para conectar todo:

1. Navega a `_config.yml` y haz clic en el ícono de lápiz para editar

2. **Configuración del sitio** — completa el nombre, descripción y tus datos:

   ```yaml
   title: "Mi exposición"
   description: "Una narrativa visual sobre..."
   author:
     name: "Tu Nombre"
   ```

3. **Dirección web** — establece la URL de tu sitio:

   ```yaml
   url: "https://tugithubusuario.github.io"
   baseurl: "/nombre-de-tu-repositorio"
   ```

   Tu sitio estará disponible en `https://tugithubusuario.github.io/nombre-de-tu-repositorio`.

4. **Google Sheets** — pega las URLs que copiaste:

   ```yaml
   google_sheets:
     enabled: true
     shared_url: "https://docs.google.com/..."
     published_url: "https://docs.google.com/..."
   ```

5. **Tema** (opcional) — escoge un tema visual:

   ```yaml
   telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin
   ```

6. **Clave de historias privadas** (solo si tienes historias privadas):

   ```yaml
   story_key: "tu-clave-secreta"
   ```

7. Haz clic en **Commit changes** para guardar

![Editar configuración: título y URL](/images/config_title.gif)
![Editar configuración: Google Sheets y tema](/images/config_theme.gif)

### Espera a que se construya tu sitio

Después de hacer *commit*, GitHub Actions construirá y publicará tu sitio automáticamente. Esto toma de 2 a 5 minutos.

1. Haz clic en la pestaña **Actions** para ver el progreso del *build*
2. Cuando termine, visita tu sitio en la URL que configuraste

## Fase 6: refina

### Revisa tu sitio

Navega tu exposición y verifica:

- Mensajes de advertencia en la página de inicio (señalan problemas de configuración)
- Que las imágenes correctas aparezcan en cada paso de la historia
- Que el texto se muestre como esperas

### Ajusta las coordenadas de imagen

Las coordenadas iniciales (`0.5, 0.5, 1.0`) muestran el centro de cada imagen. Para enfocar detalles específicos:

1. Navega a cualquier página de objeto en tu sitio
2. Haz clic en **Identify coordinates** debajo del visor de imágenes
3. Desplaza y amplía para encontrar la vista perfecta de cada paso
4. Copia los valores de X, Y y Zoom
5. Pégalos en tu hoja de cálculo

### Activa una reconstrucción

Después de editar tu Google Sheet, necesitas indicarle a GitHub que reconstruya tu sitio:

1. Ve a la pestaña **Actions** de tu repositorio
2. Haz clic en el *workflow* **Build and Deploy**
3. Haz clic en **Run workflow** → selecciona `main` → haz clic en el botón verde **Run workflow**
4. Espera de 2 a 5 minutos para la nueva versión

### Sigue construyendo

Una vez que tengas lo básico, puedes:

- Agregar más historias (crea nuevas pestañas de historia en tu hoja de cálculo)
- Agregar un glosario de términos (usa la pestaña de glosario en tu hoja de cálculo)
- Personalizar tu página de inicio (edita `index.md` en tu repositorio)
- Explorar y buscar en tu colección de objetos (habilitado por defecto en v0.8.0)

## Ir más allá: archivos Markdown

Para pasos que necesiten contenido más complejo en los paneles — como videos incrustados, carruseles de imágenes, secciones con pestañas o narrativas muy extensas — puedes vincular archivos Markdown guardados en tu repositorio en lugar de escribir directamente en la hoja de cálculo. Consulta el [Flujo de trabajo híbrido](/guia/flujos-de-trabajo/hibrido/) para una guía completa.

## Próximos pasos

- [Estructura de contenido](/guia/estructura-de-contenido/) — cómo Telar organiza tus materiales
- [Integración IIIF](/guia/integracion-iiif/) — trabajar con imágenes de alta resolución
- [Temas](/guia/personalizacion/temas/) — personalizar la apariencia de tu sitio
