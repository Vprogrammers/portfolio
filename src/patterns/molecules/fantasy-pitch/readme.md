# Fantasy pitch

The Goaleadors fantasy soccer story on a 16 s timeline:
- A pitch is tilted back like a broadcast camera. Eleven drafted players drop into a 4-3-3 one by one while the budget counts down, and a captain's armband goes on.
- On matchday, points pop over each player and the gameweek total climbs.
- The league pyramid from the business plan then covers the pitch, and the team's chip climbs from the base competition to a 4th and then a 3rd league.

The kits are generic navy and gold shirts with numbers. There are no real players, clubs or badges. `logo` is the app's crest.

The players stand upright through 3D. Nothing in the pitch's chain may fade or filter; the pyramid hides the pitch with its own backdrop instead.

Data:
- `logo`, `draft`, `budget` (four steps), `gameweek`, `totals` (four steps)
- `players` (`x`, `y` in % of the pitch, `number`, `name`, `points`, `keeper`, `captain`; eleven)
- `prize`, `pyramid` (`label`, `count`; five rows, top first), `team`

The parent sets `--stage-w`, `--stage-h`, `--stage-x` and `--stage-y`. In portrait parents the side panel is hidden.
