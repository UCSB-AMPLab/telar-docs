---
layout: docs
title: "9.5. Video and Audio"
parent: "9. The Compositor"
grand_parent: Documentation
nav_order: 5
lang: en
permalink: /docs/the-compositor/video-audio/
---

# Video and Audio

The Compositor supports video and audio objects alongside images. When a story step references a video or audio object, the viewer column shows the appropriate media player — an embedded video player or a waveform audio player — and provides tools for capturing clip times and setting loop behavior.

For background on how video and audio objects work in Telar, see [Video Objects](/docs/your-content/video-objects/) and [Audio Objects](/docs/your-content/audio-objects/).

## Media type detection

The Compositor detects the media type of each object automatically based on its source URL. You do not need to configure the type manually — the Compositor reads the URL and determines whether the object is an image, a video, or an audio file.

Each step in the sidebar displays a media type badge to help you identify what kind of object it references:

- **Video** — A film icon for video objects
- **Audio** — A music icon for audio objects
- **Text** — A text icon for steps with no media object

## Supported video sources

The Compositor recognizes video URLs from three platforms:

- **YouTube** — `youtube.com/watch?v=...` and `youtu.be/...` short links
- **Vimeo** — `vimeo.com/123456789`
- **Google Drive** — `drive.google.com/file/d/.../view` (the video must be shared publicly or with "Anyone with the link")

When a step references a video object, an inline video player appears in the viewer column with standard playback controls.

## Audio objects

Audio objects use self-hosted files stored in your repository at `telar-content/objects/`. The Compositor supports MP3, OGG, and M4A formats.

When a step references an audio object, the viewer column displays a WaveSurfer waveform player. The waveform provides a visual representation of the audio and includes play and pause controls.

## Clip range

A clip is the segment of a video or audio file that plays during one step. You set it visually in the viewer rather than typing timestamps into a spreadsheet.

### Video

A clip timeline sits in the bar below the video. It spans the whole file, showing the clip as a highlighted region, with a thin marker that follows playback.

1. Select the step you want to configure
2. Drag the **start** or **end** handle to move one edge of the clip, or drag the highlighted region itself to move the whole clip without changing its length
3. Release the handle to save

The times at either end of the bar are where the clip begins and ends, and the figure between them is its length. A brief **Clip saved** confirmation replaces the length each time you change the range.

### Audio

Audio has no separate timeline. The waveform carries the clip region directly — drag its handles to set the start and end.

### Checking a clip

Below the player, the current clip reads as `clip 0:05 → 0:12`, or **No clip set** when the step plays the whole file.

**Preview clip** plays the clip on its own, so you can check exactly what a visitor will get without sitting through the rest of the file.

{: .note }
> Google Drive videos cannot be clipped. In place of the clip times, the viewer shows **Google Drive does not support clipping**.

## Loop toggle

Each step has a loop toggle that controls whether the clip repeats continuously when the audience reaches that step. When enabled, the media plays the captured segment in a loop until the audience advances to the next step.

The loop setting persists when you save and applies to both video and audio steps.

## Genre and medium

Objects have a type field that maps to the `medium_genre` column in `objects.csv`. The Compositor manages this field through the [Objects](/docs/the-compositor/objects/) metadata editor — you can set it when adding or editing an object.

The genre or medium value helps the objects gallery organize items by type and provides additional context for your audience when browsing the exhibition.

## See also

- [Story Editor](/docs/the-compositor/story-editor/) — Building stories with the visual editor
- [Publishing](/docs/the-compositor/publishing/) — Review and publish your changes
- [Video Objects](/docs/your-content/video-objects/) — How video objects work in Telar
- [Audio Objects](/docs/your-content/audio-objects/) — How audio objects work in Telar
- [Story Columns](/docs/your-data/csv-stories/) — Complete column reference including clip columns
