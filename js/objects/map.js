var map = {
	config: {
		dependancies: [
			{name: 'maps', src: 'js/world/maps.json'}
		]
	},
	update: {
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
	// current map to get, defaults to barren
	map: 'barren',
	
	// framework requisite
	init: function(name) {
		// check for existing element and remove it?
		this.map = name;
		this.getMapDetails();
		this.renderStyles();
		
		this.canvas.object = game.makeNode({wrap:'div',id:'map'});
		
		this.renderLayer('ground');
		
		game.appendToCanvas(this.canvas.object);
	},
	animate: function() {},
	update: function() {
		if (this.update.flag) this.scrollMap();
	},
	
	// for updating and scrolling map
	queueScroll: function(d) {
		if (d == 'up') this.update.direction.up = true;
		else if (d == 'down') this.update.direction.down = true;
		else if (d == 'right') this.update.direction.right = true;
		else if (d == 'left') this.update.direction.left = true;
		this.update.flag = true;
	},
	scrollMap: function() {
		// check up and resolve
		if (this.update.direction.up) {
			if (this.canvas.offset.y < 0) {
				this.offset.y += this.maps.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			this.update.direction.up = false;
		}
		// check down and resolve
		if (this.update.direction.down) {
			if (this.offset.y > ((this.maps[this.map]['h']-(this.maps[this.map]['h']*2))+game.canvas.viewport.h)) {
				this.offset.y -= this.maps.tilesize.h;
				this.object.style.top = this.offset.y+'px';
			}
			this.update.direction.down = false;
		}
		// check right and resolve
		if (this.update.direction.right) {
			if (this.offset.x > ((this.maps[this.map]['w']-(this.maps[this.map]['w']*2))+game.canvas.viewport.w + (this.maps.tilesize.w/2))) {
				this.offset.x -= - this.maps.tilesize.h;
				this.object.style.left = this.offset.x+'px';
			}
			this.update.direction.right = false;		
		}
		// check left and resolve
		if (this.update.direction.left) {
			if (this.offset.x < 0) {
				this.offset.x += this.maps.tilesize.h;
				this.object.style.left = this.offset.x+'px';
			}
			this.update.direction.left = false;
		}
		// kill update queue
		this.update.flag = false;
	},
	
	// for loading and rendering maps
	getMapDetails: function() {
		this.maps[this.map].h = this.maps[this.map].ground.length * this.maps.tilesize.h;
		this.maps[this.map].w = this.maps[this.map].ground[0].length * this.maps.tilesize.w;
		this.maps[this.map].tileset.rows = this.maps[this.map].tileset.w / this.maps.tilesize.w;
		this.maps[this.map].tileset.cols = this.maps[this.map].tileset.h / this.maps.tilesize.h;
	},
	renderStyles: function() {
		this.style = document.createElement('style');
		this.style.type = 'text/css';

		style = "#map {overflow: auto; height: "+this.maps[this.map].h+"px; width: "+this.maps[this.map].w+"px;}";
		style += "#map div {display: block; height: "+this.maps[this.map].h+"px; left: 0; position: absolute; top: 0; width: "+this.maps[this.map].w+"px;}\n";
		style += "	#map span {background-image: url('/"+this.maps[this.map].tileset.src+"'); display: block; float: left; height: "+this.maps.tilesize.h+"px; width: "+this.maps.tilesize.w+"px;}\n";
		style += "	#map .blank {background-image: none;}\n";

		// each tileid
		var tileset = this.maps[this.map].tileset;
		var max = tileset.cols * tileset.rows;
		for (i=1;i<=max;i++) {
			style += '	#map .t_'+i+' {background-position: ';
			var r = (i%tileset.rows);
			if (r == 0) {
				style += '-'+((tileset.rows-1)*this.maps.tilesize.w)+'px -'+((Math.floor(i/tileset.rows-1)*this.maps.tilesize.h))+'px';
			} else {
				style += '-'+((r-1)*this.maps.tilesize.w)+'px -'+(Math.floor(i/tileset.rows)*this.maps.tilesize.h)+'px';
			}
			style += ";}\n";
		}
		this.style.innerHTML = style;
		game.appendToHead(this.style);
	},
	renderLayer: function(name) {
		var layer = game.makeNode({wrap:'div',id:name});
	//	console.log(layer);
		var l = this.maps[this.map][name];
		// for each row
		for (i=0;i<l.length;i++) {
			// for each tile
			for (j=0;j<l[i].length;j++) {
				var tile;
				if (l[i][j] == 0) {
					tile = {wrap:'span',className:'blank'};
				} else {
					tile = {wrap:'span',className:'t_'+l[i][j]};
				}
				tile = game.makeNode(tile);
				layer.appendChild(tile);
			}
		}
		this.canvas.object.appendChild(layer);
	}
};