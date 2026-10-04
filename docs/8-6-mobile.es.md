---
layout: docs
title: "8.6. Diseños y pantallas pequeñas"
parent: "8. Para desarrolladores"
grand_parent: Documentación
nav_order: 6
lang: es
permalink: /guia/desarrolladores/moviles/
---

# Diseños y pantallas pequeñas

La página de una historia tiene dos diseños, horizontal y vertical, y escoge entre ellos según el tamaño y la forma de la ventana, no según el tipo de dispositivo. Esta página explica qué hace cada diseño y cómo se adapta el resto del sitio a las ventanas pequeñas o bajas. Los términos que usa están definidos en [8.7 Vocabulario del motor de historias](/guia/desarrolladores/motor-de-historias/).

## Los dos diseños

En el diseño horizontal, la tarjeta de texto va al lado del objeto, como tarjeta lateral, y quien lee avanza por la historia desplazándose. En el diseño vertical, la tarjeta de texto va debajo del objeto, como tarjeta inferior, y quien lee avanza con los botones de anterior y siguiente.

La página usa el diseño vertical cuando la ventana cumple alguna de estas condiciones:

- Mide 1024 px de ancho o menos.
- Su relación de aspecto es de 3:4 o más angosta, como la de una tableta en orientación vertical, sea cual sea su ancho.
- Mide 480 px de alto o menos.
- Mide entre 481 px y 632 px de alto y es demasiado angosta para la tarjeta lateral que esa altura requiere.

En cualquier otro caso usa el diseño horizontal. Si la ventana cambia de tamaño, la página vuelve a escoger el diseño.

### La tarjeta de texto

En el diseño horizontal, la tarjeta lateral es blanca, va encima del objeto y ocupa entre el 37 % y el 52 % del ancho de la ventana, según la altura de esta. En el diseño vertical, la tarjeta inferior va anclada al borde inferior de la ventana, es blanca y ocupa hasta el 40 % de la altura de la ventana (el 35 % si el objeto es un video o un audio).

En una ventana de 480 px de alto o menos, como la de un teléfono en orientación horizontal, la tarjeta vuelve a ponerse al lado del objeto, aunque la página siga en el diseño vertical. Es la tarjeta lateral de poca altura: ocupa el 37 % del ancho de la ventana y, si el texto no cabe en la ventana, se desplaza dentro de la propia tarjeta.

El texto también se ajusta al ancho de la tarjeta: cuando esta mide 480 px o menos, y otra vez a los 360 px, se reducen el relleno y la letra. Si una respuesta pasa de 15 líneas, la letra baja al 90 % del tamaño que la tarjeta usa para las respuestas, para que una de 18 líneas, el máximo, quepa en la tarjeta lateral sin que haya que desplazarse.

### Navegación

La navegación se escoge una sola vez, al cargar la historia:

- **Navegación por desplazamiento** (rueda del mouse, panel táctil, pantalla táctil y teclado) en el diseño horizontal.
- **Navegación por botones** en el diseño vertical, en las historias insertadas y, en iPhone y iPad, en los dos diseños, porque allí el desplazamiento con inercia no es confiable. Los botones de anterior y siguiente son círculos de 66 px fijos en el borde derecho de la ventana, centrados en vertical.

Como la elección se hace al cargar, una ventana que se abre ancha y luego se angosta conserva la navegación por desplazamiento, y una que se abre angosta y luego se ensancha conserva los botones. El teclado funciona en los dos casos: las flechas, Re Pág y Av Pág, la barra espaciadora, Inicio y Fin.

En el diseño vertical, el botón para volver se convierte en un ícono redondo de 44 px, el contador de pasos pasa al centro del borde superior y la insignia de créditos se reduce a una sola línea.

### Carga

Los dos diseños cargan los objetos de la misma manera: cargan los visores de los pasos siguientes (tantos como indique `preload_steps`, 6 por defecto) y de los 2 anteriores, sin pasar de `max_viewer_cards`. Consulta [3.2 Configuración](/guia/configurar/configuracion/). Cuando una historia tiene al menos tantos objetos distintos como indica `loading_threshold` (5 por defecto), aparece un brillo de carga mientras cargan los primeros visores; en la navegación por botones también aparece cuando quien lee llega a un objeto que todavía no ha cargado.

## Tamaño de letra compacto

En cualquier ventana de 600 px de alto o menos, sea cual sea su ancho, Telar aplica el tamaño de letra compacto: letra más pequeña y espaciado más ajustado en el contenido de las páginas, la galería de objetos, la barra de navegación, los paneles y sus títulos, y los botones de navegación de la historia, que pasan a medir 45 px.

## Safari de iOS y muescas

- **Alturas estables:** las alturas del diseño usan unidades dinámicas de *viewport* (`dvh`), y `vh` en los navegadores que no las admiten, para que el diseño no salte cuando aparece o desaparece la barra de direcciones de Safari.
- **Áreas seguras de la muesca:** la insignia de créditos, los botones de navegación, la tarjeta inferior y los paneles quedan libres de la muesca y del indicador de inicio del dispositivo.
- **Estados al pasar el cursor:** solo se aplican en dispositivos con un puntero preciso (`@media (hover: hover) and (pointer: fine)`), para que no queden activos después de tocar una pantalla táctil.
- **Movimiento reducido:** cuando el sistema operativo pide reducir el movimiento, Telar desactiva el desplazamiento suave y las transiciones de las tarjetas y de los paneles, y la cámara pasa de inmediato a cada encuadre.

## Paneles

Los paneles entran desde la derecha en los dos diseños. En el diseño horizontal, el de la capa 1 ocupa el 65 % de la ventana (800 px como máximo), el de la capa 2 el 55 % (750 px como máximo) y el del glosario el 50 % (700 px como máximo); en ventanas de entre 1025 px y 1200 px de ancho ocupan el 80 %, el 75 % y el 70 %. En el diseño vertical ocupan casi todo el ancho (98 %, 96 % y 94 %) y el 76 % de la altura, muestran solo el botón para cerrar y tienen menos relleno.

La letra de los paneles se reduce solo con el tamaño de letra compacto: los títulos pasan de 2 rem a 1,4 rem, el texto de 1,05 rem a 0,9 rem y el interlineado de 1,8 a 1,35.

## Galería de objetos

La galería llena el ancho con columnas de por lo menos 250 px. En el diseño vertical muestra dos columnas, y en ventanas de 441 px de ancho o menos, una.

## Índice del glosario

En el diseño vertical, el índice del glosario ajusta el espaciado: los encabezados de cada letra se hacen más pequeños y sus márgenes se reducen en un tercio, y el espacio entre términos se reduce a la mitad.

## Cómo probar el sitio en pantallas pequeñas

### Herramientas de desarrollo del navegador

Con las herramientas de desarrollo del navegador puedes probar distintos tamaños de ventana:

**Chrome:**
1. Abre **DevTools** (F12)
2. Haz clic en el ícono de la barra de dispositivos
3. Escoge un dispositivo predefinido o escribe medidas propias
4. Prueba las dos orientaciones

**Firefox:**
1. Abre **DevTools** (F12)
2. Haz clic en **Responsive Design Mode**
3. Prueba distintos dispositivos

Prueba tamaños de ventana a uno y otro lado de los umbrales: 1024 px de ancho, una relación de aspecto de 3:4, y 480 px y 600 px de alto. Recarga la página después de cambiar el tamaño para ver la navegación que tendría quien lea con esa ventana.

### Dispositivos reales

Cuando puedas, prueba en dispositivos reales:

- **iOS**: Safari en iPhone y iPad
- **Android**: Chrome en un teléfono y en una tableta

### Tamaños de pantalla comunes

- **iPhone SE**: 375 × 667 px
- **iPhone 12/13/14**: 390 × 844 px
- **iPhone 12/13/14 Pro Max**: 428 × 926 px
- **iPad**: 768 × 1024 px
- **Samsung Galaxy S**: 360 × 740 px
- **Samsung Galaxy Note**: 412 × 915 px

## Contenido para pantallas pequeñas

### Imágenes

- Asegúrate de que las imágenes IIIF tengan suficiente detalle al hacer zoom.
- Revisa que los detalles que señala cada paso se vean en una pantalla pequeña.
- Comprueba cómo se ven los encuadres en los dos diseños.

### Texto

- Escribe respuestas con párrafos cortos (de 3 a 5 oraciones).
- Usa listas para dividir los pasajes largos.
- Pon la información esencial en la capa 1 y los detalles complementarios en la capa 2, porque es posible que quien lee en un teléfono no abra todas las capas.

### Widgets

- **Carruseles:** de 3 a 5 imágenes, con leyendas cortas.
- **Pestañas:** 2 o 3 pestañas con etiquetas cortas; en pantallas angostas la fila de pestañas se desplaza hacia los lados.
- **Acordeones:** funcionan bien en pantallas pequeñas; usa títulos claros.

## Rendimiento

Quien lee en un teléfono suele tener una conexión lenta o con datos limitados:

- Comprime las imágenes antes de subirlas (idealmente menos de 2 MB cada una) y deja que las teselas (*tiles*) IIIF se encarguen de la carga progresiva.
- Escoge fuentes IIIF externas con servidores rápidos y prueba qué tan rápido cargan sus manifiestos.
- En los paneles, usa solo las imágenes que el texto necesita.

## Accesibilidad

- La mayoría de los controles miden por lo menos 44 × 44 px, el mínimo de WCAG 2.1 para un objetivo táctil; los botones de navegación de la historia miden 66 px, o 45 px con el tamaño de letra compacto.
- Los botones de navegación y otros controles tienen etiquetas ARIA.

## Solución de problemas

### El contenido se desborda

- Revisa si el CSS personalizado tiene elementos de ancho fijo.
- Asegúrate de que las imágenes tengan `max-width: 100%`.
- Prueba la página en el modo de diseño adaptable del navegador.

### La navegación no funciona

- Borra la caché del navegador o prueba en una ventana privada.
- Revisa la consola de JavaScript en busca de errores.
- Comprueba que ningún código personalizado bloquee los eventos táctiles o de la rueda.

### El sitio va lento

- Reduce el tamaño de los archivos de imagen.
- Revisa qué tan rápido responden los manifiestos IIIF.
- Simula una conexión lenta en **DevTools**.

## Lista de verificación

- [ ] La página de inicio carga y se ve bien
- [ ] La galería de objetos muestra dos columnas en el diseño vertical, y una en un teléfono angosto
- [ ] La historia usa el diseño y la navegación esperados en cada tamaño de ventana
- [ ] Los botones de navegación son fáciles de tocar
- [ ] Los paneles se abren y se cierran
- [ ] El texto se lee sin hacer zoom
- [ ] Las imágenes cargan
- [ ] Los widgets funcionan
- [ ] Los enlaces del glosario funcionan
- [ ] El sitio funciona con el teléfono en orientación vertical y horizontal
- [ ] El rendimiento es aceptable con una conexión lenta
