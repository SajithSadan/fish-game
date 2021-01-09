export default class Bubble {
  constructor(game) {
    this.ctx = game.ctx;
    this.canvas = game.canvas;
    this.player = game.player;

    this.radius = 50;
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + this.radius;
    this.speed = Math.random() * 3 + 1;
    this.distance;
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - this.player.x;
    const dy = this.y - this.player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
