---
title: Sincronización y actualizaciones
url: /guia/el-compositor/sincronizacion-y-actualizaciones/
translationKey: docs-the-compositor-sync-updates
type: guide
docs_section: compositor
---

# Sincronización y actualizaciones {#sincronización-y-actualizaciones}

El Compositor comprueba los cambios hechos en GitHub y las actualizaciones disponibles de Telar. Los cambios hechos fuera del editor se revisan antes de aplicarlos al borrador.

## Detección al regresar {#detección-al-regresar}

Al abrir un proyecto conectado, el Compositor revisa su repositorio. Si GitHub cambió, sigue el aviso para revisar las diferencias. La revisión abarca los objetos, historias, ajustes, términos del glosario y páginas afectados.

<span class="anchor-alias" id="resincronización" aria-hidden="true"></span>

## Resincronizar {#resincronizar}

La revisión de **Cambios en GitHub** muestra las diferencias y pide elegir qué versión conservar cuando es necesario.

1. Lee cada cambio y sus consecuencias.
2. Elige la versión de GitHub o la del Compositor, según corresponda.
3. Resuelve las decisiones que solicite la revisión.
4. Pulsa **Aplicar estas elecciones** cuando el resultado sea el que buscas.

Conservar la versión del Compositor significa que la próxima publicación enviará esa versión a GitHub. Tomar la versión de GitHub aplica el contenido correspondiente al Compositor. Los cambios sin publicar que solo existen en el Compositor se conservan.

{{< callout "note" >}}
Revisar la sincronización y publicar son acciones distintas. Lee las consecuencias de cada elemento; no uses una nueva importación como forma habitual de deshacer un pequeño error de edición.
{{< /callout >}}

Si no se puede leer un archivo o el repositorio cambia durante la revisión, sigue el mensaje y actualiza la comparación antes de aplicarla.

## Detección de versión {#detección-de-versión}

El Compositor comprueba la versión de Telar que usa tu sitio y puede pedir una actualización antes de continuar.

## Página de actualización {#página-de-actualización}

Revisa las versiones actual y de destino, las notas de la versión y los cambios agrupados por archivo. Una actualización puede cambiar archivos del framework y migrar los ajustes que necesite la nueva versión. Lee la propuesta antes de aceptarla.

{{< media id="upgrade" >}}

## Actualización con un clic {#actualización-con-un-clic}

Sigue los controles de actualización y espera a que terminen la operación y la generación del sitio. Después, sigue el enlace de regreso. Revisa el sitio antes de continuar con el trabajo que motivó la actualización.

El historial del repositorio registra los cambios de la actualización. Si algo no se ve bien, usa la información de la generación y la lista de archivos propuesta para entender qué cambió.

## Véase también {#véase-también}

- [Publicación](/guia/el-compositor/publicacion/)
- [Inicio y navegación](/guia/el-compositor/panel-de-control/)
- [Conectar un sitio existente](/guia/el-compositor/primeros-pasos/)
- [Actualizar Telar](/guia/configuracion/actualizacion/) — Referencia de actualización del framework
