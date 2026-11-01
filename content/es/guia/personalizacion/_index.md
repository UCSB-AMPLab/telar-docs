---
title: Personalización
url: /guia/personalizacion/
translationKey: docs-customization
type: guide
docs_section: reference
---

# Personalización {#guide-title}


## Personalización {#personalización}

Haz Telar tuyo con temas, estilos personalizados y modificaciones de diseño.

## Temas {#temas}

Telar incluye 4 temas predeterminados que puedes cambiar con una sola línea en `_config.yml`:

- **Paisajes Coloniales** (predeterminado): Tonos tierra con terracota y oliva
- **Neogranadina**: Burdeos colonial y dorado
- **Santa Barbara**: Turquesa y coral modernos
- **Austin**: Naranja quemado y azul pizarra

[Conoce sobre temas](/guia/personalizacion/temas/)

## Estilos avanzados {#estilos-avanzados}

Para una personalización más profunda, además de los temas, puedes modificar variables CSS, diseños y estilos de componentes.

[Guía de estilos avanzados](/guia/desarrolladores/estilos/)

## Cambio rápido de tema {#cambio-rápido-de-tema}

Cambia tu tema en `_config.yml`:

```yaml
telar_theme: "santa-barbara"  # Opciones: paisajes, neogranadina, santa-barbara, austin
```

Confirma el cambio y tu sitio se reconstruirá automáticamente con el nuevo tema.
