---
title: Objetos
url: /guia/el-compositor/objetos/
translationKey: docs-the-compositor-objects
type: guide
docs_section: compositor
---

# Objetos {#objetos}

La página de objetos en el Compositor te permite explorar, editar y agregar los elementos visuales que componen tu exhibición. Cada objeto que administras aquí — imágenes, manifiestos IIIF, videos, archivos de audio — se registra en el archivo `objects.csv` de tu repositorio. El Compositor se encarga de ese archivo por ti, así que nunca necesitas editarlo directamente.

## Lista de objetos {#lista-de-objetos}

La lista muestra los objetos con su miniatura, ID, usos y estado. Cada objeto muestra:

- Una **miniatura** de vista previa de la imagen o el medio
- El **título** del objeto
- Un **indicador de estado** que muestra su condición actual

### Indicadores de estado {#indicadores-de-estado}

El estado informa sobre la disponibilidad; no significa que la ficha de catálogo ya esté completamente revisada.

- **Listo** — El objeto tiene título y supera la comprobación de imagen cuando corresponde.
- **Sin metadatos** — Falta el título. Revisa la ficha y completa el título y la información útil de catálogo.
- **Sin teselas** — La imagen aún no está disponible. En archivos alojados por el sitio, revisa el build y las teselas; en fuentes externas, revisa el manifiesto.
- **No está en el repositorio** — La ficha está marcada como ausente del repositorio. Revisa la comparación con GitHub antes de decidir qué conservar.

### Control de destacados {#control-de-destacados}

Puedes marcar cualquier objeto como destacado. Los objetos destacados aparecen de manera prominente en la página de inicio de tu sitio y en la galería de objetos.

Para cambiar el estado de destacado de un objeto, haz clic en el indicador de destacado en la fila del objeto.

{{< media id="objects" >}}

## Editar metadatos {#editar-metadatos}

Selecciona un objeto para abrir su editor de metadatos. Aquí puedes completar o actualizar la información que describe al objeto en tu exhibición.

Los campos de metadatos son:

| Campo | Descripción |
|---|---|
| **Título** | El nombre del objeto como aparece en tu sitio |
| **Creador** | La persona u organización que creó el objeto |
| **Año** | Cuándo se creó o publicó el objeto |
| **Descripción** | Un resumen breve de lo que el objeto muestra o contiene |
| **Fuente** | De dónde proviene el objeto — una colección, archivo o URL |
| **Texto alternativo** | Una descripción para lectores de pantalla y accesibilidad |
| **Género / Medio** | El tipo de objeto — fotografía, pintura, mapa, manuscrito, etc. |

{{< callout "tip" >}}
El texto alternativo es importante para la accesibilidad. Escribe una oración breve y descriptiva que transmita lo que muestra la imagen a quien no puede verla.
{{< /callout >}}

{{< media id="object-metadata" >}}

## Agregar IIIF externo {#agregar-iiif-externo}

1. Abre **Objetos** y pulsa **+ Agregar objeto**.
2. Selecciona **Manifiesto IIIF**.
3. Pega la URL y pulsa **Obtener manifiesto**.
4. Revisa la vista previa, el título, la fuente, el crédito y los demás metadatos disponibles.
5. Pulsa **Agregar objeto**.

Agregar el objeto lo deja disponible en la colección. Debes seleccionarlo por separado en un paso con **Cambiar objeto**.

Sigue [Usar un objeto IIIF en una historia](/guia/el-compositor/iiif-a-historia/) para el ejemplo ilustrado completo del khipu. Consulta [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/) para más contexto.

{{< media id="import" >}}

## Subir imágenes {#subir-imágenes}

Puedes subir tus propias imágenes directamente a través del Compositor. Las imágenes subidas se confirman en tu repositorio y las teselas IIIF se generan automáticamente durante el siguiente *build*.

1. Haz clic en **Agregar objeto** y selecciona la opción de subida
2. Arrastra archivos al área de subida, o haz clic para seleccionar archivos desde tu computador
3. Completa los metadatos mientras se procesa la subida
4. Guarda el objeto en tu proyecto

Los formatos admitidos son JPG, PNG y TIFF, con un tamaño máximo de 25 MB por imagen.

{{< callout "note" >}}
Después de subir, el estado del objeto puede mostrar **Sin teselas** hasta que publiques y el *build* de GitHub Actions genere las teselas IIIF. El objeto sigue siendo utilizable en el Compositor — las teselas estarán disponibles en tu sitio en línea después de que se complete el *build*.
{{< /callout >}}

## Guardar en el repositorio {#guardar-en-el-repositorio}

Cuando guardas cambios en los objetos — ya sea editando metadatos, agregando IIIF o subiendo imágenes — esos cambios se guardan en el borrador del Compositor. Para enviarlos a GitHub, necesitas publicar.

Al publicar se confirma un archivo `objects.csv` actualizado en tu repositorio junto con cualquier imagen subida. Consulta [Publicación](/guia/el-compositor/publicacion/) para el flujo de trabajo completo.

## Sincronización {#sincronización}

Cuando los objetos cambian fuera del Compositor, usa la revisión de **Cambios en GitHub** del proyecto. Lee las diferencias y elige qué versión conservar antes de aplicarlas. Consulta [Sincronización y actualizaciones](/guia/el-compositor/sincronizacion-y-actualizaciones/).

Editar un borrador y publicar son acciones distintas. Revisa las consecuencias para el objeto afectado en vez de volver a importar todo el proyecto.

## Véase también {#véase-también}

- [Inicio y navegación](/guia/el-compositor/panel-de-control/) — Regresa a la vista general del proyecto
- [Objetos](/guia/tu-contenido/objetos/) — Cómo funcionan los objetos en Telar
- [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/) — Información sobre manifiestos IIIF y fuentes
- [Imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) — Cómo las imágenes subidas se convierten en teselas IIIF
