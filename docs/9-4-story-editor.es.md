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

El editor de historias es donde construyes y refinas tus narrativas. Combina un editor de texto, un visor interactivo y herramientas de gestión de pasos en un solo espacio de trabajo — todo lo que necesitas para componer una historia sin editar hojas de cálculo.

Cuando abres una historia desde el [Panel de control](/guia/el-compositor/panel-de-control/), el editor se carga con la tarjeta de título a la izquierda y el visor a la derecha. Cada paso de la historia aparece como una tarjeta en la barra lateral, y al seleccionar un paso se actualizan tanto el editor de texto como el visor para mostrar el contenido de ese paso.

## Tarjeta de título

La tarjeta de título es lo primero que ve el público. Muestra el título, subtítulo y línea de autoría de tu historia.

Para editar la tarjeta de título, haz clic directamente en cualquiera de sus campos. Los cambios se guardan automáticamente a medida que escribes — no hay un botón de guardar aparte. La tarjeta de título es siempre el primer elemento en la barra lateral de pasos.

## Visor IIIF

El lado derecho del editor muestra un visor IIIF interactivo. Cuando un paso hace referencia a un objeto de imagen, puedes desplazar y ampliar para encuadrar la vista exacta que deseas que vea el público.

Para capturar la vista actual de un paso:

1. Navega al paso que deseas configurar
2. Desplaza y amplía el visor hasta que la imagen muestre el encuadre que deseas
3. El Compositor captura las coordenadas actuales de x, y y zoom y las guarda en el paso

Estas coordenadas controlan lo que ve el público cuando llega a ese paso en la historia publicada. Para más información sobre cómo funcionan las coordenadas del visor en Telar, consulta [Historias y paneles](/guia/tu-contenido/historias-y-paneles/).

## Gestión de pasos

La barra lateral lista todos los pasos de tu historia. Aquí puedes reorganizar y modificar la estructura de la historia.

- **Agregar un paso** — Haz clic en el botón de agregar en la parte inferior de la barra lateral para añadir un nuevo paso al final
- **Insertar un paso** — Haz clic en el botón de insertar entre dos pasos existentes para colocar un nuevo paso en esa posición
- **Eliminar un paso** — Elimina un paso y su contenido de la historia
- **Reordenar pasos** — Arrastra un paso por su asa para moverlo a una nueva posición en la secuencia

### Selector de objetos

Cada paso puede mostrar un objeto diferente en el visor. Para cambiar qué objeto muestra un paso, usa el selector de objetos — te permite explorar todos los objetos de tu exhibición y seleccionar uno para el paso actual.

Cuando un paso hace referencia a un objeto de video o audio, la columna del visor muestra el reproductor de medios correspondiente en lugar del visor IIIF. Consulta [Video y audio](/guia/el-compositor/video-y-audio/) para más detalles sobre los pasos multimedia.

## Edición de capas

El panel de texto de cada paso utiliza un editor con vista previa en vivo basado en CodeMirror. Escribes en *markdown* y ves el resultado formateado de inmediato — no necesitas alternar entre modos de edición y vista previa.

### Barra de formato

La barra de herramientas sobre el editor ofrece acceso rápido a las opciones de formato más comunes:

- **Negrita** y **cursiva** — Énfasis y énfasis fuerte
- **Enlace** — Insertar o editar un hipervínculo
- **Imagen** — Insertar una imagen en el texto del panel
- **Encabezados** — Aplicar niveles de encabezado (H2, H3)
- **Listas** — Listas con viñetas y listas numeradas
- **Cita** — Bloques de cita indentados
- **Deshacer** y **Rehacer** — Retroceder o avanzar en las ediciones

### Atajos de teclado

Para editar más rápido, el editor admite atajos de teclado estándar:

| Atajo | Acción |
|---|---|
| Cmd+B (Ctrl+B en Windows/Linux) | Negrita |
| Cmd+I (Ctrl+I en Windows/Linux) | Cursiva |
| Cmd+K (Ctrl+K en Windows/Linux) | Insertar enlace |
| Cmd+Z (Ctrl+Z en Windows/Linux) | Deshacer |

### Inserción de imágenes

Puedes agregar imágenes al texto de tu panel de dos maneras:

- **Desde una URL** — Pega cualquier URL de imagen y el editor la inserta como imagen en *markdown*
- **Desde tus objetos IIIF** — Explora los objetos de tu repositorio y selecciona uno. El Compositor genera la URL correcta automáticamente.

### Pegado enriquecido

Cuando pegas contenido desde otras aplicaciones — como un procesador de texto o una página web — el editor convierte automáticamente el formato HTML a *markdown*. El texto en negrita se mantiene en negrita, los enlaces siguen siendo funcionales y los encabezados conservan sus niveles. Esto facilita trasladar texto existente a los paneles de tu historia.

### Preservación de inserciones

Si pegas un código de inserción de YouTube o Vimeo (una etiqueta `<iframe>`), el editor lo preserva como HTML sin procesar en lugar de convertirlo. Esto te permite insertar reproductores de video directamente en el texto del panel, independientemente de la columna del visor.

## Véase también

- [Panel de control](/guia/el-compositor/panel-de-control/) — Regresa a la vista general del proyecto
- [Video y audio](/guia/el-compositor/video-y-audio/) — Trabajar con pasos de video y audio
- [Publicación](/guia/el-compositor/publicacion/) — Revisar y publicar cambios
- [Historias y paneles](/guia/tu-contenido/historias-y-paneles/) — Cómo funcionan las historias en Telar
- [Contenido enriquecido](/guia/tu-contenido/contenido-enriquecido/) — Referencia de formato *markdown* para texto de paneles
