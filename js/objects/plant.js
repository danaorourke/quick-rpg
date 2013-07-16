var plant = {
	// declares dependancies - child data, names, for game.getDependancies
	config: { dependancies: [{src: 'js/world/plants.json', name: ["sprite","states","types"]}] },
	// contains all plants
	objects: [], // o - canvas, type, stage (1-5),
	
	init: function(plants) {
		this.renderTypes();
		this.canvas = game.makeNode({wrap:'div',id:'plants'});
		var p, c;
		var m = map.getMapAttributes(); //console.log(m);
		// for each var in the array given
		for (var i=0;i<plants.length;i++) {
			p = plants[i];
			// check that type and amt were passed - rewrite to default to 1, loc 
			if (p.hasOwnProperty('type') && p.hasOwnProperty('amt') && p.hasOwnProperty('loc')) {
				for (j=0;j<p.amt;j++) {
					console.log('iteration:'+j+' line 21');
					// generate a location based on the bounds
					var loc = { self: true};
					loc.x = Math.floor(Math.random()*(p.loc.b.x-p.loc.a.x)+p.loc.a.x)*m.t.t.w - this.sprite.w;
					loc.y =Math.floor(Math.random()*(p.loc.b.y-p.loc.a.y)+p.loc.a.x)*m.t.t.h - this.sprite.h;
					c = this.getCollisions(loc);
					console.log("\tc started as "+c+'.');
					while (c) {
						loc.x = Math.floor(Math.random()*(p.loc.b.x-p.loc.a.x)+p.loc.a.x)*m.t.t.w - this.sprite.w;
						loc.y = Math.floor(Math.random()*(p.loc.b.y-p.loc.a.y)+p.loc.a.x)*m.t.t.h - this.sprite.h;
						c = this.getCollisions(loc);
						console.log('self is '+loc.self);
						console.log("\tc is "+c+" this iteration of while.");
					}
					this.sprout(p.type,j,loc);
				}
			}
		}
		game.appendToCanvas(this.canvas,'map');
	},
	update: function() {},
	animate: function() {},
	// get those collisions
	getCollisions: function(o) { // o = {x,y,self}
		console.log("\tgetCollisions says values are "+o.x+', '+o.y);
		if (o.hasOwnProperty('self') && o.self === true) {
		// collisions requested from self, typicaly during creation. Only need to check one layer.
			for (k=0;k<this.objects.length;k++) {	
				console.log("\ti: "+k+' objects:'+this.objects.length);
				if (o.x === this.objects[k].loc.x && o.y === this.objects[k].loc.y) {
					console.log("\treturned true on "+k+' x:'+this.objects[k].loc.x+' y:'+this.objects[k].loc.y);
					return true;
				}
			}
		}  else {
			// collisions requested from elsewhere
		}
			/*				if ((o.x > this.objects[i].loc.x && o.x < (this.objects[i].loc.x + this.sprite.w)) && (o.y > this.objects[i].loc.y && o.y < (this.objects[i].loc.y + this.sprite.h))) c++;
				p = {
					a: {
						x: o.x > this.objects[i].loc.x,
						y: o.y > this.objects[i].loc.y
					},
					b: {
						x: o.x < (this.objects[i].loc.x + this.sprite.w),
						y: o.y < (this.objects[i].loc.y + this.sprite.h)
					}
				};
				if ( ((p.a.x && p.a.y) && (p.b.x && p.b.y)) || () ) c++;*/
		console.log("\treturn false line 83");
		return false;
	},
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
	sprout: function(t,id,l) {
		var o = game.makeNode({wrap:'div',id:t+'_'+id, className: t+' sprout'});
		// adjust for height of individual sprout
		o.style.top = l.y+'px';
		o.style.left = l.x+'px';
		this.objects.push({type: t, created: new Date().getTime(), stage: 1, object: o, loc: l});
		this.canvas.appendChild(o);
	},
	grow: function() {},
	die: function() {},
	seed: function() {}
};