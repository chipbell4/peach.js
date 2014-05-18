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

	this.alive = true;

	this.draw = function()
	{
		Peach.Primitive.circle(this.x, this.y, this.r, this.color);
	}

	this.update = function()
	{
		var dt = Peach.gameState.frameTime / 1000.0;
		this.x += dt * this.vx;
		this.y += dt * this.vy;
		if(Peach.Input.state.keys.r)
			this.color = 'red';
		if(Peach.Input.state.keys.b)
			this.color = 'blue';
		if(Peach.Input.state.keys.g)
			this.color = 'green';

		if(this.x < 0) {
			this.vx = Math.abs(this.vx);
		}
		if(this.y < 0) {
			this.vy = Math.abs(this.vy);
		}
		if(this.x > Peach.gameState.width) {
			this.vx = -Math.abs(this.vx);
		}
		if(this.y > Peach.gameState.height) {
			this.vy = -Math.abs(this.vy);
		}
	}
}
