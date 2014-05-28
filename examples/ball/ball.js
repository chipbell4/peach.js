function Ball(initial_position, initial_velocity)
{
	this.r = 20;
	this.position = initial_position;
	this.velocity = initial_velocity;
	this.color = 'red';
	this.acceleration = Peach.Geometry.Point.fromCartesian(0, 200);

	this.alive = true;

	this.draw = function()
	{
		Peach.Primitive.circle(this.position, this.r, this.color);
	}

	this.update = function()
	{
		var dt = Peach.gameState.frameTime / 1000.0;

		/*
		 * Change the position based on the velocity
		 */
		this.position = this.position.add(this.velocity.scale(dt));

		/*
		 * Allow Keyboard input to change the colors
		 */
		if(Peach.Input.state.keys.r)
			this.color = 'red';
		if(Peach.Input.state.keys.b)
			this.color = 'blue';
		if(Peach.Input.state.keys.g)
			this.color = 'green';

		/*
		 * Bounce off of walls
		 */
		if(this.position.x < this.r) {
			this.velocity.x = Math.abs(this.velocity.x);
		}
		if(this.position.y < this.r) {
			this.velocity.y = Math.abs(this.velocity.y);
		}
		if(this.position.x > Peach.gameState.width - this.r) {
			this.velocity.x = -Math.abs(this.velocity.x);
		}
		if(this.position.y > Peach.gameState.height - this.r) {
			this.velocity.y = -Math.abs(this.velocity.y);

			// clamp the velocity to prevent falling through the floor
			if(Math.abs(this.velocity.y) < this.acceleration.y) {
				this.velocity.y = this.velocity.add(this.acceleration);
			}
		}

		/*
		 * Accelerate towards the bottom
		 */
		this.velocity = this.velocity.add(this.acceleration);
		
		/*
		 * Listen for mouse events to increase the upward velocity
		 */
		if(Peach.Input.state.mouseIsDown) {
			this.velocity = this.velocity.add(this.acceleration.scale(1.2).negate());
		}
	}
}
