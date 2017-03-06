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

  collideWith(movingObject) {
    const x = this.pos[0];
    const y = this.pos[1];
    const otherX = movingObject.pos[0];
    const otherY = movingObject.pos[1];
    return ((x >= otherX) && (x <= (otherX + 32))) &&
    ((y >= otherY) && (y <= (otherY + 32)));
  }

  withinBounds(dir) {
    const bound = this.pos[0] + dir[0];
    return bound >= 0 && bound < this.game.DIM_X;
  }

}

module.exports = MovingObject;
