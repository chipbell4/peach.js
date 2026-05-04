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

### Managing Sprites

Use helper methods to find and remove sprites:

```typescript
// Find the first sprite with a given constructor name
const player = renderer.findSprite('Player');

// Find all sprites of a type
const enemies = renderer.findSprites('Enemy');

// Remove a sprite from the renderer
renderer.despawn(enemy);
```

## Advanced Features

### Event Emitter

`EventEmitter` is a base class for creating custom event-driven classes:

```typescript
import { EventEmitter } from 'peach.js';

class Player extends EventEmitter {
  constructor() {
    super();
  }

  takeDamage(amount: number) {
    this.trigger('damage', { amount });
  }
}

const player = new Player();

// Listen for events
player.addEventListener('damage', (data) => {
  console.log(`Player took ${data.amount} damage!`);
});

player.takeDamage(10);

// Remove listeners
player.removeEventListener('damage', callback);
```

### Sprite Animation

Animate sprite frames with the `Animator` class:

```typescript
import { Animator, Sprite } from 'peach.js';

// Define animation frames (each frame is a bitmap)
const walkFrames = [
  [[0, 1], [1, 1]],  // Frame 1
  [[1, 0], [1, 1]],  // Frame 2
  [[0, 1], [1, 1]]   // Frame 3
];

const paletteAssignment = [2, 1];
const sprite = new Sprite(walkFrames[0], paletteAssignment);

// Create an animator
const animator = new Animator({
  sprite: sprite,
  bitmaps: walkFrames,
  fps: 6,           // 6 frames per second
  loop: true        // Loop the animation
});

// Listen for animation events
animator.addEventListener('animation:complete', (anim) => {
  console.log('Animation finished!');
});

animator.addEventListener('animation:stopped', (anim) => {
  console.log('Animation stopped!');
});

// Start the animation
animator.start();

// In your game loop, update the animator
function gameLoop() {
  const deltaTime = 1 / 60; // 60 FPS
  animator.update(deltaTime);
  renderer.render();
  requestAnimationFrame(gameLoop);
}

// Stop the animation
animator.stop();
```

#### Animator Options

- `sprite` (Sprite): The sprite to animate
- `bitmaps` (number[][][]): Array of bitmap frames
- `fps` (number, optional): Frames per second (default: 3)
- `loop` (boolean, optional): Whether to loop the animation (default: false)

#### Animator Events

- `'animation:complete'` - Triggered when animation finishes (non-looping only)
- `'animation:stopped'` - Triggered when animation is manually stopped
