---
layout: docs
title: "4.9. Video Objects"
parent: "4. Your Content"
grand_parent: Documentation
nav_order: 9
lang: en
permalink: /docs/your-content/video-objects/
---

# Video Objects

Telar can display videos from YouTube, Vimeo, and Google Drive as objects in your exhibition. Videos work just like images — you can build stories around them, focus on specific moments with clip control, and include them alongside your other objects.

Videos are not stored in your repository — Telar embeds them directly from the platform where they are already hosted.

## Adding a video object

To add a video, put the video's URL in the `source_url` column of your objects spreadsheet. Telar detects the media type automatically from the URL — no additional configuration is needed.

For example, a row in your objects spreadsheet might look like this:

```csv
object_id,title,source_url
interview-01,Oral history interview,https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Supported platforms

Telar recognizes video URLs from three platforms:

- **YouTube** — `youtube.com/watch?v=...` and `youtu.be/...` short links
- **Vimeo** — `vimeo.com/123456789`
- **Google Drive** — `drive.google.com/file/d/.../view` (the video must be shared publicly or with "Anyone with the link")

{: .note }
> Telar does not support self-hosted video files. Videos must be hosted on one of the supported platforms. For self-hosted media, see [Audio Objects](/docs/your-content/audio-objects/).

## How videos appear

### In stories

When a story step references a video object, the video player fills the viewer area. The player includes standard playback controls (play, pause, seek) and responds to any clip settings you define for that step.

If you set `clip_start` and `clip_end` values in your story spreadsheet, the video plays only the specified segment. This is useful for drawing attention to a particular moment without requiring your audience to watch the full recording.

### On object pages

Each video object has its own page (`/objects/{object-id}/`) with an embedded player. Below the player, a clip time picker lets you play to a position and capture timestamps — useful when building story steps.

### In the gallery

Video objects appear in the objects gallery with a play icon on a grey background. The gallery's **Type** filter lets visitors browse by media type (Image, Video, or Audio).

## Clip control

Story steps can specify a start time, end time, and loop setting for video objects. Add these columns to your story spreadsheet:

| Column (English) | Column (Spanish) | Description |
|---|---|---|
| `clip_start` | `inicio_clip` | Start time in seconds (e.g. `12.5`) |
| `clip_end` | `fin_clip` | End time in seconds |
| `loop` | `bucle` | Loop the clip (`true`, `yes`, or `sí`) |

All three columns are optional. If omitted, the video plays from the beginning without looping.

```csv
step,object,clip_start,clip_end,loop,question,answer
1,interview-01,45,78,false,What does she describe?,The weaving technique used in her community.
2,interview-01,120,145,true,A recurring motif,Notice how the pattern repeats — this clip loops to highlight the repetition.
```

### Finding clip times

The object page for each video includes a clip time picker:

1. Navigate to the object page for your video (`/objects/{object-id}/`)
2. Play the video to the position you want
3. Click the timestamp capture buttons to record start and end times
4. Copy the values into your story spreadsheet

{: .tip }
> You can also use the Compositor's clip capture interface to set clip times visually. See [Video and Audio in the Compositor](/docs/the-compositor/video-audio/) for details.

## See also

- [Audio Objects](/docs/your-content/audio-objects/) — Adding self-hosted audio files
- [Objects](/docs/your-content/objects/) — Defining objects in your spreadsheet
- [Stories & Panels](/docs/your-content/stories-panels/) — Building story steps
- [Story Columns](/docs/your-data/csv-stories/) — Complete column reference including clip columns
- [Objects Gallery](/docs/site-features/objects-gallery/) — How videos appear in the gallery
