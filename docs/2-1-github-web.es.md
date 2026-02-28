---
layout: docs
title: 2.1. Inicio rápido
parent: 2. Configura tu sitio
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/flujos-de-trabajo/interfaz-web-github/
---

# Inicio rápido

Construye una exposición completa de Telar desde tu navegador usando GitHub y Google Sheets. No necesitas instalar nada.

{: .tip }
> **Sin experiencia con GitHub y YAML?** Prueba el [Inicio rápido guiado](/guia/flujos-de-trabajo/inicio-rapido-guiado/) — te lleva paso a paso por la configuración y genera tu archivo de configuración automáticamente.

Vas a necesitar:
- Una [cuenta de GitHub](https://github.com/join) (gratis)
- Una [cuenta de Google](https://accounts.google.com/) para Google Sheets (gratis)

---

## Parte 1: Configura la parte técnica

Esta parte puede parecer intimidante, pero solo tienes que hacerla una vez. Una vez que todo esté configurado, no tendrás que volver aquí — todo lo demás es trabajo creativo en tu hoja de cálculo.

### Crea tu repositorio

Un repositorio es el espacio de tu proyecto en GitHub — almacena tus imágenes y archivos de configuración.

1. Visita la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar)
2. Haz clic en el botón verde **Use this template**
3. Selecciona **Create a new repository**
4. Escoge un nombre para tu repositorio — **usa solo letras minúsculas y evita espacios (los guiones están bien)** — será parte de la dirección web de tu sitio
5. Haz clic en **Create repository**

![Captura de pantalla de GitHub: botón Use this template](/images/use-this-template.png)

### Habilita GitHub Pages

GitHub Pages convierte tu repositorio en un sitio web en vivo de forma gratuita.

1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Haz clic en **Save**

![Configuración de GitHub Pages con GitHub Actions](/images/github-actions.gif)

### Duplica la plantilla de Google Sheets

Tu hoja de cálculo de Google Sheets es donde administras todo el contenido — objetos, historias y textos.

1. Ve a [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Haz clic en **File** → **Make a copy**
3. Guárdala en tu Google Drive con un nombre descriptivo (ej., "Mi exposición Telar")

### Comparte y publica tu hoja

Tu hoja de cálculo necesita dos tipos de acceso para que Telar pueda leerla durante la compilación.

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

2. **Configuración del sitio** — completa el nombre y la descripción de tu sitio:

   ```yaml
   title: "Mi exposición"
   description: "Una narrativa visual sobre..."
   author: Tu Nombre
   ```

3. **Dirección web** — establece la URL de tu sitio:

   ```yaml
   url: "https://tuusuariogithub.github.io"
   baseurl: "/nombre-de-tu-repositorio"
   ```

   Tu sitio estará disponible en `https://tuusuariogithub.github.io/nombre-de-tu-repositorio`.

   {: .warning }
   > Es muy importante que tu baseurl coincida exactamente con el nombre de tu repositorio. Baseurl debe estar completamente en minúsculas, así que si le pusiste mayúsculas al nombre de tu repositorio, ve y cámbialo ahora.

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

6. Haz clic en **Commit changes** para guardar

![Editando config: título y URL](/images/config_title.gif)
![Editando config: tema](/images/config_theme.gif)

### Verifica tu configuración

Después de hacer *commit*, GitHub Actions construirá y publicará tu sitio automáticamente. Esto toma de 2 a 5 minutos.

1. Haz clic en la pestaña **Actions** para ver el progreso de la *build*
2. Cuando termine, visita tu sitio en la URL que configuraste
3. Deberías ver un sitio vacío de Telar con tu título y tema

![Página de inicio de Telar con título y menú de navegación](/images/telar-homepage.png)

{: .warning }
> Si la compilación falla o tu sitio no se ve bien, revisa tu `_config.yml` con cuidado. Errores comunes:
> - **Comillas sin cerrar** — cada `"` necesita su par
> - **Falta espacio después de los dos puntos** — escribe `title: "Mi sitio"`, no `title:"Mi sitio"`
> - **Indentación incorrecta** — las opciones anidadas como `shared_url` deben indentarse con espacios, no tabulaciones
> - **baseurl no coincide** — debe coincidir exactamente con el nombre de tu repositorio, todo en minúsculas
> - **Solo una URL de Google Sheets** — necesitas tanto la URL compartida como la URL publicada; son diferentes
>
> Consulta la [Referencia de configuración](/guia/referencia/configuracion/) para la lista completa de opciones. También puedes pegar tu `_config.yml` en el [Validador de Configuración de Telar](/guia/referencia/validador-de-configuracion/) para buscar errores, o usar el [Generador de Configuración](/guia/referencia/generador-de-configuracion/) para crear uno desde cero.

---

## Parte 2: Agrega tu contenido

La configuración está lista. De aquí en adelante, todo sucede en tu hoja de cálculo de Google Sheets.

### Agrega tus imágenes

Telar admite dos formas de incluir imágenes:

**Opción A: Sube tus propias imágenes**

1. En tu repositorio de GitHub, navega a `components/images/`
2. Haz clic en **Add file** → **Upload files**
3. Arrastra tus imágenes al área de carga
4. Nombra cada archivo de forma sencilla, sin espacios (ej., `textile-001.jpg`, `map-lima.jpg`)
5. Haz clic en **Commit changes** para guardar

El nombre del archivo (sin la extensión) se convierte en el `object_id` de la imagen — lo usarás en tu hoja de cálculo.

![Subiendo archivos en GitHub](/images/add-files.png)
![Confirmando los archivos subidos](/images/commit-files.png)

{: .warning }
> **Límites de tamaño**
> Imágenes individuales: hasta 100 MB. Repositorio total: procura mantenerlo por debajo de 1 GB.

**Opción B: Usa imágenes IIIF de museos y bibliotecas**

Muchas instituciones ofrecen imágenes de alta resolución a través del estándar IIIF. Puedes usarlas directamente sin descargar nada.

1. Encuentra recursos IIIF de instituciones como la Biblioteca del Congreso, la British Library o el Smithsonian ([Guía IIIF para encontrar recursos](https://iiif.io/guides/finding_resources/))
2. Copia la URL del manifiesto (ej., `https://example.org/iiif/manifest.json`)
3. En la pestaña de objetos de tu hoja de cálculo, agrega una fila y pega la URL en la columna `source_url`

![Encontrando una URL de manifiesto IIIF](/images/external-iiif-manifest.png)

### Completa la pestaña de objetos

En tu Google Sheet, ve a la pestaña **objects** y agrega una fila por cada imagen:

- **`object_id`** — un identificador sencillo (coincide con el nombre del archivo para imágenes subidas, o cualquier nombre para imágenes IIIF)
- **`title`** — el nombre visible
- **`description`** — una descripción breve (opcional, pero ayuda con la búsqueda)
- **`source_url`** — la URL del manifiesto IIIF (deja en blanco para imágenes subidas)
- **`creator`**, **`year`**, **`object_type`**, **`subjects`** — metadatos para el filtrado de la galería (todos opcionales)

{: .tip }
> **Omitir filas y columnas**
> Agrega un `#` al inicio de cualquier fila o encabezado de columna para que Telar lo ignore. Útil para notas y pendientes.

### Estructura tu historia

En cada pestaña de historia (ej., **story-1**), agrega una fila por cada paso de tu narrativa:

| Columna | Qué hace |
|---------|----------|
| `step` | Número del paso (1, 2, 3...) |
| `object` | Qué imagen mostrar (el `object_id` de la pestaña de objetos) |
| `x`, `y`, `zoom` | Dónde enfocar en la imagen — usa `0.5, 0.5, 1.0` como punto de partida |
| `question` | El encabezado de este paso (ej., "¿Qué es este textil?") |
| `answer` | Una respuesta breve de 1-2 oraciones |

Esto es suficiente para crear una historia funcional. Cada paso muestra una imagen con una pregunta y respuesta que guían a quien la ve a través de tu narrativa.

### Agrega paneles de detalle

Para los pasos donde quieras compartir más que una respuesta breve, agrega contenido en las columnas de paneles:

| Columna | Qué hace |
|---------|----------|
| `layer1_content` | Panel "Saber más" — más detalle sobre este paso |
| `layer2_content` | Panel "Profundizar más" — aún más profundidad |
| `layer1_button` | Texto personalizado del botón (deja en blanco para "Saber más") |
| `layer2_button` | Texto personalizado del botón (deja en blanco para "Profundizar más") |

Escribe tu texto directamente en la celda. Puedes usar formato básico de markdown: `**negrita**`, `*cursiva*` y encabezados con `##`.

{: .tip }
> **Mantenlo sencillo**
> Para la mayoría de las historias, las columnas de pregunta y respuesta más una capa de paneles de detalle es suficiente. Siempre puedes agregar más profundidad después.

### Registra tus historias

En la pestaña **project**, lista cada historia con su título y subtítulo. La plantilla muestra el formato — agrega una fila por cada pestaña de historia que hayas creado.

### Activa una reconstrucción

Después de editar tu Google Sheet, indica a GitHub que reconstruya tu sitio:

1. Ve a la pestaña **Actions** de tu repositorio
2. Haz clic en el *workflow* **Build and Deploy**
3. Haz clic en **Run workflow** → selecciona `main` → haz clic en el botón verde **Run workflow**
4. Espera de 2 a 5 minutos para la nueva versión

---

## Parte 3: Refina

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
6. Activa una reconstrucción para ver los cambios

![Selector de coordenadas mostrando valores X, Y y Zoom debajo del visor de imágenes](/images/coordinate-picker.png)

### Haz historias privadas (opcional)

Si quieres restringir el acceso a una historia — para uso en el aula, borradores o trabajos en progreso:

1. En la pestaña **project**, establece la columna `protected` en `yes` para esa historia
2. En el archivo `_config.yml` de tu repositorio, agrega un `story_key`:

   ```yaml
   story_key: "tu-clave-secreta"
   ```

3. Comparte la clave con tus lectores, o envíales un enlace con `?key=tu-clave-secreta` al final

Consulta [Historias Privadas](/guia/estructura-de-contenido/historias-privadas/) para más detalles.

### Sigue construyendo

Una vez que tengas lo básico, puedes:

- Agregar más historias (crea nuevas pestañas de historia en tu hoja de cálculo)
- Agregar un glosario de términos (usa la pestaña de glosario en tu hoja de cálculo)
- Personalizar tu página de inicio (edita `index.md` en tu repositorio)
- Explorar y buscar en tu colección de objetos (habilitado por defecto)

Cuando tus paneles necesiten más que unos pocos párrafos — widgets, formato enriquecido o contenido reutilizable — consulta [Ir más allá](/guia/flujos-de-trabajo/hibrido/) para aprender a agregar archivos markdown.

## Próximos pasos

- [Ir más allá](/guia/flujos-de-trabajo/hibrido/) — Enriquece paneles con archivos markdown y widgets
- [Estructura de Contenido](/guia/estructura-de-contenido/) — Cómo Telar organiza tus materiales
- [Temas](/guia/personalizacion/temas/) — Personaliza la apariencia de tu sitio
- [IIIF e Imágenes](/guia/integracion-iiif/) — Trabaja con imágenes de alta resolución
