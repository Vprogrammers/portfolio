# Salon scene

An illustrated salon behind a still Sliike screen:
- a woman in profile under the dryer (a silhouette without facial features), her afro curls each bobbing on their own beat in the airflow;
- loose curls drifting off and air streaming from the dryer;
- a bulb mirror whose bulbs breathe;
- warm light.

The phone in front shows the app's home screen and floats gently. Everything is SVG, HTML and CSS: no photos, no faces. The art is anchored right (`xMaxYMid slice`) so the client stays in view in narrow parents.

Data: `tagline`, `search`, `categories` (`name`, `hue`; five), `salons` (`name`, `rating`, `meta`, `hue`; three). The parent sets `--phone-h`, `--phone-x` and `--phone-y`.
