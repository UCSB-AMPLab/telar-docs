---
layout: docs
title: "9.1. Primeros pasos"
parent: "9. El Compositor"
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/el-compositor/primeros-pasos/
---

<span class="anchor-alias" id="primeros-pasos-con-el-compositor" aria-hidden="true"></span>

# Conectar un sitio existente

Usa esta guía cuando tu repositorio Telar ya exista. Para empezar un proyecto nuevo, sigue [Crear tu primer sitio](/guia/primeros-pasos/compositor/).

## Requisitos previos

Antes de comenzar, asegúrate de tener:

- Una **cuenta de GitHub** — [regístrate gratis](https://github.com/join) si no tienes una
- Un **repositorio de Telar** — crea uno a partir de la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar) (consulta [Usar el Compositor](/guia/primeros-pasos/compositor/) para instrucciones paso a paso)
- **GitHub Pages habilitado** — en la configuración del repositorio, pon la fuente de Pages en **GitHub Actions**

## Iniciar sesión

El Compositor usa tu cuenta de GitHub para la autenticación y la publicación. No se necesita una cuenta separada.

1. Ve a [compositor.telar.org](https://compositor.telar.org)
2. Haz clic en **Iniciar sesión con GitHub**
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

Si el sitio usa Google Sheets, sigue la importación y las comprobaciones de configuración que muestre el Compositor. Revisa el contenido importado y cualquier solicitud de desactivar la conexión con Sheets antes de continuar con la autoría visual.

La importación no elimina la hoja de cálculo. Decide qué método de autoría administrará los cambios futuros; no supongas que editar en el Compositor actualiza automáticamente la hoja original.

## Después de importar

Después de la importación y las comprobaciones de configuración, usa la [navegación principal](/guia/el-compositor/panel-de-control/) para:

- Ver y administrar tus historias
- Explorar y editar tus objetos
- Comenzar a crear contenido nuevo

El contenido importado se guarda en el servidor. Los cambios que hagas no se envían a GitHub hasta que publiques — así que puedes explorar y experimentar libremente.

## Véase también

- [Inicio y navegación](/guia/el-compositor/panel-de-control/) — Navega tu proyecto y administra historias
- [Objetos](/guia/el-compositor/objetos/) — Explora, edita y agrega objetos
- [Usar el Compositor](/guia/primeros-pasos/compositor/) — Crear un repositorio y habilitar GitHub Pages
