---
layout: docs
title: "Publica y mantén un proyecto local"
lang: es
permalink: /guia/autoria-local/publicar/
docs_section: local
en_url: /docs/local-authoring/publish/
es_url: /guia/autoria-local/publicar/
docs_draft: true
---

# Publica y mantén un proyecto local

Distingue los archivos editables del resultado publicado. Las fuentes permiten revisar la exhibición; el sitio generado es la versión que consulta el público.

## Publica mediante GitHub Actions

Confirma `url` y `baseurl` en la configuración. Activa GitHub Pages con **GitHub Actions** como fuente.

Revisa los archivos modificados, confirma los cambios de las fuentes previstas y súbelos al repositorio. El flujo de la plantilla procesa contenido, genera recursos, construye el sitio y cifra las historias privadas antes de desplegarlo.

Abre **Actions**, revisa la ejecución y espera la publicación exitosa. Prueba después la dirección pública. La vista previa local no demuestra que terminó el despliegue.

Excluye del commit los entornos virtuales, dependencias y resultados temporales. Revisa `git status` antes de confirmar.

## Publica en otro alojamiento estático

El script local genera direcciones IIIF para su vista previa. No subas esa vista sin cambios a un servidor público.

Para una publicación independiente, ejecuta primero todo el proceso. Después genera las direcciones de imágenes con la dirección pública completa y reconstruye:

```bash
python3 scripts/build_local_site.py --build-only
python3 scripts/generate_iiif.py --base-url https://ejemplo.org/mi-exhibicion
bundle exec jekyll build
python3 scripts/encrypt_protected_stories.py
```

Reemplaza la dirección por el dominio y la ruta reales. Haz corresponder `url` y `baseurl`. Sube `_site/` al alojamiento después de que termine correctamente el cifrado. Revisa los avisos de conflicto de destinos antes de considerar listo el build.

Si vuelves a ejecutar Jekyll, ejecuta de nuevo el cifrado antes de publicar historias privadas. Consulta [las historias privadas](/guia/funciones/historias-privadas/) para entender el modelo completo.

## Conserva una copia reproducible

Respalda configuración, contenido, medios y temas propios. Conserva los archivos de dependencias y anota la versión de Telar. Las fuentes IIIF externas siguen siendo dependencias externas; guarda sus direcciones de catálogo y manifiesto.

## Actualiza por separado

Respalda o confirma tu trabajo, lee las notas de versión y sigue [la guía de actualización](/guia/configuracion/actualizacion/). Revisa los cambios antes de publicar. Prueba una imagen, historia, panel y entrada del glosario representativos, además de historias privadas si las hay.

Separa la actualización de una revisión extensa del contenido cuando sea posible. Así será más fácil encontrar la causa de una falla.
