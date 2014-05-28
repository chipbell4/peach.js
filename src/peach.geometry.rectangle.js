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
		return this.top_left.x <= point.x && point.x <= this.top_right.x && this.top_left.y <= point.y && point.y <= this.bottom_left.y;
	};

	return Rectangle;
})();
