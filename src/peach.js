Peach = (function(){

	/**
	 * The main draw routine. Essentially calls the draw routing on
	 * all entities that are currently alive
	 */
	function draw()
	{
		Peach.Primitive.clear();
		var numItems = Peach.entities.length;
		for(var i=0; i<numItems; i++)
			Peach.entities[i].draw();
	}

	/**
	 * The main game loop function. Draws, updates. That's about it
	 */
	function loop()
	{
		requestAnimFrame(loop);	
		draw();
		update();
	}

	/**
	 * Calculates the current framerate, and performs the update operation
	 * on all living Peach entities
	 */
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

	/**
	 * Polyfills the request animation frame function, for "unique" browsers
	 */
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

		/**
		 * The main canvas context for the application
		 */
		context: null,
		
		/**
		 * The array of all active entities currently running
		 */
		entities: [],
		
		/**
		 * The object containing current game state (paused, etc. Really whatever you want)
		 */
		gameState: {},

		/**
		 * The main initialization routing for Peach.js. Creates the canvas,
		 * sets some gameState variables, and sets up input to listen for events
		 */
		init: function(canvasID){
			var canvas = document.getElementById(canvasID);
			Peach.gameState.width = canvas.width;
			Peach.gameState.height = canvas.height;
			Peach.context = canvas.getContext('2d');
			Peach.Input.init();
		},

		/**
		 * Starts the game loop running
		 */
		start: function(){
			Peach.gameState.t2 = new Date().getTime();
			loop();
		}
	};
})();

