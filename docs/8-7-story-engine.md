---
layout: docs
title: "8.7. Story Engine Vocabulary"
parent: "8. For Developers"
grand_parent: Documentation
nav_order: 7
lang: en
permalink: /docs/developers/story-engine/
---

# Story Engine Vocabulary

The story engine is the code that runs a story page: it lays out the cards and the object, moves between steps, and decides what to keep loaded. Its code lives in `assets/js/telar-story/` and is built into `assets/js/telar-story.js`. This page defines the terms the code, its comments and these docs use for the parts of a story and the ways it moves, so that each term names one thing.

CSS classes, `data-*` attributes and the `max_viewer_cards` setting keep their older names, because sites and the Compositor read them. Where an older name differs from a term on this page, the entry says so.

## The Parts of a Story

A story is built from these parts:

- **Step**: one row of a story's spreadsheet, holding a question, an answer and a framing.
- **Scene**: consecutive steps on the same object. On screen, a scene is a plate with its card stack on it, and it rises over the previous scene as one unit. A return to an object later in the story starts a new scene.
- **Plate**: the full-window part of a scene that shows the object. An image plate holds a viewer; a video or audio plate holds a player.
- **Card stack**: a scene's text cards, the newest on top and the earlier ones peeking above it. A card belongs to its scene and moves with its scene's plate. The module that builds it is `card-pool.js`.
- **Text card**: the card holding a step's question and answer.
- **Title card**: a step with no object, either the story's title or a section heading.
- **Viewer**: the image viewer (OpenSeadragon) on an image plate.
- **Player**: the video or audio player on a media plate.

## Moving Between Steps

These terms describe what happens when the reader goes from one step to the next:

- **Framing**: a step's authored `x`, `y` and `zoom`, for any plate type.
- **Camera**: what an image plate's viewer shows at a given moment. Only images have a camera.
- **Move**: one transition between steps. The scroll, the camera, the cards and the plates all run over one duration, which grows with how far the camera travels: `max(1.2, min(3, 1.33 × S))` seconds, where S is the camera's zoom-and-pan path length between the two framings (`camera-travel.js`). A move with no camera travel takes the base of 1.2 seconds, and so do jumps from the contents and from a link.
- **The reader's scroll**: the reader's wheel, trackpad or touch input.
- **Scrubbing**: the state while the reader's scroll drives the story. The page carries the class `is-scrubbing`.
- **Carry**: when the reader's scroll stops between two steps, the engine finishes the gesture by moving to the nearer one.
- **Dwell**: the hold after a move arrives.
- **Settle**: the cards taking their positions for a step.
- **Rest**: the camera or the scroll standing still.

Developers can tune the move duration for testing with `?nav=base,perUnit,maxSeconds` in the page URL. `?nav=1.2,0` gives every move the base duration, whatever the camera travels.

## Layouts

A story page uses one of two layouts.

- **Horizontal layout**: the text card sits beside the plate as a side card, and the reader moves with scroll navigation.
- **Vertical layout**: the reader moves with button navigation, and the text card sits below the plate as a bottom card, or beside it as a phone-height side card.

The page uses the vertical layout when any of these is true of the window:

- It is 1024px wide or narrower.
- Its aspect ratio is 3:4 or narrower, as on a tablet held upright.
- It is 480px tall or shorter.
- It is between 481px and 632px tall and too narrow for a side card of the width its height needs. These windows, the short windows, are generated in 8px bands and published as `--telar-vertical-short-windows`.

The terms for the cards and the space around them:

- **Side card**: the text card beside the plate in the horizontal layout. Its width is set by the window's height and kept between 37% and 52% of the window's width: `min(0.52W, max(0.37W, min(718, 1544 − 1.6H)))`, rounded to a whole pixel.
- **Bottom card**: the vertical layout's card below the plate.
- **Phone-height side card**: in the vertical layout, on a window 480px tall or shorter (a phone on its side, or a desktop window that short), the card sits beside the plate and the browser scrolls it. The code tests for it with `isPhoneHeightSideCard()` in `layout-mode.js`. The threshold is `--telar-card-landscape-max-height`, which keeps its older name.
- **Compact type size**: smaller type and tighter spacing on any window 600px tall or shorter, whatever its width.
- **Band**: the strip under the top controls that the cards sit below.
- **Ceiling**: the tallest a side card may be.
- **Button navigation**: previous and next buttons move the story one step at a time. It runs in the vertical layout, in embedded stories, and on iOS in either layout. Its buttons keep the class `.mobile-nav`.
- **Scroll navigation**: the reader's scroll moves the story. It runs in the horizontal layout everywhere but iOS.

## What Stays Loaded

The engine keeps a capped number of objects loaded, so a long story does not hold every image and player in memory:

- **Viewer pool**: the loaded viewers. The cap is `max_viewer_cards` in `_config.yml` (default 8, at most 15); past it, the viewer on the plate farthest from the current step is unloaded. The setting means the most scenes whose viewer stays loaded.
- **Player pool**: the loaded media players, capped at three video players and three audio players, evicted the same way.

These are the only uses of "pool" in the engine.

## Stacking

Each scene's cards and plate use their own block of `z-index` values, its **z-range**, so a later scene covers an earlier one as a unit.
