peach.js
========
![Build Status](https://travis-ci.org/chipbell4/peach.js.svg?branch=develop)

## Usage
Create a render by instantiating a `Peach` instance:

```javascript
var width = 320;
var height = 240;
var palette = [0xff0000, 0x00ff00, 0x0000ff];
var renderer = new Peach(width, height, palette);
```

From there, you can manually set pixels and render them:

```javascript
var x = 20;
var y = 30;
var paletteIndex = 2; // use the index 2 palette color, blue in this case
renderer.setPixel(x, y, paletteIndex);
renderer.render();
```

Or, you can create a sprite:

```javascript
var bitmap = [
  [0, 1],
  [1, 1]
];

var paletteAssignment = {
    0: 2, // bitmap value 0 is assigned to palette color 2 (blue)
    1: 1 // bitmpa value 1 is assigned to palette color 1 (green)
};
var sprite = new Peach.Sprite(bitmap, paletteAssignment);
sprite.x = 20;
sprite.y = 30;
renderer.sprites.push(sprite);
renderer.render();
```
