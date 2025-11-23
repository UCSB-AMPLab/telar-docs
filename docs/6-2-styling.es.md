---
layout: default
title: 6.2. Estilos Avanzados
parent: 6. Personalización
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /guia/personalizacion/estilos/
---

## Estilos avanzados

Ve más allá de los temas con CSS personalizado, modificaciones de diseño y estilos de componentes.

## CSS personalizado

### Método 1: agrega a telar.scss

Edita `assets/css/telar.scss` para agregar estilos personalizados:

```scss
// Tus estilos personalizados
.story-step {
  padding: 2rem;
  border-left: 3px solid var(--primary-color);
}

.object-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
}
```

### Método 2: crea una hoja de estilos personalizada

Crea `assets/css/custom.css`:

```css
/* Ajustes personalizados */
.site-header {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
}

.story-answer {
  font-style: italic;
  color: #666;
}
```

Luego inclúyela en tu `_layouts/default.html`:

```html
<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
```

## Variables CSS

Telar usa propiedades personalizadas CSS que puedes sobrescribir:

```scss
:root {
  // Colores
  --primary-color: #c7522a;
  --secondary-color: #5f7351;
  --accent-color: #8b7355;
  --text-color: #333;
  --heading-color: #1a1a1a;

  // Tipografía
  --font-headings: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans Pro', sans-serif;

  // Espaciado
  --spacing-unit: 1rem;
  --story-step-padding: 3rem;

  // Bordes
  --border-radius: 4px;
  --border-color: #e0e0e0;
}
```

Sobrescribe estas en tu CSS personalizado para hacer cambios globales.

## Personalización del diseño

### Modifica los diseños

Edita archivos en el directorio `_layouts/`:

- `default.html`: Plantilla base (encabezado, pie de página, nav)
- `story.html`: Página de scrollytelling
- `object.html`: Página de detalle de objeto
- `glossary.html`: Página de término de glosario
- `home.html`: Diseño de página de inicio

### Modifica los includes

Edita componentes reutilizables en `_includes/`:

- `header.html`: Encabezado y navegación del sitio
- `footer.html`: Pie de página del sitio
- `story-step.html`: Paso individual de historia
- `object-card.html`: Tarjeta de cuadrícula de objetos

## Estilos de componentes

### Pasos de historia

```scss
.story-step {
  padding: var(--story-step-padding);
  margin-bottom: 2rem;

  .story-question {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .story-answer {
    font-size: 1.125rem;
    line-height: 1.6;
  }
}
```

### Paneles en capas

```scss
.layer-panel {
  background: white;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  .layer-title {
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
}
```

### Tarjetas de objeto

```scss
.object-card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;

  .object-thumbnail {
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .object-info {
    padding: 1rem;
  }
}
```

## Diseño adaptable

Ajusta los breakpoints y el comportamiento adaptable:

```scss
// Móvil
@media (max-width: 768px) {
  .story-container {
    flex-direction: column;
  }

  .story-viewer {
    position: static;
    height: 400px;
  }
}

// Tablet
@media (min-width: 769px) and (max-width: 1024px) {
  .story-step {
    padding: 2rem;
  }
}

// Escritorio
@media (min-width: 1025px) {
  .story-step {
    max-width: 600px;
  }
}
```

## Personalización de JavaScript

### Modificar el comportamiento de la historia

Edita `assets/js/story.js` para personalizar el comportamiento del desplazamiento:

```javascript
// Ajusta el desplazamiento
const scrollOffset = 100;  // píxeles desde la parte superior

// Personaliza la velocidad de zoom del visor
const zoomDuration = 500;  // milisegundos

// Agrega transiciones personalizadas por paso
function onStepEnter(step) {
  console.log('Entrando al paso:', step);
  // Tu lógica personalizada
}
```

### Agregar interacciones personalizadas

Crea `assets/js/custom.js`:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Desplazamiento suave a enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Animación en tarjetas de objeto al entrar en vista
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  });

  document.querySelectorAll('.object-card').forEach(card => {
    observer.observe(card);
  });
});
```

## Personalización de tipografía

### Estilos de encabezados

```scss
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headings);
  color: var(--heading-color);
  font-weight: 400;
  line-height: 1.2;
}

// Tamaños personalizados de encabezado
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
```

### Cuerpo de texto

```scss
body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
}

p {
  margin-bottom: 1rem;
}
```

## Animación

Agrega animaciones sutiles:

```scss
// Animación de aparición gradual
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

// Hover de tarjeta de objeto
.object-card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}
```

## Mejores prácticas

1. **Usa variables CSS** para valores que se repiten
2. **Prueba en múltiples tamaños de pantalla**
3. **Mantén accesibilidad** (contraste, navegación por teclado)
4. **Manténlo eficiente** (evita animaciones pesadas, imágenes grandes)
5. **Comenta tu código** para referencia futura
6. **Prueba en múltiples navegadores** (Chrome, Firefox, Safari)

## Optimización de rendimiento

```scss
// Usa will-change para animaciones
.animated-element {
  will-change: transform;
}

// Optimiza imágenes
.object-thumbnail {
  image-rendering: -webkit-optimize-contrast;
}

// Aceleración por hardware
.smooth-scroll {
  transform: translateZ(0);
}
```

## Próximos pasos

- [Conoce sobre temas](/documentacion/6-personalizacion/1-temas/)
- [Ver sitios de ejemplo](https://ampl.clair.ucsb.edu/telar)
- [Explora los diseños de Jekyll](https://jekyllrb.com/docs/layouts/)
