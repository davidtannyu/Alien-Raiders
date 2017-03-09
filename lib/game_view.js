class GameView {
  constructor(game, stage, scoreEl, messageField) {
    this.stage = stage;
    this.game = game;
    this.player = this.game.addPlayer();
    this.game.addAliens();
    this.scoreEl = scoreEl;
    this.messageField = messageField;
    this.MOVES = {
      "a": [-32,  0],
      "d": [ 32,  0],
      "left": [-32,0],
      "right": [32,0]
    };
  }

  handleKeys() {
    const player = this.player;
    Object.keys(this.MOVES).forEach( (k) => {
      let diffX = this.MOVES[k];
      key(k, () => {
        if (!this.game.paused && player.withinBounds(diffX)) {
          player.move(diffX);
        }
      } );
    });
    key("space", () => {
      if (!this.game.paused) {
        player.fire();
      }
    });
    key("p", this.handlePause.bind(this));
  }

  handlePause() {
    const pause = !this.game.paused;
    const messageField = this.messageField;
    this.game.paused = pause;
    if (pause) {
      messageField.text = "Game Paused";
      this.stage.addChild(messageField);
    } else {
      this.stage.removeChild(messageField);
    }
  }

  start() {
    this.handleKeys();
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick",this.animate.bind(this));
  }

  animate(event) {
    if (!this.game.paused && !this.game.over) {
      this.game.draw(this.stage);
    }
    if (this.game.over) {
      this.drawGameOver();
    } else {
      this.scoreEl.html(this.game.score);
      this.stage.update(event);
    }
  }

  drawGameOver() {
    this.stage.removeAllChildren();
    const gameOver = new Image ();
    if (this.game.noMoreAliens()) {
      gameOver.src = './assets/win.jpg';
    } else {
      gameOver.src = './assets/gameover.jpg';
    }
    gameOver.onload =  () => {
      const gameOverBitmap = new createjs.Bitmap(gameOver);
      gameOverBitmap.x = 0;
      gameOverBitmap.y = 0;
      gameOverBitmap.scaleX = this.game.DIM_X / gameOverBitmap.image.width;
      gameOverBitmap.scaleY = this.game.DIM_Y / gameOverBitmap.image.height;
      this.stage.addChild(gameOverBitmap);
      this.stage.update();
    };
  }

}

module.exports = GameView;
