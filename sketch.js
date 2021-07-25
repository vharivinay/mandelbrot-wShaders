let mandelbrot;
var isLoop = true;

function preload() {
  mandelbrot = loadShader("mandel.vert", "mandel.frag");
}

function setup() {
  createCanvas(900, 900, WEBGL);
  noStroke();
}

function draw() {
  // 'p' is the center point of the Mandelbrot image
  // default center is [-0.74364388703, 0.13182590421]
  mandelbrot.setUniform("p", [-0.74364388703, 0.13182590421]);
  // 'r' is the size of the image in Mandelbrot-space
  mandelbrot.setUniform("r", 1.5);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
  shader(mandelbrot);

  // draw shader container on canvas
  rect(0, 0, width, height);
}

function keyPressed() {
  if (keyCode === 32 && isLoop) {
    noLoop();
    isLoop = false;
  } else {
    loop();
    isLoop = true;
  }
}
