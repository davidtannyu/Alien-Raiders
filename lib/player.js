const MovingObject = require("./moving_object");
const Bullet = require("./bullet");

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.initialPos = options.initialPos;
  }

  resetPos() {
    this.pos = [this.game.DIM_X / 2, this.game.DIM_Y - 32];
  }

  move(direction) {
    this.pos[0] += direction[0];
    this.pos[1] += direction[1];
  }

  fire() {
    let image = new Image(), vel = 0;
    image.src = "./assets/bullet.png";
    const pos = [this.pos[0], this.pos[1] - 32], alien = this.game.aliens[0];
    if (alien) {
      vel = alien.vel[0];
    }
    const bullet = new Bullet( {
      pos,
      vel: [0, - this.game.bulletSpeed],
      game: this,
      image
    });
    this.game.addBullet(bullet);
  }

  revive() {
    this.pos = this.initialPos;
  }
}

module.exports = Player;
