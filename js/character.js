var character={
	name: name,
	state: 0,
	stats:{hp:0,e:0},
	object:'',
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
	location:{x:0,y:0},
	inventory:{},
	update:function(){
		document.onkeydown = function(e) {
			var key;
			if (document.all)	{e = window.event;}
			if (document.layers || e.which) {key = e.which;}
			if (document.all)	{key = e.keyCode;}
			var pchar = String.fromCharCode(key);
			//alert(' Character = ' + pchar + ' [Decimal value = ' + key + ']');
			
			switch (pchar) {
				case 'W':
				character.state = 2;
				break;
				
				case 'D':
				character.state = 3;
				break;
				
				case 'S':
				character.state = 4;
				break;
				
				case 'A':
				character.state = 5;
				break;	
			};
		};
		document.onkeyup = function(e) {
			character.state = 1;
		};
	},
	animate:function(){
		switch (this.state) {
			case 0:
			// popping animation
			break;
			
			case 1:
			// arbitrarily decide to show idle animation
			break;
			
			case 2:
			this.walk('up');
			break;
			
			case 3:
			this.walk('right');
			break;
			
			case 4:
			this.walk('down');
			break;
			
			case 5:
			this.walk('left');
			break;

			default:
			// idle animation here?
			break;
		};
	},
	init:function(){
		this.stats.hp = 100;
		this.stats.e = 100;
		this.state = 1;

		var height = area.h - this.sprite.h - 4;
		var width = area.w - this.sprite.w - 4;
		//this.location.x = Math.floor(Math.random()*width);
		//this.location.y = Math.floor(Math.random()*height);

		// create object for canvas, and pass back
		this.object = document.createElement('div');
		this.object.id = 'player';
		this.object.style.top = this.location.y+'px';
		this.object.style.left = this.location.x+'px';
		return this.object;

	},
	walk:function(d){
		move(this,d,6);
		animator(this,'walk',d);
	}
};