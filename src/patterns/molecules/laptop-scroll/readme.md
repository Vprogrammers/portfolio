# Laptop scroll

CSS laptop with a browser window: a fixed site header (`header`) and a full-page capture (`feed`) that scrolls underneath it, resting on each section. Optional `backdrop` photo drifts softly behind the device, and `url` is shown in the address bar. Fills its positioned parent; the parent sets `--laptop-w`, `--laptop-max-h`, `--laptop-x` and `--laptop-y`.

The capture sizes and resting points (`$header-h`, `$feed-h`, `$stops`, in pixels of a 1440 px wide capture) are set at the top of the stylesheet; update them when the images change.

The CGIAR images are a 1440 × 900 capture of the public cgiar.org homepage (cookie dialog declined, event banner closed). The header is the first 96 px and the feed is the rest of the page. The backdrop is cropped from the hero photo.
