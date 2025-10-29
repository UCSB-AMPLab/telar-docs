---
layout: default
title: 7.3. Sintaxis de Markdown
parent: 7. Referencia
grand_parent: Documentación
nav_order: 3
lang: es
---

## Referencia de sintaxis de Markdown

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

## Estructura de paneles

Los archivos de las capas de la historia (referenciados en las columnas `layer1_file` y `layer2_file`) usan Markdown con YAML front matter:

```markdown
---
title: "Título de Tu Panel"
---

Tu contenido va aquí con soporte completo de Markdown.
```

El título del front matter aparece en el encabezado del panel. El contenido del cuerpo se convierte a HTML y se muestra en el panel.

---

## Formato básico

### Encabezados

```markdown
## Encabezado de Segundo Nivel
### Encabezado de Tercer Nivel
#### Encabezado de Cuarto Nivel
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

**Rutas relativas** (sin barra inicial) se cargan automáticamente desde `/components/images/additional/`:

```markdown
![Detalle de tejido](textile-closeup.jpg){md}
```
→ Carga `/components/images/additional/textile-closeup.jpg`

**Rutas absolutas** (comenzando con `/`) cargan desde la ubicación especificada:

```markdown
![Logo del sitio](/assets/images/logo.png){sm}
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

## Mejores prácticas

### Texto alternativo para accesibilidad

Siempre proporciona texto alternativo descriptivo para las imágenes:

```markdown
✅ ![Vista detallada de hilos de urdimbre entrelazados](closeup.jpg){lg}
❌ ![Imagen](closeup.jpg){lg}
```

### Organización de imágenes

Mantén las imágenes de los paneles en `/components/images/additional/` para fácil referencia:

```
components/images/additional/
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

## Limitaciones

- **Sin JavaScript**: Markdown se convierte a HTML estático
- **Sin atributos HTML personalizados**: Usa la sintaxis de tamaño proporcionada en lugar de clases personalizadas
- **Procesamiento de imágenes**: Solo las imágenes en `/components/images/objects/` generan automáticamente _tiles_ IIIF

---

## Siguientes pasos

- [Guía de estructura de contenido](/documentacion/3-estructura-de-contenido/) - Aprende a organizar tus archivos Markdown
- [Flujo de trabajo web de GitHub](/documentacion/2-flujos-de-trabajo/1-interfaz-web/) - Crea y edita archivos Markdown
- [Estilos avanzados](/documentacion/6-personalizacion/2-estilos/) - Personaliza la apariencia de los paneles
