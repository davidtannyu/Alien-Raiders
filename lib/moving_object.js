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
  
}

module.exports = MovingObject;
