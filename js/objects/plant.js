var plant = {
	// declares dependancies - child data, names, for game.getDependancies
	config: { dependancies: [{src: 'js/world/plants.json', name: ["sprite","stages","types"]}] },
	events: {
		flag: false,
		
	},
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
				for (var j=0;j<p.amt;j++) {
					// generate a location based on the bounds
					var loc = {self: true};
					loc.x = Math.floor(Math.random()*(p.loc.b.x-p.loc.a.x)+p.loc.a.x)*m.t.t.w - this.sprite.w;
					loc.y = Math.floor(Math.random()*(p.loc.b.y-p.loc.a.y)+p.loc.a.y)*m.t.t.h - this.sprite.h;
					c = this.getCollisions(loc);
					while (c) {
						loc.x = Math.floor(Math.random()*(p.loc.b.x-p.loc.a.x)+p.loc.a.x)*m.t.t.w - this.sprite.w;
						loc.y = Math.floor(Math.random()*(p.loc.b.y-p.loc.a.y)+p.loc.a.y)*m.t.t.h - this.sprite.h;
						c = this.getCollisions(loc);
					}
					this.sprout(p.type,j,loc);
					delete(loc);
				}
			}
		}
		delete(p,c,m);
		game.appendToCanvas(this.canvas,'map');
	},
	update: function() {
		var now =  Math.floor(new Date().getTime()/1000);
		for (var i=0;i<this.objects.length;i++) {
			if (this.objects[i].stage < 4) {
				if ((now - this.objects[i].created) >= ((2*this.objects[i].stage)*this.types[this.objects[i].type].cycle)) this.grow(i);
			} else if (this.objects[i].stage === 4) {
				//
			} else {
				// check for renew - or die or restart from bud stage.
			}
		}
	},
	animate: function() {},
	// get those collisions
	getCollisions: function(o,d,amt) { // o = {x,y,h,w,self}
		if (o.hasOwnProperty('self') && o.self === true) {
			for (var k=0;k<this.objects.length;k++) {
				if (o.x === this.objects[k].loc.x && o.y === this.objects[k].loc.y) return true;
			}
		} else {		
			if (typeof d != 'undefined') {
				if (typeof amt === 'undefined') var amt = 1;
				var check = {};
				var p = {};

				if (d === 'up' || d === 'down') {
					check.x = '(p.x <= o.x && (p.x+p.w) >= o.x) || (p.x <= (o.x+o.w) && (p.x+p.w) >= (o.x+o.w))';
					if (d === 'up') check.y = 'p.y+p.h === o.y-a';
					else check.y = 'p.y === o.y+o.h+a';
				}
				if (d === 'left' || d === 'right') {
					check.y = '(p.y <= o.y && (p.y + p.h) >= o.y) || (p.y <= (o.y+o.h) && (p.y + p.h) >= (o.y+o.h))';					
					if (d === 'left') check.x = 'p.x+p.w === o.x-a';
					else check.x = 'p.x === o.x+o.w+a';
				}
				for (var i=0; i < this.objects.length; i++) {
					p = {
						x: this.objects[i].loc.x + this.sprite.offset.w,
						y: this.objects[i].loc.y + this.sprite.offset.h,
						h: this.sprite.h-this.sprite.offset.h,
						w: this.sprite.w-this.sprite.offset.w
					};
					for (var a=1;a<=amt;a++) {
						if ( (eval(check.y) && eval(check.x))) return true;
					}
				}
			}
		}
		delete(o,d,amt);
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
		for (var i=0;i<t.count;i++) style += '#plants .'+t.names[i]+' {background-position-x: -' +(this.types[t.names[i]].sprite-1) * this.sprite.w+"px;}\n";
		
		// create state styles
		for (var i=0;i<=this.stages.length;i++) style += '#plants .'+this.stages[i]+' {background-position-y: -'+((i)*this.sprite.h)+"px;}\n";
		//var s = {count: 0, names:[]};
		//for (var i in this.states) {s.names.push(i); s.count++;}
		//for (i=0;i<s.count;i++)	style += '#plants .'+s.names[i]+' {background-position-y: -'+((this.states[s.names[i]]-1)*this.sprite.h)+"px;}\n";
		
		// create style and append to head
		this.style = document.createElement('style');
		this.style.type = 'text/css';
		this.style.innerHTML = style;
		game.appendToHead(this.style);
	},
	// create new plants, according to type, set to sprout
	sprout: function(t,id,l) {
		var o = game.makeNode({wrap:'div',id:t+'_'+id, className: t+' sprout'});
		var top = game.makeNode({wrap:'span',className:'top'});
		var bot = game.makeNode({wrap:'span',className:'bot'});
		// adjust for height of individual sprout
		o.style.top = l.y+'px';
		o.style.left = l.x+'px';
		o.appendChild(top);
		o.appendChild(bot);
		this.objects.push({type: t, created: Math.floor(new Date().getTime()/1000), stage: 1, object: o, loc: l});
		this.canvas.appendChild(o);
	},
	grow: function(id) {
		this.objects[id].stage++;
	//	console.log('id:'+id+' stage:'+this.stages[this.objects[id].stage-1]);
		this.objects[id].object.className = this.objects[id].type+' '+this.stages[this.objects[id].stage-1];
	},
	die: function() {},
	seed: function() {}
};