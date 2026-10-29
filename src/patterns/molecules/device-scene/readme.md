# Device scene

Device artwork with rotating screenshots pinned to its screen. It fills its positioned parent (`container: device-scene / size`) and covers it without cropping the device.

Data: `variant`, `image`, optional `imageWide`, `frames` (up to four screenshots), optional `foreground` (cut-out of objects in front of the screen) and `priority`.

To add an artwork, measure the screen corners in image pixels and add a rule:

```scss
.m-device-scene[data-scene='my-variant'] .m-device-scene__box {
	@include device-scene($art-w, $art-h, ((tl-x tl-y), (tr-x tr-y), (br-x br-y), (bl-x bl-y)), $device-width-fraction, $radius);
}
```
