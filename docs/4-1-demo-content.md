---
layout: docs
title: 4.1. Demo Content
parent: 4. IIIF & Images
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/iiif/demo-content/
---

# Demo Content

Learn from pre-built example stories while developing your own Telar site.

## What is Demo Content?

Demo content consists of complete example stories that showcase Telar's features. These stories are automatically added to your site when enabled, giving you working examples to explore and learn from.

**Available demos:**
- **Telar Tutorial**: A 10-step interactive tutorial demonstrating all Telar features
- **Paisajes Coloniales**: A 5-step excerpt from a real research project about colonial maps

Both demos include:
- Story narratives with layer panels
- IIIF image integration
- Glossary definitions
- Widget examples (accordion, tabs, carousel)
- Self-hosted and external images

## When to Use Demo Content

### Enable Demos When:
- **Learning Telar**: Explore how stories are structured and written
- **Local development**: Test features without creating content
- **Demonstrations**: Show stakeholders what Telar can do
- **Reference**: See working examples of specific features

### Disable Demos When:
- **Production sites**: Publishing your final project
- **Clean testing**: Testing only your own content
- **Public deployment**: Sharing work with audiences

{: .tip }
> **Learning from Examples**
> Demo stories show you how to structure narratives, write layer panels, use widgets, and integrate IIIF images. Use them as templates for your own stories.

## Enabling Demo Content

### Step 1: Update Configuration

Open `_config.yml` and find the `story_interface` section:

```yaml
story_interface:
  show_story_steps: true
  include_demo_content: true    # Change to true
```

### Step 2: Rebuild Your Site

**For GitHub Pages:**
1. Commit the change to `_config.yml`
2. Push to your repository
3. Wait 2-3 minutes for the build to complete

**For local development:**
```bash
bundle exec jekyll build
bundle exec jekyll serve
```

The build process automatically fetches demo content from content.telar.org and integrates it with your stories.

## What You'll See

When demo content is enabled:

### Homepage
Demo stories appear alongside your own stories with a small "Demo content" badge:

- **Your Story** (if you have one)
- **Telar Tutorial** 🏷️ Demo content
- **Paisajes Coloniales** 🏷️ Demo content

### Objects Page
Demo objects are included in the catalog with the same badge.

### Glossary
Demo glossary terms appear with your terms, also marked with badges.

## Demo Stories Overview

### Telar Tutorial (10 steps)

An interactive walkthrough of Telar features:

1. **IIIF Introduction**: Using external IIIF resources
2. **Self-Hosted Images**: IIIF tile generation
3. **Markdown Formatting**: Text styling with tabs widget
4. **Coordinate System**: Understanding x, y, zoom
5-7. **Pan & Zoom**: Demonstrating coordinate sequences
8. **Glossary Auto-Linking**: Terms with tabs widget
9. **Widgets Showcase**: Carousel and accordion examples
10. **Rich Media**: Next steps and resources

**Languages**: Available in English and Spanish

### Paisajes Coloniales (5 steps)

An excerpt from a digital history project exploring colonial cartography:

- Early mapping traditions
- Spanish colonial legal frameworks
- Visual rhetoric in maps
- Self-hosted historical images
- Scholarly narrative techniques

**Languages**: Available in English and Spanish

## Language Matching

Demo content automatically matches your site's language:

| Your Site Language | Demos You Get |
|-------------------|---------------|
| `telar_language: en` | English demos |
| `telar_language: es` | Spanish demos |

Set `telar_language` in `_config.yml` to control which language demos appear.

## How It Works

When you enable demo content:

1. **Fetch**: During build, Telar downloads a demo bundle from content.telar.org
2. **Version Match**: The system selects demos compatible with your Telar version
3. **Merge**: Demo stories, objects, and glossary terms are merged with your content
4. **Display**: Demos appear with visual badges to distinguish them from your work

When you disable demo content:

1. **Cleanup**: Telar removes all demo files
2. **Rebuild**: Site rebuilds with only your content
3. **No traces**: Demos leave no artifacts in your repository

## Disabling Demo Content

### Step 1: Update Configuration

Change `include_demo_content` to `false`:

```yaml
story_interface:
  show_story_steps: true
  include_demo_content: false    # Disable demos
```

### Step 2: Rebuild Your Site

Commit, push, and wait for the rebuild (GitHub Pages) or run `bundle exec jekyll build` (local).

All demo content is automatically removed.

## Using Demos as Templates

### Viewing Demo Source Content

Demo content is hosted at [content.telar.org](https://content.telar.org). You can view:

- Story CSV structures
- Layer panel markdown
- Glossary definitions
- Widget syntax
- Image integration patterns

### Adapting Demo Patterns

Common patterns to adapt from demos:

**From Telar Tutorial:**
- Question/Answer/Invitation narrative structure
- Coordinate sequences for visual arguments
- Widget integration (tabs, accordion, carousel)
- Glossary term definitions

**From Paisajes Coloniales:**
- Scholarly narrative tone
- Self-hosted image workflow
- Historical context layer panels
- Academic citation practices

## Demo Content vs. Your Content

| Aspect | Your Content | Demo Content |
|--------|--------------|--------------|
| Location | `components/` directory | Downloaded during build |
| Editable | Yes | No (view only) |
| Badge | None | "Demo content" badge |
| Tracked in git | Yes | No |
| Persistence | Permanent | Only while enabled |
| Customizable | Fully | Not editable |

## Troubleshooting

### Demos Not Appearing

If demos don't show up after enabling:

1. **Check config syntax**: Verify `include_demo_content: true` (not `enabled` or `yes`)
2. **Rebuild completed**: Wait for GitHub Actions to finish
3. **Clear browser cache**: Hard refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac)
4. **Check build log**: Look for errors in GitHub Actions workflow

### Wrong Language Demos

If demos appear in unexpected language:

1. Verify `telar_language` setting in `_config.yml`
2. Rebuild site after changing language setting
3. Clear browser cache

### Network Errors

If build fails with demo fetch errors:

- Telar continues building without demos (graceful degradation)
- Your own content still appears
- Check content.telar.org availability
- Temporarily disable demos if fetching consistently fails

## Next Steps

- Explore [Telar Tutorial](/) demo to learn core features
- Review [Paisajes Coloniales](/) demo for scholarly narrative techniques
- Create your first story using patterns from demos
- Disable demos when ready to deploy your production site

---

**New in v0.6.0**: Automatically fetched demo stories with version matching and language support.
