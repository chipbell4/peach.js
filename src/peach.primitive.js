Peach.Primitive = (function(){
	return {
		clear: function(){
			Peach.context.clearRect(0, 0, 
				Peach.gameState.width, Peach.gameState.height);
		},

		rect: function(x, y, w, h, color){
			Peach.context.fillStyle = color;
			Peach.context.fillRect(x, y, w, h);
		},

		circle: function(x,y,r,color){
			Peach.context.fillStyle = color;
			Peach.context.beginPath();
			Peach.context.arc(x, y, r, 0, Math.PI*2, true);
			Peach.context.closePath();
			Peach.context.fill();
		},
	};
})();
