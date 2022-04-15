let button, record, snap, fps;
function setupUI() {
  // Normal Buttons
  button = select('#toggleLoop');
  button.mousePressed(toggleLoop);
  record = select('#record');
  record.mousePressed(toggleRecord);
  snap = select('#saveFrame');
  snap.mousePressed(saveImage);
  fps = select('#fps');
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
 
