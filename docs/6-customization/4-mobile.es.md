---
layout: default
title: 6.4. Optimización móvil
parent: 6. Personalización
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /documentacion/6-personalizacion/4-movil/
---

# Optimización móvil

Telar v0.4.0+ incluye una adaptación completa para móviles y tabletas, para que las exposiciones narrativas funcionen bien en cualquier tamaño de pantalla.

## Panorama del diseño adaptable

Telar aplica un enfoque de diseño centrado primero en móviles con:

- **Diseños fluidos** que se ajustan a cualquier tamaño de pantalla
- **Navegación optimizada para toque** y gestos
- **Tipografía optimizada** para la lectura en pantallas pequeñas
- **Mejoras progresivas** que aprovechan el espacio adicional en pantallas grandes

## Visor de historias en móviles

La experiencia del visor de historias está especialmente optimizada para dispositivos móviles:

### Adaptaciones de diseño

**División visor/panel:**
- **Escritorio**: Disposición en paralelo con el visor a la derecha y la narración a la izquierda
- **Móvil**: Diseño apilado con transiciones suaves entre el visor y el contenido

**Navegación:**
- **Escritorio**: Botones estándar **Previous**/**Next**
- **Móvil**: Botones más grandes y colocados de forma ergonómica (objetivos táctiles mínimos de 45px)

### Funciones específicas para móviles

**Carga esquelética** (*skeleton loading*): Al navegar entre pasos en móviles aparece un efecto sutil de brillo mientras se inicializa el visor; ofrece una señal visual de que el contenido se está cargando.

**Precarga optimizada:**
- **Escritorio**: Precarga 3 pasos hacia adelante y 2 hacia atrás
- **Móvil**: Precarga 2 pasos hacia adelante y 2 hacia atrás (precarga más agresiva para una experiencia más fluida)

**Transiciones más rápidas:** En móviles se usan transiciones solo con fundidos, sin animaciones de deslizamiento, para acelerar la navegación.

### Niveles adaptativos basados en altura

Telar usa un sistema de cuatro niveles que se adapta tanto al ancho como a la altura de la pantalla:

**Nivel 1 (≤700px de alto)**
- Reducción de tipografía del 10-15%
- Mantiene todas las funciones activas

**Nivel 2 (≤667px de alto - iPhone SE)**
- Reducción de tipografía del 20-25%
- Relación visor-panel de 55vh:45vh
- Optimizado para teléfonos pequeños

**Nivel 3 (≤600px de alto)**
- Reducción de tipografía del 30-35%
- Compresión máxima para dispositivos muy pequeños

**Detección de doble eje:** Estos niveles solo se activan en pantallas estrechas (ancho < 768px) para evitar afectar ventanas bajas en escritorio.

## Optimización de paneles

Los paneles laterales se adaptan automáticamente a los dispositivos móviles:

### Ajustes de tamaño

**Paneles en escritorio:**
- Capa 1: 40% de ancho
- Capa 2: 55% de ancho
- Glosario: 45% de ancho

**Paneles en móviles:**
- Ancho completo con posicionamiento optimizado
- Menor padding y márgenes
- Tamaños de fuente reducidos para mayor densidad de contenido

### Escalado tipográfico

Todo el contenido de los paneles disminuye en móviles:
- Encabezados: reducción del 15-25%
- Cuerpo del texto: reducción del 10-15%
- Interlineado: más compacto para aprovechar la altura disponible

### Interacciones táctiles

- **Objetivo mínimo**: 45px × 45px para cualquier elemento interactivo
- **Gestos de deslizamiento**: Desliza hacia abajo para cerrar paneles
- **Zonas táctiles**: Áreas generosas para botones y enlaces

## Galería de objetos

La galería de objetos cambia automáticamente a una disposición de una sola columna en móviles (pantallas ≤767px):

**Escritorio**: Cuadrícula de varias columnas
**Tableta**: Cuadrícula de 2 columnas
**Móvil**: Lista de una sola columna

Así, las miniaturas y los metadatos siguen siendo legibles en pantallas pequeñas.

## Índice del glosario

El listado de términos del glosario ajusta los espaciados en móviles:

- Márgenes reducidos (33-50% menos)
- Encabezados por letra más compactos
- Objetivos táctiles optimizados para los enlaces de términos

## Prueba tu sitio en dispositivos móviles

### Herramientas de desarrollo en el navegador

Utiliza las herramientas de desarrollo del navegador para probar el comportamiento adaptable:

**Chrome:**
1. Abre **DevTools** (F12)
2. Haz clic en el ícono de barra de herramientas de dispositivos
3. Selecciona un preajuste de dispositivo o ingresa dimensiones personalizadas
4. Prueba distintos tamaños y orientaciones

**Firefox:**
1. Abre **DevTools** (F12)
2. Haz clic en **Responsive Design Mode**
3. Prueba varios dispositivos

### Pruebas en dispositivos reales

Procura probar en hardware real cuando sea posible:

- **iOS**: Safari en iPhone (varios tamaños)
- **Android**: Chrome en diferentes equipos
- **Tableta**: iPad y tabletas Android

### Tamaños de pantalla comunes para probar

- **iPhone SE**: 375 × 667px
- **iPhone 12/13/14**: 390 × 844px
- **iPhone 12/13/14 Pro Max**: 428 × 926px
- **iPad**: 768 × 1024px
- **Samsung Galaxy S**: 360 × 740px
- **Samsung Galaxy Note**: 412 × 915px

## Mejores prácticas de contenido para móviles

### Selección de imágenes

**Para el visor de historias:**
- Asegúrate de que las imágenes IIIF tengan suficiente detalle al hacer zoom
- Verifica que los elementos clave sean visibles en pantallas pequeñas
- Revisa cómo se ven las coordenadas en los viewports móviles

**Para los widgets:**
- Usa imágenes de tamaño adecuado (evita archivos exageradamente grandes)
- Mantén las leyendas concisas y legibles

### Contenido de texto

**Narrativas de la historia:**
- Mantén los párrafos cortos (3-5 oraciones)
- Emplea viñetas y listas para facilitar la lectura rápida
- Divide secciones largas con subtítulos

**Contenido de los paneles:**
- Prioriza la información esencial en la capa 1
- Mueve los detalles complementarios a la capa 2
- Considera que las personas usuarias móviles pueden no explorar todas las capas

### Uso de widgets

Los widgets funcionan bien en móviles, pero sigue estas recomendaciones:

**Carruseles:**
- Usa máximo 3-5 imágenes para cuidar el rendimiento
- Mantén las leyendas breves
- Comprueba que las imágenes tengan dimensiones amigables para móviles

**Pestañas:**
- Limítate a 2-3 pestañas (4 puede sentirse aglomerado en móviles)
- Usa etiquetas cortas (1-2 palabras)

**Acordeones:**
- Son ideales para móviles (revelan contenido progresivamente)
- Usa títulos claros y descriptivos
- Mantén el contenido de cada panel enfocado

## Optimización de rendimiento

### Optimización de imágenes

**Para imágenes locales:**
- Comprime antes de subir (objetivo < 2 MB por imagen)
- Usa formatos adecuados (JPEG para fotos, PNG para gráficos)
- Deja que las teselas IIIF manejen la carga progresiva

**Para IIIF externo:**
- Prefiere instituciones con servidores rápidos
- Prueba la velocidad de carga del manifiesto
- Considera imágenes de respaldo para conexiones lentas

### Consideraciones de ancho de banda

Las personas en móviles suelen tener datos limitados o medidos:

- Mantén el peso de la página razonable (< 3 MB por página)
- Aprovecha la carga progresiva de IIIF
- Minimiza imágenes innecesarias en los paneles

### Límites de GitHub Pages

Ten presentes los límites de GitHub Pages:
- 1GB de almacenamiento
- 100GB de ancho de banda mensual
- Para sitios móviles con mucho tráfico, evalúa un hosting alterno

## Accesibilidad

La optimización móvil incluye consideraciones de accesibilidad:

### Objetivos táctiles

Todos los elementos interactivos cumplen la guía WCAG 2.1 para objetivos táctiles mínimos (44px × 44px; Telar usa 45px × 45px).

### Compatibilidad con lectores de pantalla

- HTML semántico para navegación adecuada
- Etiquetas ARIA en elementos interactivos
- Enlaces de salto para navegación con teclado

### Contraste de color

Todos los temas mantienen relaciones de contraste WCAG AA tanto en escritorio como en móvil.

## Limitaciones conocidas

### Navegación de historias en móviles

- Pantallas muy pequeñas (<360px de ancho) pueden sentirse saturadas
- La orientación horizontal en teléfonos no está optimizada
- Algunas coordenadas IIIF complejas pueden requerir ajustes para móviles

### Variaciones entre navegadores

- Safari en iOS tiene políticas estrictas de reproducción automática de medios
- Algunos navegadores de Android manejan las teselas IIIF de forma distinta
- Prueba siempre en los dispositivos objetivo

## Mejoras futuras

Planeadas para versiones próximas:

- Navegación por gestos (deslizamiento entre pasos)
- Mejor soporte en orientación horizontal
- Capacidades de aplicación web progresiva (PWA)
- Visualización sin conexión para exposiciones descargadas

## Solución de problemas

### Contenido desbordado

Si el contenido se desborda en móviles:
- Revisa si hay elementos de ancho fijo en tu CSS personalizado
- Verifica que las imágenes tengan `max-width: 100%`
- Prueba en las herramientas de desarrollo del navegador

### La navegación no funciona

Si la navegación falla en móviles:
- Limpia la caché del navegador
- Prueba en modo privado/incógnito
- Revisa la consola de JavaScript en busca de errores
- Verifica que tu código personalizado no bloquee eventos táctiles

### Rendimiento lento

Si el sitio se siente lento en móviles:
- Reduce el tamaño de los archivos de imagen
- Comprueba los tiempos de respuesta de los manifiestos IIIF
- Prueba con conexiones lentas (**DevTools** permite limitar la red)
- Considera reducir el número de pasos en la historia

## Lista de verificación de pruebas

Usa esta lista al probar la visualización en móviles:

- [ ] Verifica que la página de inicio cargue y se muestre correctamente
- [ ] Verifica que la galería de objetos cambie a columna única
- [ ] Verifica que el visor de historias se muestre y se oculte correctamente
- [ ] Verifica que los botones de navegación sean fáciles de tocar
- [ ] Verifica que los paneles se abran y se cierren con fluidez
- [ ] Verifica que el texto sea legible sin hacer zoom
- [ ] Verifica que las imágenes carguen y se muestren correctamente
- [ ] Verifica que los widgets funcionen como se espera
- [ ] Verifica que los enlaces del glosario funcionen
- [ ] Verifica que todos los elementos interactivos respondan al toque
- [ ] Verifica que el sitio funcione en orientación vertical y horizontal
- [ ] Verifica que el rendimiento sea aceptable en redes 3G
