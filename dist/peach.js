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

Peach.Geometry = (function() {
	return { };
})();

Peach.Geometry.Point = (function() {
	/**
	 * The Point class. Represents a 2D point, with the normal operations
	 */
	var Point = function() { };

	/**
	 * Creates a point from cartesian
	 */
	Point.fromCartesian = function(x, y) {
		var p = new Point();
		p.x = x;
		p.y = y;
		return p;
	};

	/**
	 * Creates a point from polar coordinates
	 */
	Point.fromPolar = function(r, theta) {
		var p = new Point();
		p.x = r * Math.cos(theta);
		p.y = r * Math.sin(theta);
		return p;
	};

	/**
	 * Calculates the dot product of two vectors
	 */
	Point.prototype.dot = function(other_point) {
		return this.x * other_point.x + this.y * other_point.y;
	};

	/**
	 * Calculates the magnitude of a vector
	 */
	Point.prototype.magnitude = function() {
		return Math.sqrt( this.dot(this) );
	};

	/**
	 * Negates a vector
	 */
	Point.prototype.negate = function() {
		return Point.fromCartesian(-this.x, -this.y);
	};

	/**
	 * Adds two vectors
	 */
	Point.prototype.add = function(other) {
		return Point.fromCartesian(this.x + other.x, this.y + other.y);
	};

	/**
	 * Scales a vector
	 */
	Point.prototype.scale = function(scale_factor) {
		return Point.fromCartesian(this.x * scale_factor, this.y * scale_factor);
	};

	/**
	 * Rotates a vector
	 */
	Point.prototype.rotate = function(angle) {
		var new_x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
		var new_y = Math.sin(angle) * this.x + Math.sin(angle) * this.y;

		return Point.fromCartesian(new_x, new_y);
	};

	return Point;
})();

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
