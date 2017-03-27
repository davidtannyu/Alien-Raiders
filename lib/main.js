const Game = require("./game");
const GameView = require("./game_view");

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

function disableUpAndDown() {
  window.addEventListener("keydown", (e) => {
    if(e.keyCode === 38 || e.keyCode === 40 ) {
      e.preventDefault();
    }
  });
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
  const level = $("p.level");
  new GameView(game, stage, scoreEl, level, messageField).start();
  addControlModal();
  disableUpAndDown();
});
