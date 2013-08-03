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
//		player.init();
		
		// append all the bits to canvas.
		game.appendStyles(this.styles);
//		var s = this.sprites.length;
//		for (var i = 0; i < s; i++) game.appendNode(this.sprites[i])
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
/*
			if (key == 87 || key == 38) player.state.up = true;
			else if (key == 83|| key == 40) player.state.down = true;
			else if (key == 68 || key == 39) player.state.right = true;
			else if (key == 65 || key == 37) player.state.left = true;
*/
		};
		document.onkeyup = function(e) {
			var key;
			if (document.all) e = window.event;
			if (document.layers || e.which) key = e.which;
			if (document.all) key = e.keyCode;
/*
			if (key == 87 || key == 38) player.state.up = false;
			else if (key == 83 || key == 40) player.state.down = false;
			else if (key == 68 || key == 39) player.state.right = false;
			else if (key == 65 || key == 37) player.state.left = false;
			// the animation frame and positions need to be reset to neutral.
			// interact on key up = space
			if (key == 32) player.state.interact = true;
*/
		};
		// iterate through automatic child changes
		this.player.update(dt);
		var c = this.objects.length;
		for (var i = 0; i < c; i++) this.objects[i].update(dt);
	},
	animate: function(dt) {
		this.player.animate(dt);
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