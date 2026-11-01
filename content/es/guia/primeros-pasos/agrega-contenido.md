---
title: Agrega un objeto y una primera historia
url: /guia/primeros-pasos/agrega-contenido/
translationKey: docs-getting-started-add-content
type: guide
docs_section: sheets
---

# Agrega un objeto y una primera historia {#agrega-un-objeto-y-una-primera-historia}

<span class="anchor-alias" id="construye-tu-sitio"></span>

Empieza con un objeto y una secuencia breve. Cuando funcione el recorrido completo, amplíalo con otras fuentes y capas opcionales.

<span class="anchor-alias" id="agrega-paneles-de-detalle"></span>
<span class="anchor-alias" id="agrega-tu-contenido"></span>
<span class="anchor-alias" id="agrega-tus-archivos-multimedia"></span>
## Agrega la fuente {#agrega-la-fuente}

En **objects**, agrega ID, título, dirección de origen y metadatos útiles. Para una fuente IIIF externa, pega el manifiesto en `source_url`.

Si necesitas un ejemplo para practicar:

```text
https://juancobo.com/138la/iiif/khipu/p7/manifest.json
```

Elige el ID `khipu` y un título como “Khipu háptico”. Describe la actividad visible y conserva la información de catálogo y el crédito de la fuente.

Para alojar un archivo propio, súbelo a `telar-content/objects/` en el repositorio, usa su nombre como ID y deja `source_url` vacío. Consulta [las imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) para formatos y procesamiento.

<span class="anchor-alias" id="estructura-tu-historia"></span>
<span class="anchor-alias" id="registra-tus-historias"></span>
<span class="anchor-alias" id="registra-tus-objetos"></span>
## Registra la historia {#registra-la-historia}

En **project**, agrega orden, ID estable y título. Por ejemplo:

| order | story_id | title |
|---|---|---|
| 1 | historia-khipu | Examinando un khipu |

Crea o renombra la pestaña como `historia-khipu`. El ID y la pestaña deben coincidir. Conserva los encabezados de la plantilla.

## Agrega el primer paso {#agrega-el-primer-paso}

Completa una fila:

| Columna | Ejemplo |
|---|---|
| `step` | `1` |
| `object` | `khipu` |
| `x`, `y`, `zoom` | `0.5`, `0.5`, `1` |
| `question` | ¿Qué actividad documenta esta imagen? |
| `answer` | Una toma de muestras de un khipu para datación por radiocarbono en la primavera de 2025. |
| `alt_text` | Manos con guantes trabajan con cuerdas anudadas sobre una superficie blanca. |

Agrega otra fila numerada para la siguiente observación. Puedes volver al mismo objeto con otro encuadre. En objetos de varias páginas, la columna opcional `page` elige primero la página.

Para grabaciones, usa `clip_start` y `clip_end` en segundos y `loop` cuando corresponda. Revisa [video](/guia/tu-contenido/objetos-de-video/) y [audio](/guia/tu-contenido/objetos-de-audio/) antes de elegir un proveedor con otro comportamiento de reproducción.

## Agrega profundidad opcional {#agrega-profundidad-opcional}

Escribe contexto adicional en `layer1_content` y un nombre útil para el botón en `layer1_button`. El segundo panel usa `layer2_content` y se abre desde el primero.

Para textos extensos, referencia un archivo Markdown. Agrega términos en **glossary** e inserta enlaces `[[id-del-termino]]` en los campos que los admiten.

## Genera la primera versión {#genera-la-primera-versión}

Guarda los cambios de la hoja. En el repositorio, abre **Actions**, selecciona **Build and Deploy** y después **Run workflow**. El build descarga la hoja publicada.

Espera a que termine y abre el sitio. Sigue con [los encuadres y la revisión](/guia/primeros-pasos/revisa-y-perfecciona/).
