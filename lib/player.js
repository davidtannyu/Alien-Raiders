const MovingObject = require("./moving_object");

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.initialPos = options.initialPos;
  }

  move(direction) {
    this.pos[0] += direction[0];
    this.pos[1] += direction[1];
  }

  revive() {
    this.pos = this.initialPos;
  }

  draw(stage) {
    this.playerBitmap = this.playerBitmap || new createjs.Bitmap(this.image);
    this.image.onload = (event) => this.loadBitmap(this.playerBitmap,stage);
    this.loadBitmap(this.playerBitmap, stage);
  }
}

module.exports = Player;
