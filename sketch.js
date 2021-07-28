let mandelbrot;
let isLoop = true;
let move = 20;
let cX = 0;
let cY = 0;
let scale = 1;
let speed = 0.005;
let zoomSpeed = 0.05;
let begin = true;

let minI = -1.0;
let maxI = 1.0;
let minR = -2.0;
let maxR = 1.5;

function preload() {
  mandelbrot = loadShader("assets/mandel.vert", "assets/mandel.frag");
}

function setup() {
  createCanvas(640, 360, WEBGL);
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
    drawFractal(cX, cY, scale, minI, maxI, minR, maxR);
  }
}

function drawFractal(cX, cY, scale, minI, maxI, minR, maxR) {
  //Set Canvas Coordinates
  mandelbrot.setUniform("minI", minI);
  mandelbrot.setUniform("maxI", maxI);
  mandelbrot.setUniform("minR", minR);
  mandelbrot.setUniform("maxR", maxR);
  // 'iResolution sets the GLSL canvas resolution'
  mandelbrot.setUniform("canvasResolution", [width, height]);
  // 'p' is the center point of the Mandelbrot image
  // default center is [-0.74364388703, 0.13182590421]
  mandelbrot.setUniform("p", [cX, cY]);
  // 'r' is the size of the image in Mandelbrot-space
  mandelbrot.setUniform("r", 1.5 * scale);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
  shader(mandelbrot);
}

function firstCall() {
  if (begin) {
    begin = false;
    drawFractal(cX, cY, scale, minI, maxI, minR, maxR);
  }
}
