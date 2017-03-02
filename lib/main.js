const Game = require("./game");
const GameView = require("./game_view");



document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  let stage = new createjs.Stage(canvasEl);
  const initialX = 100;
  const game = new Game();
  canvasEl.width = game.DIM_X;
  canvasEl.height = game.DIM_Y;
  var alien = new Image();
	alien.src = "./assets/alien.png";
  function loadAliens(event) {
   let alien = event.target;
   let bitmap;
   let container = new createjs.Container();
   stage.addChild(container);
   let x = initialX;
   let y = 100;
   const width = 32;
   const height = 32;
   while (y < game.DIM_Y / 2) {
     bitmap = new createjs.Bitmap(alien);
     container.addChild(bitmap);
     bitmap.x = x;
     bitmap.y = y;
     bitmap.scaleX = width / bitmap.image.width;
     bitmap.scaleY = height / bitmap.image.height;
     x += width;
     if (x >= game.DIM_X - initialX) {
       x = initialX;
       y += height;
     }
   }
   stage.update();
  }
	alien.onload = loadAliens;
  new GameView(game, stage).start();
});
