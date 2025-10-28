---
layout: default
title: 6.1. Temas
parent: 6. Personalización
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /documentacion/6-personalizacion/1-temas/
---

## Temas

Telar incluye 4 temas visuales predeterminados que pueden cambiarse fácilmente vía `_config.yml`.

## Temas disponibles

### Paisajes Coloniales (predeterminado)

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
telar_theme: "santa-barbara"  # Opciones: paisajes, neogranadina, santa-barbara, austin
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

## Accesibilidad del color

Al crear temas personalizados, asegura buen contraste:

- **Texto sobre fondo**: Proporción de contraste mínima 4.5:1
- **Texto grande (18px+)**: Proporción de contraste mínima 3:1
- **Elementos interactivos**: Deben ser distinguibles

Usa herramientas como [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) para verificar.

## Respaldo del tema

Si falta un archivo de tema personalizado o tiene errores, Telar automáticamente vuelve al tema Paisajes, asegurando que tu sitio nunca se rompa.

## Próximos pasos

- [Estilos avanzados](/documentacion/6-personalizacion/2-estilos/) para personalización más profunda
- [Configuración](/documentacion/5-configuracion/) para otros ajustes del sitio
- [Ver temas de ejemplo](https://ampl.clair.ucsb.edu/telar) en acción
