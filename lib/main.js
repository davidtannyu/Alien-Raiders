const Game = require("./game");



document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  function loadAliens(event) {
   let alien = event.target;
   let bitmap;
   let container = new createjs.Container();
   stage.addChild(container);
   let x = 0;
   let y = 0;
   while (y < 600) {
     bitmap = new createjs.Bitmap(alien);
     container.addChild(bitmap);
     bitmap.x = x;
     bitmap.y = y;
     bitmap.scaleX = 100 / bitmap.image.width;
     bitmap.scaleY = 100 / bitmap.image.height;
     x += 100;
     if (x >= 800) {
       x = 0;
       y += 100;
     }
   }
   stage.update();
  }
  let stage = new createjs.Stage("game");
  var alien = new Image();
	alien.src = "./assets/alien.jpg";
	alien.onload = loadAliens;


  const canvasCtx = canvasEl.getContext("2d");
  const game = new Game();
});
