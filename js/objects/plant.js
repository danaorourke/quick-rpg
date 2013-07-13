var plant = {
	// declares dependancies - child data, names, for game.getDependancies
	config: { dependancies: [{src: 'js/world/plants.json', name: ["sprite","states","types"]}] },
	// contains all plants
	objects: [], // o - canvas, type, stage (1-5),
	
	init: function(p) {
		this.renderTypes();
		this.canvas = game.makeNode({wrap:'div',id:'plants'});
		// for each var in the array given
		for (i=0;i<p.length;i++) {
			// check that type and amt were passed
			if (p[i].hasOwnProperty('type') && p[i].hasOwnProperty('amt')) {
				// for amount, create object, instantiate object
				for(j=0;j<p[i].amt;j++) this.sprout(p[i].type,j);
			}
		}
		game.appendToCanvas(this.canvas,'map');
	},
	update: function() {},
	animate: function() {},
	
	// create style data
	renderTypes: function() {
		// get map data for size
		var m = map.getMapAttributes(); //console.log(m);
		// base styles
		var style = '#plants {height: '+m.h+'px; position: absolute; width:'+m.w+"px;}\n";
		style += '#plants div {background-image: url(\''+this.sprite.sheet.src+'\'); height: '+this.sprite.h+'px; position: absolute; width: '+this.sprite.w+"px;}\n";
		// create type styles
		var t = {count:0, names:[]};
		for (var i in this.types) {t.names.push(i); t.count++;}
		for (i=0;i<t.count;i++) style += '#plants .'+t.names[i]+' {background-position-x: -' +(this.types[t.names[i]].sprite-1) * this.sprite.w+"px;}\n";
		// create state styles
		var s = {count: 0, names:[]};
		for (var i in this.states) {s.names.push(i); s.count++;}
		for (i=0;i<s.count;i++)	style += '#plants .'+s.names[i]+' {background-position-y: -'+((this.states[s.names[i]]-1)*this.sprite.h)+"px;}\n";
		// create style and append to head
		this.style = document.createElement('style');
		this.style.type = 'text/css';
		this.style.innerHTML = style;
		game.appendToHead(this.style);
	},
	// create new plants, according to type, set to sprout
	sprout: function(t,id) {
		var o = game.makeNode({wrap:'div',id:t+'_'+id, className: t+' sprout'});
		this.objects.push({type: t, id: t+'_'+id, created: Date.now(), stage: 1, object: o});
		// finish styles 
		var m = map.getMapAttributes(); //console.log(m);
		//o.style.top =  Math.floor(Math.random()*(m.h-0))+'px'; // this shouldn't be random. It should be based on nodes in Events.
		//o.style.left = Math.floor(Math.random()*(m.w-0))+'px';
		this.canvas.appendChild(o);
	},
	grow: function() {},
	die: function() {},
	seed: function() {}
};