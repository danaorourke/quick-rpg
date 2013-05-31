var character={
	name: name,
	state: {
		up: false,
		down: false,
		right: false,
		left: false
	},
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

	// methods
	update:function(){
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
	animate:function(){
		if (this.state.up) this.walk('up');
		if (this.state.down) this.walk('down');
		if (this.state.right) this.walk('right');
		if (this.state.left) this.walk('left');
	},
	init:function(){
		this.stats.hp = 100;
		this.stats.e = 100;

		var height = game.viewport.h - this.sprite.h - 4;
		var width = game.viewport.w - this.sprite.w - 4;
		this.location.x = Math.floor(Math.random()*width);
		this.location.y = Math.floor(Math.random()*height);

		// create object for canvas, and pass back
		this.object = document.createElement('div');
		this.object.id = 'player';
		this.object.style.top = this.location.y+'px';
		this.object.style.left = this.location.x+'px';
		return this.object;
	},
	walk:function(d){
		this.move(d,6);
		animator(this,'walk',d);
	},
	move: function (direction,amt) {
		var b_h = game.viewport.h - this.sprite.h - (area.tilesize.h/2);
		var b_w = game.viewport.w - this.sprite.w - (area.tilesize.w/2);
	
		switch (direction) {
			case 'up':
			if (this.location.y >= ((this.sprite.h/2)-area.tilesize.h)) {
				this.location.y = this.location.y-amt;
				this.object.style.top = this.location.y+'px';
			} else {
				area.config.update = true;
				area.config.direction = 'up';
			}
			break;
			
			case 'right':
			if (this.location.x < b_w) {
				this.location.x = this.location.x+amt;
				this.object.style.left = this.location.x+'px';
			} else {
				area.config.update = true;
				area.config.direction = 'right';
			}
			break;
			
			case 'down':
			if (this.location.y < b_h) {
				this.location.y = this.location.y+amt;
				this.object.style.top = this.location.y+'px';
			} else {
				area.config.update = true;
				area.config.direction = 'down';
			}
			break;
			
			case 'left':
			if (this.location.x >= (this.sprite.w -(area.tilesize.w/2))) {
				this.location.x = this.location.x-amt;
				this.object.style.left = this.location.x+'px';
			} else {
				area.config.update = true;
				area.config.direction = 'left';
			}
			break;
		}
	}
};