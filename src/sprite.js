var Sprite = function(bitmap, paletteAssignment) {
  this.bitmap = bitmap;
  this.paletteAssignment = paletteAssignment;
  this.x = 0;
  this.y = 0;
  this.width = this.bitmap.length;
  this.height = this.bitmap[0].length;
};

Sprite.prototype.collides = function(s) {
  return (
    this.x < s.x + s.width &&
    this.x + this.width > s.x &&
    this.y < s.y + s.height &&
    this.y + this.height > s.y
  );
};

export default Sprite;
