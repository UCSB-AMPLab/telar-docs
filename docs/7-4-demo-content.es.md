---
layout: docs
title: "7.4. Contenido de demostración"
parent: "7. Personalización"
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/personalizacion/contenido-demostracion/
---

# Contenido de demostración

El contenido de demostración agrega a tu sitio dos historias de ejemplo terminadas. Con ellas puedes ver, antes de escribir la tuya, cómo se arma una historia en Telar y cómo funciona.

## ¿Qué es el contenido de demostración?

Es un conjunto de historias de ejemplo, junto con los objetos y las entradas del glosario que usan. Cada vez que se construye el sitio, Telar lo descarga de [content.telar.org](https://content.telar.org) y lo suma a tu propio contenido. Nunca se guarda en tu repositorio, así que, cuando lo desactivas, el siguiente *build* ya no lo incluye.

El contenido de demostración lleva una marca en todos los lugares donde aparece, de modo que siempre puedes distinguirlo de tu propio trabajo.

## Las historias de demostración

El sitio recibe dos historias, en su mismo idioma:

| Título en inglés | Título en español | Pasos | Qué muestra |
|------------------|-------------------|-------|-------------|
| The Allegorical Woman | La mujer alegórica | 10 | Una historia sencilla, centrada en una sola imagen |
| Colonial Landscapes | Paisajes coloniales | 22 | Una historia más larga, con capítulos, paneles y fuentes primarias |

### La mujer alegórica

Esta historia, de Natalie Cobo, recorre los detalles de *Aspecto Symbólico del Mundo Hispánico*, un grabado de 1761 de Laureano Atlas que se conserva en la Princeton University Library. En ella se ven:

- pasos que recorren una sola imagen y amplían un detalle a la vez
- una imagen IIIF (se pronuncia "triple i efe") que viene directamente de la institución que la conserva, la Princeton University Library, y no de content.telar.org
- un paso que cambia a una segunda imagen, el frontispicio del *Leviatán* de Hobbes
- paneles de capa, con un paso que tiene también una segunda capa
- enlaces a entradas del glosario desde el texto de la historia

El primer paso enlaza a la hoja de cálculo de la historia en Google Sheets, para que puedas comparar cada fila con el paso que produce.

### Paisajes coloniales

Esta historia es una selección de *Paisajes Coloniales*, un proyecto de Santiago Muñoz, Adelaida Ávila y María Alejandra Orduz Avella. Gira en torno a una pintura de 1614 de la Sabana de Bogotá, hecha para un pleito y conservada en el Archivo General de Indias, en Sevilla.

La historia tiene:

- un primer paso que presenta el proyecto original y enlaza a él, y un último paso que repite ese enlace
- cuatro capítulos, cada uno con una tarjeta de título al comienzo: "Una pintura de la Sabana", "Pueblos para los indios", "De terrazas a pastizales" y "Un paisaje dividido"
- un panel de capa en casi todos los demás pasos, con el texto más extenso, los carruseles de imágenes y los recuadros que remiten a las fuentes primarias

Cada fuente primaria es una entrada del glosario: al hacer clic en su recuadro, la entrada se abre en un panel. Muchas de esas entradas terminan con un enlace **Ver documento completo**, que lleva a la página del objeto correspondiente; dos paneles enlazan a documentos de la misma manera. La pintura y los nueve documentos vienen de content.telar.org como imágenes IIIF. Cinco de los documentos tienen varias páginas, y en la página de objeto de cada uno se puede pasar de una a otra.

El glosario incluye además varias palabras clave y una persona, así que la página del glosario agrupa sus entradas en **Palabras clave**, **Fuentes primarias** y **Personas y entidades**.

## Activar o desactivar el contenido de demostración

Un solo ajuste de `_config.yml` controla el contenido de demostración. En un sitio de Telar nuevo viene activado.

Para cambiarlo:

1. Abre `_config.yml`
2. Busca la sección `story_interface`
3. Pon `include_demo_content` en `true` para mostrar las historias de demostración, o en `false` para ocultarlas:

   ```yaml
   story_interface:
     include_demo_content: true
   ```

4. Haz commit del cambio

GitHub Actions vuelve a construir el sitio, y el cambio se ve en cuanto termina. Si construyes el sitio en tu computador, ejecuta `python3 scripts/csv_to_json.py` y `python3 scripts/generate_collections.py` (o `python3 scripts/build_local_site.py`, que ejecuta ambos) y después Jekyll. Consulta [Desarrollo local](/guia/primeros-pasos/desarrollo-local/).

{: .tip }
> **Conserva las demostraciones mientras aprendes**
> Mientras escribes tu primera historia, vale la pena tener a mano las historias de demostración, al lado de la tuya. Desactívalas antes de compartir el sitio.

## Dónde aparece el contenido de demostración

El contenido de demostración aparece en los mismos lugares que tu propio contenido, con una marca:

| Dónde | Qué ves |
|-------|---------|
| Página de inicio | Las historias de demostración, antes de las tuyas, con una insignia **DEMO** |
| Tarjeta de inicio de la historia | Una etiqueta **Contenido de demostración** encima del título de la historia |
| Paneles de capa | Una insignia **Contenido de demostración** junto al título del panel |
| Página de objetos | Los objetos de demostración, después de los tuyos, con una insignia **DEMO** |
| Página de un objeto | Una etiqueta **Contenido de demostración** encima del título del objeto |
| Página del glosario | Una insignia **DEMO** junto a cada entrada de demostración |
| Página de una entrada del glosario | Una insignia **Contenido de demostración** junto al título de la entrada |

En un sitio en inglés, las marcas dicen **DEMO** y **Demo content**.

## Idioma

El contenido de demostración sigue el idioma del sitio, que se define con `telar_language` en `_config.yml`:

| Tu configuración | Contenido de demostración que recibes |
|------------------|---------------------------------------|
| `telar_language: "en"` | Historias, objetos y glosario en inglés |
| `telar_language: "es"` | Historias, objetos y glosario en español |

Con cualquier otro valor se recibe el contenido de demostración en inglés. Si cambias el idioma del sitio, el siguiente *build* descarga el contenido de demostración en el idioma nuevo.

## El contenido de demostración y tu propio contenido

El contenido de demostración se suma al tuyo durante el *build* y nunca reemplaza nada de lo que tienes:

| | Tu contenido | Contenido de demostración |
|---|---|---|
| Dónde está | En tu repositorio | Se descarga en cada *build*; no se guarda en tu repositorio |
| ¿Se puede editar? | Sí | No |
| Marca | Ninguna | Insignia **DEMO** o etiqueta **Contenido de demostración** |
| Mismo identificador de objeto que uno tuyo | — | Se conserva tu objeto y se omite el de demostración |
| Mismo identificador de entrada del glosario que uno tuyo | — | Se conserva tu entrada y se omite la de demostración |

Todos los identificadores de los objetos y de las entradas del glosario de demostración empiezan con `demo-`, así que normalmente no coinciden con los tuyos.

## Usar las demostraciones como modelo

Las historias de demostración están escritas en el mismo formato de hoja de cálculo que tus historias. Los archivos de origen están publicados en el [repositorio de contenido de demostración](https://github.com/UCSB-AMPLab/demo-content) en GitHub, en `demos/v1.8.0/es/` y `demos/v1.8.0/en/`:

- `demo-project.csv`: las filas de las dos historias en la hoja del proyecto
- `demo-objects.csv`: los objetos
- `mujer-alegorica.csv` y `paisajes.csv` (`allegorical-woman.csv` y `colonial-landscapes.csv` en inglés): los pasos de las historias
- `glosario.csv` (`glossary.csv` en inglés): las entradas del glosario, con la columna `tipo` (`kind` en inglés), que indica cuáles entradas son fuentes y cuáles son personas
- `texts/stories/`: los archivos Markdown de los paneles de Paisajes coloniales

Para ver cómo se refleja en la página la estructura de una historia, compara las filas de `paisajes.csv` con la historia en tu sitio: las filas con la columna `objeto` vacía son las tarjetas de título de los capítulos.

## Solución de problemas

### No aparecen las historias de demostración

Si activaste el contenido de demostración y las historias no aparecen:

1. Verifica que `include_demo_content: true` esté dentro de la sección `story_interface` de `_config.yml`
2. Comprueba en la pestaña **Actions** de tu repositorio que el *build* haya terminado
3. Abre el registro del *build*, despliega el paso **Convert CSV to JSON** y busca las líneas que empiezan con **Telar Demo Content Fetcher**
4. Haz una recarga forzada de la página (Ctrl+Shift+R en Windows o Linux, Cmd+Shift+R en Mac)

### No se pudo descargar el contenido de demostración

Si content.telar.org no responde o la descarga falla, el registro del *build* avisa que el sitio se construirá sin las demostraciones, y el *build* continúa. Tu contenido se publica como siempre, sin las historias de demostración. El siguiente *build* vuelve a intentarlo.

### El contenido de demostración está en otro idioma

Revisa `telar_language` en `_config.yml`. Debe ser `"en"` o `"es"`; con cualquier otro valor se recibe el contenido de demostración en inglés.
