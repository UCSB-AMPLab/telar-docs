---
layout: docs
title: 7.4. Embedding System
parent: 7. Reference
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/reference/embedding/
---

# Embedding System Reference

Technical reference for Telar's iframe embedding system.

## Architecture Overview

Telar's embedding system allows stories to be displayed inside iframes on external websites and LMS platforms. The system is designed around these principles:

**Fixed-height containers:**
- Desktop: 100vh fixed layout with side-by-side columns
- Mobile/Embed: Fixed heights (60vh viewer, 40vh narrative panel)
- Content scrolls inside fixed containers

**No dynamic resizing:**
- Unlike systems that use postMessage to resize iframes
- Users choose appropriate fixed height via dimension presets
- Telar's design philosophy relies on internal scrolling, not variable heights

**Universal compatibility:**
- Works in any iframe-supporting platform
- No special integration required
- No LMS-specific APIs or dependencies

## Embed Mode Detection

### URL Parameter

Embed mode activates via the `?embed=true` URL parameter:

```
https://yoursite.com/stories/story-1/?embed=true
```

**Parameter handling:**
- Detected in `assets/js/embed.js`
- Stored in `window.telarEmbed.enabled`
- Available to all JavaScript modules

### JavaScript Implementation

**File:** `assets/js/embed.js`

```javascript
(function() {
  'use strict';

  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const embedParam = params.get('embed');

  // Initialize embed state
  window.telarEmbed = {
    enabled: embedParam === 'true'
  };

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (!window.telarEmbed.enabled) return;

    // Apply embed mode body class
    document.body.classList.add('embed-mode');

    // Create "View full site" banner
    createEmbedBanner();
  }
})();
```

**Timing:**
- Runs before other scripts
- Uses DOMContentLoaded to ensure body element exists
- Body class applied before navigation initialization

## CSS Modifications

### Embed Mode Styles

**File:** `assets/css/telar.scss`

The `body.embed-mode` selector applies embed-specific styles:

**Hidden elements:**
```scss
body.embed-mode {
  // Hide navigation chrome
  .home-button {
    display: none !important;
  }

  .share-button {
    display: none !important;
  }

  // Hide loading text in step counter
  .viewer-overlay {
    display: none;
  }
}
```

**Forced visibility:**
```scss
body.embed-mode {
  // Always show mobile navigation hints
  .nav-hint {
    display: block;
  }

  // Force navigation buttons on all viewports
  .arrow-nav-up,
  .arrow-nav-down {
    display: flex !important;
  }
}
```

**Desktop embed arrow customization:**
```scss
body.embed-mode {
  @media (min-width: 768px) {
    .arrow-nav-up,
    .arrow-nav-down {
      // Horizontal layout at bottom
      left: 20%;
      bottom: max(8%, 1.5rem);

      // Hover effects
      &:hover {
        transform: scale(1.1) translateY(-2px); // Up arrow
        box-shadow: 0 6px 16px rgba(0,0,0,0.3);
      }
    }
  }
}
```

**Mobile-sized embeds (<768px):**
```scss
// Root-level media query for proper specificity
@media (max-width: 767px) {
  body.embed-mode .arrow-nav-up,
  body.embed-mode .arrow-nav-down {
    // Vertical stack on right side
    right: 1rem;
    bottom: 50%;
    transform: translateY(50%);
  }
}
```

## Navigation System

### Embed Mode Navigation

**File:** `assets/js/story.js`

```javascript
function initializeNavigation() {
  const isMobileViewport = window.innerWidth < 768;
  const isEmbedMode = window.telarEmbed?.enabled || false;

  if (isMobileViewport || isEmbedMode) {
    // Mobile or embed: Button navigation
    initializeEmbedNavigation();
  } else {
    // Desktop: Scroll accumulation
    initializeDesktopNavigation();
  }
}
```

### Navigation Modes

**Desktop (non-embed):**
- Wheel event with scroll accumulation
- Threshold: 50vh (50% of viewport height)
- Cooldown: 600ms
- Max scroll delta cap: 200px

**Mobile (<768px):**
- Button navigation only
- 400ms navigation cooldown
- Vertical stack on right side

**Embed mode (all viewports):**
- Button navigation (same as mobile)
- Desktop: Horizontal layout at bottom
- Mobile: Vertical stack on right
- Keyboard navigation preserved

### Button Creation

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

  // Attach event listeners
  upBtn.addEventListener('click', () => navigateSteps('previous'));
  downBtn.addEventListener('click', () => navigateSteps('next'));

  document.body.appendChild(upBtn);
  document.body.appendChild(downBtn);
}
```

## "View Full Site" Banner

### Banner Creation

**File:** `assets/js/embed.js`

```javascript
function createEmbedBanner() {
  // Get language strings from Jekyll
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

  // Handle dismissal
  banner.querySelector('.embed-banner-close').addEventListener('click', () => {
    banner.remove();
  });
}
```

### Banner Styling

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

**Behavior:**
- Appears on every page load in embed mode
- Dismissible via X button
- No sessionStorage persistence
- Links to site homepage (not story page)

## Share & Embed Panel

### Embed Code Generation

**File:** `assets/js/share-panel.js`

```javascript
function generateEmbedCode() {
  if (!currentStoryUrl) return '';

  const width = embedWidthInput.value.trim() || '100%';
  const height = embedHeightInput.value.trim() || '800';

  // Normalize dimensions
  const widthAttr = normalizeDimension(width);
  const heightAttr = normalizeDimension(height);

  // Build embed URL
  const embedUrl = addEmbedParameter(currentStoryUrl);

  // Get story title
  const storyTitle = getStoryTitle();

  // Generate iframe code
  const iframeCode = `<iframe src="${embedUrl}"
  width="${widthAttr}"
  height="${heightAttr}"
  title="${storyTitle}"
  frameborder="0">
</iframe>`;

  return iframeCode;
}
```

### URL Cleaning

```javascript
function addEmbedParameter(url) {
  try {
    const urlObj = new URL(url);
    // Clear existing query params and hash
    urlObj.search = '';
    urlObj.hash = '';
    // Add clean embed parameter
    urlObj.searchParams.set('embed', 'true');
    return urlObj.toString();
  } catch (e) {
    // Fallback if URL parsing fails
    const cleanUrl = url.split(/[?#]/)[0];
    return cleanUrl + '?embed=true';
  }
}
```

**Purpose:**
- Removes viewer state (hash coordinates)
- Removes any existing query parameters
- Adds clean `?embed=true` parameter
- Ensures embed always starts at step 1

### Dimension Presets

**File:** `assets/js/share-panel.js`

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

### Dimension Normalization

```javascript
function normalizeDimension(value) {
  // If just a number, add 'px'
  if (/^\d+$/.test(value)) {
    return value + 'px';
  }
  return value;
}
```

**Accepted formats:**
- `100%` → `100%`
- `800px` → `800px`
- `800` → `800px` (auto-adds px)

## Multilingual Support

### Language String Injection

**File:** `_layouts/story.html`

```liquid
<script>
  window.telarLang = window.telarLang || {};
  window.telarLang.embedBanner = {
    text: {{ site.data.languages[site.telar_language].embed_banner.text | jsonify }},
    link: {{ site.data.languages[site.telar_language].embed_banner.link | jsonify }}
  };
</script>
```

**Process:**
1. Jekyll processes liquid tags during build
2. Language strings injected into `window.telarLang`
3. JavaScript reads from `window.telarLang.embedBanner`
4. Fallback to English if language data missing

### Language Files

**English:** `_data/languages/en.yml`
```yaml
embed_banner:
  text: "This story is part of {site_name}, a digital storytelling site built with <a href='https://github.com/UCSB-AMPLab/telar' target='_blank'>Telar</a>."
  link: "View the complete site"
```

**Spanish:** `_data/languages/es.yml`
```yaml
embed_banner:
  text: "Esta historia forma parte de {site_name}, un sitio web creado con <a href='https://github.com/UCSB-AMPLab/telar' target='_blank'>Telar</a> para contar historias."
  link: "Ver el sitio completo"
```

## Browser Compatibility

### Supported Browsers

Telar embed mode works in all modern browsers:

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **Mobile browsers** (iOS Safari, Chrome Android)

### Iframe Considerations

**Same-origin vs cross-origin:**
- Telar embeds are cross-origin (different domain than host)
- No localStorage/sessionStorage access across origins
- No parent frame access (intentional security)
- UniversalViewer nested iframe works correctly

**Nested iframes:**
- Telar story (iframe 1)
  - UniversalViewer (iframe 2)
    - IIIF tiles (image sources)

**Performance:**
- Modern browsers handle nested iframes efficiently
- IIIF tile loading not affected by iframe context
- Bootstrap modals (glossary, share panel) work correctly

## Testing Embed Mode

### Local Testing

**Test file structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Embed Test</title>
</head>
<body>
  <h1>Canvas LMS (100% × 800px)</h1>
  <iframe src="http://localhost:4001/telar/stories/story-1/?embed=true"
    width="100%"
    height="800px"
    title="Test Story"
    frameborder="0">
  </iframe>

  <!-- Test other presets -->
</body>
</html>
```

**Test checklist:**
- [ ] Embed banner appears and is dismissible
- [ ] Navigation buttons work (click and keyboard)
- [ ] IIIF viewer loads and zooms correctly
- [ ] Share panel opens and functions
- [ ] Glossary links work
- [ ] Bootstrap modals display properly
- [ ] Home and share buttons are hidden
- [ ] Responsive behavior at different widths

### Production Testing

1. Deploy site to production (GitHub Pages or custom domain)
2. Test embed code in actual Canvas LMS course
3. Verify on multiple browsers (Chrome, Firefox, Safari)
4. Test on mobile devices (iOS, Android)
5. Check console for JavaScript errors

## Security Considerations

### Content Security Policy

If your site uses CSP headers, ensure iframes are allowed:

```
Content-Security-Policy: frame-ancestors 'self' https://canvas.instructure.com https://*.wordpress.com
```

**GitHub Pages:**
- No custom headers by default
- Embeddable on any site
- Consider this when hosting sensitive content

### Cross-Origin Resource Sharing (CORS)

**IIIF tiles:**
- Served from same origin as story
- No CORS issues

**External IIIF manifests:**
- Require CORS headers from source institution
- Most IIIF providers include proper CORS headers
- Test external manifests before embedding

### iframe Sandbox Attribute

**Not recommended for Telar:**

```html
<!-- ❌ Don't do this -->
<iframe src="..." sandbox="allow-scripts allow-same-origin">
</iframe>
```

**Why:**
- Breaks JavaScript functionality
- Prevents IIIF viewer from working
- Disables navigation and modals
- Use standard iframe without sandbox attribute

## Customizing Embed Behavior

### Custom Embed Styles

Add custom CSS for embed mode in `assets/css/telar.scss`:

```scss
body.embed-mode {
  // Your custom embed styles

  .custom-element {
    // Hide in embed mode
    display: none;
  }
}
```

### Detecting Embed Mode in Custom Code

```javascript
if (window.telarEmbed?.enabled) {
  // Custom behavior for embed mode
  console.log('Running in embed mode');
}
```

### Modifying Banner Appearance

Override banner styles in `telar.scss`:

```scss
.embed-banner {
  // Custom position
  top: 2rem;
  left: 2rem;

  // Custom colors
  background: rgba(0, 0, 0, 0.8);
  color: white;
}
```

## Known Limitations

**No dynamic height resizing:**
- Fixed heights only
- No Canvas `lti.frameResize` postMessage
- Intentional: Telar uses internal scrolling

**No deep linking (v0.5.0):**
- Embed always starts at step 1
- `?section=` parameter not implemented
- Planned for future release

**Viewer state not preserved:**
- Embed URL strips hash coordinates
- Each embed load starts fresh
- Users must navigate to desired view

## Future Enhancements

**Planned for future releases:**
- Deep linking via `?section=` parameter
- Optional banner auto-hide timeout
- Embed analytics tracking
- LMS-specific optimizations

## Related Documentation

- **Educator Guide**: [Embedding in LMS & Websites](/docs/workflows/embedding/)
- **Development Reference**: [Local Development](/docs/reference/development/)
- **GitHub Actions**: [Automated Build Workflow](/docs/reference/github-actions/)
