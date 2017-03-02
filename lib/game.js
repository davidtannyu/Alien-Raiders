const Player = require("./player");
const Alien = require("./alien");

class Game {
  constructor() {
    this.aliens = [];
    this.bullets = [];
    this.player = null;
    this.DIM_X = 1280;
    this.DIM_Y = 720;
    this.paused = false;
  }

  addAliens() {
    const initialX = 320;
    let x = initialX;
    let y = 0;
    let image = new Image();
    image.src = "./assets/alien.png";

    while (y < this.DIM_Y / 2) {
      this.createAlien([x,y], image);
      x += 32;
      if (x >= this.DIM_X - initialX) {
        x = initialX;
        y += 32;
      }
    }
  }

  createAlien(pos, image) {
    let alien = new Alien ({
      pos,
      vel: [1,0],
      game: this,
      image
    });
    this.aliens.push(alien);
  }

  addPlayer() {
    const initialPos = [this.DIM_X / 2, this.DIM_Y - 32];
    let image = new Image();
    image.src = "./assets/player.png";
    this.player = new Player({
      initialPos,
      pos: initialPos,
      vel: [0,0],
      game: this,
      image
    });
    return this.player;
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  draw(stage) {
    this.player.draw(stage);
    this.bullets.forEach (bullet => {
      bullet.move();
      bullet.draw(stage);
    });
    let rebound = false;
    this.aliens.forEach( alien => {
      alien.move();
      if (alien.pos[0] > this.DIM_X - 32 || alien.pos[0] < 0) {
        rebound = true;
      }
      alien.draw(stage);
    });
    if (rebound) {
      this.aliens.forEach( alien => {
        alien.rebound();
      });
    }
  }
}


module.exports = Game;
