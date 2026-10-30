# Swipe deck

A deck of product cards swiped across the slide, on a 16 s timeline:
- The top card is dragged right with a LIKE stamp (into the bag, whose counter goes up) or left with NOPE.
- The heart or cross button below answers each swipe, and the cards behind rise one place each time.
- After the last swipe the bill comes up with the liked products and Checkout, then the deck resets.

Products are SVG silhouettes (`sneaker`, `boot`, `heel`, `bag`) on a tinted backdrop. No photos are used.

Data:
- `bag` (label)
- `products` (`name`, `price`, `shape`, `hue`, `sizes`, `like`; four, top first; the swipe directions in the stylesheet must match `like`)
- `bill` (`title`, `total`)

The parent sets `--deck-h`, `--deck-x` and `--deck-y`.
