var play = {
	config: {
		dependancies: [
			{name: 'mob', src: 'js/objects/mob.js'}
		]
	},
	styles: null,
	sprites: {},
	objects: [],
	
	init: function() {
		this.bounds = {
			up: 0,
			down: game.viewport.h,
			left: 0,
			right: game.viewport.w
		};
		this.styles = game.makeGeneralStyles();
	// boot everything up
		for (var i = 0; i < 20; i++) {
			var o = new mob('ogre'+i,'ogre');
			this.objects.push(o);
			game.appendNode(this.sprites['ogre'+i]);
			delete(o);
		}
		// make the player
		this.player = new mob('player');
		// where the hell should this actually go?
		this.player.update = function(dt) {
			// stats effect checks go here.
			if (this.state.up || this.state.down || this.state.left || this.state.right) {
				if (this.state.up) this.walk('up', dt);
				else if (this.state.down) this.walk('down', dt);
				else if (this.state.right) this.walk('right', dt);
				else if (this.state.left) this.walk('left', dt);
			} else {
				this.walk('idle',dt);
			}
			if (this.state.interact) this.interact();
		};
		this.objects.push(this.player);
		game.appendNode(this.sprites['player']);
		
		// append all the bits to canvas.
		game.appendStyles(this.styles);
		// move all apending of nodes to happen here.
	},
	update: function(dt) {
		// collect all user input
		document.onkeydown = function(e) {
			var key;
			if (document.all) e = window.event;
			if (document.layers || e.which) key = e.which;
			if (document.all) key = e.keyCode;
//			alert(' [Decimal value = ' + key + ']');
			// player based control

			if (key == 87 || key == 38) play.player.state.up = true;
			else if (key == 83|| key == 40) play.player.state.down = true;
			else if (key == 68 || key == 39) play.player.state.right = true;
			else if (key == 65 || key == 37) play.player.state.left = true;

		};
		document.onkeyup = function(e) {
			var key;
			if (document.all) e = window.event;
			if (document.layers || e.which) key = e.which;
			if (document.all) key = e.keyCode;

			if (key == 87 || key == 38) play.player.state.up = false;
			else if (key == 83 || key == 40) play.player.state.down = false;
			else if (key == 68 || key == 39) play.player.state.right = false;
			else if (key == 65 || key == 37) play.player.state.left = false;
			// the animation frame and positions need to be reset to neutral.
			// interact on key up = space
		//	if (key == 32) play.player.state.interact = true;

		};
		// iterate through automatic child changes
		var c = this.objects.length;
		for (var i = 0; i < c; i++) this.objects[i].update(dt);
	},
	animate: function(dt) {
		var c = this.objects.length;
		for (var i = 0; i < c; i++) this.objects[i].animate(dt);
	},
	returnCollisions: function(that, amt) {
	// restrict objects to play area, set variables, get asset
		var	self = {},
			asset = game.getAsset(that.type),
			other = {},
			otherAsset,
			bounds = this.bounds,
			d = that.animation.d,
			count = this.objects.length,
			i = a = 0;
			
		if (typeof amt === 'undefined') var amt = 1;
		// define check based on direction = x,y,b
		if (d === 'up' || d === 'down') {
			if (d === 'up') {
				self.y = that.y + asset.offset.y;
				self.bound = that.y;
			} else 	{
				self.y = that.y + asset.h;
				self.bound = that.y+asset.h;
			}				
			self.x1 = that.x;
			self.x2 = that.x+asset.w;
		} else if (d === 'left' || d === 'right') {
			if (d === 'left') {
				self.x = that.x;
				self.bound = that.x;
			} else {
				self.x = that.x + asset.w;
				self.bound = that.x+asset.w;
			}
			self.y1 = that.y + asset.offset.y;
			self.y2 = that.y + asset.h;
		}
	// check for other mobs
		for (i = 0; i < count; i++) {
			otherAsset = game.getAsset(this.objects[i].type);
			if (d === 'up') {
				// define other checks
				other.y = this.objects[i].y + otherAsset.h;
				other.x1 = this.objects[i].x;
				other.x2 = this.objects[i].x + otherAsset.w;
				// go with the flow output
				for (a = 0; a < amt; a++) {
					if ((self.y-a) === other.y) {
						if ( ((self.x1-a) >= other.x1 && (self.x1-a) <= other.x2) || ( (self.x2-a) >= other.x1 && (self.x2-a) <= other.x2) ) return true;
					}
				}
			} else if (d === 'down') {
				// set it
				other.y = this.objects[i].y + otherAsset.offset.y;
				other.x1 = this.objects[i].x;
				other.x2 = this.objects[i].x + otherAsset.w;
				// check the move!
				for (a = 0; a < amt; a++) {
					if ((self.y+a) === other.y) {
						if ( ((self.x1+a) >= other.x1 && (self.x1+a) <= other.x2) || ( (self.x2+a) >= other.x1 && (self.x2+a) <= other.x2) ) return true;
					}
				}
			} else if (d === 'right') {
				// set it
				other.x = this.objects[i].x;
				other.y1 = this.objects[i].y + otherAsset.offset.y;
				other.y2 = this.objects[i].y + otherAsset.h;
				// check it
				for (a = 0; a < amt; a++) {
					if ((self.x+a) === other.x) {
						if ( ( (self.y1+a) >= other.y1 && (self.y1+a) <= other.y2) || ((self.y2+a) >= other.y1 && (self.y2+a) <= other.y2)) return true;
					}
				}
			} else if (d === 'left') {
				// set it
				other.x = this.objects[i].x + otherAsset.w;
				other.y1 = this.objects[i].y + otherAsset.offset.y;
				other.y2 = this.objects[i].y + otherAsset.h;
				// check it
				for (a = 0; a < amt; a++) {
					if ((self.x-a) === other.x) {
						if ( ( (self.y1-a) >= other.y1 && (self.y1-a) <=other.y2 ) || ( (self.y2-a) >= other.y1 && (self.y2-a) <= other.y2 ) ) return true;
					}
				}
			}
		}		
	// check for walls	
		// perform checks for boundary
		if (d === 'left' || d === 'up') {
			for (var a = 1; a <= amt; a++) {
				if ((self.bound-a) <= bounds[d]) return true;
			}
		}
		if (d === 'right' || d === 'down') {
			for (var a = 1; a <= amt; a++) {
				if ((self.bound+a) >= bounds[d]) return true;
			}
		}
		
	// grats - you've hit nothing
		return false;
	},
	move: function(d, amt, that) {
		if (d === 'up') that.y -= amt;
		if (d === 'down') that.y += amt;
		if (d === 'left') that.x -= amt;
		if (d === 'right') that.x += amt;
	}
};