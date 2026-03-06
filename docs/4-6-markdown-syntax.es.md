---
layout: docs
title: "4.6. Sintaxis de Markdown"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 6
lang: es
permalink: /guia/tu-contenido/sintaxis-markdown/
katex: true
---

# Referencia de sintaxis de Markdown

Los paneles de contenido en Telar se deben escribir utilizando el formato Markdown. Esta guía de referencia cubre cómo funciona esta sintaxis para crear contenido narrativo claro y atractivo.

## ¿Qué es Markdown?

Markdown es un lenguaje de marcado ligero que te permite formatear texto usando una sintaxis simple y legible. En lugar de etiquetas HTML complejas, escribes en texto plano con caracteres especiales como `*` para énfasis o `#` para encabezados. Markdown es:

- **Fácil de leer**: Incluso en su forma cruda, markdown es legible
- **Fácil de escribir**: Sintaxis simple que es más rápida que HTML
- **Portátil**: Los archivos de texto plano funcionan en cualquier lugar
- **Convertible**: Se convierte automáticamente a HTML para su visualización

### Recursos de aprendizaje

¿Nuevo en Markdown? Estos recursos te ayudarán:

- [Guía de Markdown](https://www.markdownguide.org/es/) - Guía completa para empezar
- [Tutorial de CommonMark](https://commonmark.org/help/) - Tutorial interactivo de 10 minutos
- [Hoja de Referencia de Markdown](https://www.markdownguide.org/cheat-sheet/) - Referencia rápida

Telar usa el procesador [Python Markdown](https://python-markdown.github.io/) con las extensiones `extra` y `nl2br`.

---

## Métodos de contenido de panel

Puedes proporcionar el contenido del panel de tres maneras. Para más detalles, consulta la [Referencia CSV: Historias](/guia/tus-datos/csv-historias/#contenido-de-capa).

### Método 1: Introducir texto directamente

Escribe el texto del panel directamente en la columna `contenido_capa1` de tu hoja de cálculo:

| contenido_capa1 |
|-----------------|
| Este textil muestra **técnicas avanzadas de tejido** del período colonial. El patrón entrelazado indica una artesanía sofisticada. |

Los saltos de línea en la celda de tu hoja de cálculo crean saltos de párrafo. El título del panel es el texto del botón de manera predeterminada.

### Método 2: Pegar texto markdown

Pega texto desde un editor de texto plano. Puedes incluir encabezados, widgets y un título de panel personalizado usando frontmatter YAML:

```markdown
---
title: "Técnicas de tejido"
---

El patrón de urdimbre entrelazada visible aquí indica una técnica
de tejido compleja que era común en el período colonial.

## Detalles técnicos

Estos patrones se creaban usando...
```

{: .warning }
> Si copias y pegas desde Microsoft Word, Google Docs o aplicaciones similares, el formato **no** se preservará. Escribe en sintaxis markdown.

### Método 3: Indicar un archivo de texto

Para contenido complejo, indica un archivo markdown guardado en `telar-content/texts/stories/`:

| contenido_capa1 |
|-----------------|
| textiles-coloniales/paso1-capa1.md |

El archivo usa frontmatter para el título del panel y soporta todas las funcionalidades de markdown, incluyendo widgets.

**Cuándo usar archivos de texto**:
- Contenido con widgets (acordeón, pestañas, carrusel)
- Contenido reutilizado en varias historias
- Narrativas largas que se benefician de la edición en un editor de texto

---

## Formato básico

### Encabezados

```markdown
## Encabezado de segundo nivel
### Encabezado de tercer nivel
#### Encabezado de cuarto nivel
```

{: .note }
> **Consejo**: No uses `# Primer nivel` en paneles; el panel ya tiene un título definido en el front matter.

### Estilos de texto

```markdown
**Texto en negrita** para énfasis
*Texto en cursiva* para énfasis sutil
***Negrita y cursiva*** para máximo énfasis
```

### Listas

Listas desordenadas:
```markdown
- Primer elemento
- Segundo elemento
  - Elemento anidado
  - Otro elemento anidado
- Tercer elemento
```

Listas ordenadas:
```markdown
1. Primer paso
2. Segundo paso
3. Tercer paso
```

### Enlaces

```markdown
[Texto del enlace](https://example.com)
[Enlace interno](/objects/textile-001/)
```

### Citas en bloque

```markdown
> Esto es una cita en bloque.
> Puede abarcar múltiples líneas.
```

---

## Imágenes

Telar proporciona sintaxis especial para controlar los tamaños de imagen en los paneles.

### Sintaxis básica

```markdown
![Texto alternativo descriptivo](ruta/a/imagen.jpg){tamaño}
```

### Opciones de tamaño

| Tamaño | Palabra clave | Ancho máx. | Caso de uso |
|--------|---------------|-----------|-------------|
| Pequeño | `{sm}` o `{small}` | 250px | Miniaturas, iconos, detalles pequeños |
| Mediano | `{md}` o `{medium}` | 450px | Ilustraciones estándar (predeterminado) |
| Grande | `{lg}` o `{large}` | 700px | Imágenes destacadas, vistas detalladas |
| Completo | `{full}` | 100% | Panoramas, visuales de ancho completo |

### Rutas de imagen

**Rutas relativas** (sin barra inicial) se cargan automáticamente desde `/telar-content/objects/`:

```markdown
![Detalle de tejido](textile-closeup.jpg){md}
```
→ Carga `/telar-content/objects/textile-closeup.jpg`

**Rutas absolutas** (comenzando con `/`) cargan desde la raíz del sitio:

```markdown
![Logo del sitio](/telar-content/objects/logo.png){sm}
```

**URLs externas** funcionan como se espera:

```markdown
![Foto del museo](https://example.com/image.jpg){lg}
```

### Ejemplos

```markdown
![Miniatura pequeña](thumb.jpg){small}
![Ilustración mediana](diagram.jpg){md}
![Imagen destacada grande](painting.jpg){large}
![Panorama de ancho completo](landscape.jpg){full}
```

{: .tip }
> **Tamaño Predeterminado**: Las imágenes sin etiqueta de tamaño predeterminan a mediano (450px). Siempre incluye etiquetas de tamaño para claridad.

### Pies de imagen

Agrega un pie de imagen colocando texto en la línea inmediatamente después de la imagen:

```markdown
![Fragmento textil colonial](textile.jpg){lg}
Detalle que muestra el patrón de *urdimbre entrelazada* típico del período.
```

El pie de imagen aparece centrado debajo de la imagen en una fuente de peso ligero.

**Prefijo opcional**: Puedes usar `caption:` para hacer los pies más explícitos:

```markdown
![Mapa de la región](map.jpg){md}
caption: Mapa de la *Recopilación de Leyes*, 1680.
```

El prefijo `caption:` se elimina del texto mostrado.

**Markdown en pies de imagen**: Los pies de imagen admiten formato markdown como `*cursivas*`, `**negritas**` y `[enlaces](url)`.

---

## Medios enriquecidos

### Videos de YouTube

Inserta videos de YouTube adaptables usando un iframe HTML:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          src="https://www.youtube.com/embed/VIDEO_ID"
          frameborder="0"
          allowfullscreen>
  </iframe>
</div>
```

Reemplaza `VIDEO_ID` con el ID de tu video de YouTube.

El `padding-bottom: 56.25%` crea un contenedor con relación de aspecto 16:9.

### Otros iframes

Cualquier contenido incrustable con iframe funciona:

```html
<iframe src="https://example.com/embed"
        width="100%"
        height="400"
        frameborder="0">
</iframe>
```

---

## Código

### Código en línea

Usa comillas invertidas para referencias de `código en línea`:

```markdown
El campo `object_id` debe coincidir con el nombre del archivo.
```

### Bloques de código

Usa triple comillas invertidas para bloques de código:

````markdown
```
git add .
git commit -m "Actualizar contenido"
git push
```
````

Con resaltado de sintaxis:

````markdown
```yaml
title: Mi Historia
description: Una narrativa convincente
```
````

---

## Notas al pie

Crea notas al pie con sintaxis `[^1]`:

```markdown
El textil muestra técnicas avanzadas.[^1]

[^1]: Basado en el análisis de la Dra. Smith (2020).
```

Las notas al pie aparecen automáticamente al final del contenido del panel con estilo apropiado.

---

## Notación matemática y científica (LaTeX)

Telar permite representar fórmulas matemáticas mediante [KaTeX](https://katex.org/). Puedes incluir fórmulas, ecuaciones químicas y notación científica en cualquier lugar donde se use markdown: paneles de historias, definiciones del glosario, descripciones de objetos y páginas personalizadas.

### Cómo funciona

Telar detecta automáticamente el LaTeX en el contenido durante la construcción del sitio. No necesitas configurar nada — si el texto contiene notación LaTeX, se representará como fórmula formateada.

### Fórmulas en línea

Encierra las expresiones entre signos de dólar simples para que aparezcan en línea con el texto:

```markdown
El coeficiente es $C = \frac{8}{35}$ y el polinomio es $P_4(x)$.
```

<p><strong>Se muestra así:</strong> El coeficiente es $C = \frac{8}{35}$ y el polinomio es $P_4(x)$.</p>

{: .warning }
> **Heurística del signo de dólar**: para evitar falsos positivos con monedas (ej., "$50"), Telar solo trata `$...$` como fórmula cuando el contenido incluye caracteres propios de LaTeX como `\`, `^`, `_` o `{`. Los signos dobles (`$$...$$`) siempre se tratan como fórmulas.

### Fórmulas en bloque

Encierra las expresiones entre signos de dólar dobles para obtener ecuaciones centradas e independientes:

```markdown
$$x^4 = \frac{8}{35}P_4(x) + \frac{4}{7}P_2(x) + \frac{1}{5}P_0(x)$$
```

<p><strong>Se muestra así:</strong></p>
<p>$$x^4 = \frac{8}{35}P_4(x) + \frac{4}{7}P_2(x) + \frac{1}{5}P_0(x)$$</p>

También puedes usar los delimitadores `\[...\]`:

```markdown
\[E = mc^2\]
```

### Ecuaciones de varias líneas

Usa `\begin{align}...\end{align}` para ecuaciones alineadas en varias líneas. Marca los puntos de alineación con `&` y los saltos de línea con `\\`:

```markdown
$$\begin{align}
P_0(x) &= 1\\
P_1(x) &= x\\
P_2(x) &= \frac{1}{2}(3x^2 - 1)
\end{align}$$
```

<p><strong>Se muestra así:</strong></p>
<p>$$\begin{align} P_0(x) &= 1\\ P_1(x) &= x\\ P_2(x) &= \frac{1}{2}(3x^2 - 1) \end{align}$$</p>

### Entornos compatibles

| Entorno | Propósito |
|---------|-----------|
| `align`, `align*` | Ecuaciones alineadas (con/sin numeración) |
| `equation`, `equation*` | Ecuaciones individuales (con/sin numeración) |
| `cases` | Funciones definidas por tramos |
| `pmatrix` | Matrices con paréntesis |
| `bmatrix` | Matrices con corchetes |

### Fórmulas químicas

Telar incluye la extensión [mhchem](https://mhchem.github.io/MathJax-mhchem/) para notación química:

```markdown
La reacción $\ce{2H2 + O2 -> 2H2O}$ produce agua.

$$\ce{CO2 + C -> 2CO}$$
```

<p><strong>Se muestra así:</strong> La reacción $\ce{2H2 + O2 -> 2H2O}$ produce agua.</p>
<p>$$\ce{CO2 + C -> 2CO}$$</p>

### Dónde funciona LaTeX

| Tipo de contenido | Cómo se carga |
|-------------------|---------------|
| Paneles de historias (capa 1 / capa 2) | Automático — se detecta al construir el sitio |
| Texto de paso de historia | Automático — se detecta al construir el sitio |
| Descripciones de objetos | Automático — se detecta al construir el sitio |
| Definiciones del glosario | Automático — se detecta al construir el sitio |
| Páginas personalizadas | Siempre disponible |
| Historias cifradas | Se carga automáticamente tras descifrar |

### Referencia completa de sintaxis

Para la lista completa de comandos LaTeX compatibles, consulta la [tabla de funciones de KaTeX](https://katex.org/docs/supported).

---

## Mejores prácticas

### Texto alternativo para accesibilidad

Siempre proporciona texto alternativo descriptivo para las imágenes:

```markdown
✅ ![Vista detallada de hilos de urdimbre entrelazados](closeup.jpg){lg}
❌ ![Imagen](closeup.jpg){lg}
```

### Organización de imágenes

Mantén las imágenes de los paneles en `/telar-content/objects/` para fácil referencia:

```
telar-content/objects/
├── story1-context.jpg
├── story1-detail.jpg
├── story2-map.jpg
└── ...
```

### Longitud del contenido

- **Capa 1**: 2-3 párrafos de contexto
- **Capa 2**: Contenido académico más extenso, citas, análisis extendido

Divide el texto largo con encabezados, listas e imágenes para mejor legibilidad.

### Nomenclatura de archivos

Usa nombres de archivo descriptivos, en minúsculas con guiones:

```markdown
✅ ![Patrón de tejido colonial](colonial-textile-detail.jpg){md}
❌ ![Foto](IMG_1234.JPG){md}
```

---

## Referencia rápida

Ejemplos listos para copiar y pegar de las tareas de formato más comunes:

### Agregar una imagen con pie de foto
```markdown
![Textil colonial con patrón entrelazado](textile-detail.jpg){lg}
Detalle de los hilos de urdimbre, circa 1650.
```

### Agregar un video de YouTube
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameborder="0" allowfullscreen></iframe>
</div>
```

### Agregar una cita con nota al pie
```markdown
Estudios recientes cuestionan esta interpretación.[^1]

[^1]: García, M. (2023). *Repensando los textiles coloniales*. Editorial Universitaria.
```

### Enlazar a un término del glosario
```markdown
El sistema de [[encomienda]] estructuró las relaciones tributarias coloniales.
```

### Enlazar a otro objeto
```markdown
Compara con el [textil de Lima](/objects/textile-lima/).
```

### Agregar fórmulas en línea y en bloque
```markdown
El coeficiente es $C = \frac{8}{35}$ y el resultado es:

$$x^4 = \frac{8}{35}P_4(x) + \frac{4}{7}P_2(x) + \frac{1}{5}P_0(x)$$
```

### Crear una cita en bloque
```markdown
> "Los patrones revelan una comprensión sofisticada de la geometría."
> — Autor
```

---

## Limitaciones

- **Sin JavaScript**: Markdown se convierte a HTML estático
- **Sin atributos HTML personalizados**: Usa la sintaxis de tamaño proporcionada en lugar de clases personalizadas
- **Procesamiento de imágenes**: Las imágenes en `telar-content/objects/` que aparecen en tu CSV de objetos sin fuentes IIIF externas se convertirán automáticamente en teselas (*tiles*) IIIF.
- **LaTeX en el glosario entre páginas**: si una página de historia no contiene LaTeX pero un término del glosario sí, las fórmulas no se representarán en la ventana emergente del glosario (KaTeX no se carga en esa página). Es un caso muy poco frecuente.

---

## Próximos pasos

- [Tu contenido](/guia/tu-contenido/) - Aprende a organizar tus archivos Markdown
- [Contenido enriquecido con Markdown](/guia/tu-contenido/contenido-enriquecido/) - Crea y edita archivos Markdown
- [Estilos avanzados](/guia/desarrolladores/estilos/) - Personaliza la apariencia de los paneles
