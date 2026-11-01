---
title: Entiende la hoja de cálculo
url: /guia/tus-datos/google-sheets/
translationKey: docs-your-data-google-sheets
type: guide
docs_section: sheets
---

# Entiende la hoja de cálculo {#entiende-la-hoja-de-cálculo}

<span class="anchor-alias" id="véase-también"></span>

<span class="anchor-alias" id="solución-de-problemas"></span>

<span class="anchor-alias" id="referencia-de-columnas-resumen"></span>

<span class="anchor-alias" id="obtener-datos-solo-desarrollo-local"></span>

<span class="anchor-alias" id="integración-con-google-sheets"></span>

<span class="anchor-alias" id="inicio-rápido"></span>

<span class="anchor-alias" id="configurar-_configyml"></span>

Tu hoja de Google Sheets es la fuente de una versión generada de la exhibición. Editar una celda no cambia inmediatamente el sitio público: el siguiente build descarga y procesa la hoja publicada.

## Cómo se conectan las pestañas {#cómo-se-conectan-las-pestañas}

| Pestaña | Función | Relación |
|---|---|---|
| `project` | Enumera historias y su orden | `story_id` identifica la pestaña de una historia |
| `objects` | Describe la colección compartida | `object_id` se usa en los pasos |
| Una pestaña por historia | Enumera pasos, vistas, preguntas y paneles | `object` corresponde al ID de un objeto |
| `glossary` | Define términos recurrentes | `term_id` se usa en enlaces del texto |

La plantilla incluye instrucciones y encabezados bilingües. Conserva los nombres de columnas que procesa Telar. Se ignoran las filas o columnas que comienzan con `#`.

## Empieza con la plantilla {#empieza-con-la-plantilla}

Usa la plantilla enlazada en [la configuración guiada](/guia/primeros-pasos/google-sheets/). Haz tu propia copia y publícala mediante **Archivo → Compartir → Publicar en la Web**.

El enlace de edición es distinto del publicado. La configuración necesita este último:

```yaml
google_sheets:
  enabled: true
  published_url: "URL-PUBLICADA-DE-TU-HOJA"
```

Publica las pestañas que necesita Telar. No pongas notas confidenciales en contenido publicado en la web.

## Mantén IDs consistentes {#mantén-ids-consistentes}

Usa IDs breves y estables, en minúsculas y con guiones. El ID de historia debe coincidir con su pestaña. La referencia de un objeto debe coincidir con su ID en `objects`. Un enlace al glosario debe corresponder al ID del término.

Los títulos pueden cambiar sin alterar estas relaciones. Si cambias un ID, actualiza sus referencias.

## Usa texto y referencias a archivos {#usa-texto-y-referencias-a-archivos}

Puedes escribir un panel breve en `layer1_content` o `layer2_content`. Usa Markdown para el formato. Una ruta terminada en `.md` puede referirse a un texto más extenso en la carpeta de textos de historias del repositorio.

Las respuestas son prosa breve y sin formato enriquecido. Los paneles sirven para ampliar el contexto. Consulta los campos en [columnas de historias](/guia/tus-datos/csv-historias/).

<span class="anchor-alias" id="estructura-de-la-hoja"></span>
## Elige la hoja como fuente {#elige-la-hoja-como-fuente}

Si pasas al Compositor, revisa la importación y cambia deliberadamente la fuente de contenido. El Compositor no devuelve tus ediciones visuales a Google Sheets. Si dejas Sheets activo, un build posterior puede reemplazarlas con el contenido de la hoja.

En trabajo local, `python3 scripts/build_local_site.py` descarga Sheets cuando está activo. Los CSV de `telar-content/spreadsheets/` son copias descargadas; edita la hoja si esa es tu fuente.

Sigue con [un objeto y tu primera historia](/guia/primeros-pasos/agrega-contenido/).
