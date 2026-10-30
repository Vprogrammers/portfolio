# Club floor

A billiard club seen from above, on a 16 s timeline. The floor holds six pool tables and four dartboards; some tables already carry a booking tag.
- Table 3 is picked and glows. The app's booking card comes up: a name is typed and a date is shown, with the evening's slots (busy ones in orange). A free slot is picked and the booking is confirmed.
- The card drops onto the table, the balls break and scatter, and a teal tag appears.
- A dart lands on board 2.
- The admin panel lists the night's bookings and deletes one, which frees table 5.

`logo` is the club's logo from the app.

Data:
- `logo`, `balls` (six colours)
- `tables` (`name`, `tag`; six)
- `boards` (`name`, `tag`; four)
- `booking` (`title`, `name`, `date`, `confirm`, `slots`: `time`, `busy`, `pick`)
- `admin` (`title`, `date`, `rows`: `time`, `place`, `name`, `remove`)

The booked table (3), the board (2) and the freed table (5) are fixed in the stylesheet. The parent sets `--club-w`, `--club-x` and `--club-y`.
