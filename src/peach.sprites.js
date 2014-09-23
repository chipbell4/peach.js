Peach.Sprites = (function() {
	/**
	 * The sprite class. Represents a sprite-sheeted image, with a moveable "window"
	 * for only showing a particular slot of the image.
	 */
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

	/**
	 * Returns a rectangle giving the current pixels shown through the sprite sheet
	 */
	Sprite.prototype.getCrop = function() {
		var sprite_offset = this.current_sprite_coordinates.scale(this.sprite_size);

		var top_left = this.sprite_sheet_origin.add(sprite_offset);
		var bottom_right = top_left.add(this.sprite_size);

		return new Peach.Geometry.Rectangle(top_left, bottom_right);
	};

	Sprite.prototype.update = function() { };

	/**
	 * Draws the image onto the canvas 
	 */
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

	var AnimatedSprite = function() {
		// Call the superclass
		Sprite.apply(this, arguments);

		// setup the animation
		this.current_animation_frame = 0;
		this.current_animation = arguments[3] || [ Peach.Geometry.Point.Origin ];
		this.frame_duration = arguments[4];
		this.current_animation_time = 0;
	};

	AnimatedSprite.prototype.clampFrame = function() {
		this.current_animation_frame = this.current_animation_frame % this.current_animation.length;
	};

	AnimatedSprite.prototype.nextFrame = function() {
		this.current_animation_frame ++;
		this.clampFrame();
	};

	AnimatedSprite.prototype.updateTime = function(frame_time) {
		this.current_animation_time += frame_time;

		// if it was pushed over, rewind and move to next frame
		if(this.current_animation_time > this.frame_duration) {
			this.current_animation_time -= this.frame_duration;
			this.nextFrame();
		}
	};

	AnimatedSprite.prototype.update = function() {
		this.updateTime(Peach.gameState.frameTime);

		// set the current sprite coordinates to point the current animation
		this.clampFrame();
		this.current_sprite_coordinates = this.current_animation[this.current_animation_frame];
	};

	AnimatedSprite.prototype.draw = function() {
		Sprite.prototype.draw.apply(this, arguments);
	};

	return {
		Sprite: Sprite,
		AnimatedSprite: AnimatedSprite
	};
})();
