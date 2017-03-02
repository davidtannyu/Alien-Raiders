class GameView {
  constructor(game, stage) {
    this.stage = stage;
    this.game = game;
    this.player = this.game.addPlayer();
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.stage);
    this.stage.update();
    requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = GameView;
