function Ball(initial_position, initial_velocity)
{
	this.r = 20;
	this.position = initial_position;
	this.velocity = initial_velocity;
	this.color = 'red';
	this.acceleration = Peach.Geometry.Point.fromCartesian(0, 200);

	this.alive = true;

	var that = this;

	// Function to allow color changes
	var changeColor = function() {
		/*
		 * Allow Keyboard input to change the colors
		 */
		if(Peach.Input.state.keys.r)
			this.color = 'red';
		if(Peach.Input.state.keys.b)
			this.color = 'blue';
		if(Peach.Input.state.keys.g)
			this.color = 'green';
	};

	// Function to handle bouncing
	var bounceOffWalls = function() {

		var did_bounce = false;

		if(this.position.x < this.r) {
			this.velocity.x = Math.abs(this.velocity.x);
			did_bounce = true;
		}
		if(this.position.y < this.r) {
			this.velocity.y = Math.abs(this.velocity.y);
			did_bounce = true;
		}
		if(this.position.x > Peach.gameState.width - this.r) {
			this.velocity.x = -Math.abs(this.velocity.x);
			did_bounce = true;
		}
		if(this.position.y > Peach.gameState.height - this.r) {
			this.velocity.y = -Math.abs(this.velocity.y);
			did_bounce = true;

			// clamp the velocity to prevent falling through the floor
			if(Math.abs(this.velocity.y) < this.acceleration.y) {
				this.velocity.y = this.velocity.add(this.acceleration);
			}
		}

		// reduce velocity if we bounced off the wall
		if(did_bounce) {
			this.velocity = this.velocity.scale(0.9);
		}
	};

	// Handles mouse clicks to provide acceleration
	var handleMouseClicks = function() {
		if(Peach.Input.state.mouseIsDown) {
			this.velocity = this.velocity.add(this.acceleration.scale(1.2).negate());
		}
	};

	this.draw = function()
	{
		Peach.Primitive.circle(this.position, this.r, this.color);
	};

	this.update = function()
	{
		var dt = Peach.gameState.frameTime / 1000.0;

		// Inertia
		this.position = this.position.add(this.velocity.scale(dt));

		// Gravity
		this.velocity = this.velocity.add(this.acceleration);

		// change the color based on keyboard presses
		changeColor.call(this);

		// Collision detection
		bounceOffWalls.call(this);

		// Allow mouse clicks to add upward velocity
		handleMouseClicks.call(this);
	};
}
