---
layout: docs
title: "1.1. Opción A: Usa el Compositor"
parent: 1. Primeros pasos
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/primeros-pasos/compositor/
---

# Usa el Compositor

El Compositor de Telar es una herramienta visual para construir exhibiciones. Puedes agregar objetos, escribir historias, organizar pasos y previsualizar tu sitio — todo en el navegador, sin necesidad de programar.

Cuando estés listo, el Compositor publica un sitio Telar completo en GitHub Pages.

## Lo que necesitas

- Una [cuenta de GitHub](https://github.com/join) (gratis)
- Imágenes, videos o archivos de audio para la exhibición

## Crea tu repositorio

Un repositorio es el hogar de tu proyecto en GitHub — contiene tu configuración y archivos de imagen.

1. Visita la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar)
2. Haz clic en el botón verde **Use this template**
3. Elige **Create a new repository**
4. Dale un nombre a tu repositorio — **usa letras minúsculas y guiones** (ej., `mi-exhibicion`) — esto será parte de la dirección web de tu sitio
5. Asegúrate de que **Public** esté seleccionado
6. Haz clic en **Create repository**

![Captura de GitHub: botón Use this template](/images/use-this-template.png)

{: .warning }
> **Mantén tu repositorio público.** Los repositorios privados no funcionarán con GitHub Pages a menos que tengas un plan pago de GitHub.

## Habilita GitHub Pages

GitHub Pages convierte tu repositorio en un sitio web en vivo de forma gratuita.

1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Haz clic en **Save**

![Configurando GitHub Pages con GitHub Actions](/images/github-actions.gif)

## Abre el Compositor

El Compositor es un editor visual completo para construir exhibiciones con Telar. Con él puedes:

- **Editar historias visualmente** — agregar pasos, escribir texto, ajustar coordenadas de imagen y previsualizar la narrativa en tiempo real
- **Subir imágenes** — arrastra y suelta imágenes directamente; las teselas IIIF se generan de forma automática
- **Agregar video y audio** — inserta videos de YouTube, Vimeo o Google Drive, y archivos de audio autoalojados con controles de *clip*
- **Publicar con un clic** — revisa los cambios, haz *commit* a GitHub y sigue el estado del *build* sin salir del editor

Ve a [compositor.telar.org](https://compositor.telar.org), inicia sesión con la cuenta de GitHub y conecta el repositorio para comenzar.

Para la guía completa, véase [El Compositor](/guia/el-compositor/).

## Siguientes pasos

Una vez que el sitio esté en línea, continúa con el tutorial para aprender más sobre el modelo narrativo de Telar y cómo perfeccionar la exhibición:

- **[Planea tu narrativa](/guia/primeros-pasos/estructura-narrativa/)** — conoce cómo se articulan historias, pasos y paneles
- **[Revisa y perfecciona](/guia/primeros-pasos/revisa-y-perfecciona/)** — ajusta coordenadas de imagen, revisa el sitio y dale los toques finales
