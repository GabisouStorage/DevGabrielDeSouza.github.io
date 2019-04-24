/*
	Starfield lets you take a div and turn it into a starfield.

*/

//let last_height;

//	Define the starfield class.
function Starfield(w,h) {
	this.fps = 60;
	this.canvas = null;
	this.width = w;
	this.height = h;
	/*this.minVelocity = 15;
	this.maxVelocity = 30;*/
	this.minVelocity = Math.random()*30 + 10;
	this.maxVelocity = Math.random()*40 + this.minVelocity;	
	this.stars = 100;
	this.intervalId = 0;

	this.last_width = w;
	this.last_height = h;
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function(div) {
	let self = this;

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
	let canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {

	//	Create the stars.
	let stars = [];
	for(let i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*1+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	let self = this;
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
	let dt = 1 / this.fps;
    
	for(let i=0; i<this.stars.length; i++) {
		let star = this.stars[i];
		star.x -= dt * star.velocity;
        
		if(star.x < 0) {
			this.stars[i] = new Star(this.width, Math.random()*this.height, Math.random()*1+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}
};

Starfield.prototype.draw = function() {

	let ctx = this.canvas.getContext("2d");

	ctx.clearRect(0, 0, this.width, this.height);


    ctx.fillStyle = "rgba(255,255,255, 0.6)";
	for(let i=0; i<this.stars.length;i++) {
		let star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}

	// let img = document.getElementById("test");
	// ctx.drawImage(img, 0, 0, this.width, this.height);
};

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
}

let container = document.getElementById('starfield');
let starfield = new Starfield(container.offsetWidth, container.offsetHeight);
starfield.initialise(container);
starfield.start();

function randomise() {
	starfield.stop();
	starfield.stars = 100;
	starfield.minVelocity = Math.random()*30;
	starfield.maxVelocity = Math.random()*40 + starfield.minVelocity;			
	starfield.start();
}



window.addEventListener('resize', function resize(event) {
	let div = starfield.containerDiv;

	let new_width = div.offsetWidth;
	let new_height = div.offsetHeight;

	if ((new_width > starfield.last_width * 1.1 || new_width < starfield.last_width * 0.8 || new_height > starfield.last_height * 1.1 || new_height < starfield.last_height * 0.8) || (Math.abs(new_width - starfield.last_width) > 200) || (Math.abs(new_height - starfield.last_height)> 200)) {
		randomise();
		this.console.log("Novo: " + new_width + "\nAntigo: " + div.offsetWidth);
		starfield.last_width = div.offsetWidth;
		starfield.last_height = div.offsetHeight;
	}
});
