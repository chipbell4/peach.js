describe('Peach.Sprites', function() {

	var expectFloatEquals = function(f1, f2) {
		expect(Math.abs(f1 -f2) < 0.001).to.be.ok;
	};

	var expectPointEquals = function(p1, p2) {
		expectFloatEquals(p1.x, p2.x);
		expectFloatEquals(p1.y, p2.y);
	}

	var expectRectangleEquals = function(r1, r2) {
		expectPointEquals(r1.top_left, r2.top_left);
		expectFloatEquals(r1.width, r2.width);
		expectFloatEquals(r1.height, r2.height);
	};

	describe('Sprite', function() {
		it('should exist', function() {
			expect(Peach.Sprites.Sprite).to.be.ok;
		});

		describe('getCrop', function() {
			it('should have a method for getting the cropping rectangle', function() {
				var sprite = new Peach.Sprites.Sprite(
					'spritesheet',
					Peach.Geometry.Point.Origin,
					Peach.Geometry.Point.Origin
				);

				expect(sprite.getCrop).to.be.ok;
			});

			it('should calculate the cropping rectangle correctly', function() {
				var sprite = new Peach.Sprites.Sprite(
					'spritesheet',
					Peach.Geometry.Point.fromCartesian(1, 2),
					Peach.Geometry.Point.fromCartesian(10, 20)
				);

				// try the origin
				var expected = new Peach.Geometry.Rectangle(
					Peach.Geometry.Point.fromCartesian(1, 2),
					Peach.Geometry.Point.fromCartesian(11, 22)
				);
				expectRectangleEquals(sprite.getCrop(), expected);
				
				// try over by X
				var expected = new Peach.Geometry.Rectangle(
					Peach.Geometry.Point.fromCartesian(11, 2),
					Peach.Geometry.Point.fromCartesian(21, 22)
				);
				sprite.current_sprite_coordinates = Peach.Geometry.Point.fromCartesian(1, 0);
				expectRectangleEquals(sprite.getCrop(), expected);

				// try over by Y
				var expected = new Peach.Geometry.Rectangle(
					Peach.Geometry.Point.fromCartesian(1, 22),
					Peach.Geometry.Point.fromCartesian(11, 42)
				);
				sprite.current_sprite_coordinates = Peach.Geometry.Point.fromCartesian(0, 1);
				expectRectangleEquals(sprite.getCrop(), expected);
			});
		});

		it('Should have an update method', function() {
			expect(Peach.Sprites.Sprite.prototype.update).to.be.ok;
		});

		it('Should have a draw method', function() {
			Peach.context = document.createElement('canvas').getContext('2d');

			var sprite = new Peach.Sprites.Sprite(
				'spritesheet',
				Peach.Geometry.Point.fromCartesian(1, 2),
				Peach.Geometry.Point.fromCartesian(10, 20)
			);
			sprite.draw();
		});

	});

	describe('AnimatedSprite', function() {

		it('should exist', function() {
			expect(Peach.Sprites.AnimatedSprite).to.be.ok;
		});

		it('should have an update method', function() {
			expect(Peach.Sprites.AnimatedSprite.prototype.update).to.be.ok;
		});

		describe('updateTime', function() {
			var nextFrameCalled = false;
			var animated_sprite = {
				frame_duration: 0,
				current_animation_time: 0,
				nextFrame: function() {
					nextFrameCalled = true;
				},
			};	

			it('should not call next frame if the new frame time does not push it over', function() {
				animated_sprite.frame_duration = 100;
				Peach.Sprites.AnimatedSprite.prototype.updateTime.call(animated_sprite, 99);

				expect(animated_sprite.current_animation_time).to.equal(99);
				expect(nextFrameCalled).to.not.be.ok;
			});

			it('should call next frame if the new frame pushes it over', function() {
				animated_sprite.frame_duration = 100;
				animated_sprite.current_animation_time = 2;
				Peach.Sprites.AnimatedSprite.prototype.updateTime.call(animated_sprite, 99);

				expect(animated_sprite.current_animation_time).to.equal(1);
				expect(nextFrameCalled).to.be.ok;
			});
		});
	});

});

