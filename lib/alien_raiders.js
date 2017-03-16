/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.image = options.image;
    this.game = options.game;
  }

  loadBitmap(bitmap, stage) {
    bitmap.x = this.pos[0];
    bitmap.y = this.pos[1];
    bitmap.scaleX = 32 / bitmap.image.width;
    bitmap.scaleY = 32 / bitmap.image.height;
    stage.addChild(bitmap);
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  draw(stage) {
    this.bitmap = this.bitmap || new createjs.Bitmap(this.image);
    this.image.onload = (event) => this.loadBitmap(this.bitmap,stage);
    this.loadBitmap(this.bitmap, stage);
  }

  collideWith(movingObject) {
    const x = this.pos[0];
    const y = this.pos[1];
    const otherX = movingObject.pos[0];
    const otherY = movingObject.pos[1];
    return ((x >= otherX) && (x <= (otherX + 32))) &&
    ((y >= otherY) && (y <= (otherY + 32)));
  }

  withinBounds(dir) {
    const bound = this.pos[0] + dir[0];
    return bound >= 0 && bound < this.game.DIM_X;
  }

}

module.exports = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(5);
const Alien = __webpack_require__(3);

class Game {
  constructor() {
    this.aliens = [];
    this.bullet = null;
    this.player = null;
    this.DIM_X = 1024;
    this.DIM_Y = 576;
    this.paused = true;
    this.score = 0;
    this.over = false;
    this.level = 1;
  }

  reset() {
    this.aliens = [];
    this.bullet = null;
    this.paused = true;
    this.score = 0;
    this.over = false;
  }

  addAliens() {
    const initialX = 320;
    let x = initialX;
    let y = 0;
    let image = new Image();
    image.src = "./assets/alien.png";

    while (y < this.DIM_Y / (10 / this.level)) {
      this.createAlien([x,y], image);
      x += 100 * (1 / this.level);
      if (x >= this.DIM_X - initialX) {
        x = initialX;
        y += 32;
      }
    }
  }

  createAlien(pos, image) {
    let alien = new Alien ({
      pos,
      vel: [1,0],
      game: this,
      image
    });
    this.aliens.push(alien);
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

  addBullet(bullet) {
    if (!this.bullet) {
      this.bullet = bullet;
    }
  }

  noMoreAliens() {
    return this.aliens.length === 0;
  }

  moveAliens(stage) {
    let rebound = false;
    if (this.noMoreAliens()) {
      if ( this.level === 5) {
        this.over = true;
      } else {
        this.level += 1;
      }
      return;
    }
    let removedAlien = null;
    this.aliens.forEach( (alien,idx) => {
      alien.move();
      if (alien.pos[0] > this.DIM_X - 32 || alien.pos[0] < 0) {
        rebound = true;
      }
      if (this.bullet && this.bullet.collideWith(alien)) {
        removedAlien = idx;
        this.handleDeadAlien(stage, idx);
      } else if (this.player.collideWith(alien)) {
        this.over = true;
      } else {
        alien.draw(stage);
      }
    });
    if ( removedAlien || removedAlien === 0) {
      this.aliens.splice(removedAlien, 1);
    }
    this.reboundAliens(rebound);
  }

  handleDeadAlien(stage, alienIdx) {
    stage.removeChild(this.aliens[alienIdx].bitmap);
    stage.removeChild(this.bullet.bitmap);
    this.bullet = null;
    this.score += 100 * Math.abs(this.aliens[alienIdx].vel[0]);
  }

  reboundAliens(rebound) {
    if (rebound) {
      this.aliens.forEach( alien => {
        alien.vel[0] += (alien.vel[0] > 0) ? 0.3 : -0.3;
        alien.rebound();
      });
    }
  }

  moveBullet(stage) {
    if (this.bullet) {
      this.bullet.move();
      if (this.bullet.pos[1] < -32) {
        stage.removeChild(this.bullet.bitmap);
        this.bullet = null;
      } else {
        this.bullet.draw(stage);
      }
    }
  }

  draw(stage) {
    if (!this.paused && !this.over) {
      this.player.draw(stage);
      this.moveBullet(stage);
      this.moveAliens(stage);
    }
  }
}


module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

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
      this.scoreEl.html(Math.ceil(this.game.score));
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Alien extends MovingObject {
  constructor(options) {
    super(options);
  }

  rebound() {
    this.pos[1] += 16;
    this.vel[0] = 0 - this.vel[0];
  }
}

module.exports = Alien;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Bullet extends MovingObject {
  constructor(options) {
    super(options);
  }
}

module.exports = Bullet;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Bullet = __webpack_require__(4);

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.initialPos = options.initialPos;
  }

  resetPos() {
    this.pos = [this.game.DIM_X / 2, this.game.DIM_Y - 32];
  }

  move(direction) {
    this.pos[0] += direction[0];
    this.pos[1] += direction[1];
  }

  fire() {
    let image = new Image();
    image.src = "./assets/bullet.png";
    const pos = [this.pos[0], this.pos[1] - 32];
    let vel = 0;
    const alien = this.game.aliens[0];
    if (alien) {
      vel = alien.vel[0];
    }
    const bullet = new Bullet( {
      pos,
      vel: [0, -16],
      game: this,
      image
    });
    this.game.addBullet(bullet);
  }

  revive() {
    this.pos = this.initialPos;
  }
}

module.exports = Player;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

function addMessageField(stage, canvas) {
  const messageField = new createjs.Text("Press P to Start", "bold 24px Orbitron", "#FFFFFF");
	messageField.textAlign = "center";
	messageField.textBaseline = "middle";
  messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
  return messageField;
}

function addControlModal() {
  const modal = document.getElementById('controls');
  modal.style.display = "block";
  $("div.controls").click( function() {
    modal.style.display = "block";
  });
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  const game = new Game();
  canvasEl.width = game.DIM_X;
  canvasEl.height = game.DIM_Y;
  let stage = new createjs.Stage(canvasEl);
  const messageField = addMessageField(stage,canvasEl);
  const initialX = 100;
  const scoreEl = $("p.score");
  new GameView(game, stage, scoreEl, messageField).start();
  addControlModal();
});


/***/ })
/******/ ]);
//# sourceMappingURL=alien_raiders.js.map