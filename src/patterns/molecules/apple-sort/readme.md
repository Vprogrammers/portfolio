# Apple sort

On-device apple grading on a 16 s timeline:
- A camera frame looks down into a wooden crate and a scan line passes over it.
- Detection boxes lock onto every apple, each labelled with its class and confidence in the class colour, and a HUD shows the count, the inference time and the model.
- The apples then fly one by one into four crates below, one per class, which fill up.

The apples are drawn in CSS, with blemishes growing worse by class. Each apple's flight is computed from its position in the crate and the centre of its class's bin.

Data:
- `apples` (`x`, `y` in % of the crate, `class` 1–4, `confidence` as two digits)
- `classes` (`name`, `short`, `note`; four)
- `hud` (`count`, `inference`, `model`)

The parent sets `--sort-h`, `--sort-x` and `--sort-y`.
