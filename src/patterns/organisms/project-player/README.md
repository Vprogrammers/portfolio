# Homepage project backgrounds

The project player reads its slides from `_data/homepage.json`.

Upload licensed, publication-approved photographs to:

- `src/shared/assets/img/projects/hansgrohe/hero.webp`
- `src/shared/assets/img/projects/migros/hero.webp`
- `src/shared/assets/img/projects/cgiar/hero.webp`
- `src/shared/assets/img/projects/a11yotp/hero.webp`

After uploading each file, add its `image` property to the corresponding JSON project:

```json
"image": "/assets/img/projects/hansgrohe/hero.webp"
```

Nitro's existing image asset copy step publishes these files under `/assets/img/`. Until an image is specified, each slide uses its existing tone-based gradient background. Do not set `image` before the asset exists, because it would create a broken request.

The image is decorative (`alt=""`); the project name, category, and summary are available as real HTML text. The CSS provides dark translucent overlays for readability. Check contrast and crops on real images before shipping.
