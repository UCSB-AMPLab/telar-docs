---
layout: docs
title: "8.5. Advanced Styling"
parent: "8. For Developers"
grand_parent: Documentation
nav_order: 5
lang: en
permalink: /docs/developers/styling/
---

# Advanced Styling

Go beyond themes with custom CSS, layout modifications, and component styling.

## Custom CSS

### Method 1: Add to telar.scss

Edit `assets/css/telar.scss` to add custom styles:

```scss
// Your custom styles
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

### Method 2: Create Custom Stylesheet

Create `assets/css/custom.css`:

```css
/* Custom overrides */
.site-header {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
}

.story-answer {
  font-style: italic;
  color: #666;
}
```

Then include it in your `_layouts/default.html`:

```html
<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
```

## CSS Variables

Telar uses CSS custom properties that you can override:

```scss
:root {
  // Colors
  --primary-color: #c7522a;
  --secondary-color: #5f7351;
  --accent-color: #8b7355;
  --text-color: #333;
  --heading-color: #1a1a1a;

  // Typography
  --font-headings: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans Pro', sans-serif;

  // Spacing
  --spacing-unit: 1rem;
  --story-step-padding: 3rem;

  // Borders
  --border-radius: 4px;
  --border-color: #e0e0e0;
}
```

Override these in your custom CSS to make global changes.

## Layout Customization

### Modify Layouts

Edit files in `_layouts/` directory:

- `default.html`: Base template (header, footer, nav)
- `story.html`: Scrollytelling page
- `object.html`: Object detail page
- `glossary.html`: Glossary term page
- `home.html`: Homepage layout

### Modify Includes

Edit reusable components in `_includes/`:

- `header.html`: Site header and navigation
- `footer.html`: Site footer
- `story-step.html`: Individual story step
- `object-card.html`: Object grid card

## Component Styling

### Story Steps

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

### Layered Panels

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

### Object Cards

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

## Responsive Design

Override breakpoints and responsive behavior:

```scss
// Mobile
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

// Desktop
@media (min-width: 1025px) {
  .story-step {
    max-width: 600px;
  }
}
```

## JavaScript Customization

### Modify Story Behavior

Edit `assets/js/story.js` to customize scrolling behavior:

```javascript
// Adjust scroll offset
const scrollOffset = 100;  // pixels from top

// Customize viewer zoom speed
const zoomDuration = 500;  // milliseconds

// Add custom step transitions
function onStepEnter(step) {
  console.log('Entering step:', step);
  // Your custom logic
}
```

### Add Custom Interactions

Create `assets/js/custom.js`:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scroll to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Add animation to object cards on scroll
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

## Typography Customization

### Heading Styles

```scss
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headings);
  color: var(--heading-color);
  font-weight: 400;
  line-height: 1.2;
}

// Custom heading sizes
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
```

### Body Text

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

## Animation

Add subtle animations:

```scss
// Fade in animation
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

// Object card hover
.object-card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}
```

## Best Practices

1. **Use CSS variables** for values that repeat
2. **Test responsive** on multiple screen sizes
3. **Maintain accessibility** (contrast, keyboard navigation)
4. **Keep it performant** (avoid heavy animations, large images)
5. **Comment your code** for future reference
6. **Test in multiple browsers** (Chrome, Firefox, Safari)

## Performance Optimization

```scss
// Use will-change for animations
.animated-element {
  will-change: transform;
}

// Optimize images
.object-thumbnail {
  image-rendering: -webkit-optimize-contrast;
}

// Hardware acceleration
.smooth-scroll {
  transform: translateZ(0);
}
```

## Next Steps

- [Learn about Themes](/docs/customization/themes/)
- [View Example Sites](https://ampl.clair.ucsb.edu/telar)
- [Explore Jekyll Layouts](https://jekyllrb.com/docs/layouts/)
