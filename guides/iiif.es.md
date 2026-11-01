---
layout: docs
title: Usar un objeto IIIF en una historia
lang: es
permalink: /guia/el-compositor/iiif-a-historia/
docs_section: compositor
en_url: /docs/the-compositor/iiif-to-story/
es_url: /guia/el-compositor/iiif-a-historia/
---
# Usar un objeto IIIF en una historia

<p class="lede">Conecta una imagen alojada en otra colección con tu exhibición, úsala en un paso y captura el encuadre que quieres mostrar al público.</p>

<div class="manual-meta"><span>Antes de empezar: un sitio y una historia que puedas editar</span><span>Ejemplo: el manifiesto IIIF de un khipu</span></div>

<p>Si el khipu ya está en tu colección, puedes ir directamente a <a href="#elegir">Úsalo en un paso</a>.</p>

<div class="manual-note"><p><strong>Tres acciones distintas:</strong> agregar un objeto lo deja disponible en el Compositor. Elegirlo en un paso lo incorpora a tu historia. Publicar envía tus cambios al repositorio para que el sitio se vuelva a construir.</p></div>

<nav class="manual-toc" aria-label="En esta página"><strong>En esta guía</strong><ol>
<li><a href="#abrir">Abre la ventana de importación</a></li><li><a href="#obtener">Obtén el manifiesto</a></li><li><a href="#metadatos">Revisa el objeto</a></li><li><a href="#elegir">Úsalo en un paso</a></li><li><a href="#encuadrar">Captura el encuadre</a></li><li><a href="#contexto">Agrega contexto</a></li><li><a href="#publicar">Publica y comprueba</a></li><li><a href="#problemas">Si algo no funciona</a></li>
</ol></nav>

## 1. Abre la ventana de importación {#abrir}

Abre **Objetos**, pulsa **+ Agregar objeto** y elige **Manifiesto IIIF**.

Un manifiesto IIIF describe un objeto e indica al visor dónde cargar sus imágenes. Usa la dirección del manifiesto que proporciona la colección.

## 2. Obtén el manifiesto {#obtener}

Pega este ejemplo en **URL del manifiesto IIIF** y pulsa **Obtener manifiesto**.

<pre class="manifest-code" id="manifest-url">https://juancobo.com/138la/iiif/khipu/p7/manifest.json</pre>
<button class="copy-button" type="button" data-copy="manifest-url">Copiar URL del manifiesto</button>



Espera a que aparezca la vista previa. Este ejemplo lleva el título “Haptic khipu — Taking a sample from the khipu for radio-carbon dating, Spring 2025”.

## 3. Revisa el objeto {#metadatos}

Revisa **Título**, **Creador**, **Año**, **Descripción**, **Fuente** y **Crédito**. Es posible que el proveedor incluya solo algunos datos. Conserva la información de fuente y crédito, y completa lo que falte con información de catálogo confiable.

Desplázate dentro de la ventana para revisar los demás campos.

El idioma de la interfaz no traduce los metadatos del manifiesto. Puedes revisar su redacción para tu exhibición.

{% include docs/media.html id="import" %}

Pulsa **Agregar objeto**. El objeto debe aparecer en tu colección. Abre su ficha para comprobar la imagen y agregar una **Descripción para accesibilidad**.



## 4. Úsalo en un paso {#elegir}

1. Abre **Historias** y elige la historia que vas a editar.
2. Pulsa **+ Agregar paso**.
3. Si aparece la opción de conservar el objeto anterior, elige **Elegir otro objeto**.
4. Selecciona el khipu en el selector de objetos. También puedes usar **Cambiar objeto** en un paso existente.

El paso debe mostrar la imagen importada. Escribe una pregunta y una respuesta breve. Para este ejercicio puedes usar:

**Pregunta:** ¿Qué actividad se documenta en esta imagen?

**Respuesta:** Una toma de muestra de un khipu para datación por radiocarbono, en la primavera de 2025.

Estas frases describen el ejemplo. Tu propia historia debe desarrollar las preguntas que quieres explorar con el público.

{% include docs/media.html id="editor-overview" %}

## 5. Captura el encuadre {#encuadrar}

1. Desplaza y amplía la imagen hasta mostrar el detalle que quieres presentar.
2. Usa las guías de encuadre para comprender el área que conservará el paso.
3. Pulsa **Capturar posición**.
4. Comprueba que el control confirme **Capturada**.

<div class="manual-note"><p><strong>Captura después de encuadrar.</strong> Mover el visor te permite explorar el objeto. Capturar posición guarda la vista de este paso. Vuelve a capturarla si cambias el encuadre que quieres conservar.</p></div>

Pasa a otro paso y regresa. Comprueba que se haya conservado el encuadre que elegiste.

{% include docs/media.html id="framing" %}

## 6. Agrega contexto {#contexto}

En la tarjeta del paso, pulsa **+ Agregar panel**. Si el paso ya tiene un panel, ábrelo con el botón correspondiente. Usa los iconos de edición del título y del texto del panel para escribir su contenido.

Por ejemplo, explica cómo la imagen ayuda a explorar tu pregunta y enlaza la fuente del objeto.

Mantén la respuesta breve legible en la tarjeta del paso. Usa los paneles para los detalles que ayudan a comprender la evidencia.

## 7. Publica y comprueba {#publicar}

Abre **Publicar** y revisa los cambios. Corrige los errores que bloqueen la publicación y revisa las advertencias antes de publicar.

Cuando termine la construcción del sitio, abre la historia publicada y comprueba que:

- El nuevo paso muestre el objeto correcto.
- El encuadre muestre el detalle que capturaste.
- La pregunta, la respuesta y el panel se lean correctamente.
- La fuente, el crédito y la descripción para accesibilidad del objeto sean adecuados.

## Si algo no funciona {#problemas}

**El manifiesto no carga.** Revisa la dirección completa e intenta abrirla en un navegador. La dirección debe devolver un manifiesto IIIF. Una página de catálogo o un archivo de imagen son recursos distintos.

**Faltan metadatos.** Revisa el catálogo de la colección y completa los campos correspondientes. Los datos importados dependen de lo que incluya el proveedor.

**La imagen aparece en Objetos, pero no en la historia.** Abre el paso y comprueba qué objeto tiene seleccionado.

**El encuadre publicado es distinto.** Vuelve a encuadrar el paso, pulsa **Capturar posición**, publica y comprueba que la construcción termine.

**El sitio en línea todavía muestra el contenido anterior.** Revisa el estado de la publicación y de la construcción. Editar el borrador y publicarlo son operaciones distintas.

<p><a href="/manual/review/">Revisar el guion propuesto y sus textos exactos →</a></p>
