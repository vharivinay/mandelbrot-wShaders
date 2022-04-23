let button, record, snap, fps;
function setupUI() {
  // Normal Buttons
  button = select('#toggleLoop');
  button.mousePressed(toggleLoop);
  record = select('#record');
  record.mousePressed(toggleRecord);
  reset = select('#reset');
  reset.mousePressed(initSketch);
  snap = select('#saveFrame');
  snap.mousePressed(saveImage);
  fps = select('#fps');

    // Control UI
  up = select('#ctl-up');
  down = select('#ctl-down');
  left = select('#ctl-left');
  right = select('#ctl-right');
  zoomIn = select('#ctl-zoomIn');
  zoomOut = select('#ctl-zoomOut');
}

function toggleLoop() {
  if (isLoop) {
    noLoop();
    isLoop = false;
  } else {
    loop();
    isLoop = true;
  }
}

function toggleRecord() {
  if (isRecording) {
    isRecording = false;
    save = true;
  } else {
    isRecording = true;
    save = false;
  }
}

function clearCanvas() {
  clear();
  background(51);
}
function saveImage() {
  if (!isLoop) {
    toggleLoop();
    captureFrame();
    toggleLoop();
  } else {
    captureFrame();
  }
}

function captureFrame() {
  filename =
    'mandelbrot_' + str(year()) + str(month() + day() + hour() + minute() + second());
  saveCanvas(filename, 'PNG');
}
 
