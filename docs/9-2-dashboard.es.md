---
layout: docs
title: "9.2. Panel de control"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/el-compositor/panel-de-control/
---

# Panel de control

El panel de control es lo primero que ves después de importar tu contenido en el Compositor. Te ofrece una vista general de tu proyecto y acceso rápido a tus historias, objetos y el estado del sitio.

## Vista previa del sitio

La parte superior del panel de control muestra una vista previa de la página de inicio de tu sitio — incluyendo el mensaje de bienvenida y cualquier objeto destacado. Esta vista previa se actualiza a medida que haces cambios, para que puedas ver cómo se verán las ediciones antes de publicar.

## Mensaje de bienvenida

El mensaje de bienvenida de tu sitio aparece en la página de inicio y presenta tu exhibición a quienes visitan. Puedes editarlo directamente desde el panel de control.

1. Haz clic en el área del mensaje de bienvenida para abrir el editor
2. Escribe o actualiza tu mensaje usando la barra de herramientas de texto enriquecido
3. Los cambios se guardan automáticamente mientras escribes

El mensaje de bienvenida admite formato básico — negrita, cursiva, enlaces y saltos de línea.

## Historias

La pestaña **Stories** lista todas las historias de tu exhibición. Desde aquí puedes administrar toda tu colección de narrativas.

### Ver y abrir historias

Cada historia en la lista muestra su título, número de pasos y estado actual. Haz clic en una historia para abrirla en el [Editor de historias](/guia/el-compositor/editor-de-historias/).

### Crear una historia nueva

Para agregar una historia nueva a tu exhibición:

1. Haz clic en el botón **+** o **New Story** en la pestaña de historias
2. Escribe un título para la historia
3. El Compositor crea la historia y la abre en el editor

### Reordenar historias

Las historias aparecen en tu sitio en el orden en que están listadas. Para cambiar el orden:

1. Haz clic y mantén presionado el control de arrastre junto a una historia
2. Arrástrala a la posición deseada
3. Suéltala en su lugar

### Eliminar una historia

Para eliminar una historia de tu exhibición:

1. Haz clic en la opción de eliminar de la historia que deseas remover
2. Confirma la eliminación cuando se te solicite

{: .warning }
> Eliminar una historia la remueve del Compositor. La eliminación no es definitiva hasta que publiques — si eliminas una historia por error, puedes reimportar desde tu repositorio antes de publicar.

### Controles de borrador y privacidad

Cada historia tiene dos controles de visibilidad:

- **Draft** — Las historias en borrador se excluyen completamente del sitio publicado. Usa esta opción para historias en las que aún estás trabajando.
- **Private** — Las historias privadas se publican pero se ocultan de la navegación principal. Quienes visitan solo pueden acceder a ellas con un enlace directo. Consulta [Historias privadas](/guia/funciones-del-sitio/historias-privadas/) para más detalles.

## Cambiar de proyecto

Si trabajas con varios repositorios de Telar, puedes cambiar entre ellos sin cerrar sesión.

1. Haz clic en el nombre del proyecto o el selector en la navegación superior
2. Selecciona un repositorio diferente de la lista
3. El Compositor carga el contenido de ese proyecto

Los cambios de cada proyecto se almacenan por separado en tu navegador.

## Barra de estado

La parte inferior del panel de control muestra el estado actual de tu proyecto:

- **Última publicación** — Cuándo se confirmó el último *commit* en GitHub
- **Última sincronización** — Cuándo se importó contenido por última vez desde el repositorio
- **Sitio en línea** — Un enlace directo a tu sitio publicado en GitHub Pages

## Véase también

- [Primeros pasos](/guia/el-compositor/primeros-pasos/) — Inicia sesión e importa tu contenido
- [Objetos](/guia/el-compositor/objetos/) — Administra los objetos de tu exhibición
