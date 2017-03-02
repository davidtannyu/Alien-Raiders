const MovingObject = require("./moving_object");

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.initialPos = options.initialPos;
  }

  move(direction) {
    this.pos[0] += direction[0];
  }

  revive() {
    this.pos = this.initialPos;
  }

  draw(stage) {
    this.image.onload = (event) => this.loadPlayer(event,stage);
  }

  loadPlayer(event, stage) {
    let player = new createjs.Bitmap(event.target);
    player.x = this.pos[0];
    player.y = this.pos[1];
    player.scaleX = 32 / player.image.width;
    player.scaleY = 32 / player.image.height;
    stage.addChild(player);
  }
}

module.exports = Player;
