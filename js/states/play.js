var play = {
	config: {
		dependancies: [
			{name: 'map', src: 'js/objects/map.js'},
//			{name: 'npc', src: 'js/objects/npc.js'},
			{name: 'player', src: 'js/objects/player.js'}
		]
	},
	map: null,
	player: null,
	
	// necessary
	init: function(){
		this.map.init('barren');
		this.player.init();
	},
	animate: function(){
		this.map.animate();
		this.player.animate();
	},
	update: function(){
		this.map.update();
		this.player.update();
	}
};