var game = {
	config: {
		root: '',
		frameRate: 1000/20,
		debug: true,
		dependancies: [
			{name: 'assets', src: '/js/world/assets.json'},
			{name: 'mobs', src: '/js/world/mobs.json'}
		]
	},
	started: null,
	state: 'play', // switches to loading if new data needed.
	viewport: {}, // h,w,x,y
	states: {
		play: null
/*
		start
		loading
		inventory
		journal
		map
		saveGame
		loadGame
		newGame
		pause
*/
	},
	
	// boots everything up
	init: function(canvas) {
		// make stylesheet hook and append
		var h = document.getElementsByTagName('head')[0];
		var s = game.makeNode({wrap: 'style', id:'game_styles'});
		h.appendChild(s);
		this.head = document.getElementById('game_styles');
		delete(h,s);
		
		// canvas
		this.canvas = document.getElementById(canvas);
		
		this.solidifyStates();
		this.solidifyDependancies();
		this.setViewport();
		
		// init start state
		this.states[this.state].init();
		
		// start the loop
		var self = this;
		var prevTime = Date.now();
		this.loop = setInterval(function() {
			// set up timer
			var curTime = Date.now();
			var dt = curTime - prevTime;
			prevTime = curTime;
			// call scripts
			self.setViewport();
			self.update(dt);
			self.animate(dt);
			// clean
			delete(curTime,dt);
		}, this.config.frameRate);
	},
	// used by loop
	update: function(dt) {
		this.states[this.state].update(dt);
	},
	// used by loop, animates all the states
	animate: function(dt) {
		this.states[this.state].animate(dt);
	},
	// used by States
	callState: function() {},
	// solidifies the association between states and the game script
	solidifyStates: function() {
		// get the files for the states
		var states = this.getStates();
		var s, src;
		for (i=0;i<states.length;i++) {
			s = states['name'][i].toString();
			src = 'js/states/'+s+'.js';
			// append the state
			$.ajaxSetup({async:false});
			$.getScript(src,function(data){game['states'][s] = eval(s);});
			$.ajaxSetup({async:true});
		}
	},
	// returns state number and names - please clean this up
	getStates: function() {
		var o = {length:0,name:[]};
		for (var i in this.states) {
			o.name.push(i);
			o.length++;
		}
		return o;
	},
	// grabs all necessary dependancies for scripts - should be discluded in production level
	// all files should be minified, but don't worry about that, for now.
	solidifyDependancies: function() {
		// grab the assets
		$.ajaxSetup({async:false});
		var d = game.config.dependancies.length, dep = {};
		for (var i = 0; i < d; i++) {
			// quick set vars
			dep.src = game.config.dependancies[i].src;
			dep.name = game.config.dependancies[i].name;
//			console.log(dep);
			// call json
			$.getJSON(dep.src, function (data) { game[dep.name] = data[dep.name]; });
		}
	
		var states = this.getStates();
		for (var i=0;i<states.length;i++) {
			var s = states['name'][i];
			var o = game['states'][s];
			if (o.hasOwnProperty('config') && o['config'].hasOwnProperty('dependancies')) {
				var dep = o['config']['dependancies'];
				for (var j=0;j<dep.length;j++) {
					var name = dep[j]['name'];
					$.getScript(dep[j]['src'], function(data) {game['states'][s][name] = eval(name);});
					var c = o[name];
					// check for dependancies
					if (c.hasOwnProperty('config') && c.config.hasOwnProperty('dependancies')) {
						var dep2 = c.config.dependancies;
						for (var k=0;k<dep2.length;k++) {
							var names = dep2[k].name;
							// get multiple dependancies
							$.getJSON(dep2[k]['src'], function(data) {
								// check for multiple names
								if (Object.prototype.toString.call(names) === '[object Array]') {
									for (p=0;p<names.length;p++) c[names[p]] = data[names[p]];
								} else c[names] = data[names];
							});
						}
					}

				} // end depth.length for
			}
		}
		$.ajaxSetup({async:true}); 
	},
	// ensures the viewport dimensions are accurate - called each frame
	setViewport: function() {
		this.viewport.w = this.canvas.offsetWidth;
		this.viewport.h = this.canvas.offsetHeight;
		this.canvas.width = this.canvas.style.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.style.height = this.canvas.offsetHeight;
	},
	// makes DOM Nodes, passes them back.
	makeNode: function(o) {
		var ob = document.createElement(o.wrap);
		if (o.wrap === 'style') ob.type = 'text/css';
		if (o.hasOwnProperty('id')) ob.id = o.id;
		if (o.hasOwnProperty('className')) ob.className = o.className;
		if (o.hasOwnProperty('innerHTML')) ob.innerHTML = o.innerHTML;
		if (o.hasOwnProperty('y')) ob.style.top = o.y+'px';
		if (o.hasOwnProperty('x')) ob.style.left = o.x+'px';
		if (o.hasOwnProperty('w')) ob.style.width = o.w+'px';
		if (o.hasOwnProperty('h')) ob.style.height = o.h+'px';
		return ob;
	},
	// adds node to canvas
	appendNode: function(o) {
		this.canvas.appendChild(o);
	},
	setNode: function(node, object) {
		this.states[this.state].sprites[node] = object;
	},
	appendStyles: function(o) {
		this.head.innerHTML += o;
	},
	animator: function(that) {
		// grap sprite styles
		var sprite = this.states[this.state].sprites[that.sprite];
		var h = this.assets.sprites.tile.height;
		// update position
		sprite.style.top = that.y+'px';
		sprite.style.left = that.x+'px';
		sprite.style.zIndex = that.y+h;
		
		// assign z index  based on y
		
		// fix classes
		if (that.animation.name != 'idle') {
			// set the frame
			var frame, lastFrame = that.animation.frame, dir = that.animation.d;
			if (lastFrame < 2) frame = 'fr_0';
			else if (lastFrame < 4) frame = 'fr_1';
			else if (lastFrame < 8) frame = 'fr_2';
			else if (lastFrame < 10) frame = 'fr_1';
			else if (lastFrame < 12) frame = 'fr_0';
			
			// incriment frame appropriately
			if (lastFrame === 11) that.animation.frame = 0;
			else that.animation.frame++;
			
			// assign classes
			if (that.sprite === 'player') {
				sprite.className = dir+' '+frame;
			} else {
				sprite.className = that.type+' '+dir+' '+frame;
			}
			
			// incriment frame
		} else {
			if (that.sprite === 'player') {
				sprite.className = that.animation.d+' fr_1';
			} else {
				sprite.className = that.type+' '+that.animation.d+' fr_1';
			}
		}
	},
	getAsset: function(name) {
		var asset = this.assets.sprites[name];
		asset.h = this.assets.sprites.tile.height;
		asset.w = this.assets.sprites.tile.width;
		return asset;
	},
	makeGeneralStyles: function() {
	// get assets
		// get tile h,w
		var t = {h: this.assets.sprites.tile.height, w: this.assets.sprites.tile.width};
		// get sprite h,w
		var s = {h: this.assets.sprites.height, w: this.assets.sprites.width};
		// get animations - currently assumes one animation with up/down/left/right
		var a = this.assets.sprites.animations;
		var a_key = {length: 0, name: []};
		for (var i in this.assets.sprites.animations) {
			a_key.length++;
			a_key.name.push(i);
		}
	// make animations css
		// create y - each animation
		var styles = "/* Animations */\n";
		for (var i=0;i<a_key.length;i++) {
			styles += "\t."+a_key.name[i]+' {background-position-y: -'+(a[a_key.name[i]].y*t.h)+"px;}\n";
//			console.log(i,a_key.name[i],(a[a_key.name[i]].y*t.h));
		}
		// create x - each frame (assumes 3)
		styles += "/* Frames */\n";
		for (var i=0;i<3;i++) styles += "\t.fr_"+i+' {background-position-x: -'+(i*t.w)+"px;}\n";
		styles += "/* End Generated */ \n";
	// give back to animation loop
		return styles;
	}
};