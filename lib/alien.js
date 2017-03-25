const MovingObject = require("./moving_object");

class Alien extends MovingObject {
  constructor(options) {
    super(options);
  }

  rebound() {
    this.pos[1] += 16;
    this.vel[0] = 0 - this.vel[0];
  }
}

module.exports = Alien;
