/**
 * A set of handy primitive drawing methods
 * TODO: Expand these a little
 */
Peach.Primitive = (function(){
	return {

		/**
		 * Clears the entire game screen
		 */
		clear: function(){
			Peach.context.clearRect(0, 0, 
				Peach.gameState.width, Peach.gameState.height);
		},

		/**
		 * Draws a line from a point to another point
		 */
		line: function(point1, point2, color) {
			Peach.context.strokeStyle = color;
			Peach.context.beginPath();
			Peach.context.moveTo(point1.x, point1.y);
			Peach.context.lineTo(point2.x, point2.y);
			Peach.context.closePath();
			Peach.context.stroke();
		},

		/**
		 * Draws a path sequentially from each of the points passed
		 */
		path: function(points, color) {
			var N = points.length;

			if(N === 0) {
				return;
			}

			for(var i = 0; i < N - 1; i++) {
				Peach.Primitive.line(points[i], points[i+1], color);
			}

		},

		/**
		 * Draws the provided rectangle with the specified color
		 */
		rect: function(rectangle, color){
			Peach.context.fillStyle = color;
			Peach.context.fillRect(rectangle.top_left.x, rectangle.top_left.y, rectangle.width, rectangle.height);
		},

		/**
		 * Draws a circle with center (x,y) and radius r with color.
		 */
		circle: function(center, radius, color){
			Peach.context.fillStyle = color;
			Peach.context.beginPath();
			Peach.context.arc(center.x - radius, center.y - radius, radius, 0, Math.PI*2, true);
			Peach.context.closePath();
			Peach.context.fill();
		},
	};
})();
