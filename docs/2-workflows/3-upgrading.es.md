---
layout: default
title: 2.3. Actualizar Telar
parent: 2. Flujos de Trabajo
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /documentacion/2-flujos-de-trabajo/3-actualizar/
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
4. Crea un pull request (PR) con un resumen detallado de la actualización
5. Destaca cualquier paso manual que necesites completar

### Ejecutar una actualización automatizada

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Selecciona el flujo de trabajo **"Upgrade Telar"** en la barra lateral izquierda
4. Haz clic en **Run workflow** (botón verde a la derecha)
5. Haz clic en el botón verde **Run workflow** en el menú desplegable
6. Espera a que el flujo de trabajo se complete (generalmente 1-2 minutos)
7. Revisa el pull request creado automáticamente
8. Revisa la página de resumen de actualización para cualquier paso manual
9. Haz merge del pull request para completar la actualización

{: .note }
> **Seguro y reversible**
> La actualización crea un pull request, así que puedes revisar todos los cambios antes de hacer merge. Si algo sale mal, simplemente cierra el PR sin hacer merge.

### Después de actualizar

1. Visita tu sitio para verificar que esté funcionando correctamente
2. **Revisa la página de resumen de actualización** (enlazada en la descripción del PR) para verificar si hay pasos manuales pendientes
   - **Importante:** Si estás actualizando desde v0.2.0-v0.3.3, necesitarás actualizar manualmente tu archivo `.github/workflows/build.yml`. Ver detalles abajo.
3. Si tienes temas personalizados o modificaciones, pruébalos a fondo
4. Si encuentras problemas, consulta los [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues) o reporta un problema

#### Actualización manual del archivo de flujo de trabajo (solo v0.2.0-v0.3.3)

Si estás actualizando desde **v0.2.0 hasta v0.3.3**, el resumen de actualización incluirá un paso manual para actualizar tu archivo de flujo de trabajo de GitHub Actions. Esto es necesario porque las restricciones de seguridad de GitHub impiden que los flujos de trabajo modifiquen otros archivos de flujo de trabajo.

**Para actualizar el archivo de flujo de trabajo:**

1. Abre [https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml)
2. Haz clic en el botón **Copy raw contents** (icono 📋 en la esquina superior derecha)
3. En tu repositorio, edita `.github/workflows/build.yml`
4. Reemplaza todo el contenido con la versión copiada
5. Confirma el cambio

Esta actualización elimina funciones obsoletas (la programación con cron y el paso de `git push`) que ya no son necesarias en v0.3.4+.

## Configuración manual para versiones anteriores

Si tu sitio está en la versión **v0.2.0 hasta v0.3.3**, primero necesitas agregar el archivo del flujo de trabajo de actualización a tu repositorio. Esta configuración se hace **una sola vez**; después de eso, todas las actualizaciones futuras serán automatizadas.

### Paso 1: Agregar el archivo del flujo de trabajo de actualización

Necesitas agregar **dos archivos** para habilitar las actualizaciones automatizadas: el flujo de trabajo de actualización y el flujo de trabajo de build actualizado. El flujo de trabajo de actualización descargará automáticamente todos los scripts necesarios cuando se ejecute.

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

2. **Confirma y empuja los cambios**:
   ```bash
   git add .github/workflows/upgrade.yml
   git commit -m "Add automated upgrade workflow"
   git push
   ```

{: .note }
> **¡Eso es todo!** El flujo de trabajo descarga automáticamente los scripts de actualización más recientes del repositorio de Telar cada vez que se ejecuta, así que no necesitas copiar ningún archivo de Python manualmente.

### Paso 2: Reemplazar el archivo del flujo de trabajo de build

Si estás actualizando desde la **v0.2.0 hasta v0.3.3**, también necesitas reemplazar tu archivo `.github/workflows/build.yml` con la versión más reciente. Esto elimina funciones obsoletas (la programación con cron y el paso de `git push`) que ya no son necesarias en v0.3.4+.

#### Método A: Interfaz web de GitHub (Recomendado)

Trabaja completamente en el navegador:

1. **Abre el flujo de trabajo de build en Telar**:
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

2. **Confirma y empuja los cambios**:
   ```bash
   git add .github/workflows/build.yml
   git commit -m "Update build workflow to v0.3.4"
   git push
   ```

{: .note }
> **Paso opcional**: Si omites este paso ahora, el resumen de actualización incluirá instrucciones para actualizar build.yml manualmente después de tu primera actualización. Sin embargo, hacerlo ahora asegura una experiencia de actualización más fluida.

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

### No se creó el PR

**Problema**: La actualización se completa pero no se crea ningún pull request.

**Solución**:
- Verifica si ya existe un pull request para "Upgrade Telar"
- Verifica que GitHub Actions tenga permisos para crear PR en tu repositorio
- Vuelve a ejecutar el flujo de trabajo con la opción "Create Pull Request" habilitada

### Conflictos de merge

**Problema**: El PR de actualización tiene conflictos de merge.

**Solución**:
- Revisa qué archivos tienen conflictos
- Si los conflictos están en archivos que has personalizado (CSS, layouts), resuélvelos manualmente
- Si los conflictos están en archivos del marco, suele convenir conservar la versión de la actualización
- Si no estás seguro, [pide ayuda](https://github.com/UCSB-AMPLab/telar/issues)

## Historial de versiones

### v0.3.4-beta (2025-10-31)
- **Introdujo el sistema automatizado de actualización**
- Agregó un flujo de trabajo de GitHub Actions para actualizaciones con un clic
- Agregó un marco de migración en Python
- Agregó migraciones v020_to_v030 y v033_to_v034
- Agregó configuración de idioma (`telar_language`)

### v0.3.3-beta (2025-10-28)
- Corrigió problemas de despliegue de GitHub Actions

### v0.3.2-beta (2025-10-28)
- Agregó sintaxis de tamaño de imagen para markdown de paneles
- Refactorizó página de índice para facilitar la personalización

### v0.3.1-beta (2025-10-26)
- Corrigió errores de carga de miniaturas

### v0.3.0-beta (2025-10-25)
- Agregó integración con Google Sheets
- Agregó un sistema integral de mensajes de error
- Agregó sistema de temas con 4 temas preconfigurados

### v0.2.0-beta (2025-10-20)
- Renovó el sistema de desplazamiento
- Añadió soporte para múltiples objetos IIIF por historia

### v0.1.1-beta (2025-10-16)
- Corrigió la resolución de miniaturas IIIF
- Corrigió el renderizado de markdown en paneles

### v0.1.0-beta (2025-10-14)
- Lanzamiento beta inicial

## ¿Necesitas ayuda?

- **Documentación:** [ampl.clair.ucsb.edu/telar-docs](https://ampl.clair.ucsb.edu/telar-docs)
- **Sitio de ejemplo:** [ampl.clair.ucsb.edu/telar](https://ampl.clair.ucsb.edu/telar)
- **Reportar un problema:** [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
