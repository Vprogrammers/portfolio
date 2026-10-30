# Crew call

Two phones playing the PhotoStory story on one 18 s timeline. On the admin's iPhone, the tab switcher moves to the calendar and a free day is picked. The booking form fills in field by field (start and duration, place, type of celebration, client), then the services and the staff are picked and the event is booked. The pushes fly over to a crew member's Android phone: the "Nova proslava" notification drops in, opens as a job offer and is declined. The offer moves on to the next person (a chip beside the phone). Meanwhile the event's crew list on the admin phone fills up: sent → accepted, and for the one who declined, declined → the next person → accepted, until "Ekipa je kompletna".

Everything is HTML and CSS over the app's own photo background (`background`). `logo` is the app's white logo, used for the push icon.

Data:
- `background`, `logo`
- calendar: `month`, `offset` (empty cells before day 1, weeks start on Monday), `days`, `busy` (red days), `pick`
- booking: `date`, `fields` (`hint`, `value`, `select`; four)
- crew: `crew` (`role`, `name`, `hue`; four). The third one also has a `backup` (`name`, `hue`): they decline and the backup takes over.
- event: `type`, `summary`
- crew phone: `today`, `push` (`title`, `body`), `offer` (`role`, `forwarded`, and `next`: `name`, `hue`, `text`)

The parent sets `--phone-h`, `--phone-x` and `--phone-y`.
