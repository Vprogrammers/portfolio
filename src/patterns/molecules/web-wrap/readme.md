# Web wrap

An iPhone wrapper app that runs a luxury shop in a WKWebView, next to Xcode's console logging every URL it loads. One 18 s timeline:
- the wrapper's splash;
- sign in (email and password typed in);
- a product page whose image flickers while it loads, the AVIF issue found in the PoC;
- add to bag;
- checkout on the site's other platform, with the delivery, payment and place-order steps;
- the order confirmation.

A gold loading bar runs under the site header on every navigation, and the console prints a line per step.

The shop is drawn in HTML and CSS, and the watch is an SVG drawing, not a real model.

Data:
- `brand`, `since`
- `login.email`
- `product` (`collection`, `name`, `price`)
- `checkout` (`address`, `card`, `order`)
- `console.title`
- `console.lines` (`text`, `kind`: `url` by default, `ok` or `warn`; ten lines, timed in the stylesheet)

The parent sets `--phone-h`, `--phone-x` and `--phone-y`.
