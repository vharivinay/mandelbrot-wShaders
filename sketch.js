const capturer = new CCapture({
  framerate: 60,
  format: 'webm',
  name: 'flowField',
  quality: 100,
  verbose: true,
});

let mandelbrot;
let cX = 0;
let cY = 0;
let scale = 1.0;
let speed = 0.01;
let zoomSpeed = 0.025;
let begin = true;
var redraw = false;

let minI = -1.0;
let maxI = 1.0;
let minR = -2.0;
let maxR = 1.0;

let isLoop, isRecording, save;

let p5canvas;

function preload() {
  mandelbrot = loadShader(
    'assets/mandel.vert',
    'assets/mandel.frag'
  );
}

function setup() {
  p5canvas = createCanvas(800, 640, WEBGL);
  p5canvas.parent('sketch-holder');
  noStroke();
  setupUI();
  isLoop = true;
  isRecording = false;
  save = false;
  freshFrame = true;
  drawFractal(cX, cY);
}

function draw() {
  if (isRecording && freshFrame) {
    freshFrame = false;
    capturer.start();
  }
  firstCall();
  redraw = false;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    cX += speed;
    redraw = true;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    cX -= speed;
    redraw = true;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    cY += speed;
    redraw = true;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    cY -= speed;
    redraw = true;
  }
  if (keyIsDown(109) || keyIsDown(90)) {
    scale += zoomSpeed * scale;
    speed = panSpeed(scale, speed);
    redraw = true;
  }
  if (keyIsDown(107) || keyIsDown(88)) {
    scale -= zoomSpeed * scale;
    speed = panSpeed(scale, speed);
    redraw = true;
  }

  if (redraw) {
    if (cX < 2 * minR) {
      cX = 2 * minR;
    } else if (cX > 2 * maxR) {
      cX = 2 * maxR;
    }
    if (cY < 2 * minI) {
      cY = 2 * minI;
    } else if (cY > 2 * maxI) {
      cY = 2 * maxI;
    }
    if (scale < 1) {
      scale = max(0.0000025, scale);
    } else if (scale > 1) {
      scale = min(scale, 1.5);
    }

    drawFractal(cX, cY, scale, minI, maxI, minR, maxR);
    console.log(round(1 / scale), speed);
  }
  if (isRecording) {
    record.html('Stop Recording');
    capturer.capture(p5canvas.canvas);
  }

  if (save && !isRecording) {
    save = false;
    freshFrame = true;
    record.html('Record');
    capturer.stop();
    capturer.save();
  }
  fps.html('FPS: ' + str(round(frameRate())));
}

function drawFractal(cX, cY, scale, minI, maxI, minR, maxR) {
  //Set Canvas Coordinates
  mandelbrot.setUniform('minI', minI);
  mandelbrot.setUniform('maxI', maxI);
  mandelbrot.setUniform('minR', minR);
  mandelbrot.setUniform('maxR', maxR);
  // 'iResolution sets the GLSL canvas resolution'
  mandelbrot.setUniform('canvasResolution', [width, height]);
  // 'p' is the center point of the Mandelbrot image
  // default center is [-0.74364388703, 0.13182590421]
  mandelbrot.setUniform('p', [cX, cY]);
  // 'r' is the size of the image in Mandelbrot-space
  mandelbrot.setUniform('r', 1.5 * scale);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
  shader(mandelbrot);
}

function firstCall() {
  if (begin) {
    begin = false;
    drawFractal(cX, cY, scale, minI, maxI, minR, maxR);
  }
}

function panSpeed(scale, speed) {
  var maxConstrain = 0.0000005;
  if (1 / scale < 5000) {
    maxConstrain = 0.00005;
  } else if (5000 < 1 / scale && 1 / scale < 10000) {
    maxConstrain = 0.000005;
  } else if (10000 > 1 / scale && 1 / scale < 50000) {
    maxConstrain = 0.0000075;
  } else if (50000 > 1 / scale && 1 / scale < 90000) {
    maxConstrain = 0.00000055;
  } else if (90000 > 1 / scale && 1 / scale < 400000) {
    maxConstrain = 0.0000000055;
  }
  return max(min(abs(speed - (scale % 10) * 0.09), 0.01), maxConstrain);
}

function updateViewCords(scale, minI, maxI, minR, maxR) {
  minI = minI - (1 - scale) * minI;
  maxI = maxI - (1 - scale) * maxI;
  minR = minR - (1 - scale) * minR;
  maxR = maxR - (1 - scale) * maxR;

  return { minI, maxI, minR, maxR };
}

// function mouseWheel(event) {
//   scale += zoomSpeed * scale * (event.delta / abs(event.delta));
//   speed = panSpeed(scale, speed);
//   xOffset = map(mouseX - cX, 0, width, -1.5, 1.5);
//   yOffset = map(mouseY - cY, 0, height, -1.0, 1.0);
//   cX = map(mouseX - xOffset - width / 2, 0, width, -1.5, 1.5);
//   cY = map(mouseY - yOffset, 0 - height / 2, height, -1.0, 1.0);
//   drawFractal(cX, cY, scale, minI, maxI, minR, maxR);
// }
