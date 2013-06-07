var tileset = {
	head: null,
	style: null,
	canvas: null,
	tileset: {
		img: null,
		name: null,
		root: '/img/',
		src: '',
		h: null,
		w: null
	},
	tile: {h:32,w:32},
	key: null,
	
	init: function(t,w,h) {
		this.tileset.name = t;
		this.tileset.src = this.tileset.root+t+'.png';
		this.tileset.w = w;
		this.tileset.h = h;
		
		this.canvas = document.getElementById('gamespace');
		this.head = document.getElementsByTagName('head')[0];
		
		// get sub elements
		this.makeWrapper();
		this.getTileset();
		this.makeLabels();
		
		// make and append style tag
		var style = this.style;
		this.style = document.createElement('style');
		this.style.innerHTML = style;
		this.style.type = 'text/css';
		this.head.appendChild(this.style);
	},
	getTileset: function() {
		this.tileset.img = document.createElement('img');
		this.tileset.img.id = 'tileset';
		this.tileset.img.src = this.tileset.src;
		this.tileset.img.alt = this.tileset.name;
		this.canvas.appendChild(this.tileset.img);
	},
	makeLabels: function() {
		// create base styles
		this.style = "\n#labels {height:"+this.tileset.h+'px; left: 0; position: absolute; top: 0; width: '+this.tileset.w+"px; z-index: 4;}\n";
		this.style = this.style + '#labels span {color: #ffffff; display: block; float: left; line-height: 32px; height: '+this.tile.h+'px; text-align: center; width:'+this.tile.w+"px;}\n";
		// get maximum number of ids rows * cols
		var max = (this.tileset.h/this.tile.h) * (this.tileset.w/this.tile.w);
		// create all tiles. Spans, with id inside
		for (i=1;i<=max;i++) {
			var t = document.createElement('span');
			t.innerHTML = i;
			this.key.appendChild(t);
		}
		this.canvas.appendChild(this.key);
	},
	makeWrapper: function() {
		this.key = document.createElement('div');
		this.key.id = 'labels';
	}
};