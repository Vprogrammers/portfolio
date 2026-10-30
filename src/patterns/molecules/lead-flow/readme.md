# Lead flow

The BezBrige! agent story on one phone, on an 18 s timeline:
1. The admin assigns a new contact. The push drops in and the contact slides into "Novi kontakti".
2. The agent opens the contact and calls them.
3. The agent sets the call status in the status dialog ("Klijent nije pozvan" → "Zainteresovan/a"), and the awareness level rises.
4. The agent adds a reminder. The status moves on to "Poslao/la ponudu" and then "Potpisan ugovor", and a contract chip appears.
5. The story ends on the agent's profile, where the counters tick up for the new contract.

An awareness ladder (levels 0–4) beside the phone shows the client's stage and fills up as the agent works.

Colours, statuses and awareness labels come from the app's shared code (`AppPalette`, `CallStatus`, `AwarenessLevel`). Everything is HTML and CSS. `logo` is the app's white logo.

Data:
- `logo`, `push` (`title`, `body`)
- `agent` (`initials`, `name`, `level`, `stats`: `label`, `before`, `after`)
- `client` (`name`, `age`, `phone`, `product`, `duration`, `amount`)
- `contacts` (`name`, `age`, `product`, `status`, `color`; three)
- `statuses` (the call status list; the 4th one gets picked)
- `awareness` (labels for levels 0–4)
- `reminder` (`when`, `text`), `contract`

The parent sets `--phone-h`, `--phone-x` and `--phone-y`.
