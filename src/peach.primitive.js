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
		 * Draws a rectangle with the provided (x,y) position, width w, height h, and
		 * color string
		 */
		rect: function(x, y, w, h, color){
			Peach.context.fillStyle = color;
			Peach.context.fillRect(x, y, w, h);
		},

		/**
		 * Draws a circle with corner (x,y) and radius r with color.
		 * TODO: Make this CENTERED at (x,y)
		 */
		circle: function(x,y,r,color){
			Peach.context.fillStyle = color;
			Peach.context.beginPath();
			Peach.context.arc(x, y, r, 0, Math.PI*2, true);
			Peach.context.closePath();
			Peach.context.fill();
		},
	};
})();
