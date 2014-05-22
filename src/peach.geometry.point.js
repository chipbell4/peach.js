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

	return Point;
})();
