Peach = (function(){
	// private functionality
	function draw()
	{
		Peach.Primitive.clear();
		var numItems = Peach.entities.length;
		for(var i=0; i<numItems; i++)
			Peach.entities[i].draw();
	}
	function loop()
	{
		requestAnimFrame(loop);	
		draw();
		update();
	}
	function update()
	{
		// update frames
		Peach.gameState.t1 = Peach.gameState.t2;
		Peach.gameState.t2 = new Date().getTime();
		Peach.gameState.frameTime = Peach.gameState.t2 - Peach.gameState.t1;
		
		var numItems = Peach.entities.length;
		for(var i=numItems-1; i>=0; i--)
		{
			Peach.entities[i].update();
			if(!Peach.entities[i].alive)
				Peach.entities.splice(i, 1);
		}

	}

	// A polyfill for requestAnimFrame
	window.requestAnimFrame = (function(){

		// Loop over potential vendor specific functions in an attempt to polyfill
		var function_names = ['requestAnimationFrame', 'webkitRequestAnimationFrame', 'mozRequestAnimationFrame', 'oRequestAnimationFrame', 'msRequestAnimationFrame'];
		for(var i = 0; i < 5; i++) {
			if(window[function_names[i]] !== undefined) {
				return window[function_names[i]];
			}
		}

		// No vendor specific version exists, simply return our polyfill
		return function(callback){
			window.setTimeout(callback, 1000 / 60);
		};

	})();

	return {
		context: null,
		// All of the entities in the game
		entities: [],
		// the state of the game (paused, etc.)
		gameState: {},
		// initialization function for the game
		init: function(canvasID){
			var canvas = document.getElementById(canvasID);
			Peach.gameState.width = canvas.width;
			Peach.gameState.height = canvas.height;
			Peach.context = canvas.getContext('2d');
			Peach.Input.init();
		},
		// one the game's loaded, start it
		start: function(){
			Peach.gameState.t2 = new Date().getTime();
			loop();
		}
	};
})();

