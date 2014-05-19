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
			// add animation capabilities
			window.requestAnimFrame = (function(){
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					function(callback){
						window.setTimeout(callback,
							1000 / 60);
					};

			})();
		},
		// one the game's loaded, start it
		start: function(){
			Peach.gameState.t2 = new Date().getTime();
			loop();
		}

	};
})();

Peach.Input = (function(){
	function keydown(event)
	{
		var keycode;
		if(window.event) keycode = window.event.keyCode;
		else if(event) keycode = e.which;
		Peach.Input.state.keys[jsEventCodeToStr[keycode]] = true;
	}
	
	function keyup(event)
	{
		var keycode;
		if(window.event) keycode = window.event.keyCode;
		else if(event) keycode = e.which;
		Peach.Input.state.keys[jsEventCodeToStr[keycode]] = false;
	}

	function mousedown(event)
	{
		Peach.Input.state.mouseIsDown = true;
	}

	function mousemove(event)
	{
		Peach.Input.state.mousePosition.x = event.clientX;
		Peach.Input.state.mousePosition.y = event.clientY;
	}

	function mouseup(event)
	{
		Peach.Input.state.mouseIsDown = false;
	}
	
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
		
		state: {
			mouseIsDown: false,
			mousePosition: {
				x: 0,
				y: 0
			},
			keys: { },
		},
	};
})();

Peach.Drawable = (function(){
	return {
		draw: function(context) {
		}
	};
})();

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
