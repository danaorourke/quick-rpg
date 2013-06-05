var game = {
	config: {
		started: '',
		frameRate: 1000/20
	},
	canvas: {
		object: '',
		viewport: {h:null,w:null},
	},
	objects: [],
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
		this.solidifyStates();
		this.getDependancies();
		
		this.states[this.state].init();
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
	// get asked for resource
	loadResource: function() {},
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
					var c = o[name];
					$.ajaxSetup({async:false});
					$.getScript(dep[j]['src'],function(data) {
						game['states'][s][name] = c = eval(name);
					});
					if (c.hasOwnProperty('config') && c['config'].hasOwnProperty('dependancies')) {
						var dep2 = c['config']['dependancies'];
						for (k=0;k<dep2.length;k++) {
							var name2 = dep2[k]['name'];
							$.getJSON(dep2[k]['src'],function(data) {c[name2] = data[name2];});
						}
					}
					$.ajaxSetup({async:true});
				} // end depth.length for
			} // end o check
		} // end for state.length
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
	getViewport: function() {
		this.canvas.viewport.w = this.canvas.object.offsetWidth;
		this.canvas.viewport.h = this.canvas.object.offsetHeight;
	}
};