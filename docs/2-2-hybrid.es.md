---
layout: docs
title: 2.2. Ir Más Allá
parent: 2. Configura Tu Sitio
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/flujos-de-trabajo/hibrido/
---

# Flujo de trabajo híbrido: Google Sheets + archivos Markdown

**Para paneles con contenido más rico.** Este flujo se basa en el de la [interfaz web de GitHub](/guia/flujos-de-trabajo/interfaz-web-github/) y agrega archivos Markdown para paneles de historia que necesiten más que unos pocos párrafos de texto.

## Cuándo usar este flujo

El [flujo de trabajo con Google Sheets](/guia/flujos-de-trabajo/interfaz-web-github/) es suficiente para la mayoría de las exposiciones con Telar. Considera agregar archivos Markdown cuando necesites:

- **Narrativas más extensas** — paneles con varias secciones, encabezados y estructura
- **Widgets interactivos** — acordeones, paneles con pestañas o carruseles de imágenes
- **Medios enriquecidos** — videos incrustados, imágenes con tamaño personalizado o audio
- **Contenido reutilizable** — el mismo texto de panel referenciado desde varios pasos de historia
- **Edición más cómoda** — un editor de texto es más práctico que una celda de hoja de cálculo para textos largos

Si tus paneles son en su mayoría de 1-2 párrafos, probablemente no necesitas este flujo. Quédate con Google Sheets y regresa aquí si tus necesidades crecen.

## Cómo funciona

El enfoque híbrido es sencillo: la estructura de tu historia se mantiene en Google Sheets, pero en lugar de escribir el texto del panel en una celda de la hoja de cálculo, apuntas a un archivo Markdown en tu repositorio.

Telar detecta la diferencia automáticamente. Si el valor en una celda de `layer1_content` o `layer2_content` termina en `.md`, Telar carga el archivo. De lo contrario, trata el valor como texto directo. Puedes mezclar ambos enfoques libremente — algunos pasos con texto directo, otros con referencias a archivos.

## Paso 1: crea tu archivo Markdown

1. En tu repositorio de GitHub, navega a `components/texts/stories/`
2. Si tu historia es `story-1`, crea una carpeta llamada `story-1/` (o el nombre que prefieras)
3. Haz clic en **Add file** → **Create new file**
4. Nombra tu archivo con extensión `.md` (ej., `paso1-tecnicas.md`)
   - Usa guiones en lugar de espacios
   - Escoge un nombre descriptivo — lo verás en tu hoja de cálculo
5. Escribe tu contenido (consulta [Escribir contenido en Markdown](#escribir-contenido-en-markdown) más abajo)
6. Haz clic en **Commit changes** para guardar

![Crear un nuevo archivo Markdown en GitHub](/images/create-new-layer.png)

![Editar un archivo Markdown en GitHub](/images/edit-layer.png)

{: .tip }

> **Organización de archivos**
> Un patrón común es una carpeta por historia, con archivos nombrados por paso y tema:
>
> ```
> components/texts/stories/
>   story-1/
>     paso1-tecnicas.md
>     paso2-materiales.md
>     paso3-historia.md
>   story-2/
>     paso1-panorama.md
> ```
>
> Cualquier organización funciona — a Telar solo le importa la ruta que pongas en la hoja de cálculo.

## Paso 2: vincula el archivo desde tu hoja de cálculo

En tu Google Sheet, pon la ruta del archivo en la columna `layer1_content` o `layer2_content`. La ruta es relativa a `components/texts/stories/`:

| step | question | layer1_content |
|------|----------|----------------|
| 1 | ¿Qué es este textil? | story-1/paso1-tecnicas.md |
| 2 | ¿Dónde se hizo? | Este textil fue hecho en... |
| 3 | ¿Por qué es importante? | story-1/paso3-historia.md |

Observa cómo el paso 2 usa texto directo mientras que los pasos 1 y 3 referencian archivos. Puedes mezclar ambos métodos libremente.

## Escribir contenido en Markdown

### Estructura básica

Un archivo Markdown para un panel de historia se ve así:

```markdown
---
title: "Técnicas de tejido"
---

El patrón de urdimbre entrelazada visible aquí indica una técnica
de tejido compleja, común en la época colonial.

## Detalles técnicos

Estos textiles se producían en telares de cintura, una tecnología
que antecede al contacto europeo por miles de años.
```

El `title` en el *frontmatter* (la sección entre las líneas `---`) se convierte en el encabezado del panel. Si lo omites, Telar usa el texto del botón.

### Formato básico

Markdown usa caracteres sencillos para dar formato:

| Lo que escribes | Lo que hace |
|-----------------|------------|
| `**texto en negrita**` | **texto en negrita** |
| `*texto en cursiva*` | *texto en cursiva* |
| `## Encabezado` | Un encabezado de sección |
| `- elemento` | Un elemento de lista con viñeta |
| `1. elemento` | Un elemento de lista numerada |
| `[texto](url)` | Un enlace |
| `> cita` | Una cita en bloque |

{: .tip }

> **¿Nuevo en Markdown?**
> Prueba el [tutorial de CommonMark](https://commonmark.org/help/) — toma unos 10 minutos y cubre todo lo que necesitas para los paneles de Telar.

### Qué pueden hacer los archivos Markdown que el texto directo no puede

Los archivos Markdown admiten todas las funciones de contenido de Telar:

- **Widgets** — elementos interactivos como acordeones, paneles con pestañas y carruseles de imágenes. Consulta la [Referencia de sintaxis Markdown](/guia/referencia/sintaxis-markdown/) para la lista completa.
- **Medios incrustados** — videos, reproductores de audio e imágenes con tamaño personalizado
- **Enlaces de glosario** — conecta términos a tu glosario usando la sintaxis `[[id-del-termino]]`
- **Estructura compleja** — múltiples encabezados, listas anidadas y citas en bloque

Estas funciones se manejan mejor en archivos porque usan sintaxis de varias líneas que es difícil de administrar dentro de una celda de hoja de cálculo.

## Editar archivos Markdown en GitHub

No necesitas instalar nada para editar archivos Markdown. GitHub tiene un editor integrado:

1. Navega al archivo en tu repositorio
2. Haz clic en el **ícono de lápiz** (Edit this file)
3. Haz tus cambios
4. Haz clic en **Commit changes** para guardar

GitHub también muestra una pestaña **Preview** para que puedas verificar el formato antes de hacer *commit*.

{: .note }

> **Después de editar archivos, recuerda reconstruir.** Ve a **Actions** → **Build and Deploy** → **Run workflow** para ver tus cambios en el sitio en vivo.

## Próximos pasos

- [Referencia de sintaxis Markdown](/guia/referencia/sintaxis-markdown/) — guía completa de formato con widgets y medios
- [Estructura de contenido](/guia/estructura-de-contenido/) — cómo Telar organiza los archivos
- [Referencia CSV: Proyecto y Objetos](/guia/referencia/csv-proyecto-objetos/) — columnas de CSV de proyecto y objetos
- [Referencia CSV: Historias y Glosario](/guia/referencia/csv-historias-glosario/) — columnas de CSV de historias y glosario
