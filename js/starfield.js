/*
	Starfield lets you take a div and turn it into a starfield.

*/

//	Define the starfield class.
function Starfield(w,h) {
	this.fps = 60;
	this.canvas = null;
	this.width = w;
	this.height = h;
	/*this.minVelocity = 15;
	this.maxVelocity = 30;*/
	this.minVelocity = Math.random()*30;
	this.maxVelocity = Math.random()*40 + this.minVelocity;	
	this.stars = 200;
	this.intervalId = 0;
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function(div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	//self.width = window.innerWidth;
	//self.height = window.innerHeight;

	window.addEventListener('resize', function resize(event) {
		self.width = div.offsetWidth;
		self.height = div.offsetHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {

	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*1+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;
    
	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.x -= dt * star.velocity;
        
        /*if(star.opacity > 1){
            star.opacity = 1;
        }else if(star.opacity == 1){
            star.increase *= -1;
        }else if(star.opacity < 0){
            star.opacity = 0;
        }else if(star.opacity == 0){
            star.increase *= -1;
        }*/

        //star.opacity += dt * star.increase;
        
        star.opacity -= (Math.random() * dt) / 8;
        
		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if(star.x < 0) {
			this.stars[i] = new Star(this.width, Math.random()*this.height, Math.random()*1+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}
};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
 	//ctx.fillStyle = '#000000';
	//ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.save();
    
	//Clear the canvas
	ctx.clearRect(0, 0, this.width, this.height);

    
	//	Draw stars.
	ctx.fillStyle = '#ffffff';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
        
        //Apply opacity
        ctx.globalAlpha = (star.opacity) / 1;
        
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
    ctx.restore();
};

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
    this.opacity = Math.random();
    this.increase = 0.1;
}

var container = document.getElementById('starfield');
var starfield = new Starfield(container.offsetWidth, container.offsetHeight);
starfield.initialise(container);
starfield.start();

function randomise() {
	starfield.stop();
	starfield.stars = 200;
	starfield.minVelocity = Math.random()*30;
	starfield.maxVelocity = Math.random()*40 + starfield.minVelocity;			
	starfield.start();
}



window.addEventListener('resize', function resize(event) {
    randomise();
});
