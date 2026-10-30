# KMP stack

A KMP starter kit assembling itself on a 16 s timeline:
- A setup command is typed.
- Module blocks drop and stack bottom up: core and libraries, then shared, then the Android and iOS apps.
- The CI lane underneath runs each step (amber) and passes it (green).

Data: `command`, `layers` (`label`, `hue`, `blocks`: `name`, `note`; three, top layer first, up to four blocks each), `ci` (four steps). The parent sets `--kit-w`, `--kit-x` and `--kit-y`.
