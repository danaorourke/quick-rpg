var game={
	config:{
		started: Date.now(),
		paused:false,
		frameRate:1000/20,
	},
	canvas: '',
	objects: '',
	animate:function(){
		// currently fails if passed only one object
		for (i in this.objects) this.objects[i].animate();
	},
	update:function(){
		// check for collisions	
		var states = [];
		for (i in this.objects) states.push(this.objects[i].state);
		for (i in this.objects) this.objects[i].update();
	},
	loop:function(){
		var self = this;
		setInterval(function() {self.update();self.animate();}, this.config.frameRate);
	},
	init:function(canvas,objects){
		this.canvas = document.getElementById(canvas);
		// to do create objects from json file - this may also include all the necessary sub-pages
		this.objects = objects;
		for(i in this.objects) {
			var o = this.objects[i].init();
			if (o != false) {
				this.canvas.appendChild(o);
			}
		}
		// start loop
		this.loop();
	}
};

// movement - expand to include distance, too.
function move(self,direction,amt) {
	var b_h = garden.h - self.sprite.h -4;
	var b_w = garden.w - self.sprite.w -4;

	switch (direction) {
		case 'up':
		if (self.location.y >= 1) {
			self.location.y = self.location.y-amt;
			self.object.style.top = self.location.y+'px';
		}
		break;
		
		case 'right':
		if (self.location.x < b_w) {
			self.location.x = self.location.x+amt;
			self.object.style.left = self.location.x+'px';
		}
		break;
		
		case 'down':
		if (self.location.y < b_h) {
			self.location.y = self.location.y+amt;
			self.object.style.top = self.location.y+'px';
		}
		break;
		
		case 'left':
		if (self.location.x >= 1) {
			self.location.x = self.location.x-amt;
			self.object.style.left = self.location.x+'px';
		}
		break;
	};
};
// this needs overhauling. the code is inelegant.
function animator(self,action,direction) {
	switch (self.sprite.animation.frame) {
		case 0:
		self.object.style.backgroundPosition = '-'+self.sprite.animations[action][direction]['f_0']['x']+'px -'+self.sprite.animations[action][direction]['f_0']['y']+'px';
		self.sprite.animation.frame = 1;
		break;

		case 1:
		self.object.style.backgroundPosition = '-'+self.sprite.animations[action][direction]['f_1']['x']+'px -'+self.sprite.animations[action][direction]['f_1']['y']+'px';
		self.sprite.animation.frame = 2;
		break;
		
		case 2:
		self.object.style.backgroundPosition = '-'+self.sprite.animations[action][direction]['f_2']['x']+'px -'+self.sprite.animations[action][direction]['f_2']['y']+'px';
		self.sprite.animation.frame = 3;
		break;
		
		case 3:
		self.object.style.backgroundPosition = '-'+self.sprite.animations[action][direction]['f_2']['x']+'px -'+self.sprite.animations[action][direction]['f_2']['y']+'px';
		self.sprite.animation.frame = 4;
		break;
		
		case 4:
		self.object.style.backgroundPosition = '-'+self.sprite.animations[action][direction]['f_1']['x']+'px -'+self.sprite.animations[action][direction]['f_1']['y']+'px';
		self.sprite.animation.frame = 5;
		break;
		
		case 5:
		self.object.style.backgroundPosition = '-'+self.sprite.animations[action][direction]['f_0']['x']+'px -'+self.sprite.animations[action][direction]['f_0']['y']+'px';
		self.sprite.animation.frame = 0;
		break;
	};
};