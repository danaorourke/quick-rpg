var player = {
	state: {
		up: false,
		down: false,
		right: false,
		left: false
	},
	stats:{hp:100,e:100},
	object: null,
	sprite:{
		offset: {h:48,w:16},
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
		this.location.x = 200;
		this.location.y = 200;
		
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
		game.animator(this,'walk', d);	
	},
	move: function(d,amt) {
		var loc = {	x: this.location.x+this.sprite.offset.w, y: this.location.y+this.sprite.offset.h};
		//console.log(loc.x,loc.y);
		var bounds = {
			r: game.canvas.viewport.w - this.sprite.h - (map.tilesets.tile.w*3),
			d: game.canvas.viewport.h - this.sprite.w - (map.tilesets.tile.h*3),
			u: (this.sprite.h/2) + (map.tilesets.tile.h*3),
			l: (this.sprite.w/2) + (map.tilesets.tile.w*3)
		};
		// console.log('r:'+bounds.r+' d:'+bounds.d+' u:'+bounds.u+' l:'+bounds.l);
		// collision check
		var c = play.getCollisions(loc, d, amt);
		if (c === false) {
			var scroll;// = map.queueScroll(d);
			if (d === 'up' || d === 'down') {
				if (d === 'up') {
					if (this.location.y >= bounds.u) this.location.y -= amt;
					else {
						scroll = map.queueScroll(d);
						if (scroll.flag === false && this.location.y > scroll.bound) this.location.y -= amt;
					}
				} else { // down
					if (this.location.y < bounds.d) this.location.y += amt;
					else {
						scroll = map.queueScroll(d);
						if (scroll.flag === false && (this.location.y + this.sprite.h) < game.canvas.viewport.h) this.location.y += amt;
					}
				}
				this.object.style.top = this.location.y+'px';
			} else if (d === 'left' || d === 'right') {
				if (d === 'left') {
					if (this.location.x > bounds.l) this.location.x -= amt;
					else {
						scroll = map.queueScroll(d);
						if (scroll.flag === false && this.location.x > scroll.bound) this.location.x -= amt;
					}
				} else { // right
					if (this.location.x < bounds.r) this.location.x += amt;
					else {
						scroll = map.queueScroll(d); //console.log('scroll queued');
						if (scroll.flag === false && (this.location.x + this.sprite.w) < game.canvas.viewport.w) this.location.x += amt;
					}
				}
				this.object.style.left = this.location.x+'px';
			}
		}
	}
};