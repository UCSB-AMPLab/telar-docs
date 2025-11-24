---
layout: docs
title: 6.4. Mobile Optimization
parent: 6. Customization
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/customization/mobile/
---

# Mobile Optimization

Telar v0.4.0+ includes comprehensive mobile and tablet responsiveness, ensuring your narrative exhibitions work beautifully on all screen sizes.

## Responsive Design Overview

Telar uses a mobile-first responsive design approach with:

- **Fluid layouts** that adapt to any screen size
- **Touch-optimized** navigation and interactions
- **Optimized typography** for readability on small screens
- **Progressive enhancement** for larger screens

## Story Viewer on Mobile

The story viewing experience is specially optimized for mobile devices:

### Layout Adaptations

**Viewer/Panel Split:**
- **Desktop**: Side-by-side viewer (right) and narrative (left)
- **Mobile**: Stacked layout with smooth transitions between viewer and content

**Navigation:**
- **Desktop**: Standard Previous/Next buttons
- **Mobile**: Optimized button placement and size (45px minimum touch targets)

### Mobile-Specific Features

**Skeleton Loading:**
When navigating between story steps on mobile, a subtle shimmer animation appears during viewer initialization, providing visual feedback during transitions.

**Optimized Preloading:**
- **Desktop**: Preloads 3 steps ahead, 2 steps behind
- **Mobile**: Preloads 2 steps ahead, 2 steps behind (aggressive preloading for smoother experience)

**Faster Transitions:**
Mobile uses fade-only transitions without slide animations for quicker navigation.

### Height-Based Responsive Tiers

Telar uses a 4-tier system that adapts to both width and height:

**Tier 1 (≤700px height)**
- 10-15% typography reduction
- Maintains full feature set

**Tier 2 (≤667px height - iPhone SE)**
- 20-25% typography reduction
- 55vh:45vh viewer-to-panel ratio
- Optimized for smaller smartphones

**Tier 3 (≤600px height)**
- 30-35% typography reduction
- Maximum compression for very small devices

**Dual-Axis Detection:**
These tiers only trigger on narrow screens (width < 768px) to avoid affecting short desktop windows.

## Panel Optimization

Slide-over panels adapt for mobile devices:

### Size Adjustments

**Desktop panels:**
- Layer 1: 40% width
- Layer 2: 55% width
- Glossary: 45% width

**Mobile panels:**
- Full-width with optimized positioning
- Reduced padding and margins
- Smaller font sizes for better content density

### Typography Scaling

All panel content scales down on mobile:
- Headings: Reduced by 15-25%
- Body text: Reduced by 10-15%
- Line heights: Tightened for better use of vertical space

### Touch Interactions

- **Minimum touch target**: 45px × 45px for all interactive elements
- **Swipe gestures**: Natural swipe-down to close panels
- **Tap zones**: Generous hit areas for buttons and links

## Object Gallery

The objects gallery automatically switches to single-column layout on mobile (screens ≤767px):

**Desktop**: Multi-column grid
**Tablet**: 2-column grid
**Mobile**: Single-column list

This ensures object thumbnails and metadata remain readable on small screens.

## Glossary Index

Glossary term listings adapt spacing for mobile:

- Reduced margins (33-50% reduction)
- Tighter letter headings
- Optimized touch targets for term links

## Testing Your Site on Mobile

### Browser DevTools

Use browser developer tools to test responsive behavior:

**Chrome:**
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select device preset or enter custom dimensions
4. Test various screen sizes and orientations

**Firefox:**
1. Open DevTools (F12)
2. Click "Responsive Design Mode"
3. Test different devices

### Real Device Testing

Always test on actual mobile devices when possible:

- **iOS**: Safari on iPhone (various sizes)
- **Android**: Chrome on various Android devices
- **Tablet**: iPad, Android tablets

### Common Screen Sizes to Test

- **iPhone SE**: 375 × 667px
- **iPhone 12/13/14**: 390 × 844px
- **iPhone 12/13/14 Pro Max**: 428 × 926px
- **iPad**: 768 × 1024px
- **Samsung Galaxy S**: 360 × 740px
- **Samsung Galaxy Note**: 412 × 915px

## Content Best Practices for Mobile

### Image Selection

**For story viewers:**
- Ensure IIIF images have enough detail when zoomed
- Test that key features are visible on small screens
- Consider how coordinates translate to mobile viewports

**For widgets:**
- Use appropriately sized images (not too large)
- Ensure captions are concise and readable

### Text Content

**Story narratives:**
- Keep paragraphs shorter (3-5 sentences)
- Use bullet points and lists for scannability
- Break up long sections with subheadings

**Panel content:**
- Prioritize essential information in Layer 1
- Move supplementary details to Layer 2
- Consider mobile users might not explore all layers

### Widget Usage

Widgets work well on mobile, but follow these guidelines:

**Carousels:**
- 3-5 images maximum for better performance
- Keep captions brief
- Ensure images are mobile-friendly sizes

**Tabs:**
- Use 2-3 tabs (4 maximum becomes cramped on mobile)
- Keep tab labels short (1-2 words)

**Accordions:**
- Ideal for mobile (progressive disclosure)
- Use clear, descriptive panel titles
- Keep content sections focused

## Performance Optimization

### Image Optimization

**For local images:**
- Compress images before upload (aim for <2MB per image)
- Use appropriate formats (JPEG for photos, PNG for graphics)
- Let IIIF tiling handle progressive loading

**For external IIIF:**
- Choose reputable institutions with fast servers
- Test manifest loading speed
- Consider fallback images for slow connections

### Bandwidth Considerations

Mobile users often have limited or metered data:

- Keep page weight reasonable (<3MB per page)
- Leverage IIIF progressive loading
- Minimize unnecessary images in panels

### GitHub Pages Limits

Be mindful of GitHub Pages bandwidth:
- 1GB storage limit
- 100GB monthly bandwidth
- For high-traffic mobile sites, consider alternative hosting

## Accessibility

Mobile optimization includes accessibility features:

### Touch Targets

All interactive elements meet WCAG 2.1 minimum touch target sizes (44 × 44px minimum, Telar uses 45 × 45px).

### Screen Reader Support

- Semantic HTML for proper navigation
- ARIA labels on interactive elements
- Skip links for keyboard navigation

### Color Contrast

All themes maintain WCAG AA color contrast ratios on both desktop and mobile.

## Known Limitations

### Mobile Story Navigation

- Very small screens (<360px width) may have cramped layouts
- Landscape orientation on phones is not optimized
- Complex IIIF coordinates may need adjustment for mobile viewing

### Browser Variations

- Safari iOS has strict autoplay policies for media
- Some Android browsers may handle IIIF tiles differently
- Always test on target devices

## Future Improvements

Planned for future releases:

- Gesture navigation (swipe between story steps)
- Improved landscape orientation support
- Progressive web app (PWA) capabilities
- Offline viewing for downloaded exhibitions

## Troubleshooting

### Content Overflowing

If content overflows on mobile:
- Check for fixed-width elements in custom CSS
- Verify images have max-width: 100%
- Test in browser DevTools

### Navigation Not Working

If mobile navigation fails:
- Clear browser cache
- Test in private/incognito mode
- Check JavaScript console for errors
- Verify touch events aren't blocked by custom code

### Slow Performance

If site is slow on mobile:
- Reduce image file sizes
- Check IIIF manifest response times
- Test on slower network connections (DevTools can throttle)
- Consider limiting number of story steps

## Testing Checklist

Use this checklist when testing mobile responsiveness:

- [ ] Homepage loads and displays correctly
- [ ] Object gallery switches to single column
- [ ] Story viewer shows and hides properly
- [ ] Navigation buttons are touch-friendly
- [ ] Panels slide open/closed smoothly
- [ ] Text is readable without zooming
- [ ] Images load and display correctly
- [ ] Widgets function properly
- [ ] Glossary links work
- [ ] All interactive elements respond to touch
- [ ] Site works in both portrait and landscape
- [ ] Performance is acceptable on 3G networks
