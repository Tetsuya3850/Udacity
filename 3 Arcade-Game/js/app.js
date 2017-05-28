/** Enemy the player must avoid.
 * The starting position and speed are randomly generated.
 */
var Enemy = function() {
	this.sprite = 'images/enemy-bug.png';
	this.x = -101;
	this.y = 63 + 83 * Math.floor(Math.random() * 3);
	this.speed = 150 + 100 * Math.floor(Math.random() * 3);
};

/** Update the enemy's position. */
Enemy.prototype.update = function(dt) {
	/** Steadly go right. */
	this.x = this.x + (this.speed * dt);

	/** When the enemy reaches the right end, it goes up to the next row. */
	if (this.x > 550) {
		this.x = -101;
		this.y += 83;
		this.speed = 150 + 100 * Math.floor(Math.random() * 3);
		if (this.y > 229) {
			this.y = 63;
		}
	}

	/** Checking the collision between the enemy and player by
	 * looking whether their y is same and x range is overlapping.
	 * If so, player is reset to start.
   */
	if (this.y === player.y) {
		if (player.x - 50 < this.x && player.x + 50 > this.x) {
			player.reset();
		}
	}
};

/** Draw the enemy on the screen. */
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Writing the player class. Its' initial position. */
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = 202;
	this.y = 312;
};

/** If the player reaches the river, game is finished. */
Player.prototype.update = function() {
	if (this.y < 63) {
		this.reset();
	}
};


/** Draw the player on the screen. */
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Receives user input, allowedKeys, and move the player according to it.
 * It cannot move off screen.
 */
Player.prototype.handleInput = function(key) {
	if (key === 'left' && this.x > 0) {
		this.x -= 101;
	} else if (key === 'right' && this.x < 404) {
		this.x += 101;
	} else if (key === 'up' && this.y > -20) {
		this.y -= 83;
	} else if (key === 'down' && this.y < 395) {
		this.y += 83;
	}
};

/** Move the player to initial position */
Player.prototype.reset = function() {
	this.x = 202;
	this.y = 312;
};

/** Instantiating objects.
 * Placeing all enemy objects in an array.
 * Placeing the player object in a variable.
 */
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


/** This listens for key presses and sends the keys to the Player.handleInput() method. */
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
