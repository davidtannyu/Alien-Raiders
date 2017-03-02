const Player = require("./player");

class Game {
  constructor() {
    this.aliens = [];
    this.bullets = [];
    this.player = null;
    this.DIM_X = 1280;
    this.DIM_Y = 720;
  }

  addPlayer() {
    const initialPos = [this.DIM_X / 2, this.DIM_Y / 2];
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

  draw(stage) {
    this.player.draw(stage);
  }
}


module.exports = Game;
