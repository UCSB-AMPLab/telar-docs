---
layout: docs
title: "9.3. Objetos"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/el-compositor/objetos/
---

# Objetos

La página de objetos en el Compositor te permite explorar, editar y agregar los elementos visuales que componen tu exhibición. Cada objeto que administras aquí — imágenes, manifiestos IIIF, videos, archivos de audio — se registra en el archivo `objects.csv` de tu repositorio. El Compositor se encarga de ese archivo por ti, así que nunca necesitas editarlo directamente.

## Lista de objetos

La lista de objetos muestra todos los objetos de tu exhibición como una cuadrícula de miniaturas. Cada objeto muestra:

- Una **miniatura** de vista previa de la imagen o el medio
- El **título** del objeto
- Un **indicador de estado** que muestra su condición actual

### Indicadores de estado

Los objetos pueden tener uno de tres estados:

- **Ready** — El objeto tiene metadatos y sus teselas (*tiles*) están disponibles. Está listo para usar en historias.
- **No metadata** — El objeto existe pero le falta información clave como título, creador o descripción. Aún puedes usarlo en historias, pero agregar metadatos mejora tu exhibición.
- **Tiles missing** — Las teselas IIIF del objeto aún no se han generado. Esto puede ocurrir con imágenes recién subidas que no se han publicado ni procesado en el *build*.

### Control de destacados

Puedes marcar cualquier objeto como destacado. Los objetos destacados aparecen de manera prominente en la página de inicio de tu sitio y en la galería de objetos.

Para cambiar el estado de destacado de un objeto, haz clic en el indicador de destacado en la tarjeta del objeto.

## Editar metadatos

Selecciona un objeto para abrir su editor de metadatos. Aquí puedes completar o actualizar la información que describe al objeto en tu exhibición.

Los campos de metadatos son:

| Campo | Descripción |
|---|---|
| **Título** | El nombre del objeto como aparece en tu sitio |
| **Creador** | La persona u organización que creó el objeto |
| **Fecha** | Cuándo se creó o publicó el objeto |
| **Descripción** | Un resumen breve de lo que el objeto muestra o contiene |
| **Fuente** | De dónde proviene el objeto — una colección, archivo o URL |
| **Texto alternativo** | Una descripción para lectores de pantalla y accesibilidad |
| **Género / Medio** | El tipo de objeto — fotografía, pintura, mapa, manuscrito, etc. |

{: .tip }
> El texto alternativo es importante para la accesibilidad. Escribe una oración breve y descriptiva que transmita lo que muestra la imagen a quien no puede verla.

## Agregar IIIF externo

Puedes agregar objetos de museos, bibliotecas y otras instituciones que publican manifiestos IIIF. El Compositor obtiene la imagen y los metadatos automáticamente.

1. Haz clic en **Add Object** y selecciona la opción IIIF
2. Pega la URL del manifiesto en el campo
3. El Compositor recupera la imagen y completa los metadatos disponibles (título, creador, descripción)
4. Revisa y ajusta los metadatos según sea necesario
5. Guarda el objeto

{: .note }
> Para encontrar manifiestos IIIF, busca el logo de IIIF en los sitios web de museos y bibliotecas, o consulta la [guía de IIIF para encontrar recursos](https://iiif.io/guides/finding_resources/). Para más información sobre IIIF en Telar, consulta [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/).

## Subir imágenes

Puedes subir tus propias imágenes directamente a través del Compositor. Las imágenes subidas se confirman en tu repositorio y las teselas IIIF se generan automáticamente durante el siguiente *build*.

1. Haz clic en **Add Object** y selecciona la opción de subida
2. Arrastra archivos al área de subida, o haz clic para seleccionar archivos desde tu computador
3. Completa los metadatos mientras se procesa la subida
4. Guarda el objeto en tu proyecto

Los formatos admitidos son JPG, PNG y TIFF, con un tamaño máximo de 25 MB por imagen.

{: .note }
> Después de subir, el estado del objeto puede mostrar **Tiles missing** hasta que publiques y el *build* de GitHub Actions genere las teselas IIIF. El objeto sigue siendo utilizable en el Compositor — las teselas estarán disponibles en tu sitio en línea después de que se complete el *build*.

## Guardar en el repositorio

Cuando guardas cambios en los objetos — ya sea editando metadatos, agregando IIIF o subiendo imágenes — esos cambios se almacenan localmente en el Compositor. Para enviarlos a GitHub, necesitas publicar.

Al publicar se confirma un archivo `objects.csv` actualizado en tu repositorio junto con cualquier imagen subida. Consulta [Publicación](/guia/el-compositor/publicacion/) para el flujo de trabajo completo.

## Sincronización

Si se agregaron o cambiaron objetos fuera del Compositor — por ejemplo, al editar `objects.csv` directamente o subir imágenes a través de GitHub — puedes reescanear tu repositorio para detectar esos cambios.

1. Haz clic en el botón **Sync**
2. El Compositor relee tu repositorio y actualiza la lista de objetos

{: .warning }
> Si tienes cambios sin publicar en el Compositor, la sincronización puede sobrescribirlos con el estado actual del repositorio. Publica tus cambios primero, o revisa con cuidado antes de sincronizar.

## Véase también

- [Panel de control](/guia/el-compositor/panel-de-control/) — Regresa a la vista general del proyecto
- [Objetos](/guia/tu-contenido/objetos/) — Cómo funcionan los objetos en Telar
- [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/) — Información sobre manifiestos IIIF y fuentes
- [Imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) — Cómo las imágenes subidas se convierten en teselas IIIF
