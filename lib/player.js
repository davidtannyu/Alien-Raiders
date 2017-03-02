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
    this.image.onload = (event) => this.loadPlayer(this.playerBitmap,stage);
    this.loadPlayer(this.playerBitmap, stage);
  }

  loadPlayer(player, stage) {
    player.x = this.pos[0];
    player.y = this.pos[1];
    player.scaleX = 32 / player.image.width;
    player.scaleY = 32 / player.image.height;
    stage.addChild(player);
  }
}

module.exports = Player;
