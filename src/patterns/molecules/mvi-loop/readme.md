# MVI loop

The MVI loop of a shared presenter on a 16 s timeline:
- A ring of five stations (Intent → reducer → Model → mapper → UIState) is lit by a spark that circles it twice.
- The first turn types the query and shows loading. The second delivers the results.
- An Effect chip then fires a one-shot toast on the phone.

Data: `presenter` (`name`, `generics`), `nodes` (`name`, `note`; five), `effect`, `heading`, `query`, `users` (`name`, `city`, `hue`; four), `toast`. The parent sets `--loop-h`, `--loop-x` and `--loop-y`. In portrait parents only the phone shows.
