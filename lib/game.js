const Player = require("./player");
const Alien = require("./alien");

class Game {
  constructor() {
    this.aliens = [];
    this.bullet = null;
    this.player = null;
    this.DIM_X = 1024;
    this.DIM_Y = 576;
    this.paused = true;
    this.score = 0;
    this.over = false;
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
    if (!this.bullet) {
      this.bullet = bullet;
    }
  }

  moveAliens(stage) {
    let rebound = false;
    this.aliens.forEach( (alien,idx) => {
      alien.move();
      if (alien.pos[0] > this.DIM_X - 32 || alien.pos[0] < 0) {
        rebound = true;
      }
      if (this.bullet && this.bullet.collideWith(alien)) {
        stage.removeChild(alien.bitmap);
        stage.removeChild(this.bullet.bitmap);
        this.bullet = null;
        this.aliens.splice(idx, 1);
        this.score += 100;
      } else if (this.player.collideWith(alien)) {
        this.over = true;
        alien.pos = this.player.pos.slice(0);
        alien.pos[1] -= 10;
        alien.draw(stage);
      } else {
        alien.draw(stage);
      }
    });
    this.reboundAliens(rebound);
  }

  reboundAliens(rebound) {
    if (rebound) {
      this.aliens.forEach( alien => {
        alien.rebound();
      });
    }
  }

  moveBullet(stage) {
    if (this.bullet) {
      this.bullet.move();
      if (this.bullet.pos[1] < -32) {
        stage.removeChild(this.bullet.bitmap);
        this.bullet = null;
      } else {
        this.bullet.draw(stage);
      }
    }
  }

  draw(stage) {
    if (!this.paused && !this.over) {
      this.player.draw(stage);
      this.moveBullet(stage);
      this.moveAliens(stage);
    }
  }
}


module.exports = Game;
