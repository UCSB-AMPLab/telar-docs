---
layout: docs
title: 1.4. Revisa y perfecciona
parent: 1. Primeros pasos
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/primeros-pasos/revisa-y-perfecciona/
tutorial_prev:
  title: "Agrega tu contenido"
  url: /guia/primeros-pasos/agrega-contenido/
---

# Revisa y perfecciona

Navega tu exposición y verifica:

- Mensajes de advertencia en la página de inicio (señalan problemas de configuración)
- Que las imágenes correctas aparezcan en cada paso de la historia
- Que el texto se muestre como esperas

## Ajusta las coordenadas de imagen

Las coordenadas iniciales (`0.5, 0.5, 1.0`) muestran el centro de cada imagen. Para enfocar detalles específicos:

1. Navega a cualquier página de objeto en tu sitio
2. Haz clic en **Identify coordinates** debajo del visor de imágenes
3. Desplaza y amplía para encontrar la vista perfecta de cada paso
4. Copia los valores de X, Y y Zoom
5. Pégalos en tu hoja de cálculo
6. Activa una reconstrucción para ver los cambios

![Selector de coordenadas mostrando valores X, Y y Zoom debajo del visor de imágenes](/images/coordinate-picker.png)

## Haz historias privadas (opcional)

Si quieres restringir el acceso a una historia — para uso en el aula, borradores o trabajos en progreso:

1. En la pestaña **project**, establece la columna `protected` en `yes` para esa historia
2. En el archivo `_config.yml` de tu repositorio, agrega un `story_key`:

   ```yaml
   story_key: "tu-clave-secreta"
   ```

3. Comparte la clave con tus lectores, o envíales un enlace con `?key=tu-clave-secreta` al final

Consulta [Historias Privadas](/guia/funciones/historias-privadas/) para más detalles.

## Sigue construyendo

Una vez que tengas lo básico, puedes:

- Agregar más historias (crea nuevas pestañas de historia en tu hoja de cálculo)
- Agregar un glosario de términos (usa la pestaña de glosario en tu hoja de cálculo)
- Personalizar tu página de inicio (edita `index.md` en tu repositorio)
- Explorar y buscar en tu colección de objetos (habilitado por defecto)

Cuando tus paneles necesiten más que unos pocos párrafos — widgets, formato enriquecido o contenido reutilizable — consulta [Contenido enriquecido](/guia/tu-contenido/contenido-enriquecido/) para aprender a agregar archivos markdown.

## Próximos pasos

- [Contenido enriquecido](/guia/tu-contenido/contenido-enriquecido/) — Enriquece paneles con archivos markdown y widgets
- [Tu Contenido](/guia/tu-contenido/) — Cómo Telar organiza tus materiales
- [Temas](/guia/personalizacion/temas/) — Personaliza la apariencia de tu sitio
- [Imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) — Sube y procesa tus propias imágenes
- [Imágenes IIIF externas](/guia/tu-contenido/iiif-externo/) — Usa imágenes de museos y bibliotecas
