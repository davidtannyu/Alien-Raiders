const Game = require("./game");

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let stage = new createjs.Stage("game");
  let alien = new createjs.Bitmap("./assets/alien.jpg");
  let bitmap;
  let x = 0;
  let y = 0;
  const updateOnload = () => {
    bitmap.setBounds(0,0,100, 100);
    bitmap.scaleX = 100 / bitmap.image.width;
    bitmap.scaleY = 100 / bitmap.image.height;
    stage.update();
  };
  while (x < 100 || y < 100) {
    bitmap = alien.clone();
    bitmap.x = x;
    bitmap.y = y;
    stage.addChild(bitmap);
    bitmap.image.onload = updateOnload;
    x += 100;
    if (x >= 800) {
      x = 0;
      y += 100;
    }
  }

  const canvasCtx = canvasEl.getContext("2d");
  const game = new Game();
});
