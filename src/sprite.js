export default class Sprite {
  constructor(bitmap, paletteAssignment) {
    this.bitmap = bitmap;
    this.paletteAssignment = paletteAssignment;
    this.x = 0;
    this.y = 0;
  }

  get width() {
    return this.bitmap[0].length;
  }

  get height() {
    return this.bitmap.length;
  }

  collides(s) {
    return (
      this.x < s.x + s.width &&
        this.x + this.width > s.x &&
        this.y < s.y + s.height &&
        this.y + this.height > s.y
    );
  }
}
