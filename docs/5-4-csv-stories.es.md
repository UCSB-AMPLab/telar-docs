---
layout: docs
title: "5.4. Columnas de historias"
parent: "5. Tus datos"
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/tus-datos/csv-historias/
---

# Columnas de historias

Referencia completa de las columnas del CSV de historia con soporte bilingüe de nombres de columnas. Para la normalización de columnas y soporte de encabezados dobles, consulta [Columnas del proyecto](/guia/tus-datos/csv-proyecto/#descripcion-general).

## CSV de historia (story-{id}.csv)

Define la navegación paso a paso y el contenido de paneles para cada historia.

**Ubicación**: `components/structures/{story_id}.csv`

**Nomenclatura**:
- Si `story_id` está especificado en project.csv: usa ese nombre (ej., `textiles-coloniales.csv`)
- Si `story_id` se omite: usa `story-{order}.csv` (ej., `story-1.csv`, `story-2.csv`)

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `step` | `paso` | Sí | Número de paso (1, 2, 3...) |
| `object` | `objeto` | Sí | ID de objeto del objects.csv |
| `x` | `x` | Sí | Coordenada horizontal (0-1 normalizada) |
| `y` | `y` | Sí | Coordenada vertical (0-1 normalizada) |
| `zoom` | `zoom` | Sí | Nivel de zoom (0-1 normalizado) |
| `question` | `pregunta` | Sí | Encabezado mostrado en el panel de la historia |
| `answer` | `respuesta` | Sí | Texto de respuesta breve |
| `layer1_button` | `boton_capa1` | No | Texto personalizado del botón (vacío = "Saber más") |
| `layer1_content` | `contenido_capa1` | No | Contenido del panel: texto en línea o ruta a archivo .md |
| `layer2_button` | `boton_capa2` | No | Texto personalizado del botón (vacío = "Profundizar más") |
| `layer2_content` | `contenido_capa2` | No | Contenido del panel: texto en línea o ruta a archivo .md |
| `layer3_button` | `boton_capa3` | No | Texto personalizado del botón (vacío = predeterminado) |
| `layer3_content` | `contenido_capa3` | No | Contenido del panel: texto en línea o ruta a archivo .md |

### Ejemplo

**Inglés (con contenido en línea):**
```csv
step,object,x,y,zoom,question,answer,layer1_button,layer1_content,layer2_button,layer2_content
1,textile-001,0.5,0.5,1.0,What is this?,A colonial textile fragment,"",This fragment shows **advanced weaving techniques** from the colonial period.,"Learn More",colonial-textiles/step1-layer2.md
2,textile-001,0.3,0.7,0.5,What is this pattern?,An interlocking warp design,"",colonial-textiles/step2-layer1.md,"",colonial-textiles/step2-layer2.md
```

**Español (con contenido en línea):**
```csv
paso,objeto,x,y,zoom,pregunta,respuesta,boton_capa1,contenido_capa1,boton_capa2,contenido_capa2
1,textil-001,0.5,0.5,1.0,¿Qué es esto?,Un fragmento de textil colonial,"",Este fragmento muestra **técnicas avanzadas de tejido** del período colonial.,"Saber más",textiles-coloniales/paso1-capa2.md
2,textil-001,0.3,0.7,0.5,¿Qué es este patrón?,Un diseño de urdimbre entrelazada,"",textiles-coloniales/paso2-capa1.md,"",textiles-coloniales/paso2-capa2.md
```

El paso 1 usa contenido en línea para la capa 1, mientras que el paso 2 usa una referencia a archivo. Ambos enfoques funcionan y se pueden mezclar libremente.

### Notas de los campos

#### step / paso
- Deben ser enteros secuenciales comenzando en 1
- No se permiten saltos (1, 2, 3... no 1, 3, 5)
- Determina el orden de navegación

#### object / objeto
- Debe coincidir con un `object_id` del objects.csv
- Varios pasos pueden hacer referencia al mismo objeto

#### x, y, zoom
- Todos los valores normalizados de 0 a 1
- **x**: 0 = borde izquierdo, 1 = borde derecho, 0.5 = centro
- **y**: 0 = borde superior, 1 = borde inferior, 0.5 = centro
- **zoom**: 0 = alejado (imagen completa), 1 = zoom máximo
- Usa el selector de coordenadas en las páginas de objetos para encontrar los valores

#### question / pregunta
- Se muestra como encabezado del panel
- Pregunta o afirmación breve
- Recomendado: 3-8 palabras

#### answer / respuesta
- Respuesta breve mostrada en el panel
- Anticipo del contenido de la capa 1
- Recomendado: 1-2 oraciones

#### Botones de las capas

- Cadena vacía = texto predeterminado del botón
- Texto personalizado: cualquier cadena (ej., "Ver detalles", "See details")
- Si hay contenido pero el botón está vacío: muestra el texto predeterminado
- Si no hay contenido: el botón se oculta

#### Contenido de las capas

El contenido del panel se puede proporcionar de tres maneras:

**Método 1: Introducir texto directamente**

Escribe el texto del panel directamente en la celda de la hoja de cálculo. Es el enfoque más sencillo para paneles cortos.

| contenido_capa1 |
|----------------|
| Este textil muestra **técnicas avanzadas de tejido** del periodo colonial. |

Para crear saltos de párrafo dentro de una celda:

| Entorno | Cómo crear saltos de línea |
|---------|---------------------------|
| Google Sheets | Presiona `Ctrl+Enter` (Windows/Linux) u `Option+Enter` (macOS) |
| Archivos CSV | Usa saltos de línea reales dentro de texto entre comillas |
| Alternativa | Usa HTML: `<br>` para saltos de línea, `<p>...</p>` para párrafos |

Puedes usar formato básico: `**negrita**`, `*cursiva*`, `[texto del enlace](url)`, y enlaces de glosario (`[[term-id]]`).

**Método 2: Pegar texto markdown**

Pega texto escrito en un editor de texto plano. Esto admite la gama completa de características de formato, incluyendo encabezados, widgets (acordeón, carrusel, pestañas), controles de tamaño de imagen y un título de panel personalizado usando frontmatter YAML.

{: .warning }
> Si copias y pegas desde Microsoft Word, Google Docs o aplicaciones similares, el formato **no** se preservará. Escribe con sintaxis markdown en su lugar — consulta la [Guía de Sintaxis Markdown](/guia/tu-contenido/sintaxis-markdown/).

**Método 3: Indicar un archivo markdown**

Indica la ruta a un archivo markdown en tu repositorio. Esto se recomienda para paneles complejos, especialmente aquellos con widgets o contenido que quieras reutilizar.

| contenido_capa1 |
|----------------|
| textiles-coloniales/step1-layer1.md |

Guarda los archivos markdown en `components/texts/stories/`. En tu hoja de cálculo, ingresa solo el nombre del archivo — o si organizaste los archivos en subcarpetas, incluye el nombre de la subcarpeta.

**Cómo decide Telar**: Si lo que ingresas termina en `.md` y el archivo existe, lo carga. De lo contrario, trata el valor como contenido.

### Elegir el método correcto

| Escenario | Método recomendado |
|----------|-------------------|
| Explicación corta (1-2 párrafos) | Método 1: Introducir directamente |
| Panel con título personalizado o widgets | Método 2: Pegar, o Método 3: Archivo |
| Contenido con widgets (acordeón, pestañas, carrusel) | Método 3: Archivo |
| Mismo contenido usado en varios lugares | Método 3: Archivo |
| Ediciones rápidas sin salir de la hoja de cálculo | Método 1 o 2 |

### Alias del CSV de historia

| Normalizado | Acepta |
|------------|--------|
| `step` | `step`, `paso` |
| `object` | `object`, `objeto`, `object_id` |
| `x` | `x` |
| `y` | `y` |
| `zoom` | `zoom` |
| `question` | `question`, `pregunta` |
| `answer` | `answer`, `respuesta` |
| `layer1_button` | `layer1_button`, `boton_capa1` |
| `layer1_content` | `layer1_content`, `contenido_capa1`, `layer1_file`, `archivo_capa1` |
| `layer2_button` | `layer2_button`, `boton_capa2` |
| `layer2_content` | `layer2_content`, `contenido_capa2`, `layer2_file`, `archivo_capa2` |
| `layer3_button` | `layer3_button`, `boton_capa3` |
| `layer3_content` | `layer3_content`, `contenido_capa3`, `layer3_file`, `archivo_capa3` |

{: .note }
> Los nombres de columna `layer_file` / `archivo_capa` son alias heredados de antes de v0.6.3. Los nombres preferidos son `layer_content` / `contenido_capa`.

## Consejos para la entrada de datos

**Coordenadas**: Usa el selector de coordenadas en las páginas de objetos para encontrar los valores x, y y zoom, y cópialos directamente a tu CSV.

**Markdown en los campos**:
- `layer_content`, `definition`: Admiten markdown completo
- `question`, `answer`: Solo texto plano

**Contenido de paneles**: Usa referencias a archivos (Método 3) para contenido complejo con widgets. Usa texto en línea (Método 1) para paneles cortos.

## Validación

Telar valida los datos CSV de historias durante la compilación:

**Errores de historias (la *build* falla)**:
- Faltan columnas requeridas
- Secuencia de `step` inválida (saltos, duplicados)
- Archivos markdown de capas faltantes
- Valores de coordenadas inválidos (fuera del rango 0-1)

**Advertencias de historias (la *build* continúa)**:
- Nombres de columnas no reconocidos (se ignoran)
- ID de objeto no encontrado en objects.csv

## Véase también

- [Columnas del proyecto](/guia/tus-datos/csv-proyecto/) — Columnas de project.csv
- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Columnas de objects.csv
- [Columnas del glosario](/guia/tus-datos/csv-glosario/) — Columnas de glossary.csv
- [Historias y paneles](/guia/tu-contenido/historias-paneles/) — Cómo estructurar historias
- [Sintaxis Markdown](/guia/tu-contenido/sintaxis-markdown/) — Formato para contenido de paneles
