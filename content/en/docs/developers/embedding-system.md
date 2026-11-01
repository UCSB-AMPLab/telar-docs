---
title: Embedding System Reference
url: /docs/developers/embedding-system/
translationKey: docs-developers-embedding-system
type: guide
docs_section: developers
---

# Embedding System Reference {#embedding-system-reference}

Technical reference for Telar's iframe embedding system.

## Architecture Overview {#architecture-overview}

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

## Embed Mode Detection {#embed-mode-detection}

### URL Parameter {#url-parameter}

Embed mode activates via the `?embed=true` URL parameter:

```
https://yoursite.com/stories/story-1/?embed=true
```

**Parameter handling:**
- Detected in `assets/js/embed.js`
- Stored in `window.telarEmbed.enabled`
- Available to all JavaScript modules

### JavaScript Implementation {#javascript-implementation}

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

## CSS Modifications {#css-modifications}

### Embed Mode Styles {#embed-mode-styles}

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

**Button visibility and placement:**
```scss
body.embed-mode {
  // Navigation buttons render at every width in embed mode,
  // centred over the narrative column with intrinsic width
  .mobile-nav {
    position: fixed;
    left: 20%;
    right: auto;
    bottom: max(8%, 1.5rem);
    transform: translateX(-50%);
  }
}
```

**Narrow embeds (at or below the vertical-layout boundary):**
```scss
// Same boundary as the site-wide vertical layout
// (_responsive.scss $telar-vertical-min-width, 1024px)
@media (max-width: $telar-vertical-min-width) {
  body.embed-mode .mobile-nav {
    // Right-edge vertical stack
    right: 1rem;
    left: auto;
    bottom: 50%;
    transform: translateY(50%);
    flex-direction: column;
  }
}
```

## Navigation System {#navigation-system}

### Embed Mode Navigation {#embed-mode-navigation}

**File:** `assets/js/telar-story/main.js`

Embedded stories always use button navigation, at every width — iframe scroll events do not propagate reliably, so the scroll engine is never engaged inside an embed. Outside embeds, navigation mode follows the layout mode: horizontal layout uses the Lenis-driven scroll engine, and vertical layout (viewports at or below 1024px wide, or narrower than 3:4) uses the same prev/next buttons. The boundary is declared once in `_sass/_responsive.scss` (`$telar-vertical-min-width`) and read at runtime by `layout-mode.js`.

### Navigation Modes {#navigation-modes}

- **Embeds (all widths):** button navigation; wide embeds center the buttons over the narrative column, narrow embeds stack them on the right edge
- **Non-embed, horizontal layout:** Lenis-driven scroll engine
- **Non-embed, vertical layout:** the same button navigation
- **Keyboard navigation** works in every mode

### Button Creation {#button-creation}

**File:** `assets/js/telar-story/navigation.js`

`initializeButtonNavigation()` builds the `.mobile-nav` container with its `.mobile-prev` and `.mobile-next` buttons and wires them to step navigation; it returns early if the container already exists.

## "View Full Site" Banner {#view-full-site-banner}

### Banner Creation {#banner-creation}

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

### Banner Styling {#banner-styling}

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

## Share & Embed Panel {#share--embed-panel}

### Embed Code Generation {#embed-code-generation}

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

### URL Cleaning {#url-cleaning}

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

### Dimension Presets {#dimension-presets}

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

### Dimension Normalization {#dimension-normalization}

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

## Multilingual Support {#multilingual-support}

### Language String Injection {#language-string-injection}

**File:** `_layouts/story.html`

```liquid
<script>
  window.telarLang = window.telarLang || {};
  window.telarLang.embedBanner = {
    text: null,
    link: null
  };
</script>
```

**Process:**
1. Jekyll processes liquid tags during build
2. Language strings injected into `window.telarLang`
3. JavaScript reads from `window.telarLang.embedBanner`
4. Fallback to English if language data missing

### Language Files {#language-files}

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

## Browser Compatibility {#browser-compatibility}

### Supported Browsers {#supported-browsers}

Telar embed mode works in all modern browsers:

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **Mobile browsers** (iOS Safari, Chrome Android)

### Iframe Considerations {#iframe-considerations}

**Same-origin vs cross-origin:**
- Telar embeds are cross-origin (different domain than host)
- No localStorage/sessionStorage access across origins
- No parent frame access (intentional security)
- The IIIF viewer renders correctly inside the embed

**Embed structure:**
- Telar story (iframe 1)
  - OpenSeadragon viewer (rendered inline, not a nested iframe)
    - IIIF tiles (image sources)

**Performance:**
- Modern browsers handle nested iframes efficiently
- IIIF tile loading not affected by iframe context
- Bootstrap modals (glossary, share panel) work correctly

## Testing Embed Mode {#testing-embed-mode}

### Local Testing {#local-testing}

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

### Production Testing {#production-testing}

1. Deploy site to production (GitHub Pages or custom domain)
2. Test embed code in actual Canvas LMS course
3. Verify on multiple browsers (Chrome, Firefox, Safari)
4. Test on mobile devices (iOS, Android)
5. Check console for JavaScript errors

## Security Considerations {#security-considerations}

### Content Security Policy {#content-security-policy}

If your site uses CSP headers, ensure iframes are allowed:

```
Content-Security-Policy: frame-ancestors 'self' https://canvas.instructure.com https://*.wordpress.com
```

**GitHub Pages:**
- No custom headers by default
- Embeddable on any site
- Consider this when hosting sensitive content

### Cross-Origin Resource Sharing (CORS) {#cross-origin-resource-sharing-cors}

**IIIF tiles:**
- Served from same origin as story
- No CORS issues

**External IIIF manifests:**
- Require CORS headers from source institution
- Most IIIF providers include proper CORS headers
- Test external manifests before embedding

### iframe Sandbox Attribute {#iframe-sandbox-attribute}

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

## Customizing Embed Behavior {#customizing-embed-behavior}

### Custom Embed Styles {#custom-embed-styles}

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

### Detecting Embed Mode in Custom Code {#detecting-embed-mode-in-custom-code}

```javascript
if (window.telarEmbed?.enabled) {
  // Custom behavior for embed mode
  console.log('Running in embed mode');
}
```

### Modifying Banner Appearance {#modifying-banner-appearance}

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

## Known Limitations {#known-limitations}

**No dynamic height resizing:**
- Fixed heights only
- No Canvas `lti.frameResize` postMessage
- Intentional: Telar uses internal scrolling

<span class="anchor-alias" id="future-enhancements"></span>

## Deep links and embed state {#deep-links-and-embed-state}

The Share panel's generated embed code removes the current query and fragment and adds the embed parameter, so that code opens the story from its introduction. It does not preserve a reader's temporary pan and zoom.

The story engine also supports step and panel fragments: <code>#s3</code> opens the third content step, <code>#s3l1</code> opens its first panel, and <code>#s3l1g1</code> targets its first glossary link. These are distinct from the unsupported <code>?section=</code> parameter. Test a manually constructed embedded link in the host environment before sharing it.

## Related Documentation {#related-documentation}

- **Educator Guide**: [Embedding in LMS & Websites](/docs/site-features/embedding/)
- **Development Setup**: [Local Development](/docs/developers/local-development/)
- **GitHub Actions**: [Automated Build Workflow](/docs/developers/github-actions/)
