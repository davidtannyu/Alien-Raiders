const Player = require("./player");
const Alien = require("./alien");

class Game {
  constructor() {
    this.aliens = [];
    this.bullet = null;
    this.player = null;
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.paused = true;
    this.score = 0;
    this.over = false;
    this.level = 1;
    this.bulletSpeed = 10;
  }

  reset() {
    this.aliens = [];
    this.bullet = null;
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

    while (y < this.DIM_Y / (10 / this.level)) {
      this.createAlien([x,y], image);
      x += 100 * (1 / this.level);
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

  noMoreAliens() {
    return this.aliens.length === 0;
  }

  moveAliens(stage) {
    let rebound = false;
    if (this.noMoreAliens()) {
      if ( this.level === 5) {
        this.over = true;
      } else {
        this.level += 1;
        this.addAliens();
      }
      return;
    }
    let removedAlien = null;
    this.aliens.forEach( (alien,idx) => {
      alien.move();
      if (alien.pos[0] > this.DIM_X - 32 || alien.pos[0] < 0) {
        rebound = true;
      }
      if (this.bullet && this.bullet.collideWith(alien)) {
        removedAlien = idx;
        this.handleDeadAlien(stage, idx);
      } else if (this.player.collideWith(alien)) {
        this.over = true;
      } else {
        alien.draw(stage);
      }
    });
    if ( removedAlien || removedAlien === 0) {
      this.aliens.splice(removedAlien, 1);
    }
    this.reboundAliens(rebound);
  }

  handleDeadAlien(stage, alienIdx) {
    stage.removeChild(this.aliens[alienIdx].bitmap);
    stage.removeChild(this.bullet.bitmap);
    this.bullet = null;
    this.score += 100 * Math.abs(this.aliens[alienIdx].vel[0]);
  }

  reboundAliens(rebound) {
    if (rebound) {
      this.aliens.forEach( alien => {
        alien.vel[0] += (alien.vel[0] > 0) ? 0.3 : -0.3;
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
