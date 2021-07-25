let mandelbrot;
let isLoop = true;
let move = 20;
let cX = 0;
let cY = 0;
let scale = 1;
let speed = 0.005;
let zoomSpeed = 0.05;
let begin = true;

function preload() {
  mandelbrot = loadShader("assets/mandel.vert", "assets/mandel.frag");
}

function setup() {
  createCanvas(400, 390, WEBGL);
  noStroke();

  drawFractal(cX, cY);
}

function draw() {
  firstCall();
  redraw = false;
  if (keyIsDown(LEFT_ARROW)) {
    cX += (speed * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cX -= (speed * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(UP_ARROW)) {
    cY += (speed * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(DOWN_ARROW)) {
    cY -= (speed * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(107) || keyIsDown(90)) {
    scale += zoomSpeed * scale;
    speed *= 1.1;
    redraw = true;
  }
  if (keyIsDown(109) || keyIsDown(88)) {
    scale -= zoomSpeed * scale;
    speed *= 0.9;
    redraw = true;
  }

  if (redraw) {
    drawFractal(cX, cY, scale);
    console.log(speed, scale);
  }
}

function drawFractal(cX, cY, scale) {
  // 'p' is the center point of the Mandelbrot image
  // default center is [-0.74364388703, 0.13182590421]
  mandelbrot.setUniform("p", [cX, cY]);
  // 'r' is the size of the image in Mandelbrot-space
  mandelbrot.setUniform("r", 1.5 * scale);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
  shader(mandelbrot);

  //console.log(cX, cY);
}

function firstCall() {
  if (begin) {
    begin = false;
    drawFractal(-0.55, -0.085, scale);
  }
}
