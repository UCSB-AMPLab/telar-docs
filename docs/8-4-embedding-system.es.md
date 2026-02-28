---
layout: docs
title: "8.4. Arquitectura del sistema de inserción"
parent: "8. Para desarrolladores"
grand_parent: Documentación
nav_order: 4
lang: es
permalink: /guia/desarrolladores/sistema-insercion/
---

# Referencia del sistema de inserción

Referencia técnica para el sistema de inserción mediante iframe de Telar.

## Resumen de arquitectura

El sistema de inserción de Telar permite que las historias se muestren dentro de iframes en sitios web externos y plataformas LMS. El sistema está diseñado en torno a estos principios:

**Contenedores de altura fija:**
- Escritorio: Diseño fijo de 100vh con columnas lado a lado
- Móvil/*Embed*: Alturas fijas (visor 60vh, panel narrativo 40vh)
- El contenido se desplaza dentro de contenedores fijos

**Sin redimensionamiento dinámico:**
- A diferencia de sistemas que usan postMessage para redimensionar iframes
- Las personas eligen una altura fija apropiada mediante tamaños predefinidos
- La filosofía de diseño de Telar se basa en desplazamiento interno, no alturas variables

**Compatibilidad universal:**
- Funciona en cualquier plataforma que admita iframes
- No requiere integración especial
- Sin dependencias de APIs específicas de LMS

## Detección del modo *embed*

### Parámetro de URL

El modo *embed* se activa mediante el parámetro de URL `?embed=true`:

```
https://tusitio.com/stories/story-1/?embed=true
```

**Manejo del parámetro:**
- Detectado en `assets/js/embed.js`
- Almacenado en `window.telarEmbed.enabled`
- Disponible para todos los módulos JavaScript

### Implementación JavaScript

**Archivo:** `assets/js/embed.js`

```javascript
(function() {
  'use strict';

  // Analizar parámetros de URL
  const params = new URLSearchParams(window.location.search);
  const embedParam = params.get('embed');

  // Inicializar estado de embed
  window.telarEmbed = {
    enabled: embedParam === 'true'
  };

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (!window.telarEmbed.enabled) return;

    // Aplicar clase body de modo embed
    document.body.classList.add('embed-mode');

    // Crear banner "View full site"
    createEmbedBanner();
  }
})();
```

**Temporización:**
- Se ejecuta antes que otros scripts
- Usa DOMContentLoaded para asegurar que el elemento body existe
- La clase body se aplica antes de la inicialización de navegación

## Modificaciones CSS

### Estilos de modo *embed*

**Archivo:** `assets/css/telar.scss`

El selector `body.embed-mode` aplica estilos específicos de *embed*:

**Elementos ocultos:**
```scss
body.embed-mode {
  // Ocultar elementos de navegación
  .home-button {
    display: none !important;
  }

  .share-button {
    display: none !important;
  }

  // Ocultar texto de carga en contador de pasos
  .viewer-overlay {
    display: none;
  }
}
```

**Visibilidad forzada:**
```scss
body.embed-mode {
  // Siempre mostrar sugerencias de navegación móvil
  .nav-hint {
    display: block;
  }

  // Forzar botones de navegación en todos los tamaños de pantalla
  .arrow-nav-up,
  .arrow-nav-down {
    display: flex !important;
  }
}
```

**Personalización de flechas en escritorio para *embed*:**
```scss
body.embed-mode {
  @media (min-width: 768px) {
    .arrow-nav-up,
    .arrow-nav-down {
      // Diseño horizontal en la parte inferior
      left: 20%;
      bottom: max(8%, 1.5rem);

      // Efectos al pasar el cursor
      &:hover {
        transform: scale(1.1) translateY(-2px); // Flecha arriba
        box-shadow: 0 6px 16px rgba(0,0,0,0.3);
      }
    }
  }
}
```

***Embeds* de tamaño móvil (<768px):**
```scss
// Media query a nivel raíz para especificidad apropiada
@media (max-width: 767px) {
  body.embed-mode .arrow-nav-up,
  body.embed-mode .arrow-nav-down {
    // Pila vertical en el lado derecho
    right: 1rem;
    bottom: 50%;
    transform: translateY(50%);
  }
}
```

## Sistema de navegación

### Navegación en modo *embed*

**Archivo:** `assets/js/story.js`

```javascript
function initializeNavigation() {
  const isMobileViewport = window.innerWidth < 768;
  const isEmbedMode = window.telarEmbed?.enabled || false;

  if (isMobileViewport || isEmbedMode) {
    // Móvil o embed: Navegación por botones
    initializeEmbedNavigation();
  } else {
    // Escritorio: Acumulación de desplazamiento
    initializeDesktopNavigation();
  }
}
```

### Modos de navegación

**Escritorio (no *embed*):**
- Evento de rueda con acumulación de desplazamiento
- Umbral: 50vh (50% de la altura del viewport)
- Tiempo de espera: 600ms
- Límite máximo de delta de desplazamiento: 200px

**Móvil (<768px):**
- Solo navegación por botones
- Tiempo de espera de navegación de 400ms
- Pila vertical en el lado derecho

**Modo *embed* (todos los tamaños de pantalla):**
- Navegación por botones (igual que móvil)
- Escritorio: Diseño horizontal en la parte inferior
- Móvil: Pila vertical a la derecha
- Navegación por teclado preservada

### Creación de botones

```javascript
function createNavigationButtons() {
  const upBtn = document.createElement('button');
  upBtn.className = 'arrow-nav-up';
  upBtn.setAttribute('aria-label', 'Previous step');
  upBtn.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';

  const downBtn = document.createElement('button');
  downBtn.className = 'arrow-nav-down';
  downBtn.setAttribute('aria-label', 'Next step');
  downBtn.innerHTML = '<span class="material-symbols-outlined">arrow_downward</span>';

  // Adjuntar detectores de eventos
  upBtn.addEventListener('click', () => navigateSteps('previous'));
  downBtn.addEventListener('click', () => navigateSteps('next'));

  document.body.appendChild(upBtn);
  document.body.appendChild(downBtn);
}
```

## Banner "View Full Site"

### Creación del banner

**Archivo:** `assets/js/embed.js`

```javascript
function createEmbedBanner() {
  // Obtener cadenas de idioma de Jekyll
  const lang = window.telarLang?.embedBanner || {
    text: 'This story is part of {site_name}...',
    link: 'View the complete site'
  };

  const siteName = getSiteName();
  const siteUrl = getFullSiteUrl();

  const banner = document.createElement('div');
  banner.className = 'embed-banner';
  banner.innerHTML = `
    <span class="embed-banner-text">
      ${lang.text.replace('{site_name}', siteName)}
    </span>
    <a href="${siteUrl}" target="_blank" class="embed-banner-link">
      ${lang.link}
    </a>
    <button class="embed-banner-close" aria-label="Close banner">×</button>
  `;

  document.body.appendChild(banner);

  // Manejar descarte
  banner.querySelector('.embed-banner-close').addEventListener('click', () => {
    banner.remove();
  });
}
```

### Estilos del banner

```scss
.embed-banner {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 380px;

  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

**Comportamiento:**
- Aparece en cada carga de página en modo *embed*
- Descartable mediante botón X
- Sin persistencia de sessionStorage
- Enlaza a la página de inicio del sitio (no a la página de historia)

## Panel de compartir e insertar

### Generación de código de inserción

**Archivo:** `assets/js/share-panel.js`

```javascript
function generateEmbedCode() {
  if (!currentStoryUrl) return '';

  const width = embedWidthInput.value.trim() || '100%';
  const height = embedHeightInput.value.trim() || '800';

  // Normalizar dimensiones
  const widthAttr = normalizeDimension(width);
  const heightAttr = normalizeDimension(height);

  // Construir URL de embed
  const embedUrl = addEmbedParameter(currentStoryUrl);

  // Obtener título de historia
  const storyTitle = getStoryTitle();

  // Generar código iframe
  const iframeCode = `<iframe src="${embedUrl}"
  width="${widthAttr}"
  height="${heightAttr}"
  title="${storyTitle}"
  frameborder="0">
</iframe>`;

  return iframeCode;
}
```

### Limpieza de URL

```javascript
function addEmbedParameter(url) {
  try {
    const urlObj = new URL(url);
    // Limpiar parámetros de consulta y hash existentes
    urlObj.search = '';
    urlObj.hash = '';
    // Agregar parámetro embed limpio
    urlObj.searchParams.set('embed', 'true');
    return urlObj.toString();
  } catch (e) {
    // Alternativa si el análisis de URL falla
    const cleanUrl = url.split(/[?#]/)[0];
    return cleanUrl + '?embed=true';
  }
}
```

**Propósito:**
- Elimina el estado del visor (coordenadas hash)
- Elimina cualquier parámetro de consulta existente
- Agrega parámetro limpio `?embed=true`
- Asegura que el *embed* siempre comience en el paso 1

### Tamaños predefinidos

**Archivo:** `assets/js/share-panel.js`

```javascript
const presets = {
  canvas: { width: '100%', height: '800' },
  moodle: { width: '100%', height: '700' },
  wordpress: { width: '100%', height: '600' },
  squarespace: { width: '100%', height: '600' },
  wix: { width: '100%', height: '550' },
  mobile: { width: '375', height: '500' },
  fixed: { width: '800', height: '600' }
};
```

### Normalización de dimensiones

```javascript
function normalizeDimension(value) {
  // Si es solo un número, agregar 'px'
  if (/^\d+$/.test(value)) {
    return value + 'px';
  }
  return value;
}
```

**Formatos aceptados:**
- `100%` → `100%`
- `800px` → `800px`
- `800` → `800px` (agrega px automáticamente)

## Soporte multilingüe

### Inyección de cadenas de idioma

**Archivo:** `_layouts/story.html`

```liquid
<script>
  window.telarLang = window.telarLang || {};
  window.telarLang.embedBanner = {
    text: {{ site.data.languages[site.telar_language].embed_banner.text | jsonify }},
    link: {{ site.data.languages[site.telar_language].embed_banner.link | jsonify }}
  };
</script>
```

**Proceso:**
1. Jekyll procesa etiquetas liquid durante la construcción
2. Las cadenas de idioma se inyectan en `window.telarLang`
3. JavaScript lee desde `window.telarLang.embedBanner`
4. Alternativa al inglés si faltan datos de idioma

### Archivos de idioma

**Inglés:** `_data/languages/en.yml`
```yaml
embed_banner:
  text: "This story is part of {site_name}, a digital storytelling site built with <a href='https://github.com/UCSB-AMPLab/telar' target='_blank'>Telar</a>."
  link: "View the complete site"
```

**Español:** `_data/languages/es.yml`
```yaml
embed_banner:
  text: "Esta historia forma parte de {site_name}, un sitio web creado con <a href='https://github.com/UCSB-AMPLab/telar' target='_blank'>Telar</a> para contar historias."
  link: "Ver el sitio completo"
```

## Compatibilidad de navegadores

### Navegadores admitidos

El modo *embed* de Telar funciona en todos los navegadores modernos:

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **Navegadores móviles** (iOS Safari, Chrome Android)

### Consideraciones de iframe

**Mismo origen vs. origen cruzado:**
- Los *embeds* de Telar son de origen cruzado (dominio diferente al anfitrión)
- Sin acceso a localStorage/sessionStorage entre orígenes
- Sin acceso al marco padre (seguridad intencional)
- El iframe anidado de UniversalViewer funciona correctamente

**Iframes anidados:**
- Historia de Telar (iframe 1)
  - UniversalViewer (iframe 2)
    - Teselas IIIF (fuentes de imagen)

**Rendimiento:**
- Los navegadores modernos manejan iframes anidados eficientemente
- La carga de teselas IIIF no se ve afectada por el contexto iframe
- Los modales Bootstrap (glosario, panel de compartir) funcionan correctamente

## Probar el modo *embed*

### Pruebas locales

**Estructura del archivo de prueba:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Prueba de Embed</title>
</head>
<body>
  <h1>Canvas LMS (100% × 800px)</h1>
  <iframe src="http://localhost:4001/telar/stories/story-1/?embed=true"
    width="100%"
    height="800px"
    title="Historia de prueba"
    frameborder="0">
  </iframe>

  <!-- Probar otros tamaños predefinidos -->
</body>
</html>
```

**Lista de verificación de pruebas:**
- [ ] El banner de *embed* aparece y es descartable
- [ ] Los botones de navegación funcionan (clic y teclado)
- [ ] El visor IIIF carga y hace zoom correctamente
- [ ] El panel de compartir se abre y funciona
- [ ] Los enlaces del glosario funcionan
- [ ] Los modales Bootstrap se muestran correctamente
- [ ] Los botones de inicio y compartir están ocultos
- [ ] Comportamiento responsivo en diferentes anchos

### Pruebas en producción

1. Despliega el sitio a producción (GitHub Pages o dominio personalizado)
2. Prueba el código de inserción en curso real de Canvas LMS
3. Verifica en múltiples navegadores (Chrome, Firefox, Safari)
4. Prueba en dispositivos móviles (iOS, Android)
5. Verifica la consola en busca de errores de JavaScript

## Consideraciones de seguridad

### Política de seguridad de contenido

Si tu sitio usa encabezados CSP, asegúrate de que los iframes estén permitidos:

```
Content-Security-Policy: frame-ancestors 'self' https://canvas.instructure.com https://*.wordpress.com
```

**GitHub Pages:**
- Sin encabezados personalizados por defecto
- Insertable en cualquier sitio
- Considera esto al alojar contenido sensible

### Compartir recursos de origen cruzado (CORS)

**Teselas IIIF:**
- Servidas desde el mismo origen que la historia
- Sin problemas de CORS

**Manifiestos IIIF externos:**
- Requieren encabezados CORS de la institución fuente
- La mayoría de los proveedores IIIF incluyen encabezados CORS apropiados
- Prueba manifiestos externos antes de insertar

### Atributo sandbox de iframe

**No recomendado para Telar:**

```html
<!-- ❌ No hagas esto -->
<iframe src="..." sandbox="allow-scripts allow-same-origin">
</iframe>
```

**Por qué:**
- Rompe la funcionalidad de JavaScript
- Impide que el visor IIIF funcione
- Deshabilita navegación y modales
- Usa iframe estándar sin atributo sandbox

## Personalizar el comportamiento de *embed*

### Estilos personalizados de *embed*

Agrega CSS personalizado para modo *embed* en `assets/css/telar.scss`:

```scss
body.embed-mode {
  // Tus estilos personalizados de embed

  .custom-element {
    // Ocultar en modo embed
    display: none;
  }
}
```

### Detectar modo *embed* en código personalizado

```javascript
if (window.telarEmbed?.enabled) {
  // Comportamiento personalizado para modo embed
  console.log('Ejecutando en modo embed');
}
```

### Modificar la apariencia del banner

Sobrescribe estilos del banner en `telar.scss`:

```scss
.embed-banner {
  // Posición personalizada
  top: 2rem;
  left: 2rem;

  // Colores personalizados
  background: rgba(0, 0, 0, 0.8);
  color: white;
}
```

## Limitaciones conocidas

**Sin redimensionamiento dinámico de altura:**
- Solo alturas fijas
- Sin postMessage `lti.frameResize` de Canvas
- Intencional: Telar usa desplazamiento interno

**Sin enlaces profundos (v0.5.0):**
- El *embed* siempre comienza en el paso 1
- Parámetro `?section=` no implementado
- Planeado para versión futura

**Estado del visor no preservado:**
- La URL de *embed* elimina coordenadas hash
- Cada carga de *embed* comienza fresca
- Las personas deben navegar a la vista deseada

## Mejoras futuras

**Planeadas para versiones futuras:**
- Enlaces profundos mediante parámetro `?section=`
- Tiempo de espera opcional para auto-ocultar banner
- Seguimiento de analíticas de *embed*
- Optimizaciones específicas de LMS

## Documentación relacionada

- **Guía para educadores**: [Insertar en LMS y sitios web](/guia/funciones/insercion/)
- **Configuración de desarrollo**: [Desarrollo Local](/guia/desarrolladores/desarrollo-local/)
- **GitHub Actions**: [Flujo de trabajo de *build* automatizado](/guia/desarrolladores/github-actions/)
