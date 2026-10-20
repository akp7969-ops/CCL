// snake position
let snakeX = 400;
let snakeY = 250;

// snake size (1 = normal, 2 = twice as big)
let snakeSize = 1;

// background circles
let circleSize = 20;
let bigCircleSize = 30;
let numCircles = 50;

// a list that remembers which food circles were eaten
let eaten = [];

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(1, 9, 23);

  // 1. move the snake a little bit closer to the mouse every frame
  snakeX = snakeX + (mouseX - snakeX) * 0.03;
  snakeY = snakeY + (mouseY - snakeY) * 0.03;

  // the angle from the snake to the mouse (so it faces the mouse)
  let angle = atan2(mouseY - snakeY, mouseX - snakeX);

  // 2. draw the circles and check if the snake touches them
  drawBubbles();

  // 3. draw the snake on top
  drawSnake(snakeX, snakeY, angle);
}

function drawBubbles() {
  noStroke();
  randomSeed(1);

  // size of the snake's head right now
  let headSize = 14 * snakeSize;

  // circles in random spots
  for (let i = 0; i < numCircles; i++) {
    let x = random(width);
    let y = random(height);

    // vibrate
    let shakeX = sin(frameCount * 0.01 + i) * 4;
    let shakeY = cos(frameCount * 0.12 + i) * 2;

    // where the circle actually is right now
    let cx = x + shakeX;
    let cy = y + shakeY;

    // distance from the snake's head to this circle
    let d = dist(snakeX, snakeY, cx, cy);

    if (random(1) < 0.3) {
      // RED = danger
      fill(245, 20, 0);
      circle(cx, cy, bigCircleSize);

      // touching? snake dies: back to normal size, all food comes back
      if (d < bigCircleSize / 2 + headSize / 2) {
        snakeSize = 1;
        eaten = [];
      }
    } else {
      // YELLOW-GREEN = food (only if it hasn't been eaten yet)
      if (eaten[i] != true) {
        fill(236, 255, 28);
        circle(cx, cy, circleSize);

        // touching? snake grows and the food disappears
        if (d < circleSize / 2 + headSize / 2) {
          snakeSize = snakeSize + 0.2;
          eaten[i] = true;
        }
      }
    }
  }
}

function drawSnake(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  scale(snakeSize); // makes the whole snake bigger or smaller
  noStroke();
  fill(133, 237, 255);

  // body: 30 circles going backwards from the head
  for (let i = 0; i < 30; i++) {
    let bodyX = -i * 5;
    // sin() makes each circle wiggle up and down
    // "* i * 0.3" makes the tail wiggle more than the neck
    let bodyY = sin(frameCount * 0.2 - i * 0.3) * i * 0.3;
    circle(bodyX, bodyY, 10);
  }

  // head
  circle(0, 0, 14);

  // snout
  beginShape();
  vertex(0, -7);
  vertex(13, -4);
  vertex(13, 4);
  vertex(0, 7);
  endShape(CLOSE);

  pop();
}