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

}

module.exports = MovingObject;
