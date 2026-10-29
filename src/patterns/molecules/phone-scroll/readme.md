# Phone scroll

CSS phone whose screen shows a fixed app header (`header`) and a tall feed image (`feed`) that scrolls underneath it, resting on each card. Fills its positioned parent; the parent sets `--phone-h`, `--phone-x` and `--phone-y`.

The image sizes and resting points (`$screen-w`, `$header-h`, `$feed-h`, `$stops`) are set at the top of the stylesheet; update them when the images change.

The Migros iMpuls images are composed from the app's public App Store screenshots: the header and the recipe, tip and workout cards, cropped to the screen and stacked.
