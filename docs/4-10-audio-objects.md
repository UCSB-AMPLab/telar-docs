---
layout: docs
title: "4.10. Audio Objects"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 10
lang: en
permalink: /docs/your-content/audio-objects/
---

# Audio Objects

Telar can display self-hosted audio files as objects in your exhibition. Audio works just like images and videos — you can build stories around recordings, focus on specific moments with clip control, and include them alongside your other objects.

Unlike video objects (which embed from external platforms), audio files live directly in your repository. Place your MP3, OGG, or M4A files in `telar-content/objects/` and Telar handles the rest.

## Adding an audio object

To add an audio file, place it in `telar-content/objects/` with a filename matching the `object_id` in your objects spreadsheet.

For example, if your spreadsheet has an object with `object_id` = `field-recording-01`, name your file `field-recording-01.mp3`.

### Supported formats

Telar recognizes three audio formats:

- **MP3** — the most widely supported format
- **OGG** — open format with good compression
- **M4A** — common format from Apple devices and professional recorders

## How audio appears

### In stories

When a story step references an audio object, a WaveSurfer waveform visualisation fills the viewer area with play/pause controls. If you set `clip_start` and `clip_end` values in your story spreadsheet, the player plays only the specified segment. This is useful for drawing attention to a particular moment in a longer recording.

### On object pages

Each audio object has its own page (`/objects/{object-id}/`) with a full waveform player. Below the waveform, a clip picker lets you select start and end times by dragging region edges on the waveform — useful when building story steps. Copy the values directly into your story spreadsheet.

### In the gallery

Audio objects appear in the objects gallery with a waveform icon on a grey background. The gallery's **Type** filter lets visitors browse by media type (Image, Video, or Audio).

## Clip control

Story steps can specify a start time, end time, and loop setting for audio objects. The columns work exactly the same way as they do for video — see [Video Objects: Clip control](/docs/your-content/video-objects/#clip-control) for the full column reference and examples.

| Column (English) | Column (Spanish) | Description |
|---|---|---|
| `clip_start` | `inicio_clip` | Start time in seconds (e.g. `12.5`) |
| `clip_end` | `fin_clip` | End time in seconds |
| `loop` | `bucle` | Loop the clip (`true`, `yes`, or `sí`) |

{: .tip }
> You can also use the Compositor's clip capture interface to set clip times visually. See [Video and Audio in the Compositor](/docs/the-compositor/video-audio/) for details.

## Audio build pipeline

Telar processes audio files during the build to extract clips and generate peak data for the waveform display. This is handled by `process_audio.py`, which runs automatically as part of the build.

### Optional dependencies

Audio processing requires two external tools. These are only needed if your site includes audio objects — sites without audio do not need them.

- **ffmpeg** — extracts audio clips based on your `clip_start` and `clip_end` values
- **audiowaveform** — generates peak data for the waveform visualisation

To install them locally:

**macOS:**

```bash
brew install ffmpeg audiowaveform
```

**Ubuntu/Debian:**

```bash
sudo apt install ffmpeg audiowaveform
```

{: .note }
> **GitHub Actions handles this automatically.** The `build.yml` workflow detects audio files in your repository and installs these tools during the build. No manual setup is needed for deployed sites.

## See also

- [Video Objects](/docs/your-content/video-objects/) — Embedding video from external platforms
- [Objects](/docs/your-content/objects/) — Defining objects in your spreadsheet
- [Stories & Panels](/docs/your-content/stories-panels/) — Building story steps
- [Story Columns](/docs/your-data/csv-stories/) — Complete column reference including clip columns
- [Objects Gallery](/docs/site-features/objects-gallery/) — How audio objects appear in the gallery
