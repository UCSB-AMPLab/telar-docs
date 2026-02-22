---
layout: docs
title: 5.5. Menú de navegación
parent: 5. Personalización
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/personalizacion/menu-navegacion/
---

# Configuración del menú de navegación

Personaliza el menú de navegación de tu sitio para incluir páginas personalizadas, enlaces externos y etiquetas bilingües.

## ¿Qué es el menú de navegación?

El menú de navegación aparece en el encabezado de tu sitio y proporciona enlaces a:
- Tus historias (generados automáticamente)
- Páginas personalizadas (Acerca de, Créditos, etc.)
- Índice de objetos (incluido automáticamente)
- Recursos externos (opcional)

## Cómo funciona

La navegación se configura a través de `_data/navigation.yml`. Este enfoque basado en datos te da control completo sobre la estructura y etiquetas del menú.

Cuando existe `navigation.yml`, Telar lo usa para construir tu menú. Si el archivo falta, aparece un menú de respaldo codificado con enlaces básicos (Historias, Objetos, Acerca de).

## Crear tu archivo de navegación

### Paso 1: crea el archivo

Agrega `navigation.yml` al directorio `_data/`:

```
_data/
├── navigation.yml    # Tu configuración de navegación personalizada
├── objects.json      # Datos de objetos generados
└── project.json      # Datos de proyecto generados
```

### Paso 2: define la estructura de tu menú

Aquí hay una configuración básica:

```yaml
menu:
  - title_en: "Stories"
    titulo_es: "Historias"
    url: "/"

  - title_en: "Objects"
    titulo_es: "Objetos"
    url: "/objects/"

  - title_en: "About"
    titulo_es: "Acerca de"
    url: "/about/"

  - title_en: "Credits"
    titulo_es: "Créditos"
    url: "/credits/"
```

### Campos requeridos

Cada elemento del menú necesita:

| Campo | Propósito | Ejemplo |
|-------|---------|---------|
| `title_en` | Etiqueta en inglés | `"About"` |
| `titulo_es` | Etiqueta en español | `"Acerca de"` |
| `url` | URL de la página | `"/about/"` |

### Campos opcionales

| Campo | Propósito | Ejemplo |
|-------|---------|---------|
| `external` | Abre en nueva pestaña | `true` |

## Tipos de elementos de menú

### Páginas internas

Enlaza a páginas dentro de tu sitio:

```yaml
- title_en: "Methodology"
  titulo_es: "Metodología"
  url: "/methodology/"
```

La URL debe coincidir con el nombre de archivo de tu página (`methodology.md` → `/methodology/`).

### Enlaces externos

Enlaza a recursos externos:

```yaml
- title_en: "Project Archive"
  titulo_es: "Archivo del Proyecto"
  url: "https://archive.example.org"
  external: true
```

Cuando `external: true`, el enlace se abre en una nueva pestaña con `target="_blank"`.

### Página de inicio de historias

Enlaza a la lista de historias:

```yaml
- title_en: "Stories"
  titulo_es: "Historias"
  url: "/"
```

### Índice de objetos

Enlaza al catálogo de objetos:

```yaml
- title_en: "Objects"
  titulo_es: "Objetos"
  url: "/objects/"
```

## Ejemplo completo

Aquí hay una configuración de navegación completa para un proyecto de investigación:

```yaml
menu:
  # Página de inicio de historias
  - title_en: "Stories"
    titulo_es: "Historias"
    url: "/"

  # Catálogo de objetos
  - title_en: "Objects"
    titulo_es: "Objetos"
    url: "/objects/"

  # Páginas personalizadas
  - title_en: "About"
    titulo_es: "Acerca de"
    url: "/about/"

  - title_en: "Methodology"
    titulo_es: "Metodología"
    url: "/methodology/"

  - title_en: "Team"
    titulo_es: "Equipo"
    url: "/team/"

  - title_en: "Credits"
    titulo_es: "Créditos"
    url: "/credits/"

  # Enlace externo
  - title_en: "Full Archive"
    titulo_es: "Archivo Completo"
    url: "https://archive.example.org"
    external: true
```

## Etiquetas bilingües

### Cómo funciona la selección de idioma

Telar muestra las etiquetas del menú según la configuración de idioma de tu sitio (`telar_language` en `_config.yml`):

- Si `telar_language: en` → Muestra etiquetas `title_en`
- Si `telar_language: es` → Muestra etiquetas `titulo_es`

### Comportamiento de respaldo

Si a un elemento del menú le falta la etiqueta del idioma apropiado, Telar aplica el siguiente orden de recurrencia:

1. Intenta etiqueta del idioma actual (`title_en` o `titulo_es`)
2. Si falta, intenta el otro idioma
3. Si faltan ambas, muestra la URL como etiqueta

## Orden del menú

Los elementos del menú aparecen en el orden en que los listas en `navigation.yml`:

```yaml
menu:
  - title_en: "Stories"      # Aparece primero
    ...
  - title_en: "Objects"      # Aparece segundo
    ...
  - title_en: "About"        # Aparece tercero
    ...
```

## Actualizar el menú

### Agregar una nueva página

Cuando creas una nueva página personalizada:

1. Crea el archivo markdown (`components/texts/pages/contact.md`)
2. Agrégalo a `navigation.yml`:

```yaml
- title_en: "Contact"
  titulo_es: "Contacto"
  url: "/contact/"
```

3. Reconstruye tu sitio

El menú se actualiza automáticamente.

### Eliminar una página

Para eliminar una página del menú:

1. Elimina o comenta la entrada en `navigation.yml`:

```yaml
# - title_en: "Old Page"
#   titulo_es: "Página Antigua"
#   url: "/old-page/"
```

2. Reconstruye tu sitio

El archivo de la página puede permanecer en `components/texts/pages/` pero no aparecerá en la navegación.

### Reordenar elementos

Cambia el orden en `navigation.yml`:

```yaml
menu:
  # Mueve "About" al principio
  - title_en: "About"
    titulo_es: "Acerca de"
    url: "/about/"

  - title_en: "Stories"
    titulo_es: "Historias"
    url: "/"

  # Resto del menú...
```

## Menú de respaldo

Si `_data/navigation.yml` no existe, Telar muestra un menú de respaldo codificado:

- **Stories** (página de inicio)
- **Objects** (catálogo)
- **About** (si existe `about.md`)

Esto asegura que tu sitio siempre tenga navegación básica, incluso sin configuración.

## Solución de Problemas

### El Menú No se Actualiza

Si tus cambios de menú no aparecen:

1. **Verifica sintaxis YAML**: Usa un validador YAML para verificar que `navigation.yml` sea válido
2. **Reconstruye el sitio**: Ejecuta `bundle exec jekyll build` para regenerar
3. **Limpia caché del navegador**: Usa Ctrl+Shift+R (Cmd+Shift+R en Mac) para actualizar forzadamente
4. **Verifica ubicación del archivo**: El archivo debe estar en `_data/navigation.yml` (no `data/` o `_data/nav.yml`)

### Se Muestra el Idioma Incorrecto

Si las etiquetas del menú aparecen en el idioma incorrecto:

1. Verifica `telar_language` en `_config.yml`
2. Verifica que estés usando nombres de campo correctos (`title_en` y `titulo_es`, no `title` o `label`)
3. Asegúrate de que ambas etiquetas de idioma estén presentes

### El Enlace Externo No se Abre en Nueva Pestaña

Agrega el campo `external: true`:

```yaml
- title_en: "External Resource"
  titulo_es: "Recurso Externo"
  url: "https://example.com"
  external: true    # Requerido para nueva pestaña
```

## Mejores Prácticas

### Etiquetas Claras y Descriptivas

Usa etiquetas que describan claramente el destino:

**✓ Bien:**
```yaml
- title_en: "Research Methodology"
  titulo_es: "Metodología de Investigación"
```

**✗ Evita:**
```yaml
- title_en: "Info"
  titulo_es: "Info"
```

### Ordenamiento Consistente

Mantén elementos relacionados juntos:

```yaml
# Páginas del proyecto
- title_en: "About"
- title_en: "Team"
- title_en: "Methodology"

# Páginas de contenido
- title_en: "Stories"
- title_en: "Objects"

# Recursos externos
- title_en: "Archive"
```

### Limita la Longitud del Menú

Mantén menús enfocados (5-7 elementos es ideal). Para sitios más grandes, considera agrupar contenido de manera diferente o usar enlaces de pie de página para páginas secundarias.

## Documentación Relacionada

- [Páginas Personalizadas](/guia/estructura-de-contenido/paginas-personalizadas/) - Crear páginas para enlazar en la navegación
- [Referencia de Configuración](/guia/referencia/configuracion/) - Opciones completas de `_config.yml` incluyendo `telar_language`
- [Resumen de Personalización](/guia/personalizacion/) - Otras opciones de personalización

---

**Nuevo en v0.6.0**: Navegación personalizable con etiquetas bilingües y soporte para enlaces externos.
