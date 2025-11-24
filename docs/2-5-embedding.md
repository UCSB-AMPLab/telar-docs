---
layout: docs
title: 2.5. Embedding in LMS & Websites
parent: 2. Workflows
grand_parent: Documentation
nav_order: 5
lang: en
permalink: /docs/workflows/embedding/
---

# Embedding Telar Stories in LMS & Websites

Embed individual Telar stories into Canvas, Moodle, WordPress, or any website that supports iframes.

## What is Embedding?

Embedding lets you display a Telar story inside another website or learning management system (LMS). Your story appears as part of the host page, allowing students or visitors to explore it without leaving the platform.

**Benefits of embedding:**
- Keep users within your LMS or website
- Integrate visual narratives into course modules
- Maintain consistent navigation and branding
- No separate login or external links required

## When to Use Embedding

**Best for:**
- Canvas LMS course modules
- Moodle course content
- WordPress blog posts and pages
- Educational course sites
- Portfolio websites

**Not needed for:**
- Sharing direct links (use the share link feature instead)
- Full-site integration (link to your Telar homepage)

## Prerequisites

Before embedding:

- Your Telar site must be deployed and publicly accessible (via GitHub Pages or custom domain)
- You need edit access to the destination platform (Canvas, WordPress, etc.)
- The platform must support HTML/iframe embedding

## How to Embed a Story

### Step 1: Open the Share & Embed Panel

**On a story page:**

1. Navigate to the story you want to embed
2. Click the **Share** button (appears on the right side of the narrative panel)

**On your site homepage:**

1. Go to your Telar site homepage
2. Click the **Share** button in the navigation bar (top right)

### Step 2: Switch to Embed Code Tab

1. In the share panel, click the **Embed Code** tab
2. Read the introductory text for platform-specific guidance

### Step 3: Select a Story (Homepage Only)

If you opened the share panel from the homepage:

1. Use the **Select Story** dropdown
2. Choose the story you want to embed
3. The embed code will update automatically

### Step 4: Choose Dimensions

Select a preset that matches your platform, or enter custom dimensions.

#### Dimension Presets

| Preset | Width | Height | Best For |
|--------|-------|--------|----------|
| **Canvas LMS** | 100% | 800px | Canvas course pages (default) |
| **Moodle/Blackboard** | 100% | 700px | Moodle course modules |
| **WordPress** | 100% | 600px | Blog posts and pages |
| **Squarespace** | 100% | 600px | Squarespace pages |
| **Wix** | 100% | 550px | Wix site pages |
| **Mobile** | 375px | 500px | Mobile-optimized display |
| **Fixed** | 800px | 600px | Fixed-size containers |
| **Custom** | Your choice | Your choice | Manual control |

{: .tip }
> **Tip: Start with the preset**
> Use the preset for your platform, then adjust if needed. Most platforms work best with 100% width and 600-800px height.

#### Custom Dimensions

For the **Custom** preset or to modify a preset:

1. Click the **Width** field and enter a value:
   - Percentage: `100%` (fills container width)
   - Pixels: `800` or `800px` (fixed width)
2. Click the **Height** field and enter a value:
   - Usually pixels: `600` or `600px`
   - Percentage works but may behave unexpectedly in iframes

{: .note }
> **Understanding Width and Height**
> - **Width: 100%** fills the available horizontal space (recommended for most uses)
> - **Height: Fixed pixels** provides consistent display across devices
> - The embed code will automatically add "px" to plain numbers

### Step 5: Copy the Embed Code

1. Review the generated code in the text box
2. Click the **Copy Embed Code** button
3. Look for the checkmark icon confirming the code was copied

The embed code looks like this:

```html
<iframe src="https://yoursite.com/stories/story-1/?embed=true"
  width="100%"
  height="800px"
  title="Your Story Title"
  frameborder="0">
</iframe>
```

## Platform-Specific Instructions

### Canvas LMS

**To embed in a Canvas course page:**

1. Navigate to your Canvas course
2. Go to **Pages** or **Modules**
3. Create a new page or edit an existing one
4. Click the **</>** (HTML Editor) button in the toolbar
5. Paste the embed code you copied
6. Click **</>** again to return to the visual editor
7. Click **Save** or **Update**
8. View the page to see your embedded story

{: .note }
> **Canvas Embed Confirmation**
> Canvas may show a blank box in the editor. This is normal—the story will display correctly when you view the published page.

**Testing your embed:**

1. Click **View** on the page
2. Verify the story loads
3. Test navigation using the arrow buttons
4. Ensure the IIIF image viewer works
5. Check that the "View full site" banner appears (it's dismissible)

### WordPress

**To embed in a WordPress post or page:**

1. Edit or create a post/page
2. Add a **Custom HTML** block
   - Click **+** to add a block
   - Search for "Custom HTML"
   - Click to insert
3. Paste the embed code into the HTML block
4. Click **Preview** to test
5. Click **Publish** or **Update**

**Block Editor (Gutenberg):**
The Custom HTML block is the recommended approach. Do not use the "Embed" block—it's designed for oEmbed providers, not custom iframe code.

**Classic Editor:**
Switch to the **Text** tab (not Visual), paste the code, then switch back to **Visual** to see a preview.

### Moodle

**To embed in a Moodle course:**

1. Turn editing on in your course
2. Add an **HTML** block to a section
3. Click the **</>** (HTML) button in the editor toolbar
4. Paste the embed code
5. Click **</>** again to return to the visual editor
6. Save changes

Alternatively, use the **Page** resource type and paste the embed code in HTML mode.

### Other Platforms

Most website builders and CMS platforms support iframe embedding:

- **Squarespace**: Use a Code Block
- **Wix**: Use the HTML iframe element
- **Webflow**: Use an Embed element
- **Ghost**: Use an HTML card

Consult your platform's documentation for instructions on adding custom HTML or iframes.

## What Users Will See

### Embed Mode Features

When a story is embedded, users experience:

**Navigation:**
- Arrow buttons (up/down) for moving between steps
- Buttons appear on all screen sizes (including desktop)
- Keyboard navigation (arrow keys, Page Up/Down, Space)
- Smooth transitions between steps

**Viewer:**
- Full IIIF image viewer with zoom and pan
- Responsive scaling for different screen sizes
- Thumbnail navigation in viewer interface

**"View Full Site" Banner:**
- Appears at top-left of embedded story
- Links to your full Telar site
- Dismissible with X button
- Reappears on page refresh

**Hidden Elements:**
- Home button (not shown in embed mode)
- Share button (not shown in embed mode)

### Accessibility

Embedded stories maintain full accessibility:

- Keyboard navigation supported
- ARIA labels preserved
- Screen reader compatible
- Text content remains accessible

## Tips for Successful Embedding

### Choose Appropriate Dimensions

**For LMS platforms (Canvas, Moodle):**
- Use 100% width to fill the content area
- Use 700-800px height for comfortable viewing
- Test on both desktop and mobile

**For blog posts and articles:**
- Consider 100% width or fixed 800px
- Use 600-700px height to balance with text content
- Ensure the story doesn't dominate the page

**For mobile-first sites:**
- Use the Mobile preset (375px × 500px)
- Or use 100% width with 500-600px height
- Test on actual mobile devices

### Test Before Publishing

1. Preview the embedded story before making it public
2. Test navigation (buttons, keyboard, scroll)
3. Verify the IIIF viewer loads and zooms correctly
4. Check on mobile devices and tablets
5. Ensure the embedded story doesn't break page layout

### Multiple Stories on One Page

You can embed multiple stories on a single page:

1. Each story gets its own iframe
2. Use consistent dimensions for visual coherence
3. Add text or headings between embedded stories
4. Consider page length and loading time

### Security Considerations

**Embed URLs are public:**
- Anyone with the embed code can view your story
- Embedded stories bypass any access restrictions on the host site
- Use the same permissions as your main Telar site

**Canvas/LMS security:**
- Course-level permissions don't apply to embedded content
- Students can view the story even outside the course by accessing the URL directly
- Consider this when embedding sensitive content

## Updating Embedded Stories

**Changes to your Telar site automatically appear in embeds:**

1. Edit content in your Telar repository (Google Sheets or markdown)
2. Push changes and let GitHub Actions build the site
3. Embedded stories update automatically—no need to re-embed

**Changing embed dimensions:**

If you need to change the width or height:

1. Generate new embed code with updated dimensions
2. Replace the old code in your platform
3. Save/publish the update

{: .tip }
> **Tip: Version Compatibility**
> As long as you keep the embed URL format (`?embed=true`), embedded stories will work across Telar version updates.

## Troubleshooting

For common embedding issues and solutions, see the [Embedding Issues](/docs/reference/development/#embedding-issues) section in the Development Reference.

## Next Steps

- **Share Links**: Use the Share Link tab for direct links instead of embedding
- **Customization**: Learn about [customizing your Telar site](/docs/customization/)
- **Advanced Features**: Explore [developer reference documentation](/docs/reference/embedding/) for technical details
