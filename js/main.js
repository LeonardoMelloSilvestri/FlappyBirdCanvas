var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();

function init() {

	loop();
}

function update() {
	player.gravity();
	player.jump();
	player.collision();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
}

function loop() {
	window.requestAnimationFrame(loop, canvas);
	update();
	draw();
}

init();