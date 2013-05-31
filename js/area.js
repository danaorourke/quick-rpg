var area = {
	// some nice variables
	config: {
		update: false,
		direction: false
	},
	offset: {x:0,y:0},
	tilesize: {h:32,w:32}, // many elements are x2 by x3
	map: {
		h: 0,
		w: 0,
		tileset: {
			src:'img/plowed_soil.png',
			h: 192,
			w: 96,
			rows: 0,
			cols: 0
		},
		ground: [
			[2,3,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,3],
			[5,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,5,6],
			[16,16,16,16,16,2,3,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,5,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,3,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,1,16,16,16,16,16,5,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,3,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,5,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,3,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,5,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,5,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,3,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
			[2,3,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,3],
			[5,6,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,5,6]
		]
	},
	object: '',
	
	// methods
	animate: function() {
		// loop through any animations in the background.
	},
	update: function() {
		if (this.config.update == true && this.config.direction != false) {
			this.scrollMap();
			console.log(this.config.update+' '+this.config.direction);
			this.config.direction = this.config.update = false;
		}
	},
	init: function() {
		// create garden container
		this.object = document.createElement('div');
		this.object.id = 'garden';
		
		this.getMapSize();
		this.object.style.width = this.map.h+'px';
		this.object.style.height = this.map.h+'px';

		this.getTileSetData();
		if (this.map.hasOwnProperty('ground')) {
			this.renderLayer('ground');
		}
		if (this.map.hasOwnProperty('level')) {}
		if (this.map.hasOwnProperty('above')) {}
		
		// append layer to garden
		
		// return filled garden div
		return this.object;
	},
	scrollMap: function() {
		switch (this.config.direction) {
			case 'north':
			if (this.offset.y < 0) {
				this.offset.y = this.offset.y + this.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			break;
			
			case 'south':
			if (this.offset.y > ((this.map.h-(this.map.h*2))+game.viewport.h)) {
				this.offset.y = this.offset.y - this.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			break;
			
			case 'east':
			if (this.offset.x > ((this.map.w-(this.map.w*2))+game.viewport.w + (this.tilesize.w/2))) {
				this.offset.x = this.offset.x - this.tilesize.h;
				this.object.style.left = this.offset.x+'px';
			}
			break;
			
			case 'west':
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
					tile.style.backgroundPositionX = '-'+((this.map.tileset.rows-1)*this.tilesize.w)+'px';
					tile.style.backgroundPositionY = '-'+((Math.floor(id/this.map.tileset.rows)-1)*this.tilesize.h)+'px';
				} else {
					tile.style.backgroundPositionX = '-'+((v-1)*this.tilesize.w)+'px';
					tile.style.backgroundPositionY = '-'+(Math.floor(id/this.map.tileset.rows)*this.tilesize.h)+'px';
				}
				// append tile to layer
				l.appendChild(tile);
			}
		}
		// append layer to garden
		this.object.appendChild(l);
	},
	getMapSize: function() {
		this.map.h = this.map.ground.length * this.tilesize.h;
		this.map.w = this.map.ground[0].length * this.tilesize.w;
	},
	getTileSetData: function() {
		this.map.tileset.rows = this.map.tileset.w / this.tilesize.w;
		this.map.tileset.cols = this.map.tileset.h / this.tilesize.h;
	}
};