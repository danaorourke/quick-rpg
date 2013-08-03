function mob(name, type) {
	// get these from the assets!!
	this.sprite = name;	
	// set x, y
	if (typeof type != 'undefined') {
		this.x = Math.floor(Math.random()*(game.viewport.w-game.assets.sprites.tile.width));
		this.y = Math.floor(Math.random()*(game.viewport.h-game.assets.sprites.tile.height));
		this.type = type;

	} else {
		this.type = name;
		this.x = 200;
		this.y = 200;
	}
	this.createStats();
	
	var o = {wrap: 'div', id: name, x: this.x, y: this.y};
	if (typeof type != 'undefined') o.className = type;
	
	game.setNode(name, game.makeNode(o));	
	
	delete(o);
}
mob.prototype.update = function(dt) {
	// behavioral updates and checks go here.
	if (this.lastUpdate === 0) {
		this.d = Math.floor(Math.random()*5);
		if (this.d === 1) this.d = 'up';
		else if (this.d === 2) this.d = 'down';
		else if (this.d === 3) this.d = 'right';
		else if (this.d === 4) this.d = 'left';
		else this.d = 'idle';
	}
	else if (this.lastUpdate === 10) this.lastUpdate = -1;
	this.walk(this.d, dt);
	this.lastUpdate++;
};
mob.prototype.createStats = function() {
	// get asset type
	var type = game.mobs[this.type].stats;
		
	// create start mob stats from type
	this.stats = {
		hp: type.hp,
		speed: type.speed
	};
	
	// for all
	this.state = { up:false, down:false, right:false };
	this.animation = { name:'idle', d:null, frame:1 };
	this.lastUpdate = 0;
	this.created = Date.now();
};
mob.prototype.animate = function(dt) {
	game.animator(this);	
};
mob.prototype.walk = function(d,dt) {
	var amt = Math.floor((this.stats.speed/100)*dt);
	
	if (d != 'idle') {
		this.animation.d = this.animation.name = d;
		var c = play.returnCollisions(this, amt);
	}
	else {
		var c = false;
		this.animation.name = d;
	}
	
	if (c === false) play.move(d,amt,this);
	delete(c);
};