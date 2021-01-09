import Bubble from "./Bubble";
import Player from "./Player";
import Score from "./Score";
const sound1 = require("../sounds/bubble-sound2.ogg");

export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.gameFrame = 0;
    this.ctx.font = `${this.canvas.width / 30}px Georgia`;

    this.mouse = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      click: false,
    };

    this.bubbles = [];
    this.bubbleSpawnTime = 80;
    this.canPlayAudio = false;
  }
  create() {
    // create player
    this.player = new Player(this);

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.click = true;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.mouse.click = false;
    });

    // create score text
    this.score = new Score(this);

    // load sounds to DOM
    this.bubbleSound1 = document.createElement("audio");
    this.bubbleSound1.setAttribute("type", "audio/ogg");
    this.bubbleSound1.src = sound1;
    this.bubbleSound1.addEventListener(
      "loadeddata",
      () => {
        this.canPlayAudio = true;
      },
      false
    );
  }
  handleBubbles() {
    // create bubbles
    if (this.gameFrame % this.bubbleSpawnTime === 0)
      this.bubbles.push(new Bubble(this));
    this.bubbles.map((bubble, index) => {
      bubble.draw();
      bubble.update();
    });
    this.bubbles.map((bubble, index) => {
      // remove bubble if it goes out of the canvas top
      if (bubble.y < -100) {
        this.bubbles.splice(index, 1);
      }
      if (bubble.distance < this.player.radius + bubble.radius) {
        this.score.score++;
        this.bubbles.splice(index, 1);
        if (this.canPlayAudio) {
          const pms = this.bubbleSound1.play();
          console.log(pms);
        }
      }
    });
  }
  update() {
    // clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
    this.player.update();
    this.handleBubbles();
    this.score.draw();
  }
  animate() {
    this.gameFrame++;
    this.update();
    requestAnimationFrame(() => {
      this.animate();
    });
  }
  init() {
    this.create();
    this.animate();
  }
}
