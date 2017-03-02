class GameView {
  constructor(game, stage) {
    this.stage = stage;
    this.game = game;
    this.player = this.game.addPlayer();
    this.game.addAliens();
    this.MOVES = {
      "a": [-32,  0],
      "d": [ 32,  0],
    };
  }

  handleKeys() {
    const player = this.player;
    Object.keys(this.MOVES).forEach( (k) => {
      let diffX = this.MOVES[k];
      key(k, () => {
        if (!this.game.paused) {
          player.move(diffX);
        }
      } );
    });
    key("space", () => {
      if (!this.game.paused) {
        player.fire();
      }
    });
    key("p", () => this.game.paused = !this.game.paused);
  }

  start() {
    this.handleKeys();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (!this.game.paused) {
      this.game.draw(this.stage);
      this.stage.update();
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
