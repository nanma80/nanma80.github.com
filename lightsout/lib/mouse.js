// assuming the instance of Puzzle is puzzle
mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;

mouseDown = function(e){
  mouseIsDown = true;
  findMouse(e);
  dragging = false;
}

mouseUp = function(e){
  mouseIsDown = false;
  if (!dragging && mouseInRegion) {
    click(e);
  }
  dragging = false;
}

click = function(e){
  var layer;
  axisId = puzzle.snap(mousePos);
  puzzle.turn(axisId);
  // if (!(e.altKey) && !(e.shiftKey)) layer = 1;
  // else if (e.altKey && !(e.shiftKey)) layer = 2;
  // else if (e.shiftKey && !(e.altKey)) layer = 12;
  // else layer = 123;
  // puzzle.twist(e.button == 2, layer);

  puzzle.draw();
}

mouseDrag = function(e){
  dragging = true;
  var old = new Point2D(mousePos.x, mousePos.y)
  findMouse(e);
  var delta  = new Point2D(mousePos.x - old.x, mousePos.y - old.y)
  puzzle.rotate(new Point3D(delta.y, delta.x,  0), delta.norm/100); // 100: speed of dragging
  puzzle.draw();
}

mouseOut = function(e){
  mouseInRegion = false;
  if (dragging) {
    dragging = false;
  }
}

mouseOver = function(e){
  mouseInRegion = true;
  if (!mouseIsDown) { dragging = false; }
  findMouse(e);
}

mouseMove = function(e) {
  startTime = new Date().getTime();

  if (mouseIsDown && mouseInRegion) {
    mouseDrag(e);
  }
}


findMouse = function (e) {
  mousePos.x = e.pageX - canvas.offsetLeft;
  mousePos.y = e.pageY - canvas.offsetTop;
}

onRadioButton = function() {
  var needUpdate = false;
  var typeElements = document.getElementsByName('type');
  var i;

  for (i=0; i < typeElements.length; i++) {
    if (typeElements[i].checked) {
      if (!(typeElements[i].value == puzzle.type)) needUpdate = true;
      break;
    }
  }

  if (needUpdate) {
    puzzle.setParameters(typeElements[i].value);
    puzzle.resetState();
  }
}


