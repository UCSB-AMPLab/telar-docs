---
layout: docs
title: "8.7. Vocabulario del motor de historias"
parent: "8. Para desarrolladores"
grand_parent: Documentación
nav_order: 7
lang: es
permalink: /guia/desarrolladores/motor-de-historias/
---

# Vocabulario del motor de historias

El motor de historias es el código que hace funcionar la página de una historia: ubica las tarjetas y el objeto, mueve la historia entre pasos y decide qué se mantiene cargado. Está en `assets/js/telar-story/` y se empaqueta en `assets/js/telar-story.js`. Esta página define los términos que usan el código, sus comentarios y esta documentación para las partes de una historia y para sus movimientos, de modo que cada término nombre una sola cosa.

Las clases de CSS, los atributos `data-*` y el ajuste `max_viewer_cards` conservan sus nombres anteriores, porque los sitios y el Compositor los leen. Cuando un nombre anterior no coincide con un término de esta página, la entrada lo indica.

## Las partes de una historia

Una historia se arma con estas partes:

- **Paso**: una fila de la hoja de cálculo de una historia, con una pregunta, una respuesta y un encuadre.
- **Escena**: los pasos consecutivos sobre un mismo objeto. En pantalla, una escena es una lámina con su pila de tarjetas encima, y sube sobre la escena anterior como una sola pieza. Si la historia vuelve más adelante a un objeto, empieza una escena nueva.
- **Lámina**: la parte de la escena que ocupa toda la ventana y muestra el objeto. Una lámina de imagen tiene un visor; una de video o de audio tiene un reproductor.
- **Pila de tarjetas**: las tarjetas de texto de una escena, con la más reciente encima y las anteriores asomándose por arriba. Cada tarjeta pertenece a su escena y se mueve con la lámina de esa escena. El módulo que la construye es `card-pool.js`.
- **Tarjeta de texto**: la tarjeta con la pregunta y la respuesta de un paso.
- **Tarjeta de título**: un paso sin objeto, que puede ser el título de la historia o el encabezado de una sección.
- **Visor**: el visor de imágenes (OpenSeadragon) de una lámina de imagen.
- **Reproductor**: el reproductor de video o de audio de una lámina de medios.

## Cómo se avanza entre pasos

Estos términos describen lo que pasa cuando quien lee avanza de un paso al siguiente:

- **Encuadre**: los valores `x`, `y` y `zoom` que se fijaron para un paso al escribir la historia, en cualquier tipo de lámina.
- **Cámara**: lo que muestra el visor de una lámina de imagen en un momento dado. Solo las imágenes tienen cámara.
- **Movimiento**: una transición entre dos pasos. El desplazamiento, la cámara, las tarjetas y las láminas comparten una misma duración, que crece con el recorrido de la cámara: `max(1.2, min(3, 1.33 × S))` segundos, donde S es la longitud del recorrido de zoom y panorámica de la cámara entre los dos encuadres (`camera-travel.js`). Un movimiento sin recorrido de cámara dura los 1,2 segundos de base, igual que los saltos desde el índice o desde un enlace.
- **El desplazamiento de quien lee**: lo que hace quien lee con la rueda del mouse, el panel táctil o el dedo.
- **Arrastre**: el estado en el que el desplazamiento de quien lee mueve la historia. La página lleva la clase `is-scrubbing`.
- **Anclaje**: el motor termina un gesto que se detuvo entre dos pasos y lleva la historia al más cercano.
- **Permanencia**: la pausa al final de un movimiento, cuando la historia ya llegó al paso.
- **Acomodarse**: dicho de las tarjetas, tomar su lugar para un paso.
- **Reposo**: el estado de la cámara o del desplazamiento cuando no se mueven.

Para hacer pruebas, la duración de los movimientos se puede ajustar con el parámetro de URL `?nav=base,perUnit,maxSeconds`. Con `?nav=1.2,0`, todos los movimientos duran los 1,2 segundos de base, sin importar el recorrido de la cámara.

## Diseños

La página de una historia usa uno de estos dos diseños:

- **Diseño horizontal**: la tarjeta de texto va al lado de la lámina, como tarjeta lateral, y quien lee avanza con la navegación por desplazamiento.
- **Diseño vertical**: quien lee avanza con la navegación por botones, y la tarjeta de texto va debajo de la lámina, como tarjeta inferior, o a su lado, como tarjeta lateral de poca altura.

La página usa el diseño vertical cuando la ventana cumple alguna de estas condiciones:

- Mide 1024 px de ancho o menos.
- Su relación de aspecto es de 3:4 o más angosta, como la de una tableta en orientación vertical.
- Mide 480 px de alto o menos.
- Mide entre 481 px y 632 px de alto y es demasiado angosta para la tarjeta lateral que esa altura requiere. Estas ventanas se generan en tramos de 8 px y se publican en `--telar-vertical-short-windows`.

Los términos para las tarjetas y el espacio que las rodea:

- **Tarjeta lateral**: la tarjeta de texto al lado de la lámina en el diseño horizontal. Su ancho depende de la altura de la ventana y se mantiene entre el 37 % y el 52 % del ancho de la ventana: `min(0.52W, max(0.37W, min(718, 1544 − 1.6H)))`, redondeado al píxel.
- **Tarjeta inferior**: la tarjeta debajo de la lámina en el diseño vertical.
- **Tarjeta lateral de poca altura**: en el diseño vertical, en una ventana de 480 px de alto o menos (un teléfono en orientación horizontal o una ventana de escritorio así de baja), la tarjeta va al lado de la lámina y el navegador la desplaza. El código la detecta con `isPhoneHeightSideCard()`, en `layout-mode.js`. El umbral es `--telar-card-landscape-max-height`, que conserva su nombre anterior.
- **Tamaño de letra compacto**: letra más pequeña y espaciado más ajustado en cualquier ventana de 600 px de alto o menos, sea cual sea su ancho.
- **Franja superior**: la franja bajo los controles superiores; las tarjetas se ubican por debajo de ella.
- **Tope de altura**: la altura máxima que puede tener una tarjeta lateral.
- **Navegación por botones**: los botones de anterior y siguiente mueven la historia un paso a la vez. Funciona en el diseño vertical, en las historias insertadas y, en iOS, en los dos diseños. Sus botones conservan la clase `.mobile-nav`.
- **Navegación por desplazamiento**: el desplazamiento de quien lee mueve la historia. Funciona en el diseño horizontal en todos los sistemas menos iOS.

## Lo que se mantiene cargado

El motor mantiene cargada una cantidad limitada de objetos, para que una historia larga no tenga en memoria todas sus imágenes y reproductores:

- **Grupo de visores**: los visores cargados. El tope es `max_viewer_cards` en `_config.yml` (8 por defecto, 15 como máximo); al superarlo, se descarga el visor de la lámina más alejada del paso actual. El ajuste indica la cantidad máxima de escenas cuyo visor se mantiene cargado.
- **Grupo de reproductores**: los reproductores de medios cargados, con un tope de tres de video y tres de audio, que se descargan de la misma manera.

En el motor, "grupo" solo se usa en estos dos sentidos.

## Apilamiento

Las tarjetas y la lámina de cada escena usan su propio bloque de valores de `z-index`, su **rango de `z-index`**, para que una escena posterior cubra a una anterior como una sola pieza.
