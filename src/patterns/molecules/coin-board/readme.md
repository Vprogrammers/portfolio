# Coin board

A crypto market board on a 16 s timeline:
- Market rows slide in with their sparklines drawing, and prices tick with a green flash.
- The first coin is picked and its detail opens: the price line draws, the area under it fills, and a crosshair with a value marker sweeps across, as the app's chart marker did.
- A live dot marks the market data API.

The figures are illustrative.

Data:
- `brand`, `api`, `tabs`
- `coins` (`symbol`, `name`, `hue`, `spark` as SVG points in a 100×30 box, `prices`: three ticks, `change`; five)
- `detail` (`name`, `price`, `change`, `ranges`, `line` as SVG points in a 300×120 box, `marker`: `value`, `date`, `stats`: `label`, `value`)

The parent sets `--board-h`, `--board-x` and `--board-y`. In portrait parents only the list shows.
