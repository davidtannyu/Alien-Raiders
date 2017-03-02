const MovingObject = require("./moving_object");

class Alien extends MovingObject {
  constructor(options) {
    super(options);
  }

  move() {
    this.pos[0] += this.vel[0];
  }

  rebound() {
    this.pos[1] += 32;
    this.vel[0] = 0 - this.vel[0];
  }

  draw(stage) {
    this.alienBitmap = this.alienBitmap || new createjs.Bitmap(this.image);
    this.image.onload = (event) => this.loadBitmap(this.alienBitmap,stage);
    this.loadBitmap(this.alienBitmap, stage);
  }
}

module.exports = Alien;
