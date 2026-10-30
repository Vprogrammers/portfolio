# On air

A phone that plays the Hanze3 live-radio story on one 16 s timeline: the app's splash with its tagline typed in, the main screen with tabs and a news story per tab, live chat whose messages float out of the screen across the slide, a TALKING APPOINTMENT request that turns pending, an admin's APPROVED stamp, a countdown, then ON AIR (red glow on the screen and a lit sign beside the phone). Broadcast rings and an equaliser keep the scene moving.

The splash and main screen are frames from a device recording (`splash`, `main`); the parts that change are HTML overlays placed on the recording's own layout (1cqw is 10.8 px of the 1080 px frame). `studio` is the splash photo, also used to fill the news and chat areas the recording left empty.

Data: `splash`, `main`, `studio`, `tagline`, `tabs`, `news` (`label`, `title`, one per animated tab), `messages` (`name`, `hue`, `text`; up to four) and `countdown`. The parent sets `--phone-h`, `--phone-x` and `--phone-y`. Arabic text is set right-to-left.
