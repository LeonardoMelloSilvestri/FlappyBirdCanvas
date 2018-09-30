$(document).ready(function() {
	const canvas = $("#canvas");
	const ctx = canvas[0].getContext("2d");

	class Game {
		constructor() {
			this.playerScore = 0;
			this.playerLives = 3;
			this.isPaused = false;
		}

		init() {
			game.loop();
		}

		update() {
			player.jump();
			player.gravity();
			player.colide();
			player.scoring();
			pillar.move();
		}

		render() {
			ctx.clearRect(0, 0, canvas.width(), canvas.height());
			player.draw();
			pillar.draw();
			ctx.fillStyle = "Red";
			ctx.font = "20px Cursive";
			ctx.fillText("Pontuação: " + Math.floor(game.playerScore), 30, 30);
			ctx.fillText("Tentativas: " + game.playerLives, 30, 55);
		}

		loop() {
			requestAnimationFrame(game.loop, canvas);
			game.update();
			game.render();
		}

		pause() {
			if(this.isPaused) {
				ctx.fillStyle = "Red";
				ctx.font = "30px Cursive";
				ctx.fillText("Pause", canvas.width() / 2, canvas.height() / 2);
			}
		}
	}

	$(document).keydown(function(e){
		switch(e.which) {
			case 38:
				if(!player.upIsDown) {
					player.zIsDown = true;
					player.jumping = true;
				}
				break;
		}
	})

	$(document).keyup(function(e){
		switch(e.which) {
			case 38:
				player.upIsDown = false;
				break;
		}
	})	

	class Player {
		constructor() {
			this.size = 20;
			this.x = 50;
			this.y = canvas.height() / 2 - this.size / 2;
			this.gravityForce = 0.5;
			this.lift = -20;
			this.speed = 0;
			this.jumping = false;
			this.upIsDown = false;
			this.color = "White";
			this.score = 0;
			this.lives = 3;
		}

		draw() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.size, this.size);
		}

		jump() {
			if(this.jumping && this.y >= 0) {
				this.speed += this.lift;
				this.speed *= 0.3;
			}
			this.jumping = false;
		}

		gravity() {
			if(this.y + this.size) {
				this.speed += this.gravityForce;
				this.y += this.speed;
			}
		}

		colide() {
			if(this.y + this.size >= canvas.height()) {
				this.y = canvas.height() - this.size;
			}

			for(var i = 0; i < pillar.pillars.length; i++) {
				this.currentPillar = pillar.pillars[i];
				if(this.x + this.size >= this.currentPillar.x &&
					this.x <= this.currentPillar.x + this.currentPillar.width &&
					this.y + this.size >= this.currentPillar.y &&
					this.y <= this.currentPillar.y + this.currentPillar.height) {
					player.gameOver();		
				}
			}
		}

		scoring() {
			if(game.playerLives > 0) {
				game.playerScore += 0.1;				
			}
		}

		gameOver() {
			player = new Player();
			pillar = new Pillar();
			if(game.playerLives > 0) {
				game.playerLives--;
			}
		}
	}

	class Pillar {
		constructor(color, x, y, width, height) {
			this.color = color;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.pillars = [];
			this.speed = 5;		
		}

		addPillars() {
			setTimeout(function interval(){
				pillar.pillars.push(new Pillar("White", canvas.width(), 0, 40, pillar.randomNumber(260, 220)));
				pillar.pillars.push(new Pillar("White", canvas.width(), pillar.randomNumber(320, 360), 40, 600));
				setTimeout(interval, 300);			
			}, 300)
		}

		draw() {
			for(var i = 0; i < this.pillars.length; i++) {
				this.currentPillar = this.pillars[i];
				ctx.fillStyle = this.currentPillar.color;
				ctx.fillRect(this.currentPillar.x, this.currentPillar.y, this.currentPillar.width, this.currentPillar.height);
			}	
		}

		move() {
			for(var i = 0; i < this.pillars.length; i++) {
				this.currentPillar = this.pillars[i];
				this.currentPillar.x -= this.speed;
			}
		}

		randomNumber(max, min) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

	game = new Game();
	player = new Player();
	pillar = new Pillar();

	pillar.addPillars();
	game.init();
})