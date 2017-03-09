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
  }

  addAliens() {
    const initialX = 320;
    let x = initialX;
    let y = 0;
    let image = new Image();
    image.src = "./assets/alien.png";

    while (y < this.DIM_Y / 2) {
      this.createAlien([x,y], image);
      x += 32;
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
      this.over = true;
      return;
    }
    this.aliens.forEach( (alien,idx) => {
      alien.move();
      if (alien.pos[0] > this.DIM_X - 32 || alien.pos[0] < 0) {
        rebound = true;
      }
      if (this.bullet && this.bullet.collideWith(alien)) {
        stage.removeChild(alien.bitmap);
        stage.removeChild(this.bullet.bitmap);
        this.bullet = null;
        this.aliens.splice(idx, 1);
        this.score += 100;
      } else if (this.player.collideWith(alien)) {
        this.over = true;
      } else {
        alien.draw(stage);
      }
    });
    this.reboundAliens(rebound);
  }

  reboundAliens(rebound) {
    if (rebound) {
      this.aliens.forEach( alien => {
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
/***/ (function(module, exports) {

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
    key("p", () => this.game.paused = !this.game.paused);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Alien extends MovingObject {
  constructor(options) {
    super(options);
  }

  rebound() {
    this.pos[1] += 32;
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

  move(direction) {
    this.pos[0] += direction[0];
    this.pos[1] += direction[1];
  }

  fire() {
    let image = new Image();
    image.src = "./assets/bullet.png";
    const pos = [this.pos[0], this.pos[1] - 32];
    const bullet = new Bullet( {
      pos,
      vel: [0,-10],
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



document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  let stage = new createjs.Stage(canvasEl);
  const initialX = 100;
  const game = new Game();
  canvasEl.width = game.DIM_X;
  canvasEl.height = game.DIM_Y;
  const scoreEl = $("p.score");
  new GameView(game, stage, scoreEl).start();

  const modal = document.getElementById('controls');
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
});


/***/ })
/******/ ]);
//# sourceMappingURL=alien_raiders.js.map