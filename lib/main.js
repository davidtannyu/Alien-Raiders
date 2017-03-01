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
   const width = 100;
   const height = 300;
   while (y < 600) {
     bitmap = new createjs.Bitmap(alien);
     container.addChild(bitmap);
     bitmap.x = x;
     bitmap.y = y;
     bitmap.scaleX = width / bitmap.image.width;
     bitmap.scaleY = height / bitmap.image.height;
     x += width;
     if (x >= 800) {
       x = 0;
       y += height;
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
