# Live room

A phone that plays the MuMe story in HTML and CSS on one 16 s timeline: the splash (the "Me" box dissolves into halftone dots, re-opens, "Mu" slides in), creating a chat room in the app's leaf-shaped dialog, then the live room where guests join, their coin fee flies into the host's wallet, chat messages, hearts and a gift arrive.

Data: `room`, `host` (`name`, `initials`), `guests` (`name`, `hue`; up to three), `fee`, `wallet` (balance after each step), `gift`, `messages` (up to four), `wordmark` and `nav` (images cropped from app screenshots). The parent sets `--phone-h`, `--phone-x` and `--phone-y`.

Timings live at the top of the stylesheet (`$loop`, `$guest-joins`, `$chat-times`). Avatars are initials on purpose, so no real or generated faces appear.
