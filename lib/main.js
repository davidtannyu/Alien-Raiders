const Game = require("./game");
const GameView = require("./game_view");



document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = $("canvas")[0];
  let stage = new createjs.Stage(canvasEl);
  const initialX = 100;
  const game = new Game();
  canvasEl.width = game.DIM_X;
  canvasEl.height = game.DIM_Y;
  const scoreEl = $("p.score");

  new GameView(game, stage, scoreEl).start();
});
