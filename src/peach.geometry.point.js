Peach.Geometry.Point = (function() {
	/**
	 * The Point class. Represents a 2D point, with the normal operations
	 */
	var Point = function() { };

	/**
	 * Creates a point from cartesian
	 */
	Point.fromCartesian = function(x, y) {
		var p = new Point();
		p.x = x;
		p.y = y;
		return p;
	};

	/**
	 * Creates a point from polar coordinates
	 */
	Point.fromPolar = function(r, theta) {
		var p = new Point();
		p.x = r * Math.cos(theta);
		p.y = r * Math.sin(theta);
		return p;
	};

	/**
	 * Calculates the dot product of two vectors
	 */
	Point.prototype.dot = function(other_point) {
		return this.x * other_point.x + this.y * other_point.y;
	};

	/**
	 * Calculates the magnitude of a vector
	 */
	Point.prototype.magnitude = function() {
		return Math.sqrt( this.dot(this) );
	};

	/**
	 * Negates a vector
	 */
	Point.prototype.negate = function() {
		return Point.fromCartesian(-this.x, -this.y);
	};

	/**
	 * Adds two vectors
	 */
	Point.prototype.add = function(other) {
		return Point.fromCartesian(this.x + other.x, this.y + other.y);
	};

	/**
	 * Scales a vector
	 */
	Point.prototype.scale = function(scale_factor) {
		return Point.fromCartesian(this.x * scale_factor, this.y * scale_factor);
	};

	/**
	 * Rotates a vector
	 */
	Point.prototype.rotate = function(angle) {
		var new_x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
		var new_y = Math.sin(angle) * this.x + Math.sin(angle) * this.y;

		return Point.fromCartesian(new_x, new_y);
	};

	/**
	 * Expands the point to create a rectangle
	 */
	Point.prototype.expandToRectangle = function(width, height) {
		var expansion = Point.fromCartesian(width, height);
		return new Peach.Geometry.Rectangle(
			this,
			this.add(expansion)
		);
	};

	return Point;
})();
