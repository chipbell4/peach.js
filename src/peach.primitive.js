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
		 * Draws the provided rectangle with the specified color
		 */
		rect: function(rectangle, color){
			Peach.context.fillStyle = color;
			Peach.context.fillRect(rectangle.top_left.x, rectangle.top_left.y, rectangle.width, rectangle.height);
		},

		/**
		 * Draws a circle with corner (x,y) and radius r with color.
		 * TODO: Make this CENTERED at (x,y)
		 */
		circle: function(point, r, color){
			Peach.context.fillStyle = color;
			Peach.context.beginPath();
			Peach.context.arc(point.x, point.y, r, 0, Math.PI*2, true);
			Peach.context.closePath();
			Peach.context.fill();
		},
	};
})();
