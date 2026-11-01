---
layout: docs
title: "Edita objetos, historias y textos"
lang: es
permalink: /guia/autoria-local/contenido/
docs_section: local
en_url: /docs/local-authoring/content/
es_url: /guia/autoria-local/contenido/
docs_draft: true
---

# Edita objetos, historias y textos

El contenido editable está en `telar-content/`. Los JSON generados, las colecciones y `_site/` son resultados del build: los cambios hechos solo allí desaparecen al volver a generar.

## Ubica los archivos fuente

| Ubicación | Qué editas |
|---|---|
| `telar-content/spreadsheets/` | Catálogo de objetos, lista de historias, pasos y glosario en CSV |
| `telar-content/objects/` | Imágenes, PDF y audio alojados por el sitio |
| `telar-content/texts/stories/` | Textos de paneles referenciados desde los pasos |
| `telar-content/texts/glossary/` | Archivos de texto del glosario, cuando se utilizan |
| `_config.yml` | Identidad y configuración del sitio |
| `_data/navigation.yml` | Menú público |

## Registra un objeto

Para un archivo local, usa un nombre sencillo como `khipu.jpg` y guárdalo en la carpeta de objetos. Haz corresponder ese nombre con el ID.

Para un objeto IIIF externo, agrega el manifiesto en `source_url`. No necesitas descargar la imagen. Ejemplo mínimo de `objects.csv`:

```csv
object_id,title,source_url,alt_text
khipu,Khipu háptico,https://juancobo.com/138la/iiif/khipu/p7/manifest.json,Manos con guantes trabajan con cuerdas anudadas sobre una superficie blanca
```

Completa la ficha y los créditos en las demás columnas. La referencia de [columnas de objetos](/guia/tus-datos/csv-objetos/) explica el formato completo.

{% include docs/media.html id="public-object" %}

## Conecta una historia y sus pasos

Agrega la historia en `project.csv`:

```csv
order,story_id,title
1,historia-khipu,Examinando un khipu
```

Crea `historia-khipu.csv` en la misma carpeta. El nombre corresponde al ID:

```csv
step,object,x,y,zoom,question,answer
1,khipu,0.5,0.5,1,¿Qué actividad muestra?,La fotografía documenta una toma de muestras para datación por radiocarbono.
```

Usa la herramienta de coordenadas del objeto para ajustar la vista. Otro paso puede volver al mismo objeto con un encuadre distinto. Numera los pasos en orden.

## Agrega paneles y enlaces al glosario

Usa `layer1_content` y `layer2_content` para texto directo o una ruta de Markdown relativa a la carpeta de textos de historias. Describe lo que se abre con las columnas de botones.

Las definiciones pueden estar en `glossary.csv`; enlázalas con `[[id-del-termino]]`. Consulta [las columnas de historias](/guia/tus-datos/csv-historias/) y [del glosario](/guia/tus-datos/csv-glosario/) antes de agregar contenido más complejo.

Sigue con [la generación y revisión](/guia/autoria-local/vista-previa/).
