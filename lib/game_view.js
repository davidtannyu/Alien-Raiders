class GameView {
  constructor(game, stage, scoreEl) {
    this.stage = stage;
    this.game = game;
    this.player = this.game.addPlayer();
    this.game.addAliens();
    this.scoreEl = scoreEl;
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
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick",this.animate.bind(this));
  }

  animate(event) {
    if (!this.game.paused) {
      this.game.draw(this.stage);
    }
    this.scoreEl.html(this.game.score);
    this.stage.update(event);
  }
}

module.exports = GameView;
