// class for enemy.
var Enemy = function(x,y) {
   this.x = x;
   this.y = y;

   //learn about random https://www.w3schools.com/js/js_random.asp
   this.speed = Math.random() * 200 + 150;
    /* The image/sprite for our enemies, this uses a helper
    *  that provided to easily load images.
    */
    this.sprite = 'images/enemy-bug.png';
};

/* Update the enemy's position. usethe dt parameter which will
* ensure the game runs at the same speed for all computers.
*/
Enemy.prototype.update = function(dt) {
    /* if enemy is not go out move enemy stright with increase x
    * by spead * dt else reset pos to start.
    */
   if (this.x < 500){
    this.x += this.speed * dt;
   } else {
    this.x = -100;
   }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// class for player.
class Champion {
    constructor() {
      this.startingX = 202;
      this.startingY = 400;
      this.x = this.startingX;
      this.y = this.startingY;
      this.winner = false;
      this.sprite = 'images/char-pink-girl.png';
    }

    // Check for checkCollisions, if yes then reset the player.
    update() {
        for (let enemy of allEnemies){
            if ((enemy.y === this.y) && ( enemy.x - 30 <= this.x  && enemy.x + 30 >= this.x )){
                this.reset();
            }
        }
    }
    // Draw the player on the screen.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handle the inputs from the user, take the input from addEventListener.
    // Check if reach the water, then player win!
    handleInput(input){
        if (input == 'left' && this.x > 0){
            this.x -= 101;
        }
        if (input == 'right' && this.x < 404){
            this.x += 101;
        }
        if (input == 'up' && this.y > 0){
            this.y -= 83;
        }
        if (input == 'down' && this.y < 400 ){
            this.y += 83;
        }
        if (this.y < 0 ){
            this.winner = true;
        }
    }

    // Reset the player postion to the starting position.
    reset(){
        this.x = this.startingX;
        this.y = this.startingY;
    }
  }

// instantiates player and enemy objects.
const player = new Champion();
const enemyObject1 = new Enemy(-100, 68);
const enemyObject2 = new Enemy(-120, 151);
const enemyObject3 = new Enemy(-150, 234);
const enemyObject4 = new Enemy(-250, 68);
const enemyObject5 = new Enemy(-290, 234);
const allEnemies = [enemyObject1, enemyObject2, enemyObject3, enemyObject4,enemyObject5];

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
