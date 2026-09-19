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

Telar's own visual identity, designed by Adelaida Ávila. Terracotta and lavender, with Space Grotesk headings.

**Colors:**
- Headings: Dark grey `#333333`
- Links and buttons: Terracotta `#883C36`
- Panels: Lavender `#C6D0F8` and terracotta `#883C36`
- Glossary: Cream `#FFF6EF`

**Typography:** Space Grotesk headings, Roboto Condensed body.

**Best for:** A versatile default suitable for most exhibitions.

### Paisajes Coloniales

Earth and sky, from the [Colonial Landscapes](https://colonial-landscapes.com) project. Slate blue and plum, with Playfair Display headings.

**Colors:**
- Headings and buttons: Slate blue `#2c3e50`
- Links: Saddle brown `#8b4513`
- Panels: Pale blue `#A8C5D4` and plum `#3d2645`
- Glossary: Sand `#F5EDE1`

**Typography:** Playfair Display headings, Source Sans Pro body.

**Best for:** Historical narratives, archaeological exhibits.

### Neogranadina

High-contrast green and crimson on charcoal, with IM Fell, a typeface cut from the punches of a seventeenth-century press.

**Colors:**
- Headings: Black `#000000`
- Links: Coral `#D35F3A`
- Buttons: Charcoal `#2A2F36`
- Panels: Green `#00b35c` and crimson `#b31235`
- Glossary: Off-white `#F5F7FA`

**Typography:** IM Fell DW Pica headings, Mulish body.

**Best for:** Contemporary materials.

### Santa Barbara

Gold and deep navy, in the University of California, Santa Barbara colors. Roboto Serif headings.

**Colors:**
- Headings: Navy `#003660`
- Links: Teal `#047C91`
- Buttons: Gold `#FEBC11`
- Panels: Teal `#047C91` and navy `#003660`
- Glossary: Stone `#F1EEEA`

**Typography:** Roboto Serif headings, Nunito Sans body.

**Best for:** Greyscale and monochrome images

### Austin

The University of Texas at Austin's burnt orange, with sage and stone. Crimson Pro headings.

**Colors:**
- Headings, links and buttons: Burnt orange `#BF5700`
- Panels: Blue grey `#9CADB7` and sage `#577565`
- Glossary: Stone `#D6D2C4`

**Typography:** Crimson Pro headings, Inter body.

**Best for:** Contemporary materials

## Switching Themes

Edit `_config.yml` in your repository:

```yaml
telar_theme: "santa-barbara"  # Options: trama, paisajes, neogranadina, santa-barbara, austin
```

Commit the change and GitHub Actions will rebuild your site automatically (2-5 minutes).

## Creating Custom Themes

### Step 1: Create Theme File

Create a new file at `_data/themes/custom.yml`. Colors are grouped under `colors.text` and `colors.background`, and fonts under `fonts`:

```yaml
name: "My Theme"

colors:
  text:
    heading: "#1a1a1a"        # Headings
    body: "#333333"           # Body text
    link: "#883C36"           # Links
    button: "#FFFFFF"         # Text on buttons
    panel_layer1: "#333333"   # Text in the first panel
    panel_layer2: "#FFFFFF"   # Text in the second panel
    panel_glossary: "#333333" # Text in the glossary panel

  background:
    button: "#883C36"         # Button background
    panel_layer1: "#C6D0F8"   # First panel background
    panel_layer2: "#883C36"   # Second panel background
    panel_glossary: "#FFF6EF" # Glossary panel background

fonts:
  headings: "'Playfair Display', Georgia, serif"
  body: "'Source Sans Pro', -apple-system, sans-serif"
```

The quickest start is to copy a shipped theme from `_data/themes/` and change its values. Every key is optional, and Telar uses the Trama value for any you leave out.

{: .warning }
> Telar reads only the keys shown here. A theme file built from other key names loads without an error and has no effect, and your site renders in the default colors. The build log names the keys Telar looked for and did not find.

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

All themes support these color keys:

| Key | Usage |
|-----|-------|
| `colors.text.heading` | All heading levels |
| `colors.text.body` | Body text |
| `colors.text.link` | Links |
| `colors.text.button` | Text on buttons |
| `colors.text.panel_layer1` | Text in the first panel |
| `colors.text.panel_layer2` | Text in the second panel |
| `colors.text.panel_glossary` | Text in the glossary panel |
| `colors.background.button` | Button background |
| `colors.background.panel_layer1` | First panel background |
| `colors.background.panel_layer2` | Second panel background |
| `colors.background.panel_glossary` | Glossary panel background |

{: .note }
> The four keys under `colors.background` are the ones Telar checks for contrast. See [Color Accessibility](#color-accessibility).

## Typography Variables

Control fonts across your site:

| Key | Usage |
|-----|-------|
| `fonts.headings` | h1-h6, page titles |
| `fonts.body` | Paragraphs, lists, general text |

### Font Examples

Both keys sit under `fonts`, and each takes a stack: the font you want, then the fallbacks a browser uses when it cannot load that one.

**Serif headings:**
```yaml
fonts:
  headings: "'Playfair Display', Georgia, serif"
```
Or `'Merriweather', Georgia, serif`, or `'Lora', Georgia, serif`.

**Sans-serif headings:**
```yaml
fonts:
  headings: "'Montserrat', Helvetica, sans-serif"
```
Or `'Raleway', Arial, sans-serif`.

**Body fonts:**
```yaml
fonts:
  body: "'Source Sans Pro', sans-serif"
```
Or `'Open Sans', Helvetica, sans-serif`, or `'Crimson Text', Georgia, serif`.

## Using Google Fonts

To use fonts not included by default:

1. Find your font at [Google Fonts](https://fonts.google.com/)
2. Add import to `assets/css/telar.scss`:
   ```scss
   @import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap');
   ```
3. Reference in theme file:
   ```yaml
   fonts:
     headings: "'Your Font', serif"
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

Telar also works out the text color for `colors.text.heading` where that color is used as a background, such as the active filter chips on the objects page. You do not set that text color in the theme file, so Telar replaces nothing of yours there.

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

If Telar cannot find the theme file named in `_config.yml`, it falls back to the **Trama** theme, so your site never breaks. A file Telar can find is always used, even when none of its keys are ones Telar reads. Each key you have not set takes its Trama value, and the build log says which ones were missing.

## Next Steps

- [Advanced Styling](/docs/developers/styling/) for deeper customization
- [Configuration](/docs/configure/configuration/) for other site settings
- [View Example Themes](https://ampl.clair.ucsb.edu/telar) in action
