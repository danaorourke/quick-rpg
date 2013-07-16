var play = {
	config: {
		dependancies: [
			{name: 'map', src: 'js/objects/map.js'},
//			{name: 'npc', src: 'js/objects/npc.js'},
			{name: 'plant', src: 'js/objects/plant.js'},
			{name: 'player', src: 'js/objects/player.js'}
		]
	},
	// spool up everything we need - called by game
	init: function(){
		// init the map
		this.map.init('garden');
		// get the map's events, generate based on type
		var e = this.map.getEvents();
		// check each event
		for (i=0;i<e.length;i++) {
			// event is plot - expect a{x,y} b{x,y} plants[ ( type, amount) , etc]
			if (e[i].type === 'plot') {
				// check for subtype first to change behavior.
				// if plot has plants
				var p = [];
				if (e[i].hasOwnProperty('plants')) {
					for (j=0;j<e[i].plants.length;j++) {
						p.push({
							type: e[i].plants[j].type,
							amt: e[i].plants[j].amt,
							loc: {
								a:	{
									x: e[i].a.x,
									y: e[i].a.y
								},
								b:	{
									x: e[i].b.x,
									y: e[i].b.y
								}
							}
						});
					}
				}
				plant.init(p);
			}
		}
/*		for (i=0;i<e.length;i++) {
			if (e[i].type === 'plot') {
				if (e[i].hasOwnProperty('plants') && e[i].plants.length > 0) {
					var x, y;
					for (j=0;j<e[i].plants.length) {
						console.log(e[i].plants[j]);
					}
				}
			}
		}*/
		
		// add the player
		this.player.init();
	},
	animate: function(){
		this.map.animate();
		this.player.animate();
	},
	update: function(){
		this.map.update();
		this.player.update();
	},
	getCollisions: function(loc,dir,amt) {
	// loc = x,y dir = l,r,u,d amt = numeric
		return this.map.getCollisions(loc,dir,amt);
//		var p = this.plant.getCollisions(loc,dir,amt)
		// return plant.getCollisions();
	}
};