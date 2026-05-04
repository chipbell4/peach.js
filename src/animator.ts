import { EventEmitter } from './event-emitter.js';
import { Sprite, Bitmap } from './sprite.js';

export type { Bitmap } from './sprite.js';

export interface AnimatorOptions {
  sprite: Sprite;
  bitmaps: Bitmap[];
  fps?: number;
  loop?: boolean;
}

/**
 * Animator - Animates sprite bitmaps
 */
export class Animator extends EventEmitter {
  sprite: Sprite;
  bitmaps: Bitmap[];
  fps: number;
  loop: boolean;
  started: boolean;
  currentAnimationFrame: number;
  timeTillNextFrame: number;

  constructor(options: AnimatorOptions) {
    super();
    this.sprite = options.sprite;
    this.bitmaps = options.bitmaps;
    this.fps = options.fps || 3;
    this.loop = options.loop || false;
    this.started = false;
    this.currentAnimationFrame = 0;
    this.timeTillNextFrame = 1 / this.fps;
  }

  /**
   * Start the animation
   */
  start(): void {
    this.started = true;
    this.currentAnimationFrame = 0;
    this.timeTillNextFrame = 1 / this.fps;
  }

  /**
   * Stop the animation and trigger the 'animation:stopped' event
   */
  stop(): void {
    this.started = false;
    this.trigger('animation:stopped', this);
  }

  /**
   * Update the animation - call this in your game loop
   */
  update(deltaTime: number = 1 / 60): void {
    if (!this.started) {
      return;
    }

    this.timeTillNextFrame -= deltaTime;

    if (this.timeTillNextFrame <= 0) {
      this.currentAnimationFrame++;
      this.timeTillNextFrame = 1 / this.fps;

      if (this.currentAnimationFrame >= this.bitmaps.length) {
        this.currentAnimationFrame = 0;

        if (!this.loop) {
          this.started = false;
          this.trigger('animation:complete', this);
          return;
        }
      }

      this.sprite.bitmap = this.bitmaps[this.currentAnimationFrame];
    }
  }
}
