(function() {
  window.ArcadeRenderer = function(width, height, palette) {
    this.palette = palette.map(rawColor => {
      var r = (rawColor & 0xff0000) >> 16;
      var g = (rawColor & 0xff00) >> 8;
      var b = (rawColor & 0xff);
      return [r, g, b];
    });

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.canvas.style.imageRendering = 'pixelated';

    this.context = this.canvas.getContext('2d');
    this.imageData = this.context.getImageData(0, 0, width, height);
  };

  window.ArcadeRenderer.prototype.setPixel = function(i, j, paletteIndex) {
    var color = this.palette[paletteIndex];
    var index = (j * this.width + i) * 4;
    this.imageData.data[index] = color[0];
    this.imageData.data[index + 1] = color[1];
    this.imageData.data[index + 2] = color[2];
    this.imageData.data[index + 3] = 255;
  };

  window.ArcadeRenderer.prototype.render = function() {
    this.context.putImageData(this.imageData, 0, 0);
  };
})();
