---
layout: docs
title: "9.4. Editor de historias"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/el-compositor/editor-historias/
---

# Editor de historias

Abre una historia desde **Historias** para escribir sus preguntas, respuestas breves y paneles opcionales. El editor reúne el esquema narrativo, los textos editables y la vista que tendrán tus visitantes.

La barra lateral usa un **cuadrado** para la portada, **círculos** para los pasos y un **triángulo hacia arriba** para el último paso. El primer panel se desprende de su paso; el segundo se desprende del primero.

<span class="anchor-alias" id="tarjeta-de-título" aria-hidden="true"></span>

{% include docs/media.html id="editor-overview" %}

## Portada

Selecciona la portada en la parte superior del esquema. Haz clic en el título, el subtítulo o la firma, o en el icono de edición correspondiente, para cambiar el campo. Tus cambios se guardan mientras trabajas.

<span class="anchor-alias" id="selector-de-objetos" aria-hidden="true"></span>

## Visor IIIF

Selecciona un paso con imagen y usa **Cambiar objeto** para elegir su fuente. Desplaza la imagen y ajusta el zoom hasta el detalle que quieras mostrar.

Para guardar la vista:

1. Selecciona el paso.
2. Desplaza la imagen y ajusta el zoom al encuadre deseado.
3. Pulsa **Capturar posición**.
4. Comprueba la confirmación **Capturada**.
5. Pasa a la portada o a otro paso; después, regresa y revisa el encuadre guardado.

{: .note }
> Mover la imagen y ajustar el zoom te permite explorar el objeto. **Capturar posición** guarda el encuadre del paso seleccionado. Vuelve a capturarlo si cambias la vista que quieres conservar.

{% include docs/media.html id="framing" %}

Las guías indican el marco y el centro de la vista. El límite del texto ayuda a ver cuánto de la respuesta breve cabe en la tarjeta pública.

## Gestión de pasos

- **+ Agregar paso** crea un paso. Si el diálogo ofrece el objeto anterior, puedes conservarlo o elegir otro.
- **Cambiar objeto** selecciona otra fuente para el paso actual.
- Arrastra un paso desde su control de orden para cambiar su posición.
- Usa el control de eliminación y lee la confirmación antes de quitar un paso.
- **Agregar título de sección** inserta un encabezado para agrupar partes de la historia.

Escribe una pregunta y una respuesta breve en cada tarjeta. Haz clic en el texto o en su icono de edición. El campo de respuesta acepta Markdown; haz clic fuera para revisar el texto con formato.

Los pasos de video y audio tienen controles de medios en lugar del visor de imágenes. Consulta [Video y audio](/guia/el-compositor/video-y-audio/).

## Edición de capas

Pulsa **+ Agregar panel** en la tarjeta de un paso o abre un panel existente con su botón. Edita el título y el contenido directamente desde el texto o los iconos de edición. El primer panel puede ofrecer un botón para abrir un segundo panel.

Mantén breve la respuesta principal. Usa los paneles para el contexto, la evidencia y los matices que una persona pueda elegir explorar.

{% include docs/media.html id="panels" %}

### Barra de formato

Al editar el contenido de un panel, usa los controles de formato o escribe Markdown directamente. Revisa el panel con formato al terminar. Consulta [Sintaxis de Markdown](/guia/tu-contenido/sintaxis-markdown/) y [Contenido enriquecido](/guia/tu-contenido/contenido-enriquecido/).

{% include docs/media.html id="panel-editor" %}

### Atajos de teclado

Los atajos dependen del campo que tenga el foco. Mantén el foco en el editor de texto al aplicar un comando de formato. Usa la barra de herramientas si no sabes qué comando está disponible.

### Inserción de imágenes

Usa los controles de imágenes del editor de paneles y completa los datos que solicite el diálogo. Una imagen dentro del panel hace parte de la explicación; la fuente principal del paso se elige por separado con **Cambiar objeto**.

<span class="anchor-alias" id="pegado-enriquecido" aria-hidden="true"></span>

### Pegado con formato

Al traer texto de otra aplicación, revisa el formato, los enlaces y el espaciado del panel antes de publicar.

<span class="anchor-alias" id="preservación-de-inserciones" aria-hidden="true"></span>

### Conservación de inserciones

Para agregar medios y contenido interactivo dentro de los paneles, sigue [Contenido enriquecido](/guia/tu-contenido/contenido-enriquecido/) y [Widgets](/guia/tu-contenido/widgets/). Revisa el resultado publicado además de la vista del editor.

## Véase también

- [Usar un objeto IIIF en una historia](/guia/el-compositor/iiif-a-historia/)
- [Inicio y navegación](/guia/el-compositor/panel-de-control/)
- [Video y audio](/guia/el-compositor/video-y-audio/)
- [Publicación](/guia/el-compositor/publicacion/)
