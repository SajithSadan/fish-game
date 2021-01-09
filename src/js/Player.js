export default class Player {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.canvas = game.canvas;
    this.mouse = game.mouse;
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height / 2;

    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 1992 / 4;
    this.spriteHeight = 981 / 3;
    this.speed = 20;
  }
  update() {
    const dx = this.mouse.x - this.x;
    const dy = this.mouse.y - this.y;
    if (this.mouse.x != this.x) {
      this.x += dx / this.speed;
    }
    if (this.mouse.y != this.y) {
      this.y += dy / this.speed;
    }
  }
  draw() {
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.mouse.x, this.mouse.y);
    this.ctx.stroke();

    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
