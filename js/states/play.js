var play = {
	config: {
		dependancies: [
	//		{name: 'map', src: 'js/objects/map.js'},
	//		{name: 'plant', src: 'js/objects/plant.js'},
			{name: 'mob', src: 'js/objects/mob.js'}
		]
	},
	styles: null,
	sprites: {}, // contains the sprite objects for each of the above
	objects: [],
	
	init: function() {
		this.styles = game.makeGeneralStyles();
	// boot everything up
		for (var i = 0; i < 1; i++) {
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
			if (this.state.up) this.walk('up', dt);
			if (this.state.down) this.walk('down', dt);
			if (this.state.right) this.walk('right', dt);
			if (this.state.left) this.walk('left', dt);
			if (this.state.interact) this.interact();
		};
		this.objects.push(this.player);
		game.appendNode(this.sprites['player']);
		
		
		// append all the bits to canvas.
		game.appendStyles(this.styles);
//		var s = this.sprites.length;
//		for (var i = 0; i < s; i++) game.appendNode(this.sprites[i]);
//		game.appendNode(this.sprites.player);
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
			if (key == 32) play.player.state.interact = true;

		};
		// iterate through automatic child changes
		var c = this.objects.length;
		for (var i = 0; i < c; i++) this.objects[i].update(dt);
	},
	animate: function(dt) {
		var c = this.objects.length;
		for (var i = 0; i < c; i++) this.objects[i].animate(dt);
	},
	returnCollisions: function(o,d,amt,source) {
		// o = {x, y, h, w } d = str, amt = int, source = string
// restrict objects to play area
		var bounds = { up: 0, down: game.viewport.h, left: 0, right: game.viewport.w };
		// set check
		var check;
		if (d === 'up') check = o.y;
		if (d === 'down') check = o.y+play.sprites[source].offsetHeight;
		if (d === 'left') check = o.x;
		if (d === 'right') check = o.x+play.sprites[source].offsetWidth;
		// perform checks
		if (d === 'left' || d === 'up') {
			for (var a = 1; a <= amt; a++) {
				if ((check-a) <= bounds[d]) return true;
			}
		}
		if (d === 'right' || d === 'down') {
			for (var a = 1; a <= amt; a++) {
				if ((check+a) >= bounds[d]) return true;
			}
		}
		return false;
	},
	move: function(d, amt, that) {
		if (d === 'up') that.y -= amt;
		if (d === 'down') that.y += amt;
		if (d === 'left') that.x -= amt;
		if (d === 'right') that.x += amt;
	}
};