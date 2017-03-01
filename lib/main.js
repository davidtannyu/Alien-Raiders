const Game = require("./game");

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let stage = new createjs.Stage("game");
  let bitmap = new createjs.Bitmap("./assets/alien.jpg");
  bitmap.x = 0;
  bitmap.y = 0;
  stage.addChild(bitmap);
  bitmap.image.onload = function() {
    stage.update();
  };
  let bitmap2 = new createjs.Bitmap("./assets/alien.jpg");
  bitmap2.x = 400;
  bitmap2.y = 0;
  stage.addChild(bitmap2);
  bitmap2.image.onload = function() {
    stage.update();
  };

  const canvasCtx = canvasEl.getContext("2d");
  const game = new Game();
});
