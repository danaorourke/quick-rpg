var player = {
	stats: {},
	inventory: {},
	
	state: {
		up: false,
		down: false,
		right: false,
		left: false
	},
	location: {x:null,y:null},
	sprite:{
		h:48,
		w:32,
		animations: {
			walk:{
				down: {
					f_0: {x: 0, y: 0},
					f_1: {x: 32, y: 0},
					f_2: {x: 64, y: 0}
				},
				left: {
					f_0: {x: 0, y: 48},
					f_1: {x: 32, y: 48},
					f_2: {x: 64, y: 48}
				},
				right: {
					f_0: {x: 0, y: 96},
					f_1: {x: 32, y: 96},
					f_2: {x: 64, y: 96}
				},
				up: {
					f_0: {x: 0, y: 144},
					f_1: {x: 32, y: 144},
					f_2: {x: 64, y: 144}
				}
			}
		},
		animation: {
			name: 'walk',
			direction: 'down',
			frame: 0
		}
	},
	object: null,
	
	// methods
	init: function(){},
	update: function(){
		document.onkeydown = function(e) {
			var key;
			if (document.all)	{e = window.event;}
			if (document.layers || e.which) {key = e.which;}
			if (document.all)	{key = e.keyCode;}
//			alert(' [Decimal value = ' + key + ']');
			
			if (key == 87 || key == 38) {character.state.up = true;}
			else if (key == 83|| key == 40) {character.state.down = true;}

			if (key == 68 || key == 39) {character.state.right = true;}
			else if (key == 65 || key == 37) {character.state.left = true;}
			
		};
		document.onkeyup = function(e) {
			var key;
			if (document.all) {e = window.event;}
			if (document.layers || e.which) {key = e.which;}
			if (document.all) {key = e.keyCode;}
			
			if (key == 87 || key == 38) {character.state.up = false;}
			else if (key == 83 || key == 40) {character.state.down = false;}

			if (key == 68 || key == 39) {character.state.right = false;}
			else if (key == 65 || key == 37) {character.state.left = false;}

		};
	},
	animate: function(){}
};