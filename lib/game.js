const Player = require("./player");
const Alien = require("./alien");

class Game {
  constructor() {
    this.aliens = [];
    this.bullets = [];
    this.player = null;
    this.DIM_X = 1280;
    this.DIM_Y = 720;
  }

  addAliens() {
    const initialX = 320;
    let x = initialX;
    let y = 0;
    let image = new Image();
    image.src = "./assets/alien.png";
    while (y < this.DIM_Y / 2) {
      let alien = new Alien ({
        pos: [x,y],
        vel: [1,0],
        game: this,
        image
      });
      this.aliens.push(alien);
      x += 32;
      if (x >= this.DIM_X - initialX) {
        x = initialX;
        y += 32;
      }
    }
  }

  addPlayer() {
    const initialPos = [this.DIM_X / 2, this.DIM_Y - 32];
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
    this.aliens.forEach( alien => {
      alien.draw(stage);
    });
  }
}


module.exports = Game;
