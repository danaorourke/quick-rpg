function character(name,type) {
	// get these from the assets!!
	this.created = Date.now();
	this.stats = {hp: 100};
	this.sprite = name;
	this.lastUpdate = 0;
	this.animation = {d: null, frame: 1};
	this.state = { up: false, down: false, right: false, interact: false };
	// set x, y
	if (typeof type != 'undefined') {
		this.x = Math.floor(Math.random()*(game.viewport.w-game.assets.sprites.tile.width));
		this.y = Math.floor(Math.random()*(game.viewport.h-game.assets.sprites.tile.height));
		this.type = type;

	} else {
		this.x = 200;
		this.y = 200;
	}
	var o = {wrap: 'div', id: name, x: this.x, y: this.y};
	if (typeof type != 'undefined') o.className = type;
	game.setNode(name, game.makeNode(o));	
	delete(o);
}
character.prototype.update = function(dt) {
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
character.prototype.animate = function(dt) {
	game.animator(this,this.d);	
};
character.prototype.walk = function(d,dt) {
	var amt = Math.floor(.05*dt);
	var c = play.returnCollisions({x:this.x,y:this.y},d,amt,this.sprite);
	if (c === false) play.move(d,amt,this);
	delete(c);
};