---
layout: docs
title: "8.6. Layouts and Small Screens"
parent: "8. For Developers"
grand_parent: Documentation
nav_order: 6
lang: en
permalink: /docs/developers/mobile/
---

# Layouts and Small Screens

A story page has two layouts, horizontal and vertical, and chooses between them from the size and shape of the window rather than from the kind of device. This page describes what each layout does and how the rest of the site adapts to small and short windows. The terms it uses are defined in [8.7 Story Engine Vocabulary](/docs/developers/story-engine/).

## The Two Layouts

In the horizontal layout, the text card sits beside the object as a side card, and the reader moves through the story by scrolling. In the vertical layout, the text card sits below the object as a bottom card, and the reader moves with previous and next buttons.

The page uses the vertical layout when any of these is true of the window:

- It is 1024px wide or narrower.
- Its aspect ratio is 3:4 or narrower, as on a tablet held upright, whatever its width.
- It is 480px tall or shorter.
- It is between 481px and 632px tall and too narrow for a side card of the width its height needs.

Otherwise it uses the horizontal layout. The layout follows the window as it is resized.

### The text card

In the horizontal layout, the side card is between 37% and 52% of the window's width, set by the window's height, and white, over the object. In the vertical layout, the bottom card is anchored to the bottom of the window and white, up to 40% of the window's height (35% for a video or audio object).

On a window 480px tall or shorter, such as a phone on its side, the card returns to the side of the object while the page stays in the vertical layout. This is the phone-height side card: it takes 37% of the window's width and scrolls within itself when its text is longer than the window.

The text inside a card also sizes itself to the card: when the card is 480px wide or narrower, and again at 360px, its padding and type get smaller.

### Navigation

How the reader moves is decided once, when the story loads:

- **Scroll navigation** (wheel, trackpad, touch and keyboard) in the horizontal layout.
- **Button navigation** in the vertical layout, in embedded stories, and on iPhone and iPad in either layout, where momentum scrolling is not reliable. The previous and next buttons are 66px circles fixed to the right edge of the window, centered vertically.

Because the choice is made at load, a window opened wide and then narrowed keeps scroll navigation, and one opened narrow and then widened keeps the buttons. The keyboard works in both: the arrow keys, Page Up and Page Down, Space, Home and End.

In the vertical layout, the back button becomes a 44px round icon, the step counter moves to the center of the top edge, and the credits badge shrinks to one line.

### Loading

Both layouts load objects the same way: the viewers for the next `preload_steps` steps (6 by default) and the previous 2, up to `max_viewer_cards`. See [3.2 Configuration](/docs/configure/configuration/). When a story has `loading_threshold` or more distinct objects (5 by default), a shimmer shows while the first viewers load; in button navigation it also shows when the reader reaches an object that is not ready yet.

## Compact Type Size

On any window 600px tall or shorter, whatever its width, Telar uses a compact type size: smaller type and tighter spacing in page content, the objects gallery, the navigation bar, the panels and their titles, and the story's navigation buttons, which become 45px.

## iOS Safari and Notches

- **Stable heights:** layout heights use dynamic viewport units (`dvh`) with a `vh` fallback, so the layout does not jump when Safari's address bar appears or disappears.
- **Notch safe areas:** the credits badge, the navigation buttons, the bottom card and the panels keep clear of the device notch and home indicator.
- **Hover:** hover styles apply only on devices with a fine pointer (`@media (hover: hover) and (pointer: fine)`), so they do not stick after a tap on a touchscreen.
- **Reduced motion:** when the operating system asks for reduced motion, smooth scrolling is off, the camera moves to each framing at once, and card and panel transitions are off.

## Panels

Panels slide in from the right in both layouts. In the horizontal layout, layer 1 takes 65% of the window (at most 800px), layer 2 55% (at most 750px) and the glossary 50% (at most 700px); on windows between 1025px and 1200px wide they take 80%, 75% and 70%. In the vertical layout they take nearly the whole width (98%, 96% and 94%) and 76% of the height, show only the close button, and use less padding.

Panel type gets smaller only in the compact type size: titles go from 2rem to 1.4rem, body text from 1.05rem to 0.9rem, and line height from 1.8 to 1.35.

## Objects Gallery

The gallery fills the width with columns at least 250px wide. In the vertical layout it shows two columns, and on windows 441px wide or narrower, one.

## Glossary Index

In the vertical layout, the glossary index tightens its spacing: letter headings get smaller and their margins shrink by a third, and the space between terms is halved.

## Testing Your Site on Small Screens

### Browser DevTools

Use your browser's developer tools to try different window sizes:

**Chrome:**
1. Open DevTools (F12)
2. Click the device toolbar icon
3. Select a device preset or enter custom dimensions
4. Try both orientations

**Firefox:**
1. Open DevTools (F12)
2. Click **Responsive Design Mode**
3. Try different devices

Resize the window across the layout thresholds: 1024px wide, a 3:4 aspect ratio, and 480px and 600px tall. Reload after a resize to see the navigation a reader with that window would get.

### Real Devices

Test on real devices when you can:

- **iOS**: Safari on iPhone and iPad
- **Android**: Chrome on a phone and a tablet

### Common Screen Sizes

- **iPhone SE**: 375 × 667px
- **iPhone 12/13/14**: 390 × 844px
- **iPhone 12/13/14 Pro Max**: 428 × 926px
- **iPad**: 768 × 1024px
- **Samsung Galaxy S**: 360 × 740px
- **Samsung Galaxy Note**: 412 × 915px

## Content on Small Screens

### Images

- Make sure IIIF images have enough detail when zoomed.
- Check that the features a step points to are visible on a small screen.
- Check how your framings look in both layouts.

### Text

- Keep answer paragraphs short (3 to 5 sentences).
- Use lists to break up long passages.
- Put essential information in layer 1 and supplementary detail in layer 2, since readers on phones may not open every layer.

### Widgets

- **Carousels:** 3 to 5 images, with short captions.
- **Tabs:** 2 or 3 tabs with short labels; on narrow screens the tab row scrolls sideways.
- **Accordions:** work well on small screens; use clear titles.

## Performance

Readers on phones often have slow or metered connections:

- Compress images before you upload them (aim for under 2MB each) and let IIIF tiling handle progressive loading.
- Choose external IIIF sources with fast servers, and test how quickly their manifests load.
- Keep images in panels to the ones the text needs.

## Accessibility

- Most controls are at least 44 × 44px, the WCAG 2.1 minimum touch target; the story's navigation buttons are 66px, or 45px in the compact type size.
- Navigation buttons and other controls carry ARIA labels.

## Troubleshooting

### Content overflowing

- Check custom CSS for fixed-width elements.
- Make sure images have `max-width: 100%`.
- Try the page in your browser's responsive mode.

### Navigation not working

- Clear the browser cache, or try a private window.
- Check the JavaScript console for errors.
- Check that custom code does not block touch or wheel events.

### Slow performance

- Reduce image file sizes.
- Check how quickly IIIF manifests respond.
- Test on a throttled connection in DevTools.

## Testing Checklist

- [ ] The home page loads and displays correctly
- [ ] The objects gallery shows two columns in the vertical layout, and one on a narrow phone
- [ ] The story uses the expected layout and navigation at each window size
- [ ] The navigation buttons are easy to tap
- [ ] Panels open and close
- [ ] Text is readable without zooming
- [ ] Images load
- [ ] Widgets work
- [ ] Glossary links work
- [ ] The site works with the phone upright and on its side
- [ ] Performance is acceptable on a slow connection
