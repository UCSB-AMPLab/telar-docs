---
layout: docs
title: "9.7. Sincronización y actualizaciones"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 7
lang: es
permalink: /guia/el-compositor/sincronizacion-y-actualizaciones/
---

# Sincronización y actualizaciones

El Compositor hace seguimiento de los cambios en tu repositorio y las actualizaciones de Telar. Cuando regresas a un proyecto, verifica si algo cambió remotamente y si hay una versión más reciente de Telar disponible. Esta página explica cómo funcionan la sincronización y las actualizaciones.

## Detección al regresar

Cada vez que abres el Compositor, verifica si tu repositorio de GitHub ha cambiado desde tu última sesión. Los cambios pueden provenir de otra persona colaboradora, de ediciones directas en GitHub o de una sesión anterior en un dispositivo diferente.

Si el repositorio no ha cambiado, continúas donde lo dejaste. Si se detectan cambios, el Compositor te invita a resincronizar antes de editar.

## Resincronización

La resincronización importa el contenido más reciente de tu repositorio al Compositor. Esto asegura que trabajas con la versión más actual de tus objetos, historias y configuración.

Durante la resincronización, el Compositor:

1. Lee el estado actual de tu repositorio
2. Actualiza tu proyecto local para reflejar cualquier cambio remoto
3. Te advierte si los cambios remotos entran en conflicto con ediciones locales sin publicar

{: .warning }
> Si tienes cambios sin publicar en el Compositor y el repositorio también ha cambiado, el Compositor te advierte sobre posibles conflictos. Revisa la advertencia con cuidado — puede que necesites publicar tus cambios locales primero o aceptar que la versión remota reemplazará tus ediciones sin publicar.

## Detección de versión

El Compositor verifica qué versión de Telar ejecuta tu sitio. Si hay una versión más reciente disponible, te lo informa y ofrece actualizar.

La detección de versión ocurre automáticamente al abrir tu proyecto. Si tu sitio ya ejecuta la versión más reciente, no se requiere ninguna acción.

## Página de actualización

Cuando hay una actualización disponible, el Compositor muestra una página de actualización con los detalles necesarios para tomar una decisión informada:

- **Versión actual** — La versión de Telar que tu sitio ejecuta actualmente
- **Versión destino** — La versión más reciente disponible
- **Notas de la versión** — Un resumen de lo que cambió en la nueva versión — funciones nuevas, mejoras y correcciones
- **Cambios de archivos agrupados** — Una lista de los archivos de Telar que se agregarán, modificarán o eliminarán, organizados por tipo

Revisa esta información antes de continuar. Las actualizaciones modifican el código de Telar en tu repositorio pero no alteran tu contenido — tus objetos, historias y configuración se mantienen sin cambios.

## Actualización con un clic

Cuando estés listo para actualizar, haz clic en el botón de actualización. El Compositor confirma los archivos actualizados de Telar como un solo *commit* atómico en tu repositorio y hace seguimiento del *build* resultante, igual que en una publicación normal.

Después de que la actualización se completa y el *build* finaliza correctamente, el Compositor continúa con la operación que estaba bloqueada originalmente por la verificación de versión. Por ejemplo, si estabas a punto de publicar y el Compositor detectó una versión desactualizada, la actualización se ejecuta primero y luego la publicación procede.

{: .note }
> La actualización modifica únicamente los archivos de código de Telar en tu repositorio. Tu contenido — objetos, historias, imágenes y configuración — nunca se modifica durante una actualización.

## Véase también

- [Publicación](/guia/el-compositor/publicacion/) — Cómo funcionan la publicación y el seguimiento de *builds*
- [Panel de control](/guia/el-compositor/panel-de-control/) — Regresa a la vista general del proyecto
- [Primeros pasos](/guia/el-compositor/primeros-pasos/) — Configuración inicial y conexión de un repositorio
