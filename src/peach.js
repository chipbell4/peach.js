import Sprite from './sprite.js';

const Peach = function(width, height, palette) {
  this.palette = palette.map((rawColor) => {
    const r = (rawColor & 0xff0000) >> 16;
    const g = (rawColor & 0xff00) >> 8;
    const b = rawColor & 0xff;
    return [ r, g, b ];
  });

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width = width;
  this.canvas.height = this.height = height;
  this.canvas.style.imageRendering = 'pixelated';

  this.context = this.canvas.getContext('2d');
  this.imageData = this.context.getImageData(0, 0, width, height);
  this.sprites = [];
};

Peach.prototype.setPixel = function(i, j, paletteIndex) {
  const color = this.palette[paletteIndex];
  if (color === undefined) {
    return;
  }

  const index = (j * this.width + i) << 2;
  this.imageData.data[index] = color[0];
  this.imageData.data[index + 1] = color[1];
  this.imageData.data[index + 2] = color[2];
  this.imageData.data[index + 3] = 255;
};

Peach.prototype.render = function() {
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

        const color = sprite.paletteAssignment[sprite.bitmap[i][j]];
        this.setPixel(sprite.x + j, sprite.y + i, color);
      }
    }
  }

  this.context.putImageData(this.imageData, 0, 0);
};

Peach.Sprite = Sprite;

export default Peach;
