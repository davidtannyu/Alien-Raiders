class GameView {
  constructor(game, stage) {
    this.stage = stage;
    this.game = game;
    this.player = this.game.addPlayer();
    this.game.addAliens();
    this.MOVES = {
      "a": [-32,  0],
      "d": [ 32,  0],
      "w": [0, -32],
      "s": [0, 32]
    };
  }

  handleKeys() {
    const player = this.player;
    Object.keys(this.MOVES).forEach( (k) => {
      let diffX = this.MOVES[k];
      key(k, () => player.move(diffX) );
    });
    key("space", () => player.fire());
  }

  start() {
    this.handleKeys();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.stage);
    this.stage.update();
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
