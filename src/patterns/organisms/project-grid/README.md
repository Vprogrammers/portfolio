# Project grid

Edge-to-edge, two-column grid of the projects in `src/views/_data/index.json`. Title, category and summary appear on hover or focus, and stay visible on touch screens.

- `"grid": false` keeps a project in the hero only (e.g. alternative scenes of the same project).
- `gridTitle` overrides `title` on the tile; `url` makes the whole tile a link.
- Projects with `frames` render the `device-scene` molecule; projects without imagery show their tone gradient.
