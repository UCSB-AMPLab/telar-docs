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
- **Music** — A music icon for audio objects
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

## Clip capture

Clip capture lets you define which segment of a video or audio file plays during a particular step. Instead of entering timestamps manually in a spreadsheet, you capture them visually while the media plays.

To capture clip times for a step:

1. Select the step you want to configure
2. Play the video or audio in the viewer
3. When the media reaches the point where you want the clip to begin, click **Capture start**
4. Continue playing until the media reaches the end point, then click **Capture end**
5. The captured times appear in the step's settings, displayed in gold monospace MM:SS format

You can recapture either time at any point by clicking the corresponding button again while the media is at a new position.

{: .tip }
> Clip capture in the Compositor sets the same `clip_start` and `clip_end` values described in [Video Objects](/docs/your-content/video-objects/) and [Audio Objects](/docs/your-content/audio-objects/). If you later edit your spreadsheet files directly, the clip values are interchangeable.

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
