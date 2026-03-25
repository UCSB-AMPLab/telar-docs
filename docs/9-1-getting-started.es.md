---
layout: docs
title: "9.1. Primeros pasos"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/el-compositor/primeros-pasos/
---

# Primeros pasos con el Compositor

Esta página te guía a través del inicio de sesión en el Compositor, la conexión de un repositorio y la importación de tu contenido. Al final, tendrás tu exhibición cargada en el Compositor y lista para editar.

## Requisitos previos

Antes de comenzar, asegúrate de tener:

- Una **cuenta de GitHub** — [regístrate gratis](https://github.com/join) si no tienes una
- Un **repositorio de Telar** — crea uno a partir de la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar) (consulta [Usar el Compositor](/guia/primeros-pasos/compositor/) para instrucciones paso a paso)
- **GitHub Pages habilitado** — en la configuración del repositorio, pon la fuente de Pages en **GitHub Actions**

## Iniciar sesión

El Compositor usa tu cuenta de GitHub para la autenticación y la publicación. No se necesita una cuenta separada.

1. Ve a [compositor.telar.org](https://compositor.telar.org)
2. Haz clic en **Sign in with GitHub**
3. Autoriza el Compositor de Telar cuando GitHub te lo solicite

## Instalar la aplicación de GitHub

En tu primer inicio de sesión, el Compositor te pide instalar la aplicación de GitHub de Telar. Esta aplicación le da al Compositor permiso para leer y escribir en tus repositorios.

1. Cuando se te solicite, haz clic en **Install**
2. Elige si deseas conceder acceso a todos los repositorios o solo a algunos específicos
3. Confirma la instalación

{: .tip }
> Si solo quieres que el Compositor acceda a un repositorio, selecciona **Only select repositories** y elige el repositorio de la lista. Puedes cambiar esto después en la configuración de GitHub, en **Applications**.

## Conectar un repositorio

Después de iniciar sesión, selecciona con qué repositorio quieres trabajar.

1. El Compositor muestra una lista de los repositorios de GitHub que tienen la aplicación de Telar instalada
2. Selecciona el repositorio que deseas editar
3. El Compositor escanea el repositorio para detectar archivos de contenido de Telar

Si el repositorio se creó a partir de la plantilla de Telar y tiene contenido en `telar-content/`, el Compositor lo importa automáticamente.

## Importar desde Google Sheets

Si tu sitio de Telar usa Google Sheets como fuente de datos, el Compositor puede importar directamente desde tu hoja de cálculo.

1. Cuando el Compositor detecta una URL de Google Sheets en la configuración del sitio, ofrece importar desde Sheets
2. Confirma la importación para traer el contenido actual al Compositor
3. Después de tu primera publicación a través del Compositor, puedes deshabilitar opcionalmente la conexión con Google Sheets — el Compositor se convierte en tu editor principal

{: .note }
> Importar desde Google Sheets no elimina ni modifica tu hoja de cálculo. Los datos se copian al Compositor para que puedas editarlos visualmente.

## Después de importar

Una vez que la importación se completa, llegas al [Panel de control](/guia/el-compositor/panel-de-control/). Desde allí puedes:

- Ver y administrar tus historias
- Explorar y editar tus objetos
- Comenzar a crear contenido nuevo

El contenido importado se guarda en el servidor. Los cambios que hagas no se envían a GitHub hasta que publiques — así que puedes explorar y experimentar libremente.

## Véase también

- [Panel de control](/guia/el-compositor/panel-de-control/) — Navega tu proyecto y administra historias
- [Objetos](/guia/el-compositor/objetos/) — Explora, edita y agrega objetos
- [Usar el Compositor](/guia/primeros-pasos/compositor/) — Crear un repositorio y habilitar GitHub Pages
