---
layout: docs
title: "4.4. Historias y paneles"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/tu-contenido/historias-paneles/
---

# Historias y paneles

Las historias son narrativas desplazables construidas alrededor de tus objetos. Cada historia guía al público a través de una secuencia de pasos — enfocando regiones específicas de imágenes, momentos en videos o segmentos de grabaciones de audio — con pares de pregunta-respuesta y paneles de detalle expandibles.

{: .tip }
> El [editor de historias del Compositor](/guia/el-compositor/editor-historias/) ofrece una alternativa visual a editar las hojas de cálculo directamente. Permite construir y reordenar pasos, configurar coordenadas y previsualizar la historia sin salir del navegador.

## Cómo funciona la experiencia de desplazamiento

Una historia llena la ventana del navegador con un **diseño de tarjetas apiladas**. El objeto — ya sea una imagen en el visor IIIF, un reproductor de video o un reproductor de audio — ocupa todo el fondo. Las tarjetas de texto se superponen encima y, al desplazarse, cada tarjeta nueva se desliza sobre la anterior.

El desplazamiento es **continuo con puntos de anclaje magnético**. En lugar de avanzar discretamente de paso en paso, el desplazamiento es natural. La vista se ancla magnéticamente a cada paso, asegurando que la tarjeta de texto y la posición del objeto se mantengan sincronizadas.

En dispositivos móviles, las tarjetas de texto se anclan en la parte inferior de la pantalla con un efecto de vidrio esmerilado, superponiéndose sobre la parte inferior del visor.

![Visor de historia con diseño de tarjetas apiladas y tarjeta de texto sobre el visor IIIF](/images/story-viewer.png)

Cada paso:

1. Enfoca el visor en una región específica de un objeto (usando coordenadas x, y y zoom para imágenes, o tiempos de *clip* para video y audio)
2. Muestra una **pregunta** y una breve **respuesta** en la tarjeta de texto
3. Opcionalmente ofrece hasta tres capas adicionales de detalle mediante botones expandibles

## Registrar historias

Antes de construir los pasos de una historia, regístrala en `project.csv`:

```csv
order,story_id,title,subtitle,byline
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido de las Américas,por Dra. María García
```

El `story_id` determina el nombre del archivo CSV de la historia y su URL. Con `story_id: textiles-coloniales`, Telar busca `telar-content/spreadsheets/textiles-coloniales.csv` y sirve la historia en `/stories/textiles-coloniales/`.

Si se omite `story_id`, Telar usa `story-{order}` (ej., `story-1.csv` para order 1).

Consulta la [Referencia CSV: Proyecto](/guia/tus-datos/csv-proyecto/#project-csv-projectcsv--proyectocsv) para todas las columnas de project.csv.

## Construir los pasos de la historia

Cada historia tiene su propio archivo CSV en `telar-content/spreadsheets/`. El archivo define los pasos en secuencia:

```csv
step,object,x,y,zoom,question,answer,layer1_content
1,textile-001,0.5,0.3,0.8,¿Qué es este textil?,Un fragmento colonial con patrones complejos de tejido,Este fragmento data de mediados del siglo XVII...
2,textile-001,0.2,0.7,0.4,¿Qué significa este patrón?,Un diseño de urdimbre entrelazada usado en telas ceremoniales,El patrón ha sido identificado como...
3,map-lima,0.5,0.5,1.0,¿Dónde se encontraron estos textiles?,En el centro histórico de Lima,Las excavaciones arqueológicas de los años 1990...
```

### Campos requeridos

Cada paso necesita:

- **`step`** — Número secuencial (1, 2, 3...) sin saltos
- **`object`** — Un `object_id` de la hoja de cálculo de objetos. Dejar vacío para crear una [tarjeta de título](#tarjetas-de-título)
- **`x`**, **`y`**, **`zoom`** — Coordenadas del visor (ver abajo). Se ignoran en tarjetas de título
- **`question`** — El encabezado que se muestra en la tarjeta de texto
- **`answer`** — Una respuesta breve debajo de la pregunta

### Coordenadas

Las coordenadas indican al visor dónde enfocar en cada paso. Todos los valores están normalizados de 0 a 1:

- **x** — Posición horizontal. 0 = borde izquierdo, 0.5 = centro, 1 = borde derecho
- **y** — Posición vertical. 0 = borde superior, 0.5 = centro, 1 = borde inferior
- **zoom** — Nivel de zoom. 0 = alejado (imagen completa visible), 1 = zoom máximo

Para encontrar coordenadas, usa el **selector de coordenadas** en cualquier página de objeto: amplía y desplázate hasta la región que deseas, luego haz clic en los botones **Copy** para copiar los valores x, y y zoom directamente a tu hoja de cálculo.

![Selector de coordenadas mostrando valores X, Y y Zoom debajo del visor de imágenes](/images/coordinate-picker.png)

## Tarjetas de título

Las tarjetas de título son pasos de solo texto, sin objeto asociado. Funcionan bien como encabezados de capítulo, separadores de sección o transiciones temáticas dentro de una historia.

Para crear una tarjeta de título, deja vacía la columna `objeto`. Las columnas `x`, `y` y `zoom` se ignoran. El campo `pregunta` se convierte en el encabezado de la tarjeta y `respuesta` en el subtítulo.

```csv
paso,objeto,x,y,zoom,pregunta,respuesta
1,textile-001,0.5,0.3,0.8,¿Qué es este textil?,Un fragmento colonial con patrones complejos de tejido.
2,,,,,Capítulo 2: Rutas comerciales,El movimiento de textiles a través de las Américas.
3,map-lima,0.5,0.5,1.0,¿Dónde se encontraron?,En el centro histórico de Lima.
```

Las tarjetas de título participan plenamente en la navegación — el desplazamiento, el teclado y los [enlaces profundos](#compartir-y-enlaces-profundos) funcionan como se espera. También pueden tener capas de paneles, igual que cualquier otro paso.

## Capas de los paneles

Cada paso puede tener hasta tres capas de detalle, siguiendo el patrón QAI (pregunta, respuesta, invitación). La pregunta y la respuesta aparecen en la tarjeta de texto. Las capas se expanden desde la tarjeta cuando se hace clic en los botones de invitación:

| Capa | Texto predeterminado del botón | Propósito |
|------|-------------------------------|-----------|
| Capa 1 | "Saber más" | Detalle principal |
| Capa 2 | "Profundizar más" | Análisis extendido |
| Capa 3 | (predeterminado) | Nivel más profundo |

Para cada capa se pueden personalizar dos cosas:

- **Texto del botón** (`layer1_button`) — Dejar vacío para el texto predeterminado, o proporcionar texto personalizado como "Ver la técnica" o "Leer la fuente"
- **Contenido** (`layer1_content`) — El contenido del panel en sí

Si una capa no tiene contenido, su botón se oculta automáticamente.

## Escribir contenido para los paneles

El contenido de los paneles se puede proporcionar de tres maneras. La elección depende de la complejidad:

### Método 1: introducir texto directamente

Escribe el texto directamente en la celda de la hoja de cálculo. Ideal para paneles cortos (1–2 párrafos).

```csv
layer1_content
"Este fragmento muestra **técnicas avanzadas de tejido** del periodo colonial."
```

Se puede usar formato básico: `**negrita**`, `*cursiva*`, `[texto del enlace](url)` y enlaces de glosario (`[[term-id]]`).

Para saltos de línea dentro de una celda:
- **Google Sheets**: Presiona `Ctrl+Enter` (Windows/Linux) u `Option+Enter` (macOS)
- **Archivos CSV**: Usa saltos de línea reales dentro de texto entre comillas
- **Alternativa**: Usa etiquetas HTML `<br>`

### Método 2: pegar texto markdown

Pega texto escrito en un editor de texto plano. Esto admite la gama completa de características markdown, incluyendo encabezados, *widgets* (acordeón, carrusel, pestañas), controles de tamaño de imagen y un título de panel personalizado usando *frontmatter* YAML.

{: .warning }
> Si se copia y pega desde Microsoft Word, Google Docs o aplicaciones similares, el formato **no** se preservará. Escribe con sintaxis markdown en su lugar — consulta la [Guía de sintaxis markdown](/guia/tu-contenido/sintaxis-markdown/).

### Método 3: indicar un archivo markdown

Indica la ruta a un archivo markdown en el repositorio. Ideal para paneles complejos — especialmente aquellos con *widgets* o contenido que se quiera reutilizar en varios pasos.

```csv
layer1_content
textiles-coloniales/step1-layer1.md
```

Guarda los archivos markdown en `telar-content/texts/stories/`. En la hoja de cálculo, ingresa solo el nombre del archivo — o si los archivos están organizados en subcarpetas, incluye el nombre de la subcarpeta.

**Cómo decide Telar**: Si lo ingresado termina en `.md` y el archivo existe, se carga el archivo. De lo contrario, el valor se trata como contenido.

### Elegir el método correcto

| Escenario | Método recomendado |
|----------|-------------------|
| Explicación corta (1–2 párrafos) | Método 1: Introducir directamente |
| Panel con título personalizado o *widgets* | Método 2: Pegar, o Método 3: Archivo |
| Contenido con *widgets* (acordeón, pestañas, carrusel) | Método 3: Archivo |
| Mismo contenido usado en varios lugares | Método 3: Archivo |
| Ediciones rápidas sin salir de la hoja de cálculo | Método 1 o 2 |

## Archivos markdown de las historias

Al usar el Método 3 (archivos), los archivos markdown de las historias se ubican en `telar-content/texts/stories/`:

```
telar-content/texts/stories/
├── textiles-coloniales/
│   ├── step1-layer1.md
│   ├── step1-layer2.md
│   ├── step2-layer1.md
│   └── step2-layer2.md
└── rutas-comerciales/
    ├── step1-layer1.md
    └── step1-layer2.md
```

Organizar los archivos en subcarpetas por historia facilita el manejo a medida que crece el sitio.

### Título del panel

Agrega un título de panel personalizado usando *frontmatter* YAML:

```markdown
---
title: "Técnicas de tejido"
---

El patrón de urdimbre entrelazada visible aquí indica una técnica
de tejido compleja que era común en el periodo colonial.
```

Si se omite el *frontmatter*, el panel no tiene título — el contenido comienza de inmediato.

### Qué se puede usar en los paneles

Los paneles de las historias admiten:

- Markdown estándar (encabezados, negrita, cursiva, enlaces, listas, imágenes)
- [*Widgets*](/guia/tu-contenido/widgets/) (carrusel, pestañas, acordeón)
- [Autoenlaces de glosario](/guia/funciones/glosario/) (`[[term-id]]`)
- Imágenes con controles de tamaño (consulta la [Guía de sintaxis markdown](/guia/tu-contenido/sintaxis-markdown/))

## Pasos multimedia

Los pasos de una historia pueden hacer referencia a cualquier tipo de objeto — no solo imágenes. Cuando un paso referencia un objeto de video o audio, el área del visor cambia automáticamente al reproductor correspondiente.

- **Objetos de video** — El reproductor de video llena el área del visor con controles de reproducción estándar. Consulta [Objetos de video](/guia/tu-contenido/objetos-video/) para las plataformas compatibles y la configuración.
- **Objetos de audio** — El reproductor de audio llena el área del visor con visualización de forma de onda. Consulta [Objetos de audio](/guia/tu-contenido/objetos-audio/) para los formatos compatibles y la configuración.

No se necesita configuración adicional. Telar detecta el tipo de objeto desde la hoja de cálculo de objetos y carga el reproductor correcto.

## Control de *clips*

Para pasos de video y audio se puede especificar un tiempo de inicio, un tiempo de fin y un ajuste de bucle. Agrega estas columnas a la hoja de cálculo de la historia:

| Columna (inglés) | Columna (español) | Descripción |
|---|---|---|
| `clip_start` | `inicio_clip` | Tiempo de inicio en segundos (ej. `12.5`) |
| `clip_end` | `fin_clip` | Tiempo de fin en segundos |
| `loop` | `bucle` | Repetir el *clip* (`true`, `yes` o `sí`) |

Las tres columnas son opcionales. Si se omiten, el medio se reproduce desde el inicio sin repetición.

```csv
step,object,clip_start,clip_end,loop,question,answer
1,interview-01,45,78,false,¿Qué describe ella?,La técnica de tejido utilizada en su comunidad.
2,field-recording,0,30,true,¿Qué sonidos rodean el taller?,El golpeteo rítmico del telar llena el espacio.
```

{: .tip }
> Los tiempos de *clip* también se pueden configurar visualmente con la interfaz de captura del Compositor. Consulta [Video y audio en el Compositor](/guia/el-compositor/video-audio/) para más detalles.

Consulta la [Referencia CSV: Historias](/guia/tus-datos/csv-historias/) para la referencia completa de columnas incluyendo las columnas de *clip*.

## Texto alternativo

Cada paso puede incluir una columna `alt_text` con una descripción de lo que se ve o se escucha en ese punto de la historia. Este texto es utilizado por lectores de pantalla y otras tecnologías de asistencia.

```csv
step,object,x,y,zoom,alt_text,question,answer
1,textile-001,0.5,0.3,0.8,Primer plano de hilos de urdimbre entrelazados en rojo y dorado,¿Qué es este textil?,Un fragmento colonial con patrones complejos de tejido.
```

{: .tip }
> El texto alternativo de cada paso también se puede configurar en el [editor de pasos del Compositor](/guia/el-compositor/editor-historias/).

## Navegación por teclado

Las historias admiten navegación por teclado. Las teclas de flecha, la barra espaciadora y Page Up/Page Down desplazan la historia, y los puntos de anclaje magnético aseguran que cada pulsación llegue al paso siguiente o anterior.

Cuando un panel está abierto, el comportamiento del teclado cambia: Flecha Arriba/Abajo y Page Up/Page Down desplazan el contenido del panel en lugar de navegar entre pasos. La barra espaciadora desplaza el panel hacia adelante y Shift+Espacio lo desplaza hacia atrás.

## Compartir y enlaces profundos

Telar actualiza automáticamente la URL en la barra de direcciones del navegador a medida que se avanza por la historia. La URL codifica el paso actual y cualquier capa de panel abierta, de modo que se puede copiar y compartir un enlace que abra directamente un punto específico de la historia.

El fragmento de la URL usa un formato compacto:

| Fragmento | Significado |
|-----------|-------------|
| `#s3` | Paso 3 |
| `#s3l1` | Paso 3 con el primer panel de detalle abierto |

Al abrir un enlace profundo, la historia salta directamente al paso codificado y abre el panel si se especificó uno. Esto funciona tanto con la navegación por desplazamiento en escritorio como con la navegación por botones en dispositivos móviles.

{: .note }
> El botón de retroceso del navegador regresa a la página anterior — no al paso anterior. Los enlaces profundos están diseñados para compartir posiciones, no para navegar dentro de una historia.

## Controlar la visualización de las historias

### Ocultar historias de la página principal

Si deseas tener objetos en la página principal pero prefieres que las historias se accedan a través de la navegación o enlaces directos:

```yaml
story_interface:
  show_on_homepage: false
```

Las historias siguen accesibles en sus URL — solo se ocultan las tarjetas de la página principal.

### Ocultar indicadores de paso

Los indicadores "Step 1", "Step 2" en la esquina superior izquierda del visor de la historia se pueden ocultar para una experiencia más limpia:

```yaml
story_interface:
  show_story_steps: false
```

Quienes visitan pueden seguir navegando por los pasos normalmente.

## Véase también

- [Referencia CSV: Historias](/guia/tus-datos/csv-historias/) — Referencia completa de columnas para las hojas de cálculo de historias
- [Objetos](/guia/tu-contenido/objetos/) — Definir los objetos usados en las historias
- [Objetos de video](/guia/tu-contenido/objetos-video/) — Agregar objetos de video desde YouTube, Vimeo y Google Drive
- [Objetos de audio](/guia/tu-contenido/objetos-audio/) — Agregar archivos de audio autoalojados
- [*Widgets*](/guia/tu-contenido/widgets/) — Carrusel, pestañas y acordeón en paneles de historias
- [Historias privadas](/guia/funciones/historias-privadas/) — Restringir el acceso a historias
- [Configuración](/guia/configurar/configuracion/) — Opciones de la interfaz de historias
