var map = {
	config: {
		dependancies: [
			{src: 'js/world/maps.json', name: ["maps","tilesets"]}
		]
	},
	events: {
		flag: false,
		direction: {up: false, down:false, right: false, left: false}	
	},
	offset: {x:0,y:0},
	canvas: {
		object: null,
		style: null
	},
	// dataset, all maps - from json
	maps: null,
	obstacles: null,
	tilesets: null, // tilesets = src, pass, h, w, computed cols, rows
	// current map to get, defaults to barren
	map: 'barren',
	
	// framework requisite
	init: function(name) {
		// check for existing element and remove it?
		this.map = name;
		this.getMapDetails();
		this.renderTileset();
		
		this.canvas.object = game.makeNode({wrap:'div',id:'map'});
		
		if (this.maps[this.map].hasOwnProperty('ground')) this.renderLayer('ground');
		if (this.maps[this.map].hasOwnProperty('level')) this.renderLayer('level');
		if (this.maps[this.map].hasOwnProperty('above')) this.renderLayer('above');
		
		game.appendToCanvas(this.canvas.object);
	},
	animate: function() {},
	update: function() {
		if (this.events.flag) this.scrollMap();
	},
	
	// for updating and scrolling map
	queueScroll: function(d) {
		if (d == 'up') this.events.direction.up = true;
		else if (d == 'down') this.events.direction.down = true;
		else if (d == 'right') this.events.direction.right = true;
		else if (d == 'left') this.events.direction.left = true;
		this.events.flag = true;
	},
	scrollMap: function() {
		// check up and resolve
		if (this.events.direction.up) {
			if (this.offset.y < 0) {
				this.offset.y += this.tilesets.tile.h;
				this.canvas.object.style.top = this.offset.y+'px';
			}
			this.events.direction.up = false;
		}
		// check down and resolve
		if (this.events.direction.down) {
			if (this.offset.y > ((this.maps[this.map]['h']-(this.maps[this.map]['h']*2))+game.canvas.viewport.h)) {
				this.offset.y -= this.tilesets.tile.h;
				this.canvas.object.style.top = this.offset.y+'px';
			}
			this.events.direction.down = false;
		}
		// check right and resolve
		if (this.events.direction.right) {
			if (this.offset.x > ((this.maps[this.map]['w']-(this.maps[this.map]['w']*2))+game.canvas.viewport.w + (this.tilesets.tile.w/2))) {
				this.offset.x -= this.tilesets.tile.h;
				this.canvas.object.style.left = this.offset.x+'px';
			}
			this.events.direction.right = false;		
		}
		// check left and resolve
		if (this.events.direction.left) {
			if (this.offset.x < 0) {
				this.offset.x += this.tilesets.tile.h;
				this.canvas.object.style.left = this.offset.x+'px';
			}
			this.events.direction.left = false;
		}
		// kill update queue
		this.events.flag = false;
	},
	// given to player
	getMapAttributes: function(){
		var m = {
			h: this.maps[this.map].h,
			w: this.maps[this.map].w,
			t: {
				h: this.tilesets[this.maps[this.map].tileset].h,
				w: this.tilesets[this.maps[this.map].tileset].w
			}
		};
		return m;
	},
	// for loading and rendering maps
	getMapDetails: function() {
		var tileset = this.maps[this.map].tileset;
		this.maps[this.map].h = this.maps[this.map].ground.length * this.tilesets.tile.h;
		this.maps[this.map].w = this.maps[this.map].ground[0].length * this.tilesets.tile.w;
		this.tilesets[tileset].rows = this.tilesets[tileset].w / this.tilesets.tile.w;
		this.tilesets[tileset].cols = this.tilesets[tileset].h / this.tilesets.tile.h;
	},
	renderTileset: function() {
		// tileset now referred to by name in map.
		var ts_name = this.maps[this.map].tileset;
		var tileset = this.tilesets[ts_name];
		var map = this.maps[this.map];

		this.style = document.createElement('style');
		this.style.type = 'text/css';
		
		style = '#map {height:'+map.h+'px; overflow: auto; position: absolute; width:'+map.w+"px;}\n";
		style += '#map div {display: block; height:'+map.h+'; left: 0; position: absolute; top: 0; width: '+map.w+"px;}\n";
		style += '#map .'+ts_name+" span {background-image: url('/"+tileset.src+"'); display: block; float: left; height:"+this.tilesets.tile.h+'px; width:'+this.tilesets.tile.w+"px;}\n";
		style += '#map .'+ts_name+" .blank {background-image: none;}\n";

		// each tileid
		var max = tileset.cols * tileset.rows;
		for (id=1;id<=max;id++) {
			style += '	#map .'+ts_name+' .t_'+id+' {background-position: ';
			var r = (id%tileset.rows);
			if (r == 0) style += '-'+((tileset.rows-1)*this.tilesets.tile.w)+'px -'+((Math.floor(id/tileset.rows-1)*this.tilesets.tile.h))+'px';
			else style += '-'+((r-1)*this.tilesets.tile.w)+'px -'+(Math.floor(id/tileset.rows)*this.tilesets.tile.h)+'px';
			style += ";}\n";			
			// save id as pass value
//			console.log(id+': '+tileset.pass[id-1]);
			//console.log(i);
		}
		this.style.innerHTML = style;
		game.appendToHead(this.style);
	},
	renderLayer: function(name) {
		var layer = game.makeNode({wrap:'div',id:name, className: this.maps[this.map].tileset});
	//	console.log(layer);
		var l = this.maps[this.map][name];
		// for each row
		for (i=0;i<l.length;i++) {
			// for each tile
			for (j=0;j<l[i].length;j++) {
				var tile;
				if (l[i][j] == 0) tile = {wrap:'span',className:'blank'};
				else tile = {wrap:'span',className:'t_'+l[i][j]};
				tile = game.makeNode(tile);
				layer.appendChild(tile);
			}
		}
		this.canvas.object.appendChild(layer);
	}
};