var area = {
	// some nice variables
	config: {
		dependancies: {name: 'maps', src: 'js/world/maps.json'},
		update: false,
		direction: false
	},
	offset: {x:0,y:0},
	tilesize: {h:32,w:32}, // many elements are x2 by x3
	maps: {},
	map: {},
	object: '',
	
	// methods
	animate: function() {
		// loop through any animations in the background.
	},
	update: function() {
		if (this.config.update == true && this.config.direction != false) {
			this.scrollMap();
			this.config.direction = this.config.update = false;
		}
	},
	init: function() {
		// create garden container
		this.object = document.createElement('div');
		this.object.id = 'garden';
		
		this.getMap('garden');
		
		this.object.style.width = this.map.h+'px';
		this.object.style.height = this.map.h+'px';
		
		if (this.map.hasOwnProperty('ground')) this.renderLayer('ground');
		if (this.map.hasOwnProperty('level')) this.renderLayer('level');
		if (this.map.hasOwnProperty('above')) this.renderLayer('above');
		
		// return filled garden div
		return this.object;
	},
	scrollMap: function() {
		switch (this.config.direction) {
			case 'up':
			if (this.offset.y < 0) {
				this.offset.y = this.offset.y + this.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			break;
			
			case 'down':
			if (this.offset.y > ((this.map.h-(this.map.h*2))+game.viewport.h)) {
				this.offset.y = this.offset.y - this.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			break;
			
			case 'right':
			if (this.offset.x > ((this.map.w-(this.map.w*2))+game.viewport.w + (this.tilesize.w/2))) {
				this.offset.x = this.offset.x - this.tilesize.h;
				this.object.style.left = this.offset.x+'px';
			}
			break;
			
			case 'left':
				if (this.offset.x < 0) {
					this.offset.x = this.offset.x + this.tilesize.h;
					this.object.style.left = this.offset.x+'px';
				}
			break;	
		};
	},
	renderLayer: function(layer) {
		var l = document.createElement('div');
		l.id = layer;
		l.style.height = this.map.h+'px';
		l.style.width = this.map.w+'px';
		
		// for each row
		for (i=0;i<this.map[layer].length;i++) {
			// get tiles in row
			for (j=0;j<this.map[layer][i].length;j++) {
				var tile = document.createElement('span');
				// create tile
				var id = this.map[layer][i][j];
				tile.className = i+' '+j;
				var v = (id%this.map.tileset.rows);
				if (v == 0) {
					tile.style.backgroundPosition = '-'+((this.map.tileset.rows-1)*this.tilesize.w)+'px -'+((Math.floor(id/this.map.tileset.rows)-1)*this.tilesize.h)+'px';
				} else {
					tile.style.backgroundPosition = '-'+((v-1)*this.tilesize.w)+'px -'+(Math.floor(id/this.map.tileset.rows)*this.tilesize.h)+'px';
				}
				// append tile to layer
				l.appendChild(tile);
			}
		}
		// append layer to garden
		this.object.appendChild(l);
	},
	getMap: function(name) {
		this.tilesize.h = this.maps.tilesize.h;
		this.tilesize.w = this.maps.tilesize.w;
	
		this.map = this.maps[name];
		// map dimensions
		this.map.h = this.map.ground.length * this.tilesize.h;
		this.map.w = this.map.ground[0].length * this.tilesize.w;
		// tileset data
		this.map.tileset.rows = this.map.tileset.w / this.tilesize.w;
		this.map.tileset.cols = this.map.tileset.h / this.tilesize.h;

	},
};