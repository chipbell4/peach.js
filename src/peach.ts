import { Sprite } from './sprite.js';

/**
 * Peach - A 2D game library for the canvas
 */
interface PeachOptions {
  width: number;
  height: number;
  palette: number[];
}

type PaletteEntry = [number, number, number];
type PaletteArray = PaletteEntry[];

export class Peach {
  palette: PaletteArray;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  imageData: ImageData;
  sprites: Sprite[];

  constructor(width: number, height: number, palette: number[]) {
    this.palette = palette.map((rawColor) => {
      const r = (rawColor & 0xff0000) >> 16;
      const g = (rawColor & 0xff00) >> 8;
      const b = rawColor & 0xff;
      return [r, g, b];
    });

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.canvas.style.cssText =
      'image-rendering: -moz-crisp-edges; image-rendering: pixelated';

    this.context = this.canvas.getContext('2d')!;
    this.imageData = this.context.getImageData(0, 0, width, height);
    this.sprites = [];
  }

  /**
   * Set a pixel in the canvas
   * @param i X coordinate
   * @param j Y coordinate
   * @param paletteIndex Index into the palette
   */
  setPixel(i: number, j: number, paletteIndex: number): void {
    const color = this.palette[paletteIndex];
    if (color === undefined) {
      return;
    }

    const index = ((j * this.width) + i) << 2;
    this.imageData.data[index] = color[0];
    this.imageData.data[index + 1] = color[1];
    this.imageData.data[index + 2] = color[2];
    this.imageData.data[index + 3] = 255;
  }

  /**
   * Render all sprites to the canvas
   */
  render(): void {
    this.imageData.data.fill(0);

    for (let k = 0; k < this.sprites.length; k++) {
      const sprite = this.sprites[k];
      for (let i = 0; i < sprite.bitmap.length; i++) {
        if (sprite.y + i < 0) {
          continue;
        }

        if (sprite.y + i >= this.width) {
          break;
        }

        for (let j = 0; j < sprite.bitmap[0].length; j++) {
          if (sprite.x + j < 0) {
            continue;
          }

          if (sprite.x + j >= this.height) {
            break;
          }

          var pixel = sprite.bitmap[i][j];
          if (pixel !== null) {
            const color = sprite.paletteAssignment[pixel];
            this.setPixel(sprite.x + j, sprite.y + i, color);
          }
        }
      }
    }

    this.context.putImageData(this.imageData, 0, 0);
  }

  /**
   * Find the first sprite with the given constructor name
   * @param name The constructor name to search for
   * @returns The sprite if found, undefined otherwise
   */
  findSprite(name: string): Sprite | undefined {
    return this.sprites.find((s) => s.constructor.name === name);
  }

  /**
   * Find all sprites with the given constructor name
   * @param name The constructor name to search for
   * @returns Array of matching sprites
   */
  findSprites(name: string): Sprite[] {
    return this.sprites.filter((s) => s.constructor.name === name);
  }

  /**
   * Remove a sprite from the renderer
   * @param sprite The sprite to remove
   */
  despawn(sprite: Sprite): void {
    const index = this.sprites.indexOf(sprite);
    if (index > -1) {
      this.sprites.splice(index, 1);
    }
  }
}
