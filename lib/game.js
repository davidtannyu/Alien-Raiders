const Player = require("./player");
const Alien = require("./alien");
const Powerup = require("./powerup");

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
    this.powerup = null;
    this.alienSize = 100;
    this.bulletPowerupSpeed = 2;
    this.topBounds = -32;
    this.leftBound = 0;
    this.alienSpeedIncrease = 0.3;
    this.alienBaseScore = 100;
    this.alienSizeProgression = -10;
    this.finalLevel = 5;
    this.alienLeftBounds = 250;
    this.gameInits = [];
  }

  reset() {
    this.aliens = [];
    this.bullet = null;
    this.paused = true;
    this.score = 0;
    this.over = false;
    this.level = 1;
    this.bulletSpeed = 10;
    this.powerup = null;
    this.alienSize = 100;
    this.gameInits = [];
  }

  addAliens() {
    const leftBound = this.alienLeftBounds, 
    bottomBound = this.DIM_Y / (10 / this.level),
    alienXSpacing = this.alienSize * (5 / this.level),
    alienYSpacing = this.alienSize,
    rightBound = this.DIM_X - leftBound;
    let x = leftBound, y = 0, image = new Image();
    image.src = "./assets/alien.png";
    while (y < bottomBound) {
      this.createAlien([x,y], image);
      x += alienXSpacing;
      if (x >= rightBound) {
        x = leftBound;
        y += alienYSpacing;
      }
    }
  }

  createAlien(pos, image) {
    let alien = new Alien ({
      pos,
      vel: [1,0],
      game: this,
      image,
      size: this.alienSize
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
  
  addPowerup() {
    if (!this.powerup) {
      let image = new Image();
      image.src = "./assets/powerup.png";
      const pos = [this.DIM_X / 2, 0];
      this.powerup = new Powerup ({
        pos,
        game: this,
        image
      })
    }
  }

  noMoreAliens() {
    return this.aliens.length === 0;
  }

  moveAliens(stage) {
    let rebound = false;
    if (this.noMoreAliens()) {
      if ( this.level === this.finalLevel) {
        this.over = true;
      } else {
        this.level++;
        this.alienSize += this.alienSizeProgression;
        this.addPowerup();
        this.addAliens();
      }
      return;
    }
    let removedAlien = null;
    this.aliens.forEach( (alien,idx) => {
      alien.move();
      if (alien.pos[0] > this.DIM_X - this.alienSize || alien.pos[0] < 0) {
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
    this.score += this.alienBaseScore * Math.abs(this.aliens[alienIdx].vel[0]);
  }

  reboundAliens(rebound) {
    if (rebound) {
      this.aliens.forEach( alien => {
        alien.vel[0] += 
        (alien.vel[0] > this.leftBound) ? this.alienSpeedIncrease  : -this.alienSpeedIncrease;
        alien.rebound();
      });
    }
  }

  moveBullet(stage) {
    if (this.bullet) {
      this.bullet.move();
      if (this.bullet.pos[1] < this.topBounds) {
        stage.removeChild(this.bullet.bitmap);
        this.bullet = null;
      } else {
        this.bullet.draw(stage);
      }
    }
  }
  
  movePowerup(stage) {
    if (this.powerup) {
      this.powerup.move();
      if (this.powerup.collideWith(this.player) || this.player.collideWith(this.powerup)) {
        stage.removeChild(this.powerup.bitmap);
        this.bulletSpeed += this.bulletPowerupSpeed;
        this.powerup = null;
      } else {
        this.powerup.draw(stage);
      }
    }
  }

  draw(stage) {
    if (!this.paused && !this.over) {
      this.player.draw(stage);
      this.moveBullet(stage);
      this.moveAliens(stage);
      this.movePowerup(stage);
    }
  }
}


module.exports = Game;
