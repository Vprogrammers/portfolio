# Pageant stage

A competition night on a 16 s timeline:
- It opens with the app's splash. The white logo sits on the brand blue, then turns into a hole that grows over the scene, as the Android `SplashView` did. A CSS mask, with the logo excluded from a full layer, does the same here.
- On the lit stage, with sweeping spotlights, contestant number cards fill with live votes.
- The judges' scores land one by one. The winner's card lifts, a crown drops onto it and confetti falls.

There are no people: contestants are a number and a city.

Data:
- `logo` (white on transparent), `title`, `vote`
- `judges` (three scores)
- `contestants` (`number`, `city`, `votes` as a %, `hue`, `winner`; four)

The parent sets `--stage-h`, `--stage-x` and `--stage-y`.
