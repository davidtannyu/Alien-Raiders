const MovingObject = require("./moving_object");

class PowerUp extends MovingObject {
  constructor(options) {
    super(options);
  }
  
  move() {
    const finalPos = this.game.DIM_Y - 32;
    if (this.pos[1] < finalPos ) {
      this.pos[1] += 16;
    } else {
      this.pos[1] = finalPos;
    }
  }
}

module.exports = PowerUp;