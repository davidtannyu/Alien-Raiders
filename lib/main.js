const Game = require("./game");

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const canvasCtx = canvasEl.getContext("2d");
  const game = new Game();
});
