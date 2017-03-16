const Game = require("./game");

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
    Object.keys(this.MOVES).forEach( (k) => {
      let diffX = this.MOVES[k];
      key(k, () => this.handleMove(diffX));
    });
    key("space", this.handleFire.bind(this));
    key("p", this.handlePause.bind(this));
    key("r", this.handleReset.bind(this));
  }


  handleReset() {
    this.stage.removeAllChildren();
    this.game.reset();
    this.game.level = 1;
    this.game.addAliens();
    this.game.player.resetPos();
    this.messageField.text = "Press P to Start";
    this.stage.addChild(this.messageField);
  }

  handleMove(diffX) {
    const player = this.player;
    if (!this.game.paused && player.withinBounds(diffX)) {
      player.move(diffX);
    }
  }

  handleFire() {
    if (!this.game.paused) {
      this.player.fire();
    }
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
