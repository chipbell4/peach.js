/**
 * Sprite class for managing bitmap-based sprites with palette assignment
 */
export type Bitmap = (number | null)[][];

export class Sprite {
  bitmap: Bitmap;
  paletteAssignment: number[];
  x: number;
  y: number;

  constructor(bitmap: Bitmap, paletteAssignment: number[]) {
    this.bitmap = bitmap;
    this.paletteAssignment = paletteAssignment;
    this.x = 0;
    this.y = 0;
  }

  get width(): number {
    return this.bitmap[0].length;
  }

  get height(): number {
    return this.bitmap.length;
  }

  /**
   * Check if this sprite collides with another sprite
   * @param s The sprite to check collision with
   * @returns true if sprites collide, false otherwise
   */
  collides(s: Sprite): boolean {
    return (
      this.x < s.x + s.width &&
      this.x + this.width > s.x &&
      this.y < s.y + s.height &&
      this.y + this.height > s.y
    );
  }
}
