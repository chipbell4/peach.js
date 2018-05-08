Peach.Geometry.Rectangle = (function() {
	/**
	 * Creates a new Rectangle, with the specified corners
	 */
	var Rectangle = function(corner1, corner2) { 

		var min_x = Math.min(corner1.x, corner2.x);
		var min_y = Math.min(corner1.y, corner2.y);
		var max_x = Math.max(corner1.x, corner2.x);
		var max_y = Math.max(corner1.y, corner2.y);

		// set the corner fields
		this.top_left = Peach.Geometry.Point.fromCartesian(min_x, min_y);
		this.top_right = Peach.Geometry.Point.fromCartesian(max_x, min_y);
		this.bottom_left = Peach.Geometry.Point.fromCartesian(min_x, max_y);
		this.bottom_right = Peach.Geometry.Point.fromCartesian(max_x, max_y);

		// set the width and height fields
		this.width = max_x - min_x;
		this.height = max_y - min_y;
	};

	/**
	 * Simple clipping for the rectangle (scissoring)
	 */
	Rectangle.prototype.contains = function(point) {
		return ! (this.toRightOf(point) || this.toLeftOf(point) || this.above(point) || this.below(point));
	};
	
	/**
	 * Returns true if rectangle is to the right of a point
	 */
	Rectangle.prototype.toRightOf = function(point) {
		return this.top_left.x > point.x;
	};

	/**
	 * Returns true if the rectangle is to the left of the provided point
	 */
	Rectangle.prototype.toLeftOf = function(point) {
		return this.top_right.x < point.x;
	};

	/**
	 * Returns true if the rectangle is above the point
	 */
	Rectangle.prototype.above = function(point) {
		return this.bottom_right.y < point.y;
	};

	/**
	 * Returns true if the rectangle is below the point
	 */
	Rectangle.prototype.below = function(point) {
		return this.top_right.y > point.y;
	};

	/**
	 * Returns the rectangle translated to a new location
	 */
	Rectangle.prototype.translate = function(direction) {
		var top_left = this.top_left.add(direction);
		var bottom_right = this.bottom_right.add(direction);
		return new Rectangle(top_left, bottom_right);
	};

	return Rectangle;
})();
