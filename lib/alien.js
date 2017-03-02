const MovingObject = require("./moving_object");

class Alien extends MovingObject {
  constructor(options) {
    super(options);
  }

  move(direction) {
    this.pos[0] += direction[0];
    this.pos[1] += direction[1];
  }

  draw(stage) {
    this.alienBitmap = this.alienBitmap || new createjs.Bitmap(this.image);
    this.image.onload = (event) => this.loadBitmap(this.alienBitmap,stage);
    this.loadBitmap(this.alienBitmap, stage);
  }
}

module.exports = Alien;
