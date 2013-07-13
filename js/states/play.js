var play = {
	config: {
		dependancies: [
			{name: 'map', src: 'js/objects/map.js'},
//			{name: 'npc', src: 'js/objects/npc.js'},
			{name: 'plant', src: 'js/objects/plant.js'},
			{name: 'player', src: 'js/objects/player.js'}
		]
	},
	init: function(){
		this.map.init('garden');
		this.player.init();
		this.plant.init([ {type:"corn", amt:6}, {type:"carrot", amt: 10} ]);
	},
	animate: function(){
		this.map.animate();
		this.player.animate();
		this.plant.update();
	},
	update: function(){
		this.map.update();
		this.player.update();
		this.plant.update();
	},
	getCollisions: function(loc,dir,amt) {
	// loc = x,y dir = l,r,u,d amt = numeric
		return map.getCollisions(loc,dir,amt);
		// return plant.getCollisions();
	}
};