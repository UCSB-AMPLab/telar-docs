---
layout: docs
title: "9. El Compositor"
parent: Documentación
nav_order: 9
has_children: true
lang: es
permalink: /guia/el-compositor/
---

# El Compositor

El Compositor de Telar es un editor visual para construir y administrar tu exhibición — sin hojas de cálculo, sin línea de comandos, sin código. Funciona en tu navegador en [compositor.telar.org](https://compositor.telar.org) y se conecta directamente a tu repositorio de GitHub.

## ¿Qué es el Compositor?

Si ya has usado Telar, sabes que el contenido se define a través de archivos de hoja de cálculo — archivos CSV o Google Sheets — y se publica a través de GitHub. El Compositor reemplaza ese flujo de trabajo con un editor visual. Puedes:

- Importar contenido existente desde un repositorio de Telar o Google Sheets
- Agregar y editar objetos con metadatos, manifiestos IIIF o imágenes subidas
- Construir historias visualmente — escribir paneles, definir coordenadas del visor, capturar tiempos de *clip*
- Publicar cambios en GitHub con un solo clic
- Monitorear el estado del *build* de tu sitio en tiempo real

El Compositor está diseñado para estudiantes, docentes y cualquier persona que quiera enfocarse en la narrativa en lugar de los archivos de datos.

## Cómo funciona

El flujo de trabajo tiene cuatro etapas:

1. **Iniciar sesión** — Autentícate con tu cuenta de GitHub en [compositor.telar.org](https://compositor.telar.org)
2. **Conectar un repositorio** — Selecciona un repositorio de Telar existente e importa su contenido
3. **Editar** — Usa el editor visual para administrar objetos, escribir historias y organizar los pasos
4. **Publicar** — Revisa tus cambios, confirma el *commit* en GitHub y observa cómo se completa el *build*

Todos los cambios que hagas en el Compositor se guardan automáticamente en el servidor hasta que publiques. Al publicar se crea un solo *commit* en tu repositorio — atribuido a ti — y se activa automáticamente un *build* de GitHub Pages.

## Requisitos

Para usar el Compositor necesitas:

- Una **cuenta de GitHub** ([regístrate gratis](https://github.com/join))
- Un **repositorio de Telar** creado a partir de la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar) (consulta [Primeros pasos](/guia/primeros-pasos/compositor/) para instrucciones de configuración)
- **GitHub Pages habilitado** con la fuente configurada como **GitHub Actions** (consulta [Primeros pasos](/guia/primeros-pasos/compositor/) para más detalles)

## En esta sección

- [Primeros pasos](/guia/el-compositor/primeros-pasos/) — Inicia sesión, conecta un repositorio e importa tu contenido
- [Panel de control](/guia/el-compositor/panel-de-control/) — Navega tu proyecto, administra historias y monitorea tu sitio
- [Objetos](/guia/el-compositor/objetos/) — Explora, edita, sube y agrega objetos a tu exhibición
- [Editor de historias](/guia/el-compositor/editor-historias/) — Construye historias con un editor visual, captura coordenadas y escribe contenido de capas
- [Video y audio](/guia/el-compositor/video-y-audio/) — Captura *clips*, configura puntos de bucle y trabaja con pasos multimedia
- [Publicación](/guia/el-compositor/publicacion/) — Revisa los cambios, confirma el *commit* en GitHub y sigue el *build*
- [Sincronización y actualizaciones](/guia/el-compositor/sincronizacion-y-actualizaciones/) — Resincroniza con tu repositorio y actualiza Telar
