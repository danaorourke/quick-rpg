var map = {
	config: {
		dependancies: [
			{name: 'maps', src: 'js/world/maps.json'}
		],
		update: false
	},
	direction: {up: false, down:false, right: false, left: false},
	offset: {x:0,y:0},
	object: null,
	maps: null,
	map: 'barren',
	
	// run things
	init: function(){
		var o = {wrap: 'div', id: 'garden'};
		this.object = game.makeNode(o);
		this.object.style.width = this.maps[this.map]['w']+'px';
		this.object.style.height = this.maps[this.map]['w']+'px';
		
		this.getMap('barren');
		
		if (this.maps[this.map].hasOwnProperty('ground')) this.renderLayer('ground');
		if (this.maps[this.map].hasOwnProperty('level')) this.renderLayer('level');
		if (this.maps[this.map].hasOwnProperty('above')) this.renderLayer('above');

		game.appendToCanvas(this.object);
	},
	animate: function(){},
	update: function(){
		console.log(this.direction);
		if (this.config.update == true) this.scrollMap();
	},
	// special functions for the map
	queueScroll: function(d) {
		if (d == 'up') {this.direction.up = true;}
		else if (d == 'down') {this.direction.down = true;}
		else if (d == 'right') {this.direction.right = true;}
		else if (d == 'left') {this.direction.left = true;}
		this.config.update = true;
	},
	scrollMap: function() {
		// check up and resolve
		if (this.direction.up) {
			if (this.offset.y < 0) {
				this.offset.y = this.offset.y + this.maps.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			this.direction.up = false;
		}
		// check down and resolve
		if (this.direction.down) {
			if (this.offset.y > ((this.maps[this.map]['h']-(this.maps[this.map]['h']*2))+game.canvas.viewport.h)) {
				this.offset.y = this.offset.y - this.maps.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			this.direction.down = false;
		}
		// check right and resolve
		if (this.direction.right) {
			if (this.offset.x > ((this.maps[this.map]['w']-(this.maps[this.map]['w']*2))+game.canvas.viewport.w + (this.maps.tilesize.w/2))) {
				this.offset.x = this.offset.x - this.maps.tilesize.h;
				this.object.style.left = this.offset.x+'px';
			}
			this.direction.right = false;		
		}
		// check left and resolve
		if (this.direction.left) {
			if (this.offset.x < 0) {
				this.offset.x = this.offset.x + this.maps.tilesize.h;
				this.object.style.left = this.offset.x+'px';
			}
			this.direction.left = false;
		}
		// kill update queue
		this.config.update = false;
	},
	getMap: function(name) {
		this.map = name;
		this.maps[this.map]['h'] = this.maps[this.map].ground.length * this.maps.tilesize.h;
		this.maps[this.map]['w'] = this.maps[this.map].ground[0].length * this.maps.tilesize.w;
		this.maps[this.map]['tileset']['rows'] = this.maps[this.map]['tileset']['w'] / this.maps.tilesize.w;
		this.maps[this.map]['tileset']['cols'] = this.maps[this.map]['tileset']['h'] / this.maps.tilesize.h;
	},
	renderLayer: function(name) {
		var layer = {wrap:'div',id:name};
		layer = game.makeNode(layer);
		layer.style.height = this.maps[this.map]['h']+'px';
		layer.style.width = this.maps[this.map]['w']+'px';
		
		// for each row
		for (i=0;i<this.maps[this.map][name].length;i++) {
			// get tiles in row
			for (j=0;j<this.maps[this.map][name][i].length;j++) {
				var tile = {wrap:'span',className:'c_'+i+' c_'+j};
				tile = game.makeNode(tile);
				var id = this.maps[this.map][name][i][j];
				var v = (id%this.maps[this.map]['tileset']['rows']);
				if (v == 0) {
					tile.style.backgroundPosition = '-'+((this.maps[this.map]['tileset']['rows']-1)*this.maps.tilesize.w)+'px -'+((Math.floor(id/this.maps[this.map]['tileset']['rows'])-1)*this.maps.tilesize.h)+'px';
				} else {
					tile.style.backgroundPosition = '-'+((v-1)*this.maps.tilesize.w)+'px -'+(Math.floor(id/this.maps[this.map]['tileset']['rows'])*this.maps.tilesize.h)+'px';
				}
				layer.appendChild(tile);
			}
		}
		this.object.appendChild(layer);
	}
};