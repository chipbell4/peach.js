Peach.Sprites = (function() {
	var Sprite = function(sprite_sheet, sprite_sheet_origin, sprite_size) {
		// Go ahead and download the sprite sheet
		this.sprite_image = new Image();
		this.sprite_image.src = sprite_sheet;
		
		// Copy over the other variables
		this.sprite_sheet_origin = sprite_sheet_origin;
		this.sprite_size = sprite_size;

		// set the current sprite coordinates
		this.current_sprite_coordinates = Peach.Geometry.Point.Origin;

		// set the draw position+size
		this.draw_position = Peach.Geometry.Point.Origin;
		this.draw_size = Peach.Geometry.Point.fromCartesian(20, 20);
	};

	Sprite.prototype.getCrop = function() {
		var sprite_offset = this.current_sprite_coordinates.scale(this.sprite_size);

		var top_left = this.sprite_sheet_origin.add(sprite_offset);
		var bottom_right = top_left.add(this.sprite_size);

		return new Peach.Geometry.Rectangle(top_left, bottom_right);
	};

	Sprite.prototype.update = function() { };

	Sprite.prototype.draw = function() {
		var crop = this.getCrop();

		Peach.context.drawImage(
			this.sprite_image, 
			crop.top_left.x,
			crop.top_left.y,
			this.sprite_size.x,
			this.sprite_size.y,
			this.draw_position.x,
			this.draw_position.y,
			this.draw_size.x,
			this.draw_size.y
		);
	};

	return {
		Sprite: Sprite
	};
})();
