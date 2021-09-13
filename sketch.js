let mandelbrot;
let isLoop = true;
let move = 20;
let cX = 0;
let cY = 0;
let zoom = 1;
let zoomSpeed = 0.025;
let panSpeed = 0.0025;
let begin = true;

let minI = -1.0;
let maxI = 1.0;
let minR = -2.25;
let maxR = 1.5;

function preload() {
  mandelbrot = loadShader('assets/mandel.vert', 'assets/mandel.frag');
}

function setup() {
  createCanvas(1280, 720, WEBGL);
  translate(width / 2, height / 2);
  noStroke();

  drawFractal(cX, cY);
}

function draw() {
  firstCall(begin);
  reRender = false;

  if (keyIsDown(LEFT_ARROW)) {
    cX += panSpeed * zoom;
    reRender = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cX -= panSpeed * zoom;
    reRender = true;
  }
  if (keyIsDown(UP_ARROW)) {
    cY += panSpeed * zoom;
    reRender = true;
  }
  if (keyIsDown(DOWN_ARROW)) {
    cY -= panSpeed * zoom;
    reRender = true;
  }
  //zoomOut
  if (keyIsDown(107) || keyIsDown(90)) {
    if (zoom > 1) {
      zoom = zoom;
    } else {
      zoom += zoomSpeed * zoom;
    }
    //panSpeed *= 1.1;
    reRender = true;
  }
  //ZoomIn
  if (keyIsDown(109) || keyIsDown(88)) {
    zoom -= zoomSpeed * zoom;
    //panSpeed *= 0.95;
    reRender = true;
  }

  if (reRender) {
    drawFractal(cX, cY, zoom, minI, maxI, minR, maxR);
  }
  //console.log(mouseX, mouseY, cX, cY);
}

function drawFractal(cX, cY, zoom, minI, maxI, minR, maxR) {
  //Set Canvas Coordinates
  mandelbrot.setUniform('minI', minI);
  mandelbrot.setUniform('maxI', maxI);
  mandelbrot.setUniform('minR', minR);
  mandelbrot.setUniform('maxR', maxR);
  //mandelbrot.setUniform("MAX_ITERATION", MAX_ITERATION);
  // 'iResolution sets the GLSL canvas resolution'
  mandelbrot.setUniform('canvasResolution', [width, height]);
  // 'p' is the center point of the Mandelbrot image
  // default center is [-0.74364388703, 0.13182590421]
  mandelbrot.setUniform('p', [cX, cY]);
  // 'r' is the size of the image in Mandelbrot-space
  mandelbrot.setUniform('r', 1.25 * zoom);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
  shader(mandelbrot);
}

function firstCall(begin) {
  if (begin) {
    begin = false;
    drawFractal(cX, cY, zoom, minI, maxI, minR, maxR);
  }
}

/* function mouseWheel(event) {
  var e = event.delta;
  cX = map(mouseX, 0, width, minR, maxR);
  cY = map(mouseY, 0, height, minI, maxI);

  if (e < 0) {
    //zoom in
    if (zoom > 1) {
      zoom = zoom;
    } else {
      zoom += zoomSpeed * zoom;
    }
  }

  if (e > 0) {
    //zoom out
    zoom -= zoomSpeed * zoom;
  }
  drawFractal(cX, cY, zoom, minI, maxI, minR, maxR);
  return false;
} */

function mouseDragged() {
  let deltaX = mouseX - pmouseX;
  let deltaY = mouseY - pmouseY;
  if (deltaX > 0) {
    cX += map(deltaX, 0, width, minR, maxR) * panSpeed * maxR; //* panSpeed * zoom;
  } else if (deltaX < 0) {
    cX -= map(deltaX, 0, width, minR, maxR) * panSpeed * maxR; //* panSpeed * zoom;
  } else if (deltaY > 0) {
    cY -= map(deltaY, 0, height, minI, maxI) * panSpeed * maxR; //* panSpeed * zoom;
  } else if (deltaY < 0) {
    cY += map(deltaY, 0, height, minI, maxI) * panSpeed * maxR; //* panSpeed * zoom;
  }
  return false;
}
