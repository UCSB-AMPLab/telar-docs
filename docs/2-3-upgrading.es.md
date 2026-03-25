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
