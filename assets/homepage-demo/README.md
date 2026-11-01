# Telar homepage video
The homepage uses normal document flow and the supplied Spanish/English Vimeo
embeds. The canonical definition sits above a full-width film at every screen size. There is no native scroll-film renderer or local MP4 fetch.

Only the active-language poster is loaded initially. IntersectionObserver creates
the iframe and loads Vimeo's SDK as the film enters view. Playback is muted and
looping; it pauses off screen or when the page is hidden. Player interaction uses
Vimeo itself, with its own centre play/pause control and no custom button.
The progress bar and auxiliary player controls are disabled. Reduced motion suppresses autoplay and
uses Vimeo's own controls. A failed load retains the poster and offers a Vimeo
link. The supplied video IDs and privacy hashes are preserved.

Lenis and scroll-motion.js provide bounded page smoothing and one section per
arrow press. Film bookmarks and the pinned 2500svh section have been removed.
The approved palette is terracotta, cream, light grey, charcoal and darker
secondary text, with a blue project section. The larger loom and original wordmark scale are retained. All developer/supporter logos, including UT AMPL, remain.

The previous scroll implementation and media are retained in the local development archive.

No Vimeo uploads or site publication are performed by this change.

The embed crops the exported 109px top/bottom padding to show the complete
1920x1080 film. A small brightness adjustment with a darken blend makes both
encoded pale background variants continuous with the #F4F5F6 section.
