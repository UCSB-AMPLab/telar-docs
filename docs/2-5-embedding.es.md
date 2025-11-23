---
layout: default
title: 2.5. Insertar en LMS y sitios web
parent: 2. Flujos de trabajo
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/flujos-de-trabajo/insercion/
---

# Insertar historias de Telar en LMS y sitios web

Inserta historias individuales de Telar en Canvas, Moodle, WordPress o cualquier sitio web que admita iframes.

## ¿Qué es insertar (*embed*)?

Insertar te permite mostrar una historia de Telar dentro de otro sitio web o sistema de gestión del aprendizaje (LMS, por sus siglas en inglés). Tu historia aparece como parte de la página anfitriona, permitiendo que estudiantes o visitantes la exploren sin salir de la plataforma.

**Beneficios de insertar:**
- Mantener a las personas dentro de tu LMS o sitio web
- Integrar narrativas visuales en módulos de curso
- Mantener navegación y marca consistentes
- Sin inicio de sesión adicional ni enlaces externos

## Cuándo usar la inserción

**Ideal para:**
- Módulos de curso en Canvas LMS
- Contenido de curso en Moodle
- Publicaciones y páginas de blogs en WordPress
- Sitios web de cursos educativos
- Sitios web de portafolio

**No es necesario para:**
- Compartir enlaces directos (usa la función de compartir enlace)
- Integración de sitio completo (enlaza a tu página de inicio de Telar)

## Requisitos previos

Antes de insertar:

- Tu sitio de Telar debe estar desplegado y accesible públicamente (vía GitHub Pages o dominio personalizado)
- Necesitas acceso de edición a la plataforma de destino (Canvas, WordPress, etc.)
- La plataforma debe admitir inserción de HTML/iframe

## Cómo insertar una historia

### Paso 1: Abre el panel de compartir e insertar

**En una página de historia:**

1. Navega a la historia que deseas insertar
2. Haz clic en el botón **Share** (aparece en el lado derecho del panel narrativo)

**En la página de inicio de tu sitio:**

1. Ve a la página de inicio de tu sitio Telar
2. Haz clic en el botón **Share** en la barra de navegación (arriba a la derecha)

### Paso 2: Cambia a la pestaña de código de inserción

1. En el panel de compartir, haz clic en la pestaña **Embed Code**
2. Lee el texto introductorio para obtener orientación específica de la plataforma

### Paso 3: Selecciona una historia (solo desde la página de inicio)

Si abriste el panel de compartir desde la página de inicio:

1. Usa el menú desplegable **Select Story**
2. Elige la historia que deseas insertar
3. El código de inserción se actualizará automáticamente

### Paso 4: Elige las dimensiones

Selecciona un tamaño predefinido que coincida con tu plataforma, o indica dimensiones personalizadas.

#### Tamaños predefinidos

| Tamaño predefinido | Ancho | Alto | Ideal para |
|--------|-------|--------|----------|
| **Canvas LMS** | 100% | 800px | Páginas de curso Canvas (predeterminado) |
| **Moodle/Blackboard** | 100% | 700px | Módulos de curso Moodle |
| **WordPress** | 100% | 600px | Publicaciones y páginas de blogs |
| **Squarespace** | 100% | 600px | Páginas de Squarespace |
| **Wix** | 100% | 550px | Páginas de sitios Wix |
| **Mobile** | 375px | 500px | Visualización optimizada para móviles |
| **Fixed** | 800px | 600px | Contenedores de tamaño fijo |
| **Custom** | Tu elección | Tu elección | Control manual |

{: .tip }
> **Sugerencia: Comienza con el tamaño predefinido**
> Usa el tamaño predefinido para tu plataforma y luego ajusta si es necesario. La mayoría de las plataformas funcionan mejor con ancho del 100% y altura de 600-800px.

#### Dimensiones personalizadas

Para el tamaño predefinido **Custom** o para modificar un tamaño predefinido:

1. Haz clic en el campo **Width** e indica un valor:
   - Porcentaje: `100%` (llena el ancho del contenedor)
   - Píxeles: `800` o `800px` (ancho fijo)
2. Haz clic en el campo **Height** e indica un valor:
   - Usualmente píxeles: `600` o `600px`
   - El porcentaje funciona pero puede comportarse de manera inesperada en iframes

{: .note }
> **Entendiendo ancho y alto**
> - **Ancho: 100%** llena el espacio horizontal disponible (recomendado para la mayoría de los usos)
> - **Alto: Píxeles fijos** proporciona visualización consistente en todos los dispositivos
> - El código de inserción agregará automáticamente "px" a números simples

### Paso 5: Copia el código de inserción

1. Revisa el código generado en el cuadro de texto
2. Haz clic en el botón **Copy Embed Code**
3. Busca el ícono de marca de verificación confirmando que el código fue copiado

El código de inserción se ve así:

```html
<iframe src="https://tusitio.com/stories/story-1/?embed=true"
  width="100%"
  height="800px"
  title="Título de tu historia"
  frameborder="0">
</iframe>
```

## Instrucciones específicas de plataforma

### Canvas LMS

**Para insertar en una página de curso de Canvas:**

1. Navega a tu curso de Canvas
2. Ve a **Pages** o **Modules**
3. Crea una nueva página o edita una existente
4. Haz clic en el botón **</>** (Editor HTML) en la barra de herramientas
5. Pega el código de inserción que copiaste
6. Haz clic en **</>** nuevamente para regresar al editor visual
7. Haz clic en **Save** o **Update**
8. Visualiza la página para ver tu historia insertada

{: .note }
> **Confirmación de inserción en Canvas**
> Canvas puede mostrar un cuadro en blanco en el editor. Esto es normal—la historia se mostrará correctamente cuando veas la página publicada.

**Probando tu inserción:**

1. Haz clic en **View** en la página
2. Verifica que la historia se cargue
3. Prueba la navegación usando los botones de flecha
4. Asegúrate de que el visor de imágenes IIIF funcione
5. Verifica que el banner "View full site" aparezca (es descartable)

### WordPress

**Para insertar en una publicación o página de WordPress:**

1. Edita o crea una publicación/página
2. Agrega un bloque de **Custom HTML**
   - Haz clic en **+** para agregar un bloque
   - Busca "Custom HTML"
   - Haz clic para insertar
3. Pega el código de inserción en el bloque HTML
4. Haz clic en **Preview** para probar
5. Haz clic en **Publish** o **Update**

**Editor de bloques (Gutenberg):**
El bloque Custom HTML es el enfoque recomendado. No uses el bloque "Embed"—está diseñado para proveedores oEmbed, no para código iframe personalizado.

**Editor clásico:**
Cambia a la pestaña **Text** (no Visual), pega el código, luego regresa a **Visual** para ver una vista previa.

### Moodle

**Para insertar en un curso de Moodle:**

1. Activa la edición en tu curso
2. Agrega un bloque **HTML** a una sección
3. Haz clic en el botón **</>** (HTML) en la barra de herramientas del editor
4. Pega el código de inserción
5. Haz clic en **</>** nuevamente para regresar al editor visual
6. Guarda los cambios

Alternativamente, usa el tipo de recurso **Page** y pega el código de inserción en modo HTML.

### Otras plataformas

La mayoría de los constructores de sitios web y plataformas CMS admiten inserción de iframe:

- **Squarespace**: Usa un bloque Code
- **Wix**: Usa el elemento HTML iframe
- **Webflow**: Usa un elemento Embed
- **Ghost**: Usa una tarjeta HTML

Consulta la documentación de tu plataforma para instrucciones sobre cómo agregar HTML personalizado o iframes.

## Lo que verán las personas

### Características del modo *embed*

Cuando una historia está insertada, las personas experimentan:

**Navegación:**
- Botones de flecha (arriba/abajo) para moverse entre pasos
- Los botones aparecen en todos los tamaños de pantalla (incluyendo escritorio)
- Navegación por teclado (teclas de flecha, Re Pág/Av Pág, Espacio)
- Transiciones suaves entre pasos

**Visor:**
- Visor de imágenes IIIF completo con zoom y paneo
- Escalado responsivo para diferentes tamaños de pantalla
- Navegación por miniaturas en la interfaz del visor

**Banner "View Full Site":**
- Aparece en la parte superior izquierda de la historia insertada
- Enlaza a tu sitio Telar completo
- Descartable con el botón X
- Reaparece al actualizar la página

**Elementos ocultos:**
- Botón de inicio (no se muestra en modo *embed*)
- Botón de compartir (no se muestra en modo *embed*)

### Accesibilidad

Las historias insertadas mantienen accesibilidad completa:

- Navegación por teclado admitida
- Etiquetas ARIA preservadas
- Compatible con lectores de pantalla
- Contenido de texto permanece accesible

## Consejos para una inserción exitosa

### Elige dimensiones apropiadas

**Para plataformas LMS (Canvas, Moodle):**
- Usa ancho del 100% para llenar el área de contenido
- Usa altura de 700-800px para visualización cómoda
- Prueba en escritorio y móvil

**Para publicaciones de blog y artículos:**
- Considera ancho del 100% o 800px fijo
- Usa altura de 600-700px para equilibrar con contenido de texto
- Asegúrate de que la historia no domine la página

**Para sitios móviles primero:**
- Usa el tamaño predefinido Mobile (375px × 500px)
- O usa ancho del 100% con altura de 500-600px
- Prueba en dispositivos móviles reales

### Prueba antes de publicar

1. Previsualiza la historia insertada antes de hacerla pública
2. Prueba la navegación (botones, teclado, desplazamiento)
3. Verifica que el visor IIIF cargue y haga zoom correctamente
4. Verifica en dispositivos móviles y tabletas
5. Asegúrate de que la historia insertada no rompa el diseño de la página

### Múltiples historias en una página

Puedes insertar múltiples historias en una sola página:

1. Cada historia obtiene su propio iframe
2. Usa dimensiones consistentes para coherencia visual
3. Agrega texto o encabezados entre las historias insertadas
4. Considera la longitud de la página y el tiempo de carga

### Consideraciones de seguridad

**Las URLs de inserción son públicas:**
- Cualquier persona con el código de inserción puede ver tu historia
- Las historias insertadas evitan cualquier restricción de acceso en el sitio anfitrión
- Usa los mismos permisos que tu sitio Telar principal

**Seguridad de Canvas/LMS:**
- Los permisos a nivel de curso no se aplican al contenido insertado
- Los estudiantes pueden ver la historia incluso fuera del curso accediendo a la URL directamente
- Considera esto al insertar contenido sensible

## Actualizar historias insertadas

**Los cambios a tu sitio Telar aparecen automáticamente en las inserciones:**

1. Edita el contenido en tu repositorio Telar (Google Sheets o markdown)
2. Haz *push* de los cambios y deja que GitHub Actions construya el sitio
3. Las historias insertadas se actualizan automáticamente—no es necesario volver a insertar

**Cambiar dimensiones de inserción:**

Si necesitas cambiar el ancho o alto:

1. Genera nuevo código de inserción con dimensiones actualizadas
2. Reemplaza el código antiguo en tu plataforma
3. Guarda/publica la actualización

{: .tip }
> **Sugerencia: Compatibilidad de versiones**
> Mientras mantengas el formato de URL de inserción (`?embed=true`), las historias insertadas funcionarán a través de actualizaciones de versión de Telar.

## Solución de problemas

Para problemas comunes de inserción y soluciones, consulta la sección [Problemas de inserción](/docs/reference/development/#embedding-issues) en la referencia de desarrollo.

## Próximos pasos

- **Enlaces para compartir**: Usa la pestaña Share Link para enlaces directos en lugar de insertar
- **Personalización**: Aprende sobre [personalizar tu sitio Telar](/docs/customization/)
- **Características avanzadas**: Explora la [documentación de referencia para desarrolladores](/docs/reference/embedding/) para detalles técnicos
