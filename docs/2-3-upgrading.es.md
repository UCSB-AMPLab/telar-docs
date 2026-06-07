---
layout: docs
title: 2.3. Actualizar Telar
parent: 2. Configura tu sitio
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/configuracion/actualizacion/
---

# Actualizar Telar

Mantén tu sitio Telar al día con las últimas funciones, correcciones de errores y mejoras.

{: .note }
> **¿Usas el Compositor de Telar?** Si administras tu sitio desde el [Compositor de Telar](https://compositor.telar.org), puedes actualizarlo con un clic desde su pantalla de actualización y no necesitas seguir los pasos manuales de abajo. Si primero te pide que apruebes los permisos actualizados en GitHub, acéptalos y vuelve a intentarlo. Los pasos de abajo son para actualizar directamente en GitHub.

## Descripción general

Telar v0.3.4 introdujo un sistema automatizado de actualización que facilita mantener tu sitio al día de forma sencilla y segura. El proceso de actualización depende de la versión que estés usando en este momento:

- **v0.3.4 o posterior**: Utiliza el flujo de trabajo automatizado de actualización (actualizaciones con un clic)
- **v0.2.0 a v0.3.3**: Requiere una configuración manual inicial (solo una vez)

## Actualizaciones automatizadas (v0.3.4+)

Si tu sitio ya está en Telar v0.3.4 o posterior, el proceso de actualización es completamente automatizado.

### Cómo funciona

El sistema de actualización:
1. Detecta tu versión actual de Telar desde `_config.yml`
2. Aplica todas las migraciones necesarias de manera incremental (ej., v0.3.4 → v0.3.5 → v0.3.6)
3. Actualiza los archivos del marco y la configuración
4. Crea una rama de actualización y un *issue* con resumen detallado
5. Destaca cualquier paso manual que necesites completar

### Ejecutar una actualización automatizada

{: .note }
> **Solo para repositorios con fork**: Si creaste tu sitio haciendo fork de otro repositorio, necesitarás habilitar los *issues* en la configuración de tu repositorio (**Settings** → **General** → marca **Issues**). Los sitios creados usando el botón "Use this template" ya tienen los *issues* habilitados.

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Selecciona el flujo de trabajo **"Upgrade Telar"** en la barra lateral izquierda
4. Haz clic en **Run workflow** (botón verde a la derecha)
5. Haz clic en el botón verde **Run workflow** en el menú desplegable
6. Espera a que el flujo de trabajo se complete (generalmente 1-2 minutos)
7. Revisa el *issue* de actualización creado automáticamente
8. Haz clic en el enlace del *issue* para crear un pull request
9. Revisa los cambios y haz *merge* del pull request para completar la actualización

{: .note }
> **Seguro y reversible**
> La actualización crea un *issue* y una rama, dándote control total. Revisa los cambios usando el enlace de comparación, crea un pull request cuando estés listo y haz *merge* solo después de verificar.

### Después de actualizar

1. Visita tu sitio para verificar que esté funcionando correctamente
2. **Revisa el *issue* de actualización** para ver si hay pasos manuales (visibles en la sección "After Merging")
   - **Importante:** Si estás actualizando desde v0.2.0-v0.3.3, necesitarás actualizar manualmente tu archivo `.github/workflows/build.yml`. Ver detalles abajo.
3. Si tienes temas personalizados o modificaciones, pruébalos a fondo
4. **Cierra el *issue* de actualización** una vez que todo esté funcionando - esto marca la actualización como completa
5. Si encuentras problemas, consulta los [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues) o reporta un problema

#### Actualización manual del archivo de flujo de trabajo (solo v0.2.0-v0.3.3)

Si estás actualizando desde **v0.2.0 hasta v0.3.3**, el resumen de actualización incluirá un paso manual para actualizar tu archivo de flujo de trabajo de GitHub Actions. Esto es necesario porque las restricciones de seguridad de GitHub impiden que los flujos de trabajo modifiquen otros archivos de flujo de trabajo.

**Para actualizar el archivo de flujo de trabajo:**

1. Abre [https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml)
2. Haz clic en el botón **Copy raw contents** (icono 📋 en la esquina superior derecha)
3. En tu repositorio, edita `.github/workflows/build.yml`
4. Reemplaza todo el contenido con la versión copiada
5. Confirma el cambio

Esta actualización elimina funciones obsoletas (la programación con cron y el paso de `git push`) que ya no son necesarias en v0.3.4+.

### Notas de actualización a v1.5.0

v1.5.0 es una versión centrada en la robustez y la seguridad. Solo afecta el motor y las herramientas: las historias, los objetos y la configuración que ya tienes siguen funcionando sin cambios, sin editar los CSV ni cambiar la configuración. La actualización automática reemplaza todos los archivos del marco; los dos pasos manuales opcionales se describen abajo.

**Qué incluye:** el contenido que escribes en tu sitio ahora se escapa en cada punto de salida; se verifica el certificado TLS en todas las descargas de Google Sheets e IIIF; las historias protegidas quedan más seguras (la construcción se detiene en vez de publicarlas sin cifrar, el cifrado es más fuerte y ya no se filtran autoría, descripción ni metadatos de SEO); el flujo de actualización descarga sus herramientas verificadas con su suma de control y las ejecuta de forma aislada; y todas las lecturas remotas tienen límites y barreras contra el *path traversal*. WaveSurfer va incluido en el sitio para que el audio funcione sin conexión, los archivos del marco se instalan de forma atómica y se corrigieron varios errores del visor, los videos, el audio y el orden de los pasos. No tienes que hacer nada para recibir estos cambios; consulta el [CHANGELOG](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md) para ver la lista completa.

**Recomendado: actualiza tus archivos de flujo de trabajo de GitHub Actions:**

Por seguridad, GitHub no permite que la actualización automática modifique los archivos de flujo de trabajo, así que dos mejoras de seguridad de v1.5.0 no se aplican solas:

- `.github/workflows/upgrade.yml`: el proceso de actualización ahora descarga sus herramientas como un recurso verificado con su suma de control y las ejecuta de forma aislada.
- `.github/workflows/build.yml`: la acción `ruby/setup-ruby` queda fijada a un commit específico para mayor seguridad en la cadena de suministro, y la construcción ahora instala las dependencias de Node con `npm ci`.

Para aplicarlos, usa los pasos de copiar desde «Raw» de la sección "Configuración manual para versiones anteriores" más abajo, una vez por cada archivo. Si te saltas este paso, tu sitio se sigue construyendo y publicando con normalidad; estos cambios solo refuerzan tus flujos de trabajo.

{: .warning }
> **Si actualizas `build.yml`, agrega también `package-lock.json`.** El nuevo `build.yml` instala las dependencias de Node con `npm ci`, que necesita un `package-lock.json` incluido en el repositorio. Cópialo desde el repositorio de Telar (abre [package-lock.json](https://github.com/UCSB-AMPLab/telar/blob/main/package-lock.json) y haz clic en **Copy raw contents**) en la raíz de tu repositorio, o la construcción fallará. Los sitios nuevos creados a partir de la plantilla ya lo incluyen.

**Paquetes de idioma: nuevas claves para compartir historias protegidas:**

Esta versión agrega claves a los archivos de idioma incluidos (`en.yml` y `es.yml`) para los avisos al compartir historias protegidas: los mensajes que aparecen cuando un enlace o un código de inserción lleva la clave de acceso. Si tienes un archivo de idioma personalizado, vuelve a aplicar tus cambios después de actualizar, copiando las claves nuevas desde el archivo actualizado `_data/languages/en.yml` (o `es.yml`) del repositorio de Telar.

**Si solo usas la interfaz web de GitHub:**

La actualización automática reemplaza todos los archivos del marco. Las actualizaciones de los flujos de trabajo de arriba son refuerzos opcionales; si aplicas la actualización de `build.yml`, recuerda la nota sobre `package-lock.json`.

### Notas de actualización a v1.4.0

v1.4.0 es una actualización que solo afecta el código de ejecución del sitio. Las historias, los objetos y la configuración que ya tienes siguen funcionando sin cambios: no hace falta editar los CSV, ni cambiar la configuración, ni actualizar los flujos de trabajo.

**Cambio de visor: OpenSeadragon reemplaza a Tify.**

El visor de imágenes IIIF pasó de Tify (que se cargaba desde un CDN) a un visor propio basado en OpenSeadragon, alojado localmente. Para la mayoría de los sitios esto es imperceptible: las imágenes IIIF se siguen mostrando y ampliando. Si tu sitio tiene un `_sass/_viewer.scss` personalizado que sobrescribía los estilos de Tify, esas reglas quedan sin efecto y puedes eliminarlas, aunque no romperán la *build* si las dejas.

**Archivo de idioma: seis claves nuevas `object.viewer.*`.**

Se agregan seis claves nuevas a los archivos de idioma incluidos (`en.yml` y `es.yml`): `object.viewer.prev_page`, `object.viewer.next_page`, `object.viewer.page_input_label`, `object.viewer.page_input_aria`, `object.viewer.image_unavailable_title` y `object.viewer.image_unavailable_detail`. Estas claves se usan en los controles de paginación para objetos de varias páginas y en la interfaz de error del nuevo visor.

Si tienes un archivo de idioma personalizado (una copia de `en.yml` o `es.yml` con tus propias traducciones), tendrás que agregar estas seis claves a mano después de actualizar; de lo contrario, la paginación y los mensajes de error del visor recurrirán a los textos en inglés incluidos por defecto. Copia los valores del `_data/languages/en.yml` (o `es.yml`) actualizado en el repositorio de Telar y tradúcelos según lo necesites.

**Si solo usas la interfaz web de GitHub:**

No tienes que hacer nada a mano. La actualización se encarga de reemplazar todos los archivos automáticamente.

### Notas de actualización a v1.3.0

v1.3.0 mejora la cobertura de internacionalización (i18n) en todo el sitio e introduce una convención de archivos hermanos para traducir las páginas de contenido. No requiere cambios en los CSV.

**Migración de contenido automática (reescritura de páginas con verificación previa).**

La migración reescribe cuatro archivos de contenido (`index.md`, `pages/glossary.md`, `pages/objects.md` y `telar-content/texts/pages/about.md`) para que usen las nuevas plantillas basadas en claves de idioma, pero solo si el archivo es exactamente igual, byte por byte, al predeterminado de la v1.2.1. Cualquier contenido que hayas personalizado se conserva intacto. En los sitios en español cuyo `about.md` no se ha modificado respecto al predeterminado de la v1.2.1, la migración también crea `telar-content/texts/pages/acerca.md` automáticamente.

**Claves de idioma nuevas: `lang.index_page.welcome` y `lang.pages.glossary_intro`.**

Se agregan dos claves nuevas a los archivos de idioma incluidos. Si tienes un archivo de idioma personalizado, no necesitas agregarlas de inmediato (los *layouts* recurren a valores de respaldo), pero agregarlas te da control sobre el texto de bienvenida de la página de inicio y la frase de introducción del glosario en el idioma activo del sitio.

**Si solo usas la interfaz web de GitHub:**

No tienes que hacer nada a mano, más allá de revisar el *issue* de actualización que se crea automáticamente, por si marca algún archivo como distinto del predeterminado (lo que significa que se detectaron y conservaron tus personalizaciones).

### Notas de actualización a v1.2.1

v1.2.1 es una versión de corrección. No requiere pasos manuales.

La actualización corrige una falla silenciosa en el script que descarga el contenido de demostración, que afectaba a los sitios cuyo `_config.yml` tenía una versión con la "v" delante (por ejemplo, `version: "v1.2.0"`). Si tu sitio quedó sin contenido de demostración después de una actualización anterior, este parche lo soluciona. No hay que editar la configuración; la corrección está en el propio script.

### Notas de actualización a v1.2.0

v1.2.0 agrega una tabla de contenido por secciones, un botón de "Volver al inicio" y navegación dentro de la historia. No requiere pasos manuales.

Todas las funciones nuevas se activan automáticamente. La tabla de contenido por secciones es opcional en cada historia: agrega `show_sections: yes` a la fila de la historia en `project.csv` (o `mostrar_secciones: si` en los sitios en español) para mostrarla. Los sitios que no tengan esa columna siguen funcionando sin necesidad de cambiar los CSV.

**Si solo usas la interfaz web de GitHub:**

No tienes que hacer nada.

### Notas de actualización a v1.1.0

v1.1.0 agrega enlaces profundos (*deep linking*), tarjetas de título, modo colección, estilo para bibliografías y una pestaña de posición para el panel de compartir. No requiere pasos manuales.

Los enlaces profundos y el panel de compartir actualizado se activan automáticamente. El modo colección es opcional: pon `collection_mode: true` en `_config.yml` para cambiar la disposición de la página de inicio. El valor predeterminado es `false`, así que los sitios existentes no se ven afectados. Las tarjetas de título usan filas de CSV ya existentes con el campo de objeto vacío: no requieren columnas nuevas. El estilo para bibliografías es un nuevo *widget* de Markdown (`:::bibliography`) disponible en el contenido de los paneles.

**Si solo usas la interfaz web de GitHub:**

No tienes que hacer nada.

### Notas de actualización a v1.0.0-beta

v1.0.0-beta agrega soporte multimedia (objetos de video y audio), un pipeline de construcción actualizado y renombra la columna CSV `object_type` a `medium`.

**Paso manual — actualizar el flujo de trabajo de *build*:**

El archivo `build.yml` tiene nuevos pasos para el procesamiento de audio, la configuración de Node.js y el empaquetado de JavaScript. Copia la versión más reciente desde el repositorio de Telar:

1. Abre [build.yml en GitHub](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml)
2. Haz clic en **Copy raw contents**
3. En tu repositorio, navega a `.github/workflows/build.yml` y haz clic en **Edit**
4. Selecciona todo y reemplaza con el contenido copiado
5. Confirma el cambio

**Paso manual — instalar dependencias de Node.js (solo desarrollo local):**

Si desarrollas localmente, ejecuta `npm install` en el repositorio después de actualizar. Esto instala las dependencias de JavaScript requeridas por el nuevo pipeline de construcción (lenis, @vimeo/player, esbuild, vitest).

**Opcional — soporte de audio:**

Si el sitio incluye objetos de audio, instala `ffmpeg` y `audiowaveform` para la extracción de *clips* y los datos de picos de forma de onda:

- **macOS:** `brew install ffmpeg audiowaveform`
- **Ubuntu:** `sudo apt install ffmpeg audiowaveform`

Los sitios sin objetos de audio no necesitan estas herramientas. GitHub Actions las instala automáticamente cuando se detectan archivos de audio.

**Cambio de columna — `object_type` a `medium`:**

La columna `object_type` en `objects.csv` se renombró a `medium`. Este cambio es retrocompatible — el nombre anterior se sigue aceptando.

**Si solo usas la interfaz web de GitHub:**
- Copia el `build.yml` actualizado como se describe arriba. No se requieren otros pasos manuales.

### Notas de actualización a v0.7.0

v0.7.0 agrega Node.js como requisito para compilar el sitio localmente:

**Nuevo requisito para desarrollo local:**
- **Node.js 18+** ahora es necesario para ejecutar `bundle exec jekyll build` o `bundle exec jekyll serve`
- Esto permite el empaquetado de módulos JavaScript mediante esbuild durante el proceso de compilación
- **Los flujos de trabajo en GitHub no se ven afectados** — GitHub Actions ya incluye Node.js

**Si desarrollas localmente:**
1. Instala Node.js 18+ ([nodejs.org](https://nodejs.org/))
2. Ejecuta `npm install` en tu repositorio para instalar las dependencias de JavaScript
3. Luego procede con los comandos normales de Jekyll

**Si solo usas la interfaz web de GitHub:**
- No se requiere ninguna acción — tu sitio seguirá compilándose automáticamente

## Configuración manual para versiones anteriores

Si tu sitio está en la versión **v0.2.0 hasta v0.3.3**, primero necesitas agregar el archivo del flujo de trabajo de actualización a tu repositorio. Esta configuración se hace **una sola vez**; después de eso, todas las actualizaciones futuras serán automatizadas.

### Paso 1: Agregar el archivo del flujo de trabajo de actualización

Necesitas agregar **dos archivos** para habilitar las actualizaciones automatizadas: el flujo de trabajo de actualización y el flujo de trabajo de *build* actualizado. El flujo de trabajo de actualización descargará automáticamente todos los scripts necesarios cuando se ejecute.

#### Método A: Interfaz web de GitHub (Recomendado)

Trabaja completamente en el navegador sin instalar nada:

1. **Abre el flujo de trabajo de actualización en Telar**:
   - Ve a [https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/upgrade.yml](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/upgrade.yml)
   - Haz clic en el botón **Copy raw contents** (icono 📋 en la esquina superior derecha)

2. **Crea el archivo en tu repositorio**:
   - Ve a tu repositorio en GitHub
   - Haz clic en **Add file** → **Create new file**
   - Ingresa la ruta del archivo: `.github/workflows/upgrade.yml`
   - Pega el contenido copiado
   - Desplázate hacia abajo y haz clic en **Commit changes**
   - Agrega el mensaje de commit: "Add automated upgrade workflow"
   - Haz clic en **Commit changes**

#### Método B: Desarrollo local (computador)

Si tienes tu repositorio clonado localmente:

1. **Descarga el archivo del flujo de trabajo desde Telar**:
   ```bash
   curl -o .github/workflows/upgrade.yml https://raw.githubusercontent.com/UCSB-AMPLab/telar/main/.github/workflows/upgrade.yml
   ```

2. **Confirma y haz push de los cambios**:
   ```bash
   git add .github/workflows/upgrade.yml
   git commit -m "Add automated upgrade workflow"
   git push
   ```

{: .note }
> **¡Eso es todo!** El flujo de trabajo descarga automáticamente los scripts de actualización más recientes del repositorio de Telar cada vez que se ejecuta, así que no necesitas copiar ningún archivo de Python manualmente.

### Paso 2: Reemplazar el archivo del flujo de trabajo de *build*

Si estás actualizando desde la **v0.2.0 hasta v0.3.3**, también necesitas reemplazar tu archivo `.github/workflows/build.yml` con la versión más reciente. Esto elimina funciones obsoletas (la programación con cron y el paso de `git push`) que ya no son necesarias en v0.3.4+.

#### Método A: Interfaz web de GitHub (Recomendado)

Trabaja completamente en el navegador:

1. **Abre el flujo de trabajo de *build* en Telar**:
   - Ve a [https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml)
   - Haz clic en el botón **Copy raw contents** (icono 📋 en la esquina superior derecha)

2. **Reemplaza el archivo en tu repositorio**:
   - Ve a tu repositorio en GitHub
   - Navega a `.github/workflows/build.yml`
   - Haz clic en el botón **Edit** (icono de lápiz)
   - Selecciona todo el contenido (Ctrl+A o Cmd+A) y bórralo
   - Pega el contenido copiado
   - Desplázate hacia abajo y haz clic en **Commit changes**
   - Agrega el mensaje de commit: "Update build workflow to v0.3.4"
   - Haz clic en **Commit changes**

#### Método B: Desarrollo local (computador)

Si tienes tu repositorio clonado localmente:

1. **Descarga el archivo del flujo de trabajo desde Telar**:
   ```bash
   curl -o .github/workflows/build.yml https://raw.githubusercontent.com/UCSB-AMPLab/telar/main/.github/workflows/build.yml
   ```

2. **Confirma y haz push de los cambios**:
   ```bash
   git add .github/workflows/build.yml
   git commit -m "Update build workflow to v0.3.4"
   git push
   ```

{: .note }
> **Paso opcional**: Si omites este paso ahora, el resumen de actualización incluirá instrucciones para actualizar `build.yml` manualmente después de tu primera actualización. Sin embargo, hacerlo ahora asegura una experiencia de actualización más fluida.

### Paso 3: Ejecuta tu primera actualización automatizada

Con eso queda lista la configuración. Ahora sigue las instrucciones de [Actualizaciones automatizadas](#actualizaciones-automatizadas-v034) para actualizar a la versión más reciente.

El flujo de trabajo hará lo siguiente de forma automática:
1. Descargará los scripts de actualización más recientes del repositorio de Telar
2. Detectará tu versión actual
3. Aplicará todas las migraciones necesarias
4. Creará un pull request con los archivos actualizados

## Solución de problemas

### El flujo de trabajo de actualización no aparece

**Problema**: El flujo de trabajo "Upgrade Telar" no aparece en la pestaña Actions.

**Solución**:
- Asegúrate de haber hecho commit del archivo `.github/workflows/upgrade.yml`
- Actualiza la pestaña Actions en tu navegador
- Verifica que el archivo YAML sea válido (sin errores de sintaxis)

### La actualización falla con error

**Problema**: El flujo de trabajo de actualización falla con un mensaje de error.

**Solución**:
- Revisa los logs del flujo de trabajo en la pestaña Actions para detalles
- Verifica que tu `_config.yml` tenga un campo `telar.version`
- El flujo de trabajo descarga scripts automáticamente, así que un problema de red podría causar fallas
- Si el error persiste, [reporta un problema](https://github.com/UCSB-AMPLab/telar/issues) con el mensaje de error

### No se creó el *issue*

**Problema**: La actualización se completa pero no se crea ningún *issue*.

**Solución**:
- Verifica si ya existe un *issue* con título "Upgrade Telar to [versión]"
- Verifica que GitHub Actions tenga permiso `issues: write` en tu repositorio
- Verifica que los *issues* estén habilitados en la configuración de tu repositorio
- Vuelve a ejecutar el workflow

### Conflictos de *merge*

**Problema**: El PR de actualización tiene conflictos de *merge*.

**Solución**:
- Revisa qué archivos tienen conflictos
- Si los conflictos están en archivos que has personalizado (CSS, layouts), resuélvelos manualmente
- Si los conflictos están en archivos del marco, suele convenir conservar la versión de la actualización
- Si no estás seguro, [pide ayuda](https://github.com/UCSB-AMPLab/telar/issues)

## Historial de versiones

Para ver la lista completa de cambios en cada versión, consulta el [Changelog](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md) en el repositorio de Telar.

## ¿Necesitas ayuda?

- **Documentación:** [telar.org/guia](https://telar.org/guia)
- **Sitio de ejemplo:** [telar.org/demo](https://telar.org/demo)
- **Reportar un problema:** [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
