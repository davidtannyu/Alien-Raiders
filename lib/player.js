const MovingObject = require("./moving_object");
const Bullet = require("./bullet");

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.initialPos = options.initialPos;
  }

  move(direction) {
    this.pos[0] += direction[0];
    this.pos[1] += direction[1];
  }

  fire() {
    let image = new Image();
    image.src = "./assets/bullet.png";
    const pos = [this.pos[0], this.pos[1] - 32];
    let vel = 0;
    const alien = this.game.aliens[0];
    if (alien) {
      vel = alien.vel[0];
    }
    const bullet = new Bullet( {
      pos,
      vel: [0, -16],
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
