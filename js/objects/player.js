var player = {
	stats: {
		hp: null
	},
	sprite: 'player',
	animation: {d: null, frame: 0},
	state: {
		up: false,
		down: false,
		left: false,
		right: false,
		interact: false
	},
	x: 200,
	y: 200,
	
	// returns sprite for init
	init: function() {
		// to-do: create css for player from assets
		this.stats.hp = 100;
//		game.makeStyles(name);
		var o = {wrap: 'div', id: 'player', x: this.x, y: this.y};
		game.setNode('player', game.makeNode(o));
	},
	update: function(dt) {
		// stats effect checks go here.
		if (this.state.up) this.walk('up', dt);
		if (this.state.down) this.walk('down', dt);
		if (this.state.right) this.walk('right', dt);
		if (this.state.left) this.walk('left', dt);
		if (this.state.interact) this.interact();
	},
	animate: function(dt) {
		var a = '';
		if (this.state.up) a = 'up';
		else if (this.state.down) a = 'down';
		else if (this.state.left) a = 'left';
		else if (this.state.right) a = 'right';
		game.animator(this,a);
	},
	// moves in the given direction
	walk: function(d,dt) {
		var amt = Math.floor(.12*dt);
		this.animation.d = d;
		var c = play.returnCollisions({x:this.x,y:this.y}, d, amt, this.sprite);
		if (c === false) {
			play.move(d,amt,this);

		}
		delete(c);
	},
	interact: function() {
		// checks for type of object on collision -
		// picks up produce if ripe from plant
	}
};