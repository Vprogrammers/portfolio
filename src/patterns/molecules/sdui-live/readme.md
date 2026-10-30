# SDUI live

Server-driven UI on a 16 s timeline. A JSON layout is typed in an editor, object by object. Each object flashes as it is typed, a packet crosses to the phone and the matching component lands on the screen: Text, two CardImages, then a TextButton. Midway, one value is edited (`textPosition` BottomLeft → TopRight) and the card's caption moves in place.

Data: `file`, `server`, `title`, `cards` (`heading`, `subheading`, `hue`; two), `button`. The parent sets `--live-h`, `--live-x` and `--live-y`. In portrait parents only the phone shows.
