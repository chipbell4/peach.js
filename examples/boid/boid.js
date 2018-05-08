
var _current_boid_id = 0;

var Boid = function() {

	// create in a random location
	var x_rand = Math.random() * Peach.gameState.width;
	var y_rand = Math.random() * Peach.gameState.height;
	this.position = Peach.Geometry.Point.fromCartesian(x_rand, y_rand);
	this.id = _current_boid_id++;

	// How much does this boid cling to the flock?
	this.flock_clinginess = 0.75;
	// How far can the boid see?
	this.vision = 200;

	// get a random location
	this.velocity = Peach.Geometry.Point.fromPolar(90, Math.random() * 2 * Math.PI);

	// mark it as alive
	this.alive = true;
};

Boid.prototype.draw = function() {
	var perturb = this.position.add( Peach.Geometry.Point.fromCartesian(1, 1));
	Peach.Primitive.line(this.position, perturb, '#000');
};

Boid.prototype.flockVector = function() {
	// Calculate the center point of NEIGHBORING flock members
	var flock_center = Peach.Geometry.Point.fromCartesian(0,0);
	var flock_size = Peach.entities.length;
	var neighbor_count = 0;
	for(var i = 0; i < flock_size; i++) {
		// If the neighbor is close by, let me adjust to his position
		if(Peach.entities[i].position.add(this.position.negate()).magnitude() < this.vision) {
			flock_center = flock_center.add(Peach.entities[i].position);
			neighbor_count++;
		}
	}
	flock_center = flock_center.scale(1.0 / neighbor_count);
	
	// calculate a vector to the center
	var flock_center_direction = flock_center.add(this.position.negate());
	var magnitude = flock_center_direction.magnitude();
	if(magnitude < 0.001) {
		return Peach.Geometry.Point.fromCartesian(0, 0);
	}
	flock_center_direction = flock_center_direction.scale(1.0 / magnitude);
	return flock_center_direction;
};

Boid.prototype.wrapToBox = function() {
	if(Peach.gameState.rectangle.toRightOf(this.position)) {
		this.position.x += Peach.gameState.width;
	}
	if(Peach.gameState.rectangle.toLeftOf(this.position)) {
		this.position.x -= Peach.gameState.width;
	}
	if(Peach.gameState.rectangle.below(this.position)) {
		this.position.y += Peach.gameState.height;
	}
	if(Peach.gameState.rectangle.above(this.position)) {
		this.position.y -= Peach.gameState.height;
	}
};

Boid.prototype.update = function() {

	// adjust velocity to be center of flock
	this.velocity = this.flockVector().scale(this.flock_clinginess).add(
			this.velocity.scale(1 - this.flock_clinginess)
	);

	// normalize
	this.velocity = this.velocity.scale(90.0 / this.velocity.magnitude());

	// update the position
	var dt = Peach.gameState.frameTime / 1000.0;
	this.position = this.position.add(this.velocity.scale(dt));

	// wrap to the box
	this.wrapToBox();

}
