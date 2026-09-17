---
layout: docs
title: "7.1. Themes"
parent: "7. Customization"
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/customization/themes/
---

# Themes

Telar includes 5 preset visual themes that can be easily switched via `_config.yml`.

## Available Themes

### Trama (Default)

Telar's visual identity, designed by Adelaida Ávila. Warm terracotta and soft lavender palette.

**Colors:**
- Headings: Dark grey `#333333`
- Links/buttons: Terracotta `#883C36`
- Panels: Lavender `#C6D0F8`
- Glossary: Cream `#FFF6EF`

**Typography:** Space Grotesk headings, Roboto Condensed body.

**Best for:** A versatile default suitable for most exhibitions.

### Paisajes Coloniales

Earthy tones, inspired by [Colonial Landscapes](https://colonial-landscapes.com)

**Colors:**
- Primary: Terracotta `#c7522a`
- Secondary: Olive `#5f7351`
- Accent: Warm brown

**Best for:** Historical narratives, archaeological exhibits.

### Neogranadina

Bold colours.

**Colors:**
- Primary: Burgundy `#8B0000`
- Secondary: Colonial gold `#D4AF37`
- Accent: Deep red

**Best for:** Contemporary materials.

### Santa Barbara

Inspired by sunset over the ocean.

**Colors:**
- Primary: Ocean teal `#2E8B9E`
- Secondary: Coral `#FF6F61`
- Accent: Navy blue

**Best for:** Greyscale and monochrome images

### Austin

Formal and subtle.

**Colors:**
- Primary: Burnt orange `#BF5700`
- Secondary: Slate blue `#005F86`
- Accent: Charcoal

**Best for:** Contemporary materials

## Switching Themes

Edit `_config.yml` in your repository:

```yaml
telar_theme: "santa-barbara"  # Options: trama, paisajes, neogranadina, santa-barbara, austin
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

## Theme Creator Attribution

Telar v0.4.0+ supports optional theme creator attribution, allowing you to credit theme designers in your site footer.

### Adding Attribution to Custom Themes

When creating a custom theme, you can add creator information to your theme YAML file:

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

### Attribution Fields

All fields are optional:

**name** - Display name for your theme
```yaml
name: "Miami"
```

**creator** - Name of the person or organization who designed the theme
```yaml
creator: "Material/Image Research Lab"
creator: "Jeff"
```

**creator_url** - Website or profile URL for attribution link
```yaml
creator_url: "https://mirl.ucsb.edu"
creator_url: "https://github.com/mirl-ucsb"
```

**description** - Brief note about the theme's design (for internal use)
```yaml
description: "Retro Cool. Digital Heat."
```

### How Attribution Displays

When you add creator information, it appears in your site footer:

**With both name and creator:**
"Miami theme by MIRL Lab" (linked to creator_url if provided)

**With only creator:**
"Theme by MIRL Lab"

**With only name:**
"Miami theme"

**With neither:**
No theme attribution shown

### Attribution for Preset Themes

All of Telar's preset themes include attribution:

**Trama**
- Creator: Telar
- URL: https://telar.org

**Paisajes Coloniales**
- Creator: Neogranadina
- URL: https://neogranadina.org

**Neogranadina**
- Creator: Neogranadina
- URL: https://neogranadina.org

**Santa Barbara**
- Creator: AMPL at UC Santa Barbara
- URL: https://ampl.clair.ucsb.edu

**Austin**
- Creator: AMPL at UT Austin
- URL: https://liberalarts.utexas.edu/history/

### Sharing Custom Themes

If you create a theme you'd like to share with the Telar community:

1. Add complete attribution metadata
2. Document color choices and design philosophy
3. Include usage recommendations (best for grayscale images, colorful content, etc.)
4. Share on the [Telar Discussions](https://github.com/UCSB-AMPLab/telar/discussions) forum

### Removing Attribution

To use a theme without attribution:

- Simply omit the `creator` and `creator_url` fields from your theme file
- Or set them to empty strings:
  ```yaml
  creator: ""
  creator_url: ""
  ```

No attribution will appear in the footer.

## Color Accessibility

Every theme pairs a text color with a background: `colors.text.panel_layer1` sits on `colors.background.panel_layer1`, and so on. When the two are too close in brightness, the text is hard to read.

### How Telar Checks Your Colors

During the build, Telar works out a text color that reaches a contrast ratio of 4.5:1 on each of four backgrounds: `button`, `panel_layer1`, `panel_layer2` and `panel_glossary`. That is the WCAG AA level for normal-size text.

Your own color comes first. Telar keeps it whenever it reaches 4.5:1, so a theme whose colors all pass renders exactly as you wrote it. Only when your color falls short does Telar look further, in this order:

1. Your `colors.text.heading` or `colors.text.button`, whichever has the higher contrast on that background
2. White or black, whichever has the higher contrast

### When Telar Replaces a Color

Telar prints one line in the build log for each color it replaces:

```
Theme "santa-barbara": colors.text.button is #FFFFFF, a contrast ratio of 1.69:1 on its #FEBC11 background, below the 4.5:1 that text needs. Telar used #003660 instead, 7.32:1. To keep your own color, choose a lighter or darker colors.background.button.
```

A theme whose colors all pass prints nothing. To keep the color you wanted, change the background rather than the text.

### What Telar Does Not Check

These are still yours to get right:

- **Body text on the page background**
- **Link colors** (`colors.text.link`)
- **Large text (18px+)**, which needs 3:1 rather than 4.5:1
- **Interactive elements**, which must stay distinguishable

Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify.

### Colors Telar Cannot Read

Telar only reads hex colors, like `#FFFFFF` or `#FFF`. A named color like `white`, or an `rgb()` value, is left exactly as you wrote it and unchecked, and the build log says so.

## Theme Fallback

If a custom theme file is missing or has errors, Telar automatically falls back to the **Trama** theme, ensuring your site never breaks.

## Next Steps

- [Advanced Styling](/docs/developers/styling/) for deeper customization
- [Configuration](/docs/configure/configuration/) for other site settings
- [View Example Themes](https://ampl.clair.ucsb.edu/telar) in action
