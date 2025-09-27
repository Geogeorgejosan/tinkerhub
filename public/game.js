const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height =window.innerHeight;

let birdX = 50;
let birdY = 150;
let gravity = 1;
let velocity = 0;
const birdSize = 20;

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function jump() {
  velocity = -10;
}

let pipes = [];
pipes[0] = { x: 320, y: 0 };
const pipeWidth = 50;
const gap = 200;

let score = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "yellow";
  ctx.fillRect(birdX, birdY, birdSize, birdSize);

  for (let i = 0; i < pipes.length; i++) {
    let pipeHeight = 200;

    ctx.fillStyle = "green";
    ctx.fillRect(pipes[i].x, pipes[i].y, pipeWidth, pipeHeight);
    ctx.fillRect(
      pipes[i].x,
      pipeHeight + gap,
      pipeWidth,
      canvas.height - pipeHeight - gap
    );

    pipes[i].x--;

    if (pipes[i].x == 150) {
      pipes.push({ x: canvas.width, y: 0 });
    }

    if (
      birdX + birdSize > pipes[i].x &&
      birdX < pipes[i].x + pipeWidth &&
      (birdY < pipeHeight || birdY + birdSize > pipeHeight + gap)
    ) {
      if (score >0) ;
      score = 0;
      pipes = [{ x: canvas.width, y: 0 }];
      birdY = 150;
      velocity = 0;
    }

    if (pipes[i].x == birdX) {
      score++;
    }
  }

  velocity += gravity;
  birdY += velocity;

  if (birdY + birdSize > canvas.height) {
    if (score > 0) ;
    score = 0;
    pipes = [{ x: canvas.width, y: 0 }];
    birdY = 150;
    velocity = 0;
  }

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(draw);
}

draw();