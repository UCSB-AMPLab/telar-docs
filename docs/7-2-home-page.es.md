---
layout: docs
title: "7.2. Personalizar la página de inicio"
parent: "7. Personalización"
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/personalizacion/pagina-de-inicio/
---

## Personalizar la página de inicio

La página principal de tu sitio Telar está controlada por un archivo Markdown sencillo (`index.md`) en el directorio raíz del repositorio. Ahí puedes editar o quitar el mensaje de bienvenida y cambiar los encabezados de cada sección.

## Ubicación del archivo

`index.md` **debe** estar en el directorio raíz de tu repositorio (no en un subdirectorio). Jekyll busca este archivo ahí para convertirlo en tu página de inicio.

## Estructura básica

Aquí está la estructura predeterminada de `index.md`:

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

Tu contenido personalizado va aquí...
```

## Modo colección

De manera predeterminada, la página principal muestra las historias primero con una muestra de objetos debajo. El modo colección invierte este orden — los objetos aparecen primero en una cuadrícula grande, con las historias en una cuadrícula más pequeña debajo.

Se activa en `_config.yml`:

```yaml
collection_mode: true
```

Cuando el modo colección está activo:

- **Cuadrícula de objetos**: Hasta 8 objetos en una cuadrícula de 4 columnas (2 columnas en tableta, 1 en dispositivos móviles). Los objetos provienen de los marcados como `featured` en `objects.csv`. Si no hay objetos destacados, se usan los primeros 8
- Los **objetos de video y audio** muestran íconos como marcadores de posición; los objetos de imagen muestran miniaturas IIIF
- Un botón **View all objects** enlaza a la galería completa
- **Cuadrícula de historias**: Todas las historias aparecen debajo en una cuadrícula más pequeña. El ajuste `show_on_homepage` en `story_interface` se ignora en modo colección — se muestran todas las historias
- El encabezado de la sección — "Explora la colección" — proviene de los archivos de idioma del sitio, no del *frontmatter* de `index.md`

El modo colección funciona bien para sitios con una gran cantidad de objetos y pocas historias, o para exhibiciones centradas en colecciones donde explorar objetos es el punto de entrada principal.

**Nuevo en v1.1.0.** Consulta la [Referencia de configuración](/guia/configurar/configuracion/#collection_mode) para los detalles del ajuste.

## Opciones de front matter

### stories_heading

El encabezado que se muestra sobre la cuadrícula de historias. Predeterminado: `"Explore the stories"`

### stories_intro

Texto introductorio opcional que se muestra entre el encabezado y la cuadrícula de historias. Déjalo en blanco (`""`) si no quieres texto introductorio.

### objects_heading

El encabezado que se muestra sobre la sección de objetos. Predeterminado: `"See the objects behind the stories"`

### objects_intro

Texto introductorio para la sección de objetos. Usa `{count}` como marcador de posición para el número de objetos.

Predeterminado: `"Browse {count} objects featured in the stories."`

El marcador de posición `{count}` se reemplaza automáticamente con el número real de objetos.

## Agregar contenido personalizado

Cualquier contenido Markdown que agregues debajo del front matter aparecerá sobre la sección de historias. Esto es ideal para:

- Mensajes de bienvenida
- Descripciones generales de la exhibición
- Avisos importantes
- Llamados a la acción personalizados

### Ejemplo: bienvenida personalizada

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

## Bienvenido al Proyecto de Textiles Coloniales

Esta exhibición digital explora las historias ocultas tejidas en los
textiles coloniales de la región andina.

Navega a través de las historias a continuación para descubrir las técnicas y significados culturales de estos artefactos.
```

### Ejemplo: cuadro de alerta

Puedes usar etiquetas de alerta para mostrar advertencias:

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

{: .alert .alert-warning}
> **🚧 Exposición en desarrollo**
>
> Esta exhibición se está desarrollando activamente. Estamos agregando nuevas historias
> y objetos regularmente. ¡Vuelve pronto para ver cómo nos queda!
```

## Aviso del sitio de demostración

La plantilla incluye de manera predeterminada un aviso que dice que el sitio es de demostración, con enlaces al repositorio de GitHub y la documentación.

### Para personalizar

Edita el contenido markdown para que coincida con tu proyecto.

### Para eliminar

Simplemente elimina el bloque de aviso de demostración de `index.md`.

## Ejemplos

### Página de inicio minimalista

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: ""
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---
```

Sin contenido personalizado: solo muestra historias y objetos. Las tarjetas de historias muestran miniaturas según el tipo de medio: las historias de video y audio muestran un ícono como marcador de posición cuando no hay un objeto de imagen disponible.

### Con texto introductorio

```markdown
---
layout: index
title: Home
stories_heading: "Explore the stories"
stories_intro: "Cada historia revela una perspectiva única sobre nuestro patrimonio cultural compartido."
objects_heading: "See the objects behind the stories"
objects_intro: "Browse {count} objects featured in the stories."
---

## Acerca de esta exhibición

{: .lead}
El **Proyecto Textiles Coloniales** utiliza ...
```

## Recomendaciones

- Mantén el contenido de la página de inicio conciso para que los visitantes entren a tus historias.
- Usa `##` (segundo nivel) o `###` (tercer nivel) para crear encabezados.
- Prueba tu página de inicio en distintos tamaños de pantalla para cerciorarte de que se vea bien.
- Actualiza los avisos y textos introductorios a medida que tu exhibición evolucione.

## Notas técnicas

- La configuración `layout: index` es obligatoria y no debe cambiarse.
- La configuración `title` controla la etiqueta `<title>` de la página.
- Todas las funciones de Markdown son compatibles (consulta la [Guía de sintaxis de Markdown](/guia/tu-contenido/sintaxis-markdown/)).

## Próximos pasos

- [Aprende sobre temas](/guia/personalizacion/temas/) para dar estilo a tu página de inicio.
- [Explora estilos avanzados](/guia/desarrolladores/estilos/) para CSS personalizado.
- [Consulta la referencia de Markdown](/guia/tu-contenido/sintaxis-markdown/) para opciones de formato.
