# Token flow

A design token pipeline on a 16 s timeline:
- A colour token is edited in Figma (Tokens Studio), and the token JSON line flashes with the new value.
- CI validation checks pass: schema, naming, duplicates.
- A packet travels into Style Dictionary, which glows, then fans out to three generated files: Web (CSS variables), iOS (SwiftUI) and Android (Compose).
- Each file's value swaps and the same button recolours on all three platforms, each in its own platform shape.
- A chip shows the PRs opened into the platform branches, then everything resets.

Data:
- `source.label`, `token` (`name`, `path`, `from`, `to`)
- `checks` (three)
- `engine`
- `outputs` (`platform`, `file`, `before`, `from`, `to`, `after`, `button`; three)
- `prs`

The colours `$from`/`$to` in the stylesheet must match `token.from`/`token.to`. The parent sets `--flow-w`, `--flow-h`, `--flow-x` and `--flow-y`.
