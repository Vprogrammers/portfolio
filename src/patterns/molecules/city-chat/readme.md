# City chat

People meeting by city, on a 16 s timeline:
- City bubbles float with a few members around each.
- A profile card picks gender, interest and city, and the person's bubble flies into that city.
- The city's group chat opens and messages arrive, then a friend request drops in.

People are shown as initials.

Data: `cities` (`name`, `members`, `hue`, `people`: `initial`, `hue`; four, the second is joined), `me` (`initial`), `profile` (`title`, `rows`: `label`, `options`, `pick`; three), `room` (`title`, `online`, `messages`: `initial`, `hue`, `text`, `mine`; four), `request` (`initial`, `hue`, `title`, `body`). The parent sets `--chat-h`, `--chat-x` and `--chat-y`.
