Peach.Geometry = (function() {

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
	}

	return {
		Point: Point,
	};

})();
