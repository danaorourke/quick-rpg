var game = {
	config: {
		started: '',
		frameRate: 1000/20
	},
	canvas: {
		head: null,
		object: null,
		viewport: {h:null,w:null},
	},
	queue: null, // extend idea to create a framework that only creates here in 'game'.
	state: 'play',
	states: {
//		start: {active: false, action: '', object: null},
		play: null
//		pause: {active: false, action: '', object: null} // this needs to be expanded. should contain inventory, journal, map.
	},
	// run to start program.
	init:function(canvas){
		// get initial dependancies, start up game.
		this.canvas.object = document.getElementById(canvas);
		this.canvas.head = document.getElementsByTagName('head')[0];
		this.solidifyStates();
		this.getDependancies();
		this.getViewport();
		
		this.states[this.state].init();
		this.loop();
	},	
	// loop through animations
	animate: function(){
		this.states[this.state].animate();
	},
	// loop through updates
	update: function(){
		// perhaps load the resource the first time it's called for?
			// load play, start to begin
			// load pause, inventory, and sell screen once that's loaded.
		this.states[this.state].update();
	},
	// called by init to start program
	loop: function(){
		var self = this;
		setInterval(function() {self.update();self.animate();}, this.config.frameRate);
	},
	// pass data to create the DOM object for class
	makeNode: function(t){
		//	var o = {wrap: null, id: null, className: null, content: null};
		if (t.hasOwnProperty('wrap') && (t.wrap != null && t.wrap != '')) {
			var o = document.createElement(t.wrap);
			if (t.hasOwnProperty('id') && (t.id != null && t.id != '')) o.id = t.id;
			if (t.hasOwnProperty('className') && (t.className != null && t.id != '')) o.className = t.className;
			if (t.hasOwnProperty('content') && (t.content != null && t.content != '')) o.innerHTML = t.content;
			return o;
		}
	},
	appendToHead: function(o) {
		game.canvas.head.appendChild(o);	
	},
	appendToCanvas: function(o) {
		game.canvas.object.appendChild(o);
	},
	animator: function(that,a,d) {
		var lastFrame = that.sprite.animation.frame;
		var bgPos = that.object.style.backgroundPosition;
		var frames = that.sprite.animations[a][d];
		if (lastFrame <= 2) {
			bgPos = '-'+frames['f_'+lastFrame]['x']+'px -'+frames['f_'+lastFrame]['y']+'px';
			lastFrame++;
		} else if (lastFrame == 3) {
			bgPos = '-'+frames['f_2']['x']+'px -'+frames['f_2']['y']+'px';
			lastFrame++;
		} else if (lastFrame == 4) {
			bgPos = '-'+frames['f_1']['x']+'px -'+frames['f_1']['y']+'px';
			lastFrame++;
		} else if (lastFrame == 5) {
			bgPos = '-'+frames['f_0']['x']+'px -'+frames['f_0']['y']+'px';
			lastFrame = 0;
		}
		// reassign values
		that.sprite.animation.frame = lastFrame;
		that.object.style.backgroundPosition = bgPos;
	},
	// loop through objects for current state and get dependancies
	solidifyStates: function() {
		this.canvas.head = document.getElementsByTagName('head')[0];
		// get the files for the states
		var states = this.getStates();
		for (i=0;i<states.length;i++) {
			var s = states['name'][i].toString();
			var src = 'js/states/'+s+'.js';
			// append the state
			$.ajaxSetup({async:false});
			$.getScript(src,function(data){game['states'][s] = eval(s);});
			$.ajaxSetup({async:true});
		}
	},
	getDependancies: function(){
		var states = this.getStates();
		for (i=0;i<states.length;i++) {
			var s = states['name'][i];
			var o = game['states'][s];
			if (o.hasOwnProperty('config') && o['config'].hasOwnProperty('dependancies')) {
				var dep = o['config']['dependancies'];
				for (j=0;j<dep.length;j++) {
					var name = dep[j]['name'];
					$.ajaxSetup({async:false});
					$.getScript(dep[j]['src'],function(data) {game['states'][s][name] = eval(name);});
					var c = o[name];
					// check for dependancies
					if (c.hasOwnProperty('config') && c.config.hasOwnProperty('dependancies')) {
						var dep2 = c.config.dependancies;
						for (k=0;k<dep2.length;k++) {
							var names = dep2[k].name;
							// get multiple dependancies
							$.getJSON(dep2[k]['src'],function(data) {
								// check for multiple names
								if (Object.prototype.toString.call(names) === '[object Array]') {
									for (p=0;p<names.length;p++) {
										// assign bits of data based on names
										c[names[p]] = data[names[p]];
									}
								} else {
									c[names] = data[names];
								}
							});
						}
					}
					$.ajaxSetup({async:true});
				} // end depth.length for
			}
		} 
	},
	getStates: function() {
		var count = 0;
		var stateNames = [];
		for (var i in this.states) {
			stateNames.push(i);
			count++;
		}
		var o = {length:count,name:stateNames};
		delete(count,stateNames);
		return o;
	},
	getCollisions: function(loc,dir,amt) { // loc = x,y dir = l,r,u,d amt = numeric
		// check for map offset
		if (map.offset.x != 0) loc.x = loc.x + Math.abs(map.offset.x);
		if (map.offset.y != 0) loc.y = loc.y + Math.abs(map.offset.y);
		// get row
		
		if ((loc.y % 32) === 0)	var cur_row = loc.y / 32;
		else var cur_row = Math.floor(loc.y/ 32)+1;
		// get col
		if ((loc.x % 32) === 0) var cur_col = loc.x / 32;
		else var cur_col = Math.floor(loc.x / 32)+1;
		
		// some helpful vars
		var c = {
			id: map.maps[map.map].level,
			pass: map.tilesets[map.maps[map.map].tileset].pass
		};
		var t = {}; var new_col, new_row;
		// check based on direction for each movement increment
		switch (dir) {
			case 'left': 
			for (i=1;i<=amt;i++) {
				if ((loc.x-i) % 32 === 0) new_col = (loc.x-i)/32;
				else new_col = Math.floor((loc.x-i)/32)+1;
				t.id = c.id[cur_row-1][new_col-1];
				t.pass = c.pass[t.id-1];
				//console.log('left -- row:'+cur_row+' col:'+new_col+' id: '+t.id+' pass:'+t.pass);
				if (t.pass === 0 ) return true;
			}
			break;
			case 'right':
			for (i=1;i<=amt;i++) {
				if ((loc.x+i) % 32 === 0) new_col = (loc.x+i)/32;
				else new_col = Math.floor((loc.x+i)/32)+1;
				t.id = c.id[cur_row-1][new_col-1];
				t.pass = c.pass[t.id-1];
				//console.log('right -- row:'+cur_row+' col:'+new_col+' id: '+t.id+' pass:'+t.pass);
				if (t.pass === 0 ) return true;
			}
			break;
			case 'down':
			for (i=1;i<=amt;i++) {
				if ((loc.y+i) % 32 === 0) new_row = (loc.y+i)/32;
				else new_row = Math.floor((loc.y+i)/32)+1;
				t.id = c.id[new_row-1][cur_col-1];
				t.pass = c.pass[t.id-1];
				//console.log('down -- row:'+new_row+' col:'+cur_col+' id: '+t.id+' pass:'+t.pass);
				if (t.pass === 0 ) return true;
			}
			break;
			case 'up':
			for (i=1;i<=amt;i++) {
				if ((loc.y-i) % 32 === 0) new_row = (loc.y-i)/32;
				else new_row = Math.floor((loc.y-i)/32)+1;
				t.id = c.id[new_row-1][cur_col-1];
				t.pass = c.pass[t.id-1];
				//console.log('up -- row:'+new_row+' col:'+cur_col+' id: '+t.id+' pass:'+t.pass);
				if (t.pass === 0 ) return true;
			}
			break;
		}
		return false;
		// get tile for object on level
		//var tile = {};
		//tile.id = map.maps[map.map].level[cur_row][cur_col];
		//tile.pass = map.tilesets[map.maps[map.map].tileset].pass[tile.id];
		//console.log('id:'+tile.id+' pass:'+tile.pass);
		// return true or false
		
		//console.log('X:'+loc.x+' Y:'+loc.y+' Dir:'+dir+' Amt:'+amt);
		//console.log('row:'+row+' col:'+col);
	},
	getViewport: function() {
		this.canvas.viewport.w = this.canvas.object.offsetWidth;
		this.canvas.viewport.h = this.canvas.object.offsetHeight;
	},
	getKeyCode: function(dir) {
		if (dir == 'down') {
			document.onkeyDown = function(e) {
				var key;
				if (document.all) e = window.event;
				if (document.layers || e.which) key = e.which;
				if (document.all) key = e.whichKeycode;
				console.log(key);
				return key;
			}
		}
	}
};