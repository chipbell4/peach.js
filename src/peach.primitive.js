/**
 * A set of handy primitive drawing methods
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
		polygon: function(points, color) {
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

		/**
		 * Draws an image given by the provided url and point/rectangle. If the
		 * provided value is a point, no scaling occurs. If it is a rectangle, the
		 * image is scaled to fit that rectangle
		 */
		image: function(url, value) {
			var image = new Image();
			// defer drawing, until the image is loaded
			image.onload = function() {

				if(value instanceof Peach.Geometry.Point) {
					Peach.context.drawImage(
						image, 
						value.x,
						value.y
					);
				}
				else {
					Peach.context.drawImage(
						image, 
						value.top_left.x,
						value.top_left.y,
						value.bottom_right.x,
						value.bottom_right.y
					);
				}
			};
			image.src = url;
		},
	};
})();
