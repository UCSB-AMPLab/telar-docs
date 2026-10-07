---
layout: docs
title: "7.1. Temas"
parent: "7. Personalización"
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/personalizacion/temas/
---

## Temas

Telar incluye cinco temas visuales listos para usar, y puedes cambiarlos desde `_config.yml`.

## Temas disponibles

### Trama (predeterminado)

La identidad visual de Telar, diseñada por Adelaida Ávila. Terracota y lavanda, con encabezados en Space Grotesk.

**Colores:**
- Encabezados: gris oscuro `#333333`
- Enlaces y botones: terracota `#883C36`
- Paneles: lavanda `#C6D0F8` y terracota `#883C36`
- Glosario: crema `#FFF6EF`

**Tipografía:** encabezados en Space Grotesk, cuerpo en Roboto Condensed.

**Ideal para:** la mayoría de las exhibiciones; es el tema más versátil.

### Paisajes Coloniales

Colores de tierra y cielo, del proyecto [Paisajes Coloniales](https://paisajescoloniales.com). Azul pizarra y ciruela, con encabezados en Playfair Display.

**Colores:**
- Encabezados y botones: azul pizarra `#2c3e50`
- Enlaces: marrón cuero `#8b4513`
- Paneles: azul pálido `#A8C5D4` y ciruela `#3d2645`
- Glosario: arena `#F5EDE1`

**Tipografía:** encabezados en Playfair Display, cuerpo en Source Sans Pro.

**Ideal para:** narrativas históricas y exhibiciones arqueológicas.

### Neogranadina

Verde y carmesí encendidos sobre carbón, con IM Fell, una tipografía tomada de los punzones de una imprenta del siglo XVII.

**Colores:**
- Encabezados: negro `#000000`
- Enlaces: coral `#D35F3A`
- Botones: carbón `#2A2F36`
- Paneles: verde `#00b35c` y carmesí `#b31235`
- Glosario: blanco hueso `#F5F7FA`

**Tipografía:** encabezados en IM Fell DW Pica, cuerpo en Mulish.

**Ideal para:** materiales de archivo.

### Santa Barbara

Dorado y azul marino, los colores de la Universidad de California en Santa Bárbara, con encabezados en Roboto Serif.

**Colores:**
- Encabezados: azul marino `#003660`
- Enlaces: verde azulado `#047C91`
- Botones: dorado `#FEBC11`
- Paneles: verde azulado `#047C91` y azul marino `#003660`
- Glosario: piedra `#F1EEEA`

**Tipografía:** encabezados en Roboto Serif, cuerpo en Nunito Sans.

**Ideal para:** imágenes en escala de grises y monocromas.

### Austin

El naranja quemado de la Universidad de Texas en Austin, con verde salvia y piedra, y encabezados en Crimson Pro.

**Colores:**
- Encabezados, enlaces y botones: naranja quemado `#BF5700`
- Paneles: gris azulado `#9CADB7` y verde salvia `#577565`
- Glosario: piedra `#D6D2C4`

**Tipografía:** encabezados en Crimson Pro, cuerpo en Inter.

**Ideal para:** materiales contemporáneos.

## Cambia temas

Edita `_config.yml` en tu repositorio:

```yaml
telar_theme: "santa-barbara"  # Opciones: trama, paisajes, neogranadina, santa-barbara, austin
```

Confirma el cambio y GitHub Actions reconstruirá tu sitio automáticamente (2-5 minutos).

## Crea temas personalizados

### Paso 1: crea un archivo de tema

Crea el archivo `_data/themes/custom.yml`. Los colores se agrupan en `colors.text` y `colors.background`, y las fuentes en `fonts`:

```yaml
name: "Mi tema"

colors:
  text:
    heading: "#1a1a1a"        # Encabezados
    body: "#333333"           # Texto del cuerpo
    link: "#883C36"           # Enlaces
    button: "#FFFFFF"         # Texto de los botones
    panel_layer1: "#333333"   # Texto del panel de la capa 1
    panel_layer2: "#FFFFFF"   # Texto del panel de la capa 2
    panel_glossary: "#333333" # Texto del panel del glosario

  background:
    button: "#883C36"         # Fondo de los botones
    panel_layer1: "#C6D0F8"   # Fondo del panel de la capa 1
    panel_layer2: "#883C36"   # Fondo del panel de la capa 2
    panel_glossary: "#FFF6EF" # Fondo del panel del glosario

fonts:
  headings: "'Playfair Display', Georgia, serif"
  body: "'Source Sans Pro', -apple-system, sans-serif"
```

Lo más rápido es copiar uno de los temas que ya vienen en `_data/themes/` y cambiarle los valores. Todas las claves son opcionales: la que no pongas toma el valor de Trama.

{: .warning }
> Telar solo lee las claves que aparecen aquí. Un archivo con otros nombres de clave se carga sin errores, pero no cambia nada: tu sitio se ve con los colores predeterminados. La salida del *build* nombra las claves que Telar buscó y no encontró.

### Paso 2: activa el tema personalizado

En `_config.yml`:

```yaml
telar_theme: "custom"
```

### Paso 3: prueba y refina

1. Confirma cambios
2. Espera a que se construya el sitio
3. Revisa tu sitio
4. Ajusta colores y fuentes según sea necesario

## Claves de color del tema

Todos los temas admiten estas claves de color:

| Clave | Uso |
|-------|-----|
| `colors.text.heading` | Todos los niveles de encabezado |
| `colors.text.body` | Texto del cuerpo |
| `colors.text.link` | Enlaces |
| `colors.text.button` | Texto de los botones |
| `colors.text.panel_layer1` | Texto del panel de la capa 1 |
| `colors.text.panel_layer2` | Texto del panel de la capa 2 |
| `colors.text.panel_glossary` | Texto del panel del glosario |
| `colors.background.button` | Fondo de los botones |
| `colors.background.panel_layer1` | Fondo del panel de la capa 1 |
| `colors.background.panel_layer2` | Fondo del panel de la capa 2 |
| `colors.background.panel_glossary` | Fondo del panel del glosario |

{: .note }
> Telar revisa el contraste del texto sobre los cuatro fondos de `colors.background`. Consulta [Accesibilidad del color](#accesibilidad-del-color).

## Claves de tipografía

Estas dos claves controlan las fuentes de todo el sitio:

| Clave | Uso |
|-------|-----|
| `fonts.headings` | h1–h6, títulos de página |
| `fonts.body` | Párrafos, listas, texto general |

### Ejemplos de fuentes

Las dos claves van dentro de `fonts`, y cada una recibe una lista de fuentes: la que quieres y, después, las que el navegador usa si no puede cargar la primera.

**Encabezados serif:**
```yaml
fonts:
  headings: "'Playfair Display', Georgia, serif"
```
O `'Merriweather', Georgia, serif`, o `'Lora', Georgia, serif`.

**Encabezados sans-serif:**
```yaml
fonts:
  headings: "'Montserrat', Helvetica, sans-serif"
```
O `'Raleway', Arial, sans-serif`.

**Fuentes del cuerpo:**
```yaml
fonts:
  body: "'Source Sans Pro', sans-serif"
```
O `'Open Sans', Helvetica, sans-serif`, o `'Crimson Text', Georgia, serif`.

## Usa Google Fonts

Para usar fuentes no incluidas por defecto:

1. Encuentra tu fuente en [Google Fonts](https://fonts.google.com/)
2. Agrega import a `assets/css/telar.scss`:
   ```scss
   @import url('https://fonts.googleapis.com/css2?family=Tu+Fuente:wght@400;600;700&display=swap');
   ```
3. Referencia en archivo de tema:
   ```yaml
   fonts:
     headings: "'Tu Fuente', serif"
   ```

## Atribución de la persona creadora del tema

Telar v0.4.0+ permite añadir atribución opcional para reconocer a quienes diseñan temas personalizados en el pie de página del sitio.

### Agrega atribución a temas personalizados

Al crear un tema propio, agrega la información de la persona creadora en tu archivo YAML:

```yaml
name: "Miami"
description: "Retro Cool. Digital Heat."
creator: "Material/Image Research Lab"
creator_url: "https://mirl.ucsb.edu"

colors:
   text:
      heading: "#F990E8"
      body: "#000000"
      link: "#0BD2D3"
      button: "#F990E8"
      panel_layer1: "#FFFFFF"
      panel_layer2: "#FFFFFF"
      panel_glossary: "#FFFFFF"

   background:
      button: "#0BD2D3"
      panel_layer1: "#F990E8"
      panel_layer2: "#0BD2D3"
      panel_glossary: "#F990E8"

fonts:
   headings: "'Limelight', serif"
   body: "'Inter', sans-serif"
```

### Campos de atribución

Todos los campos son opcionales:

**name** - Nombre visible del tema
```yaml
name: "Miami"
```

**creator** - Persona u organización que diseñó el tema
```yaml
creator: "Material/Image Research Lab"
creator: "Jeff"
```

**creator_url** - Sitio web o perfil para enlazar la atribución
```yaml
creator_url: "https://mirl.ucsb.edu"
creator_url: "https://github.com/mirl-ucsb"
```

**description** - Nota breve sobre el diseño (uso interno)
```yaml
description: "Retro Cool. Digital Heat."
```

### Cómo se muestra la atribución

Cuando agregas información de atribución, aparece en el pie de página:

**Con nombre y creadora:**
"Miami theme by MIRL Lab" (enlazado a `creator_url` si existe)

**Solo con creadora:**
"Theme by MIRL Lab"

**Solo con nombre:**
"Miami theme"

**Sin ninguno:**
No se muestra atribución

### Atribución para temas predeterminados

Todos los temas incluidos en Telar traen atribución por defecto:

**Trama**
- Creador: Telar
- URL: https://telar.org

**Paisajes Coloniales**
- Creador: Neogranadina
- URL: https://neogranadina.org

**Neogranadina**
- Creador: Neogranadina
- URL: https://neogranadina.org

**Santa Barbara**
- Creador: AMPL en UC Santa Barbara
- URL: https://ampl.clair.ucsb.edu

**Austin**
- Creador: AMPL en UT Austin
- URL: https://liberalarts.utexas.edu/history/

### Comparte temas personalizados

Si quieres compartir un tema con la comunidad de Telar:

1. Incluye metadatos completos de atribución
2. Documenta la paleta de colores y la lógica del diseño
3. Describe recomendaciones de uso (ej., ideal para imágenes en escala de grises)
4. Compártelo en el foro [Telar Discussions](https://github.com/UCSB-AMPLab/telar/discussions)

### Quitar la atribución

Si prefieres usar un tema sin atribución:

- Omite los campos `creator` y `creator_url` en el archivo del tema
- O asígnales cadenas vacías:
   ```yaml
   creator: ""
   creator_url: ""
   ```

No se mostrará ninguna atribución en el pie de página.

## Accesibilidad del color

Cada tema empareja un color de texto con un fondo: `colors.text.panel_layer1` va sobre `colors.background.panel_layer1`, y así con los demás. Cuando los dos se parecen demasiado en brillo, cuesta leer el texto.

### Cómo revisa Telar tus colores

Al construir el sitio, Telar calcula un color de texto que alcance una relación de contraste de 4,5:1 sobre cada uno de los cuatro fondos: `button`, `panel_layer1`, `panel_layer2` y `panel_glossary`. Ese es el nivel AA de WCAG para texto de tamaño normal.

Telar también calcula el color del texto que va sobre `colors.text.heading` allí donde ese color se usa como fondo, como en las etiquetas de los filtros activos de la página de objetos. Ese color de texto no se escoge en el archivo del tema, así que ahí Telar no reemplaza ninguna decisión tuya.

Telar empieza por el color que escogiste y lo conserva siempre que llegue a 4,5:1, así que un tema cuyos colores cumplen se ve tal como lo escribiste. Solo cuando ese color no alcanza el nivel, Telar busca otro, en este orden:

1. `colors.text.heading` o `colors.text.button`, el que tenga mayor contraste sobre ese fondo
2. blanco o negro, el que tenga mayor contraste

### Cuando Telar reemplaza un color

Telar escribe una línea en la salida del *build* por cada color que reemplaza:

```
Theme "santa-barbara": colors.text.button is #FFFFFF, a contrast ratio of 1.69:1 on its #FEBC11 background, below the 4.5:1 that text needs. Telar used #003660 instead, 7.32:1. To keep your own color, choose a lighter or darker colors.background.button.
```

El mensaje aparece en inglés.

Si todos los colores del tema cumplen, no aparece ninguna línea. Para conservar el color que querías, cambia el fondo en vez del texto.

### Lo que Telar no revisa

De esto te encargas tú:

- **El texto del cuerpo sobre el fondo de la página**
- **Los colores de enlace** (`colors.text.link`)
- **El texto grande (de 18 px o más)**, que necesita 3:1 y no 4,5:1
- **Los elementos interactivos**, que deben seguir siendo distinguibles

Para revisarlos, usa herramientas como el [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### Los colores que Telar no puede leer

Telar solo lee colores hexadecimales, como `#FFFFFF` o `#FFF`. Un color con nombre como `white`, o un valor `rgb()`, queda tal como lo escribiste: Telar no lo revisa y lo anota en la salida del *build*.

## Cuando falta el tema o una de sus claves

Si Telar no encuentra el archivo de tema que nombraste en `_config.yml`, vuelve al tema **Trama** y el sitio no se rompe. Si el archivo existe, Telar lo usa, incluso si no reconoce ninguno de los nombres de clave que trae. Cada clave que no pusiste toma el valor de Trama, y la salida del *build* dice cuáles faltan.

## Próximos pasos

- [Estilos avanzados](/guia/desarrolladores/estilos/) para personalización más profunda
- [Configuración](/guia/configurar/configuracion/) para otros ajustes del sitio
- [Ver temas de ejemplo](https://ampl.clair.ucsb.edu/telar) en acción
