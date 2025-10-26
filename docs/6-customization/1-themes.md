---
layout: default
title: 6.1. Themes
parent: 6. Customization
grand_parent: Documentation
nav_order: 1
lang: en
---

# Themes

Telar includes 4 preset visual themes that can be easily switched via `_config.yml`.

## Available Themes

### Paisajes Coloniales (Default)

Earth tones inspired by colonial landscapes.

**Colors:**
- Primary: Terracotta `#c7522a`
- Secondary: Olive `#5f7351`
- Accent: Warm brown

**Best for:** Historical narratives, archaeological exhibits, earthy subject matter

### Neogranadina

Colonial elegance with burgundy and gold.

**Colors:**
- Primary: Burgundy `#8B0000`
- Secondary: Colonial gold `#D4AF37`
- Accent: Deep red

**Best for:** Colonial history, formal exhibitions, archival materials

### Santa Barbara

Modern and vibrant with coastal inspiration.

**Colors:**
- Primary: Ocean teal `#2E8B9E`
- Secondary: Coral `#FF6F61`
- Accent: Navy blue

**Best for:** Contemporary subjects, coastal themes, modern design aesthetic

### Austin

Bold and academic with burnt orange.

**Colors:**
- Primary: Burnt orange `#BF5700`
- Secondary: Slate blue `#005F86`
- Accent: Charcoal

**Best for:** Academic exhibitions, bold statements, institutional sites

## Switching Themes

Edit `_config.yml` in your repository:

```yaml
telar_theme: "santa-barbara"  # Options: paisajes, neogranadina, santa-barbara, austin
```

Commit the change and GitHub Actions will rebuild your site automatically (2-5 minutes).

## Creating Custom Themes

### Step 1: Create Theme File

Create a new file at `_data/themes/custom.yml`:

```yaml
# Colors
primary_color: "#2c3e50"
secondary_color: "#e74c3c"
accent_color: "#3498db"
text_color: "#333333"
heading_color: "#1a1a1a"
background_color: "#ffffff"

# Fonts
font_headings: "Playfair Display, Georgia, serif"
font_body: "Source Sans Pro, -apple-system, sans-serif"
```

### Step 2: Activate Custom Theme

In `_config.yml`:

```yaml
telar_theme: "custom"
```

### Step 3: Test and Refine

1. Commit changes
2. Wait for automatic build
3. Review your site
4. Adjust colors and fonts as needed

## Theme Color Variables

All themes support these color variables:

| Variable | Usage |
|----------|-------|
| `primary_color` | Main brand color, buttons, links |
| `secondary_color` | Accents, secondary buttons |
| `accent_color` | Highlights, hover states |
| `text_color` | Body text |
| `heading_color` | All heading levels |
| `background_color` | Page background |

## Typography Variables

Control fonts across your site:

| Variable | Usage |
|----------|-------|
| `font_headings` | h1-h6, page titles |
| `font_body` | Paragraphs, lists, general text |

### Font Examples

**Serif headings:**
```yaml
font_headings: "Playfair Display, Georgia, serif"
font_headings: "Merriweather, Georgia, serif"
font_headings: "Lora, Georgia, serif"
```

**Sans-serif headings:**
```yaml
font_headings: "Montserrat, Helvetica, sans-serif"
font_headings: "Raleway, Arial, sans-serif"
```

**Body fonts:**
```yaml
font_body: "Source Sans Pro, sans-serif"
font_body: "Open Sans, Helvetica, sans-serif"
font_body: "Crimson Text, Georgia, serif"
```

## Using Google Fonts

To use fonts not included by default:

1. Find your font at [Google Fonts](https://fonts.google.com/)
2. Add import to `assets/css/telar.scss`:
   ```scss
   @import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap');
   ```
3. Reference in theme file:
   ```yaml
   font_headings: "Your Font, serif"
   ```

## Color Accessibility

When creating custom themes, ensure good contrast:

- **Text on background**: Minimum 4.5:1 contrast ratio
- **Large text (18px+)**: Minimum 3:1 contrast ratio
- **Interactive elements**: Must be distinguishable

Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify.

## Theme Fallback

If a custom theme file is missing or has errors, Telar automatically falls back to the Paisajes theme, ensuring your site never breaks.

## Next Steps

- [Advanced Styling](/docs/customization/styling/) for deeper customization
- [Configuration](/docs/configuration/) for other site settings
- [View Example Themes](https://ampl.clair.ucsb.edu/telar) in action
