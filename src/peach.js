import Sprite from './sprite.js';

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
  if (color === undefined) {
    return;
  }

  var index = (j * this.width + i) << 2;
  this.imageData.data[index] = color[0];
  this.imageData.data[index + 1] = color[1];
  this.imageData.data[index + 2] = color[2];
  this.imageData.data[index + 3] = 255;
};

Peach.prototype.render = function() {
  this.imageData = new ImageData(this.width, this.height);

  for (var k = 0; k < this.sprites.length; k++) {
    var sprite = this.sprites[k];
    for (var i = 0; i < sprite.bitmap.length; i++) {
      if (sprite.y + i < 0) {
        continue;
      }

      if (sprite.y + i >= this.width) {
        break;
      }

      for (var j = 0; j < sprite.bitmap[0].length; j++) {
        if (sprite.x + j < 0) {
          continue;
        }

        if (sprite.x + j >= this.height) {
          break;
        }

        var color = sprite.paletteAssignment[sprite.bitmap[i][j]];
        this.setPixel(sprite.x + j, sprite.y + i, color);
      }
    }
  }

  this.context.putImageData(this.imageData, 0, 0);
};

Peach.Sprite = Sprite;

export default Peach;
