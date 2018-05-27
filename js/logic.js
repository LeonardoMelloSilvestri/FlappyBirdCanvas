var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();

window.addEventListener('keydown', function keyDownHandler(e){
	var key = e.keyCode;
	if (key == 38) {
		if (player.upIsDown == false) {
			player.zIsDown = true;
			player.jumping = true;
		}
	}
}, false);

window.addEventListener('keyup', function keyUpHandler(e){
	var key = e.keyCode;
	if (key == 38) {
		player.upIsDown = false;
	}
}, false);

function Player() {
	this.size = 20;
	this.x = 50;
	this.y = canvas.height / 2 - 40;
	this.gravityForce = 0.5;
	this.lift = -20;
	this.speed = 0;
	this.jumping = false;
	this.upIsDown = false;

	this.draw = function(){
		ctx.fillStyle = "White";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
		ctx.fill();
	}

	this.jump = function(){
		if (player.jumping == true) {
			this.speed += this.lift;
			this.speed *= 0.5;
		}
		this.jumping = false;
	}

	this.gravity = function(){
		if (this.y + this.size) {
			this.speed += this.gravityForce;
			this.y += this.speed;
		}
	}

	this.collision = function(){
		if (this.y + this.size >= canvas.height){
			this.y = canvas.height - this.size;
		}
	}
}