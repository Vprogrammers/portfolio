# Code review

A code review in progress, on a 16 s timeline. An Objective-C editor sits on the right of the slide. Review comments pop in one by one beside it, each with its severity (critical, major, minor, info). The lines a comment points at flare up in its colour and then keep a soft tint. A summary closes the thread, and the editor drifts slowly.

The code is an illustration written in the project's style, using the same libraries and calls the review found. It is not client source. Each code line carries the number of the finding that points at it.

Data:
- `file`, `reviewer` (initials)
- `findings` (`severity`, `title`, `body`; six, in the order the code lines expect: networking, reactive, crash reporting, debug tools, alerts, tests)
- `summary`

In portrait parents the editor takes the width and the thread is hidden.
