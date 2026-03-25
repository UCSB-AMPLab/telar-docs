---
layout: docs
title: "6.1. Galería de objetos"
parent: "6. Funciones del sitio"
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/funciones/galeria-objetos/
---

# Galería de objetos

La galería de objetos ofrece una interfaz navegable y con búsqueda para tu colección en `/objects/`.

## Página de la galería

Hay dos modos, controlados por la opción `browse_and_search` en tu `_config.yml`:

### Modo de exploración y búsqueda

Cuando `browse_and_search` es `true` (el valor predeterminado), la galería incluye una **barra lateral de filtros** y una **barra de búsqueda** para explorar tu colección.

![Galería de objetos con barra de búsqueda, opciones de orden y barra lateral de filtros](/images/gallery-browse.png)

**La búsqueda** usa indexación de texto completo con Lunr.js. Busca en título, creador, descripción, periodo, temas y medio — con mayor peso para las coincidencias en el título. Escribe unos pocos caracteres y los resultados se actualizan al instante.

**Los filtros** permiten acotar la galería con cinco facetas organizadas en dos secciones:

**Tipo** filtra por el tipo de medio detectado automáticamente para cada objeto:

| Valor | Descripción |
|-------|-------------|
| Image | Imágenes autoalojadas o IIIF |
| Video | Videos de YouTube, Vimeo o Google Drive |
| Audio | Archivos de audio autoalojados (MP3, OGG, M4A) |

**Medium/Genre** filtra por la columna `medium` del `objects.csv` (antes llamada `object_type`). Los valores los define cada proyecto — por ejemplo, mapa, textil, fotografía o pintura.

Las facetas restantes funcionan como antes:

| Faceta | Columna CSV | Valores de ejemplo |
|--------|-------------|-------------------|
| Creador | `creator` | Desconocido, Juan de Cuéllar |
| Periodo | `period` | Colonial, siglo XVIII |
| Temas | `subjects` | tejido, cartografía, Lima |

Cada faceta muestra la cantidad de objetos coincidentes entre paréntesis. Selecciona varios valores dentro de una faceta para ampliar los resultados (lógica OR), o combina facetas para acotarlos (lógica AND).

Los objetos de video y audio muestran miniaturas con iconos de marcador de posición en la cuadrícula de la galería en lugar de espacios en blanco. Cada elemento de la galería también incluye los atributos `data-media-type` y `data-medium` para personalización con estilos o scripts.

**La ordenación** ofrece dos opciones:
- **Título** — Alfabético (A–Z o Z–A)
- **Año** — Cronológico, usando la columna `year` del CSV

Los filtros y términos de búsqueda activos aparecen como etiquetas removibles sobre la cuadrícula. Haz clic en **Clear all** para reiniciar.

### Modo de cuadrícula simple

Cuando `browse_and_search` es `false`, la galería muestra una cuadrícula sencilla de tarjetas de objetos sin filtros ni búsqueda.

### Completar los metadatos de la galería

Para la mejor experiencia en la galería, completa estas columnas en tu `objects.csv`:

1. **`medium`** para cada objeto — alimenta el filtro de Medium/Genre (la columna antes se llamaba `object_type`; ambos nombres se aceptan)
2. **`subjects`** con 2–4 términos separados por comas — alimenta el filtro de Temas
3. **`year`** — habilita la ordenación cronológica
4. **`description`** — se indexa para la búsqueda de texto completo
5. **`creator`** y **`period`** — alimentan sus filtros respectivos

Sin estas columnas, la galería sigue funcionando, pero las opciones de filtrado y ordenación son limitadas.

{: .note }
> Los objetos agregados o subidos a través del Compositor aparecen en la galería después de publicar.

## Objetos destacados en la página principal

Puedes mostrar una selección de objetos en tu página principal marcándolos como destacados:

1. En `objects.csv`, establece `featured` en `yes` para los objetos que quieras resaltar
2. En `_config.yml`, establece `show_sample_on_homepage: true` bajo `collection_interface`

```yaml
collection_interface:
  show_sample_on_homepage: true
  featured_count: 4
```

La página principal muestra hasta `featured_count` objetos (predeterminado: 4). Si marcas menos objetos como destacados de lo que permite el conteo, los espacios restantes se llenan aleatoriamente de tu colección.

### Enlace a objetos en la página principal

El enlace "View the objects" en la página principal se controla por separado:

```yaml
collection_interface:
  show_link_on_homepage: true  # Mostrar u ocultar el enlace a /objects/
```

Aunque el enlace esté oculto, la página de la galería sigue accesible a través del menú de navegación.

## Configuración

Todas las opciones de la galería están bajo `collection_interface` en `_config.yml`:

```yaml
collection_interface:
  browse_and_search: true       # Barra lateral de filtros y barra de búsqueda
  show_link_on_homepage: true   # Enlace "View the objects" en la página principal
  show_sample_on_homepage: true # Cuadrícula de objetos destacados en la página principal
  featured_count: 4             # Cantidad de objetos en la página principal
```

Consulta la [Referencia de configuración](/guia/configurar/configuracion/#collection-interface-settings) para detalles completos de cada opción.

## Véase también

- [Objetos](/guia/tu-contenido/objetos/) — Definir objetos y páginas de objetos
- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Referencia completa de columnas para objects.csv
- [Referencia de configuración](/guia/configurar/configuracion/) — Opciones de la interfaz de colección
