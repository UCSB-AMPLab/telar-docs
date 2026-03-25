---
layout: docs
title: "9.6. Publicación"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 6
lang: es
permalink: /guia/el-compositor/publicacion/
---

# Publicación

La publicación envía tus cambios del Compositor a tu repositorio de GitHub. Hasta que publiques, todas las ediciones — de objetos, historias y configuraciones — se guardan en el servidor. Al publicar se crea un solo *commit* en tu repositorio, se activa un *build* de GitHub Pages y tus cambios se hacen visibles en tu sitio.

## Resumen de cambios

Antes de publicar, el Compositor muestra un resumen de todo lo que ha cambiado desde tu última publicación. Esto te permite revisar tu trabajo antes de confirmar.

El resumen de cambios lista adiciones, modificaciones y eliminaciones en tu proyecto — objetos nuevos, pasos de historias editados, metadatos actualizados y cualquier otro cambio que hayas hecho. Revisa este resumen con cuidado para asegurarte de que refleja lo que deseas publicar.

## Validación previa a la publicación

El Compositor valida tu proyecto antes de permitirte publicar. La validación detecta problemas que podrían causar inconvenientes en tu sitio en línea.

Hay dos niveles de validación:

- **Errores** — Problemas críticos que bloquean la publicación. Por ejemplo, un campo obligatorio podría faltar o una historia podría hacer referencia a un objeto que no existe. Debes corregir los errores antes de publicar.
- **Advertencias** — Problemas no críticos que no bloquean la publicación pero vale la pena revisar. Por ejemplo, un objeto podría no tener texto alternativo o una historia podría tener un solo paso. Puedes publicar con advertencias, pero resolverlas mejora tu exhibición.

## Publicar

Cuando estés listo, haz clic en el botón de publicar. El Compositor crea un solo *commit* atómico en tu repositorio de GitHub que contiene todos tus cambios. El *commit* se atribuye a tu cuenta de GitHub — tu nombre y correo electrónico aparecen en el historial de *commits* del repositorio, no los del Compositor.

La publicación activa un *build* de GitHub Pages automáticamente. No necesitas visitar GitHub ni ejecutar pasos adicionales.

## Seguimiento del *build*

Después de publicar, el Compositor hace seguimiento del progreso del *build* de GitHub Pages en tiempo real. Un indicador de progreso muestra el estado actual:

- **Queued** — El *build* está en espera para iniciar
- **Building** — GitHub Actions está construyendo tu sitio
- **Complete** — El *build* finalizó correctamente y tus cambios están en línea
- **Failed** — El *build* encontró un error

Si un *build* falla, el Compositor muestra la información del error para que puedas diagnosticar el problema. Las causas comunes incluyen YAML inválido en archivos de configuración o archivos requeridos faltantes. Puedes corregir el problema y publicar de nuevo.

## Después de publicar

Una vez que el *build* se completa correctamente, el Compositor proporciona un enlace directo a tu sitio en línea. Haz clic en él para ver tus cambios publicados de inmediato.

## Editor de configuración

El Compositor incluye un editor de configuración para los ajustes esenciales del sitio. En lugar de editar el archivo `_config.yml` directamente a través de GitHub, puedes actualizar campos clave a través de un formulario en el Compositor.

El editor de configuración te permite cambiar ajustes como el título del sitio, opciones de tema y otros valores de configuración que afectan la apariencia de tu exhibición. Los cambios de configuración se incluyen en tu próxima publicación junto con cualquier cambio de contenido.

{: .note }
> El editor de configuración cubre los ajustes de uso más común. Para opciones de configuración avanzadas, puedes seguir editando `_config.yml` directamente en tu repositorio. Consulta [Configuración](/guia/configuracion/) para la referencia completa.

## Véase también

- [Editor de historias](/guia/el-compositor/editor-historias/) — Construir y editar historias
- [Objetos](/guia/el-compositor/objetos/) — Gestionar objetos en el Compositor
- [Sincronización y actualizaciones](/guia/el-compositor/sincronizacion-y-actualizaciones/) — Mantener tu proyecto sincronizado con el repositorio
- [Panel de control](/guia/el-compositor/panel-de-control/) — Regresa a la vista general del proyecto
