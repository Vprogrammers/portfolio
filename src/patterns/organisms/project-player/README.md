# Project player

Fullscreen hero that rotates through the projects listed in `src/views/_data/index.json` (`projects`), with the persistent `intro` (name and role) on top.

- A project with `frames` and `variant` renders the `device-scene` molecule; screen geometry for each variant lives in that molecule's CSS.
- A project with only `image` (optional `imageMobile`, `imageTablet`, `imageWide`) renders a cover photo with a stronger shade, since that artwork may contain text.
- `duration` (ms) is the story's length; a slide stays for at most the default interval (7 s) and its scene resumes where it stopped on the next visit; `scrollTarget` adds the chevron link to the works grid.

Images are decorative (`alt=""`); category, title and summary are real HTML text.
