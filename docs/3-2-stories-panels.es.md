---
layout: docs
title: 3.2. Historias y Paneles
parent: 3. Estructura de Contenido
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/estructura-de-contenido/historias-paneles/
---

# Historias y paneles

Las historias son narrativas desplazables, paso a paso, construidas alrededor de tus objetos. Cada paso hace zoom en una región específica de una imagen y presenta un par de pregunta-respuesta con paneles de detalle expandibles.

## Cómo funcionan las historias

Una historia guía a las personas a través de una secuencia de **pasos**. Cada paso:

1. Hace zoom en el visor IIIF a una región específica de un objeto (usando coordenadas x, y y zoom)
2. Muestra una **pregunta** y una breve **respuesta** en el panel de la historia
3. Opcionalmente ofrece hasta tres capas adicionales de detalle mediante botones expandibles

Las personas se desplazan por los pasos y el visor de imagen se anima para coincidir con cada nueva posición. El resultado es una narrativa visual guiada — una experiencia de *scrollytelling*.

## Registrar historias

Antes de construir los pasos de una historia, regístrala en `project.csv`:

```csv
order,story_id,title,subtitle,byline
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido de las Américas,por Dra. María García
```

El `story_id` determina el nombre del archivo CSV de la historia y su URL. Con `story_id: textiles-coloniales`, Telar busca `components/structures/textiles-coloniales.csv` y sirve la historia en `/stories/textiles-coloniales/`.

Si omites `story_id`, Telar usa `story-{order}` (ej., `story-1.csv` para order 1).

Consulta la [Referencia CSV: Proyecto y Objetos](/guia/referencia/csv-proyecto-objetos/#project-csv-projectcsv--proyectocsv) para todas las columnas de project.csv.

## Construir los pasos de la historia

Cada historia tiene su propio archivo CSV en `components/structures/`. El archivo define los pasos en secuencia:

```csv
step,object,x,y,zoom,question,answer,layer1_content
1,textile-001,0.5,0.3,0.8,¿Qué es este textil?,Un fragmento colonial con patrones complejos de tejido,Este fragmento data de mediados del siglo XVII...
2,textile-001,0.2,0.7,0.4,¿Qué significa este patrón?,Un diseño de urdimbre entrelazada usado en telas ceremoniales,El patrón ha sido identificado como...
3,map-lima,0.5,0.5,1.0,¿Dónde se encontraron estos textiles?,En el centro histórico de Lima,Las excavaciones arqueológicas de los años 1990...
```

### Campos requeridos

Cada paso necesita:

- **`step`** — Número secuencial (1, 2, 3...) sin saltos
- **`object`** — Un `object_id` de tu objects.csv
- **`x`**, **`y`**, **`zoom`** — Coordenadas del visor (ver abajo)
- **`question`** — El encabezado que se muestra en el panel
- **`answer`** — Una respuesta breve debajo de la pregunta

### Coordenadas

Las coordenadas indican al visor dónde enfocar en cada paso. Todos los valores están normalizados de 0 a 1:

- **x** — Posición horizontal. 0 = borde izquierdo, 0.5 = centro, 1 = borde derecho
- **y** — Posición vertical. 0 = borde superior, 0.5 = centro, 1 = borde inferior
- **zoom** — Nivel de zoom. 0 = alejado (imagen completa visible), 1 = zoom máximo

Para encontrar coordenadas, usa el **selector de coordenadas** en cualquier página de objeto: haz zoom y desplázate hasta la región que deseas, luego haz clic en los botones **Copy** para copiar los valores x, y y zoom directamente a tu hoja de cálculo.

## Capas de los paneles

Cada paso puede tener hasta tres capas de detalle, reveladas por botones en el panel de la historia:

| Capa | Texto predeterminado del botón | Propósito |
|------|-------------------------------|-----------|
| Capa 1 | "Saber más" | Detalle principal |
| Capa 2 | "Profundizar más" | Análisis extendido |
| Capa 3 | (predeterminado) | Nivel más profundo |

Para cada capa, puedes personalizar dos cosas:

- **Texto del botón** (`layer1_button`) — Déjalo vacío para el texto predeterminado, o proporciona texto personalizado como "Ver la técnica" o "Leer la fuente"
- **Contenido** (`layer1_content`) — El contenido del panel en sí

Si una capa no tiene contenido, su botón se oculta automáticamente.

## Escribir contenido para los paneles

Puedes proporcionar el contenido de los paneles de tres maneras. Elige según la complejidad:

### Método 1: Introducir texto directamente

Escribe el texto directamente en la celda de la hoja de cálculo. Ideal para paneles cortos (1–2 párrafos).

```csv
layer1_content
"Este fragmento muestra **técnicas avanzadas de tejido** del periodo colonial."
```

Puedes usar formato básico: `**negrita**`, `*cursiva*`, `[texto del enlace](url)`, y enlaces de glosario (`[[term-id]]`).

Para saltos de línea dentro de una celda:
- **Google Sheets**: Presiona `Ctrl+Enter` (Windows/Linux) u `Option+Enter` (macOS)
- **Archivos CSV**: Usa saltos de línea reales dentro de texto entre comillas
- **Alternativa**: Usa etiquetas HTML `<br>`

### Método 2: Pegar texto markdown

Pega texto escrito en un editor de texto plano. Esto admite la gama completa de características markdown, incluyendo encabezados, widgets (acordeón, carrusel, pestañas), controles de tamaño de imagen y un título de panel personalizado usando frontmatter YAML.

{: .warning }
> Si copias y pegas desde Microsoft Word, Google Docs o aplicaciones similares, el formato **no** se preservará. Escribe con sintaxis markdown en su lugar — consulta la [Guía de Sintaxis Markdown](/guia/referencia/sintaxis-markdown/).

### Método 3: Indicar un archivo markdown

Indica la ruta a un archivo markdown en tu repositorio. Ideal para paneles complejos — especialmente aquellos con widgets o contenido que quieras reutilizar en varios pasos.

```csv
layer1_content
textiles-coloniales/step1-layer1.md
```

Guarda los archivos markdown en `components/texts/stories/`. En tu hoja de cálculo, ingresa solo el nombre del archivo — o si organizaste los archivos en subcarpetas, incluye el nombre de la subcarpeta.

**Cómo decide Telar**: Si lo que ingresas termina en `.md` y el archivo existe, lo carga. De lo contrario, trata el valor como contenido.

### Elegir el método correcto

| Escenario | Método recomendado |
|----------|-------------------|
| Explicación corta (1–2 párrafos) | Método 1: Introducir directamente |
| Panel con título personalizado o widgets | Método 2: Pegar, o Método 3: Archivo |
| Contenido con widgets (acordeón, pestañas, carrusel) | Método 3: Archivo |
| Mismo contenido usado en varios lugares | Método 3: Archivo |
| Ediciones rápidas sin salir de la hoja de cálculo | Método 1 o 2 |

## Archivos markdown de las historias

Al usar el Método 3 (archivos), los archivos markdown de las historias se ubican en `components/texts/stories/`:

```
components/texts/stories/
├── textiles-coloniales/
│   ├── step1-layer1.md
│   ├── step1-layer2.md
│   ├── step2-layer1.md
│   └── step2-layer2.md
└── rutas-comerciales/
    ├── step1-layer1.md
    └── step1-layer2.md
```

Organizar los archivos en subcarpetas por historia facilita el manejo a medida que crece tu sitio.

### Título del panel

Agrega un título de panel personalizado usando frontmatter YAML:

```markdown
---
title: "Técnicas de Tejido"
---

El patrón de urdimbre entrelazada visible aquí indica una técnica
de tejido compleja que era común en el periodo colonial.
```

Si omites el frontmatter, el panel no tiene título — el contenido comienza de inmediato.

### Qué puedes usar en los paneles

Los paneles de las historias admiten:

- Markdown estándar (encabezados, negrita, cursiva, enlaces, listas, imágenes)
- [Widgets](/guia/estructura-de-contenido/widgets/) (carrusel, pestañas, acordeón)
- [Autoenlaces de glosario](/guia/estructura-de-contenido/glosario/) (`[[term-id]]`)
- Imágenes con controles de tamaño (consulta la [Guía de Sintaxis Markdown](/guia/referencia/sintaxis-markdown/))

## Controlar la visualización de las historias

### Ocultar historias de la página principal

Si deseas tener objetos en la página principal pero prefieres que las historias se accedan a través de la navegación o enlaces directos:

```yaml
story_interface:
  show_on_homepage: false
```

Las historias siguen accesibles en sus URLs — solo se ocultan las tarjetas de la página principal.

### Ocultar indicadores de paso

Los indicadores "Step 1", "Step 2" en la esquina superior izquierda del visor de la historia se pueden ocultar para una experiencia más limpia:

```yaml
story_interface:
  show_story_steps: false
```

Las personas pueden seguir navegando por los pasos normalmente.

## Véase también

- [Referencia CSV: Historias y Glosario](/guia/referencia/csv-historias-glosario/) — Referencia completa de columnas para los CSV de historias
- [Objetos y Galería](/guia/estructura-de-contenido/objetos-galeria/) — Definir los objetos usados en las historias
- [Widgets](/guia/estructura-de-contenido/widgets/) — Carrusel, pestañas y acordeón en paneles de historias
- [Historias Privadas](/guia/estructura-de-contenido/historias-privadas/) — Restringir el acceso a historias
- [Configuración](/guia/referencia/configuracion/) — Opciones de la interfaz de historias
