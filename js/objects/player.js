var player = {
	state: {
		up: false,
		down: false,
		right: false,
		left: false
	},
	stats:{hp:0,e:0},
	object: null,
	sprite:{
		offset: {h:32,w:16},
		h:48,
		w:32,
		animations: {
			walk:{
				down: {
					f_0: {x: 0, y: 0},
					f_1: {x: 32, y: 0}, //rest
					f_2: {x: 64, y: 0}
				},
				left: {
					f_0: {x: 0, y: 48},
					f_1: {x: 32, y: 48}, // rest
					f_2: {x: 64, y: 48}
				},
				right: {
					f_0: {x: 0, y: 96},
					f_1: {x: 32, y: 96}, // rest
					f_2: {x: 64, y: 96}
				},
				up: {
					f_0: {x: 0, y: 144},
					f_1: {x: 32, y: 144}, // rest
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
	location: {x:0,y:0},
	inventory: {},
	
	// engine requisit functions	
	init: function() {
		this.stats.hp = 100;
		this.stats.e = 100;
		
		this.location.x = 100;
		this.location.y = 100;
		
		var o = {wrap: 'div', id: 'player'};
		this.object = game.makeNode(o);
		this.object.style.top = this.location.y+'px';
		this.object.style.left = this.location.x+'px';
		game.appendToCanvas(this.object);
	},
	update: function() {
		document.onkeydown = function(e) {
			var key;
			if (document.all)	{e = window.event;}
			if (document.layers || e.which) {key = e.which;}
			if (document.all)	{key = e.keyCode;}
//			alert(' [Decimal value = ' + key + ']');
			
			if (key == 87 || key == 38) {player.state.up = true;}
			else if (key == 83|| key == 40) {player.state.down = true;}

			if (key == 68 || key == 39) {player.state.right = true;}
			else if (key == 65 || key == 37) {player.state.left = true;}
			
		};
		document.onkeyup = function(e) {
			var key;
			if (document.all) {e = window.event;}
			if (document.layers || e.which) {key = e.which;}
			if (document.all) {key = e.keyCode;}
			
			if (key == 87 || key == 38) {player.state.up = false;}
			else if (key == 83 || key == 40) {player.state.down = false;}

			if (key == 68 || key == 39) {player.state.right = false;}
			else if (key == 65 || key == 37) {player.state.left = false;}
			
			// the animation frame and positions need to be reset to neutral.
		};
/*
		var keyDown = game.getKeyCode('down');
		console.log('keyDown: '+keyDown);
		if (keyDown == 87 || keyDown == 38) {this.state.up = true;}
		else if (keyDown == 83|| keyDown == 40) {this.state.down = true;}
		if (keyDown == 68 || keyDown == 39) {this.state.right = true;}
		else if (keyDown == 65 || keyDown == 37) {this.state.left = true;}
	
		var keyUp = game.getKeyCode('up');
		console.log('keyUp: '+keyUp);
		if (keyUp == 87 || keyUp == 38) {this.state.up = false;}
		else if (keyUp == 83 || keyUp == 40) {this.state.down = false;}
		if (keyUp == 68 || keyUp == 39) {this.state.right = false;}
		else if (keyUp == 65 || keyUp == 37) {this.state.left = false;}*/
	},
	animate: function() {
		if (this.state.up) this.walk('up');
		if (this.state.down) this.walk('down');
		if (this.state.right) this.walk('right');
		if (this.state.left) this.walk('left');
	},
	// player specific
	walk: function(d) {
		this.move(d,6);
		game.animator(this,'walk',d);	
	},
	move: function(d,amt) {
		var loc = {
			x: this.location.x+this.sprite.offset.w,
			y: this.location.y+this.sprite.offset.h
		};
		var c = game.getCollisions(loc, d, amt);
		//console.log(this.location.x,this.location.y);
		console.log(c);
		// this sets the scroll part of the viewport. Player should be non-restricted if scroll is not possible.
		var bound_h = game.canvas.viewport.h - this.sprite.h - (map.tilesets.tile.h/2);
		var bound_w = game.canvas.viewport.w - this.sprite.w - (map.tilesets.tile.w/2);
		// move based on dir
		if (c === false) {
			switch(d) {
				case 'up':
					if (this.location.y >= ((this.sprite.h/2) - map.tilesets.tile.h)) {
						this.location.y = this.location.y - amt;
						this.object.style.top = this.location.y+'px';
					} else { map.queueScroll(d); }
				break;
				case 'right':
					if (this.location.x < bound_w) {
						this.location.x = this.location.x + amt;
						this.object.style.left = this.location.x+'px';
					} else { map.queueScroll(d); }
				break;
				case 'down':
					if (this.location.y < bound_h) {
						this.location.y = this.location.y + amt;
						this.object.style.top = this.location.y+'px';
					} else { map.queueScroll(d); }
				break;
				case 'left':
					if (this.location.x >= (this.sprite.w - (map.tilesets.tile.w/2))) {
						this.location.x = this.location.x - amt;
						this.object.style.left = this.location.x+'px';
					} else { map.queueScroll(d); }
				break;
			}
		}
	}
};