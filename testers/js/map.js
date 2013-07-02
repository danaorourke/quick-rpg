// tests a flat map. Does not render enemy nodes.
var game = {
	name: null,
	map: map, // to contain object
	config: {rows: null, cols: null, h: null, w: null},
	canvas: {
		offset: {x:27, y:10, d_x:27, d_y:10},
		object: null,
		map: null, // contains map elements
		key: {
			horz: null,
			vert: null,
			horz_list: null,
			vert_list: null,
			mouse: null
		},
		head: null
	},
	controlls: {
		scroll: {
			horz: document.getElementById('horizontal'),
			horz_last: 27,
			vert: document.getElementById('vertical'),
			vert_last: 10
		},
		colors: {
			all: document.getElementById('color_all'),
			below: document.getElementById('color_below'),
			level: document.getElementById('color_level'),
			above: document.getElementById('events')
		},
		layers: {
			all: document.getElementById('layer_all'),
			below: document.getElementById('layer_below'),
			level: document.getElementById('layer_level'),
			above: document.getElementById('layer_event')
		}
		// add events
	},
	
	// run the whole thing
	init: function(name) {
		this.name = name;
		this.canvas.object = document.getElementById('viewport');
		this.canvas.head = document.getElementsByTagName('head')[0];

		this.getMaps();
		this.map.init(this.name);
		this.makeLabels();
		this.canvas.map = document.getElementById('map');
		
		// poke the interface
		this.scrollMap();
		this.createTooltip();
	//	this.manageLayers();
	//	this.manageEvents();
	//	this.manageColors();
	},
	// makes the labels
	makeLabels: function() {
		// horizontal key
		this.canvas.key.horz = document.getElementById('horz');
		this.canvas.key.horz_list = document.getElementsByName('horz_list')[0];
		// vertical key
		this.canvas.key.vert = document.getElementById('vert');
		this.canvas.key.vert_list = document.getElementsByName('vert_list')[0];
		
		this.controlls.scroll.vert.max = this.config.rows = this.map.maps[this.name].ground.length;
		this.controlls.scroll.horz.max = this.config.cols = this.map.maps[this.name].ground[0].length;

		this.config.h = this.config.rows*32;
		this.config.w = this.config.cols*32;
		
		// labels
		for (i=1;i<=this.config.cols;i++) {
			// user label
			var t = {wrap: 'span', className: 'row_'+i, content: i};
			t = this.makeNode(t);
			this.canvas.key.horz.appendChild(t);
			// datalist
			var d = document.createElement('option');
			d.value = i;
			this.canvas.key.horz_list.appendChild(d);
		}
		// user labels & datalist
		for (i=1;i<=this.config.rows;i++) {
			// user label
			var t = {wrap: 'span', className: 'col_'+i, content: i};
			t = this.makeNode(t);
			this.canvas.key.vert.appendChild(t);
			// datalist
			var d = document.createElement('option');
			d.value = i;
			this.canvas.key.vert_list.appendChild(d);
		}
	},
	// listens for horz, vert scrolls
	scrollMap: function() {
		$('#horizontal').change(function(){
			var o = game.canvas.object;
			var cur = parseInt(document.getElementById('horizontal').value);
			var last = game.controlls.scroll.horz_last;
		
			if (cur != last) {		
				if (cur >= game.canvas.offset.d_x && cur <= game.config.cols) {
					game.canvas.key.horz.style.left = game.canvas.map.style.left = '-'+((cur - game.canvas.offset.d_x)*32)+'px';
				}
				game.controlls.scroll.horz_last = game.canvas.offset.x = cur;
			}
		});
		$('#vertical').change(function(){
			// scroll map
			var o = game.canvas.object;
			var cur = parseInt(document.getElementById('vertical').value);
			var last = game.controlls.scroll.vert_last;
			if (cur != last) {
				if (cur >= game.canvas.offset.d_y && cur <= game.config.rows) {
					game.canvas.key.vert.style.top = game.canvas.map.style.top = '-'+((cur - game.canvas.offset.d_y)*32)+'px';
				}
				game.controlls.scroll.vert_last = game.canvas.offset.y = cur;
			}
		});
	},
	createTooltip: function() {
		$('#map span').hover(function() {
			$(this).addClass('selected');
		}, function() {
			$(this).removeClass('selected');
		});
	},
	// manages the layer inputs
//	manageLayers: function() {},
	// manages the events inputs
//	manageEvents: function() {},
	// manages the colors inputs
//	manageColors: function() {},
	// disables children checkboxes
//	disableChildren: function() {},

	// REPLACEMENT FUNCTIONS FOR GAME BELOW
	// get the json for map
	// fie - hard coded
	getMaps: function() {
		$.ajaxSetup({async:false});
		$.getJSON('/js/world/maps.json', function(data){
			game.map.maps = data.maps;
			game.map.tilesets = data.tilesets;
	//		console.log(data);
		}).fail(function(jqxhr, textStatus, error){
			console.log('Request Failed: '+textStatus+', '+error);
		});
		$.ajaxSetup({async:true});
	},
	appendToCanvas: function(o) {
		// expects only map. Yeah, I hard coded it.
		game.canvas.object.appendChild(o);
	},
	appendToHead: function(o) {
		game.canvas.head.appendChild(o);
	},
	// the below are copied from game. do this cleaner next test, will ya?
	makeNode: function(t){
		//	var o = {wrap: null, id: null, className: null, content: null};
		if (t.hasOwnProperty('wrap') && (t.wrap != null && t.wrap != '')) {
			var o = document.createElement(t.wrap);
			if (t.hasOwnProperty('id') && (t.id != null && t.id != '')) o.id = t.id;
			if (t.hasOwnProperty('className') && (t.className != null && t.id != '')) o.className = t.className;
			if (t.hasOwnProperty('content') && (t.content != null && t.content != '')) o.innerHTML = t.content;
			return o;
		}
	}
};