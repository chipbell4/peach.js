(function() {
  var Peach = function(width, height, palette) {
    this.palette = palette.map(rawColor => {
      var r = (rawColor & 0xff0000) >> 16;
      var g = (rawColor & 0xff00) >> 8;
      var b = rawColor & 0xff;
      return [r, g, b];
    });

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.canvas.style.imageRendering = "pixelated";

    this.context = this.canvas.getContext("2d");
    this.imageData = this.context.getImageData(0, 0, width, height);
    this.sprites = [];
  };

  Peach.prototype.setPixel = function(i, j, paletteIndex) {
    var color = this.palette[paletteIndex];
    var index = (j * this.width + i) * 4;
    this.imageData.data[index] = color[0];
    this.imageData.data[index + 1] = color[1];
    this.imageData.data[index + 2] = color[2];
    this.imageData.data[index + 3] = 255;
  };

  Peach.prototype.render = function() {
    this.imageData = new ImageData(this.width, this.height);

    this.sprites.forEach(sprite => {
      for (var i = 0; i < sprite.bitmap.length; i++) {
        for (var j = 0; j < sprite.bitmap[0].length; j++) {
          var color = sprite.paletteAssignment[sprite.bitmap[i][j]];
          this.setPixel(sprite.x + i, sprite.y + j, color);
        }
      }
    });

    this.context.putImageData(this.imageData, 0, 0);
  };

  Peach.Sprite = function(bitmap, paletteAssignment) {
    this.bitmap = bitmap;
    this.paletteAssignment = paletteAssignment;
    this.x = 0;
    this.y = 0;
    this.width = this.bitmap.length;
    this.height = this.bitmap[0].length;
  };

  Peach.Sprite.prototype.collides = function(s) {
    return (
      this.x < s.x + s.width &&
      this.x + this.width > s.x &&
      this.y < s.y + s.height &&
      this.y + this.height > s.y
    );
  };

  window.Peach = Peach;
})();
