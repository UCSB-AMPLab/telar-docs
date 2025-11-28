---
layout: docs
title: 4.5. Contenido de demostración
parent: 4. Integración IIIF
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/iiif/contenido-demostracion/
---

# Contenido de demostración

Aprende de historias de ejemplo pre-construidas mientras desarrollas tu propio sitio Telar.

## ¿Qué es el contenido de demostración?

El contenido de demostración consiste en historias de ejemplo completas que muestran las funcionalidades de Telar. Estas historias se agregan automáticamente a tu sitio cuando están habilitadas, dándote ejemplos funcionales para explorar y aprender.

**Demos disponibles:**
- **Tutorial de Telar**: Un tutorial interactivo de 10 pasos que demuestra todas las funcionalidades de Telar
- **Paisajes coloniales**: Un extracto de 5 pasos de un proyecto de investigación real sobre mapas coloniales

Ambas demos incluyen:
- Narrativas de historia con paneles de capa
- Integración de imágenes IIIF
- Definiciones de glosario
- Ejemplos de widgets (acordeón, pestañas, carrusel)
- Imágenes autoalojadas y externas

## Cuándo usar contenido de demostración

### Habilita las demos cuando:
- **Aprendiendo Telar**: Explora cómo se estructuran y escriben las historias
- **Desarrollo local**: Prueba funcionalidades sin crear contenido
- **Demostraciones**: Muestra a las partes interesadas lo que Telar puede hacer
- **Referencia**: Ve ejemplos funcionales de funcionalidades específicas

### Deshabilita las demos cuando:
- **Sitios de producción**: Publicando tu proyecto final
- **Pruebas limpias**: Probando solo tu propio contenido
- **Despliegue público**: Compartiendo trabajo con audiencias

{: .tip }
> **Aprender de los Ejemplos**
> Las historias de demostración te muestran cómo estructurar narrativas, escribir paneles de capa, usar widgets e integrar imágenes IIIF. Úsalas como plantillas para tus propias historias.

## Habilitar contenido de demostración

### Paso 1: actualiza la configuración

Abre `_config.yml` y encuentra la sección `story_interface`:

```yaml
story_interface:
  show_story_steps: true
  include_demo_content: true    # Cambia a true
```

### Paso 2: reconstruye tu sitio

**Para GitHub Pages:**
1. Confirma el cambio a `_config.yml`
2. Envía a tu repositorio
3. Espera 2-3 minutos para que se complete la compilación

**Para desarrollo local:**
```bash
bundle exec jekyll build
bundle exec jekyll serve
```

El proceso de compilación automáticamente obtiene el contenido de demostración de content.telar.org y lo integra con tus historias.

## Qué verás

Cuando el contenido de demostración está habilitado:

### Página de inicio
Las historias de demostración aparecen junto con tus propias historias con una pequeña etiqueta "Contenido de demostración":

- **Tu historia** (si tienes una)
- **Tutorial de Telar** — Contenido de demostración
- **Paisajes coloniales** — Contenido de demostración

### Página de objetos
Los objetos de demostración se incluyen en el catálogo con la misma etiqueta.

### Glosario
Los términos de glosario de demostración aparecen con tus términos, también marcados con etiquetas.

## Resumen de historias de demostración

### Tutorial de Telar (10 pasos)

Un recorrido interactivo de las funcionalidades de Telar:

1. **Introducción a IIIF**: Usando recursos IIIF externos
2. **Imágenes Autoalojadas**: Generación de mosaicos IIIF
3. **Formato Markdown**: Estilo de texto con widget de pestañas
4. **Sistema de Coordenadas**: Entendiendo x, y, zoom
5-7. **Pan y Zoom**: Demostrando secuencias de coordenadas
8. **Enlace Automático de Glosario**: Términos con widget de pestañas
9. **Muestra de Widgets**: Ejemplos de carrusel y acordeón
10. **Medios Enriquecidos**: Próximos pasos y recursos

**Idiomas**: Disponible en inglés y español

### Paisajes coloniales (5 pasos)

Un extracto de un proyecto de historia digital que explora la cartografía colonial:

- Tradiciones de mapeo temprano
- Marcos legales coloniales españoles
- Retórica visual en mapas
- Imágenes históricas autoalojadas
- Técnicas narrativas académicas

**Idiomas**: Disponible en inglés y español

## Coincidencia de idioma

El contenido de demostración automáticamente coincide con el idioma de tu sitio:

| Idioma de Tu Sitio | Demos que Obtienes |
|-------------------|---------------|
| `telar_language: en` | Demos en inglés |
| `telar_language: es` | Demos en español |

Establece `telar_language` en `_config.yml` para controlar en qué idioma aparecen las demos.

## Cómo funciona

Cuando habilitas el contenido de demostración:

1. **Obtener**: Durante la compilación, Telar descarga un paquete de demos de content.telar.org
2. **Coincidencia de Versión**: El sistema selecciona demos compatibles con tu versión de Telar
3. **Fusionar**: Las historias, objetos y términos de glosario de demostración se fusionan con tu contenido
4. **Mostrar**: Las demos aparecen con etiquetas visuales para distinguirlas de tu trabajo

Cuando deshabilitas el contenido de demostración:

1. **Limpieza**: Telar elimina todos los archivos de demostración
2. **Reconstruir**: El sitio se reconstruye solo con tu contenido
3. **Sin rastros**: Las demos no dejan artefactos en tu repositorio

## Deshabilitar contenido de demostración

### Paso 1: actualiza la configuración

Cambia `include_demo_content` a `false`:

```yaml
story_interface:
  show_story_steps: true
  include_demo_content: false    # Deshabilita demos
```

### Paso 2: reconstruye tu sitio

Confirma, envía y espera la reconstrucción (GitHub Pages) o ejecuta `bundle exec jekyll build` (local).

Todo el contenido de demostración se elimina automáticamente.

## Usar las demos como plantillas

### Ver contenido fuente de demos

El contenido de demostración está alojado en [content.telar.org](https://content.telar.org). Puedes ver:

- Estructuras CSV de historias
- Markdown de paneles de capa
- Definiciones de glosario
- Sintaxis de widgets
- Patrones de integración de imágenes

### Adaptar patrones de demos

Patrones comunes para adaptar de las demos:

**Del Tutorial de Telar:**
- Estructura narrativa Pregunta/Respuesta/Invitación
- Secuencias de coordenadas para argumentos visuales
- Integración de widgets (pestañas, acordeón, carrusel)
- Definiciones de términos de glosario

**De Paisajes Coloniales:**
- Tono narrativo académico
- Flujo de trabajo de imágenes autoalojadas
- Paneles de capa de contexto histórico
- Prácticas de citación académica

## Contenido de demostración vs. tu contenido

| Aspecto | Tu Contenido | Contenido de Demostración |
|--------|--------------|--------------|
| Ubicación | Directorio `components/` | Descargado durante compilación |
| Editable | Sí | No (solo vista) |
| Etiqueta | Ninguna | Etiqueta "Contenido de demostración" |
| Rastreado en git | Sí | No |
| Persistencia | Permanente | Solo mientras esté habilitado |
| Personalizable | Completamente | No editable |

## Solución de Problemas

### Las Demos No Aparecen

Si las demos no se muestran después de habilitar:

1. **Verifica sintaxis de configuración**: Verifica `include_demo_content: true` (no `enabled` o `yes`)
2. **Reconstrucción completada**: Espera a que termine GitHub Actions
3. **Limpia caché del navegador**: Actualización forzada con Ctrl+Shift+R (Cmd+Shift+R en Mac)
4. **Verifica log de compilación**: Busca errores en el flujo de trabajo de GitHub Actions

### Demos en Idioma Incorrecto

Si las demos aparecen en idioma inesperado:

1. Verifica la configuración de `telar_language` en `_config.yml`
2. Reconstruye el sitio después de cambiar la configuración de idioma
3. Limpia caché del navegador

### Errores de Red

Si la compilación falla con errores de obtención de demos:

- Telar continúa compilando sin demos aunque falle la descarga
- Tu propio contenido aún aparece
- Verifica disponibilidad de content.telar.org
- Deshabilita temporalmente las demos si la obtención falla consistentemente

## Próximos Pasos

- Explora la demo [Tutorial de Telar](/) para aprender funcionalidades principales
- Revisa la demo [Paisajes Coloniales](/) para técnicas narrativas académicas
- Crea tu primera historia usando patrones de las demos
- Deshabilita las demos cuando estés listo para desplegar tu sitio de producción

---

**Nuevo en v0.6.0**: Historias de demostración obtenidas automáticamente con coincidencia de versión y soporte de idioma.
