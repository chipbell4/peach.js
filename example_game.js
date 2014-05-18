function Ball(minR, maxR, x, y, vx, vy)
{
	this.r = minR;
	this.dR = 20;
	this.minR = minR;
	this.maxR = maxR;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.color = 'red';
	this.acceleration = 200;

	this.alive = true;

	this.draw = function()
	{
		Peach.Primitive.circle(this.x, this.y, this.r, this.color);
	}

	this.update = function()
	{
		var dt = Peach.gameState.frameTime / 1000.0;

		/*
		 * Change the position based on the velocity
		 */
		this.x += dt * this.vx;
		this.y += dt * this.vy;

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
		if(this.x < this.r) {
			this.vx = Math.abs(this.vx);
		}
		if(this.y < this.r) {
			this.vy = Math.abs(this.vy);
		}
		if(this.x > Peach.gameState.width - this.r) {
			this.vx = -Math.abs(this.vx);
		}
		if(this.y > Peach.gameState.height - this.r) {
			this.vy = -Math.abs(this.vy);
		}

		/*
		 * Accelerate towards the bottom
		 */
		this.vy += this.acceleration;

		/*
		 * Prevent the ball from falling through the bottom
		 */
		if(this.y > Peach.gameState.height - this.r && this.vy > 0) {
			this.y = Peach.gameState.height - this.r;
			this.vy = 0;
			this.acceleration = 0;
		}

		/*
		 * Listen for mouse events to increase the 
		 */
		if(Peach.Input.state.mouseIsDown) {
			this.y = (Peach.gameState.height - this.r) >= this.y ? Peach.gameState.height - this.r - 1 : this.y;
			this.vy -= 400;
			this.acceleration = 200;
		}
	}
}
