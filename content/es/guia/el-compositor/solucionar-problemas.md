---
title: Resuelve problemas y recupera historias
url: /guia/el-compositor/solucionar-problemas/
translationKey: docs-the-compositor-troubleshooting
type: guide
docs_draft: true
docs_section: compositor
---

# Resuelve problemas y recupera historias {#resuelve-problemas-y-recupera-historias}

Identifica primero qué versión estás viendo: el contenido guardado en el editor, los archivos de GitHub o el sitio público generado. Cada una requiere una corrección distinta.

## El editor cambió, pero el sitio no {#el-editor-cambió-pero-el-sitio-no}

Guardar conserva el contenido en el Compositor. Publica los cambios y espera a que termine el build. Si la publicación terminó pero el build falló, revisa el error en lugar de publicar repetidamente los mismos cambios.

Confirma el repositorio y el idioma en el encabezado y abre la dirección pública desde el proyecto. Una pestaña puede seguir mostrando una versión anterior; recárgala después del build exitoso.

## Hay un objeto o encuadre incorrecto {#hay-un-objeto-o-encuadre-incorrecto}

Abre el objeto y revisa su dirección de origen. Una ficha de catálogo no es un manifiesto IIIF. Usa **Obtener manifiesto** para comprobar la dirección y revisa la vista previa antes de agregar otro objeto.

Si la historia muestra otra imagen, selecciona el objeto correcto en ese paso. Si muestra la imagen correcta con otra vista, elige la página del documento cuando corresponda, ajusta el encuadre y usa **Capturar posición**. Espera la confirmación y vuelve a visitar el paso.

## GitHub tiene otro contenido {#github-tiene-otro-contenido}

Abre [Cambios en GitHub](/guia/el-compositor/sincronizacion-y-actualizaciones/) y revisa los elementos afectados. Decide qué versión conservar en cada caso. La revisión conserva el trabajo sin publicar que solo existe en el editor; no es una orden para descartarlo todo.

Si Google Sheets está activo, revisa si un build descargó contenido de la hoja. Decide qué método alimentará los próximos builds antes de volver a editar ambas copias.

## Recupera una historia que no aparece {#recupera-una-historia-que-no-aparece}

Si hay archivos de historias en GitHub que no están en el Compositor, **Inicio** puede ofrecer a la persona responsable **Restaurar como borradores**.

La restauración lee esos archivos y trae las historias como borradores. Lee los avisos, abre cada historia y revisa sus pasos y referencias a paneles antes de habilitarla para publicar.

**Ignorar** descarta esta opción de recuperación para las historias detectadas. No equivale a eliminar sus archivos de GitHub.

## Falta un control o se rechaza una acción {#falta-un-control-o-se-rechaza-una-acción}

Confirma tu rol y consulta [el equipo y el acceso al repositorio](/guia/el-compositor/equipo/). Algunos controles corresponden a la persona responsable; los de pertenencia a un curso se administran desde el curso.

Para pedir ayuda, anota la dirección del proyecto, la acción intentada, el error visible y si ocurre al editar, publicar o generar el sitio. Comparte esos datos con quien mantiene el proyecto o en un [reporte de Telar](https://github.com/UCSB-AMPLab/telar/issues). Excluye claves de acceso y contenido privado.
