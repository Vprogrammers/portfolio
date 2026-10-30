# Pass card

A digital pass backed by a signed credential, on a 16 s timeline:
- The pass card flips to its back, which shows the JWT coloured by header, payload and signature, plus the decoded claims.
- Back on the front, the expiry counts down to 00:00, the status turns red and the card greys out.
- A new credential is requested: the card turns valid again and its QR code redraws.

Data: `brand`, `holder` (`initials`, `name`, `pass`), `expires`, `countdown` (five values ending in 00:00), `jwt` (`label`, `header`, `payload`, `signature`, `claims`), `refresh`. The parent sets `--pass-h`, `--pass-x` and `--pass-y`.
