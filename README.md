peach.js
========
![Build Status](https://travis-ci.org/chipbell4/peach.js.svg?branch=develop)

A 2D game library for the canvas with TypeScript support.

## Installation

```bash
npm install peach.js
```

## Usage

Import `Peach` and `Sprite` as named exports:

```typescript
import { Peach, Sprite } from 'peach.js';
```

### Creating a Renderer

Create a renderer by instantiating a `Peach` instance:

```typescript
const width = 320;
const height = 240;
const palette = [0xff0000, 0x00ff00, 0x0000ff];
const renderer = new Peach(width, height, palette);

// Append the canvas to your page
document.body.appendChild(renderer.canvas);
```

### Setting Pixels

You can manually set pixels and render them:

```typescript
const x = 20;
const y = 30;
const paletteIndex = 2; // use palette color index 2 (blue in this case)
renderer.setPixel(x, y, paletteIndex);
renderer.render();
```

### Working with Sprites

Create and manage sprites:

```typescript
const bitmap = [
  [0, 1],
  [1, 1]
];

const paletteAssignment = [
  2, // bitmap value 0 → palette color 2 (blue)
  1  // bitmap value 1 → palette color 1 (green)
];

const sprite = new Sprite(bitmap, paletteAssignment);
sprite.x = 20;
sprite.y = 30;
renderer.sprites.push(sprite);
renderer.render();
```

### Collision Detection

Check collisions between sprites:

```typescript
if (sprite1.collides(sprite2)) {
  console.log('Collision detected!');
}
```
