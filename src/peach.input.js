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
