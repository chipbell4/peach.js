Peach.Sprites = (function() {
	var Sprite = function(sprite_sheet, sprite_sheet_origin, sprite_size) {
		// Go ahead and download the sprite sheet
		this.sprite_image = new Image;
		this.sprite_image.src = sprite_sheet;
		
		// Copy over the other variables
		this.sprite_sheet_origin = sprite_sheet_origin;
		this.sprite_size = sprite_size;

		// set the current sprite coordinates
		this.current_sprite_coordinates = Peach.Geometry.Point.Origin;
	};

	Sprite.prototype.getCrop = function() {
		var sprite_offset = this.current_sprite_coordinates.scale(this.sprite_size);

		var top_left = this.sprite_sheet_origin.add(sprite_offset);
		var bottom_right = top_left.add(this.sprite_size);

		return new Peach.Geometry.Rectangle(top_left, bottom_right);
	};

	return {
		Sprite: Sprite
	};
})();
