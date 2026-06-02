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

1. **Durante la compilación**, Telar encripta los datos de la historia (preguntas, respuestas, contenido de paneles, coordenadas) para que no se puedan leer de un vistazo en el código fuente de la página
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

La protección de historias es apenas una barrera de privacidad superficial, no una medida de seguridad. Disuade el acceso casual: quienes visitan el sitio no pueden abrir las herramientas de desarrollo del navegador y leer el contenido sin más. No protege el contenido frente a alguien decidido a obtenerlo.

**Lo que ofrece:**
- Los datos de la historia quedan encriptados en el código fuente de la página: no se leen de un vistazo en las herramientas de desarrollo
- Una pantalla de ingreso de clave que detiene a quienes no la tienen
- No requiere infraestructura del lado del servidor

**Lo que no ofrece (limitaciones importantes):**
- **Confidencialidad en un sitio público.** El CSV de origen (`telar-content/spreadsheets/{story_id}.csv`) se copia tal cual al sitio publicado y queda accesible públicamente en una URL predecible en cualquier despliegue público de GitHub Pages. Alguien decidido a hacerlo puede leer todo el contenido de la historia desde ese archivo, sin clave.
- **Resistencia a ataques sin conexión.** La sal, el IV y el texto cifrado van todos incrustados en el HTML de la página. Quien vea el código fuente tiene todo lo necesario para ejecutar, sin conexión, un ataque de fuerza bruta o de diccionario contra la clave.
- **Control de acceso por persona.** Todas las personas que tienen la clave tienen el mismo acceso; no hay forma de revocarle el acceso a una sola persona sin cambiarle la clave a todas.
- **Metadatos ocultos.** Los títulos y subtítulos siguen visibles en el listado del proyecto, sin importar si la historia está protegida.

**Para una confidencialidad real**, usa un repositorio privado de GitHub. En un repositorio privado ni el sitio ni sus archivos quedan al alcance del público, así que solo pueden ver algo las personas a quienes les diste acceso al repositorio. La protección de historias, por sí sola, no sustituye a un repositorio privado cuando el contenido de verdad no debe ser leído por personas no autorizadas.

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
