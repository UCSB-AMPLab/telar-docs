---
layout: docs
title: "6.3. Historias privadas"
parent: "6. Funciones del sitio"
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/funciones/historias-privadas/
---

# Historias privadas

Las historias privadas se encriptan durante la compilación para que solo las personas con la clave correcta puedan leerlas. Usa esta función para compartir historias en desarrollo con colaboradores, restringir el acceso a materiales de clase o mantener contenido sensible fuera de la vista pública.

**Nuevo en v0.8.0.**

## Cómo funciona

Cuando marcas una historia como protegida:

1. **Durante la compilación**, Telar encripta los datos de la historia (preguntas, respuestas, contenido de paneles, coordenadas) usando encriptación AES-256-GCM
2. **En el sitio publicado**, la página de la historia se carga con una capa de bloqueo — el contenido de la historia no es visible
3. **Las personas ingresan la clave** (o usan un enlace que la incluye), y la historia se desencripta en su navegador
4. **Una vez desbloqueada**, la historia funciona normalmente y permanece desbloqueada durante el resto de la sesión del navegador

El título y subtítulo de la historia permanecen visibles en el listado del proyecto. Solo el contenido paso a paso se encripta.

![Historia protegida mostrando pantalla de bloqueo con campo para ingresar la clave](/images/private-story-locked.png)

## Configuración

Se necesitan dos cosas: una clave en tu configuración y una marca en cada historia que desees proteger.

### 1. Establece la clave de historia

Agrega `story_key` a tu `_config.yml`:

```yaml
story_key: "tu-clave-secreta"
```

Esta clave se usa para encriptar todas las historias protegidas. Elige algo fácil de recordar pero difícil de adivinar.

### 2. Marca las historias como protegidas

En tu `project.csv`, establece la columna `protected` en `yes` para cada historia que quieras encriptar:

```csv
order,story_id,title,subtitle,protected
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido,
2,borrador-analisis,Borrador de Análisis,Trabajo en progreso,yes
```

Las historias sin `protected: yes` permanecen públicas.

## Compartir historias protegidas

Hay dos formas en que las personas pueden desbloquear una historia protegida:

### Formulario de ingreso de clave

Cuando alguien abre una historia protegida, ve una capa con un campo para ingresar la clave. Escribe la clave y presiona **Enter**. Si la clave es correcta, la capa desaparece y la historia aparece.

Si la clave es incorrecta, el formulario muestra un mensaje de error y permite intentar de nuevo.

### Enlace con parámetro de clave

Puedes compartir un enlace directo que incluya la clave como parámetro de URL:

```
https://tu-sitio.com/stories/borrador-analisis/?key=tu-clave-secreta
```

Las personas que abran este enlace se saltan el formulario de ingreso — la historia se desencripta automáticamente.

{: .warning }
> La clave es visible en la URL al compartirla de esta manera. Cualquier persona que vea el enlace (en el historial del navegador, registros de chat o correo electrónico) tendrá acceso a la historia.

### Caché de sesión

Una vez que alguien desbloquea una historia, permanece desbloqueada durante el resto de su sesión de navegador. Navegar a otra página y regresar a la historia no requiere reingresar la clave. Cerrar el navegador borra el caché.

## Consideraciones de seguridad

La protección de historias usa encriptación del lado del cliente. Está diseñada para **control de acceso casual**, no para proteger contenido altamente sensible.

**Lo que ofrece:**
- Datos de la historia encriptados que no se pueden leer sin la clave
- Encriptación robusta (AES-256-GCM con derivación de clave PBKDF2)
- No requiere infraestructura del lado del servidor

**Lo que no ofrece:**
- Control de acceso por persona — todas las personas usan la misma clave
- Protección contra atacantes determinados con acceso al código fuente de tu repositorio
- Metadatos ocultos de la historia — los títulos y subtítulos siguen visibles en el listado del proyecto

**Para mayor seguridad**, usa un repositorio privado de GitHub. Esto impide que cualquier persona sin acceso al repositorio pueda ver el sitio.

## Referencia de configuración

| Opción | Ubicación | Propósito |
|--------|----------|-----------|
| `story_key` | `_config.yml` | La clave de encriptación/desencriptación |
| `protected` | Columna de `project.csv` | Marca historias individuales para encriptación |

Consulta [Configuración](/guia/configurar/configuracion/#story-protection) para detalles sobre la opción `story_key`.

## Véase también

- [Historias y Paneles](/guia/tu-contenido/historias-paneles/) — Cómo construir historias
- [Referencia CSV: Proyecto](/guia/tus-datos/csv-proyecto/) — La columna `protected` en project.csv
- [Configuración](/guia/configurar/configuracion/) — Clave de historia y opciones de interfaz
