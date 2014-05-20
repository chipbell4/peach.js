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


/**
 * The base class for "drawable" things. Essentially a noop for now
 */
Peach.Drawable = (function(){
	return {
		draw: function(context) {
		}
	};
})();

Peach.Input = (function(){

	/**
	 * Handler for a keydown event. Marks the input state as having that
	 * key down
	 */
	function keydown(event)
	{
		var keycode;
		if(window.event) keycode = window.event.keyCode;
		else if(event) keycode = e.which;
		Peach.Input.state.keys[jsEventCodeToStr[keycode]] = true;
	}
	
	/**
	 * Handler for a keyup event. Clears the input state for the 
	 * released key
	 */
	function keyup(event)
	{
		var keycode;
		if(window.event) keycode = window.event.keyCode;
		else if(event) keycode = e.which;
		Peach.Input.state.keys[jsEventCodeToStr[keycode]] = false;
	}

	/**
	 * Handler for a mousedown event. Marks the input state to reflect the
	 * change
	 */
	function mousedown(event)
	{
		Peach.Input.state.mouseIsDown = true;
	}

	/**
	 * Handler for the mouse move event. Marks the input state as so
	 */
	function mousemove(event)
	{
		Peach.Input.state.mousePosition.x = event.clientX;
		Peach.Input.state.mousePosition.y = event.clientY;
	}

	/**
	 * Handler for mouseup. Marks the mouse as no long being up
	 */
	function mouseup(event)
	{
		Peach.Input.state.mouseIsDown = false;
	}
	
	/**
	 * A huge map from js key codes to the keys pressed
	 */
	var jsEventCodeToStr = {
		8:'backspace', 9:'tab', 13:'enter', 16:'shift', 17:'ctrl', 18:'alt',
		19:'pause', 20:'caps', 27:'esc', 33:'pageup', 34:'pagedown',
		35:'end', 36:'home', 37:'left', 38:'up', 39:'right', 40:'down',
		45:'insert', 46:'delete', 48:'0', 49:'1', 50:'2', 51:'3', 52:'4',
		53:'5', 54:'6', 55:'7', 56:'8', 57:'9', 65:'a', 66:'b', 67:'c',
		68:'d', 69:'e', 70:'f', 71:'g', 72:'h', 73:'i', 74:'j', 75:'k',
		76:'l', 77:'m', 78:'n', 79:'o', 80:'p', 81:'q', 82:'r', 83:'s',
		84:'t', 85:'u', 86:'v', 87:'w', 88:'x', 89:'y', 90:'z',
		91:'left_window', 92:'right_window', 93:'select', 96:'0_pad',
		97:'1_pad', 98:'2_pad', 99:'3_pad', 100: '4_pad', 101:'5_pad',
		102:'6_pad', 103:'7_pad', 104:'8_pad', 105:'9_pad'
	};

	return {
		
		/**
		 * Sets up event listeners, and sets up keyboard state
		 */
		init: function(){
			// add keys for every letter to state
			var keyCount = jsEventCodeToStr.length;
			for(var key in jsEventCodeToStr)
				Peach.Input.state.keys[jsEventCodeToStr[key]] = false;

			// add key listeners
			window.onkeydown = keydown;
			window.onkeyup = keyup;

			// add mouse listeners
			window.onmousedown = mousedown;
			window.onmousemove = mousemove;
			window.onmouseup = mouseup;
		},
		
		/**
		 * The current representation of input state
		 */
		state: {

			/**
			 * Self-explanatory?
			 */
			mouseIsDown: false,

			/**
			 * Contains the current position of the mouse at all times
			 */
			mousePosition: {
				x: 0,
				y: 0
			},

			/**
			 * The array of keyboard state. For instance, if the 'a' key was currently
			 * pressed, you can check the value of Peach.Input.state.keys.a and you'll
			 * get a truthy value back
			 */
			keys: { },
		},
	};
})();

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
