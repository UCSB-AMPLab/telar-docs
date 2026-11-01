---
layout: docs
title: "Instala y ejecuta Telar localmente"
parent: 1. Primeros pasos
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/primeros-pasos/desarrollo-local/
---

# Instala y ejecuta Telar localmente

<span class="anchor-alias" id="publicación-en-github-pages"></span>

<span class="anchor-alias" id="próximos-pasos"></span>

<span class="anchor-alias" id="paso-7-agrega-términos-del-glosario-opcional"></span>

<span class="anchor-alias" id="paso-6-construye-tu-historia"></span>

<span class="anchor-alias" id="paso-5-encuentra-coordenadas-para-momentos-de-historia"></span>

<span class="anchor-alias" id="paso-4-previsualiza-tus-objetos"></span>

<span class="anchor-alias" id="paso-3-cataloga-tus-objetos"></span>

<span class="anchor-alias" id="paso-2-escribe-tu-texto-narrativo"></span>

<span class="anchor-alias" id="paso-1-reúne-tus-imágenes"></span>

<span class="anchor-alias" id="instalación"></span>

<span class="anchor-alias" id="flujo-de-trabajo-paso-a-paso"></span>

<span class="anchor-alias" id="flujo-de-trabajo-de-desarrollo-diario"></span>

<span class="anchor-alias" id="descripción-general"></span>

<span class="anchor-alias" id="desarrollo-local"></span>

<span class="anchor-alias" id="comandos-principales"></span>

Construye una exhibición con archivos CSV y Markdown en tu computador. Este método permite controlar los archivos fuente, el proceso de generación y el alojamiento. También puedes previsualizar un sitio cuyo contenido viene de Google Sheets.

<span class="anchor-alias" id="requisitos-previos"></span>
## Requisitos

El build actual de Telar usa Ruby 3.2, Python 3.12 y Node.js 22. Usa Ruby 3.2 o superior dentro de la serie 3.x y Bundler. Los archivos de dependencias de tu versión son la referencia para construirla.

Comprueba los programas en la terminal:

```bash
ruby -v
bundle -v
python3 --version
node --version
npm --version
git --version
```

Instala lo que falte con el gestor de paquetes o versiones de tu sistema. En macOS, Ruby puede ser demasiado antiguo; revisa la versión en lugar de asumir que la instalación del sistema sirve.

## Obtén tu propia copia

Crea un repositorio a partir de la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar) y clónalo. Reemplaza la dirección del ejemplo:

```bash
git clone https://github.com/TU-CUENTA/TU-REPOSITORIO.git
cd TU-REPOSITORIO
```

También puedes descargar los archivos si no vas a usar Git. Conserva un respaldo separado de los archivos editables.

<span class="anchor-alias" id="instala-ruby-y-bundler"></span>
## Instala las dependencias

Usa un entorno virtual de Python para separar los paquetes de este proyecto:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
bundle install
npm ci
```

En Windows, activa con `.venv\Scripts\Activate.ps1` en PowerShell. Vuelve a activar el mismo entorno al retomar el proyecto. Si falla la instalación, revisa las versiones antes de cambiar los archivos de dependencias.

<span class="anchor-alias" id="clona-y-configura"></span>
<span class="anchor-alias" id="configura-ajustes-del-sitio"></span>
Para objetos de audio, instala la herramienta del sistema audiowaveform para preparar la forma de onda. Los límites del fragmento se aplican en el navegador; el script no extrae archivos separados por fragmento.

## Configura el sitio

Edita la sección de autoría de `_config.yml`: título, descripción, autoría, idioma y tema. Si vas a editar archivos CSV directamente, configura:

```yaml
google_sheets:
  enabled: false
```

Conserva los ajustes de generación de la plantilla que aparecen más abajo. Si el sitio ocupa la raíz del dominio, `baseurl` queda vacío; en un sitio de proyecto contiene la ruta del repositorio.

## Genera la primera vista previa

Desde la raíz del repositorio, con el entorno activo:

```bash
python3 scripts/build_local_site.py
```

El script procesa contenido, audio y teselas IIIF, genera JavaScript e inicia Jekyll en el puerto 4001. Abre la dirección con la ruta configurada, por ejemplo `http://127.0.0.1:4001/mi-exhibicion/`.

Detén el servidor con Ctrl+C. Usa `--port 4003` si otro sitio ocupa el puerto 4001.

**Comprueba el resultado:** deben cargar el inicio y un objeto de ejemplo. Sigue con [los archivos de contenido](/guia/autoria-local/contenido/).
