// i need to pull in the pass data!!
var tileset = {
	canvas: {
		head: null,
		style: null,
		object: null,
		wrap: null,
		img: null,
		id_key: null,
		pass_key: null
	},
	controlls: {
		show: {
			o: null,
			last: null	
		}
	},
	name: null,
	tilesets: null,
	
	init: function(t) {
		this.name = t;
		this.canvas.object = document.getElementById('gamespace');
		this.canvas.head = document.getElementsByTagName('head')[0];
		this.getTilesets();
		this.getTileset();
		this.initInterface();
		this.makeStyles();
	},
	initInterface: function() {
		this.controlls.show.o = document.getElementsByName('show');
		//console.log(this.controlls.show.o);
		this.controlls.show.o.onclick = function() {
			console.log('click');
			for (i=0;i<this.controlls.show.o.length;i++) {
				console.log(this.controlls.show.o[i]);
			}
		};
		
		//this.controlls.show.o.onclick = function() {
		//	console.log(this.controlls.show.o.value);
		//};
		/*$('#c_tile').onclick = function() {
			console.log('hi');
			var c = document.getElementById('c_tile');
			console.log(c);
			if (c.checked != tileset.controlls.ids) {
				tileset.controlls.ids = c.selected;
				var key = document.getElementById('ids');
				console.log(key);
				console.log(c.checked);
				if (c.checked == 'checked') {
					key.style.display = 'block';
				} else {
					key.style.display = 'none';
				}
				console.log(key.style.display);
			}
		};
		$('#c_pass').change(function() {
			
		});*/
	},
	getTilesets: function() {
		$.ajaxSetup({async:false});
		$.getJSON('/js/world/maps.json', function(data) {
			tileset.tilesets = data.tilesets;
		});
		$.ajaxSetup({async:true});
	},
	makeWrapper: function() {
		this.canvas.wrap = document.createElement('div');
		this.canvas.wrap.className = 'tileset';
		this.canvas.wrap.id = 't_'+this.name;
	},
	getTileset: function() {
		this.makeWrapper();
		this.makeTileset();
		this.makeKeys();
		this.canvas.object.appendChild(this.canvas.wrap);
	},
	makeTileset: function() {
		var ts = this.tilesets[this.name];
		this.tilesets[this.name].cols = ts.w / this.tilesets.tile.w;
		this.tilesets[this.name].rows = ts.h / this.tilesets.tile.h;
		this.canvas.img = document.createElement('img');
		this.canvas.img.id = this.name;
		this.canvas.img.src = '/'+ts.src;
		this.canvas.img.alt = 'tileset '+this.name;
		this.canvas.img.className = 'tileset';
		this.canvas.wrap.appendChild(this.canvas.img);
		this.style = '#t_'+this.name+'.tileset {height: '+ts.h+'px; position: relative; width:'+ts.w+"px;}\n";
	},
	makeKeys: function() {
		this.style += '.key {height:'+this.tilesets[this.name].h+'px; left: 0; position: absolute; top:0; width: '+this.tilesets[this.name].w+"px;}\n";
		this.style += '.key span {display: block; color: #CCCCCC; float: left; height: '+this.tilesets.tile.h+'px; line-height: '+this.tilesets.tile.h+'px; text-align: center; width: '+this.tilesets.tile.w+"px;}\n";
		this.makeIDKey();
		this.makePassKey();
	},
	makePassKey: function() {
		this.canvas.pass_key = document.createElement('div');
		this.canvas.pass_key.id = 'pass';
		this.canvas.pass_key.className = 'key';
		this.makeLabels('pass_key');
		this.canvas.wrap.appendChild(this.canvas.pass_key);
	},
	makeIDKey: function() {
		this.canvas.id_key = document.createElement('div');
		this.canvas.id_key.id = 'ids';
		this.canvas.id_key.className = 'key';
		this.makeLabels('id_key');
		this.canvas.wrap.appendChild(this.canvas.id_key);
	},
	makeLabels: function(o) {
		var tileset = this.tilesets[this.name];
		var max = tileset.rows*tileset.cols;
		for (i=1;i<=max;i++) {
			var t = document.createElement('span');
			if (o == 'id_key') t.innerHTML = i;
			else if (o == 'pass_key') t.innerHTML = this.tilesets[this.name].pass[i-1];
			this.canvas[o].appendChild(t);
		}
	},
	makeStyles: function() {
		var style = this.style;
		this.canvas.style = document.createElement('style');
		this.canvas.style.type = 'text/css';
		this.canvas.style.innerHTML = style;
		this.canvas.head.appendChild(this.canvas.style);
	}
};