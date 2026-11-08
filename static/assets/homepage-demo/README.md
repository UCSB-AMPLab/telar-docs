# Telar homepage video
The homepage uses normal document flow and the supplied Spanish/English Vimeo
embeds. The definition and full-width film share a sticky stage: the next scroll
step fades out the definition and reveals the video in place; the previous step
restores the definition. Hidden layers are inert and hidden from assistive
technology, and the video pauses while the definition is showing. There is no native scroll-film renderer or local MP4 fetch.

Only the active-language poster is loaded initially. IntersectionObserver creates
the iframe and loads Vimeo's SDK as the film enters view. Playback is muted and
looping; it pauses off screen or when the page is hidden. Player interaction uses
Vimeo itself, with its own centre play/pause control and no custom button.
The progress bar and auxiliary player controls are disabled. Reduced motion suppresses autoplay and
uses Vimeo's own controls. A failed load retains the poster and offers a Vimeo
link. The supplied video IDs and privacy hashes are preserved.

Lenis and scroll-motion.js animate one stop per wheel/trackpad gesture or arrow
press. A 200ms quiet gap separates wheel gestures; momentum cannot trigger a
second move. Tall sections include reading stops to keep every row reachable.
Native snap points cover touch input. For wheel input inside Vimeo, a scroll
observer hands native movement to the same step controller without covering the
player or disabling its controls. Reduced motion uses immediate transitions. Film bookmarks and the pinned 2500svh section have been removed.
The approved palette is terracotta, cream, light grey, charcoal and darker
secondary text, with a blue project section. The larger loom and original wordmark scale are retained. All developer/supporter logos, including UT AMPL, remain.

The previous scroll implementation and media are retained in the local development archive.

The embed crops the exported 109px top/bottom padding to show the complete
1920x1080 film. A small brightness adjustment with a darken blend makes both
encoded pale background variants continuous with the #F4F5F6 section.

The film has no side gutters or maximum-width cap. Its natural 16:9 frame
remains intact; short, wide windows get additional reading stops so the lower
edge remains reachable. A 3% brightness adjustment before darken blending
normalizes the darker poster matte as well as the encoded video backgrounds.
