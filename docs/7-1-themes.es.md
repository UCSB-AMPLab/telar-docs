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

Telar incluye 5 temas visuales predeterminados que pueden cambiarse fácilmente vía `_config.yml`.

## Temas disponibles

### Trama (predeterminado)

La identidad visual de Telar, diseñada por Adelaida Ávila. Paleta de terracota cálido y lavanda suave.

**Colores:**
- Encabezados: Gris oscuro `#333333`
- Enlaces/botones: Terracota `#883C36`
- Paneles: Lavanda `#C6D0F8`
- Glosario: Crema `#FFF6EF`

**Tipografía:** Space Grotesk para encabezados, Roboto Condensed para cuerpo.

**Mejor para:** Un tema versátil, adecuado para la mayoría de exhibiciones.

### Paisajes coloniales

Tonos tierra inspirados en [Paisajes Coloniales](https://paisajescoloniales.com).

**Colores:**
- Primario: Terracota `#c7522a`
- Secundario: Oliva `#5f7351`
- Acento: Marrón cálido

**Mejor para:** Narrativas históricas, exposiciones arqueológicas.

### Neogranadina

Elegancia colonial con burdeos y dorado.

**Colores:**
- Primario: Burdeos `#8B0000`
- Secundario: Dorado colonial `#D4AF37`
- Acento: Rojo profundo

**Mejor para:** Materiales contemporáneos.

### Santa Barbara

Moderno y vibrante con inspiración costera.

**Colores:**
- Primario: Turquesa oceánico `#2E8B9E`
- Secundario: Coral `#FF6F61`
- Acento: Azul marino

**Mejor para:** Imágenes en escala de grises y monocromáticas.

### Austin

Atrevido y académico con naranja quemado.

**Colores:**
- Primario: Naranja quemado `#BF5700`
- Secundario: Azul pizarra `#005F86`
- Acento: Carbón

**Mejor para:** Materiales contemporáneos.

## Cambia temas

Edita `_config.yml` en tu repositorio:

```yaml
telar_theme: "santa-barbara"  # Opciones: trama, paisajes, neogranadina, santa-barbara, austin
```

Confirma el cambio y GitHub Actions reconstruirá tu sitio automáticamente (2-5 minutos).

## Crea temas personalizados

### Paso 1: crea un archivo de tema

Crea un nuevo archivo en `_data/themes/custom.yml`:

```yaml
# Colores
primary_color: "#2c3e50"
secondary_color: "#e74c3c"
accent_color: "#3498db"
text_color: "#333333"
heading_color: "#1a1a1a"
background_color: "#ffffff"

# Fuentes
font_headings: "Playfair Display, Georgia, serif"
font_body: "Source Sans Pro, -apple-system, sans-serif"
```

### Paso 2: activa el tema personalizado

En `_config.yml`:

```yaml
telar_theme: "custom"
```

### Paso 3: prueba y refina

1. Confirma cambios
2. Espera construcción automática
3. Revisa tu sitio
4. Ajusta colores y fuentes según sea necesario

## Variables de color del tema

Todos los temas soportan estas variables de color:

| Variable | Uso |
|----------|-----|
| `primary_color` | Color de marca principal, botones, enlaces |
| `secondary_color` | Acentos, botones secundarios |
| `accent_color` | Resaltados, estados al pasar el cursor |
| `text_color` | Texto del cuerpo |
| `heading_color` | Todos los niveles de encabezado |
| `background_color` | Fondo de página |

## Variables de tipografía

Controla fuentes en todo tu sitio:

| Variable | Uso |
|----------|-----|
| `font_headings` | h1-h6, títulos de página |
| `font_body` | Párrafos, listas, texto general |

### Ejemplos de fuentes

**Encabezados serif:**
```yaml
font_headings: "Playfair Display, Georgia, serif"
font_headings: "Merriweather, Georgia, serif"
font_headings: "Lora, Georgia, serif"
```

**Encabezados sans-serif:**
```yaml
font_headings: "Montserrat, Helvetica, sans-serif"
font_headings: "Raleway, Arial, sans-serif"
```

**Fuentes del cuerpo:**
```yaml
font_body: "Source Sans Pro, sans-serif"
font_body: "Open Sans, Helvetica, sans-serif"
font_body: "Crimson Text, Georgia, serif"
```

## Usa Google Fonts

Para usar fuentes no incluidas por defecto:

1. Encuentra tu fuente en [Google Fonts](https://fonts.google.com/)
2. Agrega import a `assets/css/telar.scss`:
   ```scss
   @import url('https://fonts.googleapis.com/css2?family=Tu+Fuente:wght@400;600;700&display=swap');
   ```
3. Referencia en archivo de tema:
   ```yaml
   font_headings: "Tu Fuente, serif"
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

Durante la construcción del sitio, Telar calcula un color de texto que alcance una relación de contraste de 4,5:1 sobre cada uno de los cuatro fondos: `button`, `panel_layer1`, `panel_layer2` y `panel_glossary`. Ese es el nivel AA de WCAG para texto de tamaño normal.

Telar empieza por el color que escogiste y lo conserva siempre que llegue a 4,5:1, así que un tema cuyos colores cumplen se ve tal como lo escribiste. Solo cuando ese color no alcanza el nivel, Telar busca otro, en este orden:

1. `colors.text.heading` o `colors.text.button`, el que tenga mayor contraste sobre ese fondo
2. blanco o negro, el que tenga mayor contraste

### Cuando Telar reemplaza un color

Telar escribe una línea en la salida de la *build* por cada color que reemplaza:

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

Telar solo lee colores hexadecimales, como `#FFFFFF` o `#FFF`. Un color con nombre como `white`, o un valor `rgb()`, queda tal como lo escribiste: Telar no lo revisa y lo anota en la salida de la *build*.

## Respaldo del tema

Si falta un archivo de tema personalizado o tiene errores, Telar automáticamente vuelve al tema **Trama**, asegurando que tu sitio nunca se rompa.

## Próximos pasos

- [Estilos avanzados](/guia/desarrolladores/estilos/) para personalización más profunda
- [Configuración](/guia/configurar/configuracion/) para otros ajustes del sitio
- [Ver temas de ejemplo](https://ampl.clair.ucsb.edu/telar) en acción
