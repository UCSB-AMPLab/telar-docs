---
layout: docs
title: 3.6. Páginas Personalizadas
parent: 3. Estructura de Contenido
grand_parent: Documentación
nav_order: 6
lang: es
permalink: /guia/estructura-de-contenido/paginas-personalizadas/
---

# Páginas personalizadas

Crea páginas personalizadas para créditos, metodología, información del equipo, o cualquier otro contenido que no encaje en la estructura de la historia.

## ¿Qué son las páginas personalizadas?

Las páginas personalizadas son páginas independientes que aparecen en el menú de navegación de tu sitio pero no son parte del visor de historia. A diferencia de las capas de historia, que están estrechamente integradas con objetos IIIF y navegación de pasos, las páginas personalizadas son contenedores flexibles para cualquier contenido que quieras compartir.

**Casos de uso comunes:**
- **Acerca de**: Presenta tu proyecto y equipo de investigación
- **Metodología**: Explica tus métodos de investigación y fuentes
- **Créditos**: Reconoce colaboradores, financiadores e instituciones
- **Bibliografía**: Lista fuentes y lecturas adicionales
- **Contacto**: Proporciona formas de ponerse en contacto

## Crear una página personalizada

### Paso 1: crea el archivo Markdown

Agrega un nuevo archivo `.md` en el directorio `components/texts/pages/`:

```
components/texts/pages/
├── about.md          # Página predeterminada (incluida en la plantilla)
├── credits.md        # Tu página de créditos personalizada
└── methodology.md    # Tu página de metodología personalizada
```

### Paso 2: escribe tu contenido

Las páginas personalizadas usan markdown estándar con soporte completo para widgets y glosario:

```markdown
---
---

# Acerca de este proyecto

Este archivo digital explora redes comerciales coloniales a través de...

## Equipo de investigación

- **Investigador Principal**: Dr. Jane Smith
- **Desarrollador de Humanidades Digitales**: Alex Chen
- **Investigadores de Posgrado**: María González, John Davis

## Reconocimientos

Este proyecto fue posible gracias a...

<div class="accordion">
<details>
<summary>Fuentes de Financiamiento</summary>

- National Endowment for the Humanities
- University Research Grant Program
- Digital Scholarship Initiative

</details>
</details>
```

{: .note }
> El frontmatter (líneas `---`) es requerido pero puede estar vacío. Le indica a Jekyll que procese el archivo.

### Paso 3: agrega a la navegación

Actualiza `_data/navigation.yml` para incluir tu nueva página en el menú. Consulta [Configuración de Navegación](/guia/personalizacion/menu-navegacion/) para más detalles.

## Funcionalidades soportadas

Las páginas personalizadas soportan las mismas funcionalidades de markdown que las capas de historia:

### Formato markdown
- **Encabezados** (h1-h6)
- **Negrita**, *cursiva* y otro formato de texto
- Listas (con viñetas y numeradas)
- Enlaces e imágenes
- Citas en bloque

### Widgets
Todos los widgets de Telar funcionan en páginas personalizadas:

- **Acordeón**: Secciones colapsables
- **Pestañas**: Paneles de contenido con pestañas
- **Carrusel**: Presentaciones de imágenes

Consulta [Referencia de Sintaxis Markdown](/guia/referencia/sintaxis-markdown/) para documentación completa de widgets.

### Enlaces de glosario

El enlace automático del glosario funciona de la misma manera:

```markdown
El sistema de [term:encomienda] fue una institución clave...
```

Cuando los usuarios hacen clic en el enlace, el panel de glosario se abre con la definición.

## Diseño y estilo

Las páginas personalizadas usan el layout `user-page`, que proporciona:

- **Contenedor responsivo**: El contenido está centrado y limitado para legibilidad
- **Encabezado/pie de página consistentes**: Menú de navegación y marca del sitio
- **Procesamiento de widgets**: Soporte para acordeón, pestañas y carrusel
- **Integración de glosario**: Enlace automático y visualización de panel

## Nombres de archivo

Los nombres de archivo determinan la URL de la página:

| Archivo | URL |
|------|-----|
| `about.md` | `/about/` |
| `credits.md` | `/credits/` |
| `methodology.md` | `/methodology/` |
| `team-bios.md` | `/team-bios/` |

**Reglas de nombres:**
- Usa minúsculas
- Usa guiones para espacios (no guiones bajos)
- Usa nombres descriptivos (el nombre del archivo se convierte en la URL)

## Ejemplo: página de créditos

Aquí hay un ejemplo completo que muestra créditos con un acordeón para reconocimientos detallados:

```markdown
---
---

# Créditos

## Equipo del proyecto

**Investigador Principal**: Dr. Elena Martínez (University of California)
**Coordinador de Investigación Digital**: James Park (UCSB Library)
**Asistentes de Investigación**: Sofia Rodriguez, Michael Chen

## Financiamiento

Este proyecto recibió generoso apoyo de:

- National Endowment for the Humanities (Grant #AB-12345)
- Andrew W. Mellon Foundation
- UC Digital Humanities Program

## Créditos técnicos

Construido con [Telar](https://telar.org), un framework de código abierto para narrativa digital.

<div class="accordion">
<details>
<summary>Fuentes de Imágenes y Permisos</summary>

Todas las imágenes usadas con permiso:

- Pintura de Bogotá (1614): Princeton University Art Museum
- Mapas Coloniales: Library of Congress, Geography and Map Division
- Figuras de Cerámica: Smithsonian National Museum of the American Indian

</details>
<details>
<summary>Agradecimientos Especiales</summary>

Estamos agradecidos con las siguientes personas e instituciones:

- Archivo de Indias (Sevilla, España)
- Archivo Nacional de Colombia (Bogotá)
- Dr. Maria Santos por asistencia en investigación de archivo
- The Digital Scholarship Commons at UCSB

</details>
</div>
```

## Diferencias con las capas de historia

| Funcionalidad | Capas de Historia | Páginas Personalizadas |
|---------|--------------|--------------|
| Ubicación | `components/texts/stories/` | `components/texts/pages/` |
| Integración con visor | Sí (pantalla dividida con IIIF) | No (texto de ancho completo) |
| Navegación por pasos | Sí (coordinado con visor) | No (página independiente) |
| Widgets | Sí | Sí |
| Glosario | Sí | Sí |
| Navegación | Vía interfaz de historia | Vía menú del sitio |
| Estructura de URL | `/nombre-historia/` | `/nombre-pagina/` |

## Próximos pasos

- Aprende cómo [configurar la navegación](/guia/personalizacion/menu-navegacion/) para agregar páginas a tu menú
- Explora [sintaxis de widgets](/guia/referencia/sintaxis-markdown/) para acordeón, pestañas y carruseles
- Consulta [configuración de glosario](/guia/estructura-de-contenido/glosario/) para configurar el enlace automático

---

**Nuevo en v0.6.0**: Páginas personalizadas con soporte completo para widgets y glosario.
