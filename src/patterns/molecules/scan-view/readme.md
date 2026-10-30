# Scan view

The KOCH scanner app seen from inside the camera, on a 16 s timeline. There is no phone frame: the whole slide is the viewfinder.
- Shelves of labelled boxes fill the frame, and everything outside the viewfinder is darkened.
- A laser sweeps until the corners lock onto the barcode label, as the app's `CornerBoundingLayer` does. The frame flashes and the "Gescannter Artikel" sheet slides up: the amount steps up, the commission is set and "Zur Liste hinzufügen" is pressed. The badge on LISTE counts up.
- The camera pans to the next box and scans it as well. The list sheet then shows both articles and is ordered.

Labels, tabs and buttons use the app's German strings and its colours (KOCH interaction blue `#00356E`, red). `logo` is the app's logo, printed on the labels.

Data:
- `logo`, `hint`, `tabs` (five; the second gets the badge), `commission`
- `items` (`name`, `number`, `ean`, `amounts`: the amount steps; two)

The viewfinder sits at `--vx`/`--vy` (68cqw/46cqh, or centred in portrait parents, where the sheets and the top bar are hidden).
