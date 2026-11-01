---
title: Customization
url: /docs/customization/
translationKey: docs-customization
type: guide
docs_section: reference
---

# Customization {#customization}

Make Telar your own with themes, custom styling, and layout modifications.

## Themes {#themes}

Telar includes 4 preset themes that you can switch with a single line in `_config.yml`:

- **Paisajes Coloniales** (default): Terracotta and olive
- **Neogranadina**: Burgundy and gold
- **Santa Barbara**: Teal and coral
- **Austin**: Burnt orange and slate blue

[Learn about Themes](/docs/customization/themes/)

## Advanced Styling {#advanced-styling}

For customization beyond the standard themes, you can modify CSS variables, layouts, and component styles.

[Advanced Styling Guide](/docs/developers/styling/)

## Quick Theme Switch {#quick-theme-switch}

Change your theme in `_config.yml`:

```yaml
telar_theme: "santa-barbara"  # Options: paisajes, neogranadina, santa-barbara, austin
```

Commit the change and your site will rebuild automatically with the new theme.
