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

Las historias privadas se encriptan para que solo las personas con la clave correcta puedan leerlas. Usa esta función para compartir historias en desarrollo con colaboradores, restringir el acceso a materiales de clase o mantener contenido sensible fuera de la vista pública.

**Nuevo en v0.8.0.**

## Cómo funciona

Telar construye todas las historias — privadas o no — con las mismas plantillas. Durante la compilación de Jekyll, una historia privada se genera exactamente igual que una abierta. Solo cuando la compilación termina, un paso aparte la encripta:

1. **Durante la compilación de Jekyll**, los pasos de una historia privada se generan con las plantillas normales de historias: el mismo procesamiento de markdown, los mismos enlaces de glosario, LaTeX, clips de audio y texto alternativo que cualquier historia abierta.
2. **Después de la compilación**, un paso posterior encripta el contenido ya generado de la historia (AES-256-GCM) y lo reemplaza con un marcador bloqueado. El título y el subtítulo siguen visibles en el listado del proyecto; solo se encripta el contenido paso a paso.
3. **En el sitio publicado**, la página de la historia se carga con una capa de bloqueo en lugar de su contenido.
4. **Las personas ingresan la clave** (o usan un enlace que la incluye), y la historia se desencripta en su navegador.
5. **Una vez desbloqueada**, la historia se comporta exactamente igual que una abierta, porque durante la compilación se generó con las mismas plantillas que las demás.

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

### 2. Marca las historias como privadas

En tu `project.csv`, establece la columna `privada` en `yes` para cada historia que quieras encriptar:

```csv
order,story_id,title,subtitle,privada
1,textiles-coloniales,Textiles Coloniales,Tradiciones de tejido,
2,borrador-analisis,Borrador de Análisis,Trabajo en progreso,yes
```

Las historias sin `privada: yes` permanecen públicas.

{: .note }
> `protected` y `protegida` también funcionan como nombres de columna — Telar los trata igual que `private`/`privada`. Los sitios nuevos y los ejemplos de esta documentación usan `private`/`privada`.

## Probar localmente

Ni `bundle exec jekyll serve` ni el modo por defecto de `scripts/build_local_site.py` (servir) encriptan nada: Jekyll regenera `_site` continuamente mientras sirve el sitio, y la encriptación es un paso único que corre cuando una compilación termina. **Al previsualizar así, las historias privadas se ven como contenido legible, en texto plano.** Es el comportamiento esperado, no un error: el comando con el que un despliegue real compila el sitio todavía no ha corrido.

Para ver una historia privada como la vería alguien que visita el sitio (bloqueada, pidiendo la clave):

```bash
python3 scripts/build_local_site.py --build-only
```

Luego sirve el directorio `_site/` resultante con un servidor de archivos estáticos (por ejemplo, `python3 -m http.server` desde dentro de `_site/`). Esto ejecuta el mismo paso de encriptación que la compilación de GitHub Actions, así que también puede fallar como fallaría una compilación real — mira Fallos de compilación más abajo.

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
- **Confidencialidad en un sitio público.** Todos los CSV de `telar-content/spreadsheets/` — incluidos los datos de pasos de la historia y el propio `project.csv` (que lleva la marca `private`) — se copian tal cual al sitio publicado y quedan accesibles públicamente en una URL predecible bajo `/telar-content/spreadsheets/` en cualquier despliegue público de GitHub Pages. Alguien decidido a hacerlo puede leer todo el contenido de la historia desde esos archivos, sin clave.
- **Resistencia a ataques sin conexión.** La sal, el IV y el texto cifrado van todos incrustados en el HTML de la página. Quien vea el código fuente tiene todo lo necesario para ejecutar, sin conexión, un ataque de fuerza bruta o de diccionario contra la clave.
- **Control de acceso por persona.** Todas las personas que tienen la clave tienen el mismo acceso; no hay forma de revocarle el acceso a una sola persona sin cambiarle la clave a todas.
- **Metadatos ocultos.** Los títulos y subtítulos siguen visibles en el listado del proyecto, sin importar si la historia está protegida.

**Para una confidencialidad real**, usa un repositorio privado de GitHub. En un repositorio privado ni el sitio ni sus archivos quedan al alcance del público, así que solo pueden ver algo las personas a quienes les diste acceso al repositorio. La protección de historias, por sí sola, no sustituye a un repositorio privado cuando el contenido de verdad no debe ser leído por personas no autorizadas.

## Fallos de compilación

Telar se niega a publicar una historia privada en texto plano. En lugar de desplegar contenido sin proteger, la compilación puede fallar en dos puntos:

- **Una historia está marcada `private: yes` pero falta `story_key`** en `_config.yml`. Agrega la clave o quítale la marca `private` a la historia.
- **El flujo de compilación no ejecuta el paso de encriptación.** Los sitios actualizados desde una versión anterior a v1.6.0 necesitan agregar este paso a `.github/workflows/build.yml` a mano — GitHub no permite que la actualización automática edite archivos de flujos de trabajo. Consulta [Actualizar Telar: notas de v1.6.0](/guia/configuracion/actualizacion/#notas-de-actualización-a-v160).

Cualquiera de los dos fallos imprime un mensaje que identifica cuál ocurrió, en inglés y en español.

## Referencia de configuración

| Opción | Ubicación | Propósito |
|--------|----------|-----------|
| `story_key` | `_config.yml` | La clave de encriptación/desencriptación |
| `private` | Columna de `project.csv` | Marca historias individuales para encriptación (también se acepta `protected`) |

Consulta [Configuración](/guia/configurar/configuracion/#story-protection) para detalles sobre la opción `story_key`.

## Véase también

- [Historias y Paneles](/guia/tu-contenido/historias-paneles/) — Cómo construir historias
- [Referencia CSV: Proyecto](/guia/tus-datos/csv-proyecto/) — La columna `private` en project.csv
- [Configuración](/guia/configurar/configuracion/) — Clave de historia y opciones de interfaz
- [Actualizar Telar](/guia/configuracion/actualizacion/) — Paso manual obligatorio para sitios que se actualizan desde antes de v1.6.0
