const Game = require("./game");



document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  let stage = new createjs.Stage(canvasEl);
  const initialX = 100;
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  function loadAliens(event) {
   let alien = event.target;
   let bitmap;
   let container = new createjs.Container();
   stage.addChild(container);
   let x = initialX;
   let y = 100;
   const width = 32;
   const height = 32;
   while (y < Game.DIM_Y / 2) {
     bitmap = new createjs.Bitmap(alien);
     container.addChild(bitmap);
     bitmap.x = x;
     bitmap.y = y;
     bitmap.scaleX = width / bitmap.image.width;
     bitmap.scaleY = height / bitmap.image.height;
     x += width;
     if (x >= Game.DIM_X - initialX) {
       x = initialX;
       y += height;
     }
   }
   stage.update();
  }

  var alien = new Image();
	alien.src = "./assets/alien.png";
	alien.onload = loadAliens;

  const canvasCtx = canvasEl.getContext("2d");
  const game = new Game();
});
