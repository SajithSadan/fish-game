export default class Score {
  constructor(game) {
    this.canvas = game.canvas;
    this.ctx = game.ctx;

    this.x = (this.canvas.width / 100) * 3;
    this.y = (this.canvas.height / 100) * 8;
    this.score = 0;
  }
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }
}
