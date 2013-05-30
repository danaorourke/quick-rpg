var area = {
	// some nice variables
	h: 320, // = 16/h tiles - 20 or 32 = 10
	w: 320,
	tilesize: {h:32,w:32}, // many elements are x2 by x3
	map: {
		tileset: {
			src:'img/plowed_soil.png',
			h: 192,
			w: 96,
			rows: 0,
			cols: 0
		},
		ground: [
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16],
			[16,16,16,16,16,16,16,16,16,16]
		]
	},
	object: '',
	
	// methods
	animate: function() {
		// loop through any animations in the background.
	},
	update: function() {
		// check for events?
	},
	init: function() {
		// create garden container
		this.object = document.createElement('div');
		this.object.id = 'garden';
		this.object.style.width = this.w+'px';
		this.object.style.height = this.h+'px';

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
	renderLayer: function(layer) {
		var l = document.createElement('div');
		l.id = layer;
		
		// for each row
		for (i=0;i<this.map[layer].length;i++) {			
			// get tiles in row
			for (j=0;j<this.map[layer][i].length;j++) {
				var tile = document.createElement('span');
				// create tile
				var id = this.map[layer][i][j];
				console.log(id);
				var v = (id%this.map.tileset.rows);
				console.log(v);
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
	getTileSetData: function() {
		this.map.tileset.rows = this.map.tileset.w / this.tilesize.w;
		this.map.tileset.cols = this.map.tileset.h / this.tilesize.h;
	}
};